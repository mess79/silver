$(function() {

  let ids = function() {

    let obj = {
      id: $("#id").val(),
      account: $("#account").val(),
      order: $("#order").val(),
      delete_id: $("#delete_id").val(),
      invoice: $("#invoice").val(),
      company: $("#company").val(),
      name: $("#name").val(),
      host: $("#host").val(),
      from: $("#from").val(),
      to: $("#to").val(),
      for: $("#for").val(),
      item: $("#item").val()
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
        data = {
          username: 'add12@gmail.com',
          first_name: 'firstnames',
          surname: 'suranames',
          password: {
            salt: '18392949c7dd3e7429e8098848789858',
            hash: '$argon2d$v=19$m=4096,t=3,p=1$fyaWK+CDn3dRPKZ8cx7+6A$Y/AG1VH7do4c3J+DfRm03YatyLZxsVtoaN0HYhhnby0'
          },
          host: "5c79812bd457465751467ef9",
          role: 'client',
          account: ["5c3f93b67bd7e072659a703b"]
        };
        break;
      case "invoice":
        data = {
          "account": ["5c3ee21e8910d4572a56d613"],
          "person": ["5c327a5589ecdd4af7821c6a"],
          "address": {
            "line1": "1 test road",
            "line2": "test add line 2",
            "line3": "test add third line",
            "city": "test city",
            "county": "test county",
            "zip": "TEST21",
            "country": "UNITED TEST COUNTRY"
          },
          "line_item": [{
            "_id": "5c46278502423150314ad57d",
            "service": "test service",
            "quantity": 2,
            "amount": 50,
            "tax": 0.2
          }, {
            "_id": "5c46278502423150314ad57c",
            "service": "test service 2",
            "quantity": 4,
            "amount": 25,
            "tax": 0
          }],
        };
        break
      case "company":
        data = {
          "contact": ["5c3ee21e8910d4572a56d613"],
          "name": "test company",
          "address": [{
            "line1": "1 test road",
            "line2": "test add line 2",
            "line3": "test add third line",
            "city": "test city",
            "county": "test county",
            "zip": "TEST21",
            "country": "UNITED TEST COUNTRY"
          }],
          "domain": "test.com"
        };
        break;
      case "host":
        data = {
          name: ids().name,
          address: [{
            line1: "1 test road",
            line2: "testville",
            line3: "test town",
            city: "test city",
            county: "test county",
            zip: "TESTZIP",
            country: "UK"
          }],
          host: ids().host,
          email: "infotest@localhost.com"
        };
        break;
      case "person_data":
        data = {
          "account": [
            ids().account
          ],
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
      case "requirements":
        data = {
          "country_from": ids().from,
          "country_to": ids().to,
          "category": [{
            "purpose": ids().for,
            "requirement": [{
                "nationality": {
                  "countryCodes": [
                    "ESP",
                    "ITA"
                  ],
                  "exclude": true
                },
                "origin": [
                  "5c52025cfba160407062c19f"
                ],
                "link": "false",
                "quantity": 1,
                "variableInput": {
                  "pages": 2,
                  "validityMonths": 6
                }
              },
              {
                "nationality": {
                  "countryCodes": [
                    "ESP",
                    "ITA"
                  ],
                  "exclude": false
                },
                "origin": [
                  "5c515ecc6d0c353dba975830"
                ],
                "link": "false",
                "quantity": 1,
                "variableInput": {
                  "pages": 1,
                  "validityMonths": 3
                }
              }
            ]
          }]
        }
        break;
      case "requirements_host":
        data = {
          "host": "5ec849011ac58b247bb34526",
          "category": [{
            "purpose": ids().for,
            "requirement": [{
                "nationality": {
                  "countryCodes": [
                    "ESP",
                    "ITA"
                  ],
                  "exclude": true
                },
                "origin": [
                  "5c52025cfba160407062c19f"
                ],
                "link": "false",
                "quantity": 1,
                "variableInput": {
                  "pages": 2,
                  "validityMonths": 6
                }
              },
              {
                "nationality": {
                  "countryCodes": [
                    "ESP",
                    "ITA"
                  ],
                  "exclude": false
                },
                "origin": [
                  "5c515ecc6d0c353dba975830"
                ],
                "link": "false",
                "quantity": 1,
                "variableInput": {
                  "pages": 1,
                  "validityMonths": 3
                }
              }
            ]
          }]
        }
        break;
      case "requirement_item":
        data = {
          "variable": ["pages", "validityMonths"],
          "name": "Passport",
          "comment": "a test comment",
          "icon": "false",
          "description": "#pages pages spare and #validityMonths months left after travel"
        }
        break;
    }

    return data;
  };


  const hideshow = function(id) {
    $(".op").css({
      "display": "none"
    })
    $(id).each(function(i) {
      $(id[i]).css({
        "display": "inline-block"
      }).prev().css({
        "display": "inline-block"
      })
    })

  }

  $("#collection").on("change", function(event) {
    switch ($(this).val()) {
      case "order":
        urls = {
          get: "/order/" + ids().order,
          post: "/order/" + ids().order,
          put: "/order",
          patch: "/order/" + ids().order,
          delete: "/order/" + ids().order
        }
        hideshow(["#order", "#delete_id"])
        break
      case "account":
        urls = {
          get: "account/" + ids().account,
          post: "account/" + ids().account,
          put: "account",
          patch: "account/" + ids().account,
          delete: "account/" + ids().account
        }
        hideshow(["#account", "#delete_id"])
        break
      case "invoice":
        urls = {
          get: "/invoice/" + ids().invoice,
          post: "/invoice/" + ids().invoice,
          put: "/invoice",
          patch: "/invoice/" + ids().invoice,
          delete: "#"
        }
        hideshow(["#invoice", "#delete_id"])
        break
      case "person_data":
        urls = {
          get: "/person_data/options/origin_country/china/id/" + ids().id,
          post: "/person_data/options/origin_country/india/id/" + ids().id,
          put: "/person_data/options/origin_country/china",
          patch: "/person_data/options/origin_country/china/",
          delete: "/person_data/options/id/" + ids().delete_id
        }
        hideshow(["#id", "#delete_id"])
        break
      case "company":
        urls = {
          get: "/company/" + ids().company,
          post: "/company/" + ids().company,
          put: "/company/",
          patch: "/company/" + ids().company,
          delete: "/company/" + ids().company
        }
        hideshow(["#company", "#delete_id"])
        break
      case "host":
        urls = {
          get: "/host/" + ids().name,
          post: "/host/" + ids().name,
          put: "/host",
          patch: "/host",
          delete: "/host/" + ids().name
        }
        hideshow(["#host", "#delete_id"])
        break
      case "requirements":
        urls = {
          get: "/requirements/from/" + ids().from + "/to/" + ids().to,
          post: "/requirements/from/" + ids().from + "/to/" + ids().to,
          put: "/requirements",
          patch: "/requirements/from/" + ids().from + "/to/" + ids().to,
          delete: "/requirements/from/" + ids().from + "/to/" + ids().to
        }
        hideshow(["#from", "#to", "#for"])
        break
      case "requirements_host":
        urls = {
          get: "/requirements_host",
          post: "/requirements_host",
          put: "/requirements_host",
          patch: "/requirements_host",
          delete: "/requirements_host"
        }
        hideshow([])
        break
      case "requirement_item":
        urls = {
          get: "/requirement_item/" + ids().item,
          post: "/requirement_item/" + ids().item,
          put: "/requirement_item",
          patch: "/requirement_item/" + ids().item,
          delete: "/requirement_item/" + ids().item,
        }
        hideshow(["#item"])
        break
    }
  })

  $("#collection").trigger("change");

  $("input").on("change", function() {
    $("#collection").trigger("change");
  })

  function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  const headers = function() {
    let csrf = readCookie("csrf");
    return {
      "Authorization": csrf
    }
  }

  //console.log(headers());

  $(".get").on('click', function(event) {
    event.preventDefault();
    $.ajax({
      url: urls.get,
      type: 'GET',
      headers: headers(),
      success: function(result) {
        //console.log(data);
        $(".url").text(urls.get);
        $(".output").text(JSON.stringify(result, null, 4));
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
      headers: headers(),
      data: JSON.stringify(obj()),
      success: function(result) {
        //console.log(data);
        $(".url").text(urls.post);
        $(".output").text(JSON.stringify(result, null, 4));
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
      headers: headers(),
      data: JSON.stringify(obj()),
      success: function(result) {
        //console.log(data);
        $(".url").text(urls.patch);
        $(".output").text(JSON.stringify(result, null, 4));
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
      headers: headers(),
      data: JSON.stringify(obj()),
      success: function(result) {
        //console.log(result);
        $(".url").text(urls.put);
        $(".output").text(JSON.stringify(result, null, 4));
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
      headers: headers(),
      success: function(result) {
        $(".url").text(urls.delete);
        $(".output").text(JSON.stringify(result, null, 4));
      },
      cache: false,
      contentType: "application/json",
      processData: false
    });
  })
})
