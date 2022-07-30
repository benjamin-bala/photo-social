import axios from 'axios';

export default async function fetcher(payload = {}) {
  let data = [];
  let error = { message: '', state: false };
  let loading = true;

  await axios({ baseURL: `http://localhost:8080/`, ...payload })
    .then((response) => {
      data = response.data;
      loading = false;
    })
    .catch((e) => {
      if (typeof e.response.data !== 'string') {
        error = { ...e.response.data, state: true };
        loading = false;
      } else {
        error = { message: e.response.data, state: true };
        loading = false;
      }
    });

  return { data, error, loading };
}
