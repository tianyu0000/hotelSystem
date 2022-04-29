import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './style.module.scss';
import { Button, Popconfirm, Table } from 'antd';
import { ServicesApi } from '@/services/request-api';
import { orderInfo } from '@/services/entities'

const cx = classNames.bind(styles);
const { getOrderList, checkRoom } = ServicesApi;
const Order: React.FC = () => {
  console.log();
  const [data, setData] = useState<any>();
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleCheck = (record: orderInfo) => {
    checkRoom({ o_id: record.o_id }).then(() => {
      getData(record);
    });
  }
  const getData = (data: orderInfo) => {
    getOrderList().then((res: any) => {
      res.map((item: any, index: number) => {
        Object.assign(
          item,
          { key: index }
        )
      })
      setData(res);

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
    getData(data);
  }, [])
  const columns = [
    {
      title: '订单ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: '房间ID',
      dataIndex: 'o_room_id',
      key: 'o_room_id',
    },
    {
      title: '预订天数',
      dataIndex: 'days',
      key: 'days',
    },
    {
      title: '订单金额',
      dataIndex: 'o_money',
      key: 'o_money',
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
