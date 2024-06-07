const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// register
router.post("/register", async (req, res) => {
  try {
    // emcrpt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //submit data and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // console.log(user);
    // console.log(req.body.password);
    if (!user) {
      return res.status(404).json("User Not Found");
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json("Incorrect Password");
    }
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error");
  }
});

// router.post("/login2", async (req, res) => {
//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json("User Not Found");
//     }
//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) {
//       return res.status(400).json("Incorrect Password");
//     }

// });

module.exports = router;
