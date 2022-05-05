import React, { useEffect, useState } from "react";
import { Avatar, Dropdown, Layout, Menu, MenuProps } from "antd";
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
import { deleteUserInfo } from "@/utils/storageUtils";
import { MenuItemType, SubMenuType } from "rc-menu/lib/interface";
import MenuItem from "antd/lib/menu/MenuItem";
const cx = className.bind(styles);

const { Header, Sider, Content } = Layout;
export interface BasicLayoutProps {
  example?: string;
}


const BasicLayout: React.FC<BasicLayoutProps> = ({ children }) => {
  const history = useHistory();
  const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem => ({
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem);


  const items: MenuProps['items'] = [
    {
      label: (<div onClick={() => {
        deleteUserInfo();
        history.replace(routerPath.Login);
      }}
      >
        退出登录
      </div>),
      type: 'group'
    }
  ];

  const showUserMenu = () => (
    <Menu items={items}>
    </Menu>
  );
  const userMenuItems: MenuProps['items'] = [

  ];

  return (
    <Layout className={cx('main')}>
      <Sider

        className={cx('aside')}
      >
        <div className="logo" />
        <Menu theme="light" mode="inline" defaultSelectedKeys={[history.location.pathname]}>
          <Menu.Item key={routerPath.Home} icon={<HomeOutlined />}>
            <Link to={routerPath.Home}>首页</Link>
          </Menu.Item>
          <Menu.Item key={routerPath.Rooms} icon={<BankOutlined />}>
            <Link to={routerPath.Rooms}>房间管理</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<AccountBookOutlined />}>
            <Link to={routerPath.Orders}>订单核销</Link>
          </Menu.Item>
          <Menu.Item key={routerPath.Users} icon={<UserOutlined />}>
            <Link to={routerPath.Users}>用户管理</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className={cx('site-layout')}>
        <Header className={cx("site-layout-sub-header-background", "header")} style={{ padding: 0 }} >
          <div className={cx('avatar')}>
            <Dropdown overlay={showUserMenu} placement="bottom" arrow>
              <Avatar size="large" icon={<UserOutlined />} className={cx("avatar-img")} />
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

function icon(arg0: JSX.Element, key: any, Home: string, icon: any, arg4: JSX.Element, type: any, arg6: string): import("antd/lib/menu/hooks/useItems").ItemType {
  throw new Error("Function not implemented.");
}
function key(arg0: JSX.Element, key: any, Home: string, icon: (arg0: JSX.Element, key: any, Home: string, icon: any, arg4: JSX.Element, type: any, arg6: string) => import("antd/lib/menu/hooks/useItems").ItemType, arg4: JSX.Element, type: any, arg6: string): import("antd/lib/menu/hooks/useItems").ItemType {
  throw new Error("Function not implemented.");
}

function type(arg0: JSX.Element, key: any, Home: string, icon: (arg0: JSX.Element, key: any, Home: string, icon: any, arg4: JSX.Element, type: any, arg6: string) => import("antd/lib/menu/hooks/useItems").ItemType, arg4: JSX.Element, type: any, arg6: string): import("antd/lib/menu/hooks/useItems").ItemType {
  throw new Error("Function not implemented.");
}

