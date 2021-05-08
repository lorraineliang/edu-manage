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

type roleIdListType = number | string
interface Role {
  userId: number,
  roleIdList?: roleIdListType[]
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

export const allocateUserRoles = (data: Role): Promise<any> => {
  return request({
    method: 'POST',
    url: '/boss/role/allocateUserRoles',
    data
  })
}

export const getUserRoles = (userId: string | number) :Promise<any> => {
  return request({
    method: 'GET',
    url: `/boss/role/user/${userId}`
  })
}
