import express from "express";
const fs = require("fs");
const cors = require("cors");

const data = JSON.parse(fs.readFileSync("./src/data/smarty.json")); // Variable that's keeping whole file data
const entryCount = Object.keys(data).length; // Get how many etries there is in a file

const app = express();
const port = 3001;

app.use(cors())

app.get('/', (_req, res) => {
  res.send('<h1>Congratulations 🎉 You got the WCC 2022 backend server running. Good luck with your task 🙌</h1>');
})

/**
 * Example endpoint
 *  consumes: query parameter "name"
 *  returns: a JSON response
 */
app.get('/greeting', (req, res) => {
  res.json({ 'greeting': `Hello, ${req.query.name || 'World'} 👋` });
})

/**
 * TODO: Add your autocompleter endpoint below this component
 */

app.post("/autocomplete", (req, res) => {

  let queryData = [{}] // Initialize empty object

  let value = JSON.parse(req.headers["jsondata"] as string); // Get user data from request headers

  value.query = value.query.toLowerCase()

  if (value.query.length === 0) { // If length of requested data === 0, return empty object
    res.status(200).json(queryData);
    return
  }

  // Would cause performance issues if there was a lot of data
  for (let i = 0; i < entryCount; i++) { // Loop trough whole data file
    if (data[i].displayname.toLowerCase().includes(value.query)) // Check if "displayname" contains request data
      queryData.push(data[i]) // Add to object
  }

  queryData.shift(); // Delete empty entry from object

  if (queryData.length >= 10) queryData = queryData.slice(9) // Limit autocompletion suggestion to max 10

  res.status(200).json(queryData); // Return selected autocompletion data
})

app.listen(port, () => {
  console.log(`Backend server is listening on port ${port}.`);
});