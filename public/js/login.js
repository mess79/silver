$(function() {
  $.fn.serializeFormJSON = function() {

    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
      if (o[this.name]) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || '');
      } else {
        o[this.name] = this.value || '';
      }
    });
    return o;
  };

  $("#logon, #register").on("click", function(event) {
    event.preventDefault()
    let self = $(this).closest("form")
    if (self.length > 0) {
      let url = self.attr("action");
      var data = self.serializeFormJSON();
      $.ajax({
        url: url,
        type: 'POST',
        data: JSON.stringify(data),
        success: function(result) {
          console.log(result);
        },
        cache: false,
        contentType: "application/json",
        processData: false
      });
    }
  })
  $("#logoff").on("click", function(event){
    event.preventDefault()
    $.ajax({
      url: "/logoff",
      type: 'POST',
      //data: JSON.stringify(data),
      success: function(result) {
        console.log(result);
      },
      cache: false,
      contentType: "application/json",
      processData: false
    });
  })
})
