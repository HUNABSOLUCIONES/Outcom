var no_slide = 1;
var primer_slide=true;
var init_slide = 1;
var totalSlide = 14; /* se asigan el total de slide para la operacion de la barra superior */
var porcentaje = (no_slide * 100)/totalSlide; /* calculo de la barra de porcentaje :  no_slide * 100 / totalslides */
var audio= document.getElementById("audio");
var audio_positions=new Array();

function obtenerPorcentaje(){   
    porcentaje = (no_slide * 100)/totalSlide;
}

/*actualiza la barra de estado de las diapositivas*/
function book(){
    obtenerPorcentaje();
    $('.marcador').attr('style', 'width:'+porcentaje+'%'); /* Se asigna el tamaño a la barra superior con la funcion obtenerporcentaje */
}


function getSlide(){
    $.ajax({
        url:'html/s'+no_slide+'.html',
        type : 'GET', 

        error : function(xhr, status) {
            alert('Disculpe, existió un problema'); 
        }, 

        complete : function(xhr, status) {
            $('.wrapper').html(xhr.responseText);
            bandera = true;
        } 
    });
}

function playAudio(){
    $("#audio").trigger('play');
}

function pauseAudio(){
    $("#audio").trigger('pause');
}


function endSlide(){
    pauseAudio();
    $( "#audio" ).unbind();
    $(".clickAqui").show();
    $('.pause').fadeOut();
    $('.dis_play').fadeIn();
    $(".next").fadeIn();
    setTimeout(function(){
        $(".dis_next").fadeOut(); 
    },1000);
    $(".gris").fadeIn();
    

}

function startSlide(){
    audio_positions.push(audio.currentTime);
    if ($(".dis_play").is(":visible") == true) { 
        $(".dis_play").fadeOut();
    }
    if ($(".play").is(":visible") == true) { 
        $(".play").fadeOut();
    }

    if ($(".pause").is(":visible") != true) { 
        $(".pause").fadeIn();
    }

    if ($(".next").is(":visible") == true) { 
        $(".next").fadeOut();
    }

    if ($(".gris").is(":visible") == true) { 
        $(".gris").fadeOut();
    }

    if ($(".clickAqui").is(":visible") == true) { 
        $(".clickAqui").fadeOut();
    }

    if ($(".dis_next").is(":visible") != true) { 
        $(".dis_next").fadeIn();
    }
    $("#slide").show();
    playAudio();
}

$('body').on('click', '.next', function(event) {
    if(primer_slide){primer_slide=false;}else{no_slide = no_slide+1;}
    //no_slide = no_slide+1;
    if(no_slide===2)$(".botonera").removeClass('ocultar');
    if(no_slide>1)$(".wrapper").fadeOut(200);
    getSlide(); 
    setTimeout(function(){
        $('.wrapper').show();
    },1500);
    
    book();
});

$('body').on('click', '.prev', function(event) {
    pauseAudio();
    $("#audio").unbind();
    if(no_slide>1){
        no_slide = no_slide-1;
        $("#audio").prop("currentTime",audio_positions[no_slide-2]);
    }
    
    if(no_slide==1){
        $(".botonera").addClass('ocultar');
        $("#audio").prop("currentTime",0);
        audio_positions = new Array();
    }

    $(".wrapper").fadeOut(200);

    getSlide();

    setTimeout(function(){
        $('.wrapper').show();
    },2000);

    book();
});

$('body').on('click', '.reset', function(event) {

    $(".wrapper").fadeOut(200);
    no_slide=2;
    getSlide();
    $("#audio").prop("currentTime",0);
    audio_positions=new Array();

    setTimeout(function(){
        $('.wrapper').show();
    },2000);


    book();


});

$('body').on('click', '.play', function(event) {

    playAudio();
    $('.play').fadeOut();
    $('.pause').fadeIn();

});

$('body').on('click', '.pause', function(event) {

    pauseAudio();

    $('.pause').fadeOut();
    $('.play').fadeIn();

});

$('body').on('click', '.submenu', function(event) {
    var variableData = $(this).data("sub");
    console.log(variableData);
    no_slide=variableData;

    $('.contenedor_control').hide();
    $('.wrapper').html();
    $('.bandera').hide();

    setTimeout(function(){
        $('.contenedor_control').fadeIn();
    },2000);        

    $.ajax({
        url:'html/s'+no_slide+'.html',
        type : 'GET', 

        error : function(xhr, status) {
            alert('Disculpe, existió un problema'); 
        }, 

        complete : function(xhr, status) {

             
            book();
            $('.wrapper').html(xhr.responseText);
        } 
    });

});



$('#black_play').on('click', function(){ $('.negro').hide();});

$('document').ready(function() {
    book();
    $.ajaxSetup({ cache:false });

    


    setTimeout(function() {
        $(".primer").toggle("slow");
        $(".precarga").toggle("fast");
        $(".top").show();
    }, 500);
});