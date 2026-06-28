import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import styled from 'styled-components'
import { media } from '../styles'

const Container = styled.div`
  display: flex;
  margin-bottom: 13px;
  padding-left: 0px;
  margin-top: 20px;
  max-width: 770px;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  align-items: center;
  ${media.md`
		flex-direction: row;
		align-items: inherit;
	`};
`

const Image = styled(GatsbyImage)`
  margin: 0;
  width: 90px;
  height: 90px;
  border-radius: 3px;
  margin-right: 0;
  ${media.md`
		width: 134px !important;
		height: 134px !important;
		margin-right: 21px !important;
	`};
`
const Body = styled.div`
  display: flex;
  font-family: 'Open Sans', sans-serif;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 14px;
  ${media.md`
		align-items: inherit !important;
		padding-top: 0 !important;
	`};
`
const By = styled.p`
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 400;
  color: #767676;
  margin: 0;
`

const Name = styled(Link)`
  margin: 0;
  font-size: 21px;
  line-height: 1;
  font-weight: 600;
  color: #292929 !important;
  text-decoration: none !important;
  ${media.md`
    font-size: 23px;
  `};
`

const About = styled.p`
  color: rgba(0, 0, 0, 0.54) !important;
  font-size: 14px;
  font-weight: 400;
  padding-top: 5px;
  margin: 0;
  text-align: center;
  ${media.md`
		text-align: left !important;
	`};
`
export default props => {
  return (
    <Container>
      <div>
        <Image alt="Author post avatar" image={props.avatar} />
      </div>
      <Body>
        <By>{props.make ? 'Made with ❤' : 'Written'} by</By>
        <Name to="/#about-me">Dante Calderón</Name>
        <About>
          Hi, I'm Dante Calderón, web developer. Click{' '}
          <Link className="default" to="/#about-me">
            here
          </Link>{' '}
          if you want know more about me or checkout my{' '}
          <Link className="default" to="/projects">
            projects
          </Link>
          .
        </About>
      </Body>
    </Container>
  )
}
