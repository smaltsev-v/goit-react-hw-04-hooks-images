import {  useState } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './Searchbar.module.css';
import PropTypes from "prop-types";



export default function Searchbar({onSubmit}) {
  const [query, setQuery] = useState('')
   
  
  const handleChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === '') {
      toast.error('Введите запрос.', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      
      return;
    }
    onSubmit(query);
    setQuery('');
  };
    
  return (
    <header className={s.searchbar}>
      <form className={s.searchForm} onSubmit={handleSubmit}>
        <button className={s.searchFormBtn} type="submit">
          <span className={s.searchFormBtnLabel}>Search</span>
          <ImSearch />
        </button>

        <input
          className={s.searchFormInput}
          value={query}
          onChange={handleChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};









