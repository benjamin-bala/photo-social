import { useState, useContext } from 'react';
import { uuid } from '../../utils/uuid';
import { GoCloudUpload } from 'react-icons/go';
import { storeContext } from '../../Context';
import { ADD_PHOTOS } from '../../Api';
import Roller from '../../Components/Loader/Roller';
import { useNavigate } from 'react-router-dom';
import { BsExclamationCircleFill } from 'react-icons/bs';
// import { MdCancel } from 'react-icons/md';

export default function UploadPhoto() {
  const { state, dispatch } = useContext(storeContext);
  const [file, setFile] = useState(null);

  const [response, setResponse] = useState({
    loading: false,
    error: { state: false },
  });

  const [message, setMessage] = useState('');
  let navigate = useNavigate();

  function handleChange(event) {
    return setFile(event.target.files);
  }

  async function handleSubmit(event) {
    setResponse({ ...response, loading: true });

    event.preventDefault();
    const formData = new FormData(event.target);

    formData.set('image', formData.get('image'));
    formData.set('title', formData.get('title'));
    formData.set('caption', formData.get('caption'));
    formData.set('address', formData.get('address'));
    formData.set('tags', 'air land nature');
    formData.set('posted_by', state.user.user.id);
    formData.set('username', state.user.user.username);

    // const {data, loading}

    const payload = { token: state.user.token, data: formData };

    let { data, loading, error } = await ADD_PHOTOS(payload);

    console.log(error);

    if (error.state) {
      setResponse({ ...response, loading, error });
    } else {
      setResponse({ error, loading });
      dispatch({ type: 'photo', payload: data.data });
      setMessage('Your new spot has been added');
      setTimeout(() => {
        navigate('/dash', { replace: true });
      }, 2000);
    }

    console.log({ data, loading, error });
  }

  //   function removePhoto(id) {
  //     file &&
  //       Object.keys(file).filter((_id) => {
  //         console.log(_id !== id);
  //         if(_id !== id){
  //             setFile([])
  //         }
  //       });
  //   }

  return (
    <div>
      {message !== '' ? (
        <div className='fixed t-0 bg-white py-2 border-l-4 border-green-400'>
          <p className='pl-4 text-bold text-gray-800'>
            You just uploaded a new spot 🎉
          </p>
        </div>
      ) : null}
      <form method='post' onSubmit={(event) => handleSubmit(event)}>
        <div className='flex justify-center items-center w-full'>
          <label
            htmlFor='dropzone-file'
            className='flex flex-col justify-center items-center w-full h-32 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-gray-300/60 dark:bg-gray-100 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
          >
            <div className='flex flex-col justify-center items-center pt-5 pb-6'>
              <GoCloudUpload size={50} fill='#eaeaea' />
              <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                <span className='font-semibold'>Click or drag and drop </span>{' '}
                to upload a spot
              </p>
              <p className='text-xs text-gray-500 dark:text-gray-400'>
                PNG, JPG images only
              </p>
            </div>
            <input
              onChange={(event) => handleChange(event)}
              type='file'
              name='image'
              multiple
              className='hidden'
              id='dropzone-file'
            />
          </label>
        </div>

        <div className='flex gap-3 my-5 h-[75px]'>
          {file &&
            Object.keys(file).map((_url) => {
              return (
                <div key={uuid()} className='relative flex-1/2'>
                  <img
                    src={URL.createObjectURL(file[_url])}
                    alt=''
                    className='w-[75px] h-full rounded-lg object-cover'
                  />
                  {/*<div className='absolute -top-1 -right-1 cursor-pointer bg-white rounded-full'>
                    <MdCancel className='hover:text-red-600' />
              </div>*/}
                </div>
              );
            })}
        </div>

        <div className='my-5'>
          <p className='mb-2 text-gray-500 text-sm'>Spot Name</p>
          <input
            className='text-lg bg-gray-100/70 hover:bg-gray-200/90 focus:bg-gray-200/60 w-full p-2 my-1 rounded-lg outline-none'
            type='text'
            name='title'
            placeholder='Spot Name'
          />
        </div>
        <div className='my-5'>
          <p className='mb-2 text-gray-500 text-sm'>Caption</p>
          <textarea
            className='text-lg bg-gray-100/70 hover:bg-gray-200/90 focus:bg-gray-200/60 w-full p-2 my-1 rounded-lg outline-none'
            name='caption'
          ></textarea>
        </div>
        <div className='my-5'>
          <p className='mb-2 text-gray-500 text-sm'>Address</p>
          <input
            className='text-lg bg-gray-100/70 hover:bg-gray-200/90 focus:bg-gray-200/60 w-full p-2 my-1 rounded-lg outline-none'
            type='text'
            name='address'
            placeholder='Address'
          />
        </div>
        {/*<div className='my-5'>
          <p className='mb-2 text-gray-500 text-sm'>Tags</p>
          <input
            className='text-lg bg-gray-100/70 hover:bg-gray-200/90 focus:bg-gray-200/60 w-full p-2 my-1 rounded-lg outline-none'
            type='text'
            name='tags'
            placeholder='Tags'
          />
        </div>*/}
        <div className='my-5'>
          {response?.error.state && (
            <ErrorMessage message={'An error occured, Try again'} />
          )}
        </div>
        <div>
          {response.loading && (
            <div className='h-24 flex justify-center items-center my-8'>
              <Roller />
            </div>
          )}

          <button
            disabled={response.loading ? true : false}
            name='upload-photo'
            type='submit'
            className='btn bg-gray-400/50 hover:bg-gray-400/90 py-3 px-8 rounded-3xl w-full justify-center gap-2 flex items-center'
          >
            <GoCloudUpload size={20} />
            Upload new spot
          </button>
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
