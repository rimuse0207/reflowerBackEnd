var express = require("express");
const crypto = require("crypto");
var router = express.Router();

require("dotenv").config();

const User = require("../mongoose/User/user");

const request = require("request");
const parser = require("xml2json");
const HOST = "http://api.nongsaro.go.kr/service/garden/gardenList";

const requestUrl = `${HOST}?apiKey=${process.env.APIKEY}&&numOfRows=217`;
const HOST2 = "http://api.nongsaro.go.kr/service/garden/gardenDtl";
const requestUrl2 = `${HOST2}?apiKey=${process.env.APIKEY}&&cntntsNo=`;

router.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

/* GET users listing. */
router.get("/", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
  res.header("Access-Control-Allow-Credentials", true);
  try {
    let data = null;
    await request(
      {
        url: requestUrl,
        method: "GET",
      },
      (error, response, xml) => {
        const json = JSON.parse(parser.toJson(xml));
        data = json.response.body.items.item;
        console.log(requestUrl);
        res.json({ data: data });
      }
    );
  } catch (error) {
    console.log("asdasd", error);
  }
});
router.post("/qwe", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
  res.header("Access-Control-Allow-Credentials", true);
  try {
    let data3 = null;
    let number = req.body.number;
    console.log(number);
    await request(
      {
        url: `${requestUrl2}${req.body.number}`,
        method: "GET",
      },
      (error, response, xml) => {
        const json = JSON.parse(parser.toJson(xml));
        data3 = json.response.body.item;
        console.log(data3);
        res.send(data3);
      }
    );
  } catch (err) {
    console.log("Detail error ", err);
  }
});
router.get(`/qwe`, (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
  res.header("Access-Control-Allow-Credentials", true);
  res.json(data3);
  res.send();
});
router.post("/login", async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
  res.header("Access-Control-Allow-Credentials", true);
  try {
    var cipher = crypto.createCipher("aes192", "나만아는 비밀번호");
    cipher.update(req.body.password, "utf8", "base64");
    var cipheredOutput = cipher.final("base64");
    const users = await User.find({
      email: req.body.email,
      password: cipheredOutput,
    });

    if (!Object.keys(users).length) {
      res.send({ emailCheck: false, passwordCheck: false });
    } else {
      res.send({
        emailCheck: true,
        passwordCheck: true,
        loginSuccess: true,
        useredName: req.body.email,
      });
    }
  } catch (e) {
    console.error(error);
    next(error);
  }

  // if (req.body.email === email) {
  //   if (req.body.password === password) {
  //     res.send({ emailCheck: true, passwordCheck: true });
  //   } else {
  //     res.send({ emailCheck: true, passwordCheck: false });
  //   }
  // } else {
  //   res.send({ emailCheck: false });
  // }
});

router.post("/signUp", async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
  res.header("Access-Control-Allow-Credentials", true);
  console.log("singup Test");
  try {
    console.log(req.body);
    const users = await User.find({
      email: req.body.email,
    });
    console.log(Object.keys(users).length);
    console.log(!Object.keys(users).length);
    if (!Object.keys(users).length) {
      var cipher = crypto.createCipher("aes192", "나만아는 비밀번호");
      cipher.update(req.body.password, "utf8", "base64");
      var cipheredOutput = cipher.final("base64");
      console.log(cipheredOutput);
      const usersAdd = await User({
        email: req.body.email,
        password: cipheredOutput,
      });

      console.log(usersAdd);
      console.log("sign success");
      usersAdd.save();
      res.send({ signUp: true, emailOverlap: true });
    } else {
      console.log("email overlap");
      res.send({ emailOverlap: false });
    }
  } catch (e) {
    console.error(error);
    next(error);
  }
});

router.post("/qqq", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
  res.header("Access-Control-Allow-Credentials", true);
  User.find({ email: "qwe" })
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

module.exports = router;
