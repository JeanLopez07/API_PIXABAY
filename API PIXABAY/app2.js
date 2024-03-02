document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('searchForm').addEventListener('submit', function(event) {
      event.preventDefault(); 
    
      var category = document.getElementById('category').value;
    
      const apiKey = '42648195-f1f35dabb48d2eaa93682483a';
      const url = 'https://pixabay.com/api/?key=' + apiKey + '&q=' + encodeURIComponent(category);
    
      fetch(url)
        .then(response => response.json())
        .then(data => {

          var resultsDiv = document.getElementById('results');
          resultsDiv.innerHTML = ''; 
    
          data.hits.forEach(function(image) {
            var imgElement = document.createElement('img');
            imgElement.src = image.webformatURL; 
            imgElement.classList.add('clickable'); 
            resultsDiv.appendChild(imgElement); 
          });
  
          var clickableImages = document.querySelectorAll('.clickable');
          clickableImages.forEach(function(img) {
            img.addEventListener('click', function() {
              var modal = document.getElementById('imageModal');
              var modalImg = document.getElementById('expandedImg');
              modal.style.display = 'block';
              modalImg.src = this.src;
            });
          });
  
          var closeButton = document.getElementsByClassName('close')[0];
          closeButton.addEventListener('click', function() {
            var modal = document.getElementById('imageModal');
            modal.style.display = 'none';
          });
        })
        .catch(error => {
          console.error('Error al obtener los datos:', error);
        });
    });
  });
  