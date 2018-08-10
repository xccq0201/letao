$(function(){
 
  if(location.href.indexOf("login.html") === -1) {
    $.ajax({
      type:"get",
      url:"/employee/checkRootLogin",
      dataType:"json",
      success:function(info){
        // console.log(info);
        if(info.success) {
          // console.log("已登录");
        }

        if(info.error === 400) {
          location.href = "http://localhost:3000/back/index.html"; 
        }
      }
    })
  }



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

    $(".layoutBtn").click(function(){
      $.ajax({
        type:"get",
        url:"/employee/employeeLogout",
        dataType:"json",
        success:function(info){
          if(info.success) {
            location.href = "login.html";
          }
        }
      })
    })


    
});

