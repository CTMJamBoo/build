$(function() {
    $("#head").load("../layout/header.html", function() {});
    $("#foot").load("../layout/footer.html", function() {});
})

layui.use('laypage', function() {
    var laypage = layui.laypage;

    var label = '';
    var order = 'id';
    var sort = 'asc';
    renderList(1, true);

    $('#lihe').click(function() {
        label = '玫瑰礼盒';
        renderList(1, true);
    })
    $('#xianhua').click(function() {
        label = '鲜花玫瑰';
        renderList(1, true);
    })
    $('#kj_price_asc').click(function() {
        order = 'goods_current_price';
        sort = 'ASC';
        renderList(1, true);
    })
    $('#kj_price_desc').click(function() {
        order = 'goods_current_price';
        sort = 'DESC';
        renderList(1, true);
    })

    function renderList(page = 1, tag) {
        $.ajax({
            type: 'get',
            url: `//${location.hostname}/kangJ_php/pagation.php`,
            data: {
                page: page,
                size: 8,
                label,
                order,
                sort
            },
            dataType: 'json',
            success: data => {
                // console.log(data)
                var {
                    data,
                    total
                } = data;
                var html = '';
                $(data).each((index, item) => {
                    html += `
                            <div id='list' class="col_xs_8 layui-col-md4 item cl">
                                <div id="figure">
                                <a href="./detail.html?id=${item.id}">
                                    <img src="${item.goods_big}" alt="">
                                </a>
                                </div>
                                <h4 class="text_uppercase ellipsis sl">${item.goods_title}</h4>
                                <div class="figure_title ellipsis">${item.goods_trade_num}</div>
                                <p><span>￥</span>${item.goods_current_price}
                                    <span class="del">${item.goods_old_price}</span>
                                </p>
                            </div>
                            `;
                })

                $('.lyaui-row').html(html);

                if (tag) {
                    //执行一个laypage实例
                    laypage.render({
                        elem: 'test8', //注意，这里的 test1 是 ID，不用加 # 号
                        limit: 8,
                        count: total * 1, //数据总数，从服务端得到
                        jump: function(obj, first) {
                            //obj包含了当前分页的所有参数，比如：
                            // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                            // console.log(obj.limit); //得到每页显示的条数
                            //首次不执行
                            if (!first) {
                                //do something
                                renderList(obj.curr, false);
                            }
                        }
                    });
                }
            }
        })
    };
});