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
    //$locationProvider.html5Mode(true);
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
        datasets  : function ($rootScope, $q, $http, $location, $route) {
            _url = ($route.current.params.work) ? _url+"&project="+$route.current.params.work : _url;
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
                TweenMax.to($("body, html"),0.5,{scrollTop:0,onComplete:function() {

                $("#main-alt").css({left:"0",position:"relative"}).html($("#main").html());
                $("#main").css({left:"100%",position:"absolute"}).html("");


                    $http.get(_url).
                        success(function (data, status, headers, config) {
                            // hide Loader
                                TweenMax.to($('#main-overlay'), 0.5, {autoAlpha: 0});
                                TweenMax.to($('#main-overlay').find('span'), 0.5, {
                                    marginTop: '-130px',
                                    rotationZ: -180,
                                    ease: 'Cubic.easeInOut'
                                });
                            deferred.resolve(data);
                            $("#main-alt").css({top:$("#main").offset().top+"px",position:"absolute"});
                            $("#main").css({top:"0",position:"relative"});
                            TweenMax.to($("#main"),0.5,{left:"0"});
                            TweenMax.to($("#main-alt"),0.5,{left:"-100%"});
                        }).
                        error(function (data, status, headers, config) {
                            // hide Loader
                            TweenMax.to($('#main-overlay'), 0.5, {autoAlpha: 0});
                            TweenMax.to($('#main-overlay').find('span'), 0.5, {
                                marginTop: '-130px',
                                rotationZ: -180,
                                ease: 'Cubic.easeInOut'
                            });
                            deferred.resolve('error')
                        });

                }});

                return deferred.promise;

            }else {
                setTimeout(function () {
                    getResolve(_url);
                }, 200);
            }
        }
    }
}
