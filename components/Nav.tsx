"use client"

import React from 'react'
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
  const { data: session } = useSession()
  const [providers, setProviders] = useState<any>(null);

  useEffect(() => {
    const setProvider = async () => {
      const response = await getProviders()
      setProviders(response)
    }
    setProvider()
  }, [])

  return (

    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href={'/'} className='flex gap-2 flex-center'>
        <Image className='object-contain' src={'/assets/images/logo.svg'} width={30} height={30} alt='Logo' />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigatiohn */}
      <div className='sm:flex hidden'>
        {
          session?.user ? (
            <div className="flex gap-3 md:gap-5">
              <Link href="/create-prompt" className="black_btn"> Create Post </Link>
              <button type="button" onClick={() => signOut()} className="outline_btn">Sign Out</button>
              <Link href='/profile'>
                <Image src={String(session?.user?.image)} width={40} height={40} alt="Profile" className='rounded-full'></Image>
              </Link>
            </div>
          ) : (
            <>
              {
                providers && Object.values(providers).map((provider: any) => (
                  <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                    Sign In
                  </button>
                ))
              }
            </>
          )
        }
      </div>
    </nav>
  )
}

export default Nav