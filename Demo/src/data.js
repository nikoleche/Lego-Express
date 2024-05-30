function dataController(req, res) {
  res.json({
    message: "Test",
    count: req.count,
  });
}

module.exports = { dataController };
