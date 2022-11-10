import { useContext, useEffect, useState } from 'react';
import Feed from '../../Components/Feed';
import { storeContext } from '../../Context';
import { GET_PHOTOS } from '../../Api';
import { uuid } from '../../utils/uuid';
import Roller from '../../Components/Loader/Roller';

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

      if (error.state) {
        setResponse({ ...response, loading, error });
      } else {
        dispatch({ type: 'photo', payload: data.data });
      }
    }

    state.user && GET_HOME_DATA();
  }, [state.user, response, dispatch]);

  if (!state.photo && response.loading) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <Roller />
      </div>
    );
  }

  return (
    <div className='flex flex-col-reverse'>
      {state.photo &&
        state.photo.map((_data) => {
          return <Feed key={uuid()} data={_data} />;
        })}
    </div>
  );
}
