/*
角色相关
 */
import request from '@/utils/request'

interface RoleForm {
  id?: number,
  code: string,
  name: string,
  description?: string
}
export const getRoleAll = (): Promise<any> => {
  return request({
    method: 'GET',
    url: '/boss/role/all'
  })
}

export const delRole = (id: number | string): Promise<any> => {
  return request({
    method: 'DELETE',
    url: `/boss/role/${id}`
  })
}

export const saveOrUpdate = (data: RoleForm): Promise<any> => {
  return request({
    method: 'POST',
    url: '/boss/role/saveOrUpdate',
    data
  })
}
