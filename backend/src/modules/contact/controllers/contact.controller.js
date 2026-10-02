import { ContactService } from "../services/contact.service.js";

export class ContactController {
  constructor(contactService = new ContactService()) {
    this.contactService = contactService;
  }

  create = async (req, res, next) => {
    try {
      const { nombre, email, mensaje } = req.body;

      await this.contactService.create({ nombre, email, mensaje });

      console.log(`Consulta de contacto recibida: ${nombre} <${email}>`);

      return res.status(201).json({
        success: true,
        message: "Mensaje recibido. ¡Gracias por escribirnos!",
      });
    } catch (error) {
      next(error);
    }
  };

  list = async (req, res, next) => {
    try {
      const mensajes = await this.contactService.getAll();

      return res.status(200).json({
        success: true,
        data: mensajes,
      });
    } catch (error) {
      next(error);
    }
  };
}
