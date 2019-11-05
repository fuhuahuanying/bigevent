// ----------------- 文章类型 --------------------
$.ajax({
    url: 'http://47.111.184.55:8888/api/v1/index/category',
    type: 'get',
    success: function (data) {
        var html = template('classifyTpl', { data: data.data.slice(0,5) })
        $('#lclassifyBox').html(html)
    }
})

$.ajax({
    url: 'http://47.111.184.55:8888/api/v1/index/category',
    type: 'get',
    success: function (data) {
        var html = template('classifyTpl', { data: data.data.slice(0,5) })
        $('#classifyBox').html(html)
    }
})


// ----------------- 热门排行 --------------------
$.ajax({
    url: 'http://47.111.184.55:8888/api/v1/index/rank',
    type: 'get',
    success: function (data) {
        var html = template('hotrkTpl', { data: data.data.slice(0,7) })        
        $('#hotrkBox').html(html)
      $('#hotrkBox li:eq(0) span').addClass('first')
      $('#hotrkBox li:eq(1) span').addClass('second')
      $('#hotrkBox li:eq(2) span').addClass('third')
    }
})


// ----------------- 最新评论 --------------------
$.ajax({
    url: 'http://47.111.184.55:8888/api/v1/index/latest_comment',
    type: 'get',
    success: function (data) {
        var html = template('commentTpl', { data: data.data })
        $('#commentBox').html(html)
    }
})


// ----------------- 焦点关注 --------------------
$.ajax({
    url: 'http://47.111.184.55:8888/api/v1/index/attention',
    type: 'get',
    success: function (data) {
        var html = template('focusTpl', { data: data.data })
        $('#focusBox').html(html)
    }
})
