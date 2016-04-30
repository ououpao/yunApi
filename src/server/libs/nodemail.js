var nodemailer = require("nodemailer");
// 开启一个 SMTP 连接池
var smtpTransport = nodemailer.createTransport("SMTP", {
    host: "smtp.qq.com", // 主机
    secureConnection: false, // 使用 SSL
    port: 25, // SMTP 端口
    auth: {
        user: "570453516@qq.com", // 账号
        pass: "****" // 密码
    }
});
// 设置邮件内容
var mailOptions = {
    from: "570453516@qq.com", // 发件地址
    to: "570453516@qq.com", // 收件列表
    subject: "Hello world", // 标题
    html: "世界，你好！" // html 内容
}
    // 发送邮件
exports.sendMail = (to, subject, html) => {
	mailOptions.to = to;
	mailOptions.subject = subject;
	mailOptions.html = html;
    smtpTransport.sendMail(mailOptions, function(error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " + response.message);
        }
        smtpTransport.close(); // 如果没用，关闭连接池
    });
}
