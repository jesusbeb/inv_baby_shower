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



// --- LÓGICA DE DISPONIBILIDAD PARA SUBIR FOTOS ---
// Enero es 0, Octubre es 9, Noviembre es 10, Diciembre es 11.
const fechaInicioFotos = new Date(2026, 9, 7, 15, 30);  // 7 de Noviembre de 2026 a las 3:30 PM
const fechaFinFotos    = new Date(2026, 11, 14, 23, 59); // 14 de Noviembre de 2026 a las 11:59 PM
const ahora = new Date();
const btnFotos = document.getElementById('btnSubirFotos');
const driveStatusMsg = document.getElementById('driveStatusMsg');

if (btnFotos) {
    if (ahora < fechaInicioFotos) {
        // ESTADO 1: Aún no empieza el evento
        btnFotos.textContent = 'DISPONIBLE EL 7 DE NOV';
        btnFotos.classList.add('opacity-50', 'pointer-events-none', 'cursor-not-allowed');
        if (driveStatusMsg) driveStatusMsg.style.display = 'block';
    } 
    else if (ahora >= fechaInicioFotos && ahora <= fechaFinFotos) {
        // ESTADO 2: Ventana de tiempo activa (El evento está ocurriendo)
        btnFotos.innerHTML = '<i class="fab fa-google-drive text-lg"></i> SUBIR FOTOS';
        btnFotos.classList.remove('opacity-50', 'pointer-events-none', 'cursor-not-allowed', 'bg-stone-300', 'text-stone-500');
        // Asignamos el estilo activo de tu diseño (Verde Sabio)
        btnFotos.classList.add('bg-sage-600', 'hover:bg-sage-700', 'text-white', 'shadow-md');
        
        // ¡Inyectamos tu enlace de Google Drive de forma dinámica!
        // Este enlace se obtuvo de Google Apps Script donde esta la logica que hace que los archivos se suban a la carpeta correcta en Drive,
        // ademas que ahi se encuentra la interfaz en un index.html que permite subir los archivos.
        btnFotos.href = "https://script.google.com/macros/s/AKfycbwG3GEHwXqVUF-44YX34GmO-NsOOG04O5hPN7CI9qZocYIH_GoNjdq33NN8rSWLTjrh/exec";
        
        if (driveStatusMsg) driveStatusMsg.style.display = 'none'; // Ocultamos el aviso porque ya está activo
    } 
    else {
        // ESTADO 3: Plazo vencido
        btnFotos.textContent = 'RECEPCIÓN DE FOTOS CERRADA';
        btnFotos.classList.add('opacity-50', 'pointer-events-none', 'cursor-not-allowed');
        btnFotos.removeAttribute('href'); // Por seguridad removemos el enlace
        if (driveStatusMsg) {
            driveStatusMsg.textContent = "El periodo para subir fotos ha finalizado. ¡Gracias!";
            driveStatusMsg.className = "text-[11px] text-sage-600 font-medium";
        }
    }
}