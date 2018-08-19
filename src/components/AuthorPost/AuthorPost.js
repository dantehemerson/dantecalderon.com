import React from 'react'
import Link from 'gatsby-link'

export default (props) => (
	<div className={`AuthorPost ${props.header ? ' header' : ''}`}>
		<div className="AuthorPost__header">
			<img className="AuthorPost__image" src="https://avatars1.githubusercontent.com/u/18385321?s=120&v=4"/>
		</div>
		<div className="AuthorPost__body">
			<Link to="/#about" className="AuthorPost__name">Dante Calderón</Link>
			<p className="AuthorPost__about">Programmer</p>
			{ props.header && <p className="AuthorPost__date">{ props.date } · { props.timeToRead } min de lectura</p>}

		</div>
	</div>
)