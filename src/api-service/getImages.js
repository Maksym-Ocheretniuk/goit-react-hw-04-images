// https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12
// 37056848-912ded0eb5e75838ece32e5ab

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '37056848-912ded0eb5e75838ece32e5ab';

export const getImages = (inputSearch, page) => {
  // console.log('inputSearch =>', inputSearch);
  return fetch(
    `${BASE_URL}/?q=${inputSearch}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  // .then(res => res.json())
  // .then(images => console.log(images));
};
