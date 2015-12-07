/**
 * Created by Dima on 07.11.2015.
 */
;(function(){
    'use strict';

    function modalDialog(){
        return {
            restrict: 'E',
            scope: {
                show: '='
            },
            replace: true,
            transclude: true,
            link: function (scope, element, attrs) {
                scope.dialogStyle = {};

                if (attrs.width) {
                    scope.dialogStyle.width = attrs.width;
                }

                if (attrs.height) {
                    scope.dialogStyle.height = attrs.height;
                }

                scope.hideModal = function () {
                    scope.show = false;
                };
            },
            templateUrl: "pages/modal-dialog.html"
        }
    }

    angular.module('Tesla.modalDialog', [])
        .directive('modalDialog', modalDialog)
}());