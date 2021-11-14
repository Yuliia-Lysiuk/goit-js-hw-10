import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from "./fetchCountries";
// import {renderCountry, renderListCountry} from "./renderCountry"


const DEBOUNCE_DELAY = 300;

const countryList = document.querySelector(".country-list");

const input = document.querySelector("#search-box");


input.addEventListener("input", debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  const countryName = e.target.value.trim();
    
    if (!countryName) {
        return countryList.innerHTML = "";
    }
    fetchCountries(countryName)
        .then(appendCountry)
        .catch(() => {
            Notiflix.Notify.failure("Oops, there is no country with that name");
            countryList.innerHTML = ""
        });
}

function appendCountry(countries) {
    if (countries.length > 10) {
        countryList.innerHTML = "";
        return Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    }
    if (1 < countries.length & countries.length <= 10) {
        renderListCountry(countries);
    } else {
        renderCountry(countries);
    }
  
}

function renderListCountry(countries) {
     const markup = countries
    .map(({flags, name}) => {
      return `<li class="item">
      <img src="${flags.svg}" width="30"/> 
      <b> ${name.official}</b>
        </li>`;
    })
    .join("");
    return countryList.innerHTML = markup;
}

function renderCountry(countries) {
    const markup = countries
            .map(({ flags, name, capital, population, languages }) => {
                return `<li class="item">
                <img src="${flags.svg}" width="45"/>
                <h1 class="title"> ${name.official}</h1>
                <p class="text"><b>Capital</b>: ${capital}</p>
                <p class="text"><b>Population</b>: ${population}</p>
                <p class="text"><b>Languages</b>: ${Object.values(languages)}</p>
                </li>`;
            })
            .join("");
        return countryList.innerHTML = markup;
}