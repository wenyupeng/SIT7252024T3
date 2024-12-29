process.env.NODE_ENV = 'test';
let request = require('supertest');
let app = require('../server')
let expect = require('chai').expect;
let cardModel = require('../models/card')

describe('Cards', () => {
    describe('get card list', function () {
        it('returns status 200 to check if api works', function (done) {
            request(app)
                .get('/cards')
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.success).to.equal(true);
                    expect(res.body.data).to.be.an('array');
                    expect(res.body.data.length).gt(1);
                    done()
                })

        })
    });

    describe('post card', () => {
        before(() => {
            let card = cardModel.delCard('test');
            // console.log(card);
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
                expect(res.status).to.equal(200);
                expect(res.body.success).to.equal(false);
                done();
            })
        })

    })
})