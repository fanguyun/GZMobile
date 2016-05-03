/**
 * Created by lenovo on 2016/1/13.
 */
define(function(){
    var GYmain={
        init:function(){
            var scope =this;
            conmon.selectMenuInt(0);
            scope.mainBarInt();
            var $mainRight = $("#main_right");
            $mainRight.animate({"margin-top":"-"+$mainRight.height()*0.5+"px"},300);
        },
        //整体概览圆形图
        mainBarInt:function(){
            var width = 620;
            var height = 620;
            var svg = d3.select("#mainBarCont")
                .append("svg")
                .attr("width", width)
                .attr("height", height);
            var dataValue=[
                {"type":"bom","thisX":55,"startAngle":Math.PI*0.025,"endAngle":Math.PI*0.625,"color":"#33cc00","name":"网络服务","thisHeight":-33},
                {"type":"bom","thisX":80,"startAngle":Math.PI*1.325,"endAngle":Math.PI*0.675,"color":"#0066cc","name":"管理支撑","thisHeight":-21},
                {"type":"bom","thisX":55,"startAngle":Math.PI*1.375,"endAngle":Math.PI*1.975,"color":"#ff9900","name":"业务运营","thisHeight":-33},
                //中间域
                {"type":"middle","thisX":38,"startAngle":Math.PI*0.03,"endAngle":Math.PI*0.29,"color":"rgba(27, 108, 226, 0.4)","name":"事件主题域","thisHeight":-25},
                {"type":"middle","thisX":38,"startAngle":Math.PI*0.31,"endAngle":Math.PI*0.57,"color":"rgba(27, 108, 226, 0.4)","name":"营销主题域","thisHeight":-25},
                {"type":"middle","thisX":38,"startAngle":Math.PI*0.85,"endAngle":Math.PI*0.59,"color":"rgba(27, 108, 226, 0.4)","name":"财务主题域","thisHeight":-15},
                {"type":"middle","thisX":38,"startAngle":Math.PI*1.13,"endAngle":Math.PI*0.87,"color":"rgba(27, 108, 226, 0.4)","name":"资源主题域","thisHeight":-15},
                {"type":"middle","thisX":30,"startAngle":Math.PI*1.41,"endAngle":Math.PI*1.15,"color":"rgba(27, 108, 226, 0.4)","name":"参与人主题域","thisHeight":-15},
                {"type":"middle","thisX":38,"startAngle":Math.PI*1.43,"endAngle":Math.PI*1.69,"color":"rgba(27, 108, 226, 0.4)","name":"服务主题域","thisHeight":-25},
                {"type":"middle","thisX":23,"startAngle":Math.PI*1.71,"endAngle":Math.PI*1.97,"color":"rgba(27, 108, 226, 0.4)","name":"企业管理主题域","thisHeight":-25},
                //高价值圈
                {"type":"tall","thisX":18,"startAngle":Math.PI*0.12,"endAngle":Math.PI*0.23,"color":"rgba(27, 108, 226, 1)","name":"对外产品","thisHeight":-30},
                {"type":"tall","thisX":28,"startAngle":Math.PI*0.24,"endAngle":Math.PI*0.34,"color":"rgba(27, 108, 226, 0.6)","name":"电商","thisHeight":-30},
                {"type":"tall","thisX":28,"startAngle":Math.PI*0.35,"endAngle":Math.PI*0.45,"color":"rgba(27, 108, 226, 0.6)","name":"房产","thisHeight":-30},
                {"type":"tall","thisX":28,"startAngle":Math.PI*0.56,"endAngle":Math.PI*0.46,"color":"rgba(27, 108, 226, 0.6)","name":"旅游","thisHeight":-20},
                {"type":"tall","thisX":28,"startAngle":Math.PI*0.67,"endAngle":Math.PI*0.57,"color":"rgba(27, 108, 226, 0.6)","name":"保险","thisHeight":-20},
                {"type":"tall","thisX":28,"startAngle":Math.PI*0.78,"endAngle":Math.PI*0.68,"color":"rgba(27, 108, 226, 0.6)","name":"汽车","thisHeight":-20},
                {"type":"tall","thisX":28,"startAngle":Math.PI*0.89,"endAngle":Math.PI*0.79,"color":"rgba(27, 108, 226, 0.6)","name":"金融","thisHeight":-20},
                {"type":"tall","thisX":0,"startAngle":Math.PI*0.90,"endAngle":Math.PI*0.91,"color":"rgba(27, 108, 226, 1)","name":""},
                {"type":"tall","thisX":0,"startAngle":Math.PI*1.14,"endAngle":Math.PI*1.15,"color":"rgba(27, 108, 226, 1)","name":""},
                {"type":"tall","thisX":80,"startAngle":Math.PI*1.44,"endAngle":Math.PI*1.16,"color":"rgba(27, 108, 226, 0.6)","name":"生产运营","thisHeight":-20},
                {"type":"tall","thisX":85,"startAngle":Math.PI*1.45,"endAngle":Math.PI*1.75,"color":"rgba(27, 108, 226, 0.6)","name":"管理决策","thisHeight":-30},
                {"type":"tall","thisX":18,"startAngle":Math.PI*1.76,"endAngle":Math.PI*1.88,"color":"rgba(27, 108, 226, 1)","name":"对内产品","thisHeight":-30},
                //最外层圈
                {"type":"top","startAngle":Math.PI*0.12,"endAngle":Math.PI*0.91,"color":"rgba(27, 108, 226, 1)","name":""},
                {"type":"top","startAngle":Math.PI*1.14,"endAngle":Math.PI*1.88,"color":"rgba(27, 108, 226, 1)","name":""}
            ];
            //BOM低价值
            var outerRadius =120,innerRadius = 70;  //外半径&内半径,innerRadius为0则中间没有空白
            //图形
            var arc = d3.svg.arc()  //弧生成器
                .innerRadius(innerRadius)   //设置内半径
                .outerRadius(outerRadius);  //设置外半径
            //文字
            var arcText = d3.svg.arc()  //弧生成器
                .innerRadius(innerRadius)   //设置内半径
                .outerRadius(function (d){
                    return outerRadius+d.thisHeight;
                });   //设置外半径
            //中价值
            var outerRadius1 =205,innerRadius1 = 165;   //外半径&内半径,innerRadius为0则中间没有空白
            //图形
            var arc1 = d3.svg.arc() //弧生成器
                .innerRadius(innerRadius1)  //设置内半径
                .outerRadius(outerRadius1); //设置外半径
            //文字
            var arcText1 = d3.svg.arc() //弧生成器
                .innerRadius(innerRadius1)  //设置内半径
                .outerRadius(function (d){
                    return outerRadius1+d.thisHeight;
                });  //设置外半径
            //高价值
            var outerRadius2 =290,innerRadius2 = 240;   //外半径&内半径,innerRadius为0则中间没有空白
            //图形
            var arc2 = d3.svg.arc() //弧生成器
                .innerRadius(innerRadius2)  //设置内半径
                .outerRadius(outerRadius2); //设置外半径
            //文字
            var arcText2 = d3.svg.arc() //弧生成器
                .innerRadius(innerRadius2)  //设置内半径
                .outerRadius(function (d){
                    return outerRadius2+d.thisHeight;
                });  //设置外半径
            //最外层
            var outerRadius3 =298,innerRadius3 = 289;   //外半径&内半径,innerRadius为0则中间没有空白
            //图形
            var arc3 = d3.svg.arc() //弧生成器
                .innerRadius(innerRadius3)  //设置内半径
                .outerRadius(outerRadius3); //设置外半径

            var arcs = svg.selectAll("g")
                .data(dataValue)
                .enter()
                .append("g")
                .attr("transform","translate("+ (width/2) +","+ (width/2) +")");
            arcs.append("path")
                .transition().ease('circle').duration(500)
                .attr("fill",function(d,i){
                    return d.color;
                })
                .attr("d",function(d){
                    switch (d.type){
                        case "bom":
                            return arc(d);
                            break;
                        case "middle":
                            return arc1(d);
                            break;
                        case "tall":
                            return arc2(d);
                            break;
                        case "top":
                            return arc3(d);
                            break;
                    }

                });
            arcs.on("click",function(d,i){
                switch (d.type){
                    case "bom":
                        window.location.href = "#droop";
                        break;
                    case "middle":
                        window.location.href = "#middle";
                        break;
                    case "tall":
                        window.location.href = "#tall";
                        break;
                }
            });
            arcs.append("path")
                .attr("display","none")
                .attr("d",function(d){
                    switch (d.type){
                        case "bom":
                            return arcText(d);
                            break;
                        case "middle":
                            return arcText1(d);
                            break;
                        case "tall":
                            return arcText2(d);
                            break;
                    }

                })
                .attr("id",function(d,i){
                    switch (d.type){
                        case "bom":
                            return "droop"+i;
                            break;
                        case "middle":
                            return "middle"+i;
                            break;
                        case "tall":
                            return "tall"+i;
                            break;
                    }

                });
            arcs.append("text")
                .attr("x",function(d){
                    switch (d.type){
                        case "bom":
                            return d.thisX;
                            break;
                        case "middle":
                            return d.thisX;
                            break;
                        case "tall":
                            return d.thisX;
                            break;
                    }
                })
                .attr("y",0)
                .attr("fill","#fff")
                .append("textPath")
                .attr("xlink:href",function(d,i){
                    switch (d.type){
                        case "bom":
                            return "#droop"+i;
                            break;
                        case "middle":
                            return "#middle"+i;
                            break;
                        case "tall":
                            return "#tall"+i;
                            break;
                    }

                })
                .text(function(d){
                    return d.name;
                });
        }
    }
    return GYmain;
});

