/**
 * Created by Dima on 18.10.2015.
 */
;(function(){
    'use strict';

    function config($stateProvider, $urlRouterProvider){
        // Init parse sdk
        Parse.initialize(
            'K5TZDOJlwJYaocVVBIFlI1Dna6qdVMAxQHut1aZ3',
            'mFhIJ53lXI10xzpZKGuN4qqbH9YyiHluVh6R3fMW'
        );

        $urlRouterProvider.otherwise('enter');

        $stateProvider
            .state('enter', {
               url: '/enter',
               templateUrl: 'pages/enter.html',
               controller: 'EnterCtrl as vm'
            })
            .state('registry',{
                url: '/registry',
                templateUrl: 'pages/registry.html'
            })
            .state('dashboard', {
               url: '/dashboard',
               views: {
                   '': {templateUrl: 'pages/dashboard.html'
                   },
                    'info@dashboard': {
                        templateUrl: 'pages/dashboard-quick-info.html',
                        controller: 'DashboardQuickInfoCtrl as vm'
                    },
                    'battery@dashboard': {
                        templateUrl: 'pages/dashboard-battery-info.html',
                        controller: 'DashboardBatteryCtrl as vm'
                    },
                    'charge@dashboard': {templateUrl: 'pages/dashboard-charge.html',
                        controller: 'DashboardChargeCtrl as vm'
                    }
                }
            })
            .state('statistics', {
                url: '/statistics',
                views:{
                    '': {templateUrl: 'pages/statistics.html'
                    },
                    'live@statistics': {
                        templateUrl: 'pages/statistics-live.html',
                        controller: 'StatisticsLiveCtrl as vm'
                    },
                    'days@statistics': {
                        templateUrl: 'pages/statistics-days.html',
                        controller: 'StatisticsDaysCtrl as vm'
                    }
                }
            })
            .state('appliance', {
                url: '/appliance',
                views: {
                    '': {templateUrl: 'pages/appliance.html'
                    },
                    'counter@appliance': {
                        templateUrl: 'pages/appliance-counter.html',
                        controller: 'ApplianceCounterCtrl as vm'
                    },
                    'list@appliance': {
                        templateUrl: 'pages/appliance-list.html',
                        controller: 'ApplianceListCtrl as vm'
                    }
                }
            })
            .state('appliance.add',{
                url:'/add',
            views: {
                'counter@appliance': {
                    templateUrl: 'pages/appliance-add.html',
                    controller: 'ApplianceAddCtrl as vm'
                }
            }
            })
            .state('settings',{
                url:'/settings',
                views:{
                    '':{templateUrl: 'pages/settings.html'
                    },
                    'menu@settings': {
                        templateUrl: 'pages/settings-menu.html'
                    },
                    '@settings': {
                        templateUrl: 'pages/settings-firmware.html'
                    }
                }
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
    }

    function AppRun ($localStorage, $state, $rootScope) {

        $rootScope.$state = $state;

        if (Parse.User.current()) {
            $state.go('dashboard');
        } else if (!Parse.User.current()) {
            $state.go('enter');
        }

        if (!$localStorage.get('Powerwall')) {

         var data = {
                 number: 2,
                 power: 5,
                 status: 'Active',
                 capacity: 70,
                 temperature: 60
         };

            $localStorage.setObject('Powerwall', data);

        }
        if (!$localStorage.get('Appliances')){
            var appliance = [{
                name:'TV',
                power: 25
            }, {
                name:'macBook',
                power: 7
            }];
            $localStorage.setObject('Appliances', appliance);
        }
    }

    function AppCtrl(){
        var vm = this;
        vm.logout = function(){
            Parse.User.logOut();
        }
    }

    angular.module('Tesla', [
        'ui.router',
        'Tesla.enter',
        'Tesla.modalDialog',
        'Tesla.quickInfo',
        'Tesla.d3Service',
        'Tesla.d3DirectiveChargingArc',
        'Tesla.d3DirectiveChargingGraph',
        'Tesla.d3DirectiveLive',
        'Tesla.d3DirectiveToday',
        'Tesla.d3DirectiveYesterday',
        'Tesla.d3DirectiveWeek',
        'Tesla.dashboardBattery',
        'Tesla.dashboardCharge',
        'Tesla.live',
        'Tesla.days',
        'Tesla.counter',
        'Tesla.add',
        'Tesla.list',
        'Tesla.shareAppliance',
        'Tesla.settings',
        'Tesla.authentication',
        'Tesla.data',
        'Tesla.localStorage'
    ])
        .run(AppRun)
        .config(config,'config')
        .controller('AppCtrl', AppCtrl);
}());
