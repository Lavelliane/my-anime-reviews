'use client'
import { Righteous, Inter } from 'next/font/google'
import { useRouter } from 'next/navigation'

const righteous = Righteous({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
})
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
})

function MainLayout({ children }) {
  const router = useRouter()
  const navItems = [
    {
      label: 'Anime',
      path: '/home',
    },
    {
      label: 'Manga',
      path: '/home',
    },
    {
      label: 'Community',
      path: '/home',
    },
    {
      label: 'Watch',
      path: '/home',
    },
    {
      label: 'Help',
      path: '/home',
    },
  ]
  return (
    <div className='py-8 px-10'>
      <div className="flex justify-between mb-8">
        <p className={`${righteous.className} text-royal-purple text-2xl`}>
          MyAnime
        </p>
        <nav className={`${inter.className} flex gap-4 items-center`}>
          {navItems.map((item, i) => (
            <p
              key={i}
              onClick={() => router.push(item.path)}
              className="cursor-pointer"
            >
              {item.label}
            </p>
          ))}
        </nav>
      </div>
      {children}
    </div>
  )
}
export default MainLayout
