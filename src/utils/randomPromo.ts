
const alhabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export const randomPromo = (maxLength: number) => {
    let result = "";
    for(let i = 0; i < maxLength; i++) {
        result += alhabet[Math.floor(Math.random() * 46)];
    }
    return result;
}