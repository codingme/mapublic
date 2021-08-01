const placeItems = {};
// 共通
// placeItems["district_code"] = "都道府県コード又は市区町村コード";
// placeItems["no"] = "NO";
// placeItems["pref_name"] = "都道府県";
placeItems["city_name"] = "市区町村";
placeItems["facility_name"] = "名称";
placeItems["facility_kana"] = "名称(カナ)";
placeItems["facilty_en"] = "名称(英語)";
placeItems["address"] = "所在地";
placeItems["lat"] = "緯度";
placeItems["lng"] = "経度";
placeItems["facility_other_name"] = "方書";
placeItems["type"] = "種別";
placeItems["access"] = "アクセス方法";
placeItems["parking"] = "駐車場情報";
placeItems["tel"] = "電話番号";
placeItems["tel_ext"] = "内線番号";
placeItems["fax"] = "FAX番号";
placeItems["url"] = "URL";
placeItems["day_of_week"] = "利用可能曜日";
placeItems["available_from"] = "開始時間";
placeItems["available_to"] = "終了時間";
placeItems["available_day_info"] = "利用可能日時特記事項";
placeItems["available_time_info"] = "利用可能時間特記事項";
placeItems["image"] = "画像";
placeItems["remark"] = "備考";

// トイレ
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
placeItems["image_licencce"] = "画像_ライセンス";

// 保育施設
placeItems["crop_no"] = "法人番号";
placeItems["organization"] = "団体／組織";
placeItems["licensed_date"] = "認可等年月日";
placeItems["capacity"] = "収容定員";
placeItems["min_age"] = "受入年齢";
placeItems["temporary"] = "一時預かりの有無";

const categories = {
  osaka: [
    { text: "公衆トイレ", value: "toilet" },
    { text: "保育施設", value: "preschool" },
    { text: "未選択", value: "none" }
  ],
  toyonaka: [
    { text: "公衆トイレ", value: "toilet" },
    { text: "未選択", value: "none" }
  ]
};

export { placeItems as default, categories };