export const userAuth = () => {
    try {

        const getUser = localStorage.getItem('user')
        const user = getUser ? JSON.parse(getUser) : null

        if (!user) return null

        return { id: user.id, name: user.name, email: user.email }

    } catch (error) {
        console.error(error);
        return null;
    }
}