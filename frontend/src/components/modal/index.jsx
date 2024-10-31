import React, { useRef } from 'react';
import useOutsideClick from '../../customHooks/useOutsideClick';
import './styles.scss';

const Modal = ({ title, children, onCancel = () => {} }) => {
  const modalRef = useRef();
  useOutsideClick(modalRef, onCancel);
  return (
    <div className='modal-overlay'>
      <div className='modal' ref={modalRef}>
        <h3>{title}</h3>
        {children}
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default Modal;
