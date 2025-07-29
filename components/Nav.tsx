'use client'
import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import React from 'react'

const Nav = () => {
    return (
        <>
            <div className=' container mx-auto p-4 flex justify-between' >
                <WalletMultiButton />
                <WalletDisconnectButton />


            </div>
        </>
    )
}

export default Nav