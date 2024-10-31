import React from 'react';
import './styles.scss';

const Modal = ({ title, children, onCancel = () => {} }) => {
  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <h3>{title}</h3>
        {children}
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default Modal;
