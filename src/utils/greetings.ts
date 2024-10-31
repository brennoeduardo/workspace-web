export const greeting = () => {

    const date = new Date();
    const hours = date.getHours();
    let greeting = '';

    if (hours >= 0 && hours < 12) {
        greeting = 'Bom dia';
    } else if (hours >= 12 && hours < 17) {
        greeting = 'Boa Tarde';
    } else {
        greeting = 'Boa Noite';
    }

    return greeting;

}