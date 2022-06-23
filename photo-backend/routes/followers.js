const router = require('express').Router();
const User = require('../models/user');

router.route('/').post(async (req, res) => {
  const { user_id, follower_id } = req.body;
  const user = await User.findById(user_id);
  const follower = await User.findById(follower_id);
  if (!user && !follower) {
    return res.status(404).json({ message: 'User not found' });
  } else {
    let following = user.following;
    let followers = follower.followers;

    let canAdd;

    if (following.length === 0 || followers.length === 0) {
      canAdd = true;
    }

    following.map((_id) => {
      if (_id === follower_id) {
        canAdd = false;
      } else {
        canAdd = true;
      }
    });
    if (!canAdd) {
      following = following.filter((_id) => _id !== follower_id);
      followers = followers.filter((_id) => _id !== user_id);
      // followers.splice(followers.indexOf(user_id), 0);
    } else {
      following = [...following, follower_id];
      followers = [...followers, user_id];
    }

    const updatedUser = await User.findByIdAndUpdate(
      user_id,
      { following },
      { new: true }
    );
    const updatedFollower = await User.findByIdAndUpdate(
      follower_id,
      { followers },
      { new: true }
    );

    updatedFollower.save();
    updatedUser
      .save()
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        res.status(400).json('Error: ' + err);
      });
    // return res.json(user);
  }
});

module.exports = router;
