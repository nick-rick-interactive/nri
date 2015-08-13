/**
 * Created by nickrickenbach on 8/11/15.
 */
function HomeController ($scope, $http, $sce, datasets) {
    console.log($http);
    /*$scope.trustHTML = function(_html){
        return $sce.trustAsHtml(_html);
    }*/

    function workOver(){
        //TweenMax.to($(this), 0.5, {height:"400px",onUpdate:workScroll});
    }
    function workOut(){
        //TweenMax.to($(this), 0.5, {height:"",onUpdate:workScroll});
    }
    var i = 0;
    $(".work-block").each(function(){
        var to = (i==0) ? "left 50%" : "right 50%";
        var rot = (i==0) ? 90 : -90;
        var crot = (i==1) ? 0 : 180;
        TweenMax.set($(this), { rotationY:rot, transformOrigin:to, transformPerspective:600 });
        TweenMax.set($(this).find(".cover-grad"), { rotationZ:crot, transformOrigin:"50% 50%", transformPerspective:1000 });
        if(i==1){
            $(this).addClass('alt');
        }
        i = (i==0) ? 1 : 0;
        //$(this).bind("mouseover",workOver);
        //$(this).bind("mouseout",workOut);
        $(this).bind("transitionend webkitTransitionEnd oTransitionEnd",workScroll);
    });
    function workScroll(){
        var i = 0;
        var wh = $(window).height();
        var st = $(document).scrollTop();
        var count =0;
        $(".work-block").each(function(){
            var ot1 = $(this).offset().top-wh/1.5;
            var ot2 = $(this).offset().top-wh/10+$(this).height()/2;
            var perc = Math.abs(st/ot1);
            var perc2 = Math.abs(st/ot2);
            var rotY;
            if(perc>1&&perc2<1){
                rotY = 0;
            }else{
                if(perc>=0&&perc2<=1){
                    if(perc>1){
                        rotY = 0;
                    }else if(perc<0){
                        rotY = (i==0) ? 90 : -90;
                    }else{
                        rotY = (i==0) ? 90-(perc*90) : -90+(perc*90);
                    }
                }else if(perc2>1){
                    if(perc2<1){
                        rotY = 0;
                    }else if(perc2>2){
                        rotY = (i==0) ? 90 : -90;
                    }else{
                        rotY = (i==0) ? 90-((1-(perc2-1))*90) : -90+((1-(perc2-1))*90);
                    }
                }
            }
            if(count==0){
                console.log(perc+" "+perc2+" "+(perc2-1));
            }
            perc = (perc>0) ? perc : 0;
            perc = (perc>1||perc<0) ? 1 : perc;
            TweenMax.to($(this), 0.2, { rotationY:rotY });
            //TweenMax.set($(this).find(".work-bg-img"), { css:{transform:"translateY(" + (0-wh-(ot-st-wh/6))/1.5 + "px)" }});
            //TweenMax.to($(this).find(".work-bg-img"), 0.2, { css:{transform:"translateY(" + ((ot-st-wh/6)) + "px)" }});
            TweenMax.to($(this).find(".cover-grad"), 0.2, { /*width:((1-perc)*100)+"%",*/ opacity:(1-perc) });
            i = (i==0) ? 1 : 0;
            count++;
        });
    }
    $(document).scroll(workScroll);
    workScroll();
};
HomeController.resolve = getResolve('src/handler.php?section=home');
