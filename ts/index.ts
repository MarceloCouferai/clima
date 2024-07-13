const form = document.querySelector('#search-session > form');
const input: HTMLInputElement | null = document.querySelector('#location-input');

const sectionInfos = document.querySelector('#infos-temp');

form?.addEventListener('submit', async (event) => {
    event.preventDefault(); //impede de atualizar a pg ao clicar no button

    if(!input || !sectionInfos) return;

    const local = input.value;

    if(local.length < 3) {
        alert('Local precisa ter mais que 3 caracteres');
        return;
    }


    const respostaLocal = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${local}&appid=6f45011699a7117ed1500b182727e152&lang=pt_br&units=metric`);


    const dados = await respostaLocal.json();
    const infos = {
        temperatura: Math.round(dados.main.temp),
        nomeCidade: dados.name,
        icon: `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`
    }

    sectionInfos.innerHTML = 
    `
                <div class="dados-climaticos">
                <h2>${infos.nomeCidade}</h2>
                <span class="clima-data">${infos.temperatura} °C</span>
                </div>
                <img src="${infos.icon}" alt="">
    `;

    console.log(dados.main.temp);
    
})