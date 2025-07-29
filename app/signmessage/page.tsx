'use client'
import { useWallet } from '@solana/wallet-adapter-react'
import React, { useState } from 'react'
import bs58 from 'bs58'

const page = () => {

    const [message, setMessage] = useState("kshitiz")
    const { publicKey, signMessage } = useWallet()

    async function handleSignMessage() {
        if (!publicKey || !signMessage) {
            alert("connect walllet")
            return
        }

        const encodedMessage = new TextEncoder().encode(message)
        console.log(encodedMessage)

        const signature = await signMessage(encodedMessage)
        console.log('signature', signature)
        const sign = bs58.encode(signature);
        console.log(sign)
        return

    }
    return (
        <>
            <section>
                <div>
                    <div className='mb-4'>
                        <h1>Sign a message with wallet</h1>
                    </div>

                    <div>
                        <input type="text" placeholder='your message' />
                        <button className='bg-sky-600 rounded-md p-2 cursor-pointer text-white ' onClick={handleSignMessage}  >Sign Message</button>
                    </div>
                </div>
            </section>

        </>
    )
}

export default page