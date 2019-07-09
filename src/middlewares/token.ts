import * as jwt from 'jsonwebtoken';
import * as httpStatus from 'http-status';

import Response from '../utils/response';
import config from '../config/globalConfig';

class Token {
    async generateToken(userData) {
        const { id, email } = userData;
        const token = await jwt.sign(
            {
                id,
                email,
            },
            config.secret,
            {
                expiresIn: '1hr',
            },
        );

        return token;
    }

    async validateToken(token) {
        let result;

        await jwt.verify(token, config.secret, (error, decoded) => {
            if (error) {
                result = {
                    success: false,
                    ...decoded,
                };
            } else {
                result = {
                    success: true,
                    ...decoded,
                };
            }
        });

        return result;
    }

    async middleware(req, res, next) {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return Response.errorResponse(res, { errorMessage: 'No token provided.' }, httpStatus.UNAUTHORIZED);
        }

        const tokenParts = authHeader.split(' ');

        if (!(tokenParts.length === 1)) {
            return Response.errorResponse(res, { errorMessage: 'The token informed is invalid.' }, httpStatus.UNAUTHORIZED);
        }

        const [scheme, token] = tokenParts;

        if (!/^Bearer$/.test(scheme)) {
            return Response.errorResponse(res, { errorMessage: 'The token informed is malformatted.' }, httpStatus.UNAUTHORIZED);
        }

        const authResult = await this.validateToken(token);

        if (!authResult.success) {
            return Response.errorResponse(res, { errorMessage: 'Token invalid' }, httpStatus.UNAUTHORIZED);
        }

        req.user = { ...authResult };
        return next();
    }
}

export default new Token();
