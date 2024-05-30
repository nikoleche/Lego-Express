const express = require("express");
const { countMiddleware } = require("./counter");
const { dataController } = require("./data");
const path = require("path");

const app = express();

const homeHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/static/styles.css">
    <title>Document</title>
</head>
<body>
<h1>Homepage</h1>
<a href="/home">Home</a>
<a href="/catalog">Catalog</a>
<img src="static/siamese.jpg">
</body>
</html>
`;

const catalogHtml = `
<h1>Catalog Page</h1>
<a href="/">Home</a>
<a href="/catalog">Catalog</a>
`;

console.log(path.join(__dirname, "../", "./static/styles.css"));

app.get("/", (req, res) => {
  res.send(homeHtml);
});

// app.get("/static/styles.css", (req, res) => {
//   res.sendFile(path.join(__dirname, "../", "./static/styles.css"));
// });

app.use("/static", express.static("static"));

app.get("/catalog", (req, res) => {
  res.send(catalogHtml);
});

app.get("/catalog/:category/:product/details", (req, res) => {
  res.send(
    catalogHtml +
      `<p>Category: ${req.params.category}</p>` +
      `<p>Product Page ${req.params.product}</p>`
  );
});

app.get("/data", countMiddleware, dataController);

app.get("/test", (req, res) => {
  res.redirect("/data");
});

app.get("*", (req, res) => {
  res.status(404);
  res.send("404 Not Found");
});

app.listen(3000, () => {
  console.log("Application listening on port 3000");
});
