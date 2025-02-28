// 0x3b26E8DA9aDedAAe86a260b6354aC1855AA65C14

import path from 'path'
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

import {
  Hex,
  createWalletClient,
  getContract,
  http,
  publicActions,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import artifacts from "./submit.artifacts.json";

// Application Binary Interface
const { abi } = artifacts;

const privateKey = process.env.PRIVATE_KEY;
const account = privateKeyToAccount(`0x${privateKey}` as Hex);

(async () => {
  const client = createWalletClient({
    account,
    transport: http(process.env.API_URL),
  }).extend(publicActions);

  const contractAddress = '0x3b26E8DA9aDedAAe86a260b6354aC1855AA65C14';
  const contract = getContract({
    address: contractAddress,
    abi,
    client,
  });

  const tx = await contract.write.recordSubmission([
    'MichaelPaulMeneses',
    'MichaelPaulMeneses',
    '0x3225f10059432251b18221D33fc9d02828eCB271',
    '0xFa13cd323e9CecD642392A97661da85C1BD44a9e'
    ]);    
  console.log('tx', tx);
})();