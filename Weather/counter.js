export function setupCounter(element) {
  document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city');
    const searchButton = document.getElementById('searchButton');
    const weatherForm = document.getElementById('weatherForm');
    const weatherResult = document.getElementById('weatherResult');
    const countdownElement = document.getElementById('countdown');
    const updateNowButton = document.getElementById('updateNow');

    let countdown = 10;
    let timer;

    const updateWeather = async () => {
      const city = cityInput.value;
      if (!city) return;

      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=c0f73a2bd08b4f2686f104216242805&q=${city}`);
      const data = await response.json();

      if (data && data.current) {
        const { temp_c, condition, is_day } = data.current;
        weatherResult.innerHTML = `
        <h2>Počasí v: ${city}</h2>
        <img src="${condition.icon}" alt="${condition.text}">
        <p>Teplota: ${temp_c}°C</p>
        <p>Stav: ${condition.text}</p>
        <p>${is_day ? 'Day' : 'Night'}</p>
      `;
      } else {
        weatherResult.innerHTML = '<p>City not found. Please try again.</p>';
      }
    };

    const startCountdown = () => {
      clearInterval(timer);
      countdown = 10;
      timer = setInterval(() => {
        countdown--;
        countdownElement.textContent = countdown;
        if (countdown <= 0) {
          updateWeather();
          countdown = 10;
        }
      }, 1000);
    };

    cityInput.addEventListener('input', () => {
      searchButton.disabled = !cityInput.value.trim();
    });

    weatherForm.addEventListener('submit', (e) => {
      e.preventDefault();
      updateWeather();
      startCountdown();
    });

    updateNowButton.addEventListener('click', () => {
      updateWeather();
      startCountdown();
    });

    startCountdown();
  });
}