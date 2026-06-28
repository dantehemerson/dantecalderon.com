import { graphql, Link, useStaticQuery } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { media, mediaMax } from '../styles'

/** Icons from: https://icongr.am/clarity */
const icons: Record<string, JSX.Element> = {
  home: (
    <svg
      className="icon-item"
      version="1.1"
      viewBox="0 0 36 36"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
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
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <polygon points="9.6 22.88 9.6 10.6 24.4 10.6 25.98 9 8 9 8 22.88 9.6 22.88" />
      <path d="M6,7H30V23h2V6.5A1.5,1.5,0,0,0,30.5,5H5.5A1.5,1.5,0,0,0,4,6.5V23H6Z" />
      <path d="M1,25v3.4A2.6,2.6,0,0,0,3.6,31H32.34a2.6,2.6,0,0,0,2.6-2.6V25Zm32,3.4a.6.6,0,0,1-.6.6H3.56a.6.6,0,0,1-.6-.6V26.53h9.95a1.64,1.64,0,0,0,1.5,1h7.13a1.64,1.64,0,0,0,1.5-1H33Z" />
      <rect x={0} y={0} width={36} height={36} fillOpacity={0} />
    </svg>
  ),
  user: (
    <svg
      className="icon-item"
      version="1.1"
      width={36}
      height={36}
      viewBox="0 0 36 36"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path d="M18,17a7,7,0,1,0-7-7A7,7,0,0,0,18,17ZM18,5a5,5,0,1,1-5,5A5,5,0,0,1,18,5Z" />
      <path d="M30.47,24.37a17.16,17.16,0,0,0-24.93,0A2,2,0,0,0,5,25.74V31a2,2,0,0,0,2,2H29a2,2,0,0,0,2-2V25.74A2,2,0,0,0,30.47,24.37ZM29,31H7V25.73a15.17,15.17,0,0,1,22,0h0Z" />
      <rect x={0} y={0} width={36} height={36} fillOpacity={0} />
    </svg>
  ),
  'view-cards': (
    <svg
      className="icon-item"
      version="1.1"
      width={36}
      height={36}
      viewBox="0 0 36 36"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path d="M15,17H4a2,2,0,0,1-2-2V8A2,2,0,0,1,4,6H15a2,2,0,0,1,2,2v7A2,2,0,0,1,15,17ZM4,8v7H15V8Z" />
      <path d="M32,17H21a2,2,0,0,1-2-2V8a2,2,0,0,1,2-2H32a2,2,0,0,1,2,2v7A2,2,0,0,1,32,17ZM21,8v7H32V8Z" />
      <path d="M15,30H4a2,2,0,0,1-2-2V21a2,2,0,0,1,2-2H15a2,2,0,0,1,2,2v7A2,2,0,0,1,15,30ZM4,21v7H15V21Z" />
      <path d="M32,30H21a2,2,0,0,1-2-2V21a2,2,0,0,1,2-2H32a2,2,0,0,1,2,2v7A2,2,0,0,1,32,30ZM21,21v7H32V21Z" />
      <rect x={0} y={0} width={36} height={36} fillOpacity={0} />
    </svg>
  ),
  mail: (
    <svg
      className="icon-item"
      version="1.1"
      width={36}
      height={36}
      viewBox="0 0 36 36"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path d="M32,6H4A2,2,0,0,0,2,8V28a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V8A2,2,0,0,0,32,6ZM30.46,28H5.66l7-7.24-1.44-1.39L4,26.84V9.52L16.43,21.89a2,2,0,0,0,2.82,0L32,9.21v17.5l-7.36-7.36-1.41,1.41ZM5.31,8H30.38L17.84,20.47Z" />
      <rect x={0} y={0} width={36} height={36} fillOpacity={0} />
    </svg>
  ),
  highlighter: (
    <svg
      className="icon-item"
      version="1.1"
      width={36}
      height={36}
      viewBox="0 0 36 36"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path
        d="M15.82 26.06a1 1 0 01-.71-.29l-6.44-6.44a1 1 0 01-.29-.71 1 1 0 01.29-.71L23 3.54a5.55 5.55 0 117.85 7.86L16.53 25.77a1 1 0 01-.71.29zm-5-7.44l5 5L29.48 10a3.54 3.54 0 000-5 3.63 3.63 0 00-5 0z"
        className="clr-i-outline clr-i-outline-path-1"
      ></path>
      <path
        d="M10.38 28.28a1 1 0 01-.71-.28l-3.22-3.23a1 1 0 01-.22-1.09l2.22-5.44a1 1 0 011.63-.33l6.45 6.44A1 1 0 0116.2 26l-5.44 2.22a1.33 1.33 0 01-.38.06zm-2.05-4.46l2.29 2.28 3.43-1.4-4.31-4.31z"
        className="clr-i-outline clr-i-outline-path-2"
      ></path>
      <path
        d="M8.94 30h-5a1 1 0 01-.84-1.55l3.22-4.94a1 1 0 011.55-.16l3.21 3.22a1 1 0 01.06 1.35L9.7 29.64a1 1 0 01-.76.36zm-3.16-2h2.69l.53-.66-1.7-1.7z"
        className="clr-i-outline clr-i-outline-path-3"
      ></path>
      <path d="M3.06 31H33.06V34H3.06z" className="clr-i-outline clr-i-outline-path-4"></path>
    </svg>
  ),
  newsletter: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className="icon-item"
      version="1.1"
      viewBox="0 0 36 36"
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
      role="img"
      width={36}
      height={36}
    >
      <path
        d="M32,6H4A2,2,0,0,0,2,8V28a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V8A2,2,0,0,0,32,6Zm0,22H4V8H32Z"
        className="clr-i-outline clr-i-outline-path-1"
      />
      <path
        d="M9,14H27a1,1,0,0,0,0-2H9a1,1,0,0,0,0,2Z"
        className="clr-i-outline clr-i-outline-path-2"
      />
      <path
        d="M9,18H27a1,1,0,0,0,0-2H9a1,1,0,0,0,0,2Z"
        className="clr-i-outline clr-i-outline-path-3"
      />
      <path
        d="M9,22H19a1,1,0,0,0,0-2H9a1,1,0,0,0,0,2Z"
        className="clr-i-outline clr-i-outline-path-4"
      />
      <path
        d="M32,6H4A2,2,0,0,0,2,8V28a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V8A2,2,0,0,0,32,6ZM19,22H9a1,1,0,0,1,0-2H19a1,1,0,0,1,0,2Zm8-4H9a1,1,0,0,1,0-2H27a1,1,0,0,1,0,2Zm0-4H9a1,1,0,0,1,0-2H27a1,1,0,0,1,0,2Z"
        className="clr-i-solid clr-i-solid-path-1"
        style={{ display: 'none' }}
      />
    </svg>
  ),
}

