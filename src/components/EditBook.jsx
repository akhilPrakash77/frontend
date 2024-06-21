import React from 'react';
import { Modal, notification } from 'antd';
import BookForm from './BookForm';
import axios from 'axios';

const EditBook = ({ visible, book, onUpdate, onCancel }) => {
  const handleUpdate = async (values) => {
    try {
      const response = await axios.put(`/books/${book._id}`, values);
      notification.success({
        message: 'Success',
        description: 'Book updated successfully',
      });
      onUpdate(response.data);
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
      title="Edit Book"
      onCancel={onCancel}
      footer={null}
    >
      <BookForm book={book} onFinish={handleUpdate} />
    </Modal>
  );
};

export default EditBook;