// Assign variables to use and pull throughout the code ------------------------------------------------------------------------ 

// Create a constant variable that will grab the variable data (a list of dict data.js)
var rawData = data;
// Create a constant var grabbing the table body (a set of table rows) in index.html 
// Use d3.select() function to select the first element that matches the string component inside
var tbody = d3.select("tbody");

// Start drawing from the data.js to reference the data ------------------------------------------------------------------------ 

function buildTable(data) { // Define a function to create an arguement called a buildTable that will be referencing in the data
  
  tbody.html(""); // clear out any existing data in tbody by setting the .html() to an empty string

  // Next, loop through each row to append it to a tableBody (tbody) ----------------------------------------------------------
  data.forEach((dataRow) => { // for each dataRow in data ASSIGN ...
    var row = tbody.append("tr"); // variable row to tableBody and append a row as table cell (tr)

    Object.values(dataRow).forEach((val) => { // currently website shows [object Object] so loop through each field in the dataRow and add val
      var cell = row.append("td"); // variable cell to tableBody and append a row as table cell (td)
        cell.text(val); // 
      }
    );
  });
}

// Start by creating listeners/events for the users to input the data and filter their search dates ---------------------------
function handleClick() { // Define a function called handleClick() that will reference to the button function

  var date = d3.select("#datetime").property("value"); // Grab the #datetime value from the filter with d3.select().property()

 // Use d3.select() to select first element, if none given empty 
  var searchData = rawData; // store the updated data called searchData

  
  if (date) { // Check to see if a date was entered and filter the data using that date.
    searchData = searchData.filter(row => row.datetime === date); // Apply `filter` to the table data to only keep the rows where the `datetime` value matches the filter value
  }

buildTable(searchData); // Rebuild the table
}

// Attach an event to listen for the form button
d3.selectAll("#filter-btn").on("click", handleClick);

// Build the table when the page loads 
buildTable(rawData); 