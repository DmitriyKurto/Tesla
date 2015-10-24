/**
 * Created by Dima on 22.10.2015.
 */
;(function(){

    AccountCtrl.$inject = ['$location', 'AuthenticationService', 'FlashService'];
    function AccountCtrl($location, AuthenticationService, FlashService) {
        var vm = this;
        vm.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $location.path('/');
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        }
    }

            /*
                vm.form.userName = vm.loginForm.userName;
               vm.form.password = vm.loginForm.password;
               window.localStorage['vm.form'] = JSON.stringify(vm.form);
            };
                window.localStorage['vm.form'] = JSON.stringify(vm.form);
*/




    angular.module('Tesla.account',[])
        .controller('AccountCtrl', AccountCtrl);
}());