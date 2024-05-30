import Image from 'next/image'
import React from 'react'
import  hm from "@/public/images/H&M-Logo.svg (1).png"
import  zara from "@/public/images/1280px-Zara_Logo.svg.png"
import nike from '@/public/images/Logo_nike_principal.jpg'
import gucci from '@/public/images/106616095.webp'
import addi from '@/public/images/addidas.png'
import apple from '@/public/images/apple.png'
import  ck from '@/public/images/ck.png'
import levi from '@/public/images/levi.png'
import elf from '@/public/images/elf.png'
import jimmy from '@/public/images/jimmy.jpeg'
const Logo = () => {
  return (
    <div className='my-10'>
    <div className="flex overflow-hidden space-x-16 group">
      <div className="flex space-x-16 items-center animate-loop-scroll group-hover:paused">
        <Image src={hm} className="max-w-none w-16 h-16" alt='H&M'/>
        <Image src={zara} className="max-w-none w-20 h-16" alt='Zara'/>
        <Image src={nike} className="max-w-none w-20 h-16" alt='Nike'/>
        <Image src={gucci} className="max-w-none w-20 h-16" alt='Gucci'/>
        <Image src={addi} className="max-w-none w-20 h-16" alt='Addidas'/>
        <Image src={apple} className="max-w-none w-20 h-16" alt='Apple'/>
        <Image src={ck} className="max-w-none w-20 h-16" alt='cK'/>
        <Image src={levi} className="max-w-none w-20 h-20" alt='Levi'/>
        <Image src={elf} className="max-w-none w-20 h-20" alt='e.l.f'/>
        <Image src={jimmy} className="max-w-none w-20 h-20" alt='Jimmy'/>
      </div>
      <div className="flex items-center space-x-16 animate-loop-scroll group-hover:paused" aria-hidden="true">
      <Image src={hm} className="max-w-none w-16 h-16" alt='H&M'/>
      <Image src={zara} className="max-w-none w-20 h-16" alt='Zara'/>
      <Image src={nike} className="max-w-none w-20 h-16" alt='Nike'/>
      <Image src={gucci} className="max-w-none w-20 h-16" alt='Gucci'/>
      <Image src={addi} className="max-w-none w-20 h-16" alt='Addidas'/>
      <Image src={apple} className="max-w-none w-20 h-16" alt='Apple'/>
      <Image src={ck} className="max-w-none w-20 h-16" alt='cK'/>
     <Image src={levi} className="max-w-none w-20 h-20" alt='Levi'/>
     <Image src={elf} className="max-w-none w-20 h-20" alt='e.l.f'/>
        <Image src={jimmy} className="max-w-none w-20 h-20" alt='Jimmy'/>
      </div>
    </div></div>
  )
}

export default Logo