//Lopez Villarroel Alan Efrain

const API_KEY = 'e95302c81e5e8df7865ae9919f1cebf5'; 
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';



const seriesGrid    = document.getElementById('series-grid');
const loadingDiv    = document.getElementById('loading');
const errorDiv      = document.getElementById('error');
const errorMessage  = document.getElementById('error-message');
const resultsTitle  = document.getElementById('results-title');
const resultsCount  = document.getElementById('results-count');
const searchInput   = document.getElementById('search');
const clearBtn      = document.getElementById('clear-search');
const retryBtn      = document.getElementById('retry-btn');
const themeToggle   = document.getElementById('theme-toggle');
const modal         = document.getElementById('serie-modal');
const modalBody     = document.getElementById('modal-body');
const modalClose    = document.getElementById('modal-close');
const modalOverlay  = document.getElementById('modal-overlay');


// ============================================================================
// UTILIDADES DE UI (DADO - no modificar)
// ============================================================================
const mostrarLoading = () => {
    loadingDiv.style.display = 'flex';
    errorDiv.style.display = 'none';
    seriesGrid.innerHTML = '';
};

const ocultarLoading = () => {
    loadingDiv.style.display = 'none';
};

const mostrarError = (mensaje) => {
    ocultarLoading();
    errorMessage.textContent = mensaje;
    errorDiv.style.display = 'flex';
    seriesGrid.innerHTML = '';
};


// ============================================================================
// PUNTO 1: CARGA INICIAL
// ============================================================================
const obtenerSeries = async () => {
    const url = `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=es-ES`;
    console.log('URL de la petición:', url);
    const respuesta = await fetch(url);
    const datos = await respuesta.json();
    return datos.results;
};

const iniciar = async () => {
    console.log('Mostrando series...');
    mostrarLoading();

    try {
        const series = await obtenerSeries();
        console.log(`${series.length} series obtenidas`);

        ocultarLoading();
        seriesGrid.innerHTML = series.map(serie => serie.name).join('');
        console.log('Series renderizadas');
    } catch (error) {
        console.error('Error:', error);

        let mensaje = 'No se pudieron cargar las series';
        if (error.message.includes('401')) {
            mensaje = 'API Key inválida. Verifica tu clave.';
        } else if (error.message.includes('fetch')) {
            mensaje = 'Error de red';
        } else if (error.message.includes('429')) {
            mensaje = 'Demasiadas peticiones. Espera un momento.';
        }
        mostrarError(mensaje);
    }
};

iniciar();