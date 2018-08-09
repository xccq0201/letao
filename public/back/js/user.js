$(function(){

  var currentPage = 1;
  var pageSize = 5;

  var currentId ;
  var isDelete ;

  function render(){
    $.ajax({
    type:"get",
    url:"/user/queryUser",
    dataType:"json",
    data :{
      page :currentPage||1,
      pageSize:pageSize||5
    },
    success:function(info){
      console.log(info);
      var str = template("temp",info);
      $('tbody').html(str);
      $("#paginator").bootstrapPaginator({
        bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
        currentPage:currentPage,//当前页
        totalPages:Math.ceil(info.total/info.size),//总页数
        //当页码被点击时的回调函数
        onPageClicked:function(a,b,c,page) {
          //通过page获取单机的页码
          currentPage = page;
          render();
        }
      })
    }
  })
  } 
  render();

  //操作按钮的点击事件
  $('tbody').on('click','.btn',function(){
    $('#updateModal').modal('show');
    currentId = $(this).parent().data('id');
    isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
  })

  $('#updateModal .btn-primary').click(function(){
    console.log(currentId);
    console.log(isDelete);

    $('#updateModal').modal('hide');
    $.ajax({
      type:"post",
      url:"/user/updateUser",
      data:{
        id : currentId,
        isDelete:isDelete
      },
      dataType:'json',
      success:function(info){
        if(info.success) {
          render();
        }
      }
    })
    
  })



})