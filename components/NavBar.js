'use client'; // enables client-side rendering
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {useState, useEffect} from 'react'
import {signIn, signOut, useSession, getProviders} from 'next-auth/react'

const NavBar = () => {

  // const isUserLoggedIn = true

  const {data: session} = useSession()

  const [providers, setProviders] = useState(null)

  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fetchProviders = async () => {
      const providers = await getProviders()
      setProviders(providers)
    }
    fetchProviders()
  }, [])

  return ( 
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image src="/assets/images/logo.svg"
        alt='logo'
        width={30}
        height={30}
        className='object-contain'/>

        <p className='logo_text'>Prompt Genuis</p>
      </Link>

    {/* Web */}

      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/generate-prompt' className='black_btn'>
              Create Post
            </Link>

            <button type='button' onClick={signOut} className='outline_btn'>
              Sign Out
            </button>

            <Link href='/profile' className='flex gap-2'>
              <Image src="/assets/icons/menu.svg" width={40} height={40} className='rounded-full' alt='profile'></Image>
              </Link>
          </div>
        ) : (
          <>
          {providers && Object.values(providers).map(provider => (  
            <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>
              Sign in {provider.name}
            </button>
          ))}
          </>
        )}
      </div>

    {/* Mobile */}

      <div className='sm:hidden flex relative'>
      {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Image src="/assets/icons/menu.svg" width={40} height={40} className='rounded-full' alt='profile' onClick={()=>{
              setMenuOpen(!menuOpen)
            }}></Image>

          {menuOpen && (
            <div className='dropdown'>
              <Link href='/profile' className='dropdown_link' onClick={()=>{
                setMenuOpen(false)
              }}>
                My Profile
              </Link>

              <Link href='/create-prompt' className='dropdown_link' onClick={()=>{
                setMenuOpen(false)
              }}>
               Create Prompt
              </Link>

              <button type='button' className='mt-5 w-full black_btn' onClick={()=>{
                signOut()
                setMenuOpen(false)
              }}>
                Sign Out
              </button>
            </div>
          )}

          </div>
        ) : (
          <>
          {providers && Object.values(providers).map(provider => (  
            <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>
              Sign in {provider.name}
            </button>
          ))}
          </>
        )}
        </div>
    </nav>
  )
}

export default NavBar