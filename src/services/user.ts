/*
用户相关请求
 */
import request from '@/utils/request'
import qs from 'qs'

interface User {
  phone: string,
  password: string
}

export const login = (data: User) :Promise<any> => {
  return request({
    method: 'POST',
    url: '/front/user/login',
    // headers: {
    //   'content-type': 'application/x-www-form-urlencoded'
    // },
    // 如果 data 是普通对象，则 content-type 是 application/json
    // 如果 data 是 qs.stringfy(data) 转换之后的数据 ： key=value 则 content-type 会被设置为 application/x-www-form-urlencoded
    data: qs.stringify(data)
  })
}

export const getUserInfo = () :Promise<any> => {
  return request({
    method: 'GET',
    url: '/front/user/getInfo'
    // headers: {
    //   Authorization: store.state.user.access_token
    // }
  })
}
