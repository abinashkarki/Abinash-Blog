document.addEventListener('DOMContentLoaded', () => {
    const cardStack = document.querySelector('.card-stack');
    const cards = Array.from(cardStack.querySelectorAll('.card'));
    const dots = Array.from(document.querySelectorAll('.scroll-indicator .dot'));

    if (!cardStack || cards.length === 0 || dots.length === 0) {
        console.error('Required elements are missing');
        return;
    }

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
});