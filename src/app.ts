import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import dotenv from 'dotenv';
import { Signale } from "signale";
import proxy from "express-http-proxy";

const app: Application = express();
const signale = new Signale();

dotenv.config();

app.use(morgan('dev'));
const PORT = process.env.PORT || 3000;
const GATEWAY = process.env.SERVICE_NAME;
const FLASK_SERVICE_ORDERS = process.env.FLASK_SERVICE_ORDERS || 'http://localhost:5000/ordenes';
const FLASK_SERVICE_ORDER_PRODUCTS = process.env.FLASK_SERVICE_ORDER_PRODUCTS || 'http://localhost:5000/ordenes_productos';

// Configuración de las rutas de proxy
app.use('/api/v1/orders', proxy(FLASK_SERVICE_ORDERS));
app.use('/api/v1/order-products', proxy(FLASK_SERVICE_ORDER_PRODUCTS));

// rutas de auth (puedes añadir aquí si tienes alguna)

app.listen(PORT, () => {
    console.log(`Servicio ${GATEWAY} corriendo en http://localhost:${PORT}`);
});
