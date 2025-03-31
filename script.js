document.addEventListener('DOMContentLoaded', function() {
    // Observador de intersección para animaciones
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                entry.target.classList.add('fade-in-up');
                entry.target.classList.add('fade-in-left');
                entry.target.classList.add('fade-in-right');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observar todos los elementos con la clase animate-on-scroll
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Elementos del menú
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    // Menú principal móvil
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('show');
        this.innerHTML = navMenu.classList.contains('show') ? '✕' : '☰';
    });

    // Dropdowns de redes sociales
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdown = this.closest('.dropdown');
                dropdown.classList.toggle('active');
                
                // Cerrar otros dropdowns
                document.querySelectorAll('.dropdown').forEach(item => {
                    if (item !== dropdown) {
                        item.classList.remove('active');
                    }
                });
            }
        });
    });

    // Cerrar menús al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!e.target.closest('nav') && !e.target.closest('.menu-toggle')) {
            navMenu.classList.remove('show');
            document.querySelectorAll('.dropdown').forEach(item => {
                item.classList.remove('active');
            });
            menuToggle.innerHTML = '☰';
        }
    });

    // Cerrar menú al seleccionar una opción (solo móvil)
    document.querySelectorAll('#nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768 && !this.classList.contains('dropdown-toggle')) {
                navMenu.classList.remove('show');
                document.getElementById('menu-toggle').innerHTML = '☰';
            }
        });
    });

    // Manejo del formulario de contacto con Formspree
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const statusEl = document.getElementById('form-status');
            
            // Mostrar estado de carga
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
            statusEl.textContent = '';
            statusEl.className = '';
            
            try {
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: new FormData(this),
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    statusEl.textContent = '¡Mensaje enviado con éxito! Pronto nos pondremos en contacto.';
                    statusEl.className = 'success';
                    this.reset();
                    
                    // Ocultar el mensaje después de 5 segundos
                    setTimeout(() => {
                        statusEl.textContent = '';
                        statusEl.className = '';
                    }, 5000);
                } else {
                    throw new Error('Error en el envío');
                }
            } catch (error) {
                statusEl.textContent = 'Hubo un error al enviar el mensaje. Por favor, inténtalo nuevamente más tarde.';
                statusEl.className = 'error';
                console.error('Error:', error);
                
                // Ocultar el mensaje de error después de 5 segundos
                setTimeout(() => {
                    statusEl.textContent = '';
                    statusEl.className = '';
                }, 5000);
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Enviar Mensaje';
            }
        });
    }
});

// Actualizar el menú al cambiar el tamaño de la ventana
window.addEventListener('resize', function() {
    const navMenu = document.getElementById('nav-menu');
    const menuToggle = document.getElementById('menu-toggle');
    
    if (window.innerWidth > 768) {
        navMenu.classList.remove('show');
        document.querySelectorAll('.dropdown').forEach(item => {
            item.classList.remove('active');
        });
        menuToggle.innerHTML = '☰';
    }
});