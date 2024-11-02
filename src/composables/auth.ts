import { useRouter } from 'vue-router';
import { AuthAPI } from '~/server/user/auth';

export const useUserAuth = () => {
    const router = useRouter();

    const checkAuthentication = async () => {
        try {
            const response = await AuthAPI.authenticate();

            if (response.authenticated) {
                return response;
            } else {
                redirectToHome();
                return null;
            }
        } catch (error) {
            console.error('Error checking authentication:', error);
            redirectToHome();
            return null;
        }
    };

    const redirectToHome = () => {
        router.push('/');
    };

    return {
        checkAuthentication,
    };
};
