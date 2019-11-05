// //获取浏览器地址栏中的id参数
// var id = getUrlParams('id');

// //从浏览器的地址栏中获取查询参数
// function getUrlParams(name) {
//     var paramsAry = location.search.substr(1).split('&');
//     // 循环数据
//     for (var i = 0; i < paramsAry.length; i++) {
//         var tmp = paramsAry[i].split('=');
//         if (tmp[0] == name) {
//             return tmp[1];
//         }
//     }
//     return -1;
// }
// console.log(id);
// //当前管理员是在做修改文章操作
// if(id != -1){
//      // 根据id获取文章的详细信息
//     $.ajax({
//         type: 'get',
//         url: 'http://47.111.184.55:8888/api/v1/admin/article/search',
//         data: {
//             id: id
//         },
//         //当请求成功后，我们还需要去进行请求，获取分类列表，之前获取的分类列表是绑定在添加的页面 因为后台只有文章分类,没有所有的分类
//         success: function (data) {
//             $.ajax({
//                 type: 'get',
//                 url: 'http://47.111.184.55:8888/api/v1/admin/category/list',        
//                 //把分类列表信息封装到 详细信息的对象中，这样我们在模板引擎中就能获取到分类列表的信息
//                     success: function (response) { 
//                     var html = template('modifyArticle', data)
//                     $('#modifyArticleParent').html(html)
//                     var optionHtml = template('optionArticle', {
//                         response: response.data
//                     })
//                     $('#categoryId').html(optionHtml)
//                     //头像上传
//                     $("#exampleInputFile").on('change', function () {
//                         var files = this.files[0]
//                         // 获取路径
//                         var url = URL.createObjectURL(files)
//                         // 图片预览
//                         $('#coverImg').attr('src', url)
//                         // 路径存储至隐藏域
//                         $('#exampleInputFile').val(url)
//                     })
//                 }
//             })
    
//         }
//     })
//     $('#modifyArticleParent').on('submit', '#submission', function (e) {
//         e.preventDefault();
//         // 获取表单数据
//         var formData = new FormData($('#submission')[0]);
//         formData.append('id', id)
    
//         // 发送ajax请求
//         $.ajax({
//             url: 'http://47.111.184.55:8888/api/v1/admin/article/edit',
//             type: 'post',
//             data: formData,
//             //告诉ajax不要设置数据类型
//             contentType: false,
//             //告诉ajax不要解析参数
//             processData: false,
//             success: function () {
//                 // 刷新页面
//                 location.reload()
//             }
//         })
    
//     })
// }

// 获取浏览器地址栏中的id参数
var id = getUrlParams('id');

// 当前管理员是在做修改文章操作
function getUrlParams(name) {
    var paramsAry = location.search.substr(1).split('&');
    // 循环数据
    for (var i = 0; i < paramsAry.length; i++) {
        var tmp = paramsAry[i].split('=');
        if (tmp[0] == name) {
            return tmp[1];
        }
    }
    return -1;
}
console.log(id);
if(id != -1){
    $.ajax({
        type: 'get',
        url: 'http://47.111.184.55:8888/api/v1/admin/article/search',
        data: {
            id: id
        },
        success: function (data) {
            $.ajax({
                type: 'get',
                url: 'http://47.111.184.55:8888/api/v1/admin/category/list',
                success: function (response) {
                    data.response = response
                    var html = template('modifyArticle', data)
                    $('#modifyArticleParent').html(html)
    
    
    
                }
            })
        }
    })

    //头像上传预览功能
    $("#modifyArticleParent").on('change', '#exampleInputFile', function () {
        var files = this.files[0]
        // 获取路径
        var url = URL.createObjectURL(files)
        // 图片预览
        $('#coverImg').attr('src', url)
        // 路径存储至隐藏域
        $('#example').val(url);
    })
}


//给修改按钮绑定点击事件
$('#modifyArticleParent').on('click', '#edit', function () {
    // 获取表单数据
    var formData = new FormData($('#submission')[0]);
    formData.append('id', id)
    formData.delete('cover')
    formData.append('cover', $('#example').val())
    // 发送ajax请求
    $.ajax({
        url: 'http://47.111.184.55:8888/api/v1/admin/article/edit',
        type: 'post',
        data: formData,
        contentType: false,
        processData: false,
        success: function (data) {
            console.log(data);
            location.href="./article_list.html"
        }
    })
    return false;
})
