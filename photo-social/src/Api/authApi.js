import fetcher from '../utils/fetcher';

export async function loginApi(username, password) {
  let payload = {
    method: 'post',
    data: { username, password },
    url: '/user/login',
  };
  const { loading, error, data } = await fetcher(payload);

  return { loading, error, data };
}

export async function registerApi(email, fullname, password, username) {
  let payload = {
    method: 'post',
    url: '/user/register',
    data: {
      email,
      password,
      fullname,
      username,
      profile_pic: '',
    },
  };
  const { loading, error, data } = await fetcher(payload);

  return { loading, error, data };
}