const Wrapper = styled.nav`
  * {
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    color: #052d3f;
    font-family: 'Open Sans', sans-serif;
    font-weight: 600;
    &:hover {
      background: rgba(195, 195, 195, 0.22) !important;
    }
  }

  height: 61px;
  display: flex;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 10;
  box-shadow: 0px 1px 0px 0px #e8e8e8;
  background: white;
  &.inicio {
    background: transparent;
  }
  &.noTop {
    background: white;
  }
`

const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  width: 900px;
`

const Title = styled.p`
  text-transform: capitalize;
  font-weight: 900 !important;
  color: $navbar-link-color;
`

const Logo = styled(GatsbyImage)`
  width: 32px;
  height: 32px;
  border-radius: 3px;
  margin-right: 8px;
`

const TitleWrapper = styled(Link)`
  display: flex;
  align-items: center;
  border-radius: 3px;
  padding-right: 3px;
  &:hover {
    background: rgba(195, 195, 195, 0.22);
  }
  ${media.md`
		flex-direction: row;
		align-items: inherit;
	`};
`

const Shadow = styled.div`
  ${mediaMax.md`
    position: fixed;
    left: 900%;
    top: 0;
    width: 900%;
    height: 100%;
    transition: 0;
    &.open {
      left: 0;
      transition: background 0.4s;
      background: rgba(0, 0, 0, 0.3);
      z-index: 20;
    }
  `};
`

const NavbarNav = styled.ul`
  z-index: 30;
  list-style: none;
  position: absolute;
  top: 0;
  box-shadow: 0px 0px 0px 1px #f3f3f3;
  width: 75%;
  max-width: 420px;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
  background: white;
  transition: all 0s !important;
  * {
    transition: all 0s !important;
  }
  transition: right 0.4s !important;
  right: -102%;
  &.open {
    transition: right 0.4s !important;
    left: auto;
    right: 0;
  }
  ${media.sm`
   width: 60%;
  `}

  ${media.md`
    right: auto;
    width: 100%;
    max-width: initial !important;
    box-shadow: 0px 0px 0px 0px transparent;
    opacity: 1;
    visibility: visible;
    background: transparent !important;
    display: flex;
    flex-direction: row;
    position: relative;
    height: auto;
  `}
`

const Item = styled.li`
  width: 98%;
  ${media.md`
    border-top: 0 solid transparent !important;
    width: auto;
    margin-left: 2px;
    &:last-child {
      border-bottom: 0px solid #eeeded;
    }
  `}
