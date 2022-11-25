//프로필 수정
const auth = require("../middleware/auth");
//middleware로 auth를 사용해야 함

const profile = async (req, res) => {
  //access token 확인
  //service에 연결
  res.send("수정할 수 있음");
};
