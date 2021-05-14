//This file is automatically generated

// employee-controller

import { EmployeeController } from '@controller';
export default {
    actions: {
        [EmployeeController.create.method] : {
            summary: '新增员工，如提供用户信息，可选同步创建用户, 或与已有用户进行绑定',
            method: 'post',
            url: (payload) => `/api/employees`,
            parameters: [{'in':'body','name':'model','description':'model','required':true,'schema':{'$ref':'#/definitions/EmployeeInfo'}}],
        },
        [EmployeeController.deleteByIds.method] : {
            summary: '按主键集合(以&#x27;,&#x27;分割)删除',
            method: 'put',
            url: (payload) => `/api/employees/bulk-delete`,
            parameters: [{'in':'body','name':'ids','description':'ids','required':true,'schema':{'type':'array','items':{'type':'string'}}}],
        },
        [EmployeeController.findById.method] : {
            summary: '按主键查询',
            method: 'get',
            url: (payload) => `/api/employees/${payload.id}`,
            parameters: [{'name':'id','in':'path','description':'id','required':true,'type':'string'}],
        },
        [EmployeeController.pagingByCriteria.method] : {
            summary: '分页查询所有员工',
            method: 'get',
            url: (payload) => `/api/employees/page-search`,
            parameters: [{'name':'bindState','in':'query','description':'绑定状态过滤，binded 或者 unBinded，或者不给为空不过滤','required':false,'type':'string'},{'name':'code','in':'query','description':'编码','required':false,'type':'string'},{'name':'excludedOrgId','in':'query','description':'需要排除掉的所属机构Id，这样查出来的就是不在此机构下的员工. 注意此条件与 orgId, orgCode, orgName 冲突，有这三者任一，此条件将失效','required':false,'type':'string'},{'name':'excludedPositionId','in':'query','description':'需要排除掉的所属岗位Id，这样查出来的就是不在此岗位下的员工，注意此条件与 positionId, positionCode, positionName 冲突，有这三者任一，此条件将失效','required':false,'type':'string'},{'name':'excludedWorkGroupId','in':'query','description':'需要排除掉的所属工作组Id，这样查出来的就是不在此工作组下的员工，注意此条件与 workGroupId, workGroupCode，workGroupName, 冲突，有这三者任一，此条件将失效','required':false,'type':'string'},{'name':'gender','in':'query','description':'性别，MAN 或 FEMALE','required':false,'type':'string'},{'name':'id','in':'query','description':'Id','required':false,'type':'string'},{'name':'includeUser','in':'query','description':'是否同时查询关联的用户','required':false,'type':'boolean'},{'name':'name','in':'query','description':'名称','required':false,'type':'string'},{'name':'orgCode','in':'query','description':'所属机构编码','required':false,'type':'string'},{'name':'orgId','in':'query','description':'所属机构 Id','required':false,'type':'string'},{'name':'orgName','in':'query','description':'所属机构名称','required':false,'type':'string'},{'name':'pageNum','in':'query','required':false,'type':'integer','format':'int32'},{'name':'pageSize','in':'query','required':false,'type':'integer','format':'int32'},{'name':'positionCode','in':'query','description':'所属岗位编码','required':false,'type':'string'},{'name':'positionId','in':'query','description':'所属岗位 Id','required':false,'type':'string'},{'name':'positionName','in':'query','description':'所属岗位名称','required':false,'type':'string'},{'name':'status','in':'query','description':'状态，ENABLED 或 DISABLED','required':false,'type':'string'},{'name':'usingLikeQuery','in':'query','description':'是否使用模糊查询','required':false,'type':'boolean'},{'name':'workGroupCode','in':'query','description':'所属工作组编码','required':false,'type':'string'},{'name':'workGroupId','in':'query','description':'所属工作组 Id','required':false,'type':'string'},{'name':'workGroupName','in':'query','description':'所属工作组名称','required':false,'type':'string'}],
        },
        [EmployeeController.update.method] : {
            summary: '更新',
            method: 'put',
            url: (payload) => `/api/employees`,
            parameters: [{'in':'body','name':'model','description':'model','required':true,'schema':{'$ref':'#/definitions/EmployeeInfo'}}],
        },
    },
    // state: {},
    // mutations: {},
    // getters: {}
}
