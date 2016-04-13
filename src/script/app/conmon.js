/**
 * Created by Mrfan-123 on 2015/12/27.
 */
/*公共JS文件*/
define(function(){
   return conmon={
        getUrlData:function(){//截取URL参数
            var hash=window.location.hash;
            var urlData=hash.split("?");
            return urlData;
        },
        getTimeData:function(){
            var firstDate =parseInt(new Date().getHours().toLocaleString());//获取当前小时
            var dateArr=[];
            for(var i=0;i<24;i++){
                if(firstDate==0){
                    firstDate=24;
                }
                firstDate--;
                dateArr.push(firstDate+":00");
            }
            dateArr.reverse();//数组倒序排列
            return dateArr;
        },
        selectMenuInt:function(num){
            var $menu=$("#left_menu");
            $menu.children("li").find("a").removeClass("active");
            $menu.children("li").eq(num).find("a").addClass("active");
        },
        moveNumInt:function(id,num){
            var stratNum=0;
            var numTimer=setInterval(function(){
                if (stratNum < num) {
                    if(num>1000){
                        stratNum+=50;
                    }else if(num<=1000 && num>200){
                        stratNum+=5;
                    }else if(num>0 && num<=200){
                        stratNum+=1;
                    }

                    $("#"+id).text(stratNum);
                } else {
                    $("#"+id).text(num);
                    clearInterval(numTimer);
                }
            },10)
        }
    }

});
