/**
 * Created by nickrickenbach on 8/11/15.
 */
function HomeController ($rootScope, $scope, $http, $sce, datasets) {
    console.log(datasets.projects);

    $scope.projects = datasets.projects;

    $scope.$on('$viewContentLoaded', function(){
        prevView = $("#main-alt").html();
        newView = $("#view").html();
        switchViews('home');
        var i = 0;
        $(".work-block").each(function(){
            var to = (i==0) ? "left 50%" : "right 50%";
            var rot = (i==0) ? 90 : -90;
            var crot = (i==1) ? 0 : 180;
            TweenMax.set($(this), { rotationY:rot, transformOrigin:to, transformPerspective:600 });
            TweenMax.set($(this).find(".cover-grad"), { rotationZ:crot, transformOrigin:"50% 50%", transformPerspective:1000 });
            i = (i==0) ? 1 : 0;
            //$(this).bind("transitionend webkitTransitionEnd oTransitionEnd",workScroll);
        });
        $(".site").scroll($rootScope.workScroll);
        $(document).resize($rootScope.workScroll);
        $(document).bind("orientationchange",$rootScope.workScroll);
        setTimeout($rootScope.workScroll,100);
    });
};
HomeController.resolve = getResolve('src/handler.php?section=home');
