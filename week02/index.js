const express = require('express');

const app = express();
app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

const addTwoNumber = (n1,n2) => {
    return n1+n2;
}    

app.get("/addTwoNumber", (req, res) => {
    const num1 = req.query.num1;
    const num2 = req.query.num2;
    const result = addTwoNumber(parseInt(num1),parseInt(num2))
    res.json({statusCode: 200, message: "Success", result: result});
})


app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port 3000');
});