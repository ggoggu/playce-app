// 🌟 앱 전체의 테마별 글자와 이미지를 모아두는 데이터 보따리입니다.

export const THEME_ASSETS = {
  // 1. 역사 테마 데이터
  history: {
    themeTitle: "역사테마",
    bgGradient: require('../../assets/images/course_history/bg_gradient.png'),
    bgPath: require('../../assets/images/course_history/bg_path.png'),
    trees: [
      require('../../assets/images/course_history/deco_tree_1.png'),
      require('../../assets/images/course_history/deco_tree_2.png'),
      require('../../assets/images/course_history/deco_tree_3.png'),
      require('../../assets/images/course_history/deco_tree_4.png'),
    ],
    nodes: {
      1: require('../../assets/images/course_history/node_1_haenggung.png'),
      2: require('../../assets/images/course_history/node_2_hwaryeong.png'),
      3: require('../../assets/images/course_history/node_3_seojangdae.png'),
      4: require('../../assets/images/course_history/node_4_seobuk.png'),
      5: require('../../assets/images/course_history/node_5_hwaseomun.png'),
    },
    starBadge: require('../../assets/images/course_history/icon_star_badge.png'),
    rfidPopupImage: require('../../assets/images/course_history/popup_illust_rfid_haenggung.png'),
  },

  // 2. 영화 & 드라마 테마 데이터
  movie: {
    themeTitle: "영화 & 드라마", // 🌟 글자는 영화 테마용으로 변경!
    
    // ⚠️ 아래 이미지들은 아직 디자인이 없으므로 임시로 '역사 테마' 이미지를 연결해 둡니다.
    // 💡 나중에 디자이너가 이미지를 주면, 이 파일에서 경로만 'course_movie' 등으로 싹 바꿔주면 끝입니다!
    bgGradient: require('../../assets/images/course_history/bg_gradient.png'),
    bgPath: require('../../assets/images/course_history/bg_path.png'),
    trees: [
      require('../../assets/images/course_history/deco_tree_1.png'),
      require('../../assets/images/course_history/deco_tree_2.png'),
      require('../../assets/images/course_history/deco_tree_3.png'),
      require('../../assets/images/course_history/deco_tree_4.png'),
    ],
    nodes: {
      1: require('../../assets/images/course_history/node_1_haenggung.png'),
      2: require('../../assets/images/course_history/node_2_hwaryeong.png'),
      3: require('../../assets/images/course_history/node_3_seojangdae.png'),
      4: require('../../assets/images/course_history/node_4_seobuk.png'),
      5: require('../../assets/images/course_history/node_5_hwaseomun.png'),
    },
    starBadge: require('../../assets/images/course_history/icon_star_badge.png'),
    rfidPopupImage: require('../../assets/images/course_history/popup_illust_rfid_haenggung.png'),
  }
};