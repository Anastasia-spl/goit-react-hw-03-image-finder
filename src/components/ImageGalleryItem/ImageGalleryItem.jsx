import styles from './ImageGalleryItem.module.scss';

const ImageGalleryItem = ({
  webFormatURL,
  alt,
  largeImageURL,
  handleClickImage,
}) => {
  return (
    <li
      className={styles.ImageGalleryItem}
      onClick={() => handleClickImage(largeImageURL)}
    >
      <img src={webFormatURL} alt={alt} className={styles.image} />
    </li>
  );
};

export default ImageGalleryItem;
