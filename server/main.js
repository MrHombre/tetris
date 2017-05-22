const WebSocketServer = require('ws').Server;

const server = new WebSocketServer({port: 9000});

//tracking our created session storing in map
const sessions = new Map;

class Session
{
    constructor(id)
    {
        this.id =id
    }
}


server.on('connection', conn => {
    console.log('Connection established');

    conn.on('message', msg => {
        console.log('Message received', msg);

        if (msg === 'created-session') {
            const session = new Session('foobar');
            sessions.set(session.id, session);
            console.log(sessions);
        }
    });

    conn.on('close', () => {
        console.log('Connection closed');
    });
});