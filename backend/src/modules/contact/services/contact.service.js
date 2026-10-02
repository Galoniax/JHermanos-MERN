import Contact from "../../../core/models/Contact.js";

export class ContactService {
  async create({ nombre, email, mensaje }) {
    const consulta = await Contact.create({ nombre, email, mensaje });
    return consulta;
  }

  async getAll() {
    const consultas = await Contact.find().sort({ createdAt: -1 }).lean();
    return consultas;
  }
}
