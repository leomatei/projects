import React from 'react';

import Modal from '../modal';

const DeleteProjectModal = ({
  content = '',
  onConfirm = () => {},
  onCancel = () => {},
}) => {
  return (
    <Modal title='Are you sure you want to delete this project?'>
      <p>{content}</p>
      <button onClick={onConfirm}>Confirm</button>
      <button onClick={onCancel}>Cancel</button>
    </Modal>
  );
};
export default DeleteProjectModal;
