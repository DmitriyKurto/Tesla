angular.module('modal')
  .provider('modal', function() {
    this.$get = function($rootScope, $compile, $q, $document, $http, $templateCache) {
      return modalFn($rootScope, $compile, $q, $document, $http, $templateCache);
    };
  })
;

function modalFn($rootScope, $compile, $q, $document, $http, $templateCache) {
  return function modal(options) {
    var deferred = $q.defer();
    var template = options.template || $templateCache.get(options.templateUrl);

    if (!template) {
      $http.get(options.templateUrl).success(function(template) {
        $templateCache.put(options.templateUrl, template);
        modalize(template, options);
      });
    } else
      modalize(template, options);

    return deferred.promise;

    function modalize(template, options) {
      var scope = $rootScope.$new(true);
      var tEl = ['<div modal'];

      angular.forEach(options, function(val, attr) {
        scope[attr] = val;
        tEl.push(attr + '="' + attr + '"');
      });

      tEl.push('/>');
      var el = $compile(tEl.join(' '))(scope);

      scope = el.children().scope();
      scope.service = true;
      scope.promise.then(deferred.resolve, deferred.reject);

      $document.find('body').append(el);
    }
  };
}
