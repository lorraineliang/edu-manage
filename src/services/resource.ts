/*
资源相关
 */
import request from '@/utils/request'
export const getResourcePages = (data: any): Promise<any> => {
  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })
}

export const saveOrUpdate = (data: any): Promise<any> => {
  return request({
    method: 'POST',
    url: '/boss/resource/saveOrUpdate',
    data
  })
}

export const delResource = (id: string|number): Promise<any> => {
  return request({
    method: 'DELETE',
    url: `/boss/resource/${id}`
  })
}
