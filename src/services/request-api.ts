import { get, post, del, put } from "./request";
import { OrderApi, RoomApi, UserApi } from './entities'
import { ApiPaths } from "./api-path";

export const ServicesApi = {

  //管理员登录
  manageLogin: (data: UserApi.Login.data): Promise<UserApi.Login.ResponseData> => post(ApiPaths.adminLogin, data),
  //获取所有普通用户(管理员账户不会显示)列表
  getUserList: (): Promise<UserApi.getUserInfo.ResponseData> => get(ApiPaths.getUserList),

  //删除用户账号
  deleteUser: (data: UserApi.userId.id): Promise<UserApi.userId.ResponseData> => post(ApiPaths.deleteUser, data),

  //获取所有房间列表
  getRoomList: (): Promise<RoomApi.getRoomInfo.ResponseData> => get(ApiPaths.getRoomList),

  //新增房间
  addRoom: (data: RoomApi.addRoom.form): Promise<RoomApi.addRoom.ResponseData> => post(ApiPaths.createRoom, data),

  //删除房间
  deleteRoom: (data: RoomApi.roomId.id): Promise<RoomApi.roomId.ResponseData> => post(ApiPaths.deleteRoom, data),

  //_id获取房间信息
  getRoomDetail: (params: RoomApi.roomId.id): Promise<RoomApi.roomId.ResponseData> => get(ApiPaths.getRoomDetail, params),

  //删除房间评论
  deleteComment: (data: RoomApi.commentId.id): Promise<RoomApi.commentId.ResponseData> => post(ApiPaths.deleteComment, data),

  //获取所有订单列表
  getOrderList: (): Promise<OrderApi.getOrderInfo.ResponseData> => get(ApiPaths.getOrderList),

  //核销订单
  checkRoom: (data: OrderApi.orderId.id): Promise<OrderApi.orderId.ResponseData> => post(ApiPaths.checkRoom, data),


}
