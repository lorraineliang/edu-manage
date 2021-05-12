/*
广告位相关
 */
import request from '@/utils/request'

export const getAllSpaces = (): Promise<any> => {
  return request({
    method: 'GET',
    url: '/front/ad/space/getAllSpaces'
  })
}

export const saveOrUpdate = (data: any): Promise<any> => {
  return request({
    method: 'POST',
    url: '/front/ad/space/saveOrUpdate',
    data
  })
}
