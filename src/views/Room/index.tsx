import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './style.module.scss';
import { Avatar, Button, Divider, Empty, Modal, Popconfirm, Table, } from 'antd';
import { ServicesApi } from '@/services/request-api';
import AddRoomButton from './components/addRoomUtil';
import { CommentInfo, RoomInfo } from '@/services/entities';
import { UserOutlined } from '@ant-design/icons';

const cx = classNames.bind(styles);

const Room: React.FC = () => {

  const { getRoomList, deleteRoom, deleteComment, getRoomDetail } = ServicesApi;
  const [data, setData] = useState<any>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [roomComments, setRoomComments] = useState<CommentInfo[]>([]);
  const [roomKey, setRoomKey] = useState<RoomInfo>();
  const handleComment = (record: RoomInfo) => {
    setRoomComments(record.r_comment.reverse());
    setRoomKey(record);
    setIsModalVisible(true);

  }

  const handleDelete = (record: RoomInfo) => {
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
      setData(res.reverse());
    });
  }
  //删除指定评论
  const handleDeleteComment = (commentKey: CommentInfo) => {
    deleteComment({
      _id: roomKey?._id!,
      id: commentKey.id
    }).then(res => {
      console.log(res);
      getRoomDetail({
        _id: roomKey?._id!
      }).then((res) => {
        setRoomComments(res.data.r_comment)
      })
    })

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
      title: '房间标题',
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
      title: '房间描述',
      dataIndex: 'r_desc',
      key: 'r_desc',
    },
    {
      title: '操作',
      key: 'action',
      render: (record: RoomInfo) => (<div className={cx("operation")}>
        <Button type="primary" size='small' onClick={() => handleComment(record)} >查看评论</Button>
        <Modal footer={null} mask={false} forceRender={true} title="该房间评论" visible={isModalVisible} onOk={() => { setIsModalVisible(false) }} onCancel={() => { setIsModalVisible(false) }}>
          <div className={cx('comment-modal')}>
            {roomComments.length === 0 ? <Empty /> :
              roomComments.map((item: CommentInfo, index: number) => {
                return (<div key={index}>
                  <div className={cx('comment-item')} >
                    <div className={cx('left')}>
                      <div className={cx('avatar')}>{item.isHideName === 'false' ? <Avatar shape="square" src={item.photo} style={{ 'height': '100%', 'width': '100%' }} /> : <Avatar shape="square" size={80} icon={<UserOutlined />} style={{ 'height': '100%', 'width': '100%' }} />}</div>
                      <div className={cx('name')}>{item.isHideName === 'false' ? `用户名:${item.name}` : `匿名用户`}</div>
                    </div>
                    <div className={cx('right')}>
                      <div className={cx('content')}>
                        <div className={cx('text')}>{item.comment_content}</div>
                      </div>
                      <div className={cx('foot')}>
                        <div className={cx('create-date')}>评论时间:{item.comment_date}</div>
                        <div className={cx('delete-btn')}>
                          <Popconfirm title="确认删除?" onConfirm={() => handleDeleteComment(item)}>
                            <Button type='primary'>删除评论</Button>
                          </Popconfirm>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Divider />
                </div>)
              })}</div>
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
