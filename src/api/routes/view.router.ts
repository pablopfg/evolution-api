import { RouterBroker } from '@api/abstract/abstract.router';
import express, { Router } from 'express';
import rateLimit from 'express-rate-limit';
import path from 'path';

export class ViewsRouter extends RouterBroker {
  public readonly router: Router;

  constructor() {
    super();
    this.router = Router();

    const staticLimiter = rateLimit({
      windowMs: 60 * 1000,
      max: 60,
    });

    const basePath = path.join(process.cwd(), 'manager', 'dist');
    const indexPath = path.join(basePath, 'index.html');

    this.router.use(staticLimiter, express.static(basePath));

    this.router.get('*', (req, res) => {
      res.sendFile(indexPath);
    });
  }
}
