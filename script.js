document.addEventListener('DOMContentLoaded', () => {
  const map = document.getElementById('warehouse-map');
  const infoTable = document.getElementById('info-table');
  const markers = [];

  map.addEventListener('click', (event) => {
    const x = event.offsetX;
    const y = event.offsetY;
    const description = prompt('Ingrese la descripción del camión:');
    if (description) {
      addMarker(x, y, description);
    }
  });

  function addMarker(x, y, description) {
    // Crear el div que funcionará como la chincheta en el mapa
    const markerEl = document.createElement('div');
    markerEl.classList.add('marker');
    // Ajustar las coordenadas para que el centro de la chincheta corresponda a la posición del clic
    markerEl.style.left = (x - 10) + 'px'; // 10px es la mitad del ancho de la chincheta
    markerEl.style.top = (y - 10) + 'px'; // 10px es la mitad de la altura de la chincheta
  
    // Crear el tooltip para la descripción
    const tooltip = document.createElement('span');
    tooltip.classList.add('tooltip');
    tooltip.textContent = description;
    markerEl.appendChild(tooltip);
  
    // Añadir el evento para mostrar el tooltip
    markerEl.onmouseover = function() {
      tooltip.style.visibility = 'visible';
    };
    markerEl.onmouseout = function() {
      tooltip.style.visibility = 'hidden';
    };
  
    // Añadir la chincheta al contenedor del mapa
    document.getElementById('map-container').appendChild(markerEl);
  
    // Guardar referencia del marcador
    markers.push({ x, y, description, element: markerEl });
    updateTable();
  }

  function updateTable() {
    // Limpiar la tabla y luego rellenar con las filas actualizadas
    infoTable.innerHTML = `
      <tr>
        <th>Descripción</th>
        <th>Eliminar</th>
      </tr>`;
  
    // Recorrer todos los marcadores y agregarlos a la tabla
    markers.forEach((marker, index) => {
      // Crea una nueva fila
      const row = infoTable.insertRow();
      
      // Define el contenido de la fila con la descripción y el botón de eliminar
      row.innerHTML = `
        <td>${marker.description}</td>
        <td><button onclick="removeMarker(${index})">&#x1F5D1;</button></td>
      `;
  
      // Asignar eventos para mostrar y ocultar el tooltip
      row.onmouseover = () => showTooltip(index);
      row.onmouseout = () => hideTooltip(index);
    });
  }

  // Recorrer todos los marcadores y agregarlos a la tabla
  markers.forEach((marker, index) => {
    // Crea una nueva fila
    const row = infoTable.insertRow();
    
    // Define el contenido de la fila con la descripción y el botón de eliminar
    row.innerHTML = `
      <td>${marker.description}</td>
      <td><button onclick="removeMarker(${index})">&#x1F5D1;</button></td>
    `;

    // Asignar eventos para mostrar y ocultar el tooltip
    row.onmouseover = () => showTooltip(index);
    row.onmouseout = () => hideTooltip(index);
  });
  
  function showTooltip(index) {
    const marker = markers[index];
    if (marker) {
      const tooltip = marker.element.querySelector('.tooltip');
      tooltip.style.visibility = 'visible';
    }
  }
  
  function hideTooltip(index) {
    const marker = markers[index];
    if (marker) {
      const tooltip = marker.element.querySelector('.tooltip');
      tooltip.style.visibility = 'hidden';
    }
  }

  window.removeMarker = function(index) {
    const marker = markers[index];
    marker.element.remove(); // Elimina el marcador del mapa
    markers.splice(index, 1); // Elimina el marcador del array
    updateTable(); // Reconstruye la tabla sin el marcador eliminado
  };

});
