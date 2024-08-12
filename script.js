document.addEventListener('DOMContentLoaded', function() {
    // Desplazamiento suave para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Carrusel de testimonios
    const testimoniosSlider = document.querySelector('.testimonios-slider');
    let isDown = false;
    let startX;
    let scrollLeft;

    testimoniosSlider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - testimoniosSlider.offsetLeft;
        scrollLeft = testimoniosSlider.scrollLeft;
    });

    testimoniosSlider.addEventListener('mouseleave', () => {
        isDown = false;
    });

    testimoniosSlider.addEventListener('mouseup', () => {
        isDown = false;
    });

    testimoniosSlider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - testimoniosSlider.offsetLeft;
        const walk = (x - startX) * 2;
        testimoniosSlider.scrollLeft = scrollLeft - walk;
    });

    // Manejo del formulario de contacto
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Aquí puedes agregar la lógica para enviar el formulario
        // Por ejemplo, usando fetch() para enviar los datos a un servidor
        console.log('Formulario enviado');
        alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
        contactForm.reset();
    });
    // Galería lightbox
    const galeriaItems = document.querySelectorAll('.galeria-item');
    const body = document.body;

    galeriaItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const lightbox = document.createElement('div');
            lightbox.id = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <img src="${imgSrc}" alt="Ejercicio de calistenia">
                    <span class="close-lightbox">&times;</span>
                </div>
            `;
            body.appendChild(lightbox);

            lightbox.addEventListener('click', function(e) {
                if (e.target !== e.currentTarget) return;
                body.removeChild(lightbox);
            });

            lightbox.querySelector('.close-lightbox').addEventListener('click', function() {
                body.removeChild(lightbox);
            });
        });
    });
    // FAQ interactivo
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Cerrar todos los otros items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            // Alternar el estado del item actual
            item.classList.toggle('active');
        });
    });
});