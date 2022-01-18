import {useState, useEffect, useCallback, useRef} from "react";
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
  const [showModal, setShowModal] = useState(false);

  const pageRef = useRef(1);

  const fetchImages = useCallback(() => {
    if (pageRef.current === null || pageRef.current === undefined) return;
    const currentPage = pageRef.current;

    const options = { searchQuery, currentPage };
    
    if (!searchQuery) return;

    setIsLoading(true);
    
    imgApi
    .fetchImages(options)
    .then((hits) => {
      setHits(prevHits => [...prevHits, ...hits]);
      pageRef.current = currentPage + 1;
      })
      .catch(setError)
      .finally(() => {
        setIsLoading(false)
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
        });
      });
}, [searchQuery]);   

  useEffect(fetchImages, [fetchImages]);

  const onOpenModal = (e) => {
    const largeImgUrl = e.target.dataset.src;

    setShowModal(true);
    setLargeImg(largeImgUrl);
  };

  const closeModal = () => setShowModal(false)

  const handleFormSubmit = (inquiry) => {
    if (inquiry === searchQuery) return;

    setSearchQuery(inquiry);
    setHits([]);
    pageRef.current = 1;
    setError(null);
  }

  const shouldRenderLoadMoreBtn = hits.length > 0 && !isLoading;

  return (
    <div>
      {(error || (searchQuery && hits.length === 0)) && <h1>Not found please try again</h1>}
      <Searchbar onSubmit={handleFormSubmit} />
      
      {isLoading && <ComponentLoader />}

      {searchQuery && <ImageGallery hits={hits} onClick={onOpenModal} />}

      {shouldRenderLoadMoreBtn && <Button onClick={fetchImages} />}

      {/* <button type="button" onClick={toggleModal} > Open Modal</button> */}
      {showModal && (
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