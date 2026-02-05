import { Router } from 'express';
import { success } from '../utils/response';
const router = Router();
router.get('/', (_req, res) => {
  success(res, { status: 'ok', timestamp: new Date().toISOString() }, 'Health check passed');
});
export default router;
//# sourceMappingURL=health.js.map
