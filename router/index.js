const express = require(`express`);
const router = express.Router();


router.get(`/`,(req,res) => {
  res.render('index', {welcome: `Selamat datang di landing page`})
})


module.exports = router
