@@ -1,6 +1,5 @@
const config = require("../config.js");
const { ActivityType } = require("discord.js");
const colors = require('../UI/colors/colors');

module.exports = async (client) => {
    const { REST } = require("@discordjs/rest");
@@ -12,33 +11,44 @@ module.exports = async (client) => {
            await rest.put(Routes.applicationCommands(client.user.id), {
                body: await client.commands,
            });
            console.log('\n' + '─'.repeat(40));
            console.log(`${colors.magenta}${colors.bright}⚡ COMMAND STATUS${colors.reset}`);
            console.log('─'.repeat(40));
            console.log(`${colors.cyan}[ COMMANDS ]${colors.reset} ${colors.green}Loaded Successfully 🚀${colors.reset}`);
            console.log(`${colors.cyan}[ TIME ]${colors.reset} ${colors.gray}${new Date().toISOString().replace('T', ' ').split('.')[0]}${colors.reset}`);
            console.log(`${colors.cyan}[ USER ]${colors.reset} ${colors.yellow}GlaceYT${colors.reset}`);
            console.log("✅ Commands Loaded Successfully");
        } catch (err) {
            console.log('\n' + '─'.repeat(40));
            console.log(`${colors.magenta}${colors.bright}⚡ COMMAND STATUS${colors.reset}`);
            console.log('─'.repeat(40));
            console.log(`${colors.cyan}[ COMMANDS ]${colors.reset} ${colors.red}Failed To Load ❌${colors.reset}`);
            console.log(`${colors.cyan}[ ERROR ]${colors.reset} ${colors.red}${err.message}${colors.reset}`);
            console.log(`${colors.cyan}[ TIME ]${colors.reset} ${colors.gray}${new Date().toISOString().replace('T', ' ').split('.')[0]}${colors.reset}`);
            console.log(`${colors.cyan}[ USER ]${colors.reset} ${colors.yellow}GlaceYT${colors.reset}`);
            console.error("❌ Failed to load commands:", err.message);
        }
    })();

    const activityType = ActivityType[config.activityType.charAt(0).toUpperCase() + config.activityType.slice(1).toLowerCase()];
    if (!activityType) {
        console.error(`Invalid activity type: ${config.activityType}`);
        return;
    const defaultActivity = {
        name: config.activityName,
        type: ActivityType[config.activityType.toUpperCase()]
    };

    async function updateStatus() {
 
        const activePlayers = Array.from(client.riffy.players.values()).filter(player => player.playing);

        if (!activePlayers.length) {
            //console.log("⏹️ No song is currently playing. Setting default status.");
            client.user.setActivity(defaultActivity);
            return;
        }

        const player = activePlayers[0];

        if (!player.current || !player.current.info || !player.current.info.title) {
            //console.log("⚠️ Current track info is missing. Keeping default status.");
            return;
        }

        const trackName = player.current.info.title;
        //console.log(`🎵 Now Playing: ${trackName}`);

        client.user.setActivity({
            name: `🎸 ${trackName}`,
            type: ActivityType.Playing
        });
    }
    
    setInterval(() => client.user.setActivity({ 
        name: config.activityName, 
        type: activityType 
    }), 10000);

    setInterval(updateStatus, 5000);

    client.errorLog = config.errorLog;
};

    setInterval(updateStatus, 5000);

    client.errorLog = config.errorLog;
};
