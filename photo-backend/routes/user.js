const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_KEY = process.env.JWT_KEY;

//Register user
router.route('/register').post(async (req, res) => {
  const { fullname, email, username, password, profile_pic } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    fullname,
    email,
    username,
    password: encryptedPassword,
    profile_pic,
  });

  newUser
    .save()
    .then((user) => {
      let token = jwt.sign({ id: user._id }, JWT_KEY);
      // console.log(result);
      res.json({
        token,
        user: {
          email: user.email,
          username: user.username,
          fullname: user.fullname,
          profile_pic: user.profile_pic,
          id: user._id,
          followers: user.followers,
          following: user.following,
          saved_backdrops: user.saved_backdrops,
        },
      });
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

const verifyUserLogin = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) {
    return { status: 'error', message: 'User not found' };
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return { status: 'error', message: 'Incorrect password' };
  }
  let token = jwt.sign({ id: user._id }, JWT_KEY);
  return {
    token,
    user: {
      email: user.email,
      username: user.username,
      fullname: user.fullname,
      profile_pic: user.profile_pic,
      id: user._id,
      followers: user.followers,
      following: user.following,
      saved_backdrops: user.saved_backdrops,
    },
    status: 'success',
  };
};

//Login user
router.route('/login').post(async (req, res) => {
  const { username, password } = req.body;
  const { token, user, status, message } = await verifyUserLogin(
    username,
    password
  );
  if (status === 'error') {
    return res.status(400).json({ status, message });
  }
  return res.json({ token, user, status });
});

//Get user(s) by id
router.route('/').post(async (req, res) => {
  const { ids } = req.body;

  const users = await User.find({ _id: { $in: ids } });
  if (!users) {
    return res.status(404).json('User not found');
  }

  let usersFromDB = [];

  users.map((user) => {
    return usersFromDB.push({
      email: user.email,
      username: user.username,
      fullname: user.fullname,
      profile_pic: user.profile_pic,
    });
  });

  return res.json(usersFromDB);
});

module.exports = router;
