import * as mongoose from 'mongoose';

class Database {
    private dbUrl = process.env.DBURL || 'mongodb://localhost:27017/db_portal';

    createConnection() {
        mongoose.connect(this.dbUrl, { useNewUrlParser: true });
    }
}

export default Database;