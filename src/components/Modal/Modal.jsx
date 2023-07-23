// import { Component } from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

import css from './Modal.module.css';

// ! На ХУКах

export function Modal({ onClose, children }) {
  useEffect(() => {
    const handleEscapeClose = e => {
      if (e.code === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscapeClose);
    document.body.classList.toggle('_lock');

    return () => {
      window.removeEventListener('keydown', handleEscapeClose);
      document.body.classList.toggle('_lock');
    };
  }, [onClose]);

  const handleBcgClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div onClick={handleBcgClick} className={css.modal__over}>
      <div className={css.modal__window}>{children}</div>
    </div>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

// ! На КЛАСових КОМПОНЕНТах

// export class Modal extends Component {
//   // state = {};

//   componentDidMount() {
//     window.addEventListener('keydown', this.handleEscapeClose);
//     document.body.classList.toggle('_lock');
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleEscapeClose);
//     document.body.classList.toggle('_lock');
//   }

//   handleEscapeClose = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleBcgClick = e => {
//     if (e.currentTarget === e.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return (
//       <div onClick={this.handleBcgClick} className={css.modal__over}>
//         <div className={css.modal__window}>{this.props.children}</div>
//       </div>
//     );
//   }
// }

// Modal.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   children: PropTypes.node.isRequired,
// };
