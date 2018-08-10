
$(function(){

  var currentPage =1 ;
  var pageSize = 5;
  var picArr = [];

  //页面渲染,ajax请求
  render();
  function render(){
    $.ajax({
      type:"get",
      url:"/product/queryProductDetailList",
      data:{
        page : currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function(info){
        // console.log(info);
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

  // 点击添加按钮,显示模态框
  $('#addBtn').click(function(){
    $('#addModal').modal('show');
    $.ajax({
      type:'get',
      url:"/category/querySecondCategoryPaging",
      data:{
        page : 1,
        pageSize:100
      },
      dataType:'json',
      success:function(info){
        var str = template("tempLi",info);
        $('.dropdown-menu').html(str);
      }
    })
  })

  //给下拉菜单的a注册点击事件,通过事件委托注册
  $('.dropdown-menu').on('click','a',function(){
    var txt = $(this).text();
    $('#second-cate').text(txt);
    var id = $(this).data('id');
    $('[name="brandId"]').val(id);
//手动校验
$("#form").data('bootstrapValidator').updateStatus("brandId","VALID");
    
    
  })


  //文件上传初始化
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      //将返回的信息存储到数组中
      picArr.unshift(data.result);
      var picUrl = data.result.picAddr;
      $('#imgBox').prepend('<img src="'+ picUrl +'" width="100">');

      if(picArr.length >3) {
        //将最后一个多余的删除,并且将img标签删除
        picArr.pop();
        $('#imgBox img:last-of-type').remove();
      }
      if(picArr.length===3){

        //手动校验图片上传  
        $("#form").data('bootstrapValidator').updateStatus("picStatus","VALID");
      }
      
    }
});
  //


  //表单校验配置
  //使用表单校验插件
$('#form').bootstrapValidator({
  //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
  excluded: [],

  //2. 指定校验时的图标显示，默认是bootstrap风格
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },

  //3. 指定校验字段
  fields: {
    //校验brandId，对应name表单的name属性
    brandId: {
      validators: {
        //不能为空
        notEmpty: {
          message: '请选择二级分类'
        }
      }
    },
    //商品名称
    proName: {
      validators: {
        //不能为空
        notEmpty: {
          message: '商品名称不能为空'
        }
      }
    },
    //商品描述
    proDesc: {
      validators: {
        //不能为空
        notEmpty: {
          message: '商品描述不能为空'
        },
      }
    },

      //商品库存
      num: {
        validators: {
          //不能为空
          notEmpty: {
            message: '商品描述不能为空'
          },
          //正则校验
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '不能以非0 数字开头'
          }
        }
      },
      //商品尺寸
      size: {
        validators: {
          //不能为空
          notEmpty: {
            message: '商品尺码不能为空'
          },
          //正则校验
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '请以xx-xx格式正确输入'
          }
        }
      },
      //商品原价
      oldPrice: {
        validators: {
          //不能为空
          notEmpty: {
            message: '商品原价不能为空'
          },
        }
      },
        //商品现价
        price: {
          validators: {
            //不能为空
            notEmpty: {
              message: '商品现价不能为空'
            },
          }
        },
        //图片校验
        picStatus: {
          validators: {
            notEmpty: {
              message: "请上传3张图片"
            }
          }
        }
    
  }

});


 // 正则标识符,以非0 数字开头  /^[1-9]\d*$/
 // ^ 以...开头
 // $ 以...结尾
 // [1-9] 可以出现1-9
 // \d 数字,0-9
 // * 出现0次会多次
 // ? 0次或1次
 // + 出现1次或多次
 // {n} 出现n次
 // {n,m} 出现n-m次 

 $("#form").on('success.form.bv', function (e) {
  e.preventDefault();
  //使用ajax提交逻辑
  var argument = $('#form').serialize();
  console.log(argument);
  argument += "&picName1=" + picArr[0].picName  + "&picAddr1=" + picArr[0].picAddr ;
  argument += "&picName2=" + picArr[1].picName  + "&picAddr2=" + picArr[1].picAddr ;
  argument += "&picName3=" + picArr[2].picName  + "&picAddr3=" + picArr[2].picAddr ;
  $.ajax({
    type:"post",
    url:"/product/addProduct",
    data: argument,
    dataType:"json",
    success:function(info){
      console.log(info);
      if(info.success) {
        currentPage =1;
        render();
        $('#addModal').modal('hide');
        $("#form").data('bootstrapValidator').resetForm(true);
        // 手动重置上面的文本,
        $('#second-cate').text("请输入二级分类");
        // 以及图片重置(将所有图片移除)
        $('#imgBox img').remove();
        picArr = [];
      }
    }
  })
  });



})