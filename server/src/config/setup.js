import AdminJS from 'adminjs';
import * as AdminJSMongoose from '@adminjs/mongoose';
import AdminJSfastify from '@adminjs/fastify';
import mongoose from 'mongoose';
import fastify from 'fastify';

import * as Models from '../models/index.js';
import { authenticate, Cookie_secret, session } from './adminConfig.js';
import { config } from './config.js';
import { dark, light, noSidebar } from '@adminjs/themes';


// Import your Mongoose models

// Register the AdminJS Mongoose adapter
AdminJS.registerAdapter(AdminJSMongoose);

// Initialize AdminJS
const adminJs = new AdminJS({
    databases: [mongoose],
    rootPath: '/admin',
    resources: [
        { resource: Models?.Customer, options: { listProperties: ["phone", "role", "isActivated"], filter: ["phone", "role", "isActivated"] } },
        { resource: Models?.DeliveryPartner, options: { listProperties: ["email", "role", "isActivated"], filter: ["email", "role", "isActivated"] } },
        { resource: Models?.Admin, options: { listProperties: ["email", "role", "isActivated"], filter: ["email", "role", "isActivated"] } },
        { resource: Models?.Category },
        { resource: Models?.Product },
        { resource: Models?.Order,options: { listProperties: ["orderId", "totalPrice", "orderStatus"], filter: ["orderId", "totalPrice", "orderStatus"] }  },
    ],
    branding: {
        companyName: 'Mart App',
        withMadeWithLove: false,
        favicon:"https://res.cloudinary.com/ddqabg73k/image/upload/v1736086428/Martlogo.png",
        logo:"https://res.cloudinary.com/ddqabg73k/image/upload/v1736086428/Martlogo.png",
    },

    defaultTheme: dark.id,
    availableThemes: [dark, light, noSidebar],
    customHeader: 'Welcome to the Admin Panel', // Add custom header text
    themeSwitcher: true, // Enable theme switching
    saveThemeInLocalStorage: true, // Remember the selected theme for the user
});

const buildAdminjsRouter = async (app) => {
    await AdminJSfastify.buildAuthenticatedRouter(adminJs, {
        authenticate,
        CooKiePassword: Cookie_secret,
        cookieName: "adminjs",
    }, app, {
        store: session,
        saveUnIntialized: true,
        secret: Cookie_secret,
        cookie: {
            secure: config.env === 'production',
            httpOnly: config.env === 'production',
        }
    });
}

export { buildAdminjsRouter, adminJs };