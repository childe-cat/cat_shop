export default {
    //  生成当前时间
    timeNow(){
        let date = new Date(Date.now())
        let Y = date.getFullYear() + '-'
        let M = date.getMonth() + 1 + '-'
        let D = date.getDate() + ' '
        let h = date.getHours() + ':'
        let m = date.getMinutes() + ':'
        let s = date.getSeconds()
        return Y+M+D+h+m+s
    },
}