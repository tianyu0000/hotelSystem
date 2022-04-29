import store from 'store'
import { UserInfo } from '@/services/entities'

const MANAGER_INFO = '';

export const saveUserInfo = (managerInfo: UserInfo) => {
  store.set(MANAGER_INFO, managerInfo);
}

export const getUserInfo = () => store.get(MANAGER_INFO);

export const deleteUserInfo = () => {
  store.remove(MANAGER_INFO);
}