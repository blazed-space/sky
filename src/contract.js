// contract
const Block = require('./block.js');

function time() {
  return (new Date().getTime() / 1000) | 0;
}

module.exports = class Contract {
  constructor(cfg) {
    let genesisBlock = new Block(cfg); 
    this.chain = [];
    // seed chain with genesis block
    if (genesisBlock instanceof Block) {
      this.chain.push(genesisBlock);
    }
  }
  addBlock(newBlock) {
    if (newBlock instanceof Block) {
      this.chain.push(newBlock);
    } else {
        let autoNewBlock = new Block(newBlock);
        this.chain.push(autoNewBlock);
    }
  }
};