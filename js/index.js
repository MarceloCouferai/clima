"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.querySelector('#search-session > form');
const input = document.querySelector('#location-input');
const sectionInfos = document.querySelector('#infos-temp');
form === null || form === void 0 ? void 0 : form.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault(); //impede de atualizar a pg ao clicar no button
    if (!input || !sectionInfos)
        return;
    const local = input.value;
    if (local.length < 3) {
        alert('Local precisa ter mais que 3 caracteres');
        return;
    }
    const respostaLocal = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${local}&appid=6f45011699a7117ed1500b182727e152&lang=pt_br&units=metric`);
    const dados = yield respostaLocal.json();
    const infos = {
        temperatura: Math.round(dados.main.temp),
        nomeCidade: dados.name,
        icon: `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`
    };
    sectionInfos.innerHTML =
        `
                <div class="dados-climaticos">
                <h2>${infos.nomeCidade}</h2>
                <span class="clima-data">${infos.temperatura} °C</span>
                </div>
                <img src="${infos.icon}" alt="">
    `;
    console.log(dados.main.temp);
}));
