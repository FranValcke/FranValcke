/**
 * Created by Fran on 5/12/2018.
 */

const Web3 = require('web3');
const path = require('path');
const cjson = require('cjson');
const TX = require('ethereumjs-tx');


// contract details
//Deze 5 parameters heb ik aangepast naar mijn contract

const provider = 'https://rinkeby.infura.io/v3/ee4d4f4d70a7439a973da7221d48dad8';
const contractAddress = '0xb075fecb70e9313b23691d50227ef1d2a21fa214';
const privateKey = new Buffer('2095c47da2d0d2c221e65e31d00c1590b217bdd3df9b5404e1a570c805f72649', 'hex');
const defaultAccount = '0x246cf707AD4C3c02fB16D540aA0B5E45f4CF145B';
const etherscanLink = 'https://rinkeby.etherscan.io/tx/';

// initiate the web3
const web3 = new Web3(provider);

// initiate the contract with null value
var contract = null;

// convert Wei to Eth
function convertWeiToEth( stringValue ) {
    if ( typeof stringValue != 'string' ) {
        stringValue = String( stringValue );
    }
    return web3.utils.fromWei( stringValue, 'ether' );
}

// Initiate the Contract
function getContract() {
    if (contract === null) {
        //ABI.JSON moet abi van het contract zijn.
        //Deze vind je terug in remixIDE
        var abi = cjson.load(path.resolve(__dirname, '../ABI/abi.json'));
        var c = new web3.eth.Contract(abi,contractAddress);
        contract = c.clone();
    }
    console.log('Contract Initiated successfully!');
    return contract;
}

// send token to Address / dit komt overeen met de BuyTicket code
//Als ik async en await weg haal werkt het wel
async function buyTicket(req, res)  {

     const rawTrans = getContract().methods.buyTicket("Fran") ;
     return res.send(await sendSignTransaction(rawTrans));

}

module.exports = {
    send: sendToken,
    mint: mintToken,
    balance: getBalance
};