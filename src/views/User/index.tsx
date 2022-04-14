import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './style.module.scss';
import { ServicesApi } from '@/services/request-api';
import { Button, Popconfirm, Space, Table, Tag } from 'antd';
const cx = classNames.bind(styles);
const { getUserList, deleteUser } = ServicesApi;

interface record {
  _id: string,
  name: string,
  userTel: string,
  userEmail: string,
}
const User: React.FC = () => {
  console.log();
  const [data, setData] = useState<any>();

  const handleDelete = (record: record) => {
    deleteUser({ _id: record._id }).then(() => {
      getData();
    });
  }

  const getData = () => {
    getUserList().then((res: any) => {
      res.map((item: any, index: number) => {
        Object.assign(
          item,
          { key: index }
        )
      })
      setData(res);
    })
  }

  useEffect(() => {
    //用户列表
    getData();
  }, [])
  const columns = [
    {
      title: '用户ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '手机号',
      dataIndex: 'userTel',
      key: 'userTel',
    },
    {
      title: '用户邮箱',
      dataIndex: 'userEmail',
      key: 'userEmail',
    },
    {
      title: '操作',
      key: 'action',
      render: (record: record) => (
        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)}>
          <Button danger size='small'>删除</Button >
        </Popconfirm>
      ),
    },
  ];

  return <div>
    <Table columns={columns} dataSource={data} />
  </div>;
};

export default User;
