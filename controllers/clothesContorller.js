// controllers/clothesController.js
"use strict";

const Clothes = require("../models/Clothes"); // 사용자 모델 요청

module.exports = {
  index: (req, res, next) => {
    clothes.find() // index 액션에서만 퀴리 실행
      .then((eclothes) => {
        // 사용자 배열로 index 페이지 렌더링
        res.locals.clothes = clothes; // 응답상에서 사용자 데이터를 저장하고 다음 미들웨어 함수 호출
        next();
      })
      .catch((error) => {
        // 로그 메시지를 출력하고 홈페이지로 리디렉션
        console.log(`Error fetching clothes: ${error.message}`);
        next(error); // 에러를 캐치하고 다음 미들웨어로 전달
      });
  },
  indexView: (req, res) => {
    res.render("clothes/index", {
      page: "clothes",
      title: "All clothes",
    }); // 분리된 액션으로 뷰 렌더링
  },

  new: (req, res) => {
    res.render("clothes/new", {
      page: "new-clothes",
      title: "New Clothes",
    });
  },
  create: (req, res, next) => {
    let clothesParams = {
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
      profileImg: req.body.profileImg,
    };
    // 폼 파라미터로 사용자 생성
    Clothes.create(clothesParams)
      .then((clothes) => {
        res.locals.redirect = "/clothes";
        res.locals.clothes = clothes;
        next();
      })
      .catch((error) => {
        console.log(`Error saving clothes: ${error.message}`);
        next(error);
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
  show: (req, res, next) => {
    let clothesrId = req.params.id; // request params로부터 사용자 ID 수집
    Clothes.findById(clothesrId) // ID로 사용자 찾기
      .then((clothes) => {
        res.locals.clothes = clothes; // 응답 객체를 통해 다음 믿들웨어 함수로 사용자 전달
        next();
      })
      .catch((error) => {
        console.log(`Error fetching clothes by ID: ${error.message}`);
        next(error); // 에러를 로깅하고 다음 함수로 전달
      });
  },
  showView: (req, res) => {
    res.render("clothes/show", {
      page: "clothes-details",
      title: "B-clothes Details",
    });
  },
  edit: (req, res, next) => {
    let clothesId = req.params.id;
    Clothes.findById(clothesId) // ID로 데이터베이스에서 사용자를 찾기 위한 findById 사용
      .then((clothes) => {
        res.render("clothes/edit", {
          clothes: clothes,
          page: clothes.name,
          title: "Edit B-clothes",
        }); // 데이터베이스에서 내 특정 사용자를 위한 편집 페이지 렌더링
      })
      .catch((error) => {
        console.log(`Error fetching clothesr by ID: ${error.message}`);
        next(error);
      });
  },
  update: (req, res, next) => {
    let clothesId = req.params.id,
    clothesParams = {
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
      profileImg: req.body.profileImg,
    };

    Clothes.findByIdAndUpdate(clothesId, {
      $set: clothesParams,
    }) //ID로 사용자를 찾아 단일 명령으로 레코드를 수정하기 위한 findByIdAndUpdate의 사용
      .then((clothes) => {
        res.locals.redirect = `/clothes/${clothesId}`;
        res.locals.clothes = clothes;
        next(); // 지역 변수로서 응답하기 위해 사용자를 추가하고 다음 미들웨어 함수 호출
      })
      .catch((error) => {
        console.log(`Error updating clothes by ID: ${error.message}`);
        next(error);
      });
  },
  delete: (req, res, next) => {
    let clothesId = req.params.id;
    Clothes.findByIdAndRemove(clothesId) // findByIdAndRemove 메소드를 이용한 사용자 삭제
      .then(() => {
        res.locals.redirect = "/clothes";
        next();
      })
      .catch((error) => {
        console.log(`Error deleting clothes by ID: ${error.message}`);
        next();
      });
  },
  deleteAll: (req, res, next) => {
    Clothes.deleteMany({})
      .then(() => {
        res.locals.redirect = "/clothes";
        next();
      })
      .catch((error) => {
        console.log(`Error deleting all clothes: ${error.message}`);
        next(error); // next()에 error를 전달하여 다음 미들웨어로 넘김
      });
  }
}