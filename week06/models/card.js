const { ObjectId } = require('mongodb');
let client = require('../dbConnection');

let cardCollection = client.db('sit725').collection('week04');

async function getAllCards() {
    const cards = await cardCollection.find({ type: 'card' }).sort({ title: 1 }).toArray();
    // console.log('models',cards);
    return cards;
}

async function getByWeekName(weekName) {
    let card = await cardCollection.findOne({ title: weekName });
    // console.log(card);
    return card;
}

async function addCard(card) {
    await cardCollection.insertOne(card);
}

async function updateCard(card) {
    let id = new ObjectId(card._id);
    card.type = "card";
    card._id = id;
    try {
        await cardCollection.replaceOne({ _id: id }, card);
    } catch (e) {
        console.log(e)
    }
    return true;
}

async function delCard(title) {
    const card = await cardCollection.findOne({ title: title });
    if (card) {
        await cardCollection.deleteOne({ title: title });
    }
    return card;
}

async function delCardById(cardId) {
    let id;
    try {
        if (Number.isInteger(cardId)) {
            id = parseInt(cardId);
        } else if (typeof (cardId) == 'string') {
            id = new ObjectId(cardId);
        } else {
            id = cardId;
        }

        const card = await cardCollection.findOne({ _id: id });
        console.log(card)
        if (card) {
            await cardCollection.deleteOne({ _id: id });
            return true;
        }
    } catch (e) {
        console.log(e);
    }
    return false;
}

module.exports = { getAllCards, getByWeekName, addCard, updateCard, delCard, delCardById }