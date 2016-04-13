/**
 * Created by lenovo on 2016/1/13.
 */
define(function(){
    var GYtall = {
        /*存储数据*/
        tallData:{},
        init:function(){
            var scope =this;
            conmon.selectMenuInt(3);
            scope.leftAutoHeightInt();//左侧信息列表垂直居中
            scope.tallBarInt(5);//高价值视图

        },
        /*左侧信息列表垂直居中\*/
        leftAutoHeightInt:function(){
            var $tall_left = $("#tall_left");
            var thisHeight = $tall_left.height();
            $tall_left.animate({"margin-top":"-"+(thisHeight*0.5+16)+"px"},300);
        },
        /*高价值视图*/
        tallBarInt:function(num){
            var scope = this;
            $("#menuSvg").remove();
            var width = 620;
            var height = 620;
            var svg = d3.select("#tallBarCont")
                .append("svg")
                .attr("id","menuSvg")
                .attr("width", width)
                .attr("height", height);
            var dataValue=[
                //一级目录
                {"type":"middle","startAngle":Math.PI*0.84,"endAngle":Math.PI*0.94,"color":"rgba(27, 108, 226, 0.4)","name":"旅游"},
                {"type":"middle","startAngle":Math.PI*0.95,"endAngle":Math.PI*1.05,"color":"rgba(27, 108, 226, 0.4)","name":"金融"},
                {"type":"middle","startAngle":Math.PI*1.06,"endAngle":Math.PI*1.16,"color":"rgba(27, 108, 226, 0.4)","name":"汽车"},
                {"type":"middle","startAngle":Math.PI*1.17,"endAngle":Math.PI*1.27,"color":"rgba(27, 108, 226, 0.4)","name":"保险"},
                {"type":"middle","startAngle":Math.PI*1.28,"endAngle":Math.PI*1.38,"color":"rgba(27, 108, 226, 0.4)","name":"房产"},
                {"type":"middle","startAngle":Math.PI*1.39,"endAngle":Math.PI*1.49,"color":"rgba(27, 108, 226, 0.4)","name":"电商"}
            ];
            dataValue[num].color="#0033ff";//当前选中一级目录颜色
            //二级目录数据
            var secondLevelData =[
                {"valueData":[//旅游 0
                    {"type":"tall","startAngle":Math.PI*1.64,"endAngle":Math.PI*1.75,"color":"rgba(27, 108, 226, 0.6)","name":"旅游偏好"},
                    {"type":"tall","startAngle":Math.PI*1.76,"endAngle":Math.PI*1.93,"color":"rgba(27, 108, 226, 0.6)","name":"搜索TOP排行榜"}
                ]},
                {"valueData":[//金融 1
                    {"type":"tall","startAngle":Math.PI*1.64,"endAngle":Math.PI*1.75,"color":"rgba(27, 108, 226, 0.6)","name":"理财"},
                    {"type":"tall","startAngle":Math.PI*1.76,"endAngle":Math.PI*1.87,"color":"rgba(27, 108, 226, 0.6)","name":"贷款"},
                    {"type":"tall","startAngle":Math.PI*1.88,"endAngle":Math.PI*1.99,"color":"rgba(27, 108, 226, 0.6)","name":"股票"}
                ]},
                {"valueData":[//汽车 2
                    {"type":"tall","startAngle":Math.PI*1.64,"endAngle":Math.PI*1.81,"color":"rgba(27, 108, 226, 0.6)","name":"搜索引擎关键字"},
                    {"type":"tall","startAngle":Math.PI*1.82,"endAngle":Math.PI*1.99,"color":"rgba(27, 108, 226, 0.6)","name":"车销售处咨询"},
                    {"type":"tall","startAngle":0,"endAngle":Math.PI*0.17,"color":"rgba(27, 108, 226, 0.6)","name":"车销售电话咨询"},
                    {"type":"tall","startAngle":Math.PI*0.18,"endAngle":Math.PI*0.34,"color":"rgba(27, 108, 226, 0.6)","name":"车贷相关查询"}
                ]},
                {"valueData":[// 保险 3
                    {"type":"tall","startAngle":Math.PI*1.62,"endAngle":Math.PI*1.75,"color":"rgba(27, 108, 226, 0.6)","name":"竞品关注度"},
                    {"type":"tall","startAngle":Math.PI*1.76,"endAngle":Math.PI*1.87,"color":"rgba(27, 108, 226, 0.6)","name":"经济能力"},
                    {"type":"tall","startAngle":Math.PI*1.88,"endAngle":Math.PI*1.99,"color":"rgba(27, 108, 226, 0.6)","name":"消费行为"},
                    {"type":"tall","startAngle":0,"endAngle":Math.PI*0.11,"color":"rgba(27, 108, 226, 0.6)","name":"生活行为"},
                    {"type":"tall","startAngle":Math.PI*0.12,"endAngle":Math.PI*0.25,"color":"rgba(27, 108, 226, 0.6)","name":"互联网偏好"},
                    {"type":"tall","startAngle":Math.PI*0.26,"endAngle":Math.PI*0.37,"color":"rgba(27, 108, 226, 0.6)","name":"家庭状况"},
                    {"type":"tall","startAngle":Math.PI*0.38,"endAngle":Math.PI*0.49,"color":"rgba(27, 108, 226, 0.6)","name":"健康状况"}
                ]},
                {"valueData":[// 房产 4
                    {"type":"tall","startAngle":Math.PI*1.64,"endAngle":Math.PI*1.81,"color":"rgba(27, 108, 226, 0.6)","name":"售楼部咨询"},
                    {"type":"tall","startAngle":Math.PI*1.82,"endAngle":Math.PI*1.99,"color":"rgba(27, 108, 226, 0.6)","name":"房贷相关查询"},
                    {"type":"tall","startAngle":0,"endAngle":Math.PI*0.17,"color":"rgba(27, 108, 226, 0.6)","name":"销售电话咨询"},
                    {"type":"tall","startAngle":Math.PI*0.18,"endAngle":Math.PI*0.36,"color":"rgba(27, 108, 226, 0.6)","name":"搜索引擎关键字"}
                ]},
                {"valueData":[// 电商 5
                    {"type":"tall","startAngle":Math.PI*1.64,"endAngle":Math.PI*1.75,"color":"rgba(27, 108, 226, 0.6)","name":"服装"},
                    {"type":"tall","startAngle":Math.PI*1.76,"endAngle":Math.PI*1.87,"color":"rgba(27, 108, 226, 0.6)","name":"母婴用品"},
                    {"type":"tall","startAngle":Math.PI*1.88,"endAngle":Math.PI*1.99,"color":"rgba(27, 108, 226, 0.6)","name":"珠宝饰品"},
                    {"type":"tall","startAngle":0,"endAngle":Math.PI*0.11,"color":"rgba(27, 108, 226, 0.6)","name":"家装建材"},
                    {"type":"tall","startAngle":Math.PI*0.12,"endAngle":Math.PI*0.23,"color":"rgba(27, 108, 226, 0.6)","name":"家电办公"},
                    {"type":"tall","startAngle":Math.PI*0.24,"endAngle":Math.PI*0.35,"color":"rgba(27, 108, 226, 0.6)","name":"汽车用品"},
                    {"type":"tall","startAngle":Math.PI*0.36,"endAngle":Math.PI*0.47,"color":"rgba(27, 108, 226, 0.6)","name":"护肤美容"}
                ]}
            ];
            for(var se = 0; se < secondLevelData[num].valueData.length; se++){
                dataValue.push(secondLevelData[num].valueData[se]);
            }
            //一级目录
            var outerRadius =310,innerRadius =270;	//外半径&内半径，innerRadius为0则中间没有空白
            //图形
            var arc = d3.svg.arc()	//弧生成器
                .innerRadius(innerRadius)	//设置内半径
                .outerRadius(outerRadius);	//设置外半径
            //文字
            var arcText = d3.svg.arc()	//弧生成器
                .innerRadius(innerRadius)	//设置内半径
                .outerRadius(outerRadius-25);	//设置外半径
            //二级目录
            var outerRadius1 =245,innerRadius1 = 213;	//外半径&内半径，innerRadius为0则中间没有空白
            //图形
            var arc1 = d3.svg.arc()	//弧生成器
                .innerRadius(innerRadius1)	//设置内半径
                .outerRadius(outerRadius1);	//设置外半径
            //文字
            var arcText1 = d3.svg.arc()	//弧生成器
                .innerRadius(innerRadius1)	//设置内半径
                .outerRadius(outerRadius1-21);	//设置外半径

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
                        case "middle":
                            return arc(d);
                            break;
                        case "tall":
                            return arc1(d);
                            break;
                    }
                })
                .attr("class",function(d,i){
                    switch (d.type){
                        case "middle":
                            return "middlePath";
                            break;
                        case "tall":
                            return "tallPath";
                            break;
                    }
                })
                .attr("id",function(d,i){
                    switch (d.type){
                        case "middle":
                            return "middlePath"+i;
                            break;
                        case "tall":
                            return "tallPath"+i;
                            break;
                    }
                });
            //点击事件
            arcs.on("click",function(d,i){
                switch (d.type){
                    case "middle":
                        scope.tallBarInt(i);//高价值视图一级类目切换
                        break;
                    case "tall":
                        scope.mapContInt(num,i,"leimu");//绘制地图
                        $(".tallPath").attr("fill","rgba(27, 108, 226, 0.6)");
                        $("#tallPath"+i).attr("fill","#ff9900");
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
                        case "tall":
                            return arcText1(d);
                            break;
                    }

                })
                .attr("id",function(d,i){
                    switch (d.type){
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
                        case "middle":
                            return 30;
                            break;
                        case "tall":
                            return 10;
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
                        case "tall":
                            return "#tall"+i;
                            break;
                    }

                })
                .text(function(d){
                    return d.name;
                });
            scope.tallData[num] = scope.getData(num);//存贮数据
            scope.mapContInt(num,"","");//绘制地图
        },
        /*从JSON获取数据*/
        getData:function(id){
            var baseUrl="",dataValue;
            switch (id){
                case 5://电商
                    baseUrl = "dianshang.json";
                    break;
                case 4://房产
                    baseUrl = "fangchan.json";
                    break;
                case 3://保险
                    baseUrl = "baoxiang.json";
                    break;
                case 2://汽车
                    baseUrl = "qiche.json";
                    break;
                case 1://金融
                    baseUrl = "jinrong.json";
                    break;
                case 0://旅游
                    baseUrl = "lvyou.json";
                    break;
            };
            $.ajax({
                type: "post",
                async: false,
                url: "src/data/tallData/"+baseUrl,
                dataType: "json",
                success:function(msg){
                    dataValue = msg;
                }
            });
            return dataValue;
        },
        /*mapContInt*/
        mapContInt:function(num,id,type){
            var scope = this,textX=[],textY=[];
            var thisData;
            if(type){//二级类目
                var erjiThisData = scope.tallData[num].hanyechildren;
                thisData = erjiThisData[id-6];
            }else{//一级类目
                thisData = scope.tallData[num];
            }
            scope.rightDataList(num,thisData);//右侧表格数据处理
            $("#mapCont").html("");
            var width  = 400;
            var height = 400;
            var svg = d3.select("#mapCont").append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(0,0)");
            var projection = d3.geo.mercator()//经纬度，地图比例
                .center([106.6113,26.9385])
                .scale(1000*3.8)
                .translate([width/2, height/2]);
            var path = d3.geo.path()
                .projection(projection);
            d3.json("src/data/GZmapjson/guizhou.json", function(error, root) {
                if (error)
                    return console.error(error);
                var pathSvg=svg.selectAll("path")
                    .data( root.features )
                    .enter().append("g");
                pathSvg.append("path")
                    .attr("stroke","#0000ff")
                    .attr("stroke-width",1)
                    .attr("fill","rgba(255,255,255,0)")
                    .attr("d", path )
                    .on("mouseover",function(d,i){
                        d3.select(this)
                            .attr("fill","#000033");
                    })
                    .on("mouseout",function(d,i){
                        d3.select(this)
                            .attr("fill","rgba(255,255,255,0)");
                    })
                pathSvg.on("click",function(d,i){
                        scope.listMapInt(num,d.properties.id,id,type);//地图下钻
                    });
                svg.selectAll("text")
                    .data(root.features)
                    .enter().append("text")
                    .text(function(d){ return d.properties.name;})
                    .attr("transform", function(d,i) {
                        var centroid = path.centroid(d),
                            x = centroid[0]-15,
                            y = centroid[1];
                        textX[i] = x; textY[i] = y;
                        return "translate(" + x + ", " + y + ")";
                    })
                    .attr('fill','#FFF')
                    .attr("font-size","12px");

                pathSvg.select("text")
                    .data(thisData.addrlist)
                    .enter().append("text")
                    .text(function(d){ return d + "万";})
                    .attr("transform",function(d,i){
                        return "translate(" + textX[i] + ", " + (textY[i]+15) + ")";
                    })
                    .attr('fill','#ff9933')
                    .attr("font-size","12px");
            });
        },
        /*二级区域地图*/
        listMapInt:function(dataId,mapId,id,type){
            var scope = this;
            var thisData;
            if(type){//二级类目
                var erjiThisData = scope.tallData[dataId].hanyechildren;
                thisData = erjiThisData[id-6];
            }else{//一级类目
                thisData = scope.tallData[dataId];
            }
            $("#mapCont").html("");
            var url = "",addr = [],sizeNum = "",erjiData = {},textX = [],textY = [];//路径，经纬度，缩放比例
            for(var ai = 0; ai < thisData.addrchildren.length; ai++){//取出区域数据
                var thisID = thisData.addrchildren[ai].id;
                if(thisID == parseInt(mapId)){//安顺
                    erjiData = thisData.addrchildren[ai];
                }
            }
            switch(mapId){
                case "5204"://安顺
                    url = "src/data/GZmapjson/anshun.json";
                    addr = [106.0,26];
                    sizeNum = 1000*15;
                    break;
                case "5224"://毕节
                    url = "src/data/GZmapjson/bijie.json";
                    addr = [105.15,27];
                    sizeNum = 1000*7.3;
                    break;
                case "5201"://贵阳
                    url = "src/data/GZmapjson/guiyan.json";
                    addr = [106.7,26.81];
                    sizeNum = 1000*16;
                    break;
                case "5202"://六盘水
                    url = "src/data/GZmapjson/liupanshui.json";
                    addr = [104.9,26.13];
                    sizeNum = 1000*13;
                    break;
                case "5226"://黔东南
                    url = "src/data/GZmapjson/qiandonnan.json";
                    addr = [108.49,26.45];
                    sizeNum = 1000*9.5;
                    break;
                case "5227"://黔南
                    url = "data/GZmapjson/qiannan.json";
                    addr = [107.2,26.25];
                    sizeNum = 1000*8.4;
                    break;
                case "5223"://黔西南
                    url = "src/data/GZmapjson/qianxinan.json";
                    addr = [105.5,25.27];
                    sizeNum = 1000*11;
                    break;
                case "5222"://铜仁
                    url = "src/data/GZmapjson/tongren.json";
                    addr = [108.55,28.1];
                    sizeNum = 1000*10;
                    break;
                case "5203"://遵义
                    url = "src/data/GZmapjson/zunyi.json";
                    addr = [107,28.2];
                    sizeNum = 1000*8.2;
                    break;
            }
            scope.rightDataList(dataId,erjiData);//右侧表格数据处理
            var width  = 400;
            var height = 400;
            var svg = d3.select("#mapCont").append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(0,0)");
            var projection = d3.geo.mercator()//经纬度，地图比例
                .center(addr)
                .scale(sizeNum)
                .translate([width/2, height/2]);
            var path = d3.geo.path()
                .projection(projection);
            d3.json(url, function(error, root) {
                if (error)
                    return console.error(error);

                var pathSvg=svg.selectAll("path")
                    .data( root.features )
                    .enter().append("g");
                pathSvg.append("path")
                    .attr("stroke","#0000ff")
                    .attr("stroke-width",1)
                    .attr("fill","rgba(255,255,255,0)")
                    .attr("d", path )
                    .on("mouseover",function(d,i){
                        d3.select(this)
                            .attr("fill","#000033");
                    })
                    .on("mouseout",function(d,i){
                        d3.select(this)
                            .attr("fill","rgba(255,255,255,0)");
                    })
                pathSvg.on("click",function(d,i){
                        scope.mapContInt(dataId,"","");
                    });
                svg.selectAll("text")
                    .data(root.features)
                    .enter().append("text")
                    .text(function(d){ return d.properties.name;})
                    .attr("transform", function(d,i) {
                        var centroid = path.centroid(d),
                            x = centroid[0]-15,
                            y = centroid[1];
                        textX[i] = x;textY[i] =y;
                        return "translate(" + x + ", " + y + ")";
                    })
                    .attr('fill','#fff')
                    .attr("font-size","12px");
                pathSvg.select("text")
                    .data(erjiData.addrlist)
                    .enter().append("text")
                    .text(function(d){return d + "万";})
                    .attr("transform", function(d,i) {
                        return "translate(" + textX[i] + ", " + (textY[i]+15) + ")";
                    })
                    .attr('fill','#ff9933')
                    .attr("font-size","12px");
            });
        },
        /*右侧数据处理*/
        rightDataList:function(id,data){
            var scope = this;
            var $tallTitle1 = $("#tall_title1"),$tallTitle2 = $("#tall_title2"),$tallList1 = $("#tall_list1"),$tallList2 = $("#tall_list2");
            var titleHTML1 = "",titleHTML2 = "",listHTML1 = "",listHTML2 = "";
            switch (id){
                case 5://电商
                    titleHTML1 = "<li class='width3'>应用门户</li><li class='width3'>访问次数</li><li class='width3'>访问人数(万)</li>";
                    titleHTML2 = "<li class='width3'>搜索排行</li><li class='width3'>搜索次数</li><li class='width3'>访问人数(万)</li>";
                    for(var ti = 0;ti < data.menhulist.length;ti++){
                        listHTML1 +="<ul><li class='width3'>"+data.menhulist[ti].name+"</li><li class='width3'>"+data.menhulist[ti].clicknum+"</li><li class='width3'>"+data.menhulist[ti].peoplenum+"</li></ul>";
                        listHTML2 +="<ul><li class='width3'>"+data.serchlist[ti].name+"</li><li class='width3'>"+data.serchlist[ti].clicknum+"</li><li class='width3'>"+data.serchlist[ti].peoplenum+"</li></ul>";
                    }
                    listHTML1 +="<div class='clear'></div>";
                    listHTML2 +="<div class='clear'></div>";
                    $tallTitle1.html(titleHTML1);
                    $tallTitle2.html(titleHTML2).show();
                    $tallList1.html(listHTML1);
                    $tallList2.html(listHTML2);
                    break;
                case 4://房产
                    titleHTML1 = "<li class='width3'>关注TOP榜</li><li class='width3'>关注次数</li><li class='width3'>关注人数</li>";
                    titleHTML2 = "";
                    for(var ti = 0;ti < data.menhulist.length;ti++){
                        listHTML1 +="<ul><li class='width3'>"+data.menhulist[ti].name+"</li><li class='width3'>"+data.menhulist[ti].clicknum+"</li><li class='width3'>"+data.menhulist[ti].peoplenum+"</li></ul>";
                        listHTML2 +="";
                    }
                    listHTML1 +="<div class='clear'></div>";
                    listHTML2 +="<div class='clear'></div>";
                    $tallTitle1.html(titleHTML1);
                    $tallTitle2.html(titleHTML2).hide();
                    $tallList1.html(listHTML1);
                    $tallList2.html(listHTML2);
                    break;
                case 3://保险
                    titleHTML1 = "<li class='width2'>保险公司</li><li class='width2'>关注用户数占比</li>";
                    titleHTML2 = "";
                    for(var ti = 0;ti < data.menhulist.length;ti++){
                        listHTML1 +="<ul><li class='width2'>"+data.menhulist[ti].name+"</li><li class='width2'>"+data.menhulist[ti].clicknum+"</li></ul>";
                        listHTML2 +="";
                    }
                    listHTML1 +="<div class='clear'></div>";
                    listHTML2 +="<div class='clear'></div>";
                    $tallTitle1.html(titleHTML1);
                    $tallTitle2.html(titleHTML2).hide();
                    $tallList1.html(listHTML1);
                    $tallList2.html(listHTML2);
                    break;
                case 2://汽车
                    titleHTML1 = "<li class='width3'>关注TOP榜</li><li class='width3'>关注次数</li><li class='width3'>关注人数</li>";
                    titleHTML2 = "";
                    for(var ti = 0;ti < data.menhulist.length;ti++){
                        listHTML1 +="<ul><li class='width3'>"+data.menhulist[ti].name+"</li><li class='width3'>"+data.menhulist[ti].clicknum+"</li><li class='width3'>"+data.menhulist[ti].peoplenum+"</li></ul>";
                        listHTML2 +="";
                    }
                    listHTML1 +="<div class='clear'></div>";
                    listHTML2 +="<div class='clear'></div>";
                    $tallTitle1.html(titleHTML1);
                    $tallTitle2.html(titleHTML2).hide();
                    $tallList1.html(listHTML1);
                    $tallList2.html(listHTML2);
                    break;
                case 1://金融
                    titleHTML1 = "<li class='width3'>渠道</li><li class='width3'>关注次数</li><li class='width3'>关注人数</li>";
                    titleHTML2 = "";
                    for(var ti = 0;ti < data.menhulist.length;ti++){
                        listHTML1 +="<ul><li class='width3'>"+data.menhulist[ti].name+"</li><li class='width3'>"+data.menhulist[ti].clicknum+"</li><li class='width3'>"+data.menhulist[ti].peoplenum+"</li></ul>";
                        listHTML2 +="";
                    }
                    listHTML1 +="<div class='clear'></div>";
                    listHTML2 +="<div class='clear'></div>";
                    $tallTitle1.html(titleHTML1);
                    $tallTitle2.html(titleHTML2).hide();
                    $tallList1.html(listHTML1);
                    $tallList2.html(listHTML2);
                    break;
                case 0://旅游
                    titleHTML1 = "<li class='width2'>时间偏好</li><li class='width2'>人数</li>";
                    titleHTML2 = "<li class='width2'>吃住行偏好</li><li class='width2'>人数</li>";
                    for(var ti = 0;ti < data.menhulist.length;ti++){
                        listHTML1 +="<ul><li class='width2'>"+data.menhulist[ti].name+"</li><li class='width2'>"+data.menhulist[ti].clicknum+"</li></ul>";
                        listHTML2 +="<ul><li class='width2'>"+data.serchlist[ti].name+"</li><li class='width2'>"+data.serchlist[ti].clicknum+"</li></ul>";
                    }
                    listHTML1 +="<div class='clear'></div>";
                    listHTML2 +="<div class='clear'></div>";
                    $tallTitle1.html(titleHTML1);
                    $tallTitle2.html(titleHTML2).show();
                    $tallList1.html(listHTML1);
                    $tallList2.html(listHTML2);
                    break;

            }
            scope.leftAutoHeightInt();//垂直居中
        }
    }
    return GYtall;
});