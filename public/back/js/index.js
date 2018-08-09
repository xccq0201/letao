$(function(){
  var myChart1 = echarts.init(document.getElementById('main-c1'));

    // 指定图表的配置项和数据
    var option1 = {
        title: {
          //大标题
            text: '2017年注册人数'
        },
        //提示框组件
        tooltip: {},
        //图例
        legend: {
            data:['人数']
        },
        //x轴刻度
        xAxis: {
            data: ["1月","2月","3月","4月","5月","6月"]
        },
        //y轴刻度,y轴刻度应该根据数据动态生成
        yAxis: {},
        series: [{
            name: '人数',
            //line 折线图  bar 柱状图 pie 饼状图
            type: 'bar',
            data: [1000,1500,1800,1200,1000,500]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(option1);

  var myChart2 = echarts.init(document.getElementById('main-c2'));

  // 指定图表的配置项和数据
  var option2 = {
      title: {
          text: '热门销售品牌',
          subtext:"2017年6月",
          x:"center"
      },
      tooltip: {
        trigger:"item",
        formatter:"{a}<br>{b}:{c}({d}%)"
      },
      legend: {
          orient:"vertical",
          left:"left",
          data:["耐克","阿迪","新百伦","李宁","阿迪王"]
      },

      series: [{
          name: '销量',
          type: 'pie',
          //饼状图的大小,配置直径
          radius:"55%",
          //配置圆心的位置
          center:["50%","60%"],
          data: [
            {value:335,name:"耐克"},
            {value:310,name:"阿迪"},
            {value:224,name:"新百伦"},
            {value:135,name:"李宁"},
            {value:154,name:"阿迪王"}
          ]

      }]
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart2.setOption(option2);
        
})