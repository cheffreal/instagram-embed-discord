module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Bot ${client.user.tag} olarak giriş yaptı!`);
        client.user.setActivity('Instagram gönderilerini kontrol ediyor', { type: 'WATCHING' });
        console.log('Cheff Was Here! <3');
        console.log('ertucuku SİKMEK İÇİN BAĞLANIYORUM! <3');
    },
};
