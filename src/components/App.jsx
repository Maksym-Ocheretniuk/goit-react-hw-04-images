// import { Component } from 'react';
import { useState, useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThreeCircles } from 'react-loader-spinner';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

import { getImages } from 'api-service/getImages';

import css from './App.module.css';

// ! На ХУКах

export function App() {
  const [inputSearch, setInputSearch] = useState('');
  const [hits, setHits] = useState([]);
  // const [id, setId] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modalImageURL, setModalImageURL] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [endOfCollection, setEndOfCollection] = useState(false);

  useEffect(() => {
    if (!inputSearch) return;

    setLoading(true);

    getImages(inputSearch, page)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`No ${inputSearch}`));
      })
      .then(data => {
        if (!data.totalHits) {
          return toast.error(`No pictures for ${inputSearch}`);
        }

        const totalPages = Math.ceil(data.totalHits / 12);

        if (page === totalPages) {
          setEndOfCollection(true);
          return toast.error('No more pictures');
        }

        setHits([...hits, ...data.hits]);
        setEndOfCollection(false);
      })
      .catch(error => {
        console.log(error);
        return toast.error(`Something wrong`);
      })
      .finally(() => setLoading(false));
  }, [inputSearch, page]);

  const handleFormSubmit = inputSearch => {
    setInputSearch(inputSearch);
    setPage(1);
    setHits([]);
  };

  const handleImageClick = imageURL => {
    setShowModal(true);
    setModalImageURL(imageURL);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  // ----- Modal -----
  // const openModal = imageURL => {
  //   setShowModal(true);
  //   setModalImageURL(imageURL);
  // };

  const closeModal = () => {
    setShowModal(false);
    setModalImageURL('');
  };
  // ----- Modal -----

  return (
    <div className={css.app}>
      <Searchbar onSubmit={handleFormSubmit} />
      {loading && (
        <Loader>
          <ThreeCircles
            height="100"
            width="100"
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
          />
        </Loader>
      )}
      {hits && (
        <ImageGallery>
          <ImageGalleryItem images={hits} onImageClick={handleImageClick} />
        </ImageGallery>
      )}
      {hits.length > 0 && !endOfCollection && (
        <Button onBtnClick={() => handleLoadMore()} />
      )}
      {showModal && (
        <Modal onClose={closeModal}>
          <img src={modalImageURL} alt="Modal Window" />
        </Modal>
      )}
      <ToastContainer autoClose={2500} theme="colored" />
    </div>
  );
}

// ! На КЛАСових КОМПОНЕНТах

// export class App extends Component {
//   state = {
//     inputSearch: '',
//     hits: [],
//     id: '',
//     page: 1,
//     loading: false,
//     modalImageURL: '',
//     showModal: false,
//     webformatURL: '',
//     largeImageURL: '',
//     endOfCollection: false,
//   };

//   componentDidUpdate(_, prevState) {
//     const { inputSearch, page } = this.state;

//     if (inputSearch !== prevState.inputSearch || page !== prevState.page) {
//       this.setState({ loading: true });

//       getImages(inputSearch, page)
//         .then(res => {
//           if (res.ok) {
//             return res.json();
//           }
//           return Promise.reject(new Error(`No ${inputSearch}`));
//         })
//         .then(data => {
//           if (!data.totalHits) {
//             return toast.error(`No pictures for ${inputSearch}`);
//           }

//           const totalPages = Math.ceil(data.totalHits / 12);

//           if (page === totalPages) {
//             this.setState({ endOfCollection: true });
//             return toast.error('No more pictures');
//           }

//           this.setState(prevState => ({
//             hits: [...prevState.hits, ...data.hits],
//             endOfCollection: false,
//           }));
//         })
//         .catch(error => {
//           console.log(error);
//           return toast.error(`Something wrong`);
//         })
//         .finally(() => this.setState({ loading: false }));
//     }
//   }

//   handleFormSubmit = inputSearch => {
//     this.setState({ inputSearch, page: 1, hits: [] });
//   };

//   handleLoadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   // Modal
//   openModal = imageURL => {
//     this.setState({ showModal: true, modalImageURL: imageURL });
//   };

//   closeModal = () => {
//     this.setState({ showModal: false, modalImageURL: '' });
//   };

//   handleImageClick = imageURL => {
//     this.setState({ showModal: true, modalImageURL: imageURL });
//   };

//   render() {
//     const { hits, loading, showModal, modalImageURL, endOfCollection } =
//       this.state;

//     return (
//       <div className={css.app}>
//         <Searchbar onSubmit={this.handleFormSubmit} />

//         {loading && (
//           <Loader>
//             <ThreeCircles
//               height="100"
//               width="100"
//               color="#4fa94d"
//               wrapperStyle={{}}
//               wrapperClass=""
//               visible={true}
//               ariaLabel="three-circles-rotating"
//               outerCircleColor=""
//               innerCircleColor=""
//               middleCircleColor=""
//             />
//           </Loader>
//         )}

//         {hits && (
//           <ImageGallery>
//             <ImageGalleryItem
//               images={hits}
//               onImageClick={this.handleImageClick}
//             />
//           </ImageGallery>
//         )}

//         {hits.length > 0 && !endOfCollection && (
//           <Button onBtnClick={() => this.handleLoadMore()} />
//         )}

//         {showModal && (
//           <Modal onClose={this.closeModal}>
//             <img src={modalImageURL} alt="Modal Window" />
//           </Modal>
//         )}

//         <ToastContainer autoClose={4000} theme="colored" />
//       </div>
//     );
//   }
// }

// ! базова розмітка
// export const App = () => {
//   return (
//     <div
//       style={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 40,
//         color: '#010101',
//       }}
//     >
//       React homework template
//     </div>
//   );
// };
