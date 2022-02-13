const { writeFile, readFile } = require('fs/promises');
const axios = require('axios');

async function loadOldInstagramAccessTokens()
{
    const accessTokensOld = await readFile('./writable/instagram_access_tokens.json', { encoding: 'utf8' });
    return JSON.parse(accessTokensOld);
}

async function refreshInstagramAccessTokens(access_token)
{
    try {
        const response = await axios.get(`https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${access_token}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return false;
    } 
}

async function getInstagramImages(limit, url)
{
    let accessTokens = await loadOldInstagramAccessTokens();

    const currentDateObj = new Date();
    const currentDate = `${currentDateObj.getFullYear()}-${currentDateObj.getMonth()}-${currentDateObj.getDate()}`;
    const expireDateObj = new Date(accessTokens.created_at + (accessTokens.expires_in * 1000));
    const expireDate = `${expireDateObj.getFullYear()}-${expireDateObj.getMonth()}-${expireDateObj.getDate()}`;
    // if session expired
    if (currentDate == expireDate) {
        const accessTokensNew = await refreshInstagramAccessTokens(accessTokens.access_token);
        accessTokensNew.created_at = Date.now();
        // update access tokens
        await writeFile('./writable/instagram_access_tokens.json', JSON.stringify(accessTokensNew));
        accessTokens = accessTokensNew;
    }

    // if empty url
    if (!url) {
        url = `https://graph.instagram.com/me/media?fields=caption,media_url&edges=children&access_token=${accessTokens.access_token}&limit=${limit}`;
    }
    
    // get images
    try {
        const response = await axios.get(url);
        return { images: response.data.data, nextPageUrl: response.data.paging.next };
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function getYoutubeVideos(limit, nextPageToken)
{
    const apiKey = 'AIzaSyD0pmZrG5esc5m85Hv0tECBb_LxxfyjuaI';
    const channelId = 'UCwpsKm_GkogACbNv_b-XYTw';

    // if not empty next page token
    let url = `https://www.googleapis.com/youtube/v3/search?part=id&channelId=${channelId}&maxResults=${limit}&order=date&type=video&key=${apiKey}`;
    if (nextPageToken) {
        url += `&pageToken=${nextPageToken}`;
    }

    // get videos
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    getInstagramImages,
    getYoutubeVideos
};
