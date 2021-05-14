import request from '@/api/request';

// 获取模拟分析列表数据
export function fadSimulationSimulationAnalysisDataList(data) {
    return request({
        url: '/fad/simulation/simulation-analysis-data/list',
        method: 'post',
        data: data,
    })
}
// 获取一级目录
export function fadSimulationDirectoryTableParent() {
    return request({
        url: '/fad/simulation/directory-table/parent',
        method: 'get',
    })
}
// 获取二级目录
export function fadSimulationDirectoryTableDirectory(data) {
    return request({
        url: `/fad/simulation/directory-table/directory/${data}`,
        method: 'get',
    })
}
// 获取动图
export function fadSimulationSimulationanalysisdatadifList(data) {
    return request({
        url: `/fad/simulation/simulation-analysis-data/gifList`,
        method: 'post',
        data
    })
}
// 模拟分析添加
export function fadSimulationSimulationAnalysisDataSave(data) {
    return request({
        url: `/fad/simulation/simulation-analysis-data/save`,
        method: 'post',
        data
    })
}
// 模拟分析删除和多个删除
export function fadSimulationSimulationAnalysisDataRemove(data) {
    return request({
        url: `/fad/simulation/simulation-analysis-data/remove`,
        method: 'post',
        data
    })
}
// 模拟分析编辑
export function fadSimulationSimulationAnalysisDataUpdate(data) {
    return request({
        url: `/fad/simulation/simulation-analysis-data/update`,
        method: 'post',
        data
    })
}
// 模拟详情
export function fadSimulationSimulationAnalysisDataDetails(data) {
    return request({
        url: `/fad/simulation/simulation-analysis-data/details/${data}`,
        method: 'get',
    })
}
// 模拟添加动图
export function fadSimulationSysAttachmentsSave(data) {
    return request({
        url: `/fad/simulation/sys-attachments/save`,
        method: 'post',
        data
    })
}
// 模拟删除附件
export function fadSimulationSysAttachmentsRemove(data) {
    return request({
        url: `/fad/simulation/sys-attachments/remove/${data}`,
        method: 'get',
    })
}
// 下载附件
export function fadSimulationSysAttachmentsattachments(data) {
    return request({
        url: `/fad/promotion/downLoadFiles/${data}`,
        method: 'get',
    })
}

export function download(url) {
    return request({
        url: '/devApi' + url,
        method: 'get',
        responseType: 'arraybuffer'
    })
}

//通用---文件下载
export function fileDownLoad(data) {
    return request({
        url: '/oss/upload/file/downloadFile/' + data,
        method: 'get',
        data: '',
        responseType: 'arraybuffer'
    })
}
//获取公司树信息
export function queryCompany() {
    return request({
        url: `/fad/aide/analysis-assistant/queryCompany`,
        method: 'get',
    })
}
//通过id查公司员工
export function queryEmpByOrgId(data) {
    return request({
        url: `/fad/aide/analysis-assistant/queryEmpByOrgId/${data}`,
        method: 'get',
    })
}
