/** @format */
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Inscription
exports.signUp = async (req, res) => {
  const { mail, password } = req.body;
  let salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(password, salt);
  // const token = jwt.sign({ mail: mail }, process.env.ACCES_TOKEN_SECRET);

  const alreadyExistMail = await User.findOne({
    where: { mail: req.res.mail },
  }).catch((err) => {
    console.log("Error : ", err);
  });
  if (alreadyExistMail) {
    return res.json({
      message: "This email is already registered !",
    });
  }
  const newUser = await new User({
    mail,
    password: hashedPassword,
    // confirmationCode: token,
  });
  const saveUser = newUser
    .save()
    .then(() => {
      res.json({ message: "Thanks for registering !" });
    })
    .catch((err) => {
      console.log("Error : ", err);
      res.json({
        error: "Registration did not work !",
      });
    });
};


//Connexion
exports.signIn = async (req, res) => {
  const mail = req.body.mail;
  const password = req.body.password;
  let salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(password, salt);
  console.log(password);
  const user = {
    mail,
    password,
  };
  const signInWithMail = await User.findOne({ where: { mail } }).catch(
    (err) => {
      console.log("Error : ", err);
    }
  );
  let compare = await bcrypt.compare(password, signInWithMail.password);
  if (!signInWithMail) {
    return res.json({
      message: "email or password not found.",
    });
  } else if (compare == false) {
    return res.json({
      message: "email or password not found.",
    });
  } else if (compare == true) {
    const accessToken = jwt.sign(
      {
        id: signInWithMail.id,
        mail: signInWithMail.mail,
      },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.send("connexion ok")
  }
};


