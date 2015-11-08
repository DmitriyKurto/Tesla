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
            /*template: "<div class='ng-modal' ng-show='show'>" +
            "<div class='ng-modal-overlay' ng-click='hideModal()'></div>" +
            "<div class='ng-modal-dialog' ng-style='dialogStyle'>" +
            "<span class='ng-modal-title' ng-show='dialogTitle && dialogTitle.length' ng-bind='dialogTitle'></span>" +
            "<div class='ng-modal-close' ng-click='hideModal()'>X" +
            "<div ng-bind-html='closeButtonHtml'></div>" +
            "</div>" +
            "<div class='ng-modal-dialog-content' ng-transclude></div>" +
            "</div>" +
            "</div>"*/
        }
    }

    angular.module('Tesla.modalDialog', [])
        .directive('modalDialog', modalDialog)
}());