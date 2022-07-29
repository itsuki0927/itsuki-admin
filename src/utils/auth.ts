import jsCookie from 'js-cookie';

const TOKEN_KEY = 'adminToken';

export const setToken = (value: string) => jsCookie.set(TOKEN_KEY, value);

export const removeToken = () => jsCookie.remove(TOKEN_KEY);

export const getToken = () => jsCookie.get(TOKEN_KEY);
