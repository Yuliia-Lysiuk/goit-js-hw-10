function fetchCountries(countryName) {
    return fetch(`https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,languages,flags`).then(
    (response) => {
if (!response.ok) {
  countryList.innerHTML = "";
}
      return response.json();
    }
  );
}
export { fetchCountries }