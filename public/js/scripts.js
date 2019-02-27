$(function() {

  let ids = function() {

    let obj = {
      id: $(".id").val(),
      account: $(".account").val(),
      order: $(".order").val(),
      delete_id: $(".delete_id").val()
    }
    return obj;
  }

  let obj = function() {
    let data = {}
    switch ($("#collection").val()) {
      case "order":
        data = {
          "person": [
            "5c75b99ac156991ef68802b5"
          ],
          "invoice": [
            "5c46278502423150314ad57b"
          ],
          "account": [
            ids().account
          ],
          "delivery_address": {
            "line1": "1 test road",
            "line2": "test add line 2",
            "line3": "test add third line",
            "city": "test city",
            "county": "test county",
            "zip": "TEST21",
            "country": "UNITED TEST COUNTRY"
          },
          "requirements": [{
            "name": "passport",
            "quantity_received": 1,
            "status": [{
              "received": false,
              "comment": "awaiting docs"
            }]
          }],
          "closed": false,
        };
        break;
      case "account":
        data = {};
        break;
      case "invoice":
        data = {};
        break
      case "company":
        data = {};
        break;
      case "person_country":
        data = {
          "first_name": "test",
          "surname": "case2",
          "china": {
            "previous_nationality": "FRE"
          },
          "india": {
            "previous_nationality": "USA"
          }
        }
        break;
    }
    return data;
  };

  //  const order = {

  //}

  $("#collection").on("change", function(event) {
    switch ($(this).val()) {
      case "order":
        urls = {
          get: "/order/" + ids().order,
          post: "/order/"  + ids().order,
          put: "/order",
          patch: "/order",
          delete: "/order"
        }
        break
      case "account":
        urls = {
          get: "#",
          post: "#",
          put: "#",
          patch: "#",
          delete: "#"
        }
        break
      case "invoice":
        urls = {
          get: "#",
          post: "#",
          put: "#",
          patch: "#",
          delete: "#"
        }
        break
      case "person_country":
        urls = {
          get: "/person_country/options/country/china/id/" + ids().id,
          post: "/person_country/options/country/india/id/" + ids().id,
          put: "/person_country/options/country/china",
          patch: "/person_country/options/country/china/",
          delete: "/person_country/options/id/" + ids().delete_id
        }
        break
      case "company":
        urls = {
          get: "#",
          post: "#",
          put: "#",
          patch: "#",
          delete: "#"
        }
        break
    }
  })

  $("#collection").trigger("change");
  $("input").on("change", function() {
    $("#collection").trigger("change");
  })

  $(".get").on('click', function(event) {
    event.preventDefault();
    $.ajax({
      url: urls.get,
      type: 'GET',
      success: function(data) {
        console.log(data);
        $(".url").text(urls.get);
        $(".output").text(JSON.stringify(data, null, 4));
      },
      cache: false,
      contentType: "application/json",
      processData: false
    });
  })

  $(".post").on('click', function(event) {
    event.preventDefault();
    $.ajax({
      url: urls.post,
      type: 'POST',
      data: JSON.stringify(obj()),
      success: function(data) {
        console.log(data);
        $(".url").text(urls.post);
        $(".output").text(JSON.stringify(data, null, 4));
      },
      cache: false,
      contentType: "application/json",
      processData: false
    });
  })

  $(".patch").on('click', function(event) {
    event.preventDefault();
    $.ajax({
      url: urls.patch,
      type: 'PATCH',
      data: JSON.stringify(obj()),
      success: function(data) {
        console.log(data);
        $(".url").text(urls.patch);
        $(".output").text(JSON.stringify(data, null, 4));
      },
      cache: false,
      contentType: "application/json",
      processData: false
    });
  })

  $(".put").on('click', function(event) {
    event.preventDefault();
    console.log(urls.put)
    $.ajax({
      url: urls.put,
      type: 'PUT',
      data: JSON.stringify(obj()),
      success: function(data) {
        console.log(data);
        $(".url").text(urls.put);
        $(".output").text(JSON.stringify(data, null, 4));
      },
      cache: false,
      contentType: "application/json",
      processData: false
    });
  })

  $(".delete").on('click', function(event) {
    event.preventDefault();
    $.ajax({
      url: urls.delete,
      type: 'DELETE',
      success: function(data) {
        console.log(data);
        $(".url").text(urls.delete);
        $(".output").text(JSON.stringify(data, null, 4));
      },
      cache: false,
      contentType: "application/json",
      processData: false
    });
  })
})
