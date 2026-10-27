tailwind.config = {
    theme: {
        extend: {
            colors: {
                sage: {
                    50: '#F4F6F2',
                    100: '#E6EBE2',
                    200: '#C8D3C3',
                    300: '#9DB394',
                    400: '#7E9675',
                    500: '#6B7A63',
                    600: '#55624C',
                    700: '#3E4937',
                },
                beige: {
                    50: '#FAF7F2',
                    100: '#F3EBE1',
                    200: '#E8DFD3',
                    300: '#DBCFB8',
                    400: '#C8B79B',
                },
                gold: {
                    300: '#E8D28B',
                    400: '#D4AF37',
                    500: '#C5A059',
                    600: '#A37E39',
                }
            },
            fontFamily: {
                serif: ['Playfair Display', 'serif'],
                cinzel: ['Cinzel', 'serif'],
                script: ['Great Vibes', 'cursive'],
                sans: ['Montserrat', 'sans-serif'],
            }
        }
    }
}

function openMapModal() {
    document.getElementById('mapModal').classList.remove('hidden');
}
function closeMapModal() {
    document.getElementById('mapModal').classList.add('hidden');
}

const musicBtn = document.getElementById('musicToggle');
const musicIcon = document.getElementById('musicIcon');
const audio = document.getElementById('bgAudio');
const envelopeOverlay = document.getElementById('envelopeOverlay');
const envelopeFlap = document.getElementById('envelopeFlap');
const envelopeCard = document.getElementById('envelopeCard');
const envelopeSeal = document.getElementById('envelopeSeal');
let isPlaying = false;

// Función para abrir el sobre e iniciar la música automáticamente
function openEnvelope() {
    audio.play().then(() => {
        isPlaying = true;
        musicIcon.classList.remove('fa-music');
        musicIcon.classList.add('fa-pause');
        musicBtn.classList.add('bg-sage-500', 'text-white');
    }).catch(e => console.log('Audio error:', e));

    // Animación del sobre
    envelopeFlap.style.transform = 'rotateX(180deg)';
    envelopeFlap.style.zIndex = '0';
    envelopeSeal.style.opacity = '0';
    
    setTimeout(() => {
        envelopeCard.style.transform = 'translateY(-35px)';
    }, 300);

    setTimeout(() => {
        envelopeOverlay.style.opacity = '0';
        setTimeout(() => {
            envelopeOverlay.style.display = 'none';
        }, 1000);
    }, 900);
}

// Botón flotante de música
musicBtn.addEventListener('click', () => {
    if (!isPlaying) {
        audio.play().then(() => {
            isPlaying = true;
            musicIcon.classList.remove('fa-music');
            musicIcon.classList.add('fa-pause');
            musicBtn.classList.add('bg-sage-500', 'text-white');
        }).catch(e => console.log('Audio error:', e));
    } else {
        audio.pause();
        isPlaying = false;
        musicIcon.classList.remove('fa-pause');
        musicIcon.classList.add('fa-music');
        musicBtn.classList.remove('bg-sage-500', 'text-white');
    }
});