document.getElementById('spinner').style.display = 'none';
const loadData = async () => {
    const inputField = document.getElementById('input-field');
    const inputText = inputField.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputText}&appid=${'2fe540d0a1e5265a2feb17dfad609b80'}`;
    document.getElementById('spinner').style.display = 'block';
    const res = await fetch(url);
    const data = await res.json();
    showData(data);
    inputField.value = '';
}

const showData = city => {
    try {
        document.getElementById('spinner').style.display = 'block';
        const src = loadImg(city.weather[0].main)
        const divContainer = document.getElementById('div-container');
        divContainer.textContent = '';
        const div = document.createElement('div');
        div.classList.add('weather-status', 'text-white', 'text-center');
        div.innerHTML = `
        <img src="${src}" alt="">
        <h1>${city.name}, ${city.sys.country}</h1>
        <h3><span>${(city.main.feels_like - 273).toPrecision(4)}</span>&deg;C</h3>
        <h1 class="lead">${city.weather[0].description}</h1>
        `
        divContainer.appendChild(div);
        document.getElementById('spinner').style.display = 'none';
    }
    catch {
        const divContainer = document.getElementById('div-container');
        divContainer.textContent = '';
        const div = document.createElement('div');
        div.classList.add('container', 'alert', 'alert-danger', 'text-center');
        
        div.innerHTML = `
        <p>City not found, Please try a valid city that exist!</p>
        `
        document.getElementById('spinner').style.display = 'block';
        divContainer.appendChild(div);
        document.getElementById('spinner').style.display = 'none';
    }

}

const loadImg = weather => {
    if (weather == 'Rain') {
        return 'https://openweathermap.org/img/wn/09d@2x.png';
    }
    else if (weather == 'Haze') {
        return 'https://openweathermap.org/img/wn/02d@2x.png';
    }
    else if (weather == 'Clouds') {
        return 'https://openweathermap.org/img/wn/04d@2x.png';
    }
    else if (weather == 'Clear') {
        return 'https://openweathermap.org/img/wn/01d@2x.png';
    }
}

