require.config({
    //默认主路径
    baseUrl:'src/script',
    paths:{
        //一些库文件
        'jquery': 'lib/jquery-1.11.3.min',
        'angular': 'lib/angular.min',
        'angularRoute': 'lib/angular-route.min',
        'domReady': 'lib/domReady',
        'bootstrap': "lib/bootstrap",
        'd3':'lib/d3.min',
        //控制器&路由
        'controller': "controller",
        'router': "route",
        //用户自定义文件
        'conmon': 'app/conmon',
        'GYmain': 'app/main',
        'GYdroop': 'app/droop',
        'GYmiddle': 'app/middle',
        'GYtall': 'app/tall'
   },
    //指定模块名称和模块依赖
    shim:{
        'jquery':{
            exports:'$'
        },
        'angular':{
            exports:'angular'
        },
        'angularRoute':{
            deps:['angular'],
            exports: 'angularRoute'
        },
        'bootstrap':{
            deps:['jquery']
        }
    },
    //预加载
    deps:['bootstrap','d3','conmon'],
    waitSeconds: 0,//禁止等待超时
    //urlArgs: "bust=" + (new Date()).getTime()  //防止读取缓存，调试用
});
//define(name,[],function(){})
//define(名称,[依赖模块],函数)--名称可省略
define(['require',
        'angular',
        'angularRoute',
        'jquery',
        'controller',
        'router'
       ],
       function(require,angular){//手动启动angularjs应用
            require(['domReady!'],function(document){
                angular.bootstrap(document,['myApp']);
            });
        }
);
