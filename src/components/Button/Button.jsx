import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({ onBtnClick }) => {
  return (
    <div className={css.btn}>
      <button type="button" onClick={onBtnClick} className={css.btnLoad}>
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  onBtnClick: PropTypes.func.isRequired,
};
