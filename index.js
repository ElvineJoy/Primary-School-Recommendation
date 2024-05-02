//  document.addEventListener('DOMContentLoaded',() => {
//     document.querySelector('form').addEventListener('submit', (e) =>{
//       console.log(e)
//     })
//  });



// function init
const initialize = () => {
  const serachForm = document.querySelector("#form")

  serachForm.addEventListener('sumbit', (e) => {
    e.preventDefault();

    fetch("https://energydata.info/dataset/2fda191d-c3c6-4002-8c82-daa02008a9e3/resource/129b8c79-de8b-4b7b-8310-cdd207e46863/download/schools.json")
    .then((response) => response.json())
    .then((schoolsData) => console.log(schoolsData))

  })
}







document.addEventListener("DOMContentLoaded", initialize);
