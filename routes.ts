import Router from 'express-promise-router';
import { getdata } from './controllers/getdata';


const router = Router();
router.route('/get-data').post(getdata);

export default router;