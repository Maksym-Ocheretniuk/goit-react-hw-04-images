// import { Component } from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';

import css from './Searchbar.module.css';

// ! На ХУКах

export function Searchbar({ onSubmit }) {
  const [inputSearch, setInputSearch] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (inputSearch.trim() === '') {
      return toast.error('Hi :) input something for search');
    }
    onSubmit(inputSearch);
    setInputSearch('');
  };

  const handleInputChange = e => {
    setInputSearch(e.currentTarget.value.toLowerCase());
  };

  return (
    <header className={css.searchBar}>
      <form onSubmit={handleSubmit} className={css.searchForm}>
        <button type="submit" className={css.searchButton}>
          <ImSearch />
        </button>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputSearch}
          onChange={handleInputChange}
          className={css.searchInput}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

// ! На КЛАСових КОМПОНЕНТах
// export class Searchbar extends Component {
//   state = {
//     inputSearch: '',
//   };

//   handleInputChange = e => {
//     this.setState({ inputSearch: e.currentTarget.value.toLowerCase() });
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     if (this.state.inputSearch.trim() === '') {
//       return toast.error('Hi :) input something for search');
//     }
//     this.props.onSubmit(this.state.inputSearch);
//     this.setState({ inputSearch: '' });
//   };

//   render() {
//     return (
//       <header className={css.searchBar}>
//         <form onSubmit={this.handleSubmit} className={css.searchForm}>
//           <button type="submit" className={css.searchButton}>
//             <ImSearch />
//           </button>
//           <input
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             value={this.state.inputSearch}
//             onChange={this.handleInputChange}
//             className={css.searchInput}
//           />
//         </form>
//       </header>
//     );
//   }
// }

// Searchbar.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };
