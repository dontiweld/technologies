  paymode = "NEFT / RTGS";

var content = "";


function submitRequest() {

  $("#cart-empty-error").html("Cart is empty, please choose at least one item").hide('blind');

    content = "";

    var f = $("#order-form").find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children('input').each(function() { // runs for each input with type text
      
      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });


    f.children('textarea').each(function() { // runs for all textarea elements

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });

    if(cart_count == 0){
      $("#cart-empty-error").html("Cart is empty, please choose at least one item").show('blind');
      return false;
    }

    if (ferror) return false;
    else{

      // all validation successfull, proceed to build email

      var m = {};
      
      var f = $("#order-form").find('.form-group');
      f.children().each(function() {
        if($(this).val() != '')
          m[$(this).attr("name")] = $(this).val();
      });

      m["Mode of Payment"] = paymode;

      content = "mailto:dontiweld@gmail.com?subject=[Order Request] For " + m["Customer Name"] + " on " + new Date() + "&body=";
      for(key in m){
        content += key + ":  " + m[key] + "\n";
      }

      content += "\nRequested Items:\n\n";

      for(var i=0; i < cart.length; i++){
        if(cart[i].added == 0) continue;
        content +=  cart[i].name + " - \t\t " + cart[i].type + " - \t\t [" + cart[i].quantity + " per box]\t\t " + "x " + cart[i].added + " box(s)\n\n"
      }

      content += "\n\n[IMPORTANT information for recipient: This is an automatically generated request on behalf of the customer, payment has not been made yet. You must either accept or reject this order request by replying to this email and providing the following information:\n\n1. Is the delivery location within your servicable area?\n2. Do the requested items meet the minimum order quantity for the delivery area?\n3. If you are rejecting the request, please mention so giving reason.\n4. If you are accepting the order, provide a date and time for delivery/shipment, and ask for a confirmation from the customer. \n5. If you are accepting the order request, and if the customer has chosen NEFT/RTGS payment mode, you can provide your bank information.]";

      window.open(encodeURI(content));

    }

    return false;
}



function payMode(li){
  $("li.pm-active").removeClass("pm-active");
  li.classList.add("pm-active");
  paymode = li.textContent;
}



var portfolioIsotopeCart = null;

function attachCartFilter(){
  // Porfolio isotope and filter
  portfolioIsotopeCart = $('.portfolio-container.in-cart').isotope({
    itemSelector: '.item-cart'
  });

  $('#cart-flters li').on( 'click', function() {
    $("#cart-flters li").removeClass('filter-active');
    $(this).addClass('filter-active');

    portfolioIsotopeCart.isotope({ filter: $(this).data('filter') });
  });
}


function openCart(){

  $("#react-cart-modal").show();
  $("#product-details-modal").hide();

  changeurl('cart');

  $("#modal").modal("show");

  $("#cart-flters li").removeClass('filter-active');
  $("#cart-flters li:first-child").addClass('filter-active');

  portfolioIsotopeCart.isotope({ filter: $("#cart-flters.filter-active").data('filter') });

}

var cart;
var cart_count = 0;

function setCart(cart_products){
  cart = cart_products;

  cart_count = 0;
  
  for(var i=0; i < cart.length; i++){
    if(cart[i].added > 0) cart_count++;
  }

  if(cart_count != 0)
    $("#cart-size").html("(" + cart_count + ")");
  else
    $("#cart-size").html("");
}
