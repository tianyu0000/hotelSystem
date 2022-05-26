import React, { useEffect, useState } from "react"
import classNames from 'classnames/bind';
import styles from './style.module.scss';
import { Button, Cascader, Drawer, Form, Input, InputNumber, message, Select, } from "antd";
import TextArea from "antd/lib/input/TextArea";
import UploadRoomImage from "../imageUploadUtil";
import { ServicesApi } from "@/services/request-api";
import { RoomInfo, updateRoom } from "@/services/entities";
const cx = classNames.bind(styles);
const { addRoom } = ServicesApi;

interface childProps {
  handleRefresh: Function,
  isShow:boolean,
  isEdit:boolean,
  closeEvent?: (closeOnly?: boolean) => void,
  initData: RoomInfo
}

const AddOrUpdateRoom: React.FC<childProps> = ({handleRefresh, isShow, isEdit, closeEvent, initData}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<string>("");
  const [form] = Form.useForm();
  const initAddData: updateRoom = {
    r_photo: "",
    r_title: "",
    r_desc: "",
    r_bedrooms: 1,
    r_beds: 1,
    r_wc: 0,
    r_people: 1,
    r_price: 0,
    r_tag: "",
    r_type: ""
  };
  const initUrl = initData?.r_photo;
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    if (closeEvent) {
      closeEvent(true);
    }
    form.resetFields();
  };
  const validateMessages = [{ required: true, message: "${label}未填写!" }];
  const handleRes = (data: string) => {
    setImgUrl(data);
  }
  const postForm = async () => {
    if (
      form.getFieldValue("r_title") && form.getFieldValue("r_tag") && form.getFieldValue("r_wc")
      && form.getFieldValue("r_bedrooms") && form.getFieldValue("r_beds") && form.getFieldValue("r_people")
      && form.getFieldValue("r_price") && form.getFieldValue("r_type")) {
      message.success("提交成功!")

    } else {
      message.error("提交失败!请完全输入所有必填项!")
    };
    addRoom({
      r_photo: imgUrl,
      r_title: form.getFieldValue("r_title"),
      r_desc: form.getFieldValue("r_desc"),
      r_bedrooms: form.getFieldValue("r_bedrooms"),
      r_beds: form.getFieldValue("r_beds"),
      r_wc: form.getFieldValue("r_wc"),
      r_people: form.getFieldValue("r_people"),
      r_comment: [],
      r_date: [],
      r_price: form.getFieldValue("r_price"),
      r_tag: form.getFieldValue("r_area"),
      r_type: form.getFieldValue("r_type")
    }).then(() => {
      onClose();
      handleRefresh();
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
  }, [])
  return <div>
    
    <Drawer
      title="房间配置表单"
      width={720}
      onClose={() => {
        onClose();
      }}
      visible={isShow}
      bodyStyle={{ paddingBottom: 80 }}
      destroyOnClose={true}
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        form={form}
        initialValues={ isEdit ? initData : initAddData}
      >
        <Form.Item label="房间名" name="r_title" rules={validateMessages}>
          <Input />
        </Form.Item>
        <Form.Item label="房间描述" name="r_desc">
          <TextArea rows={5}  maxLength={50}/>
        </Form.Item>
        <Form.Item label="房间预览图">
          <UploadRoomImage handleRes={handleRes} initUrl={isEdit ? initUrl : ""} isEdit={isEdit}/>
        </Form.Item>
        <Form.Item label="地区" name="r_tag" rules={validateMessages}>
          <Select options={areaOptions}>
          </Select>
        </Form.Item>
        <Form.Item label="类型" name="r_type" rules={validateMessages}>
          <Select options={roomTypeOptions}>
          </Select>
        </Form.Item>
        <Form.Item label="房间单价" name="r_price" rules={validateMessages}>
          <InputNumber min={0}/>
        </Form.Item>
        <Form.Item label="宜住人数" name="r_people" rules={validateMessages}>
          <InputNumber min={1} max={4}/>
        </Form.Item>
        <Form.Item label="房间卧室" name="r_bedrooms" rules={validateMessages}>
          <InputNumber min={1} max={4}/>
        </Form.Item>
        <Form.Item label="卫生间" name="r_wc" rules={validateMessages}>
          <InputNumber min={0} max={4}/>
        </Form.Item>
        <Form.Item label="床位" name="r_beds" rules={validateMessages}>
          <InputNumber min={1} max={4}/>
        </Form.Item>
        <Form.Item label="提交">
          <Button type="primary" htmlType="submit" onClick={postForm}>提交表单</Button>
        </Form.Item>
      </Form>
    </Drawer>
  </div>;
};


export default AddOrUpdateRoom