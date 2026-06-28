---
model: post
title: 'Exploring Socket.IO'
description: We are going to explore the source code of Socket.IO
author: Dante Calderón
pathPrefix: blog
slug: exploring-socket-io-source-code
image: ../images/socket-io-nodejs.png
date: '2020-12-26T00:00:00-05:00'
published: false
tags:
  - SocketIO
  - WebSockets
  - Open Source
  - Notes
  - Nodejs
---

Socket.IO is a library to build Real-Time services with Node.js. It's built over the Websocket protocol, we are going to talk about it later.

![Bidirectional communication between client and server](../images/bidirectional-communication.png)
![Bidirectional communication between client and server](https://socket.io/images/bidirectional-communication.png)
![Bidirectional communication between client and server](https://cms.qz.com/wp-content/uploads/2018/02/spacex-falcon-heavy-elon-musk-china-europe-esa-nasa-mars-sls-boeing.jpg?quality=75&strip=all&w=1600&h=900&crop=1)
![Bidirectional communication between client and server](https://media.wired.com/photos/5ed2b8129948303154121fe5/master/pass/Science_SpaceX-Launch-AP_20151700829737.jpg)
![Bidirectional communication between client and server](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSxECxmFYyleZ8y5w4HTK3Cv-RW7BK4n6uuQ&usqp=CAU)


It consists of a Server built with Nodejs and a Client in Javascript(Also you can use Node.js, Python, C++, etc).

At this time we are going to explore the Server, so let's go...

### WebSockets

WebSocket is a communcation protocol that provides a full-duplex communication channels over a single TCP connection.

It enables interaction between a client(e.g. a web browser) and a web server maintaining open communication between both. Either client and **server** can send data to the other hand, it facilitates the real-time data transfer with lower overhead and it makes a better alternative to HTTP polling.

**Why where created?**
