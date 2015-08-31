// Routes for site navigation
Router.route('/entry/j/', {name: 'entryJAbout'});
Router.route("/entry/j/about");
Router.route("/entry/j/residents");
Router.route("/entry/j/traditions");
Router.route("/entry/j/photos");

Template.jnav.events({
  "click .nav a":function(event, template){
    $(".nav").find(".active").removeClass("active");
    $(event.currentTarget).parent().addClass("active");
  },

  "click .navbar-brand":function(event, template){
    //console.log("clicked main");
    $(".nav").find(".active").removeClass("active");
    //$(".nav li")[0].addClass("active");                    // Does not work; should highlight about tab b/c is same.
  }
})

Template.entryJPhotos.events({
  "click .gallery-list li img":function(event, template){
    var src = event.currentTarget.src;
    var img = '<img src="' + src + '" class="img-responsive"/>';

    var index = $(event.currentTarget).parent("li").index();
    var html = "";
    html += img;
    html += '<div style="display:none;">';
    html += '<a class="controls previous" href="' + (index) + '">&laquo; prev</a>';
    html += '<a class="controls next" href="'+ (index+2) + '">next &raquo;</a>';
    html += '</div>';

    $("#photo-modal").modal();
    $("#photo-modal").on("shown.bs.modal", function(){
      $("#photo-modal .modal-body").html(html);
    });
    $("#photo-modal").on("hidden.bs.modal", function(){
      $("#photo-modal .modal-body").html("");
    });
  },

  "keydown":function(event, template){
    if (event.keyCode == 37){ /*left arrow */
      var href = $(".previous")[0].href;
      var index = href.substr(href.lastIndexOf('/') + 1);
      var src = $("ul.row li:nth-child("+ index +") img")[0].src;
      $(".modal-body img").attr("src", src);

      var newPrevIndex = Math.max(1, parseInt(index) - 1);
      var newNextIndex = Math.min($("#main-gallery li").length, parseInt(newPrevIndex) + 2);

      $(".previous").attr('href', newPrevIndex);
      $('.next').attr('href', newNextIndex);
    }
    else if (event.keyCode == 39){ /*right arrow */
      var href = $(".next")[0].href;
      var index = href.substr(href.lastIndexOf('/') + 1);
      var src = $("ul.row li:nth-child("+ index +") img")[0].src;
      $(".modal-body img").attr("src", src);

      var newPrevIndex = Math.max(1, parseInt(index) - 1);
      var newNextIndex = Math.min($("#main-gallery li").length, parseInt(newPrevIndex) + 2);

      $(".previous").attr('href', newPrevIndex);
      $('.next').attr('href', newNextIndex);
    }
  }
})