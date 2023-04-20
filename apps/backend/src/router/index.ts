import Router from 'koa-router';

import { jwtRouter } from './jwt';

const router = new Router({ prefix: '/api' });

router.use(jwtRouter.routes());

export default router;
