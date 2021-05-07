/*
菜单相关
 */
import request from '@/utils/request'

interface MenuForm {
  id?: number,
  parentId: number,
  name: string,
  href: string,
  icon?: string,
  orderNum?: number,
  description?: string,
  shown?: boolean
}

export const createOrUpdateMenu = (data: MenuForm): Promise<any> => {
  return request({
    method: 'POST',
    url: '/boss/menu/saveOrUpdate',
    data
  })
}

export const getEditMenuInfo = (id:string | number = -1): Promise<any> => {
  return request({
    method: 'GET',
    url: '/boss/menu/getEditMenuInfo',
    params: {
      id
    }
  })
}

export const getAllMenu = (): Promise<any> => {
  return request({
    method: 'GET',
    url: '/boss/menu/getAll'
  })
}

export const deleteMenu = (id: number): Promise<any> => {
  return request({
    method: 'DELETE',
    url: `/boss/menu/${id}`
  })
}

export const getRoleMenus = (roleId: string|number): Promise<any> => {
  return request({
    method: 'GET',
    url: '/boss/menu/getRoleMenus',
    params: {
      roleId
    }
  })
}

export const getMenuNodeList = (): Promise<any> => {
  return request({
    method: 'GET',
    url: '/boss/menu/getMenuNodeList'
  })
}

export const allocateRoleMenus = (data: any): Promise<any> => {
  return request({
    method: 'POST',
    url: '/boss/menu/allocateRoleMenus',
    data
  })
}
