import express, { query } from 'express';
const fs = require("fs");
const cors = require('cors');

const data = JSON.parse(fs.readFileSync("./src/data/smarty.json"));
const entryCount = Object.keys(data).length;

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
    res.json({ 'greeting': `Hello, ${req.query.name || 'World'} 👋`});
})

/**
 * TODO: Add your autocompleter endpoint below this component
 */

 app.post('/autocomplete', (req, res) => {

  let queryData = []

  const value = JSON.parse(req.headers["jsondata"] as string);

  for (let i = 0; i < entryCount; i++) {
    if (data[i].displayname.includes(value.text))
    queryData.push(data[i])
  }

  console.log(queryData)

  res.status(200).json(queryData);
})

  // res.status(200).json(test);
  // res.json({ "data": `${queryData}` });

app.listen(port, () => {
  console.log(`Backend server is listening on port ${port}.`);
});