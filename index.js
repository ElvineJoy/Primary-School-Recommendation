 document.addEventListener('DOMContentLoaded', () => {
  
  fetch("https://energydata.info/dataset/2fda191d-c3c6-4002-8c82-daa02008a9e3/resource/129b8c79-de8b-4b7b-8310-cdd207e46863/download/schools.json")
  .then(response => response.json())
  .then(data => {

    const featuresArray = data.features;

    const propertiesArray = featuresArray.map(feature => feature.properties);
    
    function getUniqueValues(array, key) {
      return Array.from(new Set(array.map(item => item[key])));
  }
  
   function getSelectionOptions(selectId, values) {
    const select = document.getElementById(selectId);
    values.forEach(function(value) {
        const option = document.createElement('option');
        option.text = value;
        select.add(option);
    });
}
      getSelectionOptions('county', getUniqueValues(propertiesArray, "County"));
      getSelectionOptions('Sub', getUniqueValues(propertiesArray, "SUB_COUNTY"));
      getSelectionOptions('Level', getUniqueValues(propertiesArray,"LEVEL"));
      getSelectionOptions('Status', getUniqueValues(propertiesArray,"Status"));
     
  })
  .catch(error => {
    console.error('Error Fetching Data', error)
  });
});


 
  
 const searchForm = document.querySelector("#form");

  searchForm.addEventListener("sumbit", (e) => {
    e.preventDefault();

    // getting the values or each select element
    const selectedCounty = document.getElementById("county").value;
    const selectedSubCounty = document.getElementById("Sub").value;
    const selectedLevel = document.getElementById("Level").value;
    const selectedStatus = document.getElementById("Status").value;

    retrieveData(selectedCounty, selectedSubCounty, selectedLevel, selectedStatus);
  });

  function retrieveData (selectedCounty, selectedSubCounty, selectedLevel, selectedStatus) {

    fetch("https://energydata.info/dataset/2fda191d-c3c6-4002-8c82-daa02008a9e3/resource/129b8c79-de8b-4b7b-8310-cdd207e46863/download/schools.json")
    .then((response) => response.json())
    .then((schoolsData) => {
      document.getElementById("result").innerHTML = JSON.stringify(schoolsData);
    })
    .catch((error) => {
      alert("unsuccessful!")
      console.log(error.message)
    } 
    
  )
  }

    


// //  const displayOptions = (schoolArray) => {
// //   schoolArray.forEach(element => {
// //     const optionTag = document.createElement("option")

// //   });
// //  }




// // document.addEventListener("DOMContentLoaded", initialize);
