process.env.NODE_ENV = 'test';
let request = require('supertest');
let app = require('../server')
let expect = require('chai').expect;
let cardModel = require('../models/card')

describe('Cards API', () => {
    describe('post card', () => {
        before(async function () {
            await cardModel.delCard('test');
        })

        it('post new card', (done) => {
            request(app)
                .post('/cards')
                .set('Content-Type', 'application/json')
                .send({
                    weekName: 'test',
                    description: 'test',
                    evaluation: 'test',
                    type: 'card'
                })
                .end((err, res) => {
                    if (err) done(err);

                    expect(res.status).to.equal(200);
                    done();
                })
        });

        it('invalid input weekName', (done) => {
            request(app)
                .post('/cards')
                .set('Content-Type', 'application/json')
                .send({
                    title: 'test',
                    description: 'test',
                    evaluation: 'test',
                    type: 'card'
                })
                .end((err, res) => {
                    if (err) done(err);

                    expect(res.status).to.equal(200);
                    expect(res.body.success).to.equal(false);
                    done();
                })
        })

        it('add an existing card', (done) => {
            request(app)
                .post('/cards')
                .set('Content-Type', 'application/json')
                .send({
                    title: 'test',
                    description: 'test',
                    evaluation: 'test',
                    type: 'card'
                })
                .end((err, res) => {
                    if (err) done(err);

                    expect(res.status).to.equal(200);
                    expect(res.body.success).to.equal(false);
                    done();
                })
        })

    });

    describe('update card', function () {
        let cardId;
        before(async function () {
            let card = await cardModel.getByWeekName('test');
            cardId = card._id;
        })

        it('update without id info', function (done) {
            request(app)
                .put('/cards')
                .set('Content-Type', 'application/json')
                .send({
                    title: 'test',
                    description: 'test',
                    evaluation: 'test',
                    type: 'card'
                })
                .end((err, res) => {
                    if (err) done(err);

                    expect(res.status).to.equal(200);
                    expect(res.body.success).to.equal(false);
                    done();
                })
        })

        this.slow(100);

        it('update successfully', function (done) {
            request(app)
                .put('/cards')
                .set('Content-Type', 'application/json')
                .send({
                    _id: cardId,
                    title: 'test',
                    description: 'test123',
                    evaluation: 'test123',
                    type: 'card'
                })
                .end((err, res) => {
                    if (err) done(err);

                    expect(res.status).to.equal(200);
                    expect(res.body.success).to.equal(true);
                    done();
                })
        });
    })

    describe('get card list', function () {
        it('returns status 200 to check if api works', function (done) {
            request(app)
                .get('/cards')
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    if (err) done(err);

                    expect(res.status).to.equal(200);
                    expect(res.body.success).to.equal(true);
                    expect(res.body.data).to.be.an('array');
                    expect(res.body.data.length).gt(1);
                    done()
                })
        })

        it('should return 404 if endpoint is wrong', function (done) {
            request(app).get('/wrongEndpoint')
                .end(function (err, res) {
                    if (err) done(err);

                    expect(res.status).to.equal(404);
                    done();
                });
        });
    });

    describe('delete card', function () {
        it('delete card without id', function (done) {
            request(app)
                .delete('/cards')
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    if (err) done(err);

                    expect(res.status).to.equal(404);
                    done()
                })
        })

        it('should return failure flag for non-existent card', function (done) {
            const cardId = 999; 

            request(app)
                .delete(`/cards/${cardId}`)
                .end(function (err, res) {
                    if (err) done(err);

                    console.log(res.body)
                    expect(res.status).to.equal(200);
                    expect(res.body.success).to.equal(true);
                    done();
                });
        });

    })

})