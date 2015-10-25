/**
 * Created by Dima on 22.10.2015.
 */
;(function(){

    function $localStorage($window) {

        return {
            set: function(key, value) {
                $window.localStorage[key] = value;
            },
            get: function(key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            setObject: function (key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function (key) {
                return JSON.parse($window.localStorage[key] || '{}');
            }
        }

    }


    angular.module('Tesla.shareData',[])
        .service('$localStorage', $localStorage);
}());