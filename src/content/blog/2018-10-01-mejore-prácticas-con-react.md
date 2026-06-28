---
model: post
title: Mejores prácticas con React
description: Simple blog
author: Dante Calderón
pathPrefix: blog
slug: mejores-practicas-con-react
image: ../images/react-best-practices.png
date: 2018-10-01T20:16:06.768Z
published: true
tags:
  - ReactJS
  - Best Practices
---

Hola, te quiero compartir mi un lista que consta de unos prácticas que útilizo para escribir componentes en **React**, de seguro tú ya conoces algúnas de ellas. Desde luego este es mi punto de vista, puedes recomendar algúna **practica** que no encuentres en la lista o sugerír una mejora en los comentarios.
Espero que te sirvan :sparkles:.

### 1.- Importando componentes y librearías

Al importar componentes lo que hago es separar con una linea en blanco los componentes que son externos y los de mí proyecto. Por ejemplo:

```jsx{numberLines: true}{1-6,8-11}
import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import plyr from 'plyr'
import 'plyr/dist/plyr.css'

import Header from './components/Header'
import Footer from './components/Footer'
import initialState from './data'
import './css/styles.css'

class MyComponent extends React.Component {
	...
}
```

### 2.- Estructura de la clase

La estructura de la clase de un componente lo ordeno en el siguiente orden:

- Constructor
- Estado(`state`)
- PropTypes
- DefaultProps
- Funciónes del ciclo de vida de React(`componentDidMount`, `componentDidUpdate`, etc)
- Función `render`

Por supuesto, agrega sólo los elementos que vas a utilizar.
Vamos a ver como declarar estos componentes.

#### Constructor

En muchas ocaciónes no es necesario usar el constructor, ya que el uso más común es para iniciar el **estado** y **bindear** las funciónes. En caso de que quierás usarlo declarálo justo después de definida la clase:

```jsx{numberLines: true}
class Component extends React.Component {
  constructor(...props) {
    super(...props)
  }
}
```

#### Estado

Una forma de declarar e inicializar el store es está forma:

```jsx
class Component extends React.Component {
	constructor(...props) {
		this.state = {
			...
		}
	}
}
```

Aúnque también podemos hacer lo mismo de está forma:

```jsx{3-5}
class Component extends React.Component {
	// ... constructor(si es necesario)
	state = {
		...
	}
}
```

de está forma ya no necesitamos el constructor(salvo para casos específicos) y nuestro código se ve mas elegante :sunglasses:.

#### propTypes y defaultProps

`propTypes` y `defaultProps` son propiedades estáticas. Con ES6 las se definen de está manera:

```jsx{2-4,6-8}
class Component extends React.Component {
	static propTypes = {
		...
	}

	static defaultProps = {
		...
	}
}
```

#### Escribiendo nuestras propias funciónes

```jsx{4-6,8-10}
class Component extends React.Component {
  // ...

  fetchData = () => {}

  updateMenu = () => {}
}
```

Definiendo las funciónes de está forma ya no será necesario **bindear** las funciónes en el **constructor**.

:tada: Finalmente así quedaría nuestro componente:

```jsx
class Component extends React.Component {
  // Constructor
  constructor(...props) {
    super(...props)
    // ...
  }

  // Estado
  state = {
    //...
  }

  // Funciónes del ciclo de vida de react
  componentDidMount() {}

  componentDidUpdate() {}

  // Nuestras funciónes
  fetchData = () => {
    // ...
  }

  updateMenu = () => {
    // ...
  }

  // Función render
  render() {
    return <div>Hello World</div>
  }
}
```

### 3.- Propiedades de los componentes

Sí tu componente tienes muchas propiedades, colocá cada propiedad en una linea separada.
Por ejemplo:

```jsx
<input name='name' value={name} className='ContactForm__input' placeholder='Nombre' type='text' required onChange={this.handleChange} />
```

quedaría mejor como:

```jsx
<input 
  name='name' 
  value={name} 
  className='ContactForm__input' 
  placeholder='Nombre' 
  type='text' 
  required 
  onChange={this.handleChange} 
  />
```

### 4.- Javascript dentro de JSX

#### Una sola linea

Agrega un espacio en los extremos del código.

```jsx
<h1>{ this.state.title }</h1>
<p>{ this.getBody() }</p>
```

#### Multiples lineas

Identa las llaves y deja la llave izquieda y derecha en una linea separada cada una.

```jsx
<div>{this.date && <time>this.date</time>}</div>
```

### Conclusión

Tener la estructura defínida de nuestro código es muy importante sobre todo cuando se trabaja en equípo, seguir pautas y reglas sintacticas y semánticas harán que nuestro **código sea mas limpio**.
