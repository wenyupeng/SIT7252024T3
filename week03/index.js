const express = require("express");

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port 3000");
})