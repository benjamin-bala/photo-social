import { useContext, useEffect, useState } from 'react';
import Feed from '../../Components/Feed';
import { storeContext } from '../../Context';
import { GET_PHOTOS } from '../../Api';

export default function Home() {
  const { dispatch, state } = useContext(storeContext);
  const [response, setResponse] = useState({
    loading: false,
    error: {},
  });

  // console.log(state);

  useEffect(() => {
    async function GET_HOME_DATA() {
      const { error, loading, data } = await GET_PHOTOS(state.user.token);

      console.log({ error, loading, data });

      if (error.state) {
        setResponse({ ...response, loading, error });
      } else {
        dispatch({ type: 'photo', payload: data.data });
      }
    }

    state.user && GET_HOME_DATA();
  }, []);

  return (
    <div>
      <Feed />
      <Feed />
      <Feed />
      <Feed />
    </div>
  );
}
