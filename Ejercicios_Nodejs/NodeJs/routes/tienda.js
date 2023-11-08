const express = require("express");
const router = express.Router();

router.get("/", (req,res) => {
    res.render('index', {title: 'Titulo', message: 'Hola Hola este es el curso de Javascript!'});
  });

module.exports = router;