/**
 * Created by Dima on 22.10.2015.
 */
;(function(){

    function ShareData($window) {
        return {
            setObject: function (key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function (key) {
                return JSON.parse($window.localStorage[key] || '{}');
            }
        }
    }


    angular.module('Tesla.shareData',[])
        .factory('ShareData', ShareData)
}());