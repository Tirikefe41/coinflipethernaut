const {providers, Contract, Wallet} = require('ethers');


if (process.env.NODE_ENV === "production") {
    require("custom-env").env();
  } else {
    require("custom-env").env("development");
}

const CHAIN_ID = 4;
const address = "0xEFf8653F9A25D34895d9fC95aDA2829E3cbE5Ea0";
const abi = require('./abi.json');

console.log(`Found abi: ${JSON.stringify(abi)}`)

const provider = new providers.InfuraProvider(CHAIN_ID)
const signer = new Wallet(process.env.PRIVY, provider);
console.log('logging....')

//ethernaut

const FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;
const flipContract = new Contract( address , abi , signer );

provider.on('block', (blockNumber)=>{

    console.log(`CurrentBlock: ${blockNumber}`);

    provider.getBlock(blockNumber).then((Block) =>{
        console.log(`CurrentBlock: ${JSON.stringify(Block)} with \n\nhash: ${Block.hash}`);
        console.log('\n <<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n')
        console.log(`Divisor: ${parseInt(Block.hash/FACTOR)}`)
    }) 
});