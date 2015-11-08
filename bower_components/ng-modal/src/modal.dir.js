angular.module('modal')
  .directive('modal', function($rootScope, $compile, $document, $templateCache, $http) {
    var body = $document.find('body');

    return {
      restrict: 'A',
      transclude: 'true',
      scope: {
        // TODO
        width: '&?',
        // TODO
        height: '&?',
        template: '&?',
        templateUrl: '&?',
        scope: '=?',
        controller: '&?'
      },
      template:
        '<div class="modal-clickbait"></div>' +
        '<div class="modal-focus"></div>',
      require: 'modal',
      controllerAs: 'modal',
      controller: function($scope, $q) {
        this.link = function(el) { $scope.el = el; };

        var deferred = $q.defer();
        this.promise = deferred.promise;

        this.close = function() {
          deferred.resolve();
          close();
        };
        this.dismiss = function() {
          deferred.reject();
          close();
        }
        function close() {
          body.children().removeClass('modal-blur');

          modal = false;
          if ($scope.service)
            $scope.el.remove();
        }

        this.blur = function(el) {
          body.children().addClass('modal-blur');
          var parent = el;
          while (parent.length) {
            parent.removeClass('modal-blur');
            parent = parent.parent();
          }

          // Expose to the service
          $scope.$close = this.close;
          $scope.$dismiss = this.dismiss;
          $scope.promise = this.promise;
          $scope.blur = this.blur;
        };
      },
      link:  function(scope, el, attrs , ctrl, transclude) {
        var blur = el.children()[0];
        var modal = true;

        ctrl.link(el);
        ctrl.blur(el);

        // Listen for `ESC`
        var esc = function esc(e) {
          if (e.which === 27) {
            $document.off('keyup', esc);
            ctrl.dismiss();
          }
        };
        $document.on('keyup', esc);

        // Listen for off-modal clicks
        var off = function off(e) {
          if (e.target === blur) {
            $document.off('click', off);
            ctrl.dismiss();

          }
        };
        $document.on('click', off);

        transclude(function transcludeModal(clone) {
          if (scope.template() || scope.templateUrl()) {
            var template =
              scope.template() || $templateCache.get(scope.templateUrl());

            if (!template) {
              $http.get(scope.templateUrl()).success(function(template) {
                $templateCache.put(scope.templateUrl(), template);
              });
                transcludeModalClone(
                  $compile(template)(scope.scope || scope, scope.controller()));
            } else
              transcludeModalClone(
                $compile(template)(scope.scope || scope, scope.controller()));
          } else
            transcludeModalClone(clone);

          function transcludeModalClone(clone) {
            var cloneScope = clone.scope();

            // Expose `.close` to transcluded scope
            cloneScope.$close = ctrl.close.bind(ctrl);
            cloneScope.$dismiss = ctrl.dismiss.bind(ctrl);

            // Transclude the element manually
            el.find('div').append(clone);

            // Listen for $destroy on transcluded element
            clone.on('$destroy', function() {
              // Cleanup on aisle `transclude`
              delete cloneScope.$close;

              if (modal) {
                modal = false;
                ctrl.close();
              }
            });
          }
        });
      }
    };
  })
;
