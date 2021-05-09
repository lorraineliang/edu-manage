/*
课程相关
 */
import request from '@/utils/request'

export const getQueryCourses = (data: any): Promise<any> => {
  return request({
    method: 'POST',
    url: '/boss/course/getQueryCourses',
    data
  })
}

export const changeState = (params: any): Promise<any> => {
  return request({
    method: 'GET',
    url: '/boss/course/changeState',
    params
  })
}

export const saveOrUpdateCourse = (data: any): Promise<any> => {
  return request({
    method: 'POST',
    url: '/boss/course/saveOrUpdateCourse',
    data
  })
}

export const imgUpload = (data: any, onUploadProgress: (progressEvent: ProgressEvent) => void): Promise<any> => {
  return request({
    method: 'POST',
    url: '/boss/course/upload',
    data,
    // HTML5 新增的上传响应事件：progress
    onUploadProgress
  })
}
export const imgUpload1 = (data: any, onUploadProgress?: (progressEvent: ProgressEvent) => void): Promise<any> => {
  return request({
    method: 'POST',
    url: '/boss/course/upload',
    data,
    // HTML5 新增的上传响应事件：progress
    onUploadProgress
  })
}

export const getCourseById = (courseId: any): Promise<any> => {
  return request({
    method: 'GET',
    url: '/boss/course/getCourseById',
    params: {
      courseId
    }
  })
}
