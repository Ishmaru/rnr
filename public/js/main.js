console.log('JS loaded!');

var instaPicsTemplate = `
  <ul class="collection">
    <% if (instaPics.length > 0) { %>
      <% tasks.forEach(function(task) { %>
       <div class="row">
         <div class="col s12 m7">
           <div class="card">
             <div class="card-image">
               <img src="****IMAGE URL HERE!!!****">
               <span class="card-title">Card Title</span>
             </div>
             <div class="card-content">
               <p>****IMAGE TITLE HERE!!!****</p>
             </div>
             <div class="card-action">
               <a href="#">This is a link</a>
             </div>
           </div>
         </div>
       </div>
      <% }) %>
    <% } %>
  </ul>
`;

var renderInstaPics = _.template(instaPicsTemplate);

function renderPage(uri, next) {
  $.ajax({})
  .then(function(data) {
    var instaPicsHTML = renderInstaPics(data);
    $('#insta-pics').html(instaPicsHTML);
    if (next) next();
  });
}
