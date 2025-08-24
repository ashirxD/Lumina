import auth from './auth.js';


const routes = (app) => {
    app.use('/api/auth', auth);
}            // Log the user in