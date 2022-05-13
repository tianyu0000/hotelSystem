import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import routerPath from '@/router/router-path';
import styles from './style.module.scss'
import classNames from 'classnames/bind';
import { useHistory } from 'react-router-dom';
import { ServicesApi } from '@/services/request-api';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { saveUserInfo } from '@/utils/storageUtils';
const cx = classNames.bind(styles);


const Login: React.FC = () => {
    const history = useHistory();
    const { manageLogin } = ServicesApi;

    const [userName, setUserName] = useState("");
    const [userPwd, setPwd] = useState("");
    const doUserLogin = async () => {
        if (userName && userPwd) {
            manageLogin({
                name: userName,
                password: userPwd
            }).then((res) => {
                switch (res.status) {
                    case 1000:
                        saveUserInfo(res.data)
                        message.success(`登录成功!欢迎您,管理员${userName}`);
                        history.push(routerPath.Home);
                        break;
                    case 1001:
                        message.error("登陆失败,该用户未注册!")
                        break;
                    case 1002:
                        message.error("登录失败,密码错误!")
                        break;
                    case 1003:
                        message.error("系统错误,查询数据库失败!")
                        break;
                    case 1004:
                        message.error("登录失败,该账户无管理员权限!")
                        break;
                    default:
                        console.log(res.data);
                }
            });
        } else {
            message.warning('账号或密码不能为空')
        }
    }
    const renderLoginForm = () => (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
        >
            <Form.Item
                label="用户名"
                name="username"
                rules={[{ required: true, message: '请输入账户！' }]}

            >
                <Input onChange={event => { setUserName(event.target.value) }} />
            </Form.Item>

            <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: '请输入密码！' }]}
            >
                <Input.Password
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    onChange={event => { setPwd(event.target.value) }} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" onClick={doUserLogin}>
                    登录
                </Button>
            </Form.Item>
        </Form >
    )

    return (<div className={cx('content')}>
        <div className={cx('main')}>
            {renderLoginForm()}
        </div>
    </div>
    );
};

export default Login;