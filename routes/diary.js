var express = require("express");
var multer = require("multer"); // express에 multer모듈 적용 (for 파일업로드)
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: "./public/img/",
  filename: function (req, file, cb) {
    cb(null, "imgfile" + Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
});

var router = express.Router();

const User = require("../mongoose/Diary/diary");
const Comment = require("../mongoose/Diary/comment");

/* GET home page. */

router.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

router.get("/", function (req, res, next) {
  res.render("indasdfsdfaex", { title: "Expsadfklj;vlkjlxzcvress" });
});

router.get("/readDiary", async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
  res.header("Access-Control-Allow-Credentials", true);
  try {
    const diary = await User.find((error, data) => {
      console.log("follow me");
      if (error) {
        console.log(error);
      } else {
        console.log("data read success");
      }
    }).sort({ _id: -1 });
    res.json(diary);
    res.send();
  } catch (e) {
    console.error(error);
    next(error);
  }
});

router.post("/newDiary", upload.array("img", 12), async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
  res.header("Access-Control-Allow-Credentials", true);
  const reqFiles = [];
  for (var i = 0; i < req.files.length; i++) {
    reqFiles.push(req.files[i].filename);
  }

  try {
    const diary = await User({
      useredName: req.body.useredName,
      imageFile: reqFiles,
      date: req.body.date,
      flowerName: req.body.flowerName,
      title: req.body.title,
      descreption: req.body.desc,
    });
    console.log("diary success");
    diary.save();
    res.send({ sendCheck: true });
  } catch (e) {
    console.error(error);
    next(error);
  }
});

router.post("/delete", async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
  res.header("Access-Control-Allow-Credentials", true);
  try {
    await User.deleteOne({
      _id: req.body.id,
    });
    res.send();
  } catch (e) {
    console.log("diary delte error");
    next(error);
  }
});

router.post("/comment", async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
  res.header("Access-Control-Allow-Credentials", true);
  console.log(req.body);
  try {
    const newComment = await Comment({
      useredName: req.body.name,
      descreption: req.body.desc,
      id: req.body.id,
    });
    console.log("comment success");
    newComment.save();
    res.send(sendCheck, true);
  } catch (e) {
    console.error(error);
    next(error);
  }
});

router.get("/comment/:id", async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
  res.header("Access-Control-Allow-Credentials", true);
  try {
    const DataComment = await Comment.find({
      id: req.params.id,
    }).sort({ _id: -1 });

    res.json(DataComment);
    res.send();
  } catch (e) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
