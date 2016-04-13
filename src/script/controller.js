/**
 * Created by lenovo on 2015/11/28.
 */
/*控制器*/
define(['router','GYmain','GYdroop','GYmiddle','GYtall'],function(myApp,GYmain,GYdroop,GYmiddle,GYtall){
    //全局概览
    myApp.controller('GYmainInt', function() {
        setTimeout(function(){
            GYmain.init();
        },200)
    });
    //低价值密度
    myApp.controller('GYdroopInt', function() {
        setTimeout(function(){
            GYdroop.init();
        },200)
    });
    //中价值密度
    myApp.controller('GYmideleInt', function() {
        setTimeout(function(){
            GYmiddle.init();
        },200)
    });
    //高价值密度
    myApp.controller('GYtallInt', function() {
        setTimeout(function(){
            GYtall.init();
        },200)
    });
})


