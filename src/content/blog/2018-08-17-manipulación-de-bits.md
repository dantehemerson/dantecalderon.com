---
model: post
title: Manipulación de bits
description: Manipulación de bits y usos.
author: Dante Calderón
pathPrefix: blog
slug: manipulacion-de-bits
image: ../images/bit-manipulation.png
date: '2018-08-17T03:16:12-05:00'
published: true
tags:
  - Competitive Programming
  - STLC++
  - C/C++
  - Algorithms
---
### Operaciónes útiles


#### Conocer si el j-ésimo bit(desde la derecha) es 1 ó 0

Para :smile: saber si el j-ésimo bit está encendido(1) ó apagado(0) es  necesario realizar la operación **AND** con un segundo número el cual tenga el bit en la posición `j` (desde la derecha) en 1 y el resto en 0.

El numero se puede obtener con la siguiente operación:
```bash
1 << j
```
Como el número 1 solo tiene encendido el **bit menos signicativo**(el bit del extremo derecho), al recorrer `j` posiciónes desde la derecha el bit j-esimo será 1.

> Nota: `j` empieza a contar las posiciónes desde 0, es decir el primer bit desde la derecha estará en la posición 0 el segundo en la posición 1 y asi sucesivamente.

Ejemplos:
```bash
000001 // 1 << 0 (j = 0)
000010 // 1 << 1 (j = 1)
000100 // 1 << 2 (j = 2)
010000 // 1 << 4 (j = 4)
```

Luego se realiza la operación and así:

```cpp
#include <iostream>
using namespace std;

int main() {
  int S = 43;
  int j = 3;

  cout << ( S & ( 1 << j ) ) << endl;

  return 0;
}
```

#### Conocer si un número es par o impar

Una forma de convertir un numero binario a decimal es colocando el numero en binario y luego las potencias de dos de derecha a izquierda, incrementando el exponente en uno en cada potencia.

Por ejemplo tenemos el siguiente numero en binario:

```bash
010100
```
Escribimos las potencias y el resultado de las potencias y el numero en binario:

```bash
2⁵  2⁴  2³  2²  2¹  2⁰
---------------------
32  16  8   4   2   1
0   1   0   1   0   0
```

Luego se suman todas los valores de las posiciónes que sean 1:

```bash
16 + 4 = 22 (dec)
```
Como vemos el resultado es 22 en decimal, entonces diríamos que:
```bash
010100 (bin) = 22 (dec)
```

Si sumamos los valores de cualquier combinación de los bits excepto el **bit menos signicativo** el resultado siempre será par ya que todos tiene mitad, por que es el resultado del doble del anterior. Por eso decimos que el **bit menos significativo** es el que define la paridad de un número.

En conclusión si el bit menos significativo del numero es 1 entonces es impar, y si es 0 entonces es par.

Por ejemplo, para saber si un número S es par o impar  realizamos la siguiente operación:
```bash
S & 1
```
El resultado de esta operación será siempre 0 ó 1.

El siguiente código nos dice si el numero es par ó impar.

#### Dividir y multiplicar un entero por 2
Las operaciónes son:
* **`S << 1`** : Para multiplicar por 2
* **`S >> 1`** : Para dividir entre 2
El resultado es un entero redondeado.

Por ejemplo la división `17/2` sería `8` y no `8.5`.

Mas ejemplos:

```bash
// Teniendo en cuenta que cada operación
// influye en la siguiente:

S      = 011010 (bin) = 26 (dec)
S << 1 = 110100 (bin) = 52 (dec) = S * 2
S >> 2 = 001101 (bin) = 13 (dec) = S / 2²
S >> 1 = 011010 (bin) = 6  (dec) = S / 2
```
Fin.


