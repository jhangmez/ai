import localFont from 'next/font/local'
import { Toaster } from 'react-hot-toast'
import { Providers } from './Providers'
import { Suspense } from 'react'
import './globals.css'
import Loading from './loading'
const myFont = localFont({ src: '/PlusJakartaSans-VariableFont_wght.ttf' })

const shortTitle = 'AI jhangmez'
const description = 'Esta página contiene el portafolio de @jhangmez'
const jhangmez = ' | jhangmez'
const title = `${shortTitle}${jhangmez}`
const imageUrl = `https://jhangmez.vercel.app/api/og2?title=${shortTitle}&description=${description}`

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: 'article',
    url: 'https://jhangmez.xyz/',
    images: [{ url: imageUrl }]
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [imageUrl]
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='es'>
      <body
        className={`${myFont.className} antialiased absolute top-0 z-[-2] h-screen w-full bg-white
  bg-[radial-gradient(100%_50%_at_50%_0%,rgba(26,108,48,0.13)_0,rgba(26,108,48,0)_50%,rgba(26,108,48,0)_100%)]
  dark:bg-[radial-gradient(100%_50%_at_50%_0%,rgba(169,251,175,0.13)_0,rgba(169,251,175,0)_50%,rgba(169,251,175,0)_100%)] bg-light-background dark:bg-dark-background selection:bg-light-primary selection:text-light-onPrimary dark:selection:bg-dark-primary dark:selection:text-dark-onPrimary`}
      >
        <Providers>
          <Toaster
            containerClassName='font-semibold text-light-primary dark:text-dark-primary'
            position='bottom-right'
            reverseOrder={false}
          />
          <noscript>Página realizada por Jhan Gómez P. @jhangmez</noscript>
          <Suspense fallback={<Loading />}>{children} </Suspense>
        </Providers>
      </body>
    </html>
  )
}
