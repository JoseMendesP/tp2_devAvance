import fetch from 'node-fetch';
import crypto from 'crypto';

/**
 * Récupère les données de l'endpoint en utilisant les identifiants
 * particuliers developer.marvels.com
 * @param url l'end-point
 * @return {Promise<json>}
 */
const publicKey="700f1e9ecc7a4fd78a1a39c77838df24"
const privateKey="59691e31a54e80f0eb291f130daa9fa33d3f13d9"
const ts=  Date.now()

export const getData = async (url) => {
    try {
        const response = await fetch(url + "?" + new URLSearchParams({
            apikey: publicKey,
            hash: await getHash(publicKey, privateKey, ts),
            ts: ts,
        }));

        const responseJson = await response.json();

        if (responseJson && responseJson.data && responseJson.data.results) {
            const responseResults = responseJson.data.results;
            let responseWithThumbnail = [];

            responseResults.forEach((element) => {
                if (element.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available') {
                    responseWithThumbnail.push(element);
                }
            });

            return responseWithThumbnail.map((character) => {
                const newCharacter = { ...character };
                newCharacter.imageUrl = character.thumbnail.path + "/portrait_xlarge." + character.thumbnail.extension;
                return newCharacter;
            });
        } else {
            console.error('Aucun résultat à été trouvé.');
            return [];
        }
    } catch (error) {
        console.error('Erreur de récupération:', error);
        throw error;
    }
}

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

