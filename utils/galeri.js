const { writeFile, readFile } = require('fs/promises');
const axios = require('axios');

async function loadOldAccessTokens()
{
    const accessTokensOld = await readFile('./writable/instagram_access_tokens.json', { encoding: 'utf8' });
    return JSON.parse(accessTokensOld);
}

async function refreshAccessTokens(access_token)
{
    try {
        const response = await axios.get(`https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${access_token}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return false;
    } 
}

async function getInstagramImages()
{
    let accessTokens = await loadOldAccessTokens();

    const currentDateObj = new Date();
    const currentDate = `${currentDateObj.getFullYear()}-${currentDateObj.getMonth()}-${currentDateObj.getDate()}`;
    const expireDateObj = new Date(accessTokens.created_at + (accessTokens.expires_in * 1000));
    const expireDate = `${expireDateObj.getFullYear()}-${expireDateObj.getMonth()}-${expireDateObj.getDate()}`;
    // if session expired
    if (currentDate == expireDate) {
        const accessTokensNew = await refreshAccessTokens(accessTokens.access_token);
        accessTokensNew.created_at = Date.now();
        // update access tokens
        await writeFile('./writable/instagram_access_tokens.json', JSON.stringify(accessTokensNew));
        accessTokens = accessTokensNew;
    }
    
    // get image
    try {
        const response = await axios.get(`https://graph.instagram.com/me/media?fields=caption,media_url&access_token=${accessTokens.access_token}`);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    getInstagramImages
};
