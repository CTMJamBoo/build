$(function() {
    // $("#head").load("../src/layout/header.html", function() {});
    // $("#foot").load("../src/layout/footer.html", function() {});

    var search = $('#my_search');

    renderList('');


    var timer;

    my_search.oninput = function() {


        clearTimeout(timer);

        timer = setTimeout(() => {

            var keys = this.value;
            renderList(keys);
        }, 800)

    }


    function renderList(key) {
        $.ajax({
            type: 'get',
            url: `//${location.hostname}/kangJ_php/list.php`,
            data: {
                key
            },
            dataType: 'json'
        }).then(function(data) {
            var html = '';
            if (data.code == 1) {
                data.data.forEach((item) => {
                    html += `<div class = "col_xs_8">
                            <div id = "figure" >
                            <a href="./src/html/detail.html?id=${item.id}">
                            <img src = "${item.goods_big}" alt = "" >
                            </a> </div> <h4 class = "text_uppercase ellipsis"> ${ item.goods_title} </h4> 
                            <div class = "figure_title ellipsis" > ${ item.goods_trade_num} </div> <p> ￥${item.goods_current_price} 
                            <span class = "del" > &nbsp;￥${ item.goods_old_price} </span> </p> </div>`;
                })
                $('.star_row').html(html);

            } else {
                alert('cmb')
            }


        })
    }

})