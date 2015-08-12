/**
 * Created by nickrickenbach on 8/11/15.
 */
function HomeController ($scope, $http, $sce, datasets) {
    console.log($http);
    /*$scope.trustHTML = function(_html){
        return $sce.trustAsHtml(_html);
    }*/
};
HomeController.resolve = getResolve('src/handler.php?section=home');