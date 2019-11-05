// -------------- 获取文章列表 ------------
$.ajax({
    url: 'http://47.111.184.55:8888/api/v1/admin/article/query',
    type: 'get',
    success: function (data) {
        var html = template('articleTpl', { data: data.data.data })
        $('#articleBox').html(html)
        
    }
}) 


// ------------------ 所有分类 -----------------
$.ajax({
    url: 'http://47.111.184.55:8888/api/v1/admin/category/list',
    type: 'get',
    success: function (data) {
        var html = template('selCategoryTpl', { data: data.data })
        $('#selCategory').html(html)
        
    }
}) 


// --------------------- 分页 -----------------------
$.ajax({
    url: 'http://47.111.184.55:8888/api/v1/admin/article/query',
    type: 'get',
    success: function (data) {
        console.log(data);
        var html = template('pagingTpl', { data: data.data })
        $('#pagingBox').html(html)
    }
}) 