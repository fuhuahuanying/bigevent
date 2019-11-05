//获取用户详情
$.ajax({
    url: 'http://47.111.184.55:8888/api/v1/admin/user/detail',
    type: 'get',
    success: function (data) {
      // console.log(data);
      var html = template('userDetailsTpl', data)
      $('#userBox').html(html)
    }
  })
//实现头像上传预览功能
$('#userBox').on('change', '#exampleInputFile', function () {
    var files = this.files[0]
    var imgUrl = URL.createObjectURL(files)
    $('.user_pic').attr('src', imgUrl)
  })

//用户编辑信息上传功能
$('#userBox').on('submit', '#userForm', function () {
    //创建formData对象用于实现图片文件上传
    var formData = new FormData($('#userForm')[0])
    // formData.append('user_pic',$('#exampleInputFile')[0].files[0])
    console.log(formData)
    $.ajax({
        url: 'http://47.111.184.55:8888/api/v1/admin/user/edit',
        type: 'post',
        data: formData,
        //告诉ajax方法，不需要添加参数类型，设置一个属性即可 contentType:
        contentType: false,
        //告诉ajax方法，不需要解析请求参数，因为我们上次的图片属于一个二进制形式
        processData: false,
      success: function () {
        alert('修改成功')
        location.href = '/index.html'
      },
      error: function () {
        alert('修改失败')
      }
    })
    return false;
});