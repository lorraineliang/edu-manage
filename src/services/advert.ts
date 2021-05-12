/*
广告相关
 */
import request from '@/utils/request'

export const getAdList = (): Promise<any> => {
  return request({
    method: 'GET',
    url: '/front/ad/getAdList'
  })
}

export const getAdById = (id: number | string): Promise<any> => {
  return request({
    method: 'GET',
    url: '/front/ad/getAdById',
    params: {
      id
    }
  })
}

export const saveOrUpdate = (data: any): Promise<any> => {
  return request({
    method: 'POST',
    url: '/front/ad/saveOrUpdate',
    data
  })
}

export const updateStatus = (id: number|string, status:number|string): Promise<any> => {
  return request({
    method: 'GET',
    url: '/front/ad/updateStatus',
    params: {
      id,
      status
    }
  })
}
