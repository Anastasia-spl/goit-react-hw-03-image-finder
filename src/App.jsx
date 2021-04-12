import { Component } from 'react';
import PropTypes from 'prop-types';

import imageFinderApi from './components/ImageFinderApi';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Container from './components/Container';
import Modal from './components/Modal';

import './commonStyles.css';
import Loader from 'react-loader-spinner';

class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    pageNumber: 1,
    isLoading: false,
    largeImageURL: '',
    showModal: false,
  };

  onFormSubmit = query => {
    this.setState({
      searchQuery: query,
      images: [],
      pageNumber: 1,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { searchQuery, pageNumber } = this.state;
    const options = {
      searchQuery,
      pageNumber,
    };
    this.setState({ isLoading: true });

    imageFinderApi
      .fetchImages(options)
      .then(images => {
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          pageNumber: (prevState.pageNumber += 1),
        }));
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
        if (images.length === 0) {
          alert('No images found, try another request');
        }
      })
      .catch(() => alert('Sorry, something went wrong'))
      .finally(() => this.setState({ isLoading: false }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleClickImage = largeImageURL => {
    this.toggleModal();
    this.setState({ largeImageURL: largeImageURL });
  };

  render() {
    const {
      images,
      searchQuery,
      isLoading,
      showModal,
      largeImageURL,
    } = this.state;
    const showLoadMoreButton = images.length > 0;

    return (
      <>
        <Searchbar onSubmit={this.onFormSubmit} />
        <main>
          <Container>
            <ImageGallery
              images={images}
              alt={searchQuery}
              handleClickImage={this.handleClickImage}
            />

            {isLoading ? (
              <Loader type="Circles" color="#3f51b5" height={80} width={80} />
            ) : (
              showLoadMoreButton && (
                <Button fetchImages={this.fetchImages}>Load more</Button>
              )
            )}
          </Container>
          {showModal && (
            <Modal toggleModal={this.toggleModal}>
              {' '}
              <img src={largeImageURL} alt="" />
            </Modal>
          )}
        </main>
      </>
    );
  }
}

App.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
  searchQuery: PropTypes.string,
  pageNumber: PropTypes.number,
};

export default App;
