import React, { useState, useEffect } from 'react';
import { Table, notification, Button, Modal, Pagination,Input } from 'antd';
import axios from 'axios';
import CreateBook from './CreateBook';
import EditBook from './EditBook';
import DeleteBook from './DeleteBook';
// import SearchComponent from './SearchComponent';
import BookForm from './BookForm'; 
const { Search } = Input;
const BookList = () => {
  const [books, setBooks] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const [createVisible, setCreateVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, [currentPage,pageSize, query]); 

  const fetchBooks = async () => {
    try {
      const response = await axios.get('/books', {
        params: {
          page: currentPage,
          pageSize: pageSize,
          query: query,
        },
      });
      const { data, total } = response.data;
      setBooks(data);
      setTotal(total);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: error.message || 'Something went wrong.',
      });
    }
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

 
  const handleSearch = (value) => {
    setQuery(value);
    setCurrentPage(1);
  };

  const handleCreate = (book) => {
    setCreateVisible(false);
    setBooks([...books, book]);
  };

  const handleEdit = (book) => {
    setSelectedBook(book);
    setEditVisible(true);
  };

  const handleDelete = (book) => {
    setSelectedBook(book);
    setDeleteVisible(true);
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Description',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: 'Publish Date',
      dataIndex: 'publishDate',
      key: 'publishDate',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button style={{backgroundColor:"red",margin:"3px"}} onClick={() => handleDelete(record)}>Delete</Button>
        </span>
      ),
    },
  ];

  return (
    <div>
         <Search
        placeholder="Search books"
        enterButton="Search Books"
        size="large"
        onSearch={handleSearch}
      />
      <Button style={{margin:"3px"}} type="primary" onClick={() => setCreateVisible(true)}>Add New Book</Button>
      
      <Table
        columns={columns}
        dataSource={books}
        rowKey="_id"
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: total,
          onChange: handlePageChange,
        }}
      />
      <Modal
        title="Create Book"
        visible={createVisible}
        onCancel={() => setCreateVisible(false)}
        footer={null}
      >
        <BookForm onFinish={handleCreate} />
      </Modal>
      <Modal
        title="Edit Book"
        visible={editVisible}
        onCancel={() => setEditVisible(false)}
        footer={null}
      >
        <BookForm book={selectedBook} onFinish={() => { setEditVisible(false); fetchBooks(); }} />
      </Modal>
      <Modal
        title="Delete Book"
        visible={deleteVisible}
        onOk={async () => {
          await axios.delete(`/books/${selectedBook._id}`);
          setDeleteVisible(false);
          fetchBooks();
        }}
        onCancel={() => setDeleteVisible(false)}
      >
        <p>Are you sure you want to delete this book?</p>
      </Modal>
    </div>
  );
};

export default BookList;
