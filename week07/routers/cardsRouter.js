let express = require('express');
let router = express.Router();
let cardsController =require('../controllers/cardsController');

router.get('/',(req,res)=>{
    cardsController.getAllCards(req,res);
});

router.post('/',(req,res)=>{
    cardsController.addCard(req,res);
});

router.put('/',(req,res)=>{
    cardsController.updateCard(req,res);
});


router.delete('/:cardId',(req,res)=>{
    cardsController.deleteCard(req,res);
});

module.exports = router;
