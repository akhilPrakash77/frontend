import React from 'react';
import { Modal, Button, notification } from 'antd';
import BookForm from './BookForm';
import axios from 'axios';

const CreateBook = ({ visible, onCreate, onCancel }) => {
  const handleCreate = async (values) => {
    try {
      const response = await axios.post('/books', values);
      notification.success({
        message: 'Success',
        description: 'Book created successfully',
      });
      onCreate(response.data);
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
      title="Create New Book"
      onCancel={onCancel}
      footer={null}
    >
      <BookForm onFinish={handleCreate} />
    </Modal>
  );
};

export default CreateBook;