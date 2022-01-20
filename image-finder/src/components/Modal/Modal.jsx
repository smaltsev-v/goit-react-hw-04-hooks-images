import  {useEffect} from "react";
import { createPortal } from 'react-dom';
import s from './Modal.module.css';
import PropTypes from "prop-types";

const modalRoot = document.querySelector('#modal-root');



export default function Modal({largeImg, onClose, tag}) {
  useEffect(() => {
    const handelKeydown = (e) => {
      if (e.code === "Escape") {
        console.log("закрыть модалку");
        onClose();
      }
    };

    window.addEventListener('keydown', handelKeydown);

    return () => {
      window.removeEventListener('keydown', handelKeydown);
    };
  },[onClose]);
  
  const handelBackDropClick = (e) => {
    console.log(e.currentTarget);
    console.log(e.target);

    if (e.currentTarget === e.target) {
      onClose();
    }
  };
  return createPortal(
    <div className={s.backdrop} onClick={handelBackDropClick}>
      <div className={s.content}>
        {this.props.children}
        <img src={largeImg} alt={tag} />
      </div>
    </div>,
    modalRoot
  );
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImg: PropTypes.string.isRequired,
};



// export default class Modal extends Component{
//    componentDidMount() {
//     window.addEventListener("keydown", this.handelKeydown);
//   }
//   componentWillUnmount() {
//     window.removeEventListener("keydown", this.handelKeydown);
//   }

//   handelKeydown = (e) => {
//     if (e.code === "Escape") {
//       console.log("закрыть модалку");
//       this.props.onClose();
//     }
//   };
  
//   handelBackDropClick = (e) => {
//     console.log(e.currentTarget);
//     console.log(e.target);

//     if (e.currentTarget === e.target) {
//       this.props.onClose();
//     }
//   };


//   render() {
//     const { largeImg, tag } = this.props;

//     return createPortal(
//       <div className={s.backdrop} onClick={this.handelBackDropClick}>
//         <div className={s.content}>
//           {this.props.children}
//           <img src={largeImg} alt={tag} />
//         </div>
//       </div>,
//       modalRoot
//     );
      
//   }
// }

// Modal.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   largeImg: PropTypes.string.isRequired,
// };





 

