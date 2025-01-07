import authRoutes from "./auth.js";
import OrderRoutes from "./order.js";
import { CategoryRoutes, ProductRoutes } from "./product.js";


const prefix = '/api';

const registerRoutes =async (app) => {
   await app.register(authRoutes, { prefix });
   await app.register(ProductRoutes, { prefix });
   await app.register(CategoryRoutes, { prefix });
   await app.register(OrderRoutes, { prefix });
}

export default registerRoutes;