import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: '',
    content: <></>,
    onCancel: () => {},
  });

  const openModal = ({ title, content, onCancel }) => {
    setModalData({ title, content, onCancel });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalData({
      title: '',
      content: <></>,
      onCancel: () => {},
    });
    setIsModalOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{ isModalOpen, modalData, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
