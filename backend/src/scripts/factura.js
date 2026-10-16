import Afip from '@afipsdk/afip.js';
import path from 'path';
import { fileURLToPath } from 'url';

import fs from 'fs';
import { AFIP_ACCESS_TOKEN, CUIT } from '../core/config/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('filename:', __filename);

console.log('__dirname:', __dirname);

const certDir = path.join(__dirname, '..', 'certs');

const cert = fs.readFileSync(path.join(certDir, 'homo.crt'), 'utf-8');
const key = fs.readFileSync(path.join(certDir, 'homo.key'), 'utf-8');

// 1. Inicializar cliente en modo Homologación
const afip = new Afip({
  access_token: `${AFIP_ACCESS_TOKEN}`,
  CUIT: CUIT, // El CUIT que usaste para generar el certificado en WSASS
  cert: cert,
  key: key,
  production: false, // FALSE = Entorno Homologación (Testing sin validez fiscal)
});

async function probarFactura() {
  try {
    const puntoDeVenta = 1;
    const tipoComprobante = 6; // 6 = Factura B (Consumidor Final)

    // 2. Consultar el último número de comprobante emitido en testing
    const ultimoNumero = await afip.ElectronicBilling.getLastVoucher(
      puntoDeVenta,
      tipoComprobante
    );
    const siguienteNumero = ultimoNumero + 1;
    console.log(`Emitiendo Factura B número: ${siguienteNumero}...`);

    const fechaHoy = new Date(
      Date.now() - new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .split('T')[0]
      .replace(/-/g, ''); // Formato YYYYMMDD

    // 3. Solicitar CAE a los servidores de prueba de ARCA
    const res = await afip.ElectronicBilling.createVoucher({
      CantReg: 1,
      PtoVta: puntoDeVenta,
      CbteTipo: tipoComprobante,
      Concepto: 1, // 1 = Productos
      DocTipo: 96, // 96 = DNI
      DocNro: 38456123, // DNI ficticio de prueba
      CondicionIVAReceptorId: 5,
      CbteDesde: siguienteNumero,
      CbteHasta: siguienteNumero,
      CbteFch: fechaHoy,
      ImpTotal: 12100, // Total con IVA
      ImpTotConc: 0,
      ImpNeto: 10000, // Subtotal neto
      ImpOpEx: 0,
      ImpIVA: 2100, // 21% IVA
      ImpTrib: 0,
      MonId: 'PES',
      MonCotiz: 1,
      Iva: [
        {
          Id: 5, // 5 = 21% de IVA
          BaseImp: 10000,
          Importe: 2100,
        },
      ],
    });

    console.log('Factura autorizada con éxito en Homologación:');
    console.log('CAE obtenido:', res.CAE);
    console.log('Vencimiento del CAE:', res.CAEFchVto);
  } catch (error) {
    console.error('Error al emitir factura:', error);
  }
}

probarFactura();
