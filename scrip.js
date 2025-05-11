document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // Controle dos Menus Fixos (Header)
    // =============================================
    const headerPrimario = document.querySelector('.header-fixo');
    const headerSecundario = document.querySelector('.header-secundario');
    let lastScroll = 0;
    const scrollThreshold = 100;

    window.addEventListener('scroll', function() {
        const currentScroll = window.scrollY;

        // Rolar para baixo
        if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
            headerPrimario.style.transform = 'translateY(-100%)';
            headerPrimario.style.opacity = '0';
            headerSecundario.classList.add('show');
        } 
        // Rolar para cima
        else if (currentScroll < lastScroll) {
            if (currentScroll <= scrollThreshold) {
                headerPrimario.style.transform = 'translateY(0)';
                headerPrimario.style.opacity = '1';
                headerSecundario.classList.remove('show');
            }
        }

        lastScroll = currentScroll;
    });

    // =============================================
    // Controle do Slider (SEM AUTOPLAY)
    // =============================================
    let slideIndex = 1;
    const slides = document.getElementsByClassName('slide');
    const totalSlides = slides.length;

    // Inicializa o slider mostrando o primeiro slide
    showSlides(slideIndex);

    // Função principal para mostrar slides
    function showSlides(n) {
        // Ajusta o índice se passar dos limites
        if (n > totalSlides) { slideIndex = 1 }
        if (n < 1) { slideIndex = totalSlides }

        // Esconde todos os slides
        for (let i = 0; i < totalSlides; i++) {
            slides[i].style.display = "none";
        }

        // Mostra o slide atual
        slides[slideIndex-1].style.display = "block";

        // Atualiza a navegação manual (bolinhas)
        updateManualNavigation();
        
        // Atualiza a navegação automática (se existir)
        updateAutoNavigation();
        
        // Atualiza os radio buttons
        updateRadioButtons();
    }

    // Atualiza a navegação manual (bolinhas)
    function updateManualNavigation() {
        const manualBtns = document.getElementsByClassName('manual-btn');
        for (let i = 0; i < manualBtns.length; i++) {
            manualBtns[i].className = manualBtns[i].className.replace(" active", "");
        }
        if (manualBtns.length > 0) {
            manualBtns[slideIndex-1].className += " active";
        }
    }

    // Atualiza a navegação automática (mantida para sincronização)
    function updateAutoNavigation() {
        const autoBtns = document.querySelectorAll('.auto-btn1, .auto-btn2, .auto-btn3, .auto-btn4');
        for (let i = 0; i < autoBtns.length; i++) {
            autoBtns[i].className = autoBtns[i].className.replace(" active", "");
        }
        const currentAutoBtn = document.querySelector(`.auto-btn${slideIndex}`);
        if (currentAutoBtn) {
            currentAutoBtn.className += " active";
        }
    }

    // Atualiza os radio buttons
    function updateRadioButtons() {
        const radio = document.getElementById(`radio${slideIndex}`);
        if (radio) {
            radio.checked = true;
        }
    }

    // Navegação: Avançar/Retroceder
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    // Navegação para slide específico
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    // =============================================
    // Configuração dos Eventos
    // =============================================
    
    // Botões de navegação laterais
    document.querySelector('.prev-btn')?.addEventListener('click', () => plusSlides(-1));
    document.querySelector('.next-btn')?.addEventListener('click', () => plusSlides(1));

    // Navegação por bolinhas
    const manualBtns = document.querySelectorAll('.manual-btn');
    manualBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => currentSlide(index + 1));
    });

    // =============================================
    // Criação dos Botões de Navegação (Fallback)
    // =============================================
    if (!document.querySelector('.slide-btn')) {
        createNavigationButtons();
    }

    function createNavigationButtons() {
        const slider = document.querySelector('.slider');
        if (!slider) return;

        // Botão Anterior
        const prevBtn = document.createElement('button');
        prevBtn.className = 'slide-btn prev-btn';
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevBtn.onclick = () => plusSlides(-1);

        // Botão Próximo
        const nextBtn = document.createElement('button');
        nextBtn.className = 'slide-btn next-btn';
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextBtn.onclick = () => plusSlides(1);

        // Insere os botões
        slider.insertBefore(prevBtn, slider.firstChild);
        slider.appendChild(nextBtn);
    }
});