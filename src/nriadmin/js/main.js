var isTop = true;
var prevView;
var newView;
function headerSwap() {
    var st = $(".site").scrollTop();
    var nt = 400;
    if(st>nt){
        if(isTop){
            isTop = false;
            TweenMax.set($(".mobile-header"),{marginTop:"-100px"});
            TweenMax.to($(".mobile-header"),0.3,{marginTop:"0",padding:"5px 20px"});
        }
    }else{
        if(!isTop){
            isTop = true;
            TweenMax.to($(".mobile-header"),0.2,{marginTop:"-100px",padding:""});
        }
    }
}
function switchViews(){
    //$("#main").html(newView);
}
jQuery(document).ready(function() {
    $(".site").bind("scroll",headerSwap);
});