document.addEventListener('DOMContentLoaded', () => {

    // Carregar notícias em tempo real da API
    const newsFeed = document.getElementById('newsFeed');
    fetch('https://newsapi.org/v2/top-headlines?country=br&apiKey=API_KEY')
        .then(response => response.json())
        .then(data => {
            const articles = data.articles;
            articles.forEach(article => {
                const newsItem = document.createElement('div');
                newsItem.classList.add('news-item');
                newsItem.innerHTML = `
                    <h4>${article.title}</h4>
                    <p>${article.description}</p>
                    <a href="${article.url}" target="_blank">Leia mais</a>
                `;
                newsFeed.appendChild(newsItem);
            });
        })
        .catch(err => console.error('Erro ao carregar notícias:', err));

    // Mapa Interativo com Leaflet
    const map = L.map('map').setView([51.505, -0.09], 2); // Localização inicial (Lat, Lng)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Adicionar um marcador
    L.marker([51.5, -0.09]).addTo(map)
        .bindPopup('Centro de Relações Internacionais')
        .openPopup();

    // Sala de Bate-Papo - Socket.io (Em um servidor real, seria necessário rodar o backend com Node.js e Express)
    const socket = io('http://localhost:3000');
    const chatInput = document.getElementById('chatInput');
    const sendMessageButton = document.getElementById('sendMessage');
    const messagesDiv = document.getElementById('messages');

    sendMessageButton.addEventListener('click', () => {
        const message = chatInput.value;
        socket.emit('sendMessage', message);
        chatInput.value = ''; // Limpar o campo de input
    });

    socket.on('receiveMessage', (message) => {
        const newMessage = document.createElement('div');
        newMessage.textContent = message;
        messagesDiv.appendChild(newMessage);
        messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll para o final
    });

    // Gráfico Dinâmico com Chart.js
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
            datasets: [{
                label: 'Economia Global',
                data: [12, 19, 3, 5, 2],
                borderColor: 'rgba(41, 128, 185, 1)',
                backgroundColor: 'rgba(41, 128, 185, 0.2)',
                borderWidth: 1
            }]
        }
    });
});
