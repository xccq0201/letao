

$(function(){
  

  var currentPage = 1;
  var pageSize = 5;

  render();
  function render(){
    $.ajax({
      type: "get",
      url:"/category/querySecondCategoryPaging",
      data:{
        page : currentPage,
        pageSize : pageSize
      },
      dataType : "json",
      success : function(info){

        var str = template("temp",info);
        $('tbody').html(str);

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


  //add按钮
  $('#addBtn').click(function(){
    $('#addModal').modal('show');

    $.ajax({
      type:"get",
          url:"/category/queryTopCategoryPaging",
          data:{
            page: 1,
            pageSize : 100
          },
          dataType:"json",
          success:function(info){
            console.log(info);
            var str = template("tempLi",info);
            $('.dropdown-menu').html(str);
          }
    })
  })


  // dropdown-menu选项的委托事件
  $('.dropdown-menu').on('click','li',function(){
    var txt =  $(this).text();
    var id = $(this).children().data('id');
    $('#first-cate').text(txt);
    $('[name="categoryId"]').val(id);
    // 手动添加验证表单
    $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
  })

  //图片上传
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      console.log(data);
      var imgUrl = data.result.picAddr;
      console.log(imgUrl);
      $('#imgBox img').attr('src',data.result.picAddr);
      $('[name="brandLogo"]').val(data.result.picAddr);

      // 手动重置隐藏域的校验状态
      $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID");
    }
});

  // 5. 实现表单校验
  $("#form").bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    //   我们需要对隐藏域进行校验, 所以不需要将隐藏域 排除到 校验范围外
    excluded: [],

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',     // 校验成功
      invalid: 'glyphicon glyphicon-remove',  // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    // 配置字段
    fields: {
      // categoryId 分类id
      // brandName 二级分类名称
      // brandLogo 图片地址
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级分类"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请选择图片"
          }
        }
      }
    }
  });


$("#form").on('success.form.bv', function (e) {
  e.preventDefault();
  //使用ajax提交逻辑
  $.ajax({
    type:"post",
    url:"/category/addSecondCategory",
    data:$('#form').serialize(),
    success:function(info){
      console.log(info);
      currentPage = 1;
      render();
      if(info.success) {
        //关闭模态框
        $('#addModal').modal('hide');

      }
      
      $('#form').data("bootstrapValidator").resetForm(true);
      // 手动清除表单的值
      $('#first-cate').text("请选择一级分类");
      $('#imgBox img').attr("src", "images/default.png");
    }
  
  })
});



})