// NOTE TO SELF: 
  // use const as an identifier that won't be reassigned
  // use let as an identifier that may reassigned
  // use var as when you are not sure whether or not it may be used for future function

// FIRST assign variables to use and pull throughout the code
// Create a constant variable that will grab the variable data (a list of dict)
const dataList = data;

// Create a constant var grabbing the table body (a set of table rows) in index.html 
// Use d3.select() function to select the table body
const tableBody = d3.select("tbody");

// SECOND we are going to create a filter table in the site to show users different tables according to their entered data
// use the function () to create a trigger/binding that will read the data
function makeFilterTable(data) {
  
  tableBody.html('');  // clear out any existing data in tbody by setting the .html() to an empty string

  // Next, 
  // In the data (found in data.js), we are going to go in each element in the array
  // Use the .forEach() function automatically iterates (loops) through each item and
  data.forEach((dataRow) => {
    // .append() a table row "tr" to the tableBody
    const row = tableBody.append('tr');

    // Loop through forEach val in the Object.values(dataRow)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append('td');
        cell.text(val);
      });
  });
}

// filtering button going to be added here

function updateFilters() {

  // Save the element, value, and id the filter changing
  var changedElement = d3.select(this).select('input');
  var elementValue = changedElement.propery('value');
  var filterId = changedElement.attr('id');

  // process: if function is entered into the box, then the filtered date and it's value should go through
  if (elementValue) {
    filters[filterId] = elementValue;
  }
  else {
    delete filters[filterId];
  }

  // Call the function filterTable() to applay to all 
  filterTable();
}

// use this function to filter the tables when 
function filterTable() {

  // set the filteredData to the dataList
  let filteredData = dataList;

  // Create a for loop (json version) to find and pull data that matches the filterId
  Object.defineProperties(filters).forEach(([key, value]) => {
    filteredData = filteredData.filter(row => row[key] === value);
    });
  };

// define a function handleClick() that takes no arguments
// the job of this function is to 
function handleClick() {

  // Grab the #datetime value from the filter with d3.select().property()
  const date = d3.select('datatime').property('value'); // where is the value from
  // store the dataList into a local variable called filteredData
  let filteredData = dataList;

  // Check to see if a date was entered and filter the
  // data using that date.
  if (date) {
    filteredData = filteredData.filter(row => row.datatime == date);
  }
    // Apply `filter` to the table data to only keep the
    // rows where the `datetime` value matches the filter value
    //YOUR_CODE_HERE
  

  // Rebuild the table by calling you makeFilterTable() function and passing in your filteredData variable
  // @NOTE: If no date was entered, then filteredData will
  // just be the original dataList.
  makeFilterTable(filteredData); 
}

// Attach an event to listen for the form button #filter-btn to be clicked, it should call your handleClick function
d3.selectAll('#filter-btn').on('click', handleClick);

// Build the table with your makeFilterTable function when the page loads
makeFilterTable(dataList);
