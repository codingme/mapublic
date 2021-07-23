const placeItems = {};
// 共通
placeItems["pref_name"] = "都道府県";
placeItems["city_name"] = "市区町村";
placeItems["facility_name"] = "名称";
placeItems["facility_kana"] = "名称(カナ)";
placeItems["facilty_en"] = "名称(英語)";
placeItems["address"] = "所在地";
placeItems["lat"] = "緯度";
placeItems["lng"] = "経度";

// トイレ
placeItems["district_code"] = "都道府県コード又は市区町村コード";
placeItems["no"] = "NO";
placeItems["facility_other_name"] = "方書";
placeItems["toilet_postion"] = "設置位置";
placeItems["count_male_total"] = "男性トイレ総数";
placeItems["count_male_urinal"] = "男性トイレ数（小便器）";
placeItems["count_male_jp_style"] = "男性トイレ数（和式）";
placeItems["count_male_west_style"] = "男性トイレ数（洋式）";
placeItems["count_female_total"] = "女性トイレ総数";
placeItems["count_female_jp_style"] = "女性トイレ数（和式）";
placeItems["count_female_west_style"] = "女性トイレ数（洋式）";
placeItems["count_all"] = "男女共用トイレ総数";
placeItems["count_jp_style_all"] = "男女共用トイレ数（和式）";
placeItems["count_west_style_all"] = "男女共用トイレ数（洋式）";
placeItems["count_multifunctional"] = "多機能トイレ数";
placeItems["available_wheelchairl"] = "車椅子使用者";
placeItems["available_baby"] = "乳幼児用設備設置";
placeItems["available_ostomate"] = "オストメイト設置";
placeItems["available_from"] = "利用開始時間";
placeItems["available_to"] = "利用終了時間";
placeItems["available_time_info"] = "利用可能時間特記事項";
placeItems["image"] = "画像";
placeItems["image_licencce"] = "画像_ライセンス";
placeItems["remark"] = "備考";

const categories = {
  osaka: [
    { text: "公衆トイレ", value: "toilet" },
    { text: "保育施設", value: "preschool" }
  ],
  toyonaka: [
    { text: "公衆トイレ", value: "toilet" }
  ]
};

export { placeItems as default, categories };