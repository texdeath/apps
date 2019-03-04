import * as Express from 'express';

const router = Express.Router();

router.get('/getHeros', (res: Express.Response) => {
    res.send('route test');
});

export default router;