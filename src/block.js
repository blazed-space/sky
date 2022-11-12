// block
const SHA256 = require('crypto-js/sha256');
const MD5 = require('crypto-js/md5');
const SHA1 = require('crypto-js/sha1');
const { v4: uuidv4 } = require('uuid');

module.exports = class Block {
    constructor(config){
        this.genesis = config.genesis;
        this.id = uuidv4();
        this.chainSymbol = this.genesis.CX;
        this.name = config.name;
        this.uri = `https://${config.hostname}.${config.domain}/`;
        this.hash = this.generateHash({
          type: 'block',
          id: this.id
        });
        this.timestamp = this.time();
        this.limit = this.genesis.LX;
        this.total = parseInt(this.genesis.TX);
        this.period = config.period;
        this.transactions = [];
    }
    time() {
        return (new Date().getTime() / 1000) | 0;
    }
    getSymbol() {
        return this.chainSymbol;
    }
    getStart() {
        return this.period[0];
    }
    getEnd() {
        return this.period[1];
    }
    getLength() {
        return this.period[1] - this.period[0];
    }
    transfer(_to, _from, _amount) {
        return createTransaction({
            to: _to,
            from: _from,
            amount: _amount,
        });
    }
    generateHash(config) {
        switch (config.type) {
            case 'transaction':
            case 'trans':
            let e = `${config.amount}@${config.timestamp}?${config.nonce}!${config.id}`;
            return SHA256(e).toString();
            case 'block':
            case 'blk':
            let w = `${config.id}***${config.prevHash}`;
            return SHA256(w).toString();
        }
    }
    createTransaction(config) {
        const time = this.time();
        const randNonce = Math.random(3096);
        const newId = this.transactions.length + 1;
        let newTransaction = {
            id: newId,
            to: config.to,
            from: config.from,
            amount: config.amount,
            nonce: randNonce,
            timestamp: time,
            hash: this.generateHash({
            type: 'trans',
            timestamp: time,
            nonce: randNonce,
            id: newId,
            }),
        };
    }
    addTransaction(transaction){
        this.transactions.push(transaction);
    }
};