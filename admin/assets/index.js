//获取用户信息
$.ajax({
    url: 'http://47.111.184.55:8888/api/v1/admin/user/info',
    type: 'get',
    success: function (data) {
        var html = template('indexTpl', data);
        $('#indexBox').html(html)
    }
});
//个人中心头像
$.ajax({
    url: 'http://47.111.184.55:8888/api/v1/admin/user/info',
    type: 'get',
    success: function (data) {
        var html = template('selfTpl', data);
        $('#selfBox').html(html)
    }
});