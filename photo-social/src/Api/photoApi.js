import fetcher from '../utils/fetcher';

export async function GET_PHOTOS(token) {
  let payload = { headers: { Authorization: token }, url: '/photo/' };
  const { loading, error, data } = await fetcher(payload);

  return { loading, error, data };
}
