import React from 'react';
import { Layout } from 'antd';
import BookList from './components/BookList.jsx';

const { Content } = Layout;

const App = () => {
  return (
    <Layout>
      <Content style={{ padding: '100px' }}>
        <h1>FIND-A-BOOK</h1>
        <BookList />
      </Content>
    </Layout>
  );
};

export default App;