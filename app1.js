import { modeChanger } from "./app.js";

//getting country
function getCountryName() {
  const url = location.href;
  let i = url.length - 1;
  while (url[i] !== "#") {
    i--;
  }
  let country = "";
  for (++i; i < url.length; i++) {
    country += url[i];
  }
  return country;
}
const country = getCountryName();
async function displayCountryInfo(country) {
  const container = document.querySelector(".container");
  container.innerHTML = "";
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${country}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const [data] = await response.json();
    console.log(data);
    // Language
    const languages = data.languages;

    const languagesArr = Object.values(languages);
    let lanText = "";
    languagesArr.forEach((language) => {
      lanText += language + ", ";
    });
    lanText = lanText.slice(0, lanText.length - 2);

    // Currencies
    const [currencies] = Object.values(data.currencies);
    // Borders
    const borders = data.borders ? Object.values(data.borders) : [];
    const bordersContainer = document.querySelector(".borders");

    let html = "";
    const bordersNames = await getBordersName(data.name.common);
    bordersNames.forEach((border) => {
      html += `
          <span class="border-country">${border}</span>\n
      `;
    });

    const countryInfoHTML = `

  <div class="country">
    <a href="index.html" class="back-btn-container">
      <button class="back-btn">
        <span class="iconify-inline" data-icon="line-md:arrow-left"></span>
        <p class="back-btn-text">Back</p>
      </button>
    </a>
    <img src="${data.flags.svg}" alt="" class="country-flag" />
    <div class="country-information">
      <p class="country-name">${data.name.common}</p>
      <div class="details">
        <div class="details1">
          <p class="native-name"><b>Native Name: </b>${
            Object.values(data.name.nativeName)[0].official
          }</p>
          <p class="population"><b>Population: </b>${data.population}</p>
          <p class="region"><b>Region: </b>${data.region}</p>
          <p class="sub-region"><b>Sub Region: </b>${data.subregion}</p>
          <p class="capital"><b>Capital: </b>${data.capital[0]}</p>
        </div>
        <div class="details2">
          <p class="top-level-domain"><b>Top Level Domain: </b>${data.tld}</p>
          <p class="currrencies"><b>currrencies: </b>${currencies.name}</p>
          <p class="languages"><b>Languages: </b>${lanText}</p>
        </div>
      </div>
      <div class="border-countries">
        <p class="border-countries-text"><b>Border Countries:</b></p>
        <div class="borders">
         ${html}
        </div>

       
      </div>
    </div>
  </div>
  `;

    container.insertAdjacentHTML("beforeend", countryInfoHTML);
    const bordersEl = document.querySelectorAll(".border-country");
    bordersEl.forEach((element) => {
      element.addEventListener("click", function (e) {
        if (
          e.target.textContent !== "No border countries" &&
          e.target.textContent !== "undefined"
        )
          displayCountryInfo(e.target.textContent);
      });
    });
  } catch (error) {
    console.error(error.message);
  }
}
displayCountryInfo(country);

async function displayCountryByName(name) {
  try {
    const url = `https://restcountries.com/v3.1/${name}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    let [country] = await response.json();
    return country;
  } catch (error) {
    console.error(error.message);
  }
}
async function getBordersName(country) {
  const c = await displayCountryByName(`name/${country}`);
  const bordersNames = [];
  const borders = c.borders;
  if (borders) {
    for (let i = 0; i < borders.length; i++) {
      c.borders[i] = await displayCountryByName(`alpha/${c.borders[i]}`);
      bordersNames[i] = c.borders[i]?.name?.common;
    }
  } else bordersNames[0] = "No border countries";
  return bordersNames;
}
