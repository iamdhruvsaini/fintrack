const router=require('express').Router();


const authRoutes=require('./auth-routes')
const userRoutes=require('./user-routes')
const categoryRoutes=require('./category-routes')

router.use('/auth',authRoutes);
router.use('/users',userRoutes);
router.use('/categories',categoryRoutes);


module.exports = router;