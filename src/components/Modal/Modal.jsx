import { Component } from 'react';
import PropTypes from 'prop-types';

import css from './Modal.module.css';

export class Modal extends Component {
  // state = {};

  componentDidMount() {
    window.addEventListener('keydown', this.handleEscapeClose);
    document.body.classList.toggle('_lock');
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscapeClose);
    document.body.classList.toggle('_lock');
  }

  handleEscapeClose = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBcgClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div onClick={this.handleBcgClick} className={css.modal__over}>
        <div className={css.modal__window}>{this.props.children}</div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
