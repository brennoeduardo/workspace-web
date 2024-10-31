export class UserApi {

    async find(options: any): Promise<any> {
        return await get('user', options);
    }

    async create(data: any): Promise<any> {
        return await post('user', data);
    }

    async update(id: number): Promise<any> {
        return await put(`user/${id}`, id);
    }

}

export const UserAPI = new UserApi()