function elementFadeIn(target){
    $("#"+target).addClass('animated fadeIn');
    $("#"+target).show();
}
  
function elementFadeOut(target){
    $("#"+target).removeClass();
    $("#"+target).addClass('animated fadeOut elemento_oculto');
    $("#"+target).show();
}
  
function elementFlipIn(target){
    $("#"+target).addClass('animated flipInY');
    $("#"+target).show();
}
  
function elementSlideInLoop(target){
    $("#"+target).addClass('animated slideInLeft infinite');
    $("#"+target).show();
}

function elementSlideInLoopRight(target){
    $("#"+target).addClass('animated slideInRight infinite');
    $("#"+target).show();
}

function elementBounceIn(target){
    $("#"+target).addClass('animated bounceIn');
    $("#"+target).show();
}

function elementFadeInRight(target){
    $("#"+target).addClass('animated fadeInRight');
    $("#"+target).show();
}
