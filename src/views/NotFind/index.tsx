import React, { useEffect, useState } from 'react';
import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import routerPath from '@/router/router-path';
import { getUserInfo } from '@/utils/storageUtils';
import { UserInfo } from '@/services/entities';

const NotFind: React.FC = () => {
	const history = useHistory();
	const [userInfo,setUserInfo] = useState<UserInfo[]>([]);
	useEffect(()=>{
	const userInfo =  getUserInfo();
	setUserInfo(userInfo);
	})
	return (

		<Result
			status="404"
			title="404"
			subTitle="Sorry, the page you visited does not exist."
			extra={userInfo? <Button
				type="primary"
				onClick={() => {
					history.replace(routerPath.Home);
				}}
			>
				Back Home
			</Button>:<Button
				type="primary"
				onClick={() => {
					history.replace(routerPath.Login);
				}}
			>
				Back Login
			</Button>}
		/>
	);
};

export default NotFind;
