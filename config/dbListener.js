const { EventEmitter } = require('events');
const mongoose = require('mongoose');

class DatabaseListener extends EventEmitter {
    constructor() {
        super();
        
        mongoose.connect(process.env.MONGO_URI, {  }).then(() => {

            const changeStream = mongoose.connection.collection('flights').watch({ fullDocument: 'updateLookup' });

            changeStream.on('change', (change) => {
                this.emit('change', change);
            });

            changeStream.on('error', (error) => {
                console.error('Error watching database changes:', error);
            });
        }).catch(error => {
            console.error('Error connecting to the database:', error);
        });
    }
}

const dbListener = new DatabaseListener();
module.exports = dbListener;