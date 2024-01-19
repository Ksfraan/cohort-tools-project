const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const PORT = 5005;

const { isAuthenticated } = require('./middleware/jwt.middleware');

//STATIC DATA
const studentsRoutes = require('./routes/students-route.js');
const cohortsRoutes = require('./routes/cohort-routes.js');
// const userRoutes = require('./routes/User-routes.js');
const authRoutes = require('./routes/auth-routes.js');

const app = express();

app.use(
    cors({
        origin: ['http://localhost:5005', 'http://localhost:5173'],
    })
);
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//DOCS ROUTES
app.get('/docs', (req, res) => {
    res.sendFile(__dirname + '/views/docs.html');
});

app.use('/api/students', studentsRoutes);
app.use('/api/cohorts', cohortsRoutes);
app.use('/api/users', userRoutes);
app.use('/auth', authRoutes);

mongoose
    .connect('mongodb://127.0.0.1:27017/cohort-tools-api', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB', error));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
const {
    errorHandler,
    notFoundHandler,
} = require('./middleware/error-handling');

// Set up custom error handling middleware:

app.use(notFoundHandler);
app.use(errorHandler);
