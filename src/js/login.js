// import { setCookie } from './cookie.js';
$(function() {

        $("#head").load("../layout/header.html", function() {});
        $("#foot").load("../layout/footer.html", function() {});

    })
    //页面打开时载入验证码
var xtvcode = randomCode();
$('.input_login_vcode').html(xtvcode);
$('.submit_btn').on('click', function() {
    var username = $('#input_login_name').val();
    var password = $('#input_login_password').val();
    // console.log(username, password)
    //     验证码
    var vcode = $('#input_vcode').val();
    if (vcode.toLowerCase() != xtvcode.toLowerCase()) {
        layui.use('layer', function() {
            var layer = layui.layer;
            layer.msg('请输入正确的验证码');
        });
        return;
    }
    $.ajax({
        type: 'get',
        url: `//${location.hostname}/kangJ_php/login.php`,
        data: {
            username,
            password
        },
        dataType: 'json'
    }).then(({ code, msg }) => {
        console.log(code)
        if (code) {
            layui.use('layer', function() {
                var layer = layui.layer;
                layer.msg(msg);
            });
            setTimeout(() => {
                setCookie('kanka_user', username, new Date());
                location.href = '../../index.html';
            }, 1000)
        } else {
            layui.use('layer', function() {
                var layer = layui.layer;
                layer.msg(msg);
            });
        }
    })

})


//更换验证码
$('.sm_btn').click(function() {
    var vcode = randomCode();
    $('.input_login_vcode').html(vcode);
})


//验证码
function randomCode() {
    var code; // 在全局定义验证码
    // 生成验证码
    code = "";
    var codeLength = 4; // 验证码的长度
    var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D',
        'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q',
        'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e',
        'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u',
        'v', 'w', 'x', 'y', 'z'); // 随机数
    for (var i = 0; i < codeLength; i++) { // 循环操作
        var index = Math.floor(Math.random() * 62); // 取得随机数的索引（0~35）
        code += random[index]; // 根据索引取得随机数加到code上
    }
    return code;
}