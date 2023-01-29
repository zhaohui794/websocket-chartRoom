const ws = require('nodejs-websocket');

const TYPE_ENTER = 0;
const TYPE_LEAVE = 1;
const TYPE_MSG = 2;

/*
思路：
消息不应该只有字符串
有三种状态表示用户进入、离开、日常消息
type: 0=进入，1=离开，2=日常消息
msg:消息的内容
time:聊天状态的具体时间
*/
let count = 0;
let d = new Date(); 
const server = ws.createServer(conn => {
    console.log('新的连接')
    count++
    conn.userName = `用户${count}`
    broadcast({
        type:TYPE_ENTER,
        msg:`${conn.userName}进入聊天室`,
        time:d.toLocaleTimeString() //toLocaleTimeString()方法返回该日期对象时间部分的字符串
    })

    conn.on('text', data => {
        broadcast({
            type:TYPE_MSG,
            msg:data,
            time:d.toLocaleTimeString()
        })
    });
    conn.on('close', data => {
        console.log('连接断开')
        count--
        broadcast({
            type:TYPE_LEAVE,
            msg:`${conn.userName}离开聊天室`,
            time:d.toLocaleTimeString()
        })

    });
    conn.on('error', data => {
        console.log('连接异常')
    })
});

// 广播给所有用户发消息
function broadcast(msg) {
    //server.connections 表示所有用户
    server.connections.forEach(item => {
        item.send(JSON.stringify(msg))
    })
}


server.listen(8080, () => {
    console.log('监听端口8080')
})