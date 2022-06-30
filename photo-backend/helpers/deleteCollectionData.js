async function deleteCollectionData(response = null, Collection, _dataId) {
  const dbCollection = await Collection.findByIdAndDelete({ _id: _dataId });

  if (!dbCollection) {
    response.status(404).json({ message: 'An error occured', status: 'error' });
  } else {
    response.status(200).json({
      status: 'success',
      message: 'deleted successfully',
    });
  }
}

module.exports = deleteCollectionData;
