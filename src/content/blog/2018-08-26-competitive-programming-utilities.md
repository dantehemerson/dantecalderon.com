---
model: post
title: Competitive Programming Utilities
description: Funciones útiles que utilizo en programación competitiva.
author: Dante Calderón
pathPrefix: blog
slug: competitive-programming-utilities
image: >-
  ../images/https_-2f-2fcdn.evbuc.com-2fimages-2f38462400-2f173216012503-2f1-2foriginal.png
date: '2018-08-26T16:14:51-05:00'
published: true
style: medium-img
tags:
  - Competitive Programming
  - C/C++
  - Tools
---

En Programación Competitiva el **tiempo** es un factor muy importante, así que siempre estamos buscando como mejorar nuestro tiempo. Tratamos siempre de minificar el esfuerzo al resolver el problema.

Una de los cosas que tenemos en cuenta la velocidad con que escribimos o **WPM**(Word per minute, Palabras por minuto), vaya que es muy importante con Jim?.

![Jim Carry Typing](https://media.giphy.com/media/11M1k4fIwVqPF6/giphy.gif)

En C++ podemos de cierta manera definir aliases para ciertas partes de codigo }

<script src="https://gist.github.com/dantehemerson/79dbe6b47e777b27860b1515fd238860.js"></script>

Estas son algúnas funciones utiles que cree y/o recopile para Programacioń Competitiva, de cierta forma hay una copia de algunas funciónes de javascript, específicamente la librería string. Para todas las funciónes también tienes la complejidad en notacion **O grande**. Esperó que te sea útil.


#### String a mayúsculas ó minúsculas

```cpp
#include <algorithm>   // transform()
#include <cctype>      // toupper(), tolower()
#include <functional>  // ptr_fun()
#include <iostream>    // cin, cout
#include <string>      // getline(), string
using namespace std;

int main() {
  cout << "Enter something: " << flush;
  string s;
  getline( cin, s );

  transform( s.begin(), s.end(), s.begin(), ptr_fun <int, int> ( toupper ) );
  cout << "Uppercase: " << s << endl;

  transform( s.begin(), s.end(), s.begin(), ptr_fun <int, int> ( tolower ) );
  cout << "Lowercase: " << s << endl;

  return 0;
  }
```
