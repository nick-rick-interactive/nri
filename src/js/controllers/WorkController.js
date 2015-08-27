/**
 * Created by nickrickenbach on 8/11/15.
 */
function WorkController ($scope, $http, $sce, $routeParams, datasets) {
    console.log(datasets)
    $scope.project = datasets.project;

    $scope.$on('$viewContentLoaded', function() {
        prevView = $("#main").html();
        newView = $("#view").html();
        switchViews('work');
    });
};
WorkController.resolve = getResolve('src/handler.php?section=work');
