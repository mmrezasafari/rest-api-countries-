const countryElement = document.querySelector(".countries");
const searchElement = document.querySelector(".searchHolder>input");
const dropDownButton = document.querySelector(".dropButton");
const dropDownButtonIcon = document.querySelector(".dropButton>i");
const dropDownList = document.querySelector(".dropItems");
const region = document.querySelectorAll(".region");
const regionName = document.getElementsByClassName("regionName");
const countryName = document.getElementsByClassName("countryName");
const darkMod = document.querySelector('.darkMod');
const moonIcon = document.querySelector('.fa-moon');
console.log(moonIcon) ;

async function getCountry() {
  const url = await fetch("https://restcountries.com/v3.1/all");
  const response = await url.json();
  response.forEach((element) => {
    setCountry(element);
  });
}

getCountry();
dropDownToggle();

function setCountry(data) {
  const country = document.createElement("div");
  country.classList.add("country");

  country.innerHTML = `
    <img src="${data.flags.png}" alt="country flag">
    <div class="countryInformation">
        <h3 class="countryName">${data.name.common}</h3>
        <p class="population"><strong>population</strong> : ${data.population}</p>
        <p class="regionName"><strong>region</strong> : ${data.region}</p>
        <p class="capital"><strong>capital</strong> : ${data.capital}
        </p>
    </div>
    `;

  countryElement.appendChild(country);
}

function dropDownToggle() {
  dropDownButton.addEventListener("click", () => {
    dropDownList.classList.toggle("dropDownShow");
    dropDownButtonIcon.classList.toggle("fa-chevron-down");
    dropDownButtonIcon.classList.toggle("fa-chevron-up");
  });
}

region.forEach((element) => {
  element.addEventListener("click", () => {
    dropDownButton.childNodes[0].nodeValue = element.innerText;
    Array.from(regionName).forEach((elem) => {
      if (
        elem.innerText.includes(element.innerText) ||
        element.innerHTML == "All"
      ) {
        elem.parentElement.parentElement.style.display = "grid";
      } else {
        elem.parentElement.parentElement.style.display = "none";
      }
    });
  });
});

searchElement.addEventListener('input', ()=>{
    Array.from(countryName).forEach((element)=>{
        if(element.innerText.toLowerCase().includes(searchElement.value.toLowerCase())){
            element.parentElement.parentElement.style.display = 'grid';
        }else{
            element.parentElement.parentElement.style.display = 'none';
        }
    })
})

darkMod.addEventListener('click', ()=>{
    document.body.classList.toggle('darkModStyle');
    moonIcon.classList.toggle('fas');
})