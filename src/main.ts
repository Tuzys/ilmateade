import './style.css'

const container = document.querySelector('.container');

const renderWeather = async() => {
    let uri = 'https://api.met.no/weatherapi/locationforecast/2.0/compact.json?lat=46.8&lon=8.2'

const res = await fetch(uri);
const weathers = await res.json();

weather = weathers.properties.timeseries

let template = '';
weather.forEach(post => {
    template += `
    <div class="post">
        <h3>${post.time.slice(11,16)}</h3>
        <h4>${post.time.slice(0,10)}</h4>
        <p>Temperatuur: ${post.data.instant.details.air_temperature} Celsius</p>
        <p>Niiskus: ${post.data.instant.details.relative_humidity}%</p>
        <p>Tuule suund: ${post.data.instant.details.wind_from_direction}</p>
        <p>Tuule kiirus: ${post.data.instant.details.wind_speed}</p>
        <p>Pilveala osa: ${post.data.instant.details.cloud_area_fraction}</p>
        <p>õhurõhk meretasemel: ${post.data.instant.details.air_pressure_at_sea_level}</p>
    </div> 
    `
});
    container.innerHTML = template;
};

window.addEventListener('DOMContentLoaded', () => renderWeather());