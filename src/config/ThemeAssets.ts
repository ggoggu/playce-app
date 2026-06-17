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
    themeTitle: "영화 & 드라마",
    bgGradient: require('../../assets/images/course_history/bg_gradient.png'),
    bgPath: require('../../assets/images/course_history/bg_path.png'),
    trees: [
      require('../../assets/images/course_history/deco_tree_1.png'),
      require('../../assets/images/course_history/deco_tree_2.png'),
      require('../../assets/images/course_history/deco_tree_3.png'),
      require('../../assets/images/course_history/deco_tree_4.png'),
    ],
    nodes: {
      1: require('../../assets/images/course_movie/node_1_itaewon.png'),
      2: require('../../assets/images/course_movie/node_2_lovely_runner.png'),
      3: require('../../assets/images/course_movie/node_4_attorney_woo.png'),
      4: require('../../assets/images/course_movie/node_3_beloved_summer.png'),
      5: require('../../assets/images/course_movie/node_5_jeon_woochi.png'),
      6: require('../../assets/images/course_movie/node_6_classic.png'),
    },
    starBadge: require('../../assets/images/course_history/icon_star_badge.png'),
    rfidPopupImage: require('../../assets/images/course_movie/node_1_itaewon.png'),
  }
};
