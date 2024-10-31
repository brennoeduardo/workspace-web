import * as jwt_decode from 'jwt-decode'

export const decode = (token: string): any => {
    try {

        return jwt_decode.jwtDecode(token)

    } catch (error) {
        console.error('Erro:', error);
        throw error
    }
}