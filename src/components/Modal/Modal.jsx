import { createPortal } from 'react-dom';
import { PureComponent } from 'react';
import styles from './Modal.module.scss';

const modalRoot = document.getElementById('modal-root');

class Modal extends PureComponent {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      this.props.toggleModal();
    }
  };

  render() {
    return createPortal(
      <div className={styles.Overlay} onClick={e => this.handleOverlayClick(e)}>
        <div className={styles.Modal}>{this.props.children}</div>
      </div>,
      modalRoot,
    );
  }
}

export default Modal;
