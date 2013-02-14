/*
 * jQuery Footers
 * Ivo Jesus, 2012
 */

(function($) {
  //----------------------------------------------------------------------------
  var defaults = {
    position: "end_of_page", // end_of_page, pinned
    alignment: "centered", // full_width, centered
  };
  //----------------------------------------------------------------------------
  var helpers = {
    //----------------------------------------------------------------------------
    locals: function(footer, prefs){
      var spacer = helpers.add_spacer(footer);
      return {
        options:     $.extend({}, defaults, prefs),
        win_height:  $(window).height(),
        body_height: $("body").height(),
        body_width:  $("body").width(),
        footer: footer,
        spacer: spacer
      };
    },
    //----------------------------------------------------------------------------
    add_spacer: function(footer){
      var spacer = $("<div class='FooterSpacer'></div>").css({
        height: $(footer).height(),
        width : $(footer).width(),
        visibility: "hidden",
      });
      $(footer).before(spacer);

      return spacer;
    },
    //----------------------------------------------------------------------------
    // this is the current scope (locals).
    set_end_of_page: function(){
      if (this.body_height < this.win_height){
        helpers.set_pinned.apply(this);
        $(this.spacer).show();
      }else{
        $(this.footer).css({"position":"static"});
        $(this.footer).css({"left": "auto", "margin": "auto"});
        $(this.spacer).hide();
      }
    },
    //----------------------------------------------------------------------------
    set_pinned: function(){
      if (this.options.alignment == "centered"){
        var w = $(this.footer).width();
        $(this.footer).css({"left": "50%", "margin-left": -w/2});
      }else
        $(this.footer).css({width: "100%"});

      $(this.footer).css({
        "position": "fixed", "bottom": "0px"
      });
    }
  };

  //----------------------------------------------------------------------------
  $.fn.footer = function(prefs){
    return this.each(function(){
      if (prefs && prefs.width)
        $(this).width(prefs.width);
      else
        if ($(this).width() == $(this).parent().width())
          $(this).width($(this).parent().width());

      var locals = helpers.locals(this, prefs);

      helpers["set_" + locals.options.position].apply(locals);
      $(window).resize(function(){
        locals.win_height = $(window).height();
        helpers["set_" + locals.options.position].apply(locals);
      });
    });
  };
  //----------------------------------------------------------------------------
})(jQuery);
