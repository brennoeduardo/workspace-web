export class UserApi {

    async find(options: any): Promise<any> {
        return await get('user', options);
    }

    async create(data: any): Promise<any> {
        return await post('user', data);
    }

    async update(id: number, body: any): Promise<any> {
        return await put(`user/${id}`, body);
    }

    async updateAvatar(id: number, body: any): Promise<any> {
        return await put(`user/avatar/${id}`, body);
    }

    async getAvatar(id: number): Promise<any> {
        return await get(`user/avatar/${id}`);
    }

}

export const UserAPI = new UserApi()