const  express= require('express');
const authCtrl = require('../controllers/auth.controller');
const verifyToken = require('../controllers/verifyToken');

const router = express.Router();

router.post('/signup',authCtrl.signUp);
router.post('/signin',authCtrl.signIn);

router.get('/profile',verifyToken,authCtrl.profile);

module.exports = router;