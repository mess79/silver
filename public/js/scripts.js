$(function() {

  const id = "5c327a5589ecdd4af7821c6a"
  const deleteId = "5c328284408b6250b1788523"
  const obj = {
    "first_name": "test",
    "surname": "case2",
    "china" : {
      "previous_nationality" : "FRE"
    },
    "india" : {
      "previous_nationality" : "USA"
    }
  }

  $("#get").on('click', function(event) {
    event.preventDefault();
    $.ajax({
      url: "/api/options/country/china/id/" + id,
      type: 'GET',
      //data: JSON.stringify(obj),
      success: function(data) {
        console.log(data);
      },
      cache: false,
      contentType: "application/json",
      processData: false
    });
  })

  $("#post").on('click', function(event) {
    event.preventDefault();
    $.ajax({
      url: "/api/options/country/india/id/" + id,
      type: 'POST',
      data: JSON.stringify(obj),
      success: function(data) {
        console.log(data);
      },
      cache: false,
      contentType: "application/json",
      processData: false
    });
  })

  $("#patch").on('click', function(event) {
    event.preventDefault();
    $.ajax({
      url: "/api",
      type: 'PATCH',
      data: JSON.stringify(obj),
      success: function(data) {
        console.log(data);
      },
      cache: false,
      contentType: "application/json",
      processData: false
    });
  })

  $("#put").on('click', function(event) {
    event.preventDefault();
    $.ajax({
      url: "/api/options/country/china/",
      type: 'PUT',
      data: JSON.stringify(obj),
      success: function(data) {
        console.log(data);
      },
      cache: false,
      contentType: "application/json",
      processData: false
    });
  })

  $("#delete").on('click', function(event) {
    event.preventDefault();
    $.ajax({
      url: "/api/options/id/" + deleteId,
      type: 'DELETE',
      //data: JSON.stringify(obj),
      success: function(data) {
        console.log(data);
      },
      cache: false,
      contentType: "application/json",
      processData: false
    });
  })


})
