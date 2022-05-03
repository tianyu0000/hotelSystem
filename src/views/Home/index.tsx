import React from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

const Home: React.FC = () => {
  console.log();
  return <div className={cx('main')}>
    <div className={cx('text')}>欢迎使用酒店预订后台管理系统~</div>
  </div>;
};

export default Home;
