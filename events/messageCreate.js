module.exports = {
    name: 'messageCreate',
    execute(message) {
        if (message.content === '!yardım') {
            message.channel.send('<@427907040220807169>. İletişime Geçiniz Bir Sorun Olursa');
        }
    },
};
