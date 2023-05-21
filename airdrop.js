const SOLANA = require('@solana/web3.js');
const { Connection, PublicKey, LAMPORTS_PER_SOL, clusterApiUrl } = SOLANA;

const SOLANA_CONNECTION = new Connection(clusterApiUrl('devnet'));
const WALLET_ADDRESS = process.env.WALLET_ADDRESS; //👈 Replace with your wallet address
const AIRDROP_AMOUNT = 1 * LAMPORTS_PER_SOL; // 1 SOL 

(async () => {
    console.log(`Requesting airdrop for ${WALLET_ADDRESS}`)
    // 1 - Request Airdrop
    const signature = await SOLANA_CONNECTION.requestAirdrop(
        new PublicKey(WALLET_ADDRESS),
        AIRDROP_AMOUNT
    );
    // 2 - Fetch the latest blockhash
    const { blockhash, lastValidBlockHeight } = await SOLANA_CONNECTION.getLatestBlockhash();
    // 3 - Confirm transaction success
    await SOLANA_CONNECTION.confirmTransaction({
        blockhash,
        lastValidBlockHeight,
        signature
    }, 'finalized');
    // 4 - Log results
    console.log(`Tx Complete: https://explorer.solana.com/tx/${signature}?cluster=devnet`)
})();
