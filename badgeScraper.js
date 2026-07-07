const { Client, MessageEmbed, MessageAttachment } = require("discord.js-selfbot-v13"); 
const axios = require("axios"); 
const fs = require("fs");

const client = new Client({ 
    checkUpdate: false, 
    patchVoice: false 
}); 

const CONFIG = { 
    RESULT_GUILD_ID: "", 
    CATEGORY_ID: "", 
    API_DELAY: 1500, 
    TOKEN: "" 
}; 

const badges = { 
    discord_employee: { value: 1, emoji: "<:staff:1426307616077906061>", rare: true }, 
    partnered_server_owner: { value: 2, emoji: "<:partner:1426307340956733550>", rare: true }, 
    hypesquad: { value: 4, emoji: "<:hypeshiny:1426307792649846954>", rare: true }, 
    bug_hunter_level_1: { value: 8, emoji: "<:bughunter_1:1426301430695727235>", rare: true }, 
    bug_hunter_level_2: { value: 16384, emoji: "<:bughunter_2:1426301432197419120>", rare: true }, 
    early_supporter: { value: 512, emoji: "<:early_supporter:1426301425503436852>", rare: true }, 
    verified_developer: { value: 131072, emoji: "<:developer:1426301434017611927>", rare: true }, 
    certified_moderator: { value: 262144, emoji: "<:alumni:1426308069775642770>", rare: true }, 
    nitro: { value: -1, emoji: "<:nitro:1426989748958003423>", rare: false }, 
    nitro_bronze: { value: -1, emoji: "<:bronze:1426301372042707004>", rare: false }, 
    nitro_silver: { value: -1, emoji: "<:silver:1426301370243485896>", rare: false }, 
    nitro_gold: { value: -1, emoji: "<:gold:1426301362085302294>", rare: false }, 
    nitro_platinum: { value: -1, emoji: "<:platinum:1426301366745432335>", rare: false }, 
    nitro_diamond: { value: -1, emoji: "<:diamond:1426301358805352600>", rare: false }, 
    nitro_emerald: { value: -1, emoji: "<:emerald:1426301360860692610>", rare: false }, 
    nitro_ruby: { value: -1, emoji: "<:ruby:1426301368536268870>", rare: false }, 
    nitro_opal: { value: -1, emoji: "<:opal:1426301365046612151>", rare: false }, 
    guild_booster_lvl1: { value: -1, emoji: "<:lvl1:1426304877063180359>", rare: false }, 
    guild_booster_lvl2: { value: -1, emoji: "<:lvl2:1426304881031118900>", rare: false }, 
    guild_booster_lvl3: { value: -1, emoji: "<:lvl3:1426304882654314647>", rare: false }, 
    guild_booster_lvl4: { value: -1, emoji: "<:lvl4:1426304884377915512>", rare: false }, 
    guild_booster_lvl5: { value: -1, emoji: "<:lvl5:1426304891961217144>", rare: false }, 
    guild_booster_lvl6: { value: -1, emoji: "<:lvl6:1426304893635002409>", rare: false }, 
    guild_booster_lvl7: { value: -1, emoji: "<:lvl7:1426304895841075342>", rare: false }, 
    guild_booster_lvl8: { value: -1, emoji: "<:lvl8:1426304897422463116>", rare: false }, 
    guild_booster_lvl9: { value: -1, emoji: "<:lvl9:1426304875284926565>", rare: false }, 
    one_char: { value: -1, emoji: "<:1c:1426308887270658108>", rare: false }, 
    two_char: { value: -1, emoji: "<:2c:1426308858942455829>", rare: false }, 
    three_char: { value: -1, emoji: "<:3c:1426308833780826283>", rare: false }, 
    quest_completed: { value: -1, emoji: "<:quest_completed:1426305108462927933>", rare: false }, 
    orb_profile_badge: { value: -1, emoji: "<:orbs:1426305106944720947>", rare: false }, 
}; 

