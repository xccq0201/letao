$(function(){
   /*
   * 1. 进行表单校验配置
   *    校验要求:
   *        (1) 用户名不能为空, 长度为2-6位
   *        (2) 密码不能为空, 长度为6-12位
   * */

  // 检验插件初始化
  $('#form').bootstrapValidator({

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',     // 校验成功
      invalid: 'glyphicon glyphicon-remove',  // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },


    // 配置字段 (不要忘记给input加name)
    fields: {
      username: {
        // 校验规则
        validators: {
          // 非空校验
          notEmpty: {
            // 配置提示信息
            message: "用户名不能为空"
          },
          // 长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: "用户名长度必须是2-6位"
          },
          callback :{
            message :"用户名不存在"
          }
        }
      },
      password: {
        validators: {
          // 非空校验
          notEmpty: {
            message: "密码不能为空"
          },
          // 长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: "密码长度必须是6-12位"
          },
          callback: {
            message:"密码错误"
          }
        }
      }
    }
  });

  //实现登录功能
  //submit 默认会进行表单提交,插件会在表单提交时进行校验
  $('#form').on('success.form.bv',function(e){
    e.preventDefault();
  
  // 通过ajax进行表单提交
  $.ajax({
    type:"post",
    url:"/employee/employeeLogin",
    data:$('#form').serialize(),
    dataType:'json',
    success:function(info){
      console.log(info);
      if(info.success) {
        location.href = "http://localhost:3000/back/index.html";
      }
      if(info.error === 1000) {
        $("#form").data('bootstrapValidator').updateStatus("username", "INVALID", "callback");
      }
      if(info.error === 1001) {
        $("#form").data('bootstrapValidator').updateStatus("password", "INVALID", "callback");
      }
    }
  })
  });

  //解决reset按钮bug
  $("[type='reset']").click(function(){
    $("#form").data('bootstrapValidator').resetForm();
  })

  //进度条
  $(document).ajaxStart(function(){
    NProgress.start();
    })
    $(document).ajaxStop(function(){
      setTimeout(function(){
        NProgress.done();
      },1000);
    })

    //侧边栏隐藏切换
    $('.icon-menu').click(function() {
      // alert();
      $('.lt-aside').toggleClass('hide-menu');
      $('.lt-main').toggleClass('hide-menu');
      $('.lt-main .head-menu').toggleClass('hide-menu');
    })

    //导航栏点击事件
    $('.category').click(function(){
      $('.category').next().slideToggle();
    })

    //模态框
    $('.icon-logout').click(function(){
      $('#myModal').modal('show');
    })
});

