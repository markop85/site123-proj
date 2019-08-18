let S123_TASK = function() {
  let that = {};
  that.init = async function() {
    let url = new URL(window.location.href);
    let id = url.searchParams.get("id");
    S123_TASK.form();

    if (parseInt(url.searchParams.get("id")) != NaN && id > 0) {
      const data = await $.ajax({
        type: "POST",
        dataType: "json",
        url: "get_form.php",
        data: { id: id }
      });

      if (data.code == "200") {
        let user = JSON.parse(data.user.all_data);
        S123_TASK.form(
          user.name,
          user.lastName,
          user.email,
          user.phone,
          user.siteName
        );
        S123_TASK.formValidation();
      } else {
        console.log("error");
      }
    } else {
      S123_TASK.formValidation();
    }
  };

  return that;
};

S123_TASK.formValidation = function() {
  "use strict";
  window.addEventListener(
    "load",
    function() {
      let forms = document.getElementsByClassName("needs-validation");
      Array.prototype.filter.call(forms, function(form) {
        form.addEventListener(
          "submit",
          async function(event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            } else {
              let id =
                new URL(window.location.href).searchParams.get("id") || null;
              event.preventDefault();
              const data = await $.ajax({
                type: "POST",
                dataType: "json",
                url: "save_form.php",
                data: {
                  name: $("#name").val(),
                  lastName: $("#last-name").val(),
                  email: $("#email").val(),
                  phone: $("#phone").val(),
                  siteName: $("#site-address").val(),
                  id: id
                }
              });
              if (data.code == "200") {
                S123_TASK.form();
              } else {
                console.log("error");
              }
            }
            form.classList.add("was-validated");
          },
          false
        );
      });
    },
    false
  );
};

S123_TASK.form = function(
  firstName = "",
  lastName = "",
  email = "",
  phone = "",
  siteAddress = ""
) {
  $(document).ready(function() {
    $(".image-link").magnificPopup({
      type: "image",
      gallery: { enabled: true }
    });
  });
  $(".container").html("");
  let form = `
  <div class="jumbotron jumbotron-fluid">
    <div class="jumbo">
      <h1 class="display-4">Photographer Contact Us Form</h1>
      <p class="lead">Please fill all the fields to complete the
        registration process. Your next step will be to choose a unique template and start
        building your own website for free
      </p>
    </div>
  </div>

  <form class="needs-validation" id="form" novalidate>
    <div class="form-row mobile-layout">
      <div class="form-group col-md-6">
        <input type="text" class="form-control" value="${firstName}" id="name" placeholder="First Name" required>
        <div class="valid-feedback">
          Looks good!
        </div>
        <div class="invalid-feedback">
            Please enter yout first name.
        </div>
      </div>
      <div class="form-group col-md-6">
        <input type="text" class="form-control" value="${lastName}" id="last-name" placeholder="Last name" required>
        <div class="valid-feedback">
          Looks good!
        </div>
        <div class="invalid-feedback">
            Please enter yout last name.
        </div>
      </div>
    </div>
      <div class="form-group">
        <input type="email" class="form-control" value="${email}" id="email"  placeholder="Email" pattern='/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/' required>
        <div class="valid-feedback">
          Looks good!
        </div>
        <div class="invalid-feedback">
          Please provide a valid Email.
        </div>
      </div>
      <div class="form-group">
        <input type="text" class="form-control" value="${phone}" id="phone" pattern="^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$" placeholder="Phone">
        <div class="invalid-feedback">
          Please provide a valid phone number.
        </div>
      </div>
      <div class="form-group">
        <input type="text" class="form-control" value="${siteAddress}" id="site-address" placeholder="Site Address" pattern='^(ftp|http|https):\/\/[^ "]+$'>
        <div class="invalid-feedback">
          Please provide a valid url.
        </div>
        <div class="valid-feedback">
          Looks good!
        </div>
      </div>
      <button class="btn btn-primary submit-btn" type="submit">Submit form</button>
  </form>

    <div class="image-container">
      <a href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsvoqimlkcr9zP6PwmhglC74nDJL3__N80yxhNBHlejJvzvofV" class="with-caption image-link" title="The caption 1">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsvoqimlkcr9zP6PwmhglC74nDJL3__N80yxhNBHlejJvzvofV" width="320" height="220" />  
      </a>
      <a href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr8JBP9UWKsCxrhnkdXBZoGySSQQMTXYD1zLlDQJSUVJbV7fGn" class="with-caption image-link" title="The caption 2">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr8JBP9UWKsCxrhnkdXBZoGySSQQMTXYD1zLlDQJSUVJbV7fGn" width="320" height="220" />  
      </a>
      <a href="https://images.pexels.com/photos/368893/pexels-photo-368893.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" class="with-caption image-link" title="The caption 2">
        <img src="https://images.pexels.com/photos/368893/pexels-photo-368893.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"  width="320" height="220" />  
      </a>
    </div>
  `;

  $(".container").append(form);
};

S123_TASK().init();
