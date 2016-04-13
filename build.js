//r.js对应的压缩文件
({
    appDir:'./',   //项目根目录
    baseUrl:'./src/script/', //查找源js的根目录
    modules:[{
        name:'main'//指定要优化的模块
    }],
    dir:'./build/',   //指定输出的文件
    findNestedDependencies: true,
    fileExclusionRegExp: /^(r|build)\.js|^\.idea$/,
    optimizeCss: 'standard', //css的压缩方式
    //cssIn: 'src/style/main.css',
    removeCombined: true,   //如果为true，将从输出目录中删除已合并的文件
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
            exports:'bootstrap',
            deps:['jquery']
        }
    },
    //预加载
    deps:['bootstrap','d3','conmon'],
    paths: {
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
    }
})