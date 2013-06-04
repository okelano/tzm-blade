jQuery(function($) {
    var setLng = $.url().param('setLng');
    var setLngCookie = $.cookie('i18next');
    var language;

    if (setLngCookie) {
        language = setLngCookie;
    } else {
        if (setLng) {
            language_complete = setLng.split("-");
        } else {
            language_complete = navigator.language.split("-");
        }

        language = (language_complete[0]);
    }

    $("#remember_me").click(function(e) {
      if ($("#remember_me").val() == "off"){
        $("#password").attr("disabled", true)
        $(".btn-continue").removeClass("hidden")
        $(".btn-login").addClass("hidden")
        $("#email").focus()
        $("#form_login_user").attr("action", "/user/create")
        $("#remember_me").val("on")
      }else{
        $("#password").attr("disabled", false)
        $(".btn-continue").addClass("hidden")
        $(".btn-login").removeClass("hidden")
        $("#form_login_user").attr("action", "/user/login")
        $("#remember_me").val("off")
      }
      console.log($("#form_login_user").attr("action"));
    })
    
    $('#save').click(function(cb) {
        $('#user_edit_profile').validate({
          rules: {
              name:{
                required: function(element) {
                    return $("#password_old").val() > 6;
                  }
              },
              password_old: {
                  required: false,
                  minlength: 6
              },
              password_new: {
                  required: function(element) {
                      return $("#password_old").val() > 6;
              },
                  minlength: 6,
              },
              password_confirm: {
                  required: function(element) {
                      return $("#password_new").val() > 6;
                    },
                  equalTo: "#password_new"
              }
          },
          messages: {
              name: {
                required: "Nothing to save, change any field to save"
              },
              password_old: {
                  minlength: "Your password must be at least 6 characters long"
                  ,required: "Enter your old password"
              },
              password_new: {
                  minlength: "Your password must be at least 6 characters long"
                  ,equalTo: "Please enter the same password as above"
                  ,required: "Enter your new password"
              },
              password_confirm: {
                  minlength: "Your password must be at least 6 characters long"
                  ,equalTo: "Please enter the same password as above"
                  ,required: "Enter your old password"
              }
          }
        })
    })  

    $('#login').click(function(cb) {
        $('#form_login_user').validate({
            rules:{
                email:{
                    email:true,
                    required: true
                },password:{
                    required: true,
                    minlength: 6 
                }
            },
            messages:{
                email:{
                    email:'Please enter a valid email',
                    required: 'Enter your email'
                },password:{
                    required: 'Password is required',
                    minlength: jQuery.format("At least {0} characters required!")
                }
            }
      })
    }) 
    $('#continue').click(function(cb) {
      $('#form_login_user').validate({
          rules:{
              email:{
                  email:true
                  ,required: true
              },password:{
                  required: false
              }
          },messages:{
              email:{
                email:'Please enter a valid email',
                required: 'Please enter your email'
              },password:{
                requried: 'password is not required'
              }
          }
      })
    })

    $('#reset').click(function(cb) {
        $('#form_reset_password').validate({
          rules: {
              password_new: {
                  required: true,
                  minlength: 6
              },
              password_confirm: {
                  required: function(element) {
                    return $("#password_new").val() > 6;
                  },  
                  equalTo: "#password_new"
              }
          },
          messages: {
              password_new: {
                  required: "Please provide a password",
                  minlength: "Your password must be at least 6 characters long"
              },
              password_confirm: {
                  required: "Please provide a password",
                  minlength: "Your password must be at least 6 characters long",
                  equalTo: "Please enter the same password as above"
              }
          }
        })
    })  
    function setLanguage() {
        // save to use translation function as resources are fetched
        $("title").i18n();
        $(".welcome").i18n();
        $("#nav-container").i18n();
        $(".project-select").i18n();
        $(".menu").i18n();
        $(".user-menu").i18n();
        $(".sub-section").i18n();
        $("#remember_me").i18n()
        $("#footer").i18n();
        $("#language-menu").hide();

    }

   // language selector
   $("li.language-menu").on("click", function() {
       $("#language-menu").toggle();
       return false;
   });
    $("#language-menu a").on("click", function() {
        var windowReload = false; // TRUE = reload the page; FALSE = do not reload the page
        var $this = $(this);
        var value = $this.attr("id");
        var arrValueParts = value.split("-");
        var language = arrValueParts[0];

        if (windowReload) {
            window.location.href = "/?lang=" + language;
        } else {
            console.log(language);
            i18n.setLng(language, location.reload());
            i18n.init({
                lng:language
                ,debug:true
            }, setLanguage);
        }

        $("#language-menu a").removeClass("selected-language");
        $this.addClass("selected-language");

        return false;
    });
});
