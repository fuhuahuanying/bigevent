//  用url 把实现预览图片
$('#exampleInputFile').on('change', function () {
    var files = this.files[0]
    var imgUrl = URL.createObjectURL(files)
    $('#img').attr('src', imgUrl)
    $('#hidnipt').val(imgUrl)
})
// 获取下拉列表
$.ajax({
    type:'get',
    url:'http://47.111.184.55:8888/api/v1/admin/category/list',
    success:function(data){
        console.log(data);
        
      var  html=template('selec',{data:data.data})
      $('#article_category').html(html)
      
    }
})
//获取时间
 var timer= moment().format('YYYY-MM-DD')
 $('#dateinput').val(timer)

 //点击发布提交表单
 $('#submit-btn').on('click',function(e){
     console.log($('form')[0]);
     e.preventDefault()
     var datas=new FormData($('form')[0])
    //  编辑器的内容追加到表单信息里
    datas.append('content',tinyMCE.activeEditor.getContent())
    //因为点击了发布框 所以把发布的状态也要添加进去
    datas.append('state','已发布')
    // 发送ajax请求
    
    $.ajax({
        type:'post',
        url:'http://47.111.184.55:8888/api/v1/admin/article/publish',
        // 阻止改变参数类型
        contentType:false,
        processData:false,
        data:datas,
        success:function(data){
            alert('发布成功')
            location.href="article_list.html"
        }
    })
 })