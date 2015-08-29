/**
 * Created by nickrickenbach on 8/11/15.
 */
function WorkController ($scope, $http, $sce, $routeParams, datasets) {
    var video;
    $scope.project = datasets.project;

    $scope.$on('$viewContentLoaded', function() {
        prevView = $("#main").html();
        newView = $("#view").html();
        switchViews('work');
        video = $("video")[0];
        $scope.timer = setInterval(function() {
            if(video){
                if (video.ended || video.paused) {
                    video.play();
                }
            }
        },100);
    });
};
WorkController.resolve = getResolve('src/handler.php?section=work');
