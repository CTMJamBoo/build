$(function() {
    if (!getCookie('kanka_user')) {
        $('.tobar_logined').hide();
    } else {
        $('.topbar_info').hide();
        $('.tobar_logined').show();
        $('.kanka_user').html(getCookie('kanka_user'));
    }
    $('.kanka_esc').on('click', function() {
        removeCookie('kanka_user');
        location.reload();
    })
    var siteNav = $('.site_header_relative')[0];
    var height = siteNav.offsetHeight;

    $(window).scroll(function() {
        //获取滚动距离
        // console.log(height, siteNav)
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop > height) {
            $('#nav_top').css({
                'position': 'fixed',
                'top': 0,
                'left': 0
            })
        } else {
            $('#nav_top').css({
                'position': 'absolute',
                'top': '40px'
            });
        }
    })

    // alert(getCookie('kanka_user'))
    // $.ajax({
    //     type: 'get',
    //     url: `//${location.hostname}/kangJ_php/user.php`,
    //     data: {
    //         username: getCookie('kanka_user')
    //     },
    //     dataType: 'json',
    // }).then(function(data) {
    //     if (data.code == 1) {
    //         var ctm = '';
    //         data.data.forEach((item) => {
    //             ctm = ` <a id = 'kj_cart' class = "${item.userid}" href = "../html/cart.html" >
    //     <img src = "../images/top-header-cart.png" alt = "" > 购物车( <span class = 'sp_num' > 0 </span>) </a>`;
    //         })
    //         $('.topbar_cart').html(ctm);
    //     }
    // })

})