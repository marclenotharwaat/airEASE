const mongoose = require('mongoose');

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { });
        const db = mongoose.connection;

        db.on('error', (error) => {
            console.error('Database connection error:', error);
        });

        db.on('open', () => {
            console.log('Database connected:', db.host);
        });
        return db;
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

module.exports = connection;
