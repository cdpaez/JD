document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
  });
});

document.querySelectorAll('.btn-comprar').forEach(boton => {
  boton.addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = 'productos.html';
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  const resetBtn = document.getElementById('reset-filters');
  const checkboxes = document.querySelectorAll('.filter-options input[type="checkbox"]');
  const productCards = document.querySelectorAll('.product-card');
  
  // Función para aplicar filtros
  function applyFilters() {
      const searchTerm = searchInput.value.toLowerCase();
      const selectedPrices = Array.from(document.querySelectorAll('input[name="price"]:checked')).map(cb => cb.value);
      const selectedBrands = Array.from(document.querySelectorAll('input[name="brand"]:checked')).map(cb => cb.value);
      const selectedProcessors = Array.from(document.querySelectorAll('input[name="processor"]:checked')).map(cb => cb.value);
      
      productCards.forEach(card => {
          const price = parseFloat(card.dataset.price);
          const brand = card.dataset.brand;
          const processor = card.dataset.processor;
          const title = card.querySelector('h3').textContent.toLowerCase();
          const specs = card.querySelector('.specs').textContent.toLowerCase();
          
          // Verificar búsqueda
          const matchesSearch = searchTerm === '' || 
              title.includes(searchTerm) || 
              specs.includes(searchTerm);
          
          // Verificar precios
          const matchesPrice = selectedPrices.length === 0 || 
              selectedPrices.some(range => {
                  const [min, max] = range.split('-').map(Number);
                  return price >= min && price <= max;
              });
          
          // Verificar marcas
          const matchesBrand = selectedBrands.length === 0 || 
              selectedBrands.includes(brand);
          
          // Verificar procesadores
          const matchesProcessor = selectedProcessors.length === 0 || 
              selectedProcessors.some(proc => processor.includes(proc));
          
          // Mostrar/ocultar según coincidencias
          if (matchesSearch && matchesPrice && matchesBrand && matchesProcessor) {
              card.classList.remove('filtered');
          } else {
              card.classList.add('filtered');
          }
      });
  }
  
  // Event listeners
  searchBtn.addEventListener('click', applyFilters);
  searchInput.addEventListener('keyup', function(e) {
      if (e.key === 'Enter') applyFilters();
  });
  
  checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', applyFilters);
  });
  
  resetBtn.addEventListener('click', function() {
      // Limpiar checkboxes
      checkboxes.forEach(checkbox => {
          checkbox.checked = false;
      });
      
      // Limpiar búsqueda
      searchInput.value = '';
      
      // Aplicar filtros (mostrar todos)
      applyFilters();
  });
});