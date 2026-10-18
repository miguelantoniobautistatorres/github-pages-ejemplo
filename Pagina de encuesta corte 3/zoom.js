const containers = document.querySelectorAll('.zoom-container');

containers.forEach(container => {
  const img = container.querySelector('.zoomImage');
  let scale = 1;
  const minScale = 1;
  const maxScale = 3;

  container.addEventListener('wheel', (e) => {
    e.preventDefault(); // Evita el scroll de la página

    // Obtener la posición del cursor dentro del contenedor
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calcular el porcentaje del cursor respecto al tamaño de la imagen
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    // Ajustar el punto de origen del zoom hacia donde está el cursor
    img.style.transformOrigin = `${xPercent}% ${yPercent}%`;

    // Determinar la dirección del zoom (acercar o alejar)
    if (e.deltaY < 0) {
      scale = Math.min(scale + 0.2, maxScale);
    } else {
      scale = Math.max(scale - 0.2, minScale);
    }

    // Aplicar escala; si vuelve a 1, centrar el origen
    if (scale === minScale) {
      img.style.transformOrigin = 'center center';
    }

    img.style.transform = `scale(${scale})`;
  });

  // Opcional: reiniciar el zoom al salir del contenedor
  container.addEventListener('mouseleave', () => {
    scale = 1;
    img.style.transform = 'scale(1)';
    img.style.transformOrigin = 'center center';
  });
});