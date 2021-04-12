import styles from './Button.module.scss';

const Button = ({ children, fetchImages }) => {
  const handleClick = () => {
    fetchImages();
  };

  return (
    <button type="button" className={styles.Button} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;
