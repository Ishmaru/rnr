console.log('JS loaded!');

var instaPicsTemplate = `
  <ul class="collection">
    <% if (likes.length > 0) { %>
      <% likes.forEach(function(like, idx) { %>
        <div class="row">
          <div class="col s12 m7">
            <div class="card">
              <div class="card-image">
                <img src="<%= like[0] %>">
                <span class="card-title">Card Title</span>
              </div>
              <div class="card-content">
                <div style="width: 600px; height: 600px" id="map-<%= idx %>">
                  <span class="card-title activator grey-text text-darken-4">Card Title<i class="material-icons right">more_vert</i></span>
                  <% if (!like[1]) { %>
                    <p>Here is some more information about this product that is only revealed once clicked on.</p>
                  <% } %>
                </div>
              </div>
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
    console.log(likes)
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


// function renderPage(uri, next) {
//   $.ajax({
//     method: 'GET',
//     url:    uri
//   })
//   .then(function(data) {
//     // Render the template (mix it with the data) and then
//     // set it on the page!
//     var taskListHTML = renderInstaPics(data);
//     $('#insta-pics').html(taskListHTML);
//     // Then call the callback here to make sure it runs
//     // AFTER the page has rendered!
//     if (next) next();
//   });
// }

// // When the page loads!
// $(document).ready(function() {
//   renderInstaPics('/api/likes')
// });
