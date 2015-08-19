/**
 * Created by nickrickenbach on 8/11/15.
 */
var app = angular.module('BLANG', ['ngRoute', 'ngResource', 'ngSanitize', 'angularSpinner']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: HomeController,
            resolve: HomeController.resolve
        })
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: HomeController,
            resolve: HomeController.resolve
        })
        .when('/work/:work', {
            templateUrl: 'views/work.html',
            controller: WorkController,
            resolve: WorkController.resolve
        })
        .otherwise({
            redirectTo: '/'
        });
    $locationProvider.html5Mode(true);
}]);


app.run(['$rootScope', 'usSpinnerService', function ($rootScope, usSpinnerService) {
    $rootScope.startSpin = function (_spin) {
        usSpinnerService.spin(_spin);
    };
    $rootScope.stopSpin = function (_spin) {
        usSpinnerService.stop(_spin);
    };
}]);

app.run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location, $urlRouter) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {

    });
}]);



function getResolve(_url) {
    return {
        datasets  : function ($rootScope, $q, $http, $location) {

            if (TweenMax) {
                // showLoader
                TweenMax.to($('#main-overlay'), 0.5, { autoAlpha:1 });

                TweenMax.set($('#main-overlay').find('span'), {
                    marginTop:'0',
                    rotationZ:180
                });

                TweenMax.to($('#main-overlay').find('span'), 0.5, {
                    marginTop:'-65px',
                    rotationZ:0,
                    ease:'Cubic.easeInOut'
                });

                // start Spinner
                $rootScope.startSpin('spinner-main');

                var deferred = $q.defer();

                $http.get(_url).
                    success(function (data, status, headers, config) {
                        // hide Loader
                        TweenMax.to($('#main-overlay'), 0.5, { autoAlpha:0 });
                        TweenMax.to($('#main-overlay').find('span'), 0.5, {
                            marginTop:'-130px',
                            rotationZ:-180,
                            ease:'Cubic.easeInOut'
                        });
                        deferred.resolve(data);
                    }).
                    error(function (data, status, headers, config) {
                        // hide Loader
                        TweenMax.to($('#main-overlay'), 0.5, { autoAlpha:0 });
                        TweenMax.to($('#main-overlay').find('span'), 0.5, {
                            marginTop:'-130px',
                            rotationZ:-180,
                            ease:'Cubic.easeInOut'
                        });
                        deferred.resolve('error')
                    });

                return deferred.promise;

            }else {
                setTimeout(function () {
                    getResolve(_url);
                }, 200);
            }
        }
    }
}
