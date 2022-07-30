import { useContext, useState } from 'react';
import Roller from '../../Components/Loader/Roller';
import { loginApi } from '../../Api';
import { storeContext } from '../../Context';
import { BsExclamationCircleFill } from 'react-icons/bs';
import { Navigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('aas');
  const [password, setPassword] = useState('asas');
  const [response, setResponse] = useState({
    loading: false,
    error: { state: false },
  });
  const { dispatch, state } = useContext(storeContext);

  async function onSubmit(event) {
    event.preventDefault();

    setResponse({ ...response, loading: true });

    let { data, loading, error } = await loginApi(username, password);
    setTimeout(() => {
      if (data?.token) {
        dispatch({ type: 'user', payload: data });
        setResponse({ ...response, loading, error, data });
      } else {
        setResponse({ ...response, loading, error });
      }
    }, 1000);

    console.log('From login ', { data, loading, error });
  }

  return (
    <div className='max-w-2xl mx-auto'>
      {state?.user?.token && <Navigate to={'/dash'} replace={true} />}
      <form className='flex gap-6 flex-col justify-center items-center p-8'>
        <div className='my-6'>
          <h2 className='text-3xl'>Welcome back 🎉</h2>
        </div>
        <div className='w-full md:w-[500px]'>
          <div className=' w-full p-2'>
            <p className='mb-2 text-gray-500 text-sm'>Username</p>
            <input
              className='text-lg bg-gray-100/70 hover:bg-gray-200/90 focus:bg-gray-200/60 w-full p-2 my-1 rounded-lg outline-none'
              type='text'
              placeholder='Someonesaid'
              name='username'
              onChange={(event) => setUsername(event.target.value)}
            />
            {response?.error?.message &&
            response?.error?.message.includes('User not found') ? (
              <ErrorMessage message={'Invalid username'} />
            ) : null}
          </div>
          <div className=' w-full p-2'>
            <p className='mb-2 text-gray-500 text-sm'>Password</p>
            <input
              className='text-lg bg-gray-100/70 hover:bg-gray-200/90 focus:bg-gray-200/60 w-full p-2 my-1 rounded-lg outline-none'
              type='password'
              name='password'
              placeholder='**********'
              onChange={(event) => setPassword(event.target.value)}
            />
            {response?.error?.message &&
            response?.error?.message.includes('Incorrect password') ? (
              <ErrorMessage message={'Incorrect password'} />
            ) : null}

            {/*(response.error.state &&
              response?.error?.message &&
              !response?.error?.message.includes('User')) ||
            !response?.error?.message.includes('Password') ? (
              <ErrorMessage message={'An error occured! try again'} />
            ) : null */}

            <p className='text-sm my-2'>Forgot password?</p>
          </div>

          <div className='my-8 gap-5 flex flex-col justify-center items-center'>
            <div>
              {response.loading && response.loading ? <Roller /> : null}
            </div>
            <div>
              <button
                name='login'
                type='button'
                className='btn bg-gray-400/50 hover:bg-gray-400/90 py-3 px-8 rounded-3xl w-[200px]'
                onClick={(e) => onSubmit(e)}
              >
                Login
              </button>
            </div>

            <div className='w-full mt-8'>
              <p className='text-center text-sm'>
                Don't have an account? signup
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function ErrorMessage(props) {
  return (
    <div className='flex items-center gap-2 text-red-600'>
      <BsExclamationCircleFill />
      <p className='text-sm font-bold'>{props.message}</p>
    </div>
  );
}
