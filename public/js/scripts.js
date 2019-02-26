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
  
  const obj = {
    "first_name": "test",
    "surname": "case2",
    "china": {
      "previous_nationality": "FRE"
    },
    "india": {
      "previous_nationality": "USA"
    }
  }

  $("#collection").on("change", function(event) {
    switch ($(this).val()) {
      case "order":
        urls = {
          get: "/order/" + ids().order,
          post: "/order",
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
          put: "/person_country",
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
      data: JSON.stringify(obj),
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
      data: JSON.stringify(obj),
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
    $.ajax({
      url: urls.put,
      type: 'PUT',
      data: JSON.stringify(obj),
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
