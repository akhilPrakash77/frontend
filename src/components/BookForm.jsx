import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, InputNumber, notification } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { TextArea } = Input;

const BookForm = ({ book, onFinish }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      title: book?.title || '',
      author: book?.author || '',
      desc: book?.desc || '',
      publishDate: book?.publishDate ? moment(book.publishDate) : null,
      price: book?.price || 0,
    });
  }, [book, form]);

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      let response;
      if (book) {
        response = await axios.put(`/books/${book._id}`, values);
        notification.success({
          message: 'Success',
          description: 'Book updated successfully',
        });
      } else {  
        response = await axios.post('/books', values);
        notification.success({
          message: 'Success',
          description: 'Book created successfully',
        });
      }
      form.resetFields();
      onFinish(response.data);
    } catch (error) {
      console.error('Error:', error);
      notification.error({
        message: 'Error',
        description: error.message || 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      onFinishFailed={onFinishFailed}
      initialValues={{ remember: true }}
    >
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true, message: 'Please enter title' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="author"
        label="Author"
        rules={[{ required: true, message: 'Please enter author' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="desc"
        label="Description"
        rules={[{ required: true, message: 'Please enter description' }]}
      >
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item
        name="publishDate"
        label="Publish Date"
        rules={[{ required: true, message: 'Please select publish date' }]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        name="price"
        label="Price"
        rules={[{ required: true, message: 'Please enter price' }]}
      >
        <InputNumber min={0} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          {book ? 'Update' : 'Create'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BookForm;
