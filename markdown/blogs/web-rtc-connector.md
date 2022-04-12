---
title: Web Rtc Connector
thumbnail: /images/blogs/web-rtc-connector.jpg
date: 1649741121330
tags:
  - socket.io
  - uuid
  - validator
  - npm-project
  - open-source-project
mainLibraries:
shortInfo: 'WebRtcConnector is a simple connector for p2p connection throw WebRtc Standard. socket.io has been used in booth server and client of this project.'
language: en
titlePer:  Web Rtc Connector
shortInfoPer: "WebRtcConnector یک متصل کننده ساده برایه اتصال هایه پیر تو پیر توسط پروتکل وب-آر-تی-سی است."
---

## WebRtc Connector Client

### Waring: This project hasn't been audited by security researchers, therefore please don't use it in Production environment

### Installing npm [package](https://www.npmjs.com/package/@amir4rab/web-rtc-connector-client):
```bash
npm install @amir4rab/web-rtc-connector-client@latest
```

### Instantiating an instance:
make sure that your [signaling server](https://github.com/amir4rab/webRtcConnector/tree/main/server) is online then continue with WebRtc Connector Client
```javascript
const webRtc = new WebRtc({ serverUrl: 'your signaling server url' });
```

### Getting WebRtc instance Details:
your id is exposed to the server but secret isn't, and it has been generated automatically by the client. you should send these two items to the other peer.
```javascript
webRtc.on( "onConnection", ({ id, secret }) => {
  console.log(id, secret)
});
``` 

### WebRtc Data-channel: 
#### Making a data-channel
```javascript
webRtc.dataConnection({ 
  id: 'other peer ID',
  secret: 'other peer Secret'
});
```
#### Events
```javascript
webRtc.on( 'onDataChannel', ( dataChannel ) => {
  // "onDataChannel" will be called after dataChannel initialization
  // you can update UI of your web-app 
  // eg: connection state: "Connected"
});

webRtc.on( 'onMessage', message => {
  // "onMessage" will be called, when receiving a message from WebRtc Peer
});
```
#### Sending message
```javascript
// this function should only be called after Data-channel has been initialization
webRtc.sendMessage('your message');
```

### WebRtc Media Connection:
#### Answering call
For Media connection, first pair need to be ready to answer calls
```javascript
const answerCall = async _ => {
  mediaStream = stream = await navigator.mediaDevices.getUserMedia('constraints');
  await webRtc.answerMediaConnection(mediaStream);
};
```
#### Making a call
```javascript
const makeCall = async _ => {
  mediaStream = stream = await navigator.mediaDevices.getUserMedia('constraints');
  await webRtc.makeMediaConnection( 
    mediaStream, 
    { id: 'other peer ID', secret: 'other peer Secret' }
  );
};
```
#### Events
```javascript
webRtc.on( 'onStream', ( remoteStream ) => {
  // "onStream" will be Called after receiving Remote stream
  // you can update UI of your web-app 
  // eg: peerVideo.srcObject = remoteStream;
});
```
#### Functions
to update WebRtc tracks you can pass a new media stream to updateMedia function.
```javascript
const updateMedia = async _ => {
  await webRtc.updateMedia(mediaStream);
}
```

### Functions:

#### Closing Connection
```javascript
await webRtc.close();
```

### Events:
#### Checking Call Security
```javascript
webRtc.on( 'descriptionsCompleted', async ({ hashObj }) => {
  // console.log( hashObj.hash )
  // to users can check if their hashes are equal
});
```
#### Call-end event
```javascript
webRtc.on( 'onClose', _ => {
  // "onClose" will be called when connection has been closed!
});
```
#### Error event
```javascript
webRtc.on( 'onError', _ => {
  // "onError" will be called when connection has been failed!
});
```

## WebRtc Connector Server

### Waring: This project hasn't been audited by security researchers, therefore please don't use it in Production environment


WebRtcConnector Signaling server is, a [socket.io](https://socket.io) server, modify it for your use case.

### Setup
#### cloning
```bash
git clone https://github.com/amir4rab/webRtcConnector && cd ./server
```
#### installing dependencies
```bash
npm install
```
#### making environment variables
make .env file and add these two variables to it
```bash
PORT: 'Port for your signaling server'
ORIGIN: 'Origin of your webapp'
```



## Learn more

- [socket.io](https://socket.io) 