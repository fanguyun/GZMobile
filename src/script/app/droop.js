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
            this.droopRightTableInt();
            var $smallNum = $("#smallNum");
            var $bigNum = $("#bigNum");
            setInterval(function(){
                var thisNum = parseInt($smallNum.html());
                $smallNum.html(thisNum + parseInt(Math.random()*1000));
            },1000);
            setInterval(function(){
                var thisNum = parseInt($bigNum.html());
                $bigNum.html(thisNum + parseInt(Math.random()*3));
            },5000);
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
                {"height":180,"value":"63%","color":"#0066cc","borderColor":"#2eefdc"},
                {"height":80,"value":"23%","color":"#33cc00","borderColor":"#67EA2A"},
                {"height":38,"value":"14%","color":"#ff9900","borderColor":"#ddae19"}
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
                .attr("opacity",0.9)
                .attr("class",function(d,i){
                    return "hover lineColor"+i;
                })
                .attr("stroke",function(d){
                    return d.borderColor;
                }).attr("stroke-width",1);
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
                .attr("dx","13px")
                .attr("dy","2em")
                .attr("class","hover")
                .text(function(d){
                    return d.value;
                });
        },
        /*tabSelect*/
        tabSelectInit:function(){
            var $bomTabTitle = $("#bomTabTitle");
            $bomTabTitle.children("li").click(function(){
                if($(this).attr("class") != "active"){
                    $bomTabTitle.children("li").removeClass("active");
                    $(this).addClass("active");
                }
            });
        },
        /*圆形分区图*/
        droopCenterInit:function(){
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
                        return Math.sqrt(30000);
                    }else{
                        return Math.sqrt(d.y);
                    }

                })
                .outerRadius(function(d) {
                    if(d.children){
                        return Math.sqrt(d.y + d.dy);
                    }else{
                        return Math.sqrt(d.y + d.dy)+ d.value*1.5;
                    }

                });
            var arcText = d3.svg.arc()//文字路径
                .startAngle(function(d) { return d.x; })
                .endAngle(function(d) { return d.x + d.dx; })
                .innerRadius(function(d) {
                    if(d.children){
                        return Math.sqrt(30000);
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
                        var thisHtml=d.name+"<br>"+d.company+"<br>"+d.data+"<br>占比"+d.value+"%";
                        $("#droop_tips").html(thisHtml);
                    });
                path.append("text")
                    .attr("x",5)
                    .attr("y",0)
                    .style("font-size", "12px")
                    .style("fill", "#fff")
                    .append("textPath")
                    .attr("xlink:href",function(d,i){
                        return "#arc"+i;
                    })
                    .text(function(d) {
                        if(!d.children && d.size > 3){
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

            // Interpolate the arcs in data space.
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
        droopRightTableInt:function(){
            var pathData=[
                {"name":"中信通信","color":"#86ba6f"},
                {"name":"世纪互联","color":"#f54d80"},
                {"name":"格力","color":"#939bfe"},
                {"name":"腾讯大厦","color":"#2196f3"},
                {"name":"合肥移动","color":"#fd999b"},
                {"name":"其他","color":"#54bfb9"}
            ];
            var rightTableList = $("#bomTabCont");
            var diagonal = d3.svg.diagonal().projection(function(d) { return [d.y, d.x]; });//声明对角线
            for(var pi=0;pi<pathData.length;pi++){
                //右侧表格
                rightTableList.append("<li id='pack_"+pi+"'>"+pathData[pi].name+"</li>");
                var tableData=[0.5,0.3,0.5,0.6,0.4];
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