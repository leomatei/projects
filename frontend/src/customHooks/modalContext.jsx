import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    content: '',
    onConfirm: () => {},
    onCancel: () => {},
  });

  const openModal = ({ content, onConfirm, onCancel }) => {
    setModalData({ content, onConfirm, onCancel });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <ModalContext.Provider
      value={{ isModalOpen, modalData, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
