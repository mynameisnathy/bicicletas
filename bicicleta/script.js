// script.js

// Inicializa o histórico de aluguéis como uma array de objetos
const rentalHistory = [];

// Função para adicionar um novo registro ao histórico
function addRecord(dayOfWeek, weather, rentals) {
    rentalHistory.push({ dayOfWeek, weather, rentals });
    updateHistoryTable();
}

// Função para atualizar a tabela com o histórico de aluguéis
function updateHistoryTable() {
    const tableBody = document.querySelector('#historyTable tbody');
    tableBody.innerHTML = '';
    rentalHistory.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.dayOfWeek}</td>
            <td>${record.weather}</td>
            <td>${record.rentals}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Função para prever a quantidade de aluguéis baseada em médias simples
function forecastRentals(dayOfWeek, weather) {
    let totalRentals = 0;
    let count = 0;
    rentalHistory.forEach(record => {
        if (record.dayOfWeek === dayOfWeek && record.weather === weather) {
            totalRentals += record.rentals;
            count++;
        }
    });
    return count > 0 ? (totalRentals / count).toFixed(2) : 'Dados insuficientes para previsão';
}

// Manipula o envio do formulário de adição de registro
document.getElementById('addRecordForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const dayOfWeek = document.getElementById('dayOfWeek').value.trim();
    const weather = document.getElementById('weather').value.trim();
    const rentals = parseInt(document.getElementById('rentals').value, 10);
    addRecord(dayOfWeek, weather, rentals);
    this.reset();
});

// Manipula o envio do formulário de previsão
document.getElementById('forecastForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const dayOfWeek = document.getElementById('forecastDayOfWeek').value.trim();
    const weather = document.getElementById('forecastWeather').value.trim();
    const forecast = forecastRentals(dayOfWeek, weather);
    document.getElementById('forecastResult').innerText = `Previsão de Aluguéis: ${forecast}`;
    this.reset();
});
