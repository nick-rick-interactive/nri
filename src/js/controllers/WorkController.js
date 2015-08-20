/**
 * Created by nickrickenbach on 8/11/15.
 */
function WorkController ($scope, $http, $sce, datasets) {
    console.log($http());
    //$scope.work = datasets.work;
    //$scope.categories = datasets.categories;
};
WorkController.resolve = getResolve('src/handler.php?section=work');
