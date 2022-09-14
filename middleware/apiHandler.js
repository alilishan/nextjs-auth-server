

import errorHandler from "./errorHandler";
import jwtHandler from "./jwtHandler";

export default function apiHandler(handler) {
    return async (req, res, next) => {
        const method = req.method.toLowerCase();

        // Check handler supports HTTP method
        if (!handler[method])
            return res.status(405).end(`Method ${req.method} Not Allowed`);

        try {
            // JWT middleware
            const _req = await jwtHandler(req, res);

            // Route handler
            await handler[method](_req, res);
        } catch (err) {
            // global error handler
            errorHandler(err, res);
        }
    }
}