document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const mainMenu = document.getElementById('mainMenu');
    
    if (menuToggle && mainMenu) {
        // Función para alternar el menú
        function toggleMenu() {
            const isOpen = mainMenu.classList.contains('active');
            mainMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Cambiar el ícono del botón
            if (isOpen) {
                menuToggle.innerHTML = '☰';
                menuToggle.setAttribute('aria-label', 'Abrir menú');
                menuToggle.setAttribute('aria-expanded', 'false');
            } else {
                menuToggle.innerHTML = '✕';
                menuToggle.setAttribute('aria-label', 'Cerrar menú');
                menuToggle.setAttribute('aria-expanded', 'true');
            }
        }
        
        // Evento clic en el botón hamburguesa
        menuToggle.addEventListener('click', toggleMenu);
        
        // Cerrar menú al hacer clic en un enlace
        const menuLinks = mainMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Solo cerrar en dispositivos móviles
                if (window.innerWidth <= 768) {
                    toggleMenu();
                }
            });
        });
        
        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = mainMenu.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnToggle && window.innerWidth <= 768) {
                if (mainMenu.classList.contains('active')) {
                    toggleMenu();
                }
            }
        });
        
        // Cerrar menú al presionar Escape
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && mainMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
        
        // Cerrar menú al redimensionar la ventana
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                // Restaurar estado normal en pantallas grandes
                if (mainMenu.classList.contains('active')) {
                    mainMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                    menuToggle.innerHTML = '☰';
                    menuToggle.setAttribute('aria-label', 'Abrir menú');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    }
});