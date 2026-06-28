---
model: post
title: Como contribuir a un proyecto en Github
description: >-
  Mejor forma de como clonar un repositorio y configurarlo para empezar a contribuir.
author: Dante Calderón
pathPrefix: blog
slug: how-to-setup-project-to-contribute
image: ../images/coders-git.jpg
date: '2019-09-28T01:42:52-05:00'
published: false
tags:
  - Open Source
  - Github
  - Git
---

> Contribuir a Open Source es una de las cosas mas satisfactorias al momento de programar, es primordial para el autoaprendizaje y hacerlo nos hace sentir bien con nosotros mismos.
>
>    By **Andrew Collin**


Lo que veremos será:


1. [Hacer Fork un repositorio](#1-hacer-fork-a-un-repositorio)
2. [Clonar un repositorio](#2-clonar-un-repositorio)
3. [Actualizar ramas](#3-actualizar-ramas)
4. [Crear una rama](#4-crear-un-rama)
5. [Hacer cambios](#5-hacer-cambios)
6. [Hacer un Pull Request](#6-hacer-un-pull-request)


### 1. Hacer fork a un repositorio

Lo primero que debemos hacer es hacer fork del reposorio al que queremos contribuir, eso se hace dando click en el boton fork en la
parte superior derecha.

### 2. Clonar un repositorio

Una vez forkeado el repositorio lo que debemos hacer es clonarlo a nuestra computadora para empezar a trabajar en el.

### 3. Actualizar ramas

Siempre **debemos mantener actualizado nuestro repositorio** cada vez que creemos una nueva rama.

Una vez clonado el repositorio puede ser que hayan actualizado el repositorio principal, en ese caso no se habra actualizado nuestro repositorio ya que al clonar, nuestro repositorio se queda en el ultimo commit hasta el momento en que clonamos.

Actualmente solo tenemos enlazado un repositorio remoto(`origin`), el de nuestro Github. Lo que haremos sera agregar otro remoto(al repositorio original) para mantener siempre actualizado nuestro repositorio.

```bash
#               nombre     link del repositorio
git remote add upstream git@dantecalderon.com/askdfj/alskdfjkl
```

Ahora tenemos dos remotos que son: `origin` y `upstream`.

Luego debemos **jalar** los cambios de `upstream`:

```bash
git fetch upstream
```

Para sincronizar una rama(en este caso `master`) lo que hacemos es hacer un merge de la siguiente forma:

```bash
#          remoto   rama
git merge upstream/master
```

### 4. Crear un rama

Una vez sincronizado nuestro repositorio, para hacer cambios lo recomendable es crear una rama. No deberiamos hacer cambios directamente a master.

Para crear una rama ejecutamos lo siguiente:
```bash
git checkout -b new-feature
```

### 5. Hacer cambios

Una vez configurado todo el proyecto, a hacer cambios 👉.
Luego hacemos commit de los cambios:
```bash
git add .
git commit -m 'Add changes'
git push origin new-feature
```


### 6. Hacer un Pull Request

Listo!!!. Ya tenemos todos los cambios hechos. Ahora debemos crear un **Pull Request** que es como hacer una peticion para que hagan merge de nuestros cambios.



---
