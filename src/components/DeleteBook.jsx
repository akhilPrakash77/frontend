import React from 'react';
import { Modal, Button, notification } from 'antd';
import axios from 'axios';

const DeleteBook = ({ visible, book, onDelete, onCancel }) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/books/${book._id}`);
      notification.success({
        message: 'Success',
        description: 'Book deleted successfully',
      });
      onDelete(book._id);
    } catch (error) {
      console.error('Error:', error);
      notification.error({
        message: 'Error',
        description: error.message || 'Something went wrong',
      });
    }
  };

  return (
    <Modal
      visible={visible}
      title="Delete Book"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="delete" type="primary" danger onClick={handleDelete}>
          Delete
        </Button>,
      ]}
    >
      <p>Are you sure you want to delete this book?</p>
    </Modal>
  );
};

export default DeleteBook;