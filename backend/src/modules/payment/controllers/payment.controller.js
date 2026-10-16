import { Customer, CustomerCard } from 'mercadopago';
import { mpClient } from '../../../core/config/checkout.js';
import { ErrorResponse } from '../../../core/errors/error-handler.js';
import { AuthService } from '../../auth/services/auth.service.js';
import { PaymentService } from '../services/payment.service.js';

const customers = new Customer(mpClient);
const customerCards = new CustomerCard(mpClient);

export class PaymentController {
  constructor(
    paymentService = new PaymentService(),
    authService = new AuthService()
  ) {
    this.paymentService = paymentService;
    this.authService = authService;
  }

  createPayment = async (req, res, next) => {
    try {
      const { payment, shipping } = req.body;

      console.log(payment, shipping);

      return res.status(200).json({
        success: true,
        data: payment,
      });
    } catch (error) {
      next(error);
    }
  };
}

/*
  getCostumerCards = async (req, res, next) => {
    try {
      const { id } = req.user;

      const user = await this.authService.getById(id);

      console.log(
        "MP token prefix:",
        process.env.MP_ACCESS_TOKEN?.slice(0, 12),
      );

      console.log(user);

      if (!user) {
        throw new ErrorResponse("Usuario no encontrado", 404);
      }

      let customer_id = user.mp_customer_id;

      if (!customer_id) {
        const customer = await customers.create({
          body: { email: user.email },
        });

        console.log("Customer creado:", customer);

        customer_id = customer.id;

        await User.findByIdAndUpdate(user._id, { mp_customer_id: customer_id });
      }

      const cards = await customerCards.list({ customerId: customer_id });

      return res.status(200).json({
        success: true,
        data: cards || [],
      });
    } catch (error) {
      next(error);
    }
  };*/
