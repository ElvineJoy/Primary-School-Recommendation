 document.addEventListener('DOMContentLoaded', () => {
  
  const searchForm = document.querySelector("#form");
  const results = document.querySelector("#result");
  

  fetch("https://energydata.info/dataset/2fda191d-c3c6-4002-8c82-daa02008a9e3/resource/129b8c79-de8b-4b7b-8310-cdd207e46863/download/schools.json")
  .then(response => response.json())
  .then(data => {
    // the data is a FeatureCollection - first get the features from the data into features array
    const featuresArray = data.features;
   
    const propertiesArray = featuresArray.map(feature => feature.properties);
    console.log(propertiesArray)
    // here, get the unique values form the array
    function getUniqueValues(array, key) {
      return Array.from(new Set(array.map(item => item[key])));
    }

    // we are populating the select tag with unique values for selection by the user
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
      
      searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
    
        // getting the values for each select element
        const selectedCounty = document.getElementById("county").value;
        const selectedSubCounty = document.getElementById("Sub").value;
        const selectedLevel = document.getElementById("Level").value;
        const selectedStatus = document.getElementById("Status").value;
    
        // conditions to display the data
        const filteredData = propertiesArray.filter(item => {
          return (
            (!selectedCounty || item.County === selectedCounty) &&
            (!selectedSubCounty|| item.SUB_COUNTY === selectedSubCounty) &&
            (!selectedLevel || item.LEVEL === selectedLevel) &&
            (!selectedStatus || item.Status === selectedStatus)
          );
        });
            displayResults(filteredData);
         });
    
         // display results in the  results div
    function displayResults(data) {
      
      results.innerHTML = "";
      
      if(data.length === 0) {
        results.textContent = "Oops! No results found." ;
        return;
      }
    //  introducing a heading tothe results div
      const heading = document.createElement("h3")
      heading.textContent = "Search Results:"
      results.appendChild(heading);
    
      const resultTable = document.createElement("table");
      resultTable.classList.add("results-table");

      const tableHeadRow = document.createElement("tr");
      const headers = ["School Name", "District", "Zone", "Ward"]
      
      headers.forEach(headerText => {
        const th = document.createElement("th");
        th.textContent = headerText;
        tableHeadRow.appendChild(th);
      })

      resultTable.appendChild(tableHeadRow);

    // populating the table with data and appending to the DOM
    data.forEach(item => {
      const rows = document.createElement("tr");
      const columns = ["SCHOOL_NAM", "DISTRICT", "ZONE", "Ward"];
      
      columns.forEach(columnName => {
        const tableData = document.createElement("td");
        tableData.textContent = item[columnName];
        rows.appendChild(tableData);
      });
      resultTable.appendChild(rows);
    })
    results.appendChild(resultTable)

    // scroll into view results 
    results.scrollIntoView({behavior: "smooth"});
    }    
  })
  .catch(error =>
    console.error("Error fetching data:", error)
  );
  });