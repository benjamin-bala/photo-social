import { useContext, useEffect, useRef, useState } from 'react';
import { GET_PHOTOS } from '../../Api';
import Feed from '../../Components/Feed';
import SearchBox from '../../Components/SearchBox';
import Slider from '../../Components/Slider';
import { storeContext } from '../../Context';
import { uuid } from '../../utils/uuid';
import { TbSearchOff } from 'react-icons/tb';

export default function Search() {
  const { state } = useContext(storeContext);
  const [searchText, setSearchText] = useState('');
  const [response, setResponse] = useState({
    loading: false,
    error: {},
  });

  const searchInputRef = useRef();

  // const searchData = response.data
  //   ? response.data.filter((_data) => {
  //       return _data.title.toLowerCase().includes(searchText.toLowerCase());
  //     })
  //   : [];

  function handleChangeText(event) {
    setSearchText(event.target.value);
  }

  useEffect(() => {
    async function GET_SEARCH_PHOTO() {
      const { error, loading, data } = await GET_PHOTOS(state.user.token);

      if (error.state) {
        setResponse({ ...response, loading, error });
      } else {
        setResponse({ ...response, loading, error, data: data.data });
      }
    }
    GET_SEARCH_PHOTO();
  }, [state.user.token]);

  console.log(response?.data);

  let filteredData =
    response.data &&
    response.data.filter((_data) => {
      return (
        _data.title.toLowerCase().includes(searchText.toLowerCase()) ||
        _data.address.toLowerCase().includes(searchText.toLowerCase())
      );
    });

  return (
    <div>
      <div className='my-3'>
        <SearchBox searchData={handleChangeText} inputRef={searchInputRef} />
      </div>
      {document.activeElement === searchInputRef.current &&
      searchText.length > 0 ? (
        <div>
          {filteredData &&
            filteredData.map((_data) => {
              return <Feed data={_data} key={uuid()} />;
            })}

          {filteredData && filteredData.length < 1 && (
            <div className='flex flex-col items-center justify-center h-[200px]'>
              <TbSearchOff size={30} />
              <h2 className='text-lg'>Sorry we could not f.ind the spot</h2>
              <p className='font-semibold text-lg'>{searchText}</p>
            </div>
          )}
        </div>
      ) : (
        response.data && (
          <div>
            <Slider photo={response.data} name='Trending Backdrops' />
            <Slider photo={response.data} name='Recently Added Backdrops' />
          </div>
        )
      )}
    </div>
  );
}
