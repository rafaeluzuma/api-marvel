import api from '../services/api'
import CryptoJS from 'crypto-js';

const publicKey     = import.meta.env.VITE_MARVEL_PUBLIC_KEY
const privateKey    = import.meta.env.VITE_MARVEL_PRIVATE_KEY

const getHash = (timestamp: string) => {
    return CryptoJS.MD5(timestamp + privateKey + publicKey).toString();
};

export const getCharacters = async () => {
    const timestamp = new Date().getTime().toString();
    const hash      = getHash(timestamp);

    try {
        const response = await api.get(`characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`);

        return response.data.data.results;
    } catch (error) {
        console.error('Erro ao buscar personagens:', error);
        throw error;
    }
};

export const getCharacterDetails = async (characterId: Number) => {
    const timestamp = new Date().getTime().toString();
    const hash      = getHash(timestamp);

    try {
        const response = await api.get(`characters/${characterId}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`);

        return response.data.data.results;
    } catch (error) {
        console.error('Erro ao buscar personagens:', error);
        throw error;
    }
};

export const getComics = async () => {
    const timestamp = new Date().getTime().toString();
    const hash      = getHash(timestamp);

    try {
        const response = await api.get(`comics?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`);

        return response.data.data.results;
    } catch (error) {
        console.error('Erro ao buscar personagens:', error);
        throw error;
    }
};

export const getEvents = async () => {
    const timestamp = new Date().getTime().toString();
    const hash      = getHash(timestamp);

    try {
        const response = await api.get(`events?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`);

        return response.data.data.results;
    } catch (error) {
        console.error('Erro ao buscar personagens:', error);
        throw error;
    }
};
