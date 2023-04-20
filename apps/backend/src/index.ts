import { createApp } from '@/app';
import { logger } from '@/shared/logger';

const app = createApp();

app.listen(3000, () => {
  logger.info(`Server running on port ${3000}`);
});
