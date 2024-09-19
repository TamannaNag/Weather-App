document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const inputField = document.querySelector('.input_field');
    const weatherTemp = document.querySelector('.weather_temp');
    const cloudTxt = document.querySelector('.cloudtxt');
    const dayInfo = document.querySelector('.day_info');
    const listContent = document.querySelector('.list_content ul');
    const apiKey = '72e65e440a4d9b9420e98016bf72ab9b';

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent the default form submission
        
        const city = inputField.value.trim();
        if (city === '') return; // Do nothing if input is empty

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
            if (!response.ok) throw new Error('City not found');

            const data = await response.json();
            updateWeather(data);
        } catch (error) {
            alert(error.message);
        }
    });

    function updateWeather(data) {
        // Update current weather info
        weatherTemp.textContent = `${data.main.temp}°C`;
        cloudTxt.textContent = data.weather[0].description;

        // Update day info
        const details = [
            { title: 'NAME', value: data.name },
            { title: 'TEMP', value: `${data.main.temp}°C` },
            { title: 'HUMIDITY', value: `${data.main.humidity}%` },
            { title: 'WIND SPEED', value: `${data.wind.speed} km/h` }
        ];

        dayInfo.innerHTML = details.map(detail => `
            <div class="content">
                <p class="title">${detail.title}</p>
                <span class="value">${detail.value}</span>
            </div>
        `).join('');

        // Update forecast info
        listContent.innerHTML = ''; // Clear existing forecast
        for (let i = 0; i < 4; i++) {
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="https://cdn-icons-png.flaticon.com/512/4052/4052984.png" alt="Weather Icon"/>
                <span>Day ${i + 1}</span>
                <span class="day_temp">23°C</span>
            `;
            listContent.appendChild(li);
        }
    }
});
