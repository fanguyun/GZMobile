/**
 * Created by lenovo on 2016/1/13.
 */
define(function(){
    var GYdroop={
        init:function(){
            var scope = this;
            conmon.selectMenuInt(1);
            this.rightRectInit();
            this.tabSelectInit();
            this.droopCenterInit();
            this.droopRightTableInt(0);
            var $smallNum = $("#smallNum");
            var $bigNum = $("#bigNum");
            $smallNum.html(conmon.strSplitInt($smallNum.html()));
            var nowNumber;
            setInterval(function(){
                var thisNum = parseInt($smallNum.html().replace(/,/g,""));
                nowNumber = thisNum + parseInt(Math.random()*50);
                $smallNum.html(conmon.strSplitInt(nowNumber.toString()));
            },2000);
            setInterval(function(){
                var thisNum = 16+(32*parseInt($bigNum.html()));
                $bigNum.html(parseInt(Math.random()*40));
            },60000);
        },
        /*右侧柱状图*/
        rightRectInit:function(){
            var width = 200;    //画布的宽度
            var height = 200;   //画布的高度

            var svg = d3.select("#droop_line")              //选择文档中的body元素
                .append("svg")              //添加一个svg元素
                .attr("width", width)       //设定宽度
                .attr("height", height);    //设定高度

            var dataset = [
                {"height":180,"value":"57.3%","color":"#33cc00","borderColor":"#67EA2A"},
                {"height":107,"value":"34.3%","color":"#ff9900","borderColor":"#ddae19"},
                {"height":27,"value":"8.4%","color":"#0066cc","borderColor":"#2eefdc"}
            ];

            var rectStep = 70;  //每个矩形所占的像素高度(包括空白)
            var rectWidth =55;  //每个矩形所占的像素高度(不包括空白)
            //矩形
            svg.selectAll("rect")
                .data(dataset)
                .enter()
                .append("rect")
                .attr("x",function(d,i){
                    return i * rectStep;
                })
                .attr("y",function(d,i){
                    return height- d.height;
                })
                .attr("width",rectWidth)
                .attr("height",0)
                .transition()
                .duration(2000)
                .ease("bounce")
                .attr("height",function(d){
                    return d.height;
                })
                .attr("fill",function(d){
                    return d.color;
                })
                .attr("opacity",0.8)
                .attr("class",function(d,i){
                    return "hover lineColor"+i;
                })
                /*.attr("stroke",function(d){
                    return d.borderColor;
                }).attr("stroke-width",1);*/
            //文字
            svg.selectAll("text")
                .data(dataset)
                .enter()
                .append("text")
                .attr("fill","#fff")
                .attr("x",function(d,i){
                    return i * rectStep;
                })
                .attr("y",function(d,i){
                    return height- d.height;
                })
                .attr("dx","8px")
                .attr("dy","1.3em")
                .attr("class","hover")
                .text(function(d){
                    return d.value;
                });
        },
        /*tabSelect*/
        tabSelectInit:function(){
            var scope = this;
            var $bomTabTitle = $("#bomTabTitle");
            var thisActiveColor = "#33cc00";
            $bomTabTitle.children("li").eq(0).css("background",thisActiveColor);
            $bomTabTitle.children("li").click(function(){
                scope.droopRightTableInt($(this).index());
                switch ($(this).index()){
                    case 0:
                        thisActiveColor = "#33cc00";
                        break;
                    case 1:
                        thisActiveColor = "#ff9900";
                        break;
                    case 2:
                        thisActiveColor = "#0066cc";
                        break;
                }
                if($(this).attr("class") != "active"){
                    $bomTabTitle.children("li").removeClass("active").css("background","rgba(255, 255, 255, 0.15)");
                    $(this).addClass("active").css("background",thisActiveColor);
                }
            });
        },
        /*圆形分区图*/
        droopCenterInit:function(){
            var scope = this;
            var $bomTabTitle = $("#bomTabTitle"),thisActiveColor,thisIndex;
            var width = 620,
                height = 620,
                radius = Math.min(width, height) / 2-50,
                color = d3.scale.category20c();

            var svg = d3.select("#droop_bar").append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height * .50 + ")");

            var partition = d3.layout.partition()
                .sort(null)
                .size([2 * Math.PI, radius * radius])
                .value(function(d) { return 1; });

            var arc = d3.svg.arc()
                .startAngle(function(d) { return d.x; })
                .endAngle(function(d) { return d.x + d.dx; })
                .innerRadius(function(d) {
                    if(d.children){
                        return Math.sqrt(32000);
                    }else{
                        return Math.sqrt(d.y);
                    }

                })
                .outerRadius(function(d) {
                    if(d.children){
                        return Math.sqrt(d.y + d.dy);
                    }else{
                        return Math.sqrt(d.y + d.dy)+ d.value*1.2;
                    }

                });
            var arcText = d3.svg.arc()//文字路径
                .startAngle(function(d) { return d.x; })
                .endAngle(function(d) { return d.x + d.dx; })
                .innerRadius(function(d) {
                    if(d.children){
                        return Math.sqrt(32000);
                    }else{
                        return Math.sqrt(d.y);
                    }
                })
                .outerRadius(function(d) { return Math.sqrt(d.y + d.dy*0.5) });

            d3.json("src/data/flare.json", function(error, root) {
                if (error){throw error;}
                var path = svg.datum(root).selectAll("path")
                    .data(partition.nodes)
                    .enter().append("g");
                path.data(partition.value(function(d) { return d.size;}).nodes)//按尺寸显示
                    .transition()
                    .duration(2000)
                    .attrTween("d", arcTween);
                path.append("path")
                    .attr("d", arcText)
                    .attr("display", function(d) { return d.depth ? null : "none"; }) // 顶节点隐藏
                    .attr("id",function(d,i){
                        return "arc"+i;
                    });
                path.append("path")
                    .attr("display", function(d) { return d.depth ? null : "none"; }) // 顶节点隐藏
                    .attr("d", arc)
                    .style("stroke", "#333")
                    .style("fill", function(d) {
                        return d.color;
                    })
                    .style("stroke-width",1)
                    .style("fill-rule", "evenodd")
                    .each(stash)
                    .on("mouseover", function(d){
                        $("#droop_text").addClass("moveBar");
                        tooltip.html(d.name+"<br/>")
                            .style("left", (d3.event.pageX+15) + "px")
                            .style("top", (d3.event.pageY-5) + "px")
                            .style({"opacity":0.85,"display":"block"});
                    })
                    .on("mousemove", function(d){
                        tooltip.style("left", (d3.event.pageX+15) + "px")
                            .style("top", (d3.event.pageY-5) + "px");
                    })
                    .on("mouseout", function(){
                        tooltip.style({"opacity":0,"display":"none"});
                        $("#droop_text").removeClass("moveBar");
                    })
                path.on("click", function(d){
                        $(".droop_logo").hide();
                        var thisHtml = "";
                        if(d.depth == 1){
                            switch (d.name){
                                case "O域":
                                    thisActiveColor = "#33cc00";
                                    thisIndex = 0;
                                    break;
                                case "B域":
                                    thisActiveColor = "#ff9900";
                                    thisIndex = 1;
                                    break;
                                case "M域":
                                    thisActiveColor = "#0066cc";
                                    thisIndex = 2;
                                    break;

                            }
                            $bomTabTitle.children("li").removeClass("active").css("background","rgba(255, 255, 255, 0.15)");
                            $bomTabTitle.children("li").eq(thisIndex).addClass("active").css("background",thisActiveColor);
                            scope.droopRightTableInt(thisIndex);
                        }
                        if(d.company){
                            thisHtml=d.name+"<br>"+d.company+"<br>"+d.data+"<br>占比"+d.valueSize+"%";
                        }else{
                            thisHtml=d.name+"<br>"+d.data+"<br>占比"+d.valueSize+"%";
                        }
                        $("#droop_tips").html(thisHtml);
                    });
                path.append("text")
                    .attr("x",function(d){
                        return d.thisX;
                    })
                    .attr("y",0)
                    .style("font-size", "12px")
                    .style("fill", "#fff")
                    .append("textPath")
                    .attr("xlink:href",function(d,i){
                        return "#arc"+i;
                    })
                    .text(function(d) {
                        if(!d.children && d.size > 5){
                            return d.name;
                        }
                    });
                var tooltip = d3.select("body")
                    .append("div")
                    .attr("class","tooltip")
                    .style("opacity",0.0);

            });

            //Stash the old values for transition.
            function stash(d) {
                d.x0 = d.x;
                d.dx0 = d.dx;
            }

            //Interpolate the arcs in data space.
            function arcTween(a) {
                var i = d3.interpolate({x: a.x0, dx: a.dx0}, a);
                return function(t) {
                    var b = i(t);
                    a.x0 = b.x;
                    a.dx0 = b.dx;
                    return arc(b);
                };
            }
            d3.select(self.frameElement).style("height", height + "px");
        },
        /*rightTable*/
        droopRightTableInt:function(num){
            var pathData=[
                {"dataList":[
                    {"name":"华为公司","color":"#86ba6f"},
                    {"name":"中信公司","color":"#f54d80"},
                    {"name":"亿阳","color":"#939bfe"},
                    {"name":"北京协成致远","color":"#2196f3"},
                    {"name":"其他","color":"#fd999b"}
                ]},
                {"dataList":[
                    {"name":"亚信","color":"#86ba6f"}
                ]},
                {"dataList":[
                    {"name":"电讯盈科","color":"#86ba6f"},
                    {"name":"亿阳","color":"#f54d80"},
                    {"name":"IBM","color":"#939bfe"}
                ]}
            ];
            var rightTableList = $("#bomTabCont");
            rightTableList.html("");
            var diagonal = d3.svg.diagonal().projection(function(d) { return [d.y, d.x]; });//声明对角线
            pathData = pathData[num].dataList;
            for(var pi=0;pi<pathData.length;pi++){
                //右侧表格
                rightTableList.append("<li id='pack_"+pi+"'>"+pathData[pi].name+"</li>");
                var tableData=[];
                for(var di = 0;di < 5 ;di++){
                    tableData.push(Math.random()*0.5);
                }
                //表格趋势图
                var svgTable = d3.select("#pack_"+pi).append("svg")
                    .attr("width",100)
                    .attr("height",30)
                    .append("g").attr("transform", "translate(40,0)");
                for(var ti=0;ti<tableData.length-1;ti++){
                    //添加路径
                    svgTable.append("path").transition()
                        .duration(500)
                        .ease("circle").attr("d",diagonal({
                        source:{x:30-(tableData[ti]*30),y:17*ti-28},
                        target:{x:30-(tableData[ti+1]*30),y:17*(ti+1)-28}
                    })).attr("fill","none").attr("stroke",pathData[pi].color).attr("stroke-width",2);

                }
            }
        }
    }
    return GYdroop;
});
