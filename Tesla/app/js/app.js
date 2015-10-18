/**
 * Created by Dima on 18.10.2015.
 */
;(function(){
    'use strict';

    function config($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/dashboard');

        $stateProvider
            .state('dashboard',{
                url:'/dashboard',
                templateUrl:'pages/dashboard.html',
                controller: 'dashboardCtrl'
            })
            .state('data',{
                url:'/data',
                templateUrl: 'pages/data.html',
                controller: 'dataCtrl'
            })
    }

    angular.module('Tesla', [
        'ui.router',
        'Tesla.dashboard',
        'Tesla.data'
    ])
        .config(config,'config')
}());
