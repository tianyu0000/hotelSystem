import React, { useEffect, useState } from "react"
import classNames from 'classnames/bind';
import styles from './style.module.scss';
import { Button, Cascader, Drawer, Form, Input, InputNumber, message, Select, } from "antd";
import TextArea from "antd/lib/input/TextArea";
import UploadRoomImage from "../imageUploadUtil";
import { ServicesApi } from "@/services/request-api";
const cx = classNames.bind(styles);
const { addRoom } = ServicesApi;

interface childProps {
  handleRefresh: Function,
}

const AddRoomButton: React.FC<childProps> = (props) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<string>("");
  const [form] = Form.useForm();


  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
    form.resetFields();
  };
  const validateMessages = [{ required: true, message: "${label}未填写!" }];
  const handleRes = (data: string) => {
    setImgUrl(data);
  }
  const postForm = async () => {
    if (
      form.getFieldValue("title") && form.getFieldValue("area") && form.getFieldValue("wc")
      && form.getFieldValue("bedroom") && form.getFieldValue("beds") && form.getFieldValue("people")
      && form.getFieldValue("price") && form.getFieldValue("type")) {
      message.success("提交成功!")

    } else {
      message.error("提交失败!请完全输入所有必填项!")
    }
    console.log(form.getFieldsValue());
    console.log(imgUrl);
    addRoom({
      r_photo: imgUrl,
      r_title: form.getFieldValue("title"),
      r_desc: form.getFieldValue("describe"),
      r_bedrooms: form.getFieldValue("bedroom"),
      r_beds: form.getFieldValue("beds"),
      r_wc: form.getFieldValue("wc"),
      r_people: form.getFieldValue("people"),
      r_comment: [],
      r_date: [],
      r_price: form.getFieldValue("price"),
      r_tag: form.getFieldValue("area"),
      r_type: form.getFieldValue("type")
    }).then(() => {
      onClose();
      props.handleRefresh();
    })
  }
  const areaOptions = [
    {
      value: '成都',
      label: '成都',
    },
    {
      value: '宜宾',
      label: '宜宾',
    },
    {
      value: '重庆',
      label: '重庆',
    },
  ]
  const roomTypeOptions = [
    {
      value: '热门房源',
      label: '热门房源',
    },
    {
      value: '特惠房源',
      label: '特惠房源',
    },
    {
      value: '品质房源',
      label: '品质房源',
    },
  ]

  useEffect(() => {

  })
  return <div>
    <Button type='primary' onClick={showDrawer}>新增房间</Button >
    <Drawer
      title="房间配置表单"
      width={720}
      onClose={onClose}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      destroyOnClose={true}
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        form={form}
      >
        <Form.Item label="房间名" name="title" rules={validateMessages}>
          <Input />
        </Form.Item>
        <Form.Item label="房间描述" name="describe">
          <TextArea rows={5}  maxLength={50}/>
        </Form.Item>
        <Form.Item label="房间预览图">
          <UploadRoomImage handleRes={handleRes} />
        </Form.Item>
        <Form.Item label="地区" name="area" rules={validateMessages}>
          <Select options={areaOptions}>
          </Select>
        </Form.Item>
        <Form.Item label="类型" name="type" rules={validateMessages}>
          <Select options={roomTypeOptions}>
          </Select>
        </Form.Item>
        <Form.Item label="房间单价" name="price" rules={validateMessages}>
          <InputNumber />
        </Form.Item>
        <Form.Item label="宜住人数" name="people" rules={validateMessages}>
          <InputNumber />
        </Form.Item>
        <Form.Item label="房间卧室" name="bedroom" rules={validateMessages}>
          <InputNumber />
        </Form.Item>
        <Form.Item label="卫生间" name="wc" rules={validateMessages}>
          <InputNumber />
        </Form.Item>
        <Form.Item label="床位" name="beds" rules={validateMessages}>
          <InputNumber />
        </Form.Item>
        <Form.Item label="提交">
          <Button type="primary" htmlType="submit" onClick={postForm}>提交表单</Button>
        </Form.Item>
      </Form>
    </Drawer>
  </div>;
};


export default AddRoomButton