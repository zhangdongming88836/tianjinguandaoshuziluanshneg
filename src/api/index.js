import request from '@/api/request'; 
 
// 登录
export function newLogin(data) {
    return request({
        url: '/api/users/login',
        method: 'post',
        data: data,
    })
}
// 登录验证码
export function vertifyCode (data) {
    return request({
        url: '/api/users/getMobileCode',
        method: 'post',
        data: data
    })
}
//用户信息---用户名
export function getUserName(data) {
    return request({

        url: '/api/employees/byUser/'+data,
        method: 'get',
        data: '',
    })
}
//用户信息---公司
export function getUserCompanyName(data) {
    return request({
        url: '/api/organizations/companyOfUser/'+data,
        method: 'get',
        data: '',
    })
}
//用户信息---部门
export function getDepartmentName(data) {
    return request({
        url: '/api/organizations/byUser/'+data,
        method: 'get',
        data: '',
    })
}
//全站----上传
export function upload(data) {
    return request({
        url: '/oss/upload/lpg/uploadMaterial',
        method: 'post',
        data: data,
    })
}
/////////////////////////////////////////////////
//查询获取数据列表
export function experimentProjectList(data){
    return request({
        method:"post",
        url:"/fad/simulation/experiment-project/list",
        data
    })
  }
  //查看详情
  export function experimentProjectDetails(data){
      return request({
          method:"get",
          url:`/fad/simulation/experiment-project/details/${data}`,
          data
      })
  }
  //实验水压新增
  export function experimentProjectSave(data){
    return request({
        method:"post",
        url:`/fad/simulation/experiment-project/save`,
        data
    })
}
//水压批量删除
export function experimentProjectRemove(data){
    return request({
        method:"post",
        url:`/fad/simulation/experiment-project/remove`,
        data
    })
}
//水压编辑
export function experimentProjectUpdate(data){
    return request({
        method:"post",
        url:`/fad/simulation/experiment-project/update`,
        data
    })
}
//id查看详情
export function fadSimulationExperimentProjectDetails(data){
    return request({
        method:"get",
        url:`/fad/simulation/experiment-project/details/${data}`,
    })
}
//单位树请求
export function experimentProjectEpOrg(){
    return request({
        method:"get",
        url:`/fad/simulation/experiment-project/epOrg`,
    })
}