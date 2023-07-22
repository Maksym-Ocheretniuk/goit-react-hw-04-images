import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ images, onImageClick }) => {
  return (
    <>
      {images.map(({ id, webformatURL, tags }) => {
        return (
          <li key={id} className={css.imageGalleryItem}>
            <img
              src={webformatURL}
              alt={tags}
              onClick={() => onImageClick(webformatURL)}
              className={css.imageGalleryItemImg}
            />
          </li>
        );
      })}
    </>
  );
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      webformatURL: PropTypes.string,
      tags: PropTypes.string,
    })
  ),
  onImageClick: PropTypes.func.isRequired,
};
