import { useState, useEffect, useCallback, useRef } from "react";
import imgApi from './services/imgApi.jsx';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Modal from './components/Modal';
import ComponentLoader from './components/Loader';
import { MdClose } from "react-icons/md";

const App = () => {
  const [hits, setHits] = useState([]);
  const [largeImg, setLargeImg] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchImages = useCallback(() => {
    const options = { searchQuery, currentPage };

    if (!searchQuery) return;

    setIsLoading(true);

    imgApi
      .fetchImages(options)
      .then((hits) => {
        setHits(prevHits => [...prevHits, ...hits]);
      })
      .catch(setError)
      .finally(() => {
        setIsLoading(false)
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      });
  }, [currentPage, searchQuery]);

  useEffect(fetchImages, [fetchImages])

  const onOpenModal = (e) => {
    const largeImgUrl = e.target.dataset.src;

    setLargeImg(largeImgUrl);
  };

  const closeModal = () => setLargeImg('')

  const handleFormSubmit = (inquiry) => {
    if (inquiry === searchQuery) return;

    setSearchQuery(inquiry);
    setCurrentPage(1);
    setHits([]);
    setError(null);
  }

  const shouldRenderLoadMoreBtn = hits.length > 0 && !isLoading;

  const onLoadMoreClick = () => setCurrentPage(page => page + 1);

  return (
    <div>
      {(error || (searchQuery && hits.length === 0)) && <h1>Not found please try again</h1>}
      <Searchbar onSubmit={handleFormSubmit} />

      {isLoading && <ComponentLoader />}

      {searchQuery && <ImageGallery hits={hits} onClick={onOpenModal} />}

      {shouldRenderLoadMoreBtn && <Button onClick={onLoadMoreClick} />}

      {/* <button type="button" onClick={toggleModal} > Open Modal</button> */}
      {largeImg && (
        <Modal onClose={closeModal} largeImg={largeImg}>
          <button
            className="btnCloseModal"
            type="button"
            onClick={closeModal}
          >
            <MdClose />
          </button>
        </Modal>
      )}
    </div>
  );
}

export default App;