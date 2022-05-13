import React, { useEffect, useState } from "react";
import { Avatar, Dropdown, Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import { Link, useHistory } from "react-router-dom";
import {
  HomeOutlined,
  BankOutlined,
  AccountBookOutlined,
  UserOutlined,
  AntDesignOutlined,
} from '@ant-design/icons';
import routerPath from "@/router/router-path";
import className from "classnames/bind";
import styles from './styles.module.scss'
import { Footer } from "antd/lib/layout/layout";
import { deleteUserInfo, getUserInfo } from "@/utils/storageUtils";
import { MenuItemType, SubMenuType } from "rc-menu/lib/interface";
import { UserInfo } from "@/services/entities";
const cx = className.bind(styles);

const { Header, Sider, Content } = Layout;
export interface BasicLayoutProps {
  example?: string;
}

const BasicLayout: React.FC<BasicLayoutProps> = ({ children }) => {
  const history = useHistory();
  const [managerInfo,setMannagerInfo] = useState<UserInfo>();

  type MenuItem = Required<MenuProps>['items'][number];

  const getItem=(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem =>( {
      key,
      icon,
      children,
      label,
      type,
  }as MenuItem);
  
  const items_sider:MenuProps['items'] = [
    getItem('首页',routerPath.Home,<HomeOutlined />),
    getItem('房间管理',routerPath.Rooms,<BankOutlined />),
    getItem('订单管理',routerPath.Orders,<AccountBookOutlined />),
    getItem('用户管理',routerPath.Users,<UserOutlined />)
  ]
  const items: MenuProps['items'] = [
    getItem('退出登录',routerPath.Login)
  ];
  
  const showUserMenu = () => (
    <Menu items={items} onClick={(item)=>{deleteUserInfo();history.replace(item.key)}}>
    </Menu>
  );

  useEffect(()=>{
    const managerInfo = getUserInfo();
    setMannagerInfo(managerInfo[0]);
  },[])
  return (
    <Layout className={cx('main')}>
      <Sider
        className={cx('aside')}
      >
        <Menu items={items_sider} theme="light" mode="inline" defaultSelectedKeys={[history.location.pathname]} onClick={(item)=>{history.replace(item.key)}}></Menu>
      </Sider>
      <Layout className={cx('site-layout')}>
        <Header className={cx("site-layout-sub-header-background", "header")} style={{ padding: 0 }} >
          <div className={cx('avatar')}>
            <Dropdown overlay={showUserMenu} placement="bottom" arrow>
              <Avatar src={managerInfo?.photo} size="large" icon={<UserOutlined />} className={cx("avatar-img")} />
            </Dropdown>
          </div>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div className={cx('site-layout-background')} style={{ padding: 24, minHeight: 360 }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>HotelSystem Design ©2022 Created by Wang Tianyu</Footer>
      </Layout>
    </Layout>
  );
}
export default BasicLayout;