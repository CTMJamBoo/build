$(function() {
    $("#head").load("../layout/header.html", function() {});
    // $("#foot").load("../layout/footer.html", function() {});

    var id = queryString('id');
    // console.log(id)



    $.ajax({
        type: 'get',
        url: `//${location.hostname}/kangJ_php/detail.php`,
        data: {
            id
        },
        dataType: 'json'
    }).then(function(data) {
        // console.log(data)
        var a = '';
        $('.breadcrumb .active').text(data.goods_trade_num);
        a = ` <li data-small = "${data.goods_big}" data-big = "${data.goods_big}">
    <img src = "${data.goods_big}" >
    </li> <li data-small = "${data.goods_pic}"data-big = "${data.goods_pic}">
    <img src = "${data.goods_pic}" >
    </li> <li data-small = "../images/list01_02.png" data-big = "../images/list01_02.png">
    <img src = "../images/list01_02.png" >
    </li> <li data-small = "../images/list01_05.png" data-big = "../images/list01_05.png">
    <img src = "../images/list01_05.png" >
    </li>
    `;
        $('#nav').html(a);

        var b = '';
        b = ` <img src = "${data.goods_big}" id = "smallImg" draggable = "false" >
    <div id = "shadow"></div>

    <div id = "bigShadow">
    <img src = "${data.goods_big}"id = "bigImg">
    </div>`;
        $('#top').html(b);

        //放大镜
        gitPic();

        var c = '';
        c = `￥<strong data-id=${data.id}>${data.goods_current_price}</strong>
        <span>${data.goods_old_price}</span>`;
        $('.price_availability_block .price').html(c);

        $('.col_xs_5 h3').text(data.goods_title);
        $('.col_xs_5 .attr').text(data.goods_trade_num);


        $('.buy').on('click', function() {
            if (!getCookie('kanka_user')) {
                location.href = '../html/login.html';
            } else {
                location.href = '../html/checkout.html';
            }
        })

        $('.addcart').on('click', function() {
            if (!getCookie('kanka_user')) {
                // localStorage.setItem('cartUrl', location.href);
                location.href = '../html/login.html';
            } else {
                // console.log(getCookie('kanka_user'))
                $.ajax({
                    type: 'get',
                    url: `//${location.hostname}/kangJ_php/user.php`,
                    data: {
                        username: getCookie('kanka_user')
                    },
                    dataType: 'json'
                }).then(function(data) {
                    if (data.code == 1) {
                        // console.log(data)
                        data.data.forEach((item) => {
                            $.ajax({
                                    type: 'get',
                                    url: `//${location.hostname}/kangJ_php/addcart.php`,
                                    data: {
                                        userid: item.userid,
                                        goodsid: id,
                                        goods_name: data.goods_title,
                                        number: $('#numBer').val(),
                                        goods_price: $('.price strong').html(),
                                        goods_img: data.goods_big,
                                        goods_trade: data.goods_trade_num
                                    },
                                    dataType: 'json'
                                })
                                .then(function(data) {
                                    if (data.code == 1) {
                                        layui.use('layer', function() {
                                            var layer = layui.layer;
                                            layer.msg(data.msg);
                                        });
                                    }
                                })

                        });
                    }
                })
            }
        })




    });

    //地址选择
    // addressInit('cmbProvince', 'cmbCity', 'cmbArea');
    // $('.cmb01').html($('#cmbProvince').val());
    // $('.cmb02').html($('#cmbCity').val())
    // $('.cmb03').html($('#cmbArea').val())
    // $('select').change(function() {
    //     $('.cmb01').html($('#cmbProvince').val());
    //     $('.cmb02').html($('#cmbCity').val())
    //     $('.cmb03').html($('#cmbArea').val())
    // })
    // $.ajax({
    //         type: 'get',
    //         url: `//${location.hostname}/kangJ_php/addcart.php',
    //         data: {
    //             userid: getCookie('kanka_user'),
    //             goodsid: id,
    //             goods_name: data.goods_title,
    //             number: $('#numBer').val(),
    //             goods_price: $('.price strong').html(),
    //             goods_img: data.goods_big,
    //             goods_trade: data.goods_trade_num
    //         },
    //         dataType: 'json'
    //     })
    //     .then(function(data) {
    //         if (data.code == 1) {
    //             alert(data.msg)
    //         }
    //     })


    $('.add').on('click', function() {
        addSubtract(1);
    })

    $('.subtract').on('click', function() {
        addSubtract(-1);
    })

})

//放大镜
function gitPic() {
    const oLis = document.querySelectorAll('#nav li');
    const oSmallImg = document.querySelector('#smallImg');
    const oBigImg = document.querySelector('#bigImg');

    for (let i = 0; i < oLis.length; i++) {
        oLis[i].onmouseover = function() {
            oSmallImg.src = this.getAttribute('data-small');
            oBigImg.src = this.getAttribute('data-big');
        }
    }
    var oBox = document.querySelector('#box');
    var oTop = document.querySelector('#top');
    var oShadow = document.querySelector('#shadow');
    var oBigShadow = document.querySelector('#bigShadow');

    var width = parseInt(getStyle(oShadow, 'width'));
    var height = parseInt(getStyle(oShadow, 'height'));


    var maxLeft = oTop.clientHeight - width;
    var maxTop = oTop.clientHeight - height;

    oTop.onmousemove = function(e) {
        oShadow.style.display = 'block';
        oBigShadow.style.display = 'block';

        var ev = event || e;
        // 拿鼠标的坐标
        var pageX = ev.pageX;
        var pageY = ev.pageY;

        var left = pageX - oBox.offsetLeft - width / 2;
        var top = pageY - oBox.offsetTop - height / 2;

        if (left <= 0) {
            left = 0;
        }

        if (left >= maxLeft) {
            left = maxLeft;
        }

        if (top <= 0) {
            top = 0
        }

        if (top >= maxTop) {
            top = maxTop
        }

        oShadow.style.left = left + 'px';
        oShadow.style.top = top + 'px';

        var scalewidth = (oBigImg.offsetWidth - oBigShadow.offsetWidth) / (oTop.offsetWidth - oShadow.offsetWidth);
        var scaleheight = (oBigImg.offsetHeight - oBigShadow.offsetHeight) / (oTop.offsetHeight - oShadow.offsetHeight);
        oBigImg.style.left = -left * scalewidth + 'px';
        oBigImg.style.top = -top * scaleheight + 'px';

    }
    oTop.onmouseout = function() {
        oShadow.style.display = 'none';
        oBigShadow.style.display = 'none';
    }
}

function getStyle(ele, property) {
    if (getComputedStyle) {
        return getComputedStyle(ele, false)[property];
    } else {
        return ele.currentStyle[property];
    }
}


function addSubtract(tag) {
    if (tag == 1) {
        var count = $('#numBer').val() * 1;
        count += tag;
        $('#numBer').val(count);
    } else {
        var count = $('#numBer').val() * 1;
        count += tag;
        if (count <= 0) {
            return;
        } else {
            $('#numBer').val(count);
        }
    }



}