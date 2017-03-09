'use strict';
const server = require("../app");
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

describe('/GET inicial', () => {
    it('Test la ruta base', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.not.have.property('last');
                //res.body.name.should.be.a('array');
                //res.body.name.length.should.be.eql(2);
                done();
            });
    });
});