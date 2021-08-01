const sources = {
  toilet: {
    osaka: {
      data: "./data/osaka/271004_public_toilet_202010.csv",
      link: "//data.city.osaka.lg.jp/data/dataset/data-00000510",
      desc: "大阪市令和2年10月末現在"
    },
    assets: {
      expression: "ト",
      icon: "http://maps.google.com/mapfiles/ms/icons/toilets.png"
    }
  },
  preschool: {
    osaka: {
      data: "./data/osaka/271004_preschool_202011.csv",
      link: "//data.city.osaka.lg.jp/data/dataset/data-00000522",
      desc: "大阪市令和2年11月末現在"
    },
    assets: {
      expression: "保",
      icon: "//img.icons8.com/offices/40/000000/abc.png"
    }
  }
};

export { sources as default };