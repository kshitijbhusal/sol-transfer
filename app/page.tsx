'use client'
import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';

import { clusterApiUrl, Connection, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';




export default function Home() {

  const [receiver, setReceiver]: any = useState("null")
  const [solAmt, setSolAmt]: any = useState(0)
  const [loading, setLoading] = useState(false)

  const { publicKey, sendTransaction, wallet } = useWallet()


  const lamports = 1000000000 * solAmt;

  const connection = new Connection(clusterApiUrl('devnet'), ('confirmed'))





  // const sendSolana = useCallback(async () => {
  //   if (!publicKey) {
  //     alert("Connect your wallet first");
  //     return;
  //   }

  //   try {
  //     const toPubkey = new PublicKey('CULHUoFYC7FXcD6x1i2UvfFaCha64F1t3iuyo9ijVpr');
  //     const { blockhash } = await connection.getLatestBlockhash('confirmed');

  //     const transaction = new Transaction({
  //       recentBlockhash: blockhash,
  //       feePayer: publicKey,
  //     }).add(
  //       SystemProgram.transfer({
  //         fromPubkey: publicKey,
  //         toPubkey,
  //         lamports,
  //       })
  //     );

  //     // Let Phantom or connected wallet sign and send
  //     const signature = await sendTransaction(transaction, connection);

  //     // Wait for confirmation
  //     await connection.confirmTransaction(signature, 'confirmed');
  //     console.log("Transaction Signature:", signature);
  //     alert("Transaction successful!\nSignature: " + signature);
  //   } catch (error) {
  //     console.error("Transaction failed:", error);
  //     alert("Transaction failed. Check console.");
  //   }
  // }, [publicKey, sendTransaction, connection]);

  const sendSolana = async () => {
    setLoading(true)
    if (!publicKey) {
      alert("connect your wallet")
      setLoading(false)
      return null;
    }


    console.log(receiver)
    console.log(lamports)
    const toPubkey = new PublicKey(receiver);



    console.log(publicKey, toPubkey, lamports)



    const transferTransaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey,
        lamports
      })
    )

    const signature = await sendTransaction(transferTransaction, connection)
    await connection.confirmTransaction(signature, 'confirmed')

    setLoading(false)
    console.log('transaction sucessfull', signature)
    alert('transaction sucessfull')
  }

  return (
    <>
      <div>

        <div className=' container mx-auto p-4 flex justify-between' >
          <WalletMultiButton />
          <WalletDisconnectButton />


        </div>



        <section>
          <div className=' '>
            <input onChange={(e) => setReceiver(e.target.value)} className='border w-96 border-zinc-500/50 rounded-md px-2 py-2 m-1 outline-none ' name="" id="" placeholder='Receiver Public Key' type="text" /><br />
            <br />
            <input onChange={(e) => setSolAmt(e.target.value)} className='border w-96 border-zinc-500/50 rounded-md px-2 py-2 m-1 outline-none ' name="" id="" placeholder='SOL Amount' type="number" /><br />
            <br />
            <button onClick={sendSolana} className='bg-sky-500 px-2 py-1 rounded-md text-white w-fit border border-zinc-700 mx-auto'>{loading ? ("sending... ") : ("send solana ")} </button>
          </div>
        </section>
      </div>
    </>
  );
}
