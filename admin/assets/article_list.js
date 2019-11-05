
//向服务器发送ajax请求,获取文章列表数据
$.ajax({
    type: 'get',
    url: 'http://47.111.184.55:8888/api/v1/admin/article/query',
    success: function (data) {
        // console.log(data);
        var html = template('postsTpl', data);
        $('#postsBox').html(html); 
    }
})

// 处理日期时间格式
function formateDate(date) {
    // 将日期时间字符串转换成日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
};
template.defaults.imports.dateFormat = formateDate;

// //向服务器发送请求,获取分类列表的数据
$(function () {
    $.ajax({
        url: 'http://47.111.184.55:8888/api/v1/admin/category/list',
        type: 'get',
        success: function (data) {
            var html = template('categoryTpl', data)
             $('#article_category').html(html);
        }
    })
})
//为筛选按钮绑定提交事件,在事件处理函数中获取用户选择到的内容
$('#filterForm').on('submit', function () {
    var formData = $(this).serialize();
    // let query ={page :1}
    // // 获取到管理员选择的过滤条件
    // var formData = $(this).serializeArray();
    // $.each(formData,()=>{
    //     query[this.name] = this.value;
    // })
    //向服务器端发送请求 根据条件索要文章列表数据
    $.ajax({
        type: 'get',
        url: 'http://47.111.184.55:8888/api/v1/admin/article/query',
        data: formData,
        success: function (data) {
            var html = template('postsTpl', data);
            $('#postsBox').html(html)
        }
    })
    return false;
})

//  //文章分页数据
// function changePage(page) {
//     var formData = $(this).serialize();
//     //向服务端发送ajax请求,获取文章列表数据
//     $.ajax({
//         type: 'get',
//         url: `http://47.111.184.55:8888/api/v1/admin/article/query`,
//         data: formData,
//         success: function (data) {
//             console.log(data);
//             var html = template('postsTpl', data);
//             $('#postsBox').html(html);

//         }
//         })
// }

//进到文章列表页面，就获取符合条件的文章封装成了一函数。
function getData(myPage) {
    $.ajax({
        type: 'get',
        url: 'http://47.111.184.55:8888/api/v1/admin/article/query',
        data: {
            page: myPage, // 当前第几页
            perpage: 5    // 每页展示条数
        },
        success: function (backData) {
            console.log(backData)
            var resHtml = template('postsTpl', backData)
            $('tbody').html(resHtml)

            var totalPages = backData.data.totalPage

            if (myTotalPage != totalPages) {
                myTotalPage = totalPages

                $pagination.twbsPagination('destroy')
                $pagination.twbsPagination($.extend({}, defaultOpts, {
                    startPage: 1,
                    totalPages: totalPages
                }))
            }
        }
    })
}
getData(1)
var $pagination = $('#pagination-demo')
var myTotalPage = 10
var defaultOpts = {
    totalPages: myTotalPage,
    visiblePages: 7,
    first: '首页',
    last: '末页',
    prev: '上一页',
    next: '下一页',
    onPageClick: function (event, page) {
        getData(page)
    }
}

$pagination.twbsPagination(defaultOpts);
$('#pagination-demo').twbsPagination();





// 当删除按钮被点击的时候
$('#postsBox').on('click', '.delete', function () {
	// 弹出删除确认框 和管理员确认是否真的要进行删除操作
	if(confirm('您真的要进行删除操作吗')) {
		// 获取到管理员要删除的文章的id
		var id = $(this).attr('data-id');
        // 向服务器端发送请求 执行删除操作
		$.ajax({
            type: 'delete',
            data:{
                id:id
            },
			url: 'http://47.111.184.55:8888/api/v1/admin/article/delete',
			success: function () {
				location.reload();
			}
		})
	}
});


