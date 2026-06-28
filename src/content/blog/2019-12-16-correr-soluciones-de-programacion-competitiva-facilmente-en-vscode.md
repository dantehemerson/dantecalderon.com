---
model: post
title: Correr soluciones de Programacion Competitiva en VSCode
description: >- 
  IO Run es un plugin que esta hecho especialmente para correr y testear soluciones de Programacion Competitiva.
author: Dante Calderón
pathPrefix: blog
slug: correr-soluciones-de-programacion-competitiva-en-vscode
image: ../images/correr-soluciones-de-programacion-competitiva-facilmente-en-vscode_screenshot.png
date: '2019-12-16T01:02:52-05:00'
published: true
tags:
  - C/C++
  - Competitive Programming
  - Vscode
  - Setup
---

Hoy estuve resolviendo un problema en [HackerRank](https://www.hackerrank.com/challenges/apple-and-orange/problem), yo uso C++ para resolver problemas del tipo **Programacion Competitiva.**

Lo que hacia hasta ahora era usar un IDE como [CodeBlocks](http://www.codeblocks.org/) o escribia mi solucion en VSCode y lo corria usando `g++ main.cpp`.

Hoy descubri este plugin increible para correr facilmente mis soluciones:

### IO Run

IO Run es un plugin que esta hecho especialmente para correr y testear soluciones de Programacion Competitiva. Los lenguages que soporta actualmente son: `C, C++, D, Dart, Go, Groovy, Haskell, Java, JavaScript, Kotlin, Lua, OCaml, Pascal, Perl, PHP, Python, R, Ruby, Rust, Scala, Swift`.  

#### Prerequisitos

Antes de tener instalado tendras que tener instalado algun compilador o interprete para tu lenguages de programacion.

Si usas C++ y Linux instala el compilador GCC con:

```bash
sudo apt-get install g++
```

#### Instalacion

Para instalarlo solo vamos a la  seccion de plugins de VSCode y bucamos `io run` y le damos instalar.

> Para tener una mejor experiencia, recomiendo instalar el [plugin oficial](https://marketplace.visualstudio.com/search?target=VSCode&category=Programming%20Languages&sortBy=Installs) que tiene VSCode para los diferentes lenguages, si usas C++ recomiendo instalar el plugin oficial de [C/C++](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools), el cual añade funcionalidades de autocompletado y depuracion.

#### Correr solucion

Para correr la solucion por defecto podemos hacerlo con `Ctrl+Enter`(Puedes cambiarlo en la configuracion de shortcuts) o presionando en el icono ![Run Icon](https://raw.githubusercontent.com/dantecalderon/vscode-io-run/master/images/run-16.png) en la parte superior.

### Conclusion

De esta forma es muy simple correr nuestras soluciones de Programacion Competitiva. Gracias por leer y sigue resolviendo mas problemas ✌.
