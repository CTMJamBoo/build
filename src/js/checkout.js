$(function() {

    $("#head").load("../layout/header.html", function() {});
    // $("#foot").load("../layout/footer.html", function() {});
    //地址选择
    addressInit('cmbProvince', 'cmbCity', 'cmbArea');
    $('.cmb01').html($('#cmbProvince').val());
    $('.cmb02').html($('#cmbCity').val())
    $('.cmb03').html($('#cmbArea').val())
    $('select').change(function() {
        $('.cmb01').html($('#cmbProvince').val());
        $('.cmb02').html($('#cmbCity').val())
        $('.cmb03').html($('#cmbArea').val())
    })

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
                        data.data.forEach(item => {
                            html += `
                            <tr>
                            <td class="cl">
                                <div class="d">
                                    <a href="">
                                        <img src="../images/list01_05.png" alt="">
                                    </a>
                                </div>
                                <p>65P9 65吋全面屏金属机身4K超高清</p>
                                <p>65P9</p>
                                <p>K歌电视 前置音响 人工智能 二级能效</p>
                            </td>
                            <td>
                                ￥<span class="price-x">${item.goods_price}</span>
                            </td>
                            <td><span class="number-x"><b>×</b>${item.number}</span></td>
                            <td><span class="cmb">￥</span><span class="money-al">${(item.goods_price*item.number).toFixed(2)}</span></td>
                        </tr>
                            `;
                        })
                    }
                })
            })
        }
    })

})