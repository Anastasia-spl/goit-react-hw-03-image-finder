import axios from 'axios';

const fetchImages = ({ searchQuery, pageNumber }) => {
  const key = '20395824-d8cdb960c2a62f226b2cade5d';

  return axios
    .get(
      `https://pixabay.com/api/?q=${searchQuery}&page=${pageNumber}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`,
    )
    .then(response => response.data.hits);
};

export default { fetchImages };
