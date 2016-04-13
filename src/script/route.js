/**
 * Created by lenovo on 2015/11/28.
 */
//路由控制页面视图
define(['angular'],function(){
    var myApp = angular.module("myApp", ['ngRoute'])
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/main', {//全局概览
                    templateUrl: 'src/template/main.html',
                    controller:'GYmainInt'
                }).
                when('/droop', {//低价值
                    templateUrl: 'src/template/droop.html',
                    controller:'GYdroopInt'
                }).
                when('/middle', {//中价值
                    templateUrl: 'src/template/middle.html',
                    controller:'GYmideleInt'
                }).
                when('/tall', {//高价值
                    templateUrl: 'src/template/tall.html',
                    controller:'GYtallInt'
                }).
                otherwise({//默认
                    redirectTo: '/main'
                });
        }
    ]);
    return myApp;
});