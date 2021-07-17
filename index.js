window.onload = () => {
  new Vue({
    el: "#app",
    data() {
      return {
        gmap: null,
        geocoder: null,
        places: null,
        markers: [],
        counter: 0,
        prefs: {
          chiyodaku: "東京都",
          osaka: "大阪府"
        },
        districts: [
          {
            pref_en: "osaka",
            cities: [{ osaka: "大阪市" }, { toyonaka: "豊中市" }]
          }
        ],
        categoies: [
          { text: "公衆トイレ", value: "toilet" }
          // preschool:"保育施設"
        ],
        cityPlaces: null,
        selectedPref: "osaka",
        selectedCity: "osaka",
        selectedCateg: "toilet"
      };
    },
    methods: {
      showPlaces: async function (city) {
        this.selectedCity = city;
        this.counter = 0;
        this.places = null;
        for (let m of this.markers) {
          m.setMap(null);
        }
        this.markers = [];

        this.geocoder.geocode(
          { address: this.selectedCity },
          (results, status) => {
            this.gmap.setCenter(results[0].geometry.location);
          }
        );
        if (!sources[this.selectedCity].hasOwnProperty(this.selectedCateg)) {
          alert("現在この地域の情報はまだ掲載しておりません");
          return false;
        }

        await this.downloadData();
        if (!this.places) {
          return false;
        }
        this.cityPlaces = await this.places.filter((place) => {
          return this.selectedCity === place.city_en;
        });
        // (async () => {
        for (let p of this.cityPlaces) {
          this.counter++;
          // if (this.counter > 10) break;
          //     await new Promise((resolve, reject) => {
          //       setTimeout(() => resolve(
          await this.renderMarker(p);
          //         ), 50);
          //     });
        }
        // })();
      },
      renderMarker: function (place) {
        const infoWindow = new google.maps.InfoWindow({
          content:
            "<h4>" +
            place.facility_name +
            "</h4>" +
            (place.facility_kana ? place.facility_kana : "") +
            "<br/>" +
            Object.entries(place).reduce((acc, [key, val]) => {
              if (!val) {
                // Do not render when nothing
                return acc;
              }
              if (
                [
                  "district_code",
                  "facility_name",
                  "lat",
                  "lng",
                  "pref_name",
                  "city_name",
                  "city_en"
                ].includes(key)
              ) {
                // Do not render for these items
                return acc;
              }
              return acc + placeItems[key] + ":" + val + "<br/>";
            }, {})
        });

        const marker = new google.maps.Marker({
          // position: { lat: 34.6937, lng: 135.5023 },
          position: { lat: Number(place.lat), lng: Number(place.lng) },
          map: this.gmap,
          label: {
            text: this.selectedCateg === "vaccination" ? "接" : "ト",
            color: "red",
            fontSize: "1.6em"
          },
          title: place.facility_name,
          icon:
            "http://maps.google.com/mapfiles/ms/icons/" +
            (this.selectedCateg === "vaccination" ? "grn-pushpin" : "toilets") +
            ".png",
          animation: google.maps.Animation.DROP,
          optimized: true
        });
        this.markers.push(marker);
        marker.addListener("click", () => {
          infoWindow.open({
            anchor: marker,
            map: this.gmap
          });
        });
      },
      extractCsvToJson: function (csv) {
        const lines = csv.split(/[\r\n]+/gm); // Both Linux & Windows line-break
        const result = [];
        const headers = lines[0].split(",");

        for (let i = 1; i < lines.length; i++) {
          let obj = {};
          const currentline = lines[i].split(",");
          if (!currentline) {
            continue;
          }

          for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j].replace('""', "")
              ? currentline[j]
              : null;
          }

          result.push(obj);
        }

        return result; //JavaScript object
        // return JSON.stringify(result); //JSON
      },
      addExtraInfoToPlaces: function () {
        for (let place of this.places) {
          place.city_en = this.selectedCity;
        }
      },
      downloadData: async function () {
        await fetch(sources[this.selectedCity][this.selectedCateg], {
          method: "get",
          headers: {
            "content-type": "text/csv;charset=UTF-8"
          }
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("HTTP error, status = " + response.status);
            }
            return response.text();
          })
          .then((csvData) => {
            this.places = this.extractCsvToJson(csvData);
            this.addExtraInfoToPlaces();
            console.debug(this.places[0]);
          });
      }
    },
    mounted() {
      this.gmap = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 34.6937, lng: 135.5023 },
        zoom: 13
      });
      this.geocoder = new google.maps.Geocoder();

      this.showPlaces(this.selectedCity);
    }
  });
};
