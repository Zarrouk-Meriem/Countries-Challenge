// import data from "./data.json" with { type: "json" };
// console.log(data)
const body = document.body;
const modeBtn = document.querySelector(".mode-btn");
const darkIcon = document.querySelector(".dark-icon");
const modeText = document.querySelector(".mode-text ");
if (localStorage.getItem("darkmode") == "true") {
  document.body.classList.add("darkmode");
  darkIcon.name = "moon";
  modeText.textContent = "Dark mode";
}

// Mode changer
export function modeChanger() {
  const body = document.body;
  const modeBtn = document.querySelector(".mode-btn");
  const darkIcon = document.querySelector(".dark-icon");
  const modeText = document.querySelector(".mode-text ");

  modeBtn.addEventListener("click", function () {
    // toggling icons
    if (!body.classList.contains("darkmode")) {
      body.classList.add("darkmode");
      darkIcon.name = "moon";
      modeText.textContent = "Dark mode";
      localStorage.setItem("darkmode", true);
    } else {
      body.classList.remove("darkmode");
      darkIcon.name = "moon-outline";
      modeText.textContent = "Light mode";
      localStorage.setItem("darkmode", false);
    }
  });
}
// displaying all countries
async function displayAllCountries(all) {
  let countriesContainer = document.querySelector(".countries-container");
  let countryContainer = document.querySelectorAll(".country-container");
  if (countriesContainer) {
    countriesContainer.innerHTML = "";
  }
  let url = "https://restcountries.com/v3.1/all";
  if (all !== "all") {
    url = `https://restcountries.com/v3.1/region/${all}`;
  }
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    let countries = await response.json();

    countries.forEach((country) => {
      if (country.cca3 !== "ISR") {
        const countryHTML = `
        <a href="more-info.html#${country.name.common}" class="country-container">
        <div class="flag-container">
        <img src="${country.flags.png}" alt="${country.name.common} flag" />
        </div>
        <div class="infos-container">
        <p class="country-name"><b>${country.name.common}</b></p>
        <div class="infos">
        <p class="info">
        <p><b>Population: </b>${country.population}</p>
        </p>
        <p class="info">
        <p><b>Region: </b>${country.region}</p>
        </p>
        <p class="info">
        <p><b>Capital: </b>${country.capital?.[0]}</p>
        </p>
        </div>
        </div>
        </a>
        `;
        countriesContainer?.insertAdjacentHTML("beforeend", countryHTML);
      }
    });
    countryContainer = document.querySelectorAll(".country-container");
    countryContainer.forEach((container) => {
      container.addEventListener("click", function (e) {
        console.log(location.href);
      });
    });
  } catch (error) {
    console.error(error.message);
  }
}
async function getData() {
  let countriesContainer = document.querySelector(".countries-container");
  if (countriesContainer) {
    countriesContainer.innerHTML = "";
  }
  const inputBox = document.querySelector("input");
  const input = inputBox.value;
  const url =
    input === ""
      ? displayAllCountries("all")
      : `https://restcountries.com/v3.1/name/${input}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    let countries = await response.json();
    countries.forEach((country) => {
      const countryHTML = `
      <a href="more-info.html#${country.name.common}" class="country-container">
        <div class="flag-container">
          <img src="${country.flags.png}" alt="${country.name.common} flag" />
        </div>
        <div class="infos-container">
              <p class="country-name"><b>${country.name.common}</b></p>
              <div class="infos">
              <p class="info">
                  <p><b>Population: </b>${country.population}</p>
              </p>
              <p class="info">
                  <p><b>Region: </b>${country.region}</p>
              </p>
              <p class="info">
                  <p><b>Capital: </b>${country.capital[0]}</p>
              </p>
              </div>
        </div>
      </a>
  `;
      countriesContainer.insertAdjacentHTML("afterbegin", countryHTML);
    });
  } catch (error) {
    console.error(error.message);
  }
}

function sortCountries() {
  const arrow = document.querySelector(".down-icon");
  const options = document.querySelectorAll(".option");
  const optionsContainer = document.querySelector(".options");
  arrow?.addEventListener("click", function () {
    if (optionsContainer.classList.contains("hidden")) {
      optionsContainer.classList.remove("hidden");
    } else {
      optionsContainer.classList.add("hidden");
    }
  });

  optionsContainer?.addEventListener("click", function (e) {
    displayAllCountries(`${e.target.textContent}`);
  });
}

function main() {
  modeChanger();
  displayAllCountries("all");
  const inputBox = document.querySelector("input");
  sortCountries();
  inputBox?.addEventListener("input", function () {
    getData();
  });
}

main();
