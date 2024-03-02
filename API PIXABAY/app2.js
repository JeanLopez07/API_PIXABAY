document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('searchForm').addEventListener('submit', function(event) {
      event.preventDefault(); // Evita el envío del formulario
    
      // Obtener el valor del campo de categoría
      var category = document.getElementById('category').value;
    
      // Hacer una petición a la API de Pixabay
      const apiKey = '42648195-f1f35dabb48d2eaa93682483a';
      const url = 'https://pixabay.com/api/?key=' + apiKey + '&q=' + encodeURIComponent(category);
    
      fetch(url)
        .then(response => response.json())
        .then(data => {
          // Mostrar los resultados en el div de resultados
          var resultsDiv = document.getElementById('results');
          resultsDiv.innerHTML = ''; // Limpiar resultados anteriores
    
          data.hits.forEach(function(image) {
            var imgElement = document.createElement('img');
            imgElement.src = image.webformatURL; // Utiliza la URL de la imagen de tamaño completo
            imgElement.classList.add('clickable'); // Agregar clase clickable para identificar las imágenes clicables
            resultsDiv.appendChild(imgElement); // Agregar la imagen al contenedor de resultados
          });
  
          // Agregar el evento de clic a todas las imágenes clicables
          var clickableImages = document.querySelectorAll('.clickable');
          clickableImages.forEach(function(img) {
            img.addEventListener('click', function() {
              var modal = document.getElementById('imageModal');
              var modalImg = document.getElementById('expandedImg');
              modal.style.display = 'block';
              modalImg.src = this.src;
            });
          });
  
          // Agregar el evento de clic para cerrar el modal
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
  