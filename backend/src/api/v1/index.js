const router=require('express').Router();


const authRoutes=require('./auth-routes')
const userRoutes=require('./user-routes')
const categoryRoutes=require('./category-routes')
const financialRecordRoutes=require('./financial-record-routes')
const dashboardRoutes=require('./dashboard-routes')

router.use('/auth',authRoutes);
router.use('/users',userRoutes);
router.use('/categories',categoryRoutes);
router.use('/financial-records',financialRecordRoutes);
router.use('/dashboard',dashboardRoutes);


module.exports = router;