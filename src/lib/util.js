function queryString(name) { //拿参数值
    var search = location.search;
    search = search.replace('?', '');
    var arr = search.split('&');

    var list = [];

    arr.forEach(item => {
        var [key, value] = item.split('=');
        list.push({
            key,
            value
        });
    });
    var obj = list.filter(item => item.key === name)[0];
    return obj.value;
}
//导出
// export { queryString }