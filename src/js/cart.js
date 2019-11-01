$(function() {

    $("#head").load("../layout/header.html", function() {});
    $("#foot").load("../layout/footer.html", function() {});
    $('tbody').css('background', ' #fffeec')

    if (!getCookie('kanka_user')) {
        $('tbody').html('');
    } else {
        $.ajax({
            type: 'get',
            url: `//${location.hostname}/kangJ_php/user.php`,
            data: {
                username: getCookie('kanka_user')
            },
            dataType: 'json'
        }).then(function(data) {
            if (data.code == 1) {
                data.data.forEach(item => {
                    $.ajax({
                        type: 'get',
                        url: ` //${location.hostname}/kangJ_php/cart.php`,
                        data: {
                            userid: item.userid
                        },
                        dataType: 'json'
                    }).then(function(data) {
                        if (data.code == 1) {
                            var html = '';
                            // console.log(data)
                            data.data.forEach((item) => {
                                html += `<tr>
                                    <td class="checkbox"><input class="check-one check" type="checkbox" /></td>
                                    <td class="goods cl">
                                        <div class="col_xs">
                                            <a href=""><img src="../images/list01_02.png" alt="" /></a>
                                        </div>
                                        <div class="col_xsd">
                                            <h5>
                                                <a class='goods_name' href="">${item.goods_name}</a>
                                            </h5>
                                            <p class="brief">AI人工智能 2G+16G 金属背板 防蓝光模式</p>
                                        </div>
                                    </td>
                                    <td class="price">${item.goods_price}</td>
                                    <td class="count">
                                        <span class="reduce">-</span>
                                        <input class="count-input" type="text" value="${item.number}" />
                                        <span class="add">+</span></td>
                                    <td class="subtotal">${(item.goods_price*item.number).toFixed(2)}</td>
                                    <td class="operation"><span class="delete">删除</span></td>
                                </tr>`;
                                $('tbody').html(html);

                                //载入购物车页面时全选
                                $("input[type='checkbox']").prop("checked", true);

                                $('.add').on('click', function() {
                                    $.ajax({
                                        type: 'get',
                                        url: `//${location.hostname}/kangJ_php/update.php`,
                                        data: {
                                            number: 1,
                                            userid: item.userid,
                                            goodsid: item.goodsid
                                        },
                                        dataType: 'json'
                                    }).then(function(data) {
                                        if (data.code == 1) {
                                            console.log(data.msg)
                                        }
                                    })
                                    var add = $(this);
                                    getAddSubtract(add, 1);
                                    getTotal();
                                })

                                $('.reduce').on('click', function() {

                                    $.ajax({
                                        type: 'get',
                                        url: ` //${location.hostname}/kangJ_php/update.php`,
                                        data: {
                                            number: -1,
                                            userid: item.userid,
                                            goodsid: item.goodsid
                                        },
                                        dataType: 'json'
                                    }).then(function(data) {
                                        if (data.code == 1) {

                                        }
                                    })
                                    var subtract = $(this);
                                    getAddSubtract(subtract, -1);
                                    getTotal();

                                })

                                //删除
                                $('.delete').on('click', function() {
                                    $.ajax({
                                        type: 'get',
                                        url: ` //${location.hostname}/kangJ_php/delshop.php`,
                                        data: {
                                            userid: item.userid,
                                            goodsid: item.goodsid
                                        },
                                        dataType: 'json'
                                    }).then(function(data) {
                                        if (data.code == 1) {
                                            $(this).parent().parent().remove();
                                            getTotal();
                                            location.href = 'cart.html'
                                        }
                                    })
                                })


                                //全选
                                $('.check-all').on('click', function() {
                                    for (var i = 0; i < $('.check-one').length; i++) {
                                        $('.check-one')[i].checked = this.checked;
                                    }
                                    getTotal();
                                })

                                //单选
                                $('.check-one').click(function() {
                                    checkAll();
                                    getTotal();
                                })

                                $('.count-input').change(function() {
                                    var count = $(this).val() * 1;
                                    var price = $(this).parent().prev().html() * 1;
                                    var subtotal = (count * price).toFixed(2);
                                    $(this).parent().next().html(subtotal);
                                    getTotal();
                                })

                                getTotal();


                                // $('.fr').on('click', function() {
                                //     // var checkOne = document.querySelectorAll('.check-one');
                                //     if ($(".check-one:checked").length == 0) {
                                //         // alert()
                                //         console.log('meixuan')
                                //     } else {
                                //         var userid = [];
                                //         var number = [];
                                //         if ($('.check-one:checked')) {
                                //             userid.push(item.userid);
                                //             number.push(item.number);
                                //             console.log(userid)
                                //             console.log(number)
                                //         }
                                //     }
                                // })
                            })
                        }
                    })
                })
            }
        })
    }
    //结算


    //勾选
    function checkAll() {
        for (var i = 0; i < $('.check-one').length; i++) {
            if (!($('.check-one')[i].checked)) {
                break;
            }
        }
        if (i == $('.check-one').length) {
            $('.check-all')[0].checked = true;
        } else {
            $('.check-all')[0].checked = false;
        }
    }

    //合计
    function getTotal() {
        var total = 0;
        var money = 0;
        for (var i = 0; i < $('.check-one').length; i++) {
            if ($('.check-one')[i].checked) {
                var oTr = $('.check-one')[i].parentNode.parentNode;
                var count = $(oTr).find('.count-input')[0].value * 1;
                var subtotal = $(oTr).find('.subtotal')[0].innerHTML * 1;
                total += count;
                money += subtotal;
            }
        }
        $('#selectedTotal').html(total);
        $('#priceTotal').html(money.toFixed(2));
    }
    //加减
    function getAddSubtract(sbyml, num) {
        if (num == 1) {
            var count = sbyml.prev().val() * 1;
            var price = sbyml.parent().prev().html() * 1;
            count += num;
            sbyml.prev().val(count);
        } else {
            var count = sbyml.next().val() * 1;
            var price = sbyml.parent().prev().html() * 1;
            if (count <= 1) {
                return;
            } else {
                count += num;
            }
            sbyml.next().val(count);
        }
        var subtotal = (count * price).toFixed(2);
        sbyml.parent().next().html(subtotal);
        return count;
    }

})