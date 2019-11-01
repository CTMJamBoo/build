// 设置

function setCookie(name, content, iDay) {
    var date = new Date();
    date.setDate(date.getDate() + iDay);
    date.setHours(date.getHours() - 8);

    document.cookie = `${name}=${content};path=/;expires=${date}`;

}


// setCookie('abc', 'abc', 3);

// 删除

function removeCookie(name) {
    setCookie(name, '', -1);
}

// removeCookie('abc');

// 获取cookie列表

function getCookieList() {
    var cookie = document.cookie;

    var arr = cookie.split('; ');

    var list = [];

    arr.forEach(item => {
        var [name, content] = item.split('=');
        list.push({
            name,
            content
        })
    });

    return list;
}


// 获取指定的cookie

function getCookie(name) {
    var list = getCookieList();

    var value = list.filter(item => item.name === name)[0];

    if (value) {
        return value.content
    }

    return ''

}
// //导出
// export {
//     setCookie,
//     getCookie,
//     getCookieList,
//     removeCookie
// }