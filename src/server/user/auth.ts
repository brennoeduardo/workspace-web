
class AuthApi {

    async login(user: any): Promise<any> {
        return await post('auth', user);
    }

    async confirmCode(email: string, code: string): Promise<any> {
        return await post(`auth/confirmCode`, { email, code });
    }

    async authenticate(): Promise<any> {
        return await get('auth/check');
    }

}

export const AuthAPI = new AuthApi()