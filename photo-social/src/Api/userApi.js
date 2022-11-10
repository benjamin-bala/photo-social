import fetcher from '../utils/fetcher';

export async function GET_USER(_data) {
  let payload = {
    headers: { Authorization: _data.token },
    method: 'post',
    url: '/user/',
    data: { ids: _data.id },
  };
  const { loading, error, data } = await fetcher(payload);

  return { loading, error, data };
}

export async function FOLLOW_USER(_data) {
  let payload = {
    headers: { Authorization: _data.token },
    method: 'post',
    url: '/user/follow',
    data: { user_id: _data.user_id, follower_id: _data.follower_id },
  };
  const { loading, error, data } = await fetcher(payload);

  return { loading, error, data };
}

export async function EDIT_USER(payload) {
  let requestPayload = {
    headers: {
      Authorization: payload.token,
      'content-type': 'multipart/form-data',
    },
    method: 'post',
    url: '/user/edit',
    data: payload.data,
  };
  const { loading, error, data } = await fetcher(requestPayload);

  return { loading, error, data };
}
