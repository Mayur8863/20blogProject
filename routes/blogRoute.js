const router = require('express').Router();
const controllers = require('../controllers/BlogControllers');

router.get('/getOne/:id',controllers.getOneBlog);
router.get('/getAll',controllers.getAllBlog);
router.post('/create',controllers.createBlog);
router.delete('/delete/:id',controllers.deleteBlog);
router.patch('/update/:id',controllers.updateBlog);
router.post('/categoriesCount',controllers.getCategoriesCount);
router.post('/recentBlog',controllers.recentBlog);

module.exports = router;
