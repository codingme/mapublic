import placeItems, { categories } from './jsonKeyMapping.js';
import dataSources from './dataSource.js';

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
        districts: {
          osaka: [
            { en: "osaka", ja: "大阪市", categories: categories.osaka },
            // { en: "toyonaka", ja: "豊中市", categories: categories.toyonaka },
          ]
        },
        cityPlaces: null,
        selectedPref: "osaka",
        selectedCity: { en: "osaka", ja: "大阪市", categories: categories.osaka },
        selectedCateg: { en: "toilet", ja: "公衆トイレ" },
        targetCateg: "toilet",
        source: {}
      };
    },
    methods: {
      showPlaces: async function (city, prefecture) {
        this.counter = 0;
        this.cityPlaces = null;
        for (let m of this.markers) {
          m.setMap(null);
        }
        this.markers = [];

        this.selectedCity = city;
        const { text, value } = categories[city.en].filter(
          (val, idx) => val.value === this.targetCateg
        )[0];
        this.selectedCateg = { en: value, ja: text };
        if (prefecture) { // In fact, there is no concern about prefecture.
          await this.downloadData();
          if (!this.places) {
            this.$bvToast.toast(`${this.selectedCity.ja}では現在${this.selectedCateg.ja}の情報まだ掲載しておりません`, {
              title: 'ほかの地域または施設種類をお試しください',
              autoHideDelay: 5000,
              toaster: 'b-toaster-top-center',
              variant: 'warning'
            })
            return false;
          }

          this.selectedPref = prefecture;
        }

        this.geocoder.geocode(
          {
            address: city.ja + "," + this.selectedPref
          },
          (results, status) => {
            this.gmap.setCenter(results[0].geometry.location);
          }
        );

        this.addExtraInfoToPlaces(city);
        this.cityPlaces = await this.places.filter((place) => {
          return city.en === place.city_en;
        });
        for (let p of this.cityPlaces) {
          this.counter++;
          // if (this.counter > 10) break;
          await new Promise((resolve, reject) => {
            setTimeout(() => resolve(this.renderMarker(p)), 10);
          });
        }
      },
      renderMarker: function (place) {
        const infoWindow = new google.maps.InfoWindow({
          content:
            "<h4>" +
            "<a href='//www.google.com/maps/search/?api=1&query=" +
            encodeURI(place.facility_name + "," + place.city_name) +
            "'>" +
            place.facility_name +
            "</a>" +
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
                  "facility_kana",
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
              return acc +
                "<span class='font-weight-light'>" +
                placeItems[key] +
                "</span>" +
                "&nbsp;<span class='font-weight-bold'>" +
                val +
                "</span><br/>";
            }, [])
        });

        const marker = new google.maps.Marker({
          // position: { lat: 34.6937, lng: 135.5023 },
          position: { lat: Number(place.lat), lng: Number(place.lng) },
          map: this.gmap,
          label: {
            text: this.selectedCateg.en === "vaccination" ? "接" : "ト",
            color: "red",
            fontSize: "1.6em"
          },
          title: place.facility_name,
          icon:
            "http://maps.google.com/mapfiles/ms/icons/" +
            (this.selectedCateg.en === "vaccination" ? "grn-pushpin" : "toilets") +
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
      addExtraInfoToPlaces: function (city) {
        for (let place of this.places) {
          place.city_en = city.en;
        }
      },
      downloadData: async function () {
        if (dataSources[this.targetCateg]
          && dataSources[this.targetCateg].hasOwnProperty(this.selectedCity.en)) {
          this.source = dataSources[this.targetCateg][this.selectedCity.en];
        } else {
          this.places = null;
          return;
        }
        console.debug(this.source);
        await fetch(this.source.data, {
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
            this.addExtraInfoToPlaces(this.selectedCity);
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

      this.showPlaces(this.selectedCity, this.selectedPref);
    }
  });
};
