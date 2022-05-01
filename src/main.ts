import "./style.css";

const container = document.querySelector(".container")!;

interface Post {
  time: string;
  data: {
    instant: {
      details: {
        air_temperature: number;
        relative_humidity: number;
        wind_from_direction: string;
        wind_speed: number;
        cloud_area_fraction: number;
        air_pressure_at_sea_level: number;
      };
    };
  };
}

const renderWeather = async () => {
  let uri = "https://api.met.no/weatherapi/locationforecast/2.0/compact.json?lat=46.8&lon=8.2";

  const res = await fetch(uri);
  const weathers = await res.json();

  const weather = weathers.properties.timeseries;

  let template = "";
  weather.forEach((post: Post) => {
    const {
      air_pressure_at_sea_level,
      air_temperature,
      cloud_area_fraction,
      relative_humidity,
      wind_from_direction,
      wind_speed,
    } = post.data.instant.details;

    template += `
    <div class="post">
        <h3>${post.time.slice(11, 16)}</h3>
        <h4>${post.time.slice(0, 10)}</h4>
        <p>Temperatuur: ${air_temperature} Celsius</p>
        <p>Niiskus: ${relative_humidity}%</p>
        <p>Tuule suund: ${wind_from_direction}</p>
        <p>Tuule kiirus: ${wind_speed}</p>
        <p>Pilveala osa: ${cloud_area_fraction}</p>
        <p>õhurõhk meretasemel: ${air_pressure_at_sea_level}</p>
    </div> 
    `;
  });
  container.innerHTML = template;
};

window.addEventListener("DOMContentLoaded", () => renderWeather());
