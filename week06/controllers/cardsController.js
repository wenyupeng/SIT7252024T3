let cardsModal = require('../models/card')

const getAllCards = async (req,res)=>{
    let cards = await cardsModal.getAllCards();
    // console.log('controller',cards);
    if(cards){
        res.send(ReturnResult.success(cards));
    }else{
        res.send(ReturnResult.fail());
    }
}

const addCard = async(req,res)=>{
    let weekName = req.body.weekName;
    if(!weekName){
        res.send(ReturnResult.fail('invalid weekName'));
    }

    let card = await cardsModal.getByWeekName(weekName);
    if(card){
        res.send(ReturnResult.fail('card exist'));
    }

    let addEntity = {
        title: req.body.weekName,
        description: req.body.description,
        evaluation: req.body.evaluation,
        type: 'card'
    };

    await cardsModal.addCard(addEntity);
    res.send(ReturnResult.success())

}

module.exports ={getAllCards,addCard}