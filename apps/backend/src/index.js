import express from 'express';
import cors from 'cors';
import { formatGreeting } from '@monorep/utils';
import logger from './utils/logger';
import { success } from './utils/response';
import requestLogger from './middlewares/requestLogger';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler';
import routes from './routes';
const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.get('/', (_req, res) => {
  success(res, {
    message: formatGreeting('Backend API'),
    version: '1.0.0',
    status: 'running',
  });
});
app.use('/api', routes);
app.use(notFoundHandler);
app.use(errorHandler);
app.listen(PORT, () => {
  logger.info(`Backend server is running on http://localhost:${PORT}`);
});
export default app;
//# sourceMappingURL=index.js.map
