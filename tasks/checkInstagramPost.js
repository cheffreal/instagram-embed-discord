const fs = require('fs');
const Instagram = require('instagram-web-api');
const config = require('../config.json');
const instagram = new Instagram({ username: config.instagramUsername });

async function checkInstagramPost(client) {
    try {
        const profile = await instagram.getUserByUsername({ username: config.instagramUsername });

        if (profile && profile.edge_owner_to_timeline_media && profile.edge_owner_to_timeline_media.edges.length > 0) {
            const latestPost = profile.edge_owner_to_timeline_media.edges[0].node;

            if (latestPost && latestPost.id !== config.lastPostId) {
                const channel = client.channels.cache.get(config.discordChannelId);
                if (channel) {
                    channel.send(`@everyone Yeni bir gönderi paylaşıldı! Beğeni ve yorum yapmayı unutmayın: https://www.instagram.com/p/${latestPost.shortcode}`);
                    config.lastPostId = latestPost.id;
                    fs.writeFileSync('./config.json', JSON.stringify(config, null, 4));
                }
            }
        } else {
            console.error('Instagram profil verisi beklenen yapıda değil.');
        }
    } catch (error) {
        console.error('Instagram gönderisi alınırken hata oluştu:', error);
    }
}

module.exports = checkInstagramPost;
