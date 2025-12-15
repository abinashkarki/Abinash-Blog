document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------
    // Home page (legacy) card stack
    // -----------------------------
    const cardStack = document.querySelector('.card-stack');
    if (cardStack) {
        const cards = Array.from(cardStack.querySelectorAll('.card'));
        const dots = Array.from(document.querySelectorAll('.scroll-indicator .dot'));

        if (cards.length > 0 && dots.length > 0) {
            let currentCardIndex = 0;

            // Update indicator based on scroll position
            const updateIndicator = () => {
                const scrollPosition = cardStack.scrollLeft;
                const cardWidth = cards[0].offsetWidth;
                currentCardIndex = Math.round(scrollPosition / cardWidth);

                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentCardIndex);
                });
            };

            // Smooth scroll to a specific card
            const scrollToCard = (index) => {
                const cardWidth = cards[0].offsetWidth;
                cardStack.scrollTo({
                    left: index * cardWidth,
                    behavior: 'smooth'
                });
            };

            // Add scroll event listener
            cardStack.addEventListener('scroll', () => {
                window.requestAnimationFrame(updateIndicator);
            });

            // Add click event listeners to dots
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    scrollToCard(index);
                });
            });

            // Handle resize events to ensure correct behavior on screen size changes
            let resizeTimer;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    scrollToCard(currentCardIndex);
                    updateIndicator();
                }, 250);
            });

            // Initialize indicator
            updateIndicator();
        }
    }

    // -----------------------------
    // Lightbox for image enlargement
    // -----------------------------
    const createLightbox = () => {
        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.innerHTML = `
            <button class="lightbox-close" type="button" aria-label="Close image">×</button>
            <img class="lightbox-img" alt="">
        `;
        document.body.appendChild(overlay);

        const img = overlay.querySelector('.lightbox-img');
        const closeBtn = overlay.querySelector('.lightbox-close');

        const close = () => {
            overlay.classList.remove('open');
            img.removeAttribute('src');
            img.setAttribute('alt', '');
            document.body.style.overflow = '';
        };

        closeBtn.addEventListener('click', close);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) close();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') close();
        });

        return {
            open: (src, alt) => {
                img.src = src;
                img.alt = alt || '';
                overlay.classList.add('open');
                document.body.style.overflow = 'hidden';
            }
        };
    };

    const lightbox = createLightbox();

    // Intercept clicks on image links and open in-page instead
    document.addEventListener('click', (e) => {
        const a = e.target.closest?.('.image-container a[href]');
        if (!a) return;

        const href = a.getAttribute('href');
        if (!href) return;

        // Only handle common image extensions
        if (!href.match(/\.(png|jpe?g|gif|webp)(\?.*)?$/i)) return;

        e.preventDefault();
        const nestedImg = a.querySelector('img');
        lightbox.open(href, nestedImg?.getAttribute('alt') || '');
    });
});