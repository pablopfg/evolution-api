import { RouterBroker } from '@api/abstract/abstract.router';
import { metaController } from '@api/server.module';
import { ConfigService, WaBusiness } from '@config/env.config';
import { Router } from 'express';

export class MetaRouter extends RouterBroker {
  constructor(readonly configService: ConfigService) {
    super();
    this.router
      .get(this.routerPath('webhook/meta', false), async (req, res) => {
        const verifyToken = this.configService.get<WaBusiness>('WA_BUSINESS').TOKEN_WEBHOOK;
        const token = req.query['hub.verify_token'];
        const challenge = req.query['hub.challenge'];
        const mode = req.query['hub.mode'];

        if (typeof challenge !== 'string' || !/^[0-9]+$/.test(challenge)) {
          return res.status(400).send('Invalid challenge format');
        }

        if (mode === 'subscribe' && token === verifyToken) {
          console.log('WEBHOOK_VERIFIED');
          res.setHeader('Content-Type', 'text/plain');
          res.status(200).send(challenge);
        } else {
          res.status(403).send('Forbidden: Wrong validation token');
        }
      })
      .post(this.routerPath('webhook/meta', false), async (req, res) => {
        const { body } = req;
        const response = await metaController.receiveWebhook(body);

        return res.status(200).json(response);
      });
  }

  public readonly router: Router = Router();
}
