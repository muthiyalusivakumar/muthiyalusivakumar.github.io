
    (function($) {
    $('body').scrollspy({
        target: '.dotted-scrollspy'
    });

    // initialize lightbox 
    $(function() {
        $("#mdb-lightbox-ui").load("mdb-addons/mdb-lightbox-ui.html");
    });

    $('#collapseEx a').click(function(e) {
        $('#collapseEx').collapse('hide');
    });
 
  
    /* WOW.js init */

    new WOW().init();
     $('#portfolio a').not(".btn").each(function() {
	     var a = new RegExp('/' + window.location.host + '/');
	     if(!a.test(this.href)) {
	         $(this).click(function(event) {
	             event.preventDefault();
	             event.stopPropagation();
	             window.open(this.href, '_blank');
	         });
	     }
     });
    
    var submitted = false;
    $('#gform').on('submit', function(e) {
        $('#gform *').fadeOut(2000);
        $('#gform').prepend('Your submission has been processed...');
    });

   

    $('.ddd').ripples({
        resolution: 512,
        dropRadius: 20,
        perturbance: 0.04,
        interactive: false
    });

    // Automatic drops
    setInterval(function() {
        var $el = $('.ddd');
        var x = Math.random() * $el.outerWidth();
        var y = Math.random() * $el.outerHeight();
        var dropRadius = 20;
        var strength = 0.04 + Math.random() * 0.04;

        $el.ripples('drop', x, y, dropRadius, strength);
    }, 400);


    // Contact form validation
    var form = $('.col-md-8 mb-r');
    form.submit(function() {
        'use strict',
        $this = $(this);
        $.post($(this).attr('action'), function(data) {
            $this.prev().text(data.message).fadeIn().delay(3000).fadeOut();
        }, 'json');
        return false;
    }); 



    /* Isotope Implementation */

    var $container = $('#portfolio');

    /* Isotope Implementation with masonry  */

    //  $container.imagesLoaded(function() {      
    $container.isotope({
        // options
        filter: '.design',
        itemSelector: '.grid-item',
        layoutMode: 'fitRows'
    });
    // }); 

    var $optionSets = $('#filters .filter-options'),
        $optionLinks = $optionSets.find('a');
    console.log($optionSets);
    $optionLinks.click(function() {
        var $this = $(this);
        // don't proceed if already selected
        if ($this.hasClass('selected')) {
            return false;
        }
        var $optionSet = $this.parents('.filter-options');
        $optionSet.find('.selected').removeClass('selected');
        $this.addClass('selected');

        // make option object dynamically, i.e. { filter: '.my-filter-class' }
        var options = {},
            key = $optionSet.attr('data-option-key'),
            value = $this.attr('data-option-value');
        // parse 'false' as false boolean
        value = value === 'false' ? false : value;
        options[key] = value;
        if (key === 'layoutMode' && typeof changeLayoutMode === 'function') {
            // changes in layout modes need extra logic
            changeLayoutMode($this, options)
        } else {
            // otherwise, apply new options
            $container.isotope(options);
        }

        return false;
    });

})(jQuery);
