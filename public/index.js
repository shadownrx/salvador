const competitorButtons = document.querySelectorAll('.competitor-btn');
const resultadosContainer = document.getElementById('resultados');
const tablaVotos = document.getElementById('tabla-votos');
const masVotadosList = document.getElementById('mas-votados-list');

// Objeto para almacenar el recuento de votos
const votos = {};

competitorButtons.forEach(button => {
    button.addEventListener('click', () => {
        const competidor = button.textContent.trim();
        // Incrementa el contador de votos para el competidor seleccionado
        votos[competidor] = (votos[competidor] || 0) + 1;
        // Actualiza la sección de resultados
        actualizarResultados();
        // Actualiza la tabla de votos
        actualizarTablaVotos();
        // Actualiza la lista de los más votados
        actualizarMasVotados();
    });
});

function actualizarResultados() {
    // Ordena los competidores por el número de votos
    const sortedCompetitors = Object.keys(votos).sort((a, b) => votos[b] - votos[a]);

    // Construye la lista de los competidores más votados
    let resultadosHTML = '<h2>Competidores más votados</h2>';
    sortedCompetitors.forEach(competidor => {
        resultadosHTML += `<p>${competidor}: ${votos[competidor]}</p>`;
    });

    // Actualiza el contenido de la sección de resultados
    resultadosContainer.innerHTML = resultadosHTML;
}

function actualizarTablaVotos() {
    // Limpia la tabla de votos
    tablaVotos.innerHTML = `
        <tr>
            <th>Competidor</th>
            <th>Votos</th>
            <th>Eliminar Voto</th>
        </tr>
    `;
    
    // Agrega filas a la tabla con los votos de cada competidor
    Object.keys(votos).forEach(competidor => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${competidor}</td>
            <td>${votos[competidor]}</td>
            <td><button class="eliminar-btn" data-competidor="${competidor}">Eliminar</button></td>
        `;
        tablaVotos.appendChild(row);
    });

    // Agrega evento de clic a los botones de eliminar
    const eliminarButtons = document.querySelectorAll('.eliminar-btn');
    eliminarButtons.forEach(button => {
        button.addEventListener('click', () => {
            const competidor = button.getAttribute('data-competidor');
            eliminarVoto(competidor);
        });
    });
}

function eliminarVoto(competidor) {
    if (votos[competidor] > 0) {
        votos[competidor]--;
        actualizarTablaVotos();
        actualizarMasVotados();
    }
}

function actualizarMasVotados() {
    // Limpia la lista de los más votados
    masVotadosList.innerHTML = '';

    // Ordena los competidores por el número de votos
    const sortedCompetitors = Object.keys(votos).sort((a, b) => votos[b] - votos[a]);

    // Agrega los competidores más votados a la lista
    sortedCompetitors.forEach(competidor => {
        const listItem = document.createElement('li');
        listItem.textContent = `${competidor}: ${votos[competidor]}`;
        masVotadosList.appendChild(listItem);
    });
}
