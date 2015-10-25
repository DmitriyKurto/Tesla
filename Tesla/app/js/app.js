/**
 * Created by Dima on 18.10.2015.
 */
;(function(){
    'use strict';

    function config($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('dashboard');

        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
               views: {
                   '': {templateUrl: 'pages/dashboard.html'},
                    'info@dashboard': {
                        templateUrl: 'pages/dashboard-quick-info.html'},

                    'battery@dashboard': {
                        templateUrl: 'pages/dashboard-battery-info.html',
                        controller: 'DashboardCtrl as vm'
                    },
                    'charge@dashboard': {templateUrl: 'pages/dashboard-charge.html'}
                }
            })
            .state('statistics', {
                url: '/statistics',
                views:{
                    '': {templateUrl: 'pages/statistics.html'},
                    'live@statistics': {templateUrl: 'pages/statistics-live.html',
                    controller: 'StatisticsLiveCtrl as vm'},
                    'days@statistics': {templateUrl: 'pages/statistics-days.html',
                    controller: 'StatisticsDaysCtrl as vm'}
                }
            }

        )
            .state('appliance', {
                url: '/appliance',
                views: {

                    '': {templateUrl: 'pages/appliance.html'},
                    'counter@appliance': {
                        templateUrl: 'pages/appliance-counter.html',
                        controller: 'ApplianceCtrl as vm'
                    },
                    'list@appliance': {
                        templateUrl: 'pages/appliance-list.html',
                        controller: 'ApplianceListCtrl as vm'
                    }
                }
            })
            .state('appliance.add',{
                url:'/add',
            views:{
                'counter@appliance':{
                    templateUrl: 'pages/appliance-add.html'},
                    controller: 'ApplianceAddCtrl as vm'
                }
            })
            .state('settings',{
                url:'/settings',
                views:{
                    '':{templateUrl: 'pages/settings.html'},
                    'menu@settings': {templateUrl: 'pages/settings-menu.html'},
                    '@settings': {templateUrl: 'pages/settings-account.html'},
                    controller: 'AccountCtrl as vm'
                }
            })
            .state('settings.account',{
                url:'/account',
                templateUrl: 'pages/settings-account.html',
                controller: 'AccountCtrl as vm'
            })
            .state('settings.firmware',{
                url:'/firmware',
                templateUrl: 'pages/settings-firmware.html'
                /*  controller: 'SettingsCtrl as vm'*/
            })
            .state('settings.tutorials', {
                url: '/tutorials',
                templateUrl: 'pages/settings-tutorials.html'
                /*  controller: 'SettingsCtrl as vm'*/
            })
            .state('data',{
                url:'/data',
                templateUrl: 'pages/data.html',
                controller: 'DataCtrl as vm'
            })
            .state('account',{
                url:'/account',
                templateUrl: 'pages/settings/account.html'
            })
    }

    function AppRun ($localStorage) {

            if (!$localStorage.get('Powerwall')) {

             var data = {
                     number: 5,
                     power: 5,
                     status: 'Active',
                     capacity: 5,
                     temperature: 5
             };
                $localStorage.setObject('Powerwall', data);
            }
    }

    angular.module('Tesla', [
        'ui.router',
        'Tesla.dashboard',
        'Tesla.appliance',
        'Tesla.live',
        'Tesla.days',
        'Tesla.add',
        'Tesla.list',
        'Tesla.shareAppliance',
        'Tesla.shareData',
        'Tesla.settings',
        'Tesla.account',
        'Tesla.authentication',
        'Tesla.data'

    ])
        .run(AppRun)
        .config(config,'config');

}());
