import 'dotenv/config';
import fastifySession from '@fastify/session';
import ConnectMongoDBSession from 'connect-mongodb-session';
import { config } from './config.js';
import { Admin } from '../models/user.js';

const MongoDBStore = ConnectMongoDBSession(fastifySession);

export const session = new MongoDBStore({
    uri: config.databaseUrl,
    collection: 'sessions'
});

session.on('error', function (error) {
    console.log("session store error", error);
});

export const authenticate = async (email, password) => {
    try {
        if (!email || !password) return null
        let user = await Admin.findOne({ email })
        if (!user) {
            return null
        }
        if (user.password === password) {
            return Promise.resolve({ email, password })
        } 
        return null

    } catch (error) {
        return null
    }
}

export const port = config.port || 3000
export const Cookie_secret = config.Cookies_Secret