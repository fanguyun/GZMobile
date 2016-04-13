/**
 * Created by lenovo on 2016/1/13.
 */
define(function(){
    var GYmiddle = {
    init:function(){
        var scope =this;
        conmon.selectMenuInt(2);
        var $middle_left = $("#middle_left");
        $middle_left.animate({"margin-top":"-"+$middle_left.height()*0.5+"px"},300);
        scope.ztyListInt();//主题域列表
        scope.topBarInt();//外圈系统分布图
        scope.downBarInt(7);//默认整园
        scope.barGxInt();//弦数据关系图
    },
    /*弦数据关系图*/
    barGxInt:function(){
        var scope = this;
        // 主题域名称
        var city_name = [ "事件主题域" , "营销主题域" , "财务主题域" , "参与人主题域" , "账务主题域", "服务主题域","资源主题域"];
        //主题域对应系统&&厂商数据
        var sysData=[
            {"valueList":[0,1,2,3,4,5,6,8,9],"textList":[0,1,2,4,5,7]},
            {"valueList":[0,2],"textList":[7]},
            {"valueList":[],"textList":[]},
            {"valueList":[],"textList":[]},
            {"valueList":[1,2,3],"textList":[7]},
            {"valueList":[],"textList":[]},
            {"valueList":[0,1,2,3,7],"textList":[3,7]}
        ];
        // 关系数据
        var population = [
            [ 0,0,0,3500,0,3500,0],
            [ 0,0,0,3500,0,3500,0],
            [ 0,0,7000,0,0,0,0],
            [ 2400,2300,0,0,0,2300,0],
            [ 0,0,0,0,7000,0,0],
            [ 1750,1750,0,1750,0,0,1750],
            [ 0,0,0,0,0,3000,4000]
        ];

        //2.转换数据，并输出转换后的数据
        var chord_layout = d3.layout.chord()
            .padding(0.03)		//节点之间的排序
            .sortSubgroups(d3.descending)	//排序
            .matrix(population);	//输入矩阵
        var groups = chord_layout.groups();
        var chords = chord_layout.chords();
        //3.SVG，弦图，颜色函数的定义
        var width  = 620;
        var height = 620;
        var innerRadius = 120;
        var outerRadius = 170;

        var svg = d3.select("#middle_bar").append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("z-index",10)
            .append("g")
            .attr("transform", "translate(" + width/2 + "," + height/2 + ")");
        //4.绘制节点（即分组，有多少个数据画多少个弧形），及绘制名称
        var outer_arc =  d3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);
        var outer_arcText =  d3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius-30);
        var g_outer = svg.append("g");
        g_outer.selectAll("path")
            .data(groups)
            .enter()
            .append("path")
            .attr("class","bar")
            .style("fill", "rgba(0, 102, 204, 0.4)")
            .attr("d",outer_arc )
            .on("click",function(d,i){
                svg.selectAll(".bar").style("fill","rgba(0, 102, 204, 0.4)");
                d3.select(this).transition().duration(500).style("fill","#ff9900");
                //外层旋转园
                scope.downBarInt(i);
                scope.middleBarInt(i);//中间厂商分布图
                fade(i);
                //最外层关系关联&&厂商关联
                var thisSelectData = sysData[i].valueList;
                var facData = sysData[i].textList;
                $(".middleList").attr("fill","rgba(54, 158, 242, 0.2)");
                $(".tallList").attr("fill","rgba(54, 158, 242, 0.5)");
                $(".middle_comlist li").hide();
                for(var si = 0; si< thisSelectData.length; si ++){
                    $(".middleList").eq(thisSelectData[si]).attr("fill","#0066cc");
                    $(".tallList").eq(thisSelectData[si]).attr("fill","#0066cc");
                }
                for(var bi = 0; bi< facData.length; bi ++){
                    $(".middle_comlist li").eq(facData[bi]).show();
                }
            })
            .append("path")
            .attr("display","none")
            .attr("d",function(d){
                return outer_arcText(d);
            })
            .attr("id",function(d,i){
                return "xian"+i;
            });

        g_outer.selectAll("text")
            .data(groups)
            .enter()
            .append("text")
            .attr("x",20)
            .attr("y",0)
            .attr("fill","rgba(255,255,255,0.8)")
            .each( function(d,i) {
                d.name = city_name[i];
            })
            .append("textPath")
            .attr("xlink:href",function(d,i){
                return "#xian"+i;
            })
            .text(function(d){
                return d.name;
            });
        //5.绘制内部弦（即所有关系图）
        var inner_chord =  d3.svg.chord()
            .radius(innerRadius);
        svg.append("g")
            .attr("class", "chord")
            .selectAll("path")
            .data(chords)
            .enter()
            .append("path")
            .attr("d", inner_chord )
            .style("fill", "rgba(255,255,255,0.2)")
            .style("opacity", 0);
        /*滑动效果*/
        function fade(i) {
            svg.selectAll(".chord path")
                .style("opacity", 0)
                .filter(function(d) {
                    var barShow=(d.source.index == i || d.target.index == i) && d.source.index != d.target.index;
                    if(barShow){//获取关联方索引
                        if(d.target.index == i){
                            $(".bar").eq(d.target.subindex).css("fill","#33cc00");
                        }else if(d.source.index == i){
                            $(".bar").eq(d.source.subindex).css("fill","#33cc00");
                        }
                    }
                    return barShow;
                })
                .transition()
                .duration(500)
                .style("opacity", 1);
        };
    },
    /*半环旋转*/
    downBarInt:function(num){
        $("#myMoveBar").remove();
        var width = 620;
        var height = 620;
        var svg = d3.select("#middle_bar")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("id","myMoveBar");
        var thisWidth = 2/7;
        var dataValue=[
            {
                "dadalist":[
                    /*0*/
                    {"type":"down","startAngle":0,"endAngle":Math.PI*(thisWidth-0.01),"color":"#ff9900","name":""},
                    {"type":"down","startAngle":Math.PI*thisWidth,"endAngle":Math.PI*(2-0.01),"color":"#0066cc","name":""}
                ]
            },
            {
                "dadalist":[
                    /*1*/
                    {"type":"down","startAngle":Math.PI*thisWidth,"endAngle":Math.PI*(2*thisWidth-0.01),"color":"#ff9900","name":""},
                    {"type":"down","startAngle":Math.PI*2*thisWidth,"endAngle":Math.PI*(2+thisWidth-0.01),"color":"#0066cc","name":""}
                ]
            },
            {
                "dadalist":[
                    /*2*/
                    {"type":"down","startAngle":Math.PI*2*thisWidth,"endAngle":Math.PI*(3*thisWidth-0.01),"color":"#ff9900","name":""},
                    {"type":"down","startAngle":Math.PI*3*thisWidth,"endAngle":Math.PI*(2+2*thisWidth-0.01),"color":"#0066cc","name":""}
                ]
            },
            {
                "dadalist":[
                    /*3*/
                    {"type":"down","startAngle":Math.PI*3*thisWidth,"endAngle":Math.PI*(4*thisWidth-0.01),"color":"#ff9900","name":""},
                    {"type":"down","startAngle":Math.PI*4*thisWidth,"endAngle":Math.PI*(2+3*thisWidth-0.01),"color":"#0066cc","name":""}
                ]
            },
            {
                "dadalist":[
                    /*4*/
                    {"type":"down","startAngle":Math.PI*4*thisWidth,"endAngle":Math.PI*(5*thisWidth-0.01),"color":"#ff9900","name":""},
                    {"type":"down","startAngle":Math.PI*5*thisWidth,"endAngle":Math.PI*(2+4*thisWidth-0.01),"color":"#0066cc","name":""}
                ]
            },
            {
                "dadalist":[
                    /*5*/
                    {"type":"down","startAngle":Math.PI*5*thisWidth,"endAngle":Math.PI*(6*thisWidth-0.01),"color":"#ff9900","name":""},
                    {"type":"down","startAngle":Math.PI*6*thisWidth,"endAngle":Math.PI*(2+5*thisWidth-0.01),"color":"#0066cc","name":""}
                ]
            },
            {
                "dadalist":[
                    /*6*/
                    {"type":"down","startAngle":Math.PI*6*thisWidth,"endAngle":Math.PI*(7*thisWidth-0.01),"color":"#ff9900","name":""},
                    {"type":"down","startAngle":Math.PI*7*thisWidth,"endAngle":Math.PI*(2+6*thisWidth-0.01),"color":"#0066cc","name":""}
                ]
            },
            {
                "dadalist":[
                    /*默认*/
                    {"type":"down","startAngle":0,"endAngle":Math.PI*2,"color":"#0066cc","name":""}
                ]
            }
        ];

        //系统
        var outerRadius =190,innerRadius = 180;	//外半径&内半径，innerRadius为0则中间没有空白
        //图形
        var arc = d3.svg.arc()	//弧生成器
            .innerRadius(innerRadius)	//设置内半径
            .outerRadius(outerRadius);	//设置外半径

        var arcs = svg.selectAll("g")
            .data(dataValue[num].dadalist)
            .enter()
            .append("g")
            .attr("transform","translate("+ (width/2) +","+ (width/2) +")");
        arcs.append("path")
            .attr("fill",function(d,i){
                return d.color;
            })
            .attr("d",function(d){
                return arc(d);
            });

    },
    /*外圈系统分布图*/
    topBarInt:function(){
        var width = 620;
        var height = 620;
        var svg = d3.select("#middle_bar")
            .append("svg")
            .attr("width", width)
            .attr("height", height);
        var thisWidth = 2/11;
        var dataValue=[
            //中间域
            {"type":"middle","startAngle":0,"endAngle":Math.PI*(thisWidth-0.01),"color":"rgba(54, 158, 242, 0.2)","name":"客服"},
            {"type":"middle","startAngle":Math.PI*thisWidth,"endAngle":Math.PI*(2*thisWidth-0.01),"color":"rgba(54, 158, 242, 0.2)","name":"BOSS"},
            {"type":"middle","startAngle":Math.PI*2*thisWidth,"endAngle":Math.PI*(3*thisWidth-0.01),"color":"rgba(54, 158, 242, 0.2)","name":"CRM"},
            {"type":"middle","startAngle":Math.PI*3*thisWidth,"endAngle":Math.PI*(4*thisWidth-0.01),"color":"rgba(54, 158, 242, 0.2)","name":"电子渠道"},
            {"type":"middle","startAngle":Math.PI*4*thisWidth,"endAngle":Math.PI*(5*thisWidth-0.01),"color":"rgba(54, 158, 242, 0.2)","name":"LTE DPI采集"},
            {"type":"middle","startAngle":Math.PI*5*thisWidth,"endAngle":Math.PI*(6*thisWidth-0.01),"color":"rgba(54, 158, 242, 0.2)","name":"信令监测(CS)"},
            {"type":"middle","startAngle":Math.PI*6*thisWidth,"endAngle":Math.PI*(7*thisWidth-0.01),"color":"rgba(54, 158, 242, 0.2)","name":"信令共享(PS)"},
            {"type":"middle","startAngle":Math.PI*7*thisWidth,"endAngle":Math.PI*(8*thisWidth-0.01),"color":"rgba(54, 158, 242, 0.2)","name":"数据共享"},
            {"type":"middle","startAngle":Math.PI*8*thisWidth,"endAngle":Math.PI*(9*thisWidth-0.01),"color":"rgba(54, 158, 242, 0.2)","name":"ERP"},
            {"type":"middle","startAngle":Math.PI*9*thisWidth,"endAngle":Math.PI*(10*thisWidth-0.01),"color":"rgba(54, 158, 242, 0.2)","name":"计划管理"},
            {"type":"middle","startAngle":Math.PI*10*thisWidth,"endAngle":Math.PI*(11*thisWidth-0.01),"color":"rgba(54, 158, 242, 0.2)","name":"合同管理"},
            //外圈
            {"type":"tall","startAngle":0,"endAngle":Math.PI*(thisWidth-0.01),"color":"rgba(54, 158, 242, 0.5)","name":""},
            {"type":"tall","startAngle":Math.PI*thisWidth,"endAngle":Math.PI*(2*thisWidth-0.01),"color":"rgba(54, 158, 242, 0.5)","name":""},
            {"type":"tall","startAngle":Math.PI*2*thisWidth,"endAngle":Math.PI*(3*thisWidth-0.01),"color":"rgba(54, 158, 242, 0.5)","name":""},
            {"type":"tall","startAngle":Math.PI*3*thisWidth,"endAngle":Math.PI*(4*thisWidth-0.01),"color":"rgba(54, 158, 242, 0.5)","name":""},
            {"type":"tall","startAngle":Math.PI*4*thisWidth,"endAngle":Math.PI*(5*thisWidth-0.01),"color":"rgba(54, 158, 242, 0.5)","name":""},
            {"type":"tall","startAngle":Math.PI*5*thisWidth,"endAngle":Math.PI*(6*thisWidth-0.01),"color":"rgba(54, 158, 242, 0.5)","name":""},
            {"type":"tall","startAngle":Math.PI*6*thisWidth,"endAngle":Math.PI*(7*thisWidth-0.01),"color":"rgba(54, 158, 242, 0.5)","name":""},
            {"type":"tall","startAngle":Math.PI*7*thisWidth,"endAngle":Math.PI*(8*thisWidth-0.01),"color":"rgba(54, 158, 242, 0.5)","name":""},
            {"type":"tall","startAngle":Math.PI*8*thisWidth,"endAngle":Math.PI*(9*thisWidth-0.01),"color":"rgba(54, 158, 242, 0.5)","name":""},
            {"type":"tall","startAngle":Math.PI*9*thisWidth,"endAngle":Math.PI*(10*thisWidth-0.01),"color":"rgba(54, 158, 242, 0.5)","name":""},
            {"type":"tall","startAngle":Math.PI*10*thisWidth,"endAngle":Math.PI*(11*thisWidth-0.01),"color":"rgba(54, 158, 242, 0.5)","name":""},
        ];
        //系统
        var outerRadius =285,innerRadius = 255;	//外半径&内半径，innerRadius为0则中间没有空白
        //图形
        var arc = d3.svg.arc()	//弧生成器
            .innerRadius(innerRadius)	//设置内半径
            .outerRadius(outerRadius);	//设置外半径
        //文字
        var arcText = d3.svg.arc()	//弧生成器
            .innerRadius(innerRadius)	//设置内半径
            .outerRadius(outerRadius-20);	//设置外半径
        //最外圈
        var outerRadius1 =297,innerRadius1 = 288;	//外半径&内半径，innerRadius为0则中间没有空白
        //图形
        var arc1 = d3.svg.arc()	//弧生成器
            .innerRadius(innerRadius1)	//设置内半径
            .outerRadius(outerRadius1);	//设置外半径

        var arcs = svg.selectAll("g")
            .data(dataValue)
            .enter()
            .append("g")
            .attr("transform","translate("+ (width/2) +","+ (width/2) +")");
        arcs.append("path")
            .transition().ease('circle').duration(300)
            .attr("fill",function(d,i){
                return d.color;
            })
            .attr("class",function(d){
                switch (d.type){
                    case "middle":
                        return "middleList";
                        break;
                    case "tall":
                        return "tallList";
                        break;
                }
            })
            .attr("d",function(d){
                switch (d.type){
                    case "middle":
                        return arc(d);
                        break;
                    case "tall":
                        return arc1(d);
                        break;
                }

            });
        arcs.append("path")
            .attr("display","none")
            .attr("d",function(d){
                switch (d.type){
                    case "middle":
                        return arcText(d);
                        break;
                }

            })
            .attr("id",function(d,i){
                switch (d.type){
                    case "middle":
                        return "middle"+i;
                        break;
                }

            });
        arcs.append("text")
            .attr("x",function(d){
                switch (d.type){
                    case "middle":
                        return 25;
                        break;
                }
            })
            .attr("y",0)
            .attr("fill","#fff")
            .append("textPath")
            .attr("xlink:href",function(d,i){
                switch (d.type){
                    case "middle":
                        return "#middle"+i;
                        break;
                }

            })
            .text(function(d){
                return d.name;
            });

    },
    /*中间厂商分布图*/
    middleBarInt:function(i){
        $("#guanlian").remove();
        var width = 620;
        var height = 620;
        var svg = d3.select("#middle_bar")
            .append("svg")
            .attr("id","guanlian")
            .attr("width", width)
            .attr("height", height);
        var thisWidth = 2/11;
        var dataValue=[
            {
                "dataList":[
                    //事件主题域关联
                    {"startAngle":0,"endAngle":Math.PI*(thisWidth-0.01),"color":"rgba(61, 242, 233, 0.5)","name":"客服","company":"亚信"},
                    {"startAngle":Math.PI*thisWidth,"endAngle":Math.PI*(2*thisWidth-0.01),"color":"rgba(61, 242, 233, 0.5)","name":"BOSS","company":"亚信"},
                    {"startAngle":Math.PI*2*thisWidth,"endAngle":Math.PI*(3*thisWidth-0.01),"color":"rgba(61, 242, 233, 0.5)","name":"CRM","company":"亚信"},
                    {"startAngle":Math.PI*3*thisWidth,"endAngle":Math.PI*(4*thisWidth-0.01),"color":"rgba(61, 242, 233, 0.5)","name":"电子渠道","company":"亚信"},
                    {"startAngle":Math.PI*4*thisWidth,"endAngle":Math.PI*(5*thisWidth-0.01),"color":"#3b9cf4","name":"LTE DPI采集","company":"华为公司"},
                    {"startAngle":Math.PI*5*thisWidth,"endAngle":Math.PI*(6*thisWidth-0.01),"color":"rgba(59, 156, 244, 0.7)","name":"信令监测(CS)","company":"中兴公司"},
                    {"startAngle":Math.PI*6*thisWidth,"endAngle":Math.PI*(7*thisWidth-0.01),"color":"rgba(112, 186, 242, 0.8)","name":"信令共享(PS)","company":"北京协成致远"},
                    {"startAngle":Math.PI*8*thisWidth,"endAngle":Math.PI*(9*thisWidth-0.01),"color":"#3162db","name":"ERP","company":"电讯盈科"},
                    {"startAngle":Math.PI*9*thisWidth,"endAngle":Math.PI*(10*thisWidth-0.01),"color":"rgba(49, 98, 219, 0.7)","name":"计划管理","company":"亿阳"}
                ]
            },
            {
                "dataList":[
                    //营销主题域关联
                    {"startAngle":0,"endAngle":Math.PI*(thisWidth-0.01),"color":"rgba(61, 242, 233, 0.5)","name":"客服","company":"亚信"},
                    {"startAngle":Math.PI*2*thisWidth,"endAngle":Math.PI*(3*thisWidth-0.01),"color":"rgba(61, 242, 233, 0.5)","name":"CRM","company":"亚信"}
                ]
            },
            {
                "dataList":[
                    //财务主题域关联
                ]
            },
            {
                "dataList":[
                    //参与人主题域关联
                ]
            },
            {
                "dataList":[
                    //账务主题域关联
                    {"startAngle":Math.PI*thisWidth,"endAngle":Math.PI*(2*thisWidth-0.01),"color":"rgba(61, 242, 233, 0.5)","name":"BOSS","company":"亚信"},
                    {"startAngle":Math.PI*2*thisWidth,"endAngle":Math.PI*(3*thisWidth-0.01),"color":"rgba(61, 242, 233, 0.5)","name":"CRM","company":"亚信"},
                    {"startAngle":Math.PI*3*thisWidth,"endAngle":Math.PI*(4*thisWidth-0.01),"color":"rgba(61, 242, 233, 0.5)","name":"电子渠道","company":"亚信"}
                ]
            },
            {
                "dataList":[
                    //服务主题域关联
                ]
            },
            {
                "dataList":[
                    //资源主题域关联
                    {"startAngle":0,"endAngle":Math.PI*(thisWidth-0.01),"color":"rgba(61, 242, 233, 0.5)","name":"客服","company":"亚信"},
                    {"startAngle":Math.PI*thisWidth,"endAngle":Math.PI*(2*thisWidth-0.01),"color":"rgba(61, 242, 233, 0.5)","name":"BOSS","company":"亚信"},
                    {"startAngle":Math.PI*2*thisWidth,"endAngle":Math.PI*(3*thisWidth-0.01),"color":"rgba(61, 242, 233, 0.5)","name":"CRM","company":"亚信"},
                    {"startAngle":Math.PI*3*thisWidth,"endAngle":Math.PI*(4*thisWidth-0.01),"color":"rgba(61, 242, 233, 0.5)","name":"电子渠道","company":"亚信"},
                    {"startAngle":Math.PI*7*thisWidth,"endAngle":Math.PI*(8*thisWidth-0.01),"color":"rgba(112, 186, 242, 0.5)","name":"数据共享","company":"爱立信"}
                ]
            }

        ];
        //系统
        var outerRadius =255,innerRadius = 190;	//外半径&内半径，innerRadius为0则中间没有空白
        //图形
        var arc = d3.svg.arc()	//弧生成器
            .innerRadius(innerRadius)	//设置内半径
            .outerRadius(outerRadius);	//设置外半径

        var arcs = svg.selectAll("g")
            .data(dataValue[i].dataList)
            .enter()
            .append("g")
            .attr("transform","translate("+ (width/2) +","+ (width/2) +")");
        arcs.append("path")
            .transition().ease('circle').duration(300)
            .attr("fill",function(d,i){
                return d.color;
            })
            .attr("d",function(d){
                return arc(d);
            });
    },
    /*主题域列表*/
    ztyListInt:function(){
        var ztyData=[
            {"name":"事件","number":"165","qushi":[0.5,0.3,0.5,0.6,0.4,0.3,0.5],"type":"up"},
            {"name":"服务","number":"89","qushi":[0.5,0.3,0.5,0.6,0.4,0.3,0.5],"type":"down"},
            {"name":"参与人","number":"75","qushi":[0.5,0.3,0.5,0.6,0.4,0.3,0.5],"type":"up"},
            {"name":"账务","number":"66","qushi":[0.5,0.3,0.5,0.6,0.4,0.3,0.5],"type":"down"},
            {"name":"资源","number":"41","qushi":[0.5,0.3,0.5,0.6,0.4,0.3,0.5],"type":"up"},
            {"name":"财务","number":"30","qushi":[0.5,0.3,0.5,0.6,0.4,0.3,0.5],"type":"down"},
            {"name":"营销","number":"9","qushi":[0.5,0.3,0.5,0.6,0.4,0.3,0.5],"type":"up"}

        ];
        var $ztyListCont = $("#ztyListCont");
        var diagonal = d3.svg.diagonal().projection(function(d) { return [d.y, d.x]; });//声明对角线
        var ztyHtml="";
        for(var i = 0;i < ztyData.length; i++){//表格列表
            var thisName="";
            if(ztyData[i].type == "up"){
                thisName = "go";
            }else{
                thisName = "come";
            }
            ztyHtml += "<ul class='mdbody_list "+thisName+"'><li class='headqs1'>"+ztyData[i].name+"</li><li class='headqs2'>"+ztyData[i].number+"</li><li class='headqs3' id='ztySvg"+i+"'></li><div class='clear'></div></ul>";
        }
        $ztyListCont.html(ztyHtml);
        for(var si = 0;si < ztyData.length; si++){//趋势图
            var thisColor="";
            if(ztyData[si].type == "up"){
                thisColor = "#2de8a0";
            }else{
                thisColor = "#3b9cf4";
            }
            var tableData=ztyData[si].qushi;
            //表格趋势图
            var svgTable = d3.select("#ztySvg"+si).append("svg")
                .attr("width",180)
                .attr("height",40)
                .append("g").attr("transform", "translate(40,0)");
            for(var ti=0;ti<tableData.length-1;ti++){
                //添加路劲
                svgTable.append("path").transition()
                    .duration(500)
                    .ease("circle").attr("d",diagonal({
                    source:{x:40-(tableData[ti]*40),y:17*ti-28},
                    target:{x:40-(tableData[ti+1]*40),y:17*(ti+1)-28}
                })).attr("fill","none").attr("stroke",thisColor).attr("stroke-width",2);

            }
        }
    }
    }
    return GYmiddle;
})