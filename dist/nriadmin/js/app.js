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
        .when('/projects', {
            templateUrl: 'views/projects.html',
            controller: ProjectsController,
            resolve: WorkController.resolve
        })
        .when('/projects/:project', {
            templateUrl: 'views/project.html',
            controller: ProjectController,
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

app.directive('workimg',function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            console.log('found');
            element.find('img.bg-img-hide').bind('load', function() {
                element.removeClass("inactive");
                //TweenMax.to(element,1,{opacity:1});
                TweenMax.to(element.parent().parent().find(".spinner"),1,{opacity:0});
                $(".site").scroll($rootScope.workScroll);
            });
        }
    };
});



function getResolve(_url) {
    return {
        datasets  : function ($rootScope, $q, $http, $location, $route) {
            _url = ($route.current.params.project) ? _url+"&project="+$route.current.params.project : _url;
            if (TweenMax) {
                // showLoader
                TweenMax.to($('#main-overlay'), 0.2, { autoAlpha:1 });

                TweenMax.set($('#main-overlay').find('span'), {
                    marginTop:'0',
                    opacity:0,
                    rotationX:90
                });

                TweenMax.to($('#main-overlay').find('span'), 0.5, {
                    marginTop:'-65px',
                    rotationX:0,
                    opacity:1,
                    ease:'Cubic.easeInOut',
                    delay:0.2
                });

                // start Spinner
                $rootScope.startSpin('spinner-main');

                var deferred = $q.defer();
                TweenMax.to($(".site"),0.5,{scrollTop:0,onComplete:function() {


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
