import React from 'react';
import { Pagination } from 'antd';

const PaginationComponent = ({ total, pageSize, current, onChange }) => {
  return (
    <Pagination
      total={total}
      pageSize={pageSize}
      current={current}
      onChange={onChange}
      showSizeChanger={false}
    />
  );
};

export default PaginationComponent;