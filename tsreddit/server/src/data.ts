import { Post, User } from './entities';
import { DataSource } from 'typeorm'
import path from 'path';

const db = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    logging: true,
    synchronize: false,
    entities: [Post, User],
    migrations: [path.join(__dirname, "./migrations/*")], 
    // migrationsRun: true,
    // dropSchema: true,
}) 

export default db