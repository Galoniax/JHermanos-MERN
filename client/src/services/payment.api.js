import { interceptor } from '@/api/interceptor/axios-interceptor';

export const createPayment = async (data) => {
  return await interceptor.post('/payment/checkout', {
    payment: data.payment,
    shipping: data.shipping,
  });
};
