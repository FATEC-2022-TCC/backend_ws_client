//pollyfill for nodejs environment
//https://stomp-js.github.io/guide/stompjs/rx-stomp/ng2-stompjs/pollyfils-for-stompjs-v5.html#in-nodejs
Object.assign(global, { WebSocket: require('websocket').w3cwebsocket })

const { Client } = require('@stomp/stompjs')

const client = new Client({
    brokerURL: 'ws://localhost:8080/ws',
    connectionTimeout: 1000,
    onStompError: frame => {
        console.log('Broker reported error: ' + frame.headers['message'])
        console.log('Additional details: ' + frame.body)
    }
})

const sessionId = Math.random()

client.onConnect = frame => {
    console.log("-- Connected --")
    client.subscribe(`/topic/chatbot/${sessionId}`, res => {
        console.log(`Response: ${res.body}`)
    })
    client.publish({
        destination: `/app/chatbot/${sessionId}`,
        body: "Hello World"
    })
}

client.activate()