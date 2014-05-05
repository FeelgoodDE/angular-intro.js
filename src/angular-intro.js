var ngIntroDirective = angular.module('angular-intro',[]);

// TODO: Use isolate scope, but requires angular 1.2: http://plnkr.co/edit/a2c14O?p=preview
// See: http://stackoverflow.com/questions/18796023/in-a-directive-handle-calls-to-a-user-defined-method-name

ngIntroDirective.directive('ngIntroOptions', ['$timeout', '$parse', function ($timeout, $parse) {

    return {
        restrict: 'A',

        link: function(scope, element, attrs){

            scope[attrs.ngIntroMethod] = function(step) {

                if(typeof(step)=="string"){
                    var intro = introJs(step);
                }
                else{
                    var intro = introJs();
                }

                intro.setOptions(scope.$eval(attrs.ngIntroOptions));

                if(attrs.ngIntroOncomplete){
                    intro.oncomplete($parse(attrs.ngIntroOncomplete)(scope));
                }

                if(attrs.ngIntroOnexit){
                    intro.oncomplete($parse(attrs.ngIntroOnexit)(scope));
                }

                if(attrs.ngIntroOnchange){
                    intro.onchange($parse(attrs.ngIntroOnchange)(scope));
                }

                if(attrs.ngIntroOnbeforechange){
                    intro.onchange($parse(attrs.ngIntroOnbeforechange)(scope));
                }

                if(attrs.ngIntroOnafterchange){
                    intro.onchange($parse(attrs.ngIntroOnafterchange)(scope));
                }

                if(typeof(step)=="number") {
                    intro.goToStep(step).start();
                }
                else{
                    intro.start();
                }

            };


            if(attrs.ngIntroAutostart == "true"){
                $timeout(function() {
                    $parse(attrs.ngIntroMethod)(scope)();
                });
            }
        }
    }
}]);
