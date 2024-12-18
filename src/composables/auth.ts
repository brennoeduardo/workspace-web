import { useRouter } from 'vue-router';
import { AuthAPI } from '~/server/User/auth';

export const useUserAuth = () => {
    const router = useRouter();

    const checkAuthentication = async () => {
        try {
            const response = await AuthAPI.authenticate();

            if (response.authenticated) return response;
            else redirectToHome();

        } catch (error) {
            redirectToHome();
            return null;
        }
    };

    const authenticatedUser = async (): Promise<{ user: IUser; authenticated: boolean } | null> => {
        try {

            const { user, authenticated } = await AuthAPI.authenticate();

            if (authenticated) return { user, authenticated };
            else return null;

        } catch (error) {
            return null;
        }
    }


    const redirectToHome = () => {
        router.push('/');
        return null
    };

    return { checkAuthentication, authenticatedUser };
};
