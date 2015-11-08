(ng-)Modal
===

> Modals, the Angular way.

---

**modal** is built to be familiar, yet delightfully different, allowing you to
incorporate CSS3 into your ng-friendly modal windows.


## Installation

* Grab the package from your favorite package manager

```sh
npm install ng-modal --save

# or

bower install ngmodal --save

# or

git clone https://github.com/zzmp/modal.git
```

* Add the necessary scripts to your file

```html
<link href="/modal/modal.css" rel="stylesheet" type="text/css" />
<script src="/modal/index.js"></script>
```

* Add the **modal** module to your dependency list

```js
angular.module('application', ['modal']);
```


## Using **modal**

**modal** can be used in the view or as a service, depending on your preference.

### Use it in your _View_

```html
<body ng-app="application">
    <div><!-- ... --></div>
    <!-- Display a modal when $rootScope.modal === true -->
    <div modal ng-if="modal">
        <div class="prettyPopup">
            <span>I am a modal!</span>
            <button ng-click="closeModal()">Close</button>
        </div>
    </div>
    <script>
      angular.module('application', ['modal'])
        .controller('head', function($rootScope) {
          $rootScope.closeModal = function() {
            $rootScope.modal = false;
          };
          $rootScope.modal = true;
        });
    </script>
</body>
```

* Your view will be transcluded, so it will retain its scope/controller.

* _Make sure your modal is a direct child of the body._
  This allows the stylesheet to format the background properly.

* _Prefer to use ngIf over ngShow or ngHide._

### Use it in your _Controller_

```js
angular.module('application')
  .controller('modalMakerCtrl', function(modal) {
    var modalPromise = modal({
      template: '<span>I am a modal!</span>', // or templateUrl
      controller: modalCtrl
    });

    modalPromise.then(
      function() { /* modal is closed */ },
      function() { /* modal is dismissed */ });
  });
```

* Invoking `modal` returns a promise:

 * The promise is resolved when the modal invokes `$scope.$close`.

 * The promise is rejected when the modal is dismissed (`esc` or clicked off).


## Configuration

Whether you use **modal** as a view or a service, the options will be the same:

##### width

* The width of the enclosing modal _not yet implemented, can be overridden in CSS_

##### height

* The height of the enclosing modal _not yet implemented, can be overridden in CSS_

##### template/templateUrl

* The template view to transclude into the modal

##### scope

* The scope from which to create a new childScope for your transcluded view

##### controller

* The controller for your transcluded view
