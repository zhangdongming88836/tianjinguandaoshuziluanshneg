import request from '@/api/request';
//发送邮箱
export function sendMail(data) {
    return request({
        url: `/fad/message/message-board/sendMail`,
        method: 'post',
        timeout:20000,
        data
    })
}
//获取邮箱信息
export function queryByPage(data) {
    return request({
        url: `/fad/message/contact-person/queryByPage`,
        method: 'post',
        data
    })
}
//添加邮箱信息
export function add(data) {
    return request({
        url: `/fad/message/contact-person/add`,
        method: 'post',
        data
    })
}
//通过id查看邮箱信息
export function queryById(data) {
    return request({
        url: `/fad/message/contact-person/queryById/${data}`,
        method: 'get',

    })
}
//修改邮箱信息
export function update(data) {
    return request({
        url: `/fad/message/contact-person/update`,
        method: 'post',
       data
    })
}
//删除邮箱信息
export function deletes(data) {
    return request({
        url: `/fad/message/contact-person/delete/${data}`,
        method: 'get',
    })
}