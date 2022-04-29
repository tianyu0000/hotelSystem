import React, { useCallback, useEffect, useRef, useState } from 'react';
import { message, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { upload } from '@/utils/ali-oss';
import { v4 as uuidv4 } from 'uuid';
import { PlusOutlined } from '@ant-design/icons';

interface childProps {
  handleRes: Function;
}

const fileTypeCases = ['image/png', 'image/jpeg', 'image/jpg'];
const UploadRoomImage: React.FC<childProps> = (props) => {

  const [imgUrl, setImgUrl] = useState<string>();
  const { handleRes } = props;
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const checkFile = (file: File): boolean => {
    if (fileTypeCases.filter((v) => file.type === v).length === 0) {
      message.error('请传入正确的格式文件');
      return false;
    }
    return true;
  };
  const urlRef = useRef<string>();
  const uploadImage = (fileList: any) => {
    let objName = uuidv4();
    // 调用 ali-oss 中的方法
    upload(`${objName}`, fileList.file).then(res => {
      if (res) {
        urlRef.current = res.url;
        setImgUrl(urlRef.current);
        props.handleRes(urlRef.current);
      }
    });
  }
  return (
    <ImgCrop beforeCrop={checkFile}>
      <Upload
        listType="picture-card"
        showUploadList={false}
        customRequest={uploadImage}
      >
        {imgUrl ? <img src={imgUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    </ImgCrop>
  );
};

export default UploadRoomImage;