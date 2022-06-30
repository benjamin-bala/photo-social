const router = require('express').Router();
const Photo = require('../models/photo');
const User = require('../models/user');
const upload = require('../middleware/multer');
const updateCollectionData = require('../helpers/updateCollectionData');
const deleteCollectionData = require('../helpers/deleteCollectionData');

/*
Todos
- Add picture
- Like Picture
- Save Picture
- Delete Picture
- Get all photo
- Get photo by Tag
*/

//Get all photo
router.route('/').get(async (req, res) => {
  const photo = await Photo.find();

  if (!photo) {
    res.status(404).json({ message: 'No photo found', status: 'error' });
  }

  res.status(200).json({ data: photo, status: 'success' });
});

//Add pictures
router.route('/add').post(upload.array('image'), async (req, res) => {
  const { title, caption, tags, address, posted_by } = req.body;

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
  await updateCollectionData(res, 'likes', Photo, user_id, photo_id);
});

//Save picture
router.route('/save').post(async (req, res) => {
  const { user_id, photo_id } = req.body;
  await updateCollectionData(res, 'saved_backdrops', User, photo_id, user_id);
});

router.route('/delete').delete(async (req, res) => {
  const { photo_id } = req.body;
  await deleteCollectionData(res, Photo, photo_id);
});

module.exports = router;

//Create function updatePhoto findByIdAndUpdate

// User Id : '62ab465b6dff1e38a5cfba23', '62b07c5870fd898f412a0072';
//Photo Id: 62b47aeb2bb525b53163d974 62bdad6d1aba6209a3f01952 62bdadfa1aba6209a3f01954
