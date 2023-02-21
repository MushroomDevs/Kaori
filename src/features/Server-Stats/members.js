// Dependências
const { serverStats } = require('../../database/models/index'),
    CronJob = require('cron').CronJob;

module.exports = async (client) => {

    var Check = new CronJob("*/10 * * * *", async function () {
        client.guilds.cache.forEach(async (guild) => {

            /** ------------------------------------------------------------------------------------------------
            * SE CONECTA AO BANCO DE DADOS DO AUTO-TWITCH
            * ------------------------------------------------------------------------------------------------ */
            let results = await serverStats.findOne({ _id: guild.id })
            if (results) {
                const membros = guild.members.cache;
                const category = guild.channels.cache.find(c => c.id == results.categoryID);

                // Get server settings / if no settings then return
                const settings = guild.settings;
                if (Object.keys(settings).length == 0) return;

                if (category) {

                    const members = guild.channels.cache.find(c => c.id == results.membersID);
                    if (members) {
                        client.logger.addon(`Atualizando [MEMBERS] para o servidor ${guild.name} (${guild.id})`)
                        await members.setName(`Members: ${membros.filter(member => !member.user.bot).size.toLocaleString(settings.Language)}`).catch(e => console.log(e));
                    } else {
                        return;
                    }
                }
            }
        })
    })
    Check.start();
}