/**
 * Created by nickrickenbach on 8/11/15.
 */
function HomeController ($scope, $http, $sce, datasets) {
    console.log($http);
    /*$scope.trustHTML = function(_html){
        return $sce.trustAsHtml(_html);
    }*/
    $("body").append($("<hr class='marker m1'/>"));
    $("body").append($("<hr class='marker m2'/>"));

    function workOver(){
        TweenMax.to($(this), 0.5, {rotationY:0});
    }
    function workOut(){
        workScroll();
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
        $(this).bind("mouseover",workOver);
        $(this).bind("mouseout",workOut);
        //$(this).bind("transitionend webkitTransitionEnd oTransitionEnd",workScroll);
    });
    function workScroll(){
        var i = 0;
        var wh = $(window).height();
        var wbt = $(".work-blocks").offset().top;
        var st = $(document).scrollTop();
        var count = 0;

        // P1 is top point
        // P2 equals entry point on bottom of page.

        // Points on page where object will enter center
        var m1 = (wh-(wh/10*2));
        var m2 = (wh-(wh/10*9));

        $(".marker.m1").css({top:m1+"px"});
        $(".marker.m2").css({top:m2+"px"});

        $(".work-block").each(function(){
            var ot = Math.round($(this).offset().top);

            // Enter points
            var p1 = ot+m1;
            var p2 = ot+m2;

            // Exit screen points
            var p1o = p1+$(this).height();
            var p2o = p2+$(this).height();

            // Real Scroll Point
            var sp = st+wh;

            // Is at point
            var ap1 = (sp<p1);// start tilt in
            var ap2 = (sp<p2);// end tilt in
            var ap1o = (sp<p1o);// end tilt in
            var ap2o = (sp<p2o);// end tilt out

            // Perc of enter and exit points
            var prc1 = ((sp)-p1)/((sp)-p1o);
            var prc2 = ((sp)-p2)/((sp)-p2o);

            var ot1 = ot-wh/1.5;
            var ot2 = ot-wh/10+$(this).height()/2;

            var perc = Math.abs(st/ot1);
            var perc2 = Math.abs(st/ot2);

            if(count==2){
                //console.log(prc1+" "+prc2+" "+ap1+" "+ap2+' '+(sp));
                //console.log(p1+" "+p1o+" "+((p1-(sp))/(p1o-(sp)))*-1);
                //console.log(p2+" "+p2o+" "+((p2-(sp))/(p2o-(sp)))*-1);
            }

            var rotY;
            /*if(perc>1&&perc2<1){
                rotY = 0;
                if(count==0)console.log('tier1');
            }else{
                if(perc>=0&&perc2<=1){
                    if(count==0)console.log('tier2');
                    if(perc>1){
                        rotY = 0;
                    }else if(perc<0){
                        rotY = (i==0) ? 90 : -90;
                    }else{
                        rotY = (i==0) ? 90-(perc*90) : -90+(perc*90);
                    }
                }else if(perc2>1){
                    if(count==0)console.log('tier3');
                    if(perc2<1){
                        rotY = 0;
                    }else if(perc2>2){
                        rotY = (i==0) ? 90 : -90;
                    }else{
                        rotY = (i==0) ? 90-((1-(perc2-1))*90) : -90+((1-(perc2-1))*90);
                    }
                }
            }*/
            //if(count==2){
                console.log(sp+" "+p2o+" "+p2);
                if(sp<p1&&sp>p2o){
                    console.log("inside");
                    rotY = 0;
                }else{
                    if(sp<p2o&&sp>p2){
                        console.log("bottom tilt in");
                        rotY = (i==0) ? 90-(prc1*90) : -90+(prc1*90);
                    }else if(sp<p1o&&sp>p1){
                        console.log("top tilt out");
                        rotY = (i==0) ? 90-((1-(prc2-1))*90) : -90+((1-(prc2-1))*90);
                    }else{
                        console.log("outside");
                        rotY = (i==0) ? 90 : -90;
                    }
                }
            //}

            if(count==0){
                //console.log((perc>1)+" "+(perc2<1));
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
