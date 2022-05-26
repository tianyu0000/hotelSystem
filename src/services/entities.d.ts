import { namespace } from "store";

export interface BaseResponse<T = any> {
  status: number,
  message: string,
  data: T;
}

export interface OrderResponse<T = any> {
  status: number,
  [data: T],
  msg: string,
}

export interface CommentInfo {
  _id: string,
  photo?: string,
  id: string,
  name: string,
  comment_date: string,
  comment_content: string,
  isHideName: string
}

export interface UserInfo {
  isAdmin: Number,
  name: string,
  password: string,
  photo: string,
  userEmail: string,
  userTel: string,
  _id: string,
}

export interface RoomInfo {
  _id: string,
  r_photo: string,
  r_title: string,
  r_desc: string,
  r_bedrooms: Number,
  r_beds: Number,
  r_wc: Number,
  r_people: Number,
  r_comment: Array<any>,
  r_date: any[],
  r_price: Number,
  r_tag: string,
  r_type: string
}

export interface updateRoom {
  r_photo: string,
    r_title: string,
    r_desc: string,
    r_bedrooms: Number,
    r_beds: Number,
    r_wc: Number,
    r_people: Number,
    r_price: Number,
    r_tag: string,
    r_type: string
}

export interface orderInfo {
  [x: string]: any;
  _id: string,
  o_id: string,
  o_room_id: string,
  o_roomDate_start: string,
  o_roomDate_end: string,
  o_day:number,
  o_total:number,
  o_user_id: string,
  o_price: Number,
  o_userTel: string,
  o_createDate: string,
  o_state: Number,
  o_user_name: string
}

export namespace UserApi {
  namespace Login {
    interface data {
      //账户
      name: string,
      //密码
      password: string
    }
    type ResponseData = BaseResponse<UserInfo>;
  }

  namespace getUserInfo {
    type ResponseData = BaseResponse<UserInfo>;
  }

  namespace userId {
    interface id {
      _id: string
    }
    type ResponseData = BaseResponse<UserInfo>;
  }
}

export namespace RoomApi {
  namespace getRoomInfo {
    type ResponseData = BaseResponse<RoomInfo>;
  }

  namespace addRoom {
    interface form {
      r_photo: string,
      r_title: string,
      r_desc: string,
      r_bedrooms: Number,
      r_beds: Number,
      r_wc: Number,
      r_people: Number,
      r_comment: Array,
      r_date: Array,
      r_price: Number,
      r_tag: string,
      r_type: string
    }
    type ResponseData = BaseResponse<RoomInfo>;
  }
  namespace roomId {
    interface id {
      _id: string
    }
    type ResponseData = BaseResponse<RoomInfo>;
  }
  namespace commentId {
    interface id {
      _id: string,
      id: string
    }
    type ResponseData = BaseResponse;
  }
}

export namespace OrderApi {
  namespace getOrderInfo {
    type ResponseData = Array<orderInfo>
  }
  namespace orderId {
    interface id {
      o_id: string
    }
    type ResponseData = OrderResponse<orderInfo>
  }
}