`

const ItemLink = styled(Link)`
  font-size: 15px;
  font-weight: 600;
  padding: 10px 8px;
  text-align: center;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: rgba(195, 195, 195, 0.22) !important;
  }
  ${media.md`
    padding: 6px 16px !important;
  `}
  &.active {
    color: $primary-color !important;
    svg path,
    svg polygon {
      fill: $primary-color !important;
      color: $primary-color !important;
    }
  }

  & > svg path,
  svg polygon {
    fill: #052d3f !important;
    color: #052d3f !important;
  }

  .icon-item {
    padding-right: 4px;
    position: relative;
    width: 21px;
    height: 21px;
  }
`

const ba = `
  transition: all 0.25s;
  position: absolute;
  content: '';
  left: 0;
  height: 2px;
  width: 30px;
  border-radius: 0;
  background: rgba(0, 0, 0, 0.88);
`
const baExpanded = `
  transition: all 0.25s;
  top: 0;
`

const NavbarToggler = styled.button`
  border-radius: 0;
  padding: 0;
  border: 0;
  width: 30px;
  height: 18px;
  top: 4px;
  position: relative;
  background: transparent;
  cursor: pointer;
  z-index: 100;
  &:focus {
    border: 0;
    outline-width: 0;
  }
  ${media.md`
    display: none;
  `}

  &.open {
    .burger-menu {
      background: transparent !important;
      transition: all 0.25s;
      &:after {
        ${baExpanded}
        transform: rotate(45deg);
      }
      &:before {
        ${baExpanded}
        transform: rotate(-45deg);
      }
    }
  }
  .burger-menu {
    ${ba}
    top: 8px;
    &:after {
      ${ba}
      content: '';
      position: absolute;
      top: -8px;
      left: 0;
    }
    &:before {
      ${ba}
      content: '';
      position: absolute;
      top: 8px;
      left: 0;
    }
  }
`

const Navbar = props => {
  const [navbarIsTop, setNavbarIsTop] = useState(true)
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  useEffect(() => {
    const scrollListener = () => {
      const scrollPosition = document.documentElement.scrollTop
      setNavbarIsTop(scrollPosition <= 5)
    }

    const resizeListener = () => {
      let width = window.innerWidth
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
    setMenuIsOpen(prevMenuIsOpen => !prevMenuIsOpen)
  }

  const { active } = props
  const { menu, title, subtitle } = props.data.site.siteMetadata
  return (
    <Wrapper
      className={
        (active === '' ? 'inicio ' : '') +
        (menuIsOpen ? ' open ' : '') +
        (navbarIsTop ? '' : 'noTop')
      }
      id="Navbar"
    >
      <Shadow
        onClick={e => {
          setNavbarIsTop(false)
        }}
        className={`${menuIsOpen ? 'open' : ''}`}
      />
      <NavbarContainer>
        <TitleWrapper
          onClick={e => {
            setMenuIsOpen(false)
          }}
          to="/"
        >
          <Logo alt={subtitle} image={props.data.logo.gatsbyImageData} />
          <Title>{title}</Title>
        </TitleWrapper>
        <div>
          <NavbarToggler
            onClick={handleToggle}
            id="navbarToggler"
            aria-label="Navbar Toggle"
            className={`${menuIsOpen ? 'open' : ''}`}
          >
            <span className="burger-menu" />
          </NavbarToggler>
          <NavbarNav className={`${menuIsOpen ? 'open' : ''}`}>
            {menu.map((item, index) => (
              <Item key={index}>
                <ItemLink
                  onClick={e => {
                    setMenuIsOpen(false)
                  }}
                  className={`${active === item.id ? 'active' : ''}`}
                  to={item.to}
                >
                  {icons[item.icon]}
                  {item.title}
                </ItemLink>
              </Item>
            ))}
          </NavbarNav>
        </div>
      </NavbarContainer>
    </Wrapper>
  )
}

Navbar.propTypes = {
  activePage: PropTypes.string,
}

Navbar.defaultProps = {
  activePage: '',
  navbarIsTop: true,
  menuIsOpen: false,
}

export default props => {
  const data = useStaticQuery(graphql`
    query {
      logo: imageSharp(fluid: { originalName: { regex: "/logo.png/" } }) {
        gatsbyImageData(layout: CONSTRAINED, width: 60, placeholder: TRACED_SVG)
      }
      site {
        siteMetadata {
          title
          subtitle
          menu {
            title
            id
            icon
            to
          }
        }
      }
    }
  `)

  return <Navbar data={data} {...props} />
}
