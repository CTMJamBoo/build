$(function() {

    $("#head").load("../layout/header.html", function() {});
    $("#foot").load("../layout/footer.html", function() {});
    //载入验证码
    var xtvcode = randomCode();
    $('.input_login_vcode').html(xtvcode);
    //表单验证
    $('.submit_btn').click(function() {
        var username = $('#input_login_name').val();
        var password = $('#input_login_password').val();
        var confirm = $('#input_pwd_confirm').val();
        if (username == '' || password == '' || confirm == '' || vcode == '') {
            layui.use('layer', function() {
                var layer = layui.layer;
                layer.msg('请填写完整的信息');

            });
            return;
        }

        //验证码
        var vcode = $('#input_vcode').val();
        if (vcode.toLowerCase() != xtvcode.toLowerCase()) {
            layui.use('layer', function() {
                var layer = layui.layer;
                layer.msg('请输入正确的验证码');

            });
            return;
        }
        //选中状态
        if (!$('.check_box').get(0).checked) {
            layui.use('layer', function() {
                var layer = layui.layer;
                layer.msg('请同意会员注册条款');
            });
            return;
        }

        var tag2 = check(/^[a-zA-Z_$][\w$]{5,15}$/, username, '用户名不能以数字开头，由长度6到16位的数字字母_$组成！');
        var tag3 = check(/^[a-zA-Z0-9]{6,12}$/, password, '请输入长度6到12位的数字和字母组成');
        var tag4 = check(new RegExp('^' + password + '$'), confirm, '两次密码不一致');
        if (tag2 * tag3 * tag4 == 1) {
            $.ajax({
                type: 'get',
                url: `//${location.hostname}/kangJ_php/register.php`,
                data: {
                    username,
                    password
                },
                dataType: 'json'
            }).then(function(data) {
                if (data.code == 1) {
                    layui.use('layer', function() {
                        var layer = layui.layer;
                        layer.msg(data.msg);
                    });
                    setTimeout(() => {
                        location.href = '../html/login.html';
                    }, 1000)
                } else {
                    layui.use('layer', function() {
                        var layer = layui.layer;
                        layer.msg(data.msg);
                    });
                }
            })
        }
    })

    //更换验证码
    $('.sm_btn').click(function() {
        var vcode = randomCode();
        $('.input_login_vcode').html(vcode);
    })
})

//表单验证
function check(reg, value, ele) {
    var tag = reg.test(value);
    if (!tag) { // 不符合规则
        layui.use('layer', function() {
            var layer = layui.layer;
            layer.msg(ele);
        });
        return false;
    } else {
        return true;
    }
}

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