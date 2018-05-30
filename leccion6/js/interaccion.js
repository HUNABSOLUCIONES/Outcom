var no_slide = 1;
var primer_slide=true;
var init_slide = 1;
var totalSlide = 11; /* se asigan el total de slide para la operacion de la barra superior */
var porcentaje = (no_slide * 100)/totalSlide; /* calculo de la barra de porcentaje :  no_slide * 100 / totalslides */




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



$('body').on('click', '.next', function(event) {
    //if(primer_slide){primer_slide=false;}else{no_slide = no_slide+1;}
    no_slide = no_slide+1;
    if(no_slide>1)$(".wrapper").fadeOut(200);
    getSlide(); 
    setTimeout(function(){
        $('.wrapper').show();
    },1500);
    
    book();
});

$('body').on('click', '.prev', function(event) {
    $('.contenedor_control').hide();

    setTimeout(function(){
        $('.contenedor_control').fadeIn();
    },2000);

    if (inicio != true) {
        no_slide = no_slide - 1;
    } else {
        inicio = false;
    }

    $.ajax({
        url:'html/s'+no_slide+'.html',
        type : 'GET', 

        error : function(xhr, status) {
            alert('Disculpe, existió un problema'); 
        }, 

        complete : function(xhr, status) {
            
            book();
            $('.wrapper').html(xhr.responseText);
            if ($('.temp').length > 0) {
                $('.temp').each(function() {
                    var nombre = $(this).data('nombre'); 
                    var tiempo = $(this).data('tiempo'); 
                    console.log('nombre ' + nombre); 
                    console.log('tiempo ' + tiempo); 
                    temporizador(nombre, tiempo); 
                }); 
            } else {
            }
        
        } 
    });

});

$('body').on('click', '.reset', function(event) {

    $('.wrapper').empty();
    $('.s2_n2').stop(true);
    $('.zoomIn').stop(true);
    $('.wrapper').empty();
    

    $.ajax({
        url:'html/s'+no_slide+'.html',
        type : 'GET',
        timeout: 10000,
        error : function(xhr, status) {
            alert('Disculpe, existió un problema'); 
        }, 

        complete : function(xhr, status) {
            
            
            $('.wrapper').html(xhr.responseText);

        } 
    });

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
    }, 1500);
});