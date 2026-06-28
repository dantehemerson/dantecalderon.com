---
model: post
title: 'Buffers in Node.js'
description: Buffers are commonly used everywere to share data efficiently, learn how it works.
author: Dante Calderón
pathPrefix: blog
slug: buffers-in-nodejs
image: ../images/how-to-free-up-RAM-hero.jpg
date: '2020-12-30T00:00:00-05:00'
published: true
tags:
  - Buffer
  - Nodejs
---

A buffer is a region of memory that stores temporary data in memory, tipically the RAM due to it has faster acess time compared with HDDs.

### Uses

**I/O Operations**

* Read/Write files.
* When you write commands all of them are using buffers to transport data
* etc.

**Network**

* Receive or send data to or from a network.

### Using buffers in Node.js

In Node.js we have the `Buffer`  API that allow us to create and manipulate buffers.

You can create buffers from arrays like this:

```ts
const buffer = Buffer.from([65, 66, 67])
```

or from a string:

```ts
const buffer = Buffer.from('hello')
```

Have in account that buffers have a **fixed-length** which means you define the size of the buffer 
when you create it, an you can be resizable later, it size should be defined explicity or implicit.
Previously we have created implicit size buffer by giving only the value of the buffer, 
in that case the buffer has the length of the value given.

But you can create buffer with implicit size in order to manipulate the value later, like this:

```ts
const buffer = Buffer.alloc(5)
```

In this case we are creating a buffer with length 5 **bytes**, then you will want to modify it:

```ts
buffer.write('hello')
``` 

We have the method `.toString()` to get the string value, depending of the format you stored your data
you should use this method.

For example:
```ts
const buffer = Buffer.from('hello')
buffer.toString()
// Output:
// > 'hello'
```

or if you can store `latin1` format to support specifal latin characters:

```ts
const buffer = Buffer.from('Adiós')
buffer.toString()
// Output:
// > 'Adiós'
```

