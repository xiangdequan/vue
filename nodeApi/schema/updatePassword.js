//导入定义密码验证规则插件
const joi = require("joi");

//定义旧密码验证规则
const oldPassword = joi.string().alphanum().min(6).max(12).required();

//导出密码修改验证规则
// 1. joi.ref('oldPassword') 表示 newPassword 的值必须和  oldPassword 的值保持一致
// 2. joi.not(joi.ref(' oldPassword')) 表示 newPassword 的值不能等于 oldPassword 的值
// 3. .concat() 用于合并 joi.not(joi.ref(' oldPassword')) 和 oldPassword 这两条验证规则
module.exports = {
    body: {
        oldPassword,
        newPassword: joi.not(joi.ref(' oldPassword')).concat(oldPassword)
    }
}
