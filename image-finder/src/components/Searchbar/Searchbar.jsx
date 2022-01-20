import {  useState } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';
import PropTypes from "prop-types";



export default function Searchbar({onSubmit}) {
  const [query, setQuery] = useState('')
   
  
  const handleChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // if (query.trim() === '') {
    //   toast.error('Введите запрос.');
    //   return;
    // }
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



// state = {
    //     : ''
    // };

    // handleChange = (e) => {
    //     this.setState({ query: e.currentTarget.value });
    // };

    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     this.props.onSubmit(this.state.query);
    // };

//   render() {
//     return (
//       <header className={s.searchbar}>
//         <form className={s.searchForm} onSubmit={this.handleSubmit}>
//           <button className={s.searchFormBtn} type="submit">
//                     <span className={s.searchFormBtnLabel}>Search</span>
//                     <ImSearch/>
//           </button>

//           <input
//             className={s.searchFormInput}
//             value={this.state.value}
//             onChange={this.handleChange}
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//           />
//         </form>
//       </header>
//     );
//   }
// }



// Searchbar.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };









