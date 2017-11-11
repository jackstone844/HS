// Selectors to control active classes using click event listeners
$(document).ready(function(){
    $('i').click(function(){
        $('i').removeClass("active");
        $(this).addClass("active");
    });
  });
  
  $(document).ready(function(){
    $('a').click(function(){
        $('a').removeClass("active");
        $(this).addClass("active");
    });
  });

// Collapse Navbar when a link is selected
$(document).ready(function(){
    $('.nav li a').click(function(){
        $('.navbar-collapse').collapse('hide');
    });
});