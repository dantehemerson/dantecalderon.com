import React, { useEffect, useState } from 'react'
import { siteConfig } from '../config'

const icons: Record<string, React.ReactNode> = {
  home: (
    <svg
      className="icon-item"
      version="1.1"
      viewBox="0 0 36 36"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      aria-hidden="true"
      role="img"
    >
      <path d="M33.71,17.29l-15-15a1,1,0,0,0-1.41,0l-15,15a1,1,0,0,0,1.41,1.41L18,4.41,32.29,18.71a1,1,0,0,0,1.41-1.41Z" />
      <path d="M28,32h-5V22H13V32H8V18L6,20V32a2,2,0,0,0,2,2h7V24h6V34h7a2,2,0,0,0,2-2V19.76l-2-2Z" />
    </svg>
  ),
  blog: (
    <svg
      className="icon-item"
      version="1.1"
      width={36}
      height={36}
      viewBox="0 0 36 36"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="9.6 22.88 9.6 10.6 24.4 10.6 25.98 9 8 9 8 22.88 9.6 22.88" />
      <path d="M6,7H30V23h2V6.5A1.5,1.5,0,0,0,30.5,5H5.5A1.5,1.5,0,0,0,4,6.5V23H6Z" />
      <path d="M1,25v3.4A2.6,2.6,0,0,0,3.6,31H32.34a2.6,2.6,0,0,0,2.6-2.6V25Zm32,3.4a.6.6,0,0,1-.6.6H3.56a.6.6,0,0,1-.6-.6V26.53h9.95a1.64,1.64,0,0,0,1.5,1h7.13a1.64,1.64,0,0,0,1.5-1H33Z" />
      <rect x={0} y={0} width={36} height={36} fillOpacity={0} />
    </svg>
  ),
  projects: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      className="icon-item"
      viewBox="0 0 36 36"
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
      role="img"
      width={36}
      height={36}
      fill="currentColor"
    >
      <path d="M32,28a0,0,0,0,1,0,0H4V21.32a7.1,7.1,0,0,1-2-1.43V28a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V19.89a6.74,6.74,0,0,1-2,1.42Z" />
      <path d="M25,22.4a1,1,0,0,0,1-1V15.94H24V18H14v2H24v1.4A1,1,0,0,0,25,22.4Z" />
      <path d="M33,6H24V4.38A2.42,2.42,0,0,0,21.55,2h-7.1A2.42,2.42,0,0,0,12,4.38V6H3A1,1,0,0,0,2,7v8a5,5,0,0,0,5,5h3v1.4a1,1,0,0,0,2,0V15.94H10V18H7a3,3,0,0,1-3-3V8H32v7a3,3,0,0,1-3,3H28v2h1a5,5,0,0,0,5-5V7A1,1,0,0,0,33,6ZM22,6H14V4.43A.45.45,0,0,1,14.45,4h7.11a.43.43,0,0,1,.44.42Z" />
      <path d="M30,18A4.06,4.06,0,0,0,34,14V6H24V4.43A2.44,2.44,0,0,0,21.55,2h-7.1A2.44,2.44,0,0,0,12,4.43V6H2v8A4.06,4.06,0,0,0,6.05,18h4V15.92h2v5.7a1,1,0,1,1-2,0V20.06H6.06A6.06,6.06,0,0,1,2,18.49v9.45a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V18.49a6,6,0,0,1-4.06,1.57H28V18ZM14,4.43A.45.45,0,0,1,14.45,4h7.1a.45.45,0,0,1,.45.43V6H14ZM26,21.62a1,1,0,1,1-2,0V20.06H14V18H24V15.92h2Z" style={{ display: 'none' }} />
    </svg>
  ),
}

interface NavbarProps {
  active?: string
  menu?: typeof siteConfig.menu
  title?: string
  subtitle?: string
}

