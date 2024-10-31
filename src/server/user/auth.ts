
class AuthApi {

    async login(user: any): Promise<any> {
        return await post('auth', user);
    }

    async confirmCode(email: string, code: string): Promise<any> {
        return await post(`auth/confirmCode`, { email, code });
    }

}

export const AuthAPI = new AuthApi()