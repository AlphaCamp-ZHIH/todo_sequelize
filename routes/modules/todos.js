const express = require('express');

const router = express.Router();

router.get('/create', (req, res) => {
res.render('create')
});
router.post('/create',(req,res)=>{


});
router.get('/:id/edit', (req, res) => {


})
router.put('/:id', (req, res) => {


})


router.delete('/:id', (req, res) => {


});


module.exports = router;