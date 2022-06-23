const router = require('express').Router();
const Photo = require('../models/photo');
const upload = require('../middleware/multer');

/*
Todos
- Add picture
- Like Picture
- Save Picture
- Delete Picture
- Get all photo
- Get photo by Tag
*/

//Add pictures
router.route('/add').post(upload.array('image'), async (req, res) => {
  const { title, caption, tags, address, posted_by } = req.body;

  console.log('body', req.body);

  let urls = [];

  req.files.map((url) => {
    urls.push(url.path);
  });

  const newPhoto = new Photo({
    posted_by,
    title,
    caption,
    tags: tags.split(' '),
    photo: urls,
    address,
  });

  newPhoto
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(400).json({ message: `Error: ${err}` });
    });
});

//Like Pictures
router.route('/like').post(async (req, res) => {
  const { user_id, photo_id } = req.body;
  const picture = await Photo.findById(photo_id);

  if (!picture) {
    return res.status(404).json({ message: 'photo not found' });
  }

  let likes = picture.likes;

  let hasLiked;

  if (likes.length === 0) {
    hasLiked = false;
  }

  likes.map((like) => {
    if (like === user_id) {
      hasLiked = true;
    } else {
      hasLiked = false;
    }
  });

  if (!hasLiked) {
    likes = [...likes, user_id];
  } else {
    // likes = likes.splice(likes.indexOf(user_id), 0);
    likes = likes.filter((like) => like !== user_id);
  }

  const updatedLikes = await Photo.findByIdAndUpdate(
    photo_id,
    { likes },
    { new: true }
  );

  updatedLikes
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(400).json({ message: `Error: ${err}` });
    });
});

module.exports = router;

//Create function updatePhoto

// User Id : '62ab465b6dff1e38a5cfba23', '62b07c5870fd898f412a0072';
//Photo Id: 62b47aeb2bb525b53163d974