export default function Navbar({ active = '', menu = siteConfig.menu, title = siteConfig.title, subtitle = siteConfig.subtitle }: NavbarProps) {
  const [navbarIsTop, setNavbarIsTop] = useState(true)
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  useEffect(() => {
    const scrollListener = () => {
      const scrollPosition = document.documentElement.scrollTop
      setNavbarIsTop(scrollPosition <= 5)
    }

    const resizeListener = () => {
      const width = window.innerWidth
      if (width >= 768) {
        setMenuIsOpen(false)
      }
    }
    window.addEventListener('scroll', scrollListener)
    window.addEventListener('resize', resizeListener)

    return () => {
      window.removeEventListener('scroll', scrollListener)
      window.removeEventListener('resize', resizeListener)
    }
  }, [])

  const handleToggle = () => {
    setMenuIsOpen(prev => !prev)
  }

  const wrapperClass = [
    'h-[61px] flex justify-center fixed left-0 top-0 w-full z-10 bg-white',
    'shadow-[0px_1px_0px_0px_#e8e8e8] transition-colors',
    active === '' ? 'bg-transparent' : '',
    !navbarIsTop ? '!bg-white' : '',
  ].join(' ')

  return (
    <nav className={wrapperClass} id="Navbar">
      {/* Shadow overlay for mobile menu */}
      <div
        className={`fixed left-[900%] top-0 w-[900%] h-full transition-none md:hidden ${menuIsOpen ? '!left-0 bg-black/30 z-20 transition-colors duration-400' : ''}`}
        onClick={() => setMenuIsOpen(false)}
      />

      <div className="flex items-center justify-between px-5 w-[900px] max-w-full">
        {/* Logo + Title */}
        <a
          href="/"
          onClick={() => setMenuIsOpen(false)}
          className="flex items-center rounded-[3px] pr-[3px] hover:bg-[rgba(195,195,195,0.22)]"
        >
          <img
            src="/logo.png"
            alt={subtitle}
            className="w-8 h-8 rounded-[3px] mr-2"
          />
          <p className="capitalize font-black text-[#052d3f] m-0">{title}</p>
        </a>

        <div>
          {/* Mobile toggler */}
          <button
            onClick={handleToggle}
            id="navbarToggler"
            aria-label="Navbar Toggle"
            className={`md:hidden relative w-[30px] h-[18px] top-1 bg-transparent border-0 p-0 cursor-pointer z-[100] focus:outline-none ${menuIsOpen ? 'open' : ''}`}
          >
            <span className="burger-menu block relative w-[30px] h-[2px] bg-[rgba(0,0,0,0.88)] rounded-none transition-all duration-250 top-2 after:content-[''] after:absolute after:left-0 after:h-[2px] after:w-[30px] after:rounded-none after:bg-[rgba(0,0,0,0.88)] after:transition-all after:duration-250 after:-top-2 before:content-[''] before:absolute before:left-0 before:h-[2px] before:w-[30px] before:rounded-none before:bg-[rgba(0,0,0,0.88)] before:transition-all before:duration-250 before:top-2" />
          </button>

          {/* Navigation */}
          <ul
            className={`z-30 list-none absolute top-0 shadow-[0px_0px_0px_1px_#f3f3f3] w-3/4 max-w-[420px] h-screen flex-col justify-center items-center bg-white transition-[right] duration-400 md:static md:flex-row md:bg-transparent md:shadow-none md:w-auto md:h-auto md:max-w-none md:right-auto md:flex md:opacity-100 md:visible ${menuIsOpen ? 'right-0' : '-right-[102%]'}`}
          >
            {menu.map((item, index) => (
              <li
                key={index}
                className="w-[98%] md:w-auto md:ml-0.5 md:border-t-0 md:last:border-b-0"
              >
                <a
                  href={item.to}
                  onClick={() => setMenuIsOpen(false)}
                  className={`text-[15px] font-semibold py-[10px] px-2 text-center rounded-[3px] flex items-center justify-center hover:!bg-[rgba(195,195,195,0.22)] md:py-1.5 md:!px-4 no-underline text-[#052d3f] ${active === item.id ? '!text-[#1976d2]' : ''}`}
                >
                  <span className="pr-1 relative w-[21px] h-[21px]">
                    {icons[item.icon]}
                  </span>
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
