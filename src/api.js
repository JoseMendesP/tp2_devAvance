import fetch from 'node-fetch';
import crypto from 'crypto';

/**
 * Récupère les données de l'endpoint en utilisant les identifiants
 * particuliers developer.marvels.com
 * @param url l'end-point
 * @return {Promise<json>}
 */
require('dotenv').config();
const publicKey = process.env.publicKey;
const privateKey = process.env.privateKey;
const ts = process.env.ts;

export const getData = async (url) => {
    try {
        const hash = crypto.createHash('md5').update(ts + privateKey + publicKey).digest('hex');
        const Urlapi = `${url}?apikey=${publicKey}&ts=${ts}&hash=${hash}`;
        console.log('URL pour la requête API :', Urlapi); // Pour vérifier l'URL pour le débogage

        const response = await fetch(Urlapi);
        const responseData = await response.json();

        if (responseData && responseData.data && responseData.data.results) {
            const responseResults = responseData.data.results;
            let responseWithThumbnail = [];

            responseResults.forEach((element) => {
                if (element.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available') {
                    responseWithThumbnail.push(element);
                }
            });

            return responseWithThumbnail.map((character) => {
                const newCharacter = { ...character };
                newCharacter.imageUrl = `${character.thumbnail.path}/portrait_xlarge.${character.thumbnail.extension}`;
                return newCharacter;
            });
        } else {
            console.error('Aucun résultat trouvé.');
            return [];
        }
    } catch (error) {
        console.error('Erreur de récupération:', error);
        throw error;
    }
};


/**
 * Calcul la valeur md5 dans l'ordre : timestamp+privateKey+publicKey
 * cf documentation developer.marvels.com
 * @param publicKey
 * @param privateKey
 * @param timestamp
 * @return {Promise<ArrayBuffer>} en hexadecimal
 */
export const getHash = async (publicKey, privateKey, timestamp) => {
    const hash=crypto.createHash('md5').update(timestamp + privateKey + publicKey).digest("hex")
    return hash;
}

