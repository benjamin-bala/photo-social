async function updateCollectionData(
  response = null,
  fieldToUpdate,
  Collection,
  _dataId,
  _idToUpdate
) {
  const dbCollection = await Collection.findById(_idToUpdate);

  if (!dbCollection) {
    if (typeof response !== 'string') {
      return response
        .status(404)
        .json({ message: 'error', error: 'Data not found' });
    }
  }

  let dataToUpdate;
  let hasData;
  let infoFromUpdate;

  switch (fieldToUpdate) {
    case 'likes':
      dataToUpdate = dbCollection.likes;
      break;
    case 'saved_backdrops':
      dataToUpdate = dbCollection.saved_backdrops;
      break;
    case 'followers':
      dataToUpdate = dbCollection.followers;
      break;
    case 'following':
      dataToUpdate = dbCollection.following;
      break;
    default:
      dataToUpdate = [];
  }

  if (dataToUpdate.length === 0) {
    hasData = false;
  }

  dataToUpdate.map((_id) => {
    if (_id === _dataId) {
      hasData = true;
    } else {
      hasData = false;
    }
  });

  if (!hasData) {
    dataToUpdate = [...dataToUpdate, _dataId];
  } else {
    dataToUpdate = dataToUpdate.filter((_id) => _id !== _dataId);
  }

  const updatedData = await Collection.findByIdAndUpdate(
    _idToUpdate,
    { [fieldToUpdate]: dataToUpdate },
    { new: true }
  );

  updatedData
    .save()
    .then((data) => {
      if (typeof response !== 'string') {
        response.json({ ...infoFromUpdate, message: 'success', data });
      }
    })
    .catch((error) => {
      if (typeof response !== 'string') {
        return response.status(404).json({ message: 'error', error });
      }
    });

  if (typeof infoFromUpdate === 'object') {
    return infoFromUpdate;
  }
}

module.exports = updateCollectionData;
