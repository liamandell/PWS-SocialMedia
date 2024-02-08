const router = require('express').Router();
const userRoutes = require('./user-routes');
router.use('/users', userRoutes);
router.use((req, res) => {
    res.status(404).send('404 Error!');
});
module.exports = router;