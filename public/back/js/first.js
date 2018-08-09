$(function(){

  var currentPage = 1;
  var pageSize = 5;


  render();
  function render(){
      $.ajax({
          type:"get",
          url:"/category/queryTopCategoryPaging",
          data:{
            page: currentPage,
            pageSize : pageSize
          },
          dataType:"json",
          success:function(info){
            console.log(info);
            var str = template("temp",info);
            $('tbody').html(str);
            // 分页功能
            $("#paginator").bootstrapPaginator({
              bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
              currentPage:currentPage,//当前页
              totalPages:Math.ceil(info.total/info.size),//总页数
              onPageClicked:function(a,b,c,page){
                currentPage = page;
                render();
                //为按钮绑定点击事件 page:当前点击的按钮值
              }
            })  
          }
        })
  }

  $('#addBtn').click(function () { 
    $('#addModal').modal('show');
  });
 
  $('#form').bootstrapValidator({
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    // 指定校验字段
    fields:{
      categoryName:{
        validators:{
          notEmpty:{
            message : "当前输入不能为空"
          }
        }
      }
    }
  })

  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $('#addModal').modal('hide');
    $.ajax({
      type:"post",
      url:"/category/addTopCategory",
      data:$('#form').serialize(),
      dataType:"json",
      success:function(info){
        if(info.success){
          currentPage = 1;
          render();

      $('#form').data("bootstrapValidator").resetForm(true);
        }
      }
    })
});

})