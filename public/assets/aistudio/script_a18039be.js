document.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const innerH = window.innerHeight;
    const progress = Math.min(scrollY / (innerH * 1.5), 1);

    const pLeft = document.getElementById('p-left');
    const pRight = document.getElementById('p-right');
    const word1 = document.getElementById('word-1');
    const word2 = document.getElementById('word-2');
    const wordmark = document.getElementById('wordmark');
    const heroImg = document.getElementById('hero-img');
    const overlay = document.getElementById('hero-overlay');
    const dot1 = document.getElementById('dot-1');
    const dot2 = document.getElementById('dot-2');

    pLeft.style.transform = `translateX(-${progress * 100}%)`;
    pRight.style.transform = `translateX(${progress * 100}%)`;
    heroImg.style.transform = `scale(${1.15 - (progress * 0.15)})`;
    overlay.style.opacity = progress * 0.4;
    wordmark.style.transform = `translate(-50%, -50%) scale(${1 + progress * 0.2})`;
    wordmark.style.letterSpacing = `${-0.03 - (progress * 0.05)}em`;
    word1.style.transform = `translateX(-${progress * 150}px)`;
    word2.style.transform = `translateX(${progress * 150}px)`;

    if (progress > 0.05) {
        dot1.style.opacity = progress;
        dot2.style.opacity = progress;
        dot1.style.transform = `translate(-${progress * 500}px, -${progress * 250}px)`;
        dot2.style.transform = `translate(${progress * 500}px, ${progress * 250}px)`;
    }

    const statementImg = document.getElementById('statement-img');
    if (statementImg) {
        statementImg.style.transform = `translateY(${scrollY * 0.15}px) rotate(${scrollY * 0.08}deg)`;
    }
});

const deck = document.getElementById('deck');
let isDragging = false;
let startX = 0;
let currentX = 0;

const getTopCard = () => deck.querySelector('.deck-card');

const refreshDeck = () => {
    const cards = [...deck.querySelectorAll('.deck-card')];
    cards.forEach((card, index) => {
        card.style.zIndex = cards.length - index;
        card.style.transform = index === 0
            ? 'rotate(-1deg)'
            : `translate(${index * 10}px, ${index * 10}px) rotate(${index === 1 ? 2 : -2}deg)`;
    });
};

deck.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    const topCard = getTopCard();
    topCard.style.transition = 'none';
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    currentX = e.clientX - startX;
    const topCard = getTopCard();
    const rotate = currentX * 0.1;
    topCard.style.transform = `translate(${currentX}px, 0px) rotate(${rotate}deg) scale(1.05)`;
});

window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    const topCard = getTopCard();

    if (Math.abs(currentX) > 120) {
        topCard.style.transition = 'all 0.6s cubic-bezier(0.2, 0, 0.2, 1)';
        topCard.style.transform = `translate(${currentX * 5}px, -200px) rotate(${currentX * 0.2}deg)`;
        setTimeout(() => {
            deck.append(topCard);
            topCard.style.transition = 'none';
            refreshDeck();
            setTimeout(() => {
                topCard.style.transition = 'all 0.4s ease';
            }, 10);
        }, 600);
    } else {
        topCard.style.transition = 'all 0.4s ease';
        topCard.style.transform = 'translate(0, 0) rotate(-1deg)';
    }
    currentX = 0;
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const topCard = getTopCard();
        const dir = e.key === 'ArrowRight' ? 1 : -1;
        topCard.style.transition = 'all 0.6s cubic-bezier(0.2, 0, 0.2, 1)';
        topCard.style.transform = `translate(${dir * 800}px, -200px) rotate(${dir * 45}deg)`;
        setTimeout(() => {
            deck.append(topCard);
            refreshDeck();
        }, 600);
    }
});

refreshDeck();
