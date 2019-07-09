import NewsController from '../controllers/newsController';
import Auth from '../middlewares/token';
import localUpload from '../middlewares/localUpload';
import { Router } from 'express';

const router = Router();

router.route('/api/v1/news').get(NewsController.get);
router.route('/api/v1/news/:id').get(Auth.middleware, NewsController.getById);
router.route('/api/v1/news').post(Auth.middleware, NewsController.create);
router.route('/api/v1/news/:id').put(Auth.middleware, NewsController.update);
router.route('/api/v1/news/:id').delete(Auth.middleware, NewsController.delete);
router.route('/api/v1/news/export/csv').get(Auth.middleware, NewsController.exportCsv);
router.route('/api/v1/news/upload').post(localUpload.single('file'), Auth.middleware,  (req, res) => res.json({ message: 'upload file with success' }));

export default router;