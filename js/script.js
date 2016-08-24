/**
 * Created by Vatos on 23/08/16.
 */
$(document).ready(function(){
    //Left carousel for choose the goals
    var carouselLeft = $("#carouselNumberLeft");
    //Right carousel for choose the goals
    var carouselRight = $("#carouselNumberRight");

    var options = {
        items : 10, //10 items above 1000px browser width
        itemsDesktop : [1000,1], //5 items between 1000px and 901px
        itemsDesktopSmall : [900,1], // betweem 900px and 601px
        itemsTablet: [600,1], //2 items between 600 and 0
        itemsMobile : false, // itemsMobile disabled - inherit from itemsTablet option
        autoplay: false,
        pagination: false,
        rewindNav: false,
        addClassActive: true,
        singleItem: true,
        afterMove:function(ev){
            if($(ev).find('.item.remove').length > 0){
                $(ev).data('owlCarousel').removeItem(0);
            }
        }
    };

    //Constructor of left carousel
    carouselLeft.owlCarousel(options);
    //Constructor of right carousel
    carouselRight.owlCarousel(options);

    // Custom carousel Navigation Events
    $(".next").click(function(){
        var target = $($(this).data('target'));
        target.trigger('owl.next');
    });

    $(".prev").click(function(){
        var target = $($(this).data('target'));
        target.trigger('owl.prev');
    });
    //End of custom carousel navigation events

    //Click on carousel for non touch devices
    $('.owl-carousel').on('click', function(){
        $(this).focus();
        $('#inputNumberModal').data('target', '#'+this.id);
        $('#inputNumberModal').data('value', $(this).find('.owl-item.active').index());
        $('#inputNumberModal').modal('show');
    });

    //Mousewheel = mouse scroll event to change the numbers
    $('.owl-carousel').on('mousewheel', function(e){
        if(e.originalEvent.wheelDelta /120 > 0) {
            $(e.currentTarget).trigger('owl.prev');
        }
        else{
            $(e.currentTarget).trigger('owl.next');
        }
    });

    //Called when input number modal show
    $('#inputNumberModal').on('show.bs.modal', function(){
        var value = $('#inputNumberModal').data('value');
        $(this).find('select.selNumber').val(value+'');
        $(this).find('select.selNumber').focus();
    });

    //Confirmation to change the goal number
    $('#inputNumberModal #btnApply').on('click', function(){
        var target = $($('#inputNumberModal').data('target'));
        var toSelectValue = parseInt($('#inputNumberModal select.selNumber').val());
        //Check if needs to remove the "-"
        if(target.find('.item.remove').length > 0){
            target.data('owlCarousel').removeItem(0);
        }

        var activeValue = target.find('.owl-item.active').index();
        if(activeValue > toSelectValue){
            var diff = activeValue - toSelectValue;
            for(var i=0; i< diff; i++){
                target.trigger('owl.prev');
            }
        }else if(activeValue < toSelectValue){
            var diff = toSelectValue - activeValue;
            for(var i=0; i< diff; i++){
                target.trigger('owl.next');
            }
        }
        showMessageModal("You have selected "+toSelectValue+" goals");
    });

    //Simple function to show a message modal
    function showMessageModal(message){
        $('#messageModal .modal-body').html('<p>'+message+'</p>');
        $('#messageModal').modal('show');
    }
});