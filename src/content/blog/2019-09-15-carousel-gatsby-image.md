---
model: post
title: Crear un carousel con lazy-loading imagenes con Gatsby
description: >-
  Los repositorios multiproyectos o monorepos es una forma de organizar nuestro proyecto de tal forma que contenga múltiples subproyectos y sean sea controlados por un solo repositorio de un Sistema de Control de Versiones como Git por ejemplo.
author: Dante Calderón
pathPrefix: blog
slug: carousel-gatsby-image
image: ../images/travis_ci_subdirs.jpg
date: '2019-09-15T13:10:52-05:00'
published: false
tags:
  - Continuous Integration
  - Git
  - DevOps
  - Github
---

### Requisitos 

* Node >= 8
* Tenemos que tener instalado [`gatsby-cli`](https://www.gatsbyjs.org/docs/gatsby-cli/), se instala ejecutando:
  ```bash
  npm i -g gatsby-cli
  ```
* > **Nota**: Para este ejemplo usare yarn, pero puedes usar npm, solamente transformando los comandos. Si tambien quieres usar yarn puedes instalarlo ejecutando:

  ```bash
  npm i -g yarn
  ```

### Creando el proyecto

```bash
gatsby new example-carousel-gatsby-img https://github.com/gatsbyjs/gatsby-starter-blog
```

### Cambiando de directorio

Una vez creado el proyecto nos movemos al directorio generado:

```bash
cd example-carousel-gatsby-img
```

### Agregando paquetes extras

Para este ejemplo usaremos [react-slick](https://github.com/akiran/react-slick)

Instalacion:

```bash
yarn add react-slick
```
