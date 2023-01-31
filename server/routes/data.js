import express from 'express';
import { getData, getAllData, getTwoData, getThreeData } from '../controllers/data.js';

const router = express.Router();

router.get('/:key/:value', getData);
router.get('/:key1/:value1/:key2/:value2', getTwoData);
router.get('/:key1/:value1/:key2/:value2/:key3/:value3', getThreeData);
router.get('/data', getAllData);

export default router;