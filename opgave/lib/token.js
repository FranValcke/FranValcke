/**
 * Created by Fran on 5/12/2018
 *
 * */


var async = require('async');


const Web3 = require('web3');
const path = require('path');
const cjson = require('cjson');
const TX = require('ethereumjs-tx');

const Eth=require('ethjs-query');
const EthContract = require('ethjs-contract');
// contract details
//Deze 5 parameters heb ik aangepast naar mijn contract

const provider = 'https://rinkeby.infura.io/v3/ee4d4f4d70a7439a973da7221d48dad8';
const contractAddress = '0xb075fecb70e9313b23691d50227ef1d2a21fa214';
const privateKey = new Buffer('2095c47da2d0d2c221e65e31d00c1590b217bdd3df9b5404e1a570c805f72649', 'hex');
const defaultAccount = '0x246cf707AD4C3c02fB16D540aA0B5E45f4CF145B';
const etherscanLink = 'https://rinkeby.etherscan.io/tx/';

// initiate the web3
const web3 = new Web3(provider);

function startApp(web3) {
    const eth = new Eth(web3.currentProvider);
    const contract = new EthContract(eth);
    initContract(contract);
}
// initiate the contract with null value
var contract = null;

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
async; function buyTicket(req, res)  {

     const rawTrans = getContract().methods.buyTicket() ;
        return res.send(await);
        sendSignTransaction(rawTrans);
    }

// Send Signed Transaction
async; function sendSignTransaction(rawTrans) {
    // Initiate values required by the dataTrans
    if (rawTrans) {
        var txCount = await; web3.eth.getTransactionCount(defaultAccount) ;// needed for nonce
        var abiTrans = rawTrans.encodeABI() ;// encoded contract method
        var gas = await; rawTrans.estimateGas();
        var gasPrice = await; web3.eth.getGasPrice();
        gasPrice = Number(gasPrice);
        gasPrice = gasPrice * 2;
        var gasLimit = gas * 4;
// Initiate the transaction data
        var dataTrans = {
            nonce: web3.utils.toHex(txCount),
            gasLimit: web3.utils.toHex(gasLimit),
            gasPrice: web3.utils.toHex(gasPrice),
            to: contractAddress,
            data: abiTrans
        };
        // sign transaction
        var tx = new TX(dataTrans);
        tx.sign(privateKey);
// after signing send the transaction
        return await; sendSigned(tx)
    } else {
        throw new console.error('Encoded raw transaction was not given.');
    }
}



 function sendSigned(tx) {
        return new Promise(function(resolve,reject){
 // send the signed transaction
        web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'))
        .once("transactionHash", function(hash){
            var result = {
            'status':'sent',
            'url': etherscanLink + hash,
            'message':'click the given url to verify status of transaction'
            };
 // respond with the result
            resolve(result)
        }).then(out => {console.log(out)}).catch(err => {
 // respond with error
        reject(err)
            }
            )
        })
 }


module.exports = {
    buyTicket: buyTicket
};
