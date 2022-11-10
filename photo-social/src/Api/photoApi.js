import fetcher from '../utils/fetcher';

export async function GET_PHOTOS(token, _data) {
  // console.log(_data, ' photo data');
  let payload = {
    headers: { Authorization: token },
    url: '/photo/',
    method: 'post',
    data: _data ? { ids: _data } : {},
  };
  const { loading, error, data } = await fetcher(payload);

  return { loading, error, data };
}

export async function ADD_PHOTOS(_data) {
  let payload = {
    headers: {
      Authorization: _data.token,
      'content-type': 'multipart/form-data',
    },
    url: '/photo/add',
    method: 'post',
    data: _data.data,
  };
  const { loading, error, data } = await fetcher(payload);

  return { loading, error, data };
}

export async function LIKE_PHOTO(_data) {
  let payload = {
    headers: {
      Authorization: _data.token,
    },
    url: '/photo/like',
    method: 'post',
    data: _data.data,
  };
  const { loading, error, data } = await fetcher(payload);

  return { loading, error, data };
}

export async function COMMENT_PHOTO(_data) {
  let payload = {
    headers: {
      Authorization: _data.token,
    },
    url: '/photo/comment',
    method: 'post',
    data: _data.data,
  };
  const { loading, error, data } = await fetcher(payload);

  return { loading, error, data };
}

export async function SAVE_PHOTO(_data) {
  let payload = {
    headers: {
      Authorization: _data.token,
    },
    url: '/photo/save',
    method: 'post',
    data: _data.data,
  };
  const { loading, error, data } = await fetcher(payload);

  return { loading, error, data };
}
