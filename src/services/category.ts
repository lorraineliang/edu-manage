/*
资源分类相关
 */
import request from '@/utils/request'
export const getCategories = (): Promise<any> => {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll'
  })
}
