$.ajax({
    url: 'http://47.111.184.55:8888/api/v1/admin/category/list',
    type: 'get',
    success: function (data) {
      // console.log(data);
      var html = template('tpl', {
        data: data.data
      })
      $('#tplBox').html(html)

    }
  })
  // 模态框提交表单
  $('#Modal').on('submit', function () {
    var formdata = $(this).serialize()
    console.log(formdata);

    $.ajax({
      url: 'http://47.111.184.55:8888/api/v1/admin/category/add',
      type: 'post',
      data: formdata,
      success: function (data) {
        location.reload()
      }
    })
    return false
  })
  // 点击编辑按钮
  $('#tplBox').on('click', '.edit', function () {
    var id = $(this).attr('data-id')
    $.ajax({
      url: 'http://47.111.184.55:8888/api/v1/admin/category/search',
      type: 'get',
      data: {
        id: id
      },
      success: function (data) {
        var html = template('modailTpl', {
          data: data.data
        })
        console.log(data.data);
        
        console.log(html);
        
        $('#bigBox').html(html)
        $('#addModal').modal('show');
          $('#model_shutoff').click(function () {
        $('#addModal').modal('hide');});
      }
    })
  })
  $('#bigBox').on('submit','#Modals', function () {
    var formdata = $(this).serialize()
    console.log(formdata);
    //编辑后修改的按钮
    $.ajax({
      url: 'http://47.111.184.55:8888/api/v1/admin/category/edit',
      type: 'post',
      data: formdata,
      success: function (data) {
        console.log(data);
        location.reload()
        
      },
      error:function(){}
    })
    return false
  })
  // 点击删除按钮
  $('#tplBox').on('click', '.delete', function () {
    var id = $(this).attr('data-id')
    if(confirm('确定要删除?')){
      $.ajax({
        url: 'http://47.111.184.55:8888/api/v1/admin/category/delete',
        type: 'post',
        data: {
          id: id
        },
        success: function (data) {
          location.reload()
        }
      })
    }
  })