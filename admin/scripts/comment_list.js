// -------------------- 评论列表展示 -----------------------
$.ajax({
    url: 'http://47.111.184.55:8888/api/v1/admin/comment/search',
    type: 'get',
    success: function (data) {
        console.log(data);
        var  html = template('commentTpl', { data: data })
        $('#commentBox').html(html)
    }
})


// -------------------- 删除评论 ------------------
$('#commentBox').on('click', '.delete', function () {
    var id = $(this).attr('data-id')
    if (confirm('确定是否删除')) {
        $.ajax({
            type: 'post',
            url: 'http://47.111.184.55:8888/api/v1/admin/comment/delete' + id,
            success: function (data) {
                alert('删除成功')
                location.reload()
            },
            error: function () {
                alert('删除失败')
            }
        })
    }

    return false
})