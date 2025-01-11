let cardsModal = require('../models/card')

const getAllCards = async (req, res) => {
    let cards = await cardsModal.getAllCards();
    // console.log('controller',cards);
    if (cards) {
        res.send(ReturnResult.success(cards));
    } else {
        res.send(ReturnResult.fail());
    }
}

const addCard = async (req, res) => {
    let weekName = req.body.weekName;
    if (!weekName) {
        res.send(ReturnResult.fail('invalid weekName'));
        return;
    }

    let card = await cardsModal.getByWeekName(weekName);
    if (card) {
        res.send(ReturnResult.fail('card exist'));
        return;
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

const updateCard = async (req, res) => {
    let card = req.body;
    if (!(card._id)) {
        res.send(ReturnResult.fail('card id must not be empty'));
        return;
    }

    let flag = await cardsModal.updateCard(card);
    if (flag) {
        res.send(ReturnResult.success("update successfully"));
    } else {
        res.send(ReturnResult.fail("update fail"));
    }

}

const deleteCard = async (req, res) => {
    let cardId = req.params.cardId;
    console.log(cardId)
    if (!cardId) {
        res.send(ReturnResult.fail('card id must not be empty'));
        return;
    }

    await cardsModal.delCardById(cardId);
    res.send(ReturnResult.success());

}

module.exports = { getAllCards, addCard, updateCard, deleteCard }