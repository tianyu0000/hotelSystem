import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './style.module.scss';
import { Alert, Button, message, Popconfirm, Table } from 'antd';
import { ServicesApi } from '@/services/request-api';
import { orderInfo, RoomInfo } from '@/services/entities'

const cx = classNames.bind(styles);
const { getOrderList, checkRoom } = ServicesApi;
const Order: React.FC = () => {
  console.log();
  const [data, setData] = useState<any>();
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleCheck = (record: orderInfo) => {
    checkRoom({ o_id: record.o_id }).then((res) => {
      if (res.status === 1004) {
        message.error(res.msg)
      } else {
        message.success(res.msg)
      }
      getData();
    });
  }
  const getData = () => {
    getOrderList().then((res: orderInfo[]) => {
      res.map((item: orderInfo, index: number) => {
        Object.assign(
          item,
          { key: index }
        )
      })
      setData(res.reverse());
    })
  }
  const switchState = (state: number) => {
    switch (state) {
      case 1:
        return '待付款';
      case 2:
        return '待核销';
      case 3:
        return '订单已取消';
      case 4:
        return '订单已完成';
    }
  }
  useEffect(() => {
    //订单列表
    getData();
  }, [])
  const columns = [
    {
      title: '订单ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: '房间标题',
      dataIndex: 'o_room_title',
      key: 'o_room_title',
    },
    {
      title: '用户名',
      dataIndex: 'o_user_name',
      key: 'o_user_name',
    },
    {
      title: '起始日期',
      dataIndex: 'o_roomDate_start',
      key: 'o_roomDate_start',
    },
    {
      title: '截止日期',
      dataIndex: 'o_roomDate_end',
      key: 'o_roomDate_end',
    },
    {
      title: '总天数',
      dataIndex: 'o_day',
      key: 'o_day',
    },
    {
      title: '客房单价(元/天)',
      dataIndex: 'o_price',
      key: 'o_price',
    },
    {
      title: '订单金额',
      dataIndex: 'o_total',
      key: 'o_total',
    },
    {
      title: '用户手机号码',
      dataIndex: 'o_userTel',
      key: 'o_userTel',
    },
    {
      title: '订单创建时间',
      dataIndex: 'o_createDate',
      key: 'o_createDate',
    },
    {
      title: '订单状态',
      dataIndex: 'o_state',
      key: 'o_state',
      render: (state: number) => (<>{switchState(state)}</>)
    },
    {
      title: '操作',
      key: 'action',
      render: (record: orderInfo) => (
        <Button type='primary' size='small' onClick={() => handleCheck(record)} disabled={record.o_state === 2 ? false : true}>核销</Button >
      ),
    },
  ];

  return <div>
    <Table columns={columns} dataSource={data} />
  </div>;
};

export default Order;
