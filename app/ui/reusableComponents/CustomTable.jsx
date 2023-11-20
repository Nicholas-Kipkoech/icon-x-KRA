"use client ";
import { Table } from "antd";
export const CustomTable = ({
  cols,
  rows,
  isClickable = false,
  key,
  ...rest
}) => {
  const columns = cols;
  const data = rows;
  return (
    <Table
      {...rest}
      columns={columns}
      dataSource={data}
      rowKey={key}
      scroll={{ x: "100%" }}
    />
  );
};
