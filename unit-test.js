const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../index.js');

describe('GET /customers/:id', () => {
    before((done) =>{
        mysqlConnection.connect()
        .then(() => done())
        .catch((err) => done(err));
    });
});

it('OK, getting a new employee works', (done) => {
    request(app).get('/customers/:id')
    .then((res) =>{
        const body = res.body;
        expect(body.length).to.equal(1);
        done();
    })
    .catch((err) => done(err));
});
