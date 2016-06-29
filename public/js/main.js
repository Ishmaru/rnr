console.log('JS loaded!');

// var instaPicsTemplate = `
//   <ul class="collection">
//     <% if (instaPics.length > 0) { %>
//       <% tasks.forEach(function(task) { %>
//        <div class="row">
//          <div class="col s12 m7">
//            <div class="card">
//              <div class="card-image">
//                <img src="****IMAGE URL HERE!!!****">
//                <span class="card-title">Card Title</span>
//              </div>
//              <div class="card-content">
//                <p>****IMAGE TITLE HERE!!!****</p>
//              </div>
//            </div>
//          </div>
//        </div>
//       <% }) %>
//     <% } %>
//   </ul>
// `;
function render() {
  var instaPics = $.get('/api/likes', function(){
    var pics      = instaPics.responseJSON;
    var img       = $(`<img src=${pics[0][0]} />`);
    $('body').append(img);
  })
};


// var renderInstaPics = _.template(instaPicsTemplate);
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
