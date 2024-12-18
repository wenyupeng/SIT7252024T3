let client = require('../dbConnection');

let cardCollection = client.db('sit725').collection('week04');

async function getAllCards() {
    const cards = await cardCollection.find({ type: 'card' }).toArray();
    // console.log('models',cards);
    return cards;
}

async function getByWeekName(weekName) {
    let card = await cardCollection.findOne({ title: weekName });
    console.log(card);
    return card;
}

async function addCard(card) {
    await cardCollection.insertOne(card);
}

async function delCard(title) {
    const card = await cardCollection.findOne({ title: title });
    if(card){
        await cardCollection.deleteOne({title:title});
    }
    return card;
}

module.exports = { getAllCards, getByWeekName, addCard, delCard }