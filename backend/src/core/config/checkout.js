import { MercadoPagoConfig, PaymentMethod } from 'mercadopago';
import { MP_ACCESS_TOKEN } from './config.js';

export const mpClient = new MercadoPagoConfig({
  accessToken: `${MP_ACCESS_TOKEN}`,
});

/**
 * @description
 * Obtener los metodos de pago
 *
 * const paymentMethod = new PaymentMethod(mpClient);
 *
 * paymentMethod.get().then((result) => console.log(result))
 *    .catch((error) => console.log(error));
 */
