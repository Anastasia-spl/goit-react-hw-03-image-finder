import styles from './ImageGallery.module.scss';
import ImageGalleryItem from '../ImageGalleryItem';

const ImageGallery = ({ images, alt, handleClickImage }) => (
  <ul className={styles.ImageGallery}>
    {images.map(({ id, webformatURL, largeImageURL }) => (
      <ImageGalleryItem
        key={id}
        webFormatURL={webformatURL}
        largeImageURL={largeImageURL}
        alt={alt}
        handleClickImage={handleClickImage}
      />
    ))}
  </ul>
);

export default ImageGallery;
