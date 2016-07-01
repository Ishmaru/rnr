console.log('JS loaded!');

var instaPicsTemplate = `
  <ul class="collection">
    <% if (likes.length > 0) { %>
      <% likes.forEach(function(like, idx) { %>
        <div>
          <div class="col s12 m6 l6">
            <div class="card">
              <div class="card-image">
                <img src="<%= like[0] %>">
                <% if (like[1] !== null) { %>
                  <div class="card-title">
                    <span class=" white-text"><%= like[1] ? like[1].name : "" %></span><br/>
                    <small class="font-weight: 200"> by <%= like[2] %> </small>
                  </div>
                <% } %>
              </div>
              <% if (like[1] !== null) { %>
                <div class="card-content">
                  <div style="max-width: 695px; height: 150px" id="map-<%= idx %>">
                  </div>
                </div>
              <% } %>
            </div>
          </div>
        </div>
      <% }) %>
    <%} %>
  </ul>
`;


var renderInstaPics = _.template(instaPicsTemplate);

function render() {
  $.get('/api/likes', function(likes) {
    console.log(likes);
    $('#insta-pics').html(renderInstaPics({likes}));
    likes.forEach(function(like, idx) {
      if (like[1]) {
        var map = new google.maps.Map(document.getElementById('map-' + idx), {
          center: { lat: like[1].latitude,  lng: like[1].longitude },
          zoom:   12
        });
        new google.maps.Marker({
          position: { lat: like[1].latitude,  lng: like[1].longitude },
          map: map,
          title: like[1].name
        });
      }
    })
  })
};

$(function() {
  $(".edit").on( "click", function(){
    $(".name-form").removeClass("hide");
    $("#Welcome").addClass("hide");
    swapButton($(this));
  })

  $('.unique').on('click', '.submit', function() {
    var selectedId = $(this).attr('id');
    var updateUserName = {name: $('#first_name2').val()};
    editUsername(selectedId, updateUserName);
    $(".name-form").addClass("hide");
    $('span#Welcome').text(`Welcome, ${updateUserName.name}`);
    $("#Welcome").removeClass("hide");
  })
})

function swapButton(button) {
  if (button.hasClass('edit')) {
    button.removeClass('edit');
    button.addClass('submit');
  } else if (button.hasClass('submit')) {
    button.removeClass('submit');
    button.addClass('edit');
    // editUserName()
  }
};

function editUsername(id, editUserdata) {
  $.ajax({
    type: 'PUT',
    url: `/api/users/${id}`,
    data: editUserdata
  }).then(function(user) {
    console.log(user);
  }, function(err) {
    console.log(err);
  });
}


