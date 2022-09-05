Object.assign(global, { WebSocket: require('websocket').w3cwebsocket });

const { Client } = require('@stomp/stompjs')

const client = new Client({
    brokerURL: 'ws://localhost:8080/ws',
    connectionTimeout: 1000,
    onStompError: frame => {
        console.log('Broker reported error: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
    }
})

client.onConnect = frame => {
    console.log("Connected ----")
    client.subscribe('/topic/greetings', res => {
        console.log(`Response: ${res.body}`)
    })
    client.publish({
        destination: '/app/hello',
        body: "Hello World"
    })
}

client.activate()