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
                <span class="card-title"><%= like[1].name %></span>
              </div>
              <div class="card-content">
                <div style="width: 300px; height: 250px" id="map-<%= idx %>">
                </div>
              </div>
            </div>
          </div>
        </div>
      <% }) %>
    <%} %>
  </ul>
`;

// var instaPicsTemplate = `
//     <% if (likes.length > 0) { %>
//       <% likes.forEach(function(like, idx) { %>
//         <ul class="row">
//           <li class="col l6 pull-l6">
//             <div class="card">
//               <div class="card-image"><img src="<%= like[0] %>"></div>
//             </div>
//           </li>
//           <li class="col l6 push-l6">
//             <div>
//               <div style="width: 300px; height: 300px" class="right" id="map-<%= idx %>"></div>
//             </div>
//           </li>
//           </ul>
//       <% }) %>
//     <%} %>
// `;

var renderInstaPics = _.template(instaPicsTemplate);

function render() {
  $.get('/api/likes', function(likes) {
    console.log(likes)
    $('#insta-pics').html(renderInstaPics({likes}));
    likes.forEach(function(like, idx) {
      if (like[1]) {
        var map = new google.maps.Map(document.getElementById('map-' + idx), {
          center: { lat: like[1].latitude,  lng: like[1].longitude },
          zoom:   14
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
