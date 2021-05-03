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