const id_map = { 
    discord_employee: badges.discord_employee, 
    staff: badges.discord_employee, 
    partnered_server_owner: badges.partnered_server_owner, 
    partner: badges.partnered_server_owner, 
    hypesquad: badges.hypesquad, 
    hypesquad_events: badges.hypesquad, 
    bug_hunter_level_1: badges.bug_hunter_level_1, 
    bug_hunter_level_2: badges.bug_hunter_level_2, 
    early_supporter: badges.early_supporter, 
    early_nitro_supporter: badges.early_supporter, 
    verified_developer: badges.verified_developer, 
    early_verified_bot_developer: badges.verified_developer, 
    certified_moderator: badges.certified_moderator, 
    moderator_programs_alumni: badges.certified_moderator, 
    premium: badges.nitro, 
    premium_tenure_1_month_v2: badges.nitro_bronze, 
    premium_tenure_3_month_v2: badges.nitro_silver, 
    premium_tenure_6_month_v2: badges.nitro_gold, 
    premium_tenure_12_month_v2: badges.nitro_platinum, 
    premium_tenure_24_month_v2: badges.nitro_diamond, 
    premium_tenure_36_month_v2: badges.nitro_emerald, 
    premium_tenure_60_month_v2: badges.nitro_ruby, 
    premium_tenure_72_month_v2: badges.nitro_opal, 
    guild_booster_lvl1: badges.guild_booster_lvl1, 
    guild_booster_lvl2: badges.guild_booster_lvl2, 
    guild_booster_lvl3: badges.guild_booster_lvl3, 
    guild_booster_lvl4: badges.guild_booster_lvl4, 
    guild_booster_lvl5: badges.guild_booster_lvl5, 
    guild_booster_lvl6: badges.guild_booster_lvl6, 
    guild_booster_lvl7: badges.guild_booster_lvl7, 
    guild_booster_lvl8: badges.guild_booster_lvl8, 
    guild_booster_lvl9: badges.guild_booster_lvl9, 
    quest_completed: badges.quest_completed, 
    orb_profile_badge: badges.orb_profile_badge, 
}; 

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms)); 

function getUserFlags(member) { 
    const raw = member.user.publicFlags ?? member.user.flags; 
    return raw ? raw.bitfield : 0; 
} 

function hasImportantFlagOrBoost(member) { 
    const flags = getUserFlags(member); 
    for (const badge of Object.values(badges)) { 
        if (badge.rare && badge.value !== -1 && (flags & badge.value) === badge.value) { 
            return true; 
        } 
    } 
    if (member.premiumSince) { 
        const boostStart = member.premiumSince.getTime(); 
        const diffMonths = Math.floor((Date.now() - boostStart) / (1000 * 60 * 60 * 24 * 30)); 
        if (diffMonths >= 18) return true; 
    } 
    return false; 
} 

async function fetchUserProfile(userId) { 
    try { 
        const response = await axios.get( 
            `https://discord.com/api/v9/users/${userId}/profile?with_mutual_guilds=false`, 
            { 
                headers: { 
                    Authorization: client.token, 
                    'Content-Type': 'application/json' 
                } 
            } 
        ); 
        return response.data; 
    } catch (error) { 
        return null; 
    } 
} 

function getAllBadges(profile, member) { 
    const foundBadges = []; 
    const flags = profile.user?.public_flags || 0; 

    for (const badge of Object.values(badges)) { 
        if (badge.value !== -1 && (flags & badge.value) === badge.value) { 
            foundBadges.push(badge.emoji); 
        } 
    } 

    if (profile.badges && Array.isArray(profile.badges)) { 
        for (const pBadge of profile.badges) { 
            const mapped = id_map[pBadge.id]; 
            if (mapped && !foundBadges.includes(mapped.emoji)) { 
                foundBadges.push(mapped.emoji); 
            } 
        } 
    } 

    if (member.premiumSince) { 
        const boostStart = member.premiumSince.getTime(); 
        const diffMonths = Math.floor((Date.now() - boostStart) / (1000 * 60 * 60 * 24 * 30)); 
        let boostKey = "guild_booster_lvl1"; 
        if (diffMonths >= 24) boostKey = "guild_booster_lvl9"; 
        else if (diffMonths >= 18) boostKey = "guild_booster_lvl8"; 
        else if (diffMonths >= 15) boostKey = "guild_booster_lvl7"; 
        else if (diffMonths >= 12) boostKey = "guild_booster_lvl6"; 
        else if (diffMonths >= 9) boostKey = "guild_booster_lvl5"; 
        else if (diffMonths >= 6) boostKey = "guild_booster_lvl4"; 
        else if (diffMonths >= 3) boostKey = "guild_booster_lvl3"; 
        else if (diffMonths >= 2) boostKey = "guild_booster_lvl2"; 

        foundBadges.push(badges[boostKey].emoji); 
    } 

    return [...new Set(foundBadges)]; 
} 

