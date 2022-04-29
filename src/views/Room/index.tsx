import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './style.module.scss';
import { Button, Modal, Popconfirm, Table, } from 'antd';
import { ServicesApi } from '@/services/request-api';
import AddRoomButton from './components/addRoomUtil';
import TextArea from 'antd/lib/input/TextArea';

const cx = classNames.bind(styles);
const { getRoomList, deleteRoom } = ServicesApi;
interface record {
  _id: string,
  r_title: string,
  r_price: number,
  r_tag: string,
  r_desc: string,
  r_comment: Array<String>
}

const Room: React.FC = () => {

  console.log();
  const [data, setData] = useState<any>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleComment = (record: record) => {
    showModal();
    console.log(record.r_comment);

  }
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = (record: record) => {
    deleteRoom({ _id: record._id }).then(() => {
      getData();
    });
  }
  const handleRefresh = () => {
    getData();
  }
  const getData = () => {
    getRoomList().then((res: any) => {
      res.map((item: any, index: number) => {
        Object.assign(
          item,
          { key: index }
        )
      })
      setData(res);
    });
  }

  useEffect(() => {
    //房间列表
    getData();
  }, [])
  const columns = [
    {
      title: '房间ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: '房间名',
      dataIndex: 'r_title',
      key: 'r_title',
    },
    {
      title: '价格',
      dataIndex: 'r_price',
      key: 'r_price',
    },
    {
      title: '房间类型',
      dataIndex: 'r_type',
      key: 'r_type',
    },
    {
      title: '地区',
      dataIndex: 'r_tag',
      key: 'r_tag',
    },
    {
      title: '描述',
      dataIndex: 'r_desc',
      key: 'r_desc',
    },
    {
      title: '操作',
      key: 'action',
      render: (record: record) => (<div className={cx("operation")}>
        <Button type="primary" size='small' onClick={() => handleComment(record)} >查看评论</Button>
        <Modal title="该房间评论" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          { }
        </Modal>
        <Popconfirm title="确认删除?" onConfirm={() => handleDelete(record)}>
          <Button danger size='small' >删除</Button >
        </Popconfirm>
      </div>
      ),
    },
  ];


  return <div>
    <div className={cx("addRoom")}>
      <AddRoomButton handleRefresh={handleRefresh} />
    </div>
    <Table columns={columns} dataSource={data} />

  </div>;
};

export default Room;
