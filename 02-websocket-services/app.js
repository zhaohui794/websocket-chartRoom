/*
1.开发websocket服务端程序
*/
const ws = require('nodejs-websocket');
var PORT = 8080;

//创建一个server
var server = ws.createServer(connect => {
    console.log("有用户连接上来");
    //text事件当接收到浏览器数据时，就会触发
    connect.on('text', data => {
        console.log(data);
        //给浏览器发送数据
        connect.send(data.toUpperCase() + "!!!!");
    });
    connect.on('close', () => {
        console.log("关闭了连接");
    });
    connect.on('error', () => {
        console.log("连接异常");
    });
});

server.listen(PORT, () => {
    console.log("服务器启动成功 监听的是" + PORT);
});
