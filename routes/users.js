var express = require("express");
var router = express.Router();
const userController = require("../controllers/user");
const passport = require("passport");
const authenticate = require("../config/auth");
const multer = require("multer");
const path = require("path");
const News = require("../model/newsModel");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // The folder where uploaded images will be stored
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    ); // Rename the image file
  },
});
// Create the Multer instance
const upload = multer({ storage: storage });

router.post(
  "/sendupdate",
  authenticate.ensureAuthenticated,
  upload.single("image"),
  async (req, res) => {
    let newNews = new News({
      image: "/uploads/" + req.file.filename,
      text: req.body.text,
      link: req.body.link,
    });
    await newNews.save();
    // File upload was successful
    res.redirect("/dashboard/sendUpdate");
  }
);

/* GET users listing. */
router.get(
  "/dashboard",
  authenticate.ensureAuthenticated,
  userController.getMessage
);
router.get(
  "/dashboard/profile",
  authenticate.ensureAuthenticated,
  async (req, res, next) => {
    res.render("dashboard/profile");
  }
);

router.get(
  "/dashboard/sendUpdate",
  authenticate.ensureAuthenticated,
  async (req, res, next) => {
    res.render("dashboard/sendNews");
  }
);
router.get(
  "/dashboard/donate",
  authenticate.ensureAuthenticated,
  async (req, res, next) => {
    res.render("dashboard/donate");
  }
);
router.get(
  "/sendmessage",
  authenticate.ensureAuthenticated,
  (req, res, next) => {
    res.render("dashboard/sendMessage");
  }
);
router.post(
  "/update/user",
  authenticate.ensureAuthenticated,
  userController.updateUser
);
router.post("/signup", userController.addUser);
router.post("/subscribe", userController.addSub);
router.post(
  "/donate",
  authenticate.ensureAuthenticated,
  userController.donatePlan
);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (err, req, res, next) => {
    if (err) {
      next(err);
    }
  }
);

router.post("/logout", authenticate.ensureAuthenticated, userController.logOut);
// message controller
// router.post('/sendupdate',authenticate.ensureAuthenticated, userController.sendNews)
router.delete(
  "/deletemessage/:_id",
  authenticate.ensureAuthenticated,
  userController.deleteMessage
);
router.post(
  "/sendmessage",
  authenticate.ensureAuthenticated,
  userController.sendMessage,
  userController.alertEmail
);
router.get("/forgot-password", async (req, res) => {
 const error = ''
  return res.render("front-page/forgot-password",{error});
});
const JWT = "some_secret";
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  let error = [];

  try {
    const user = await User.findOne({ email });
    if (email !== user.email) {
      error.push({ message: "email not registered" });
      return res.sendDate({ message: "no user found" });
    }

    const secret = JWT + user.password;
    const payload = {
      email: user.email,
      id: user.id,
    };
    const token = jwt.sign(payload, secret, { expiresIn: "30m" });

    const link = `http://localhost:4000/reset-password/${user.id}/${token}`;
    //send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "fayomuhe5@gmail.com",
        pass: "vypd cqxp eqqm krsg",
        port: 465,
        secure: true,
      },
    });
    const mailOptions = {
      from: "fayomuhe5@gmail.com",
      to: email,
      subject: "VCO charity Org.",
      html: `<p>Password Reset</p>
             <p>Please follow this link to reset your password!</p>
             <a href=${link}>Reset!</a>
             `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
     error.push({msg:"Reset link sent check your email!"})
    return res.render('front-page/forgot-password',{error});
  } catch (error) {
     error.push({msg:error})
      return res.render('front-page/forgot-password',{error});
  }
});
router.get("/reset-password/:id/:token", async (req, res) => {
  const { token, id } = req.params;
  let user,
    error = [];
 console.log(' here is id')
  try {
    user = await User.findById(id);
    if (!user) {
      error.push({ msg: "something went wrong" });
      return res.render('front-page/forgot-password',{error});
    }

    const secret = JWT + user.password;
    const payload = jwt.verify(token, secret);
    return res.render("front-page/reset-password", { token: token, id: id });
  } catch (error) {
    error.push({msg:error.messaage})
    return res.render('front-page/forgot-password',{error});

  }
});

router.post("/reset-password/:id/:token", async (req, res) => {
  const { token, id } = req.params;
  const { password, password2 } = req.body;
  let user,
    error = [];

  try {
    user = await User.findById(id);
    if (!user) {
      error.push({ msg: "user not found" });
      return res.render("front-page/reset-password",{error});
    }

    const secret = JWT + user.password;
    const payload = jwt.verify(token, secret);
    if (password !== password2) {
      error.push({ msg: "password do not match" });
      return res.render("front-page/reset-password",{error});
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    const saved =  await user.save();
     if(!saved){
       error.push({msg:"something went wrong"})

       return res.render("front-page/reset-password",{error});
      }
      error.push({msg:'Your password reseted successfully!'})
    return res.redirect('/login',{error});
  } catch (error) {
    return res.send({message:error});
  }
});
module.exports = router;