async function sendToLogChannel(channel, member, badgesList) { 
    const badgesText = badgesList.length > 0 ? badgesList.join(" ") : "Rozet yok"; 
    
    const statusMap = { online: "🟢", idle: "🟡", dnd: "🔴", offline: "⚫" };
    const userStatus = statusMap[member.presence?.status] || "⚫";
    const activity = member.presence?.activities[0] ? member.presence.activities[0].name : "No Activity";

    try { 
        let webhooks = await channel.fetchWebhooks().catch(() => null); 
        let webhook = webhooks?.find(wh => wh.name === 'TwixyFush Scraper'); 

        if (!webhook) { 
            webhook = await channel.createWebhook('TwixyFush Scraper', { 
                avatar: client.user.displayAvatarURL(), 
            }).catch(() => null); 
        } 

        const embed = { 
            color: 0x5865F2, 
            title: 'TwixyFush', 
            thumbnail: { url: member.user.displayAvatarURL({ dynamic: true }) }, 
            fields: [ 
                { name: ' Username & ID', value: `${member.user.tag}\n\`${member.id}\``, inline: false }, 
                { name: ' Badges', value: badgesText, inline: false }, 
                { name: ' Status', value: userStatus, inline: false },
                { name: ' Current Activity', value: `\`${activity}\``, inline: false }, 
                { name: ' Account Created', value: member.user.createdAt.toLocaleDateString('tr-TR').replace(/\//g, '.'), inline: false } 
            ], 
            footer: { text: 'add me for help twixyfush', icon_url: client.user.displayAvatarURL() }, 
            timestamp: new Date() 
        }; 

        if (webhook) { 
            await webhook.send({ embeds: [embed] }); 
        } else { 
            await channel.send(`>>> **✨ User Info**\n**User:** ${member.user.tag}\n**ID:** \`${member.id}\` \n**Badges:** ${badgesText}\n**Status:** ${userStatus}\n**Activity:** ${activity}\n**Created:** ${member.user.createdAt.toLocaleDateString('tr-TR')}`); 
        } 

        return true; 
    } catch (error) { 
        console.error(`[ERROR] not sended: ${error.message}`); 
        return false; 
    } 
} 

async function startScraping(guild) { 
    console.log(`\n--- Scaning: ${guild.name} ---`); 

    const logGuild = client.guilds.cache.get(CONFIG.RESULT_GUILD_ID); 
    if (!logGuild) return console.log("[!] Log server not finded!"); 

    const channelName = guild.name.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, "-"); 
    let channel = logGuild.channels.cache.find(c => c.name === channelName && c.parentId === CONFIG.CATEGORY_ID); 

    if (!channel) { 
        try { 
            channel = await logGuild.channels.create(channelName, { 
                type: 'GUILD_TEXT', 
                parent: CONFIG.CATEGORY_ID, 
                topic: `${guild.name} SCRAPE results` 
            }); 
        } catch (e) { 
            return console.error(`[!] Channel ERROR: ${e.message}`); 
        } 
    } 

    let members; 
    try { 
        members = await guild.members.fetch({ withPresences: true, withUserFlags: true }); 
    } catch (error) { 
        members = guild.members.cache; 
    } 

    let foundCount = 0; 
    let resultsText = `--- ${guild.name} SCRAPE RESULTS ---\n\n`;

    for (const [, member] of members) { 
        if (!hasImportantFlagOrBoost(member)) continue; 

        const profile = await fetchUserProfile(member.id); 
        await sleep(CONFIG.API_DELAY); 

        if (!profile) continue; 

        const allBadges = getAllBadges(profile, member); 
        
      
        resultsText += `User: ${member.user.tag} (${member.id})\nCreated: ${member.user.createdAt.toLocaleDateString('tr-TR')}\nBadges: ${allBadges.length > 0 ? allBadges.join(", ") : "None"}\n--------------------------\n`;

        console.log(`[FINDED] ${member.user.tag} | ${allBadges.length} Badge`); 

        const success = await sendToLogChannel(channel, member, allBadges); 
        if (success) foundCount++; 

        await sleep(500); 
    } 

   
    const fileName = "results.txt";
    fs.writeFileSync(fileName, resultsText);
    
    await channel.send({ 
        content: `✅ **${guild.name}** is scraped. Total **${foundCount}** user founded.`,
        files: [fileName] 
    });

    if (fs.existsSync(fileName)) fs.unlinkSync(fileName);

    console.log(`\n--- Scraped. Total Finded: ${foundCount} ---\n`); 
} 

client.on("ready", () => { 
    console.log(`\nScraper logged in as: ${client.user.tag}`); 
}); 

client.on("guildCreate", async (guild) => { 
    if (guild.id === CONFIG.RESULT_GUILD_ID) return; 
    await startScraping(guild); 
}); 

client.on("messageCreate", async (message) => { 
    if (message.author.id !== client.user.id) return; 

    if (message.content.startsWith(".scan")) { 
        const args = message.content.split(" "); 
        const targetId = args[1]; 

        if (!targetId) return; 
        message.delete().catch(() => null); 

        const guild = await client.guilds.fetch(targetId).catch(() => null); 
        if (!guild) return console.log(`Server not finded!`); 

        await startScraping(guild); 
    } 
}); 

client.login(CONFIG.TOKEN);