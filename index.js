const Discord = require('discord.js')
const client = new Discord.Client()
const beta = new Boolean(false);
serverOff = false;
const rep = require(`./utils/reputation.json`)
const ec = require(`./utils/economy.json`)
const fs = require('fs')
const config = require('./utils/config.json')
const gt = require('growtopia-details')
const currentdate = new Date();


/* #region  event handler */
client.on('ready', () => {
    console.log(`Current date: ` + currentdate.toLocaleDateString())
    console.log(`bot is up`)

    const totalusers = client.users.cache.filter(user => !user.bot);

    client.user.setActivity(`${totalusers.size} Growtopians`, { type: 'WATCHING' })

    setInterval(checkServer, 60000);
    setInterval(checkPing, 60000);

    function checkPing() {
        ping = Math.round(client.ws.ping)

        if (ping > 500) {
            client.channels.cache.get(config.crashLog).send(`❤️‍🔥 The server is on fire! the client is currently lagging with a latency of ${ping}ms, is the network stable?\n${currentdate.toLocaleDateString()} at ${currentdate.toLocaleTimeString()}`)
        }

    }

    function checkServer() {
        gt.getDetail().then(e => {
            userCount = e.onlineUsersCount;
            const logChannel = client.channels.cache.get("1038457038012948542");
            if (userCount > 5000 && serverOff == true) {
                serverOff = false;
                logChannel.setRateLimitPerUser(0).then(() => {
                    logChannel.send(`Seems  like the servers are up with ${userCount} players, removing slowmode.`);
                    console.log(`servers are back, Slowmode removed`)
                });
            }

            if (userCount < 100 && serverOff == false) {
                serverOff = true;
                logChannel.setRateLimitPerUser(5).then(() => {
                    logChannel.send(`Uh oh, seems like the growtopia servers are down, applying slowmode of \`5\` Seconds.`);
                    client.channels.cache.get(config.teamChat).send(`Hey team, there was a server restart recently and the daily quest might have changed, please do check it and reannounce if need. thank you!`)
                    console.log(`servers are down, Slowmode applied`)
                });
            }
            console.log('server status scanned');
        })
    }
})
/* #endregion */

/* #region  Command handler */
client.on('message', async message => {

    /* #region  mod mail handler */
    if (message.channel.type === "dm" && !message.author.bot) {
        const modMailMsg = message.content.split(' ').join(' ');
        client.channels.cache.get(config.ModMail).send(
            new Discord.MessageEmbed()
                .setAuthor(message.author.username, message.author.avatarURL())
                .setDescription(`New modmail received!`)
                .addField("Message:", `\`\`\`${modMailMsg}\`\`\``)
                .setTimestamp()
                .setFooter(`Lost Nemo modmail`)
        );
        return;
    }
    /* #endregion */

    let cancelInput = "cancel"
    let args = message.content.trim().split(/ +/g);
    let command = args[0].slice(config.prefix.length).toLowerCase();
    if (!message.content.startsWith(config.prefix) || message.author.bot) { return; }

    /* #region  the announcer questions */
    let questions = {
        q1: "what is the first daily quest item? ",
        q2: "what is the second daily quest item?",
        q3: "what is the first item's price (in world locks)? [must be a number]",
        q4: "what is the second item's price (in world locks)? [must be a number]",
        q5: "price prediction? [\`rising/dropping/stable\`]",
        q6: "What role day is it?",
    }

    let cotdquestions = {
        q1: "what is the cotd fish? ",
        q2: "is the fish trainable? [yes/no]",
        q3: "what is the perfect variant fish price (per world lock)? [must be a number]",
        q4: "what is the normal variant fish price (per world lock)? [must be a number]",
        q5: "is the turnout high or low? [high/low]",
    }
    /* #endregion */

    /* #region  Daily Quest announce command */
    if (command === "dq") {

        if (!message.member.roles.cache.some(role => role.name === "DQ Announcer")) { console.log("missing role"); return; };

        message.channel.send("[Daily quest] alright let's start. Type `cancel` to cancel")
        message.channel.send(questions.q1).then(msg => {
            const filter1 = m => m.author.id === message.author.id
            msg.channel.awaitMessages(filter1, {
                time: 5 * 60000,
                max: 1
            }).then(messages => {
                let msg1 = messages.first().content
                if (msg1.toLowerCase() === cancelInput) return message.channel.send("Ok, I have cancelled this process")
                message.channel.send(questions.q2).then(msg => {
                    const filter1 = m => m.author.id === message.author.id
                    msg.channel.awaitMessages(filter1, {
                        time: 5 * 60000,
                        max: 1
                    }).then(messages => {
                        let msg2 = messages.first().content
                        if (msg2.toLowerCase() === cancelInput) return message.channel.send("Ok, I have cancelled this process")
                        message.channel.send(questions.q3).then(msg => {
                            const filter1 = m => m.author.id === message.author.id
                            msg.channel.awaitMessages(filter1, {
                                time: 5 * 60000,
                                max: 1
                            }).then(messages => {
                                let msg3 = messages.first().content
                                if (msg3.toLowerCase() === cancelInput) return message.channel.send("Ok, I have cancelled this process")
                                message.channel.send(questions.q4).then(msg => {
                                    const filter1 = m => m.author.id === message.author.id
                                    msg.channel.awaitMessages(filter1, {
                                        time: 5 * 60000,
                                        max: 1
                                    }).then(messages => {
                                        let msg4 = messages.first().content
                                        if (msg4.toLowerCase() === cancelInput) return message.channel.send("Ok, I have cancelled this process")
                                        message.channel.send(questions.q5).then(msg => {
                                            const filter1 = m => m.author.id === message.author.id
                                            msg.channel.awaitMessages(filter1, {
                                                time: 5 * 60000,
                                                max: 1
                                            }).then(messages => {
                                                let msg5 = messages.first().content
                                                if (msg5.toLowerCase() === cancelInput) return message.channel.send("Ok, I have cancelled this process")
                                                message.channel.send(questions.q6).then(msg => {
                                                    const filter1 = m => m.author.id === message.author.id
                                                    msg.channel.awaitMessages(filter1, {
                                                        time: 5 * 60000,
                                                        max: 1
                                                    }).then(messages => {
                                                        let msg6 = messages.first().content
                                                        if (msg6.toLowerCase() === cancelInput) return message.channel.send("Ok, I have cancelled this process")
                                                        message.channel.send("Daily quest posted! thanks for contributing").then(msg => {
                                                            prc1 = parseInt(msg3, 10);
                                                            prc2 = parseInt(msg4, 10);
                                                            const estprice = prc1 + prc2;
                                                            const User = client.users.cache.get(message.author.id);
                                                            RiseDrop = ""
                                                            roleDay = ""
                                                            price1 = ""
                                                            price2 = ""
                                                            turnout = ""
                                                            risedropInput = msg5.toLowerCase();
                                                            roledayInput = msg6.toLowerCase();

                                                            //turnout presets
                                                            if (risedropInput == "rising") {
                                                                RiseDrop = "<:ExcellentGT:1035604258650869931> slowly Rising"
                                                            }

                                                            else if (risedropInput == "dropping") {
                                                                RiseDrop = "<:Very_poor:1035604418403516446> slowly Dropping"
                                                            }

                                                            else if (risedropInput == "stable") {
                                                                RiseDrop = ":bar_chart: Stable"
                                                            }

                                                            else {
                                                                RiseDrop = "<:AverageGT:1035611586578104320> unsure"
                                                            }

                                                            if (risedropInput == "dropping") {
                                                                turnout = "<:ExcellentGT:1035604258650869931> High Turnout"
                                                            }

                                                            else if (risedropInput == "rising") {
                                                                turnout = "<:Very_poor:1035604418403516446>  Low Turnout"
                                                            }

                                                            else {
                                                                turnout = "<:AverageGT:1035611586578104320> Medium Turnout"
                                                            }

                                                            //roleday presets
                                                            if (roledayInput == "surgery" || roledayInput == "surg" || roledayInput == "surgeon") {
                                                                roleDay = "<:gtsurgeon:1035869861630464000> Surgery"
                                                            }

                                                            else if (roledayInput == "builder") {
                                                                roleDay = "<:builder:1035870019772493884> Builder"
                                                            }

                                                            else if (roledayInput == "farmer") {
                                                                roleDay = "<:farmer:1035870186106011659> Farmer"
                                                            }

                                                            else if (roledayInput == "cooking" || roledayInput == "chef") {
                                                                roleDay = "<:Chef:1038402969319776328> Chef"
                                                            }

                                                            else if (roledayInput == "fish" || roledayInput == "fishing") {
                                                                roleDay = "<:fishing:1036258778527584296> Fishing"
                                                            }

                                                            else if (roledayInput == "star" || roledayInput == "startopia") {
                                                                roleDay = "<:Star:1038402967725953074> Startopia"
                                                            }

                                                            else if (roledayInput == "jack" || roledayInput == "joat" || roledayInput == "jack of all trades") {
                                                                roleDay = "<:joat:1035871083296989324> Jack of all trades!"
                                                            }

                                                            else {
                                                                roleDay = "<:joat:1035871083296989324> Jack of all trades!"
                                                            }

                                                            if (msg3 == "1") {
                                                                price1 = "World lock"
                                                            }

                                                            else {
                                                                price1 = "World locks"

                                                            }

                                                            if (msg4 == "1") {
                                                                price2 = "World lock"
                                                            }

                                                            else {
                                                                price2 = "World locks"
                                                            }

                                                            forbiddenWords = ["seed", "seeds", "Seed", "Seeds"];

                                                            const linkitem1 = msg1.split(' ').slice(1).join(' ');

                                                            if (toString(linkitem1).toLowerCase().includes(forbiddenWords)) {
                                                                linkitem1 = toString(linkitem1).replace(forbiddenWords, "")
                                                            }

                                                            const linkitem2 = msg2.split(' ').slice(1).join(' ');

                                                            if (toString(linkitem2).toLowerCase().includes(forbiddenWords)) {
                                                                linkitem2 = toString(linkitem2).replace(forbiddenWords, "")
                                                            }

                                                            const itemLink1 = `https://growtopia.fandom.com/wiki/${linkitem1}`
                                                            itemLink1.replace(" ", "_")
                                                            const itemLink2 = `https://growtopia.fandom.com/wiki/${linkitem2}`
                                                            itemLink2.replace(" ", "_")

                                                            console.log(`[IE_LOG] DQ POST DETECTED\nExecuter = ${User.tag} \nDaily quest = ${msg1} & ${msg2}\nDate = ${currentdate.toLocaleDateString()} at ${currentdate.toLocaleTimeString()}\n`)
                                                            message.client.channels.cache.get(config.auditLog).send(`DQ POST GENERATED\nExecuter = ${User.tag} \nDaily quest = ${msg1} & ${msg2}\nDate = ${currentdate.toLocaleDateString()} at ${currentdate.toLocaleTimeString()}\n`)

                                                            message.client.channels.cache.get(config.dqChannel).send(
                                                                new Discord.MessageEmbed()
                                                                    .setColor("#2f3136")
                                                                    .setAuthor('Daily Quest announcement | click here to report a problem', 'https://cdn.discordapp.com/emojis/994348750900301865.webp?size=44&quality=lossless', 'https://ptb.discord.com/channels/571992648190263317/994294684874715146/1001014705655124039')
                                                                    .setDescription(`<:warning1:1038446317795549186> **WARNING**: Check the names of the items you'll be exchanging your wls for; it's a **Common Scam** to buy items or blocks that are the same color as the DQ requirement but have different names.\n<:warning1:1038446317795549186> so kindly check your trades before accepting.\n** **`)
                                                                    .addField("<:Info:1035902879099269210> Today daily quest is:", "**" + `[${msg1}](${itemLink1.replace(" ", "_").replace(`Seed`, "").replace(`Seeds`, "").replace(`seed`, "").replace(`seeds`, "")})` + "**" + " For **" + msg3 + "** " + price1 + "\n" + "**" + `[${msg2}](${itemLink2.replace(" ", "_").replace(`Seed`, "").replace(`Seeds`, "").replace(`seed`, "").replace(`seeds`, "")})` + "**" + " for **" + msg4 + "** " + price2, true)
                                                                    .addField("<:Info:1035902879099269210> Today\s Date:", `<t:${Math.floor(Date.now() / 1000)}:D>`, true)
                                                                    .addField("<:Info:1035902879099269210> Estimated final price", + estprice.toString() + " <:WL:1035605013222924288>", true)
                                                                    .addField("<:Info:1035902879099269210> Price prediction", RiseDrop, true)
                                                                    .addField("<:Info:1035902879099269210> Turnout", turnout, true)
                                                                    .addField("<:Info:1035902879099269210> Role Day", roleDay, true)
                                                                    .addField("** **", "<:arrowsign:1038447420297728040> Make sure to check the channel: <#1037218161738657803>\n<:arrowsign:1038447420297728040> The price of daily quests items are subject to change based on demand\n<:growlectables:1038448855466909777> Remember to consume Growlectables, which gives: 25% chance of double <:Gtoken:1038449359727099965>")
                                                                    .addField("<:increase:1038447422923341924> Source:", "<:correct:1038447421606350909> BUYDQ, BUYDAILYQUEST")
                                                                    .setTimestamp()
                                                                    .setFooter(`The Lost Nemo! | To submit your Daily Quest, dial 12345 using a telephone. | generated by ${message.author.tag}`, "https://cdn.discordapp.com/attachments/986677752314859526/999490400832204800/jackofalltrades.png")
                                                            ).then(embedMsg => {
                                                                embedMsg.crosspost().then(
                                                                    embedMsg.react('<:Very_poor:1035604418403516446>').then(
                                                                        embedMsg.react('<:PoorGT:1038826285591429162>').then(
                                                                            embedMsg.react('<:AverageGT:1035611586578104320>').then(
                                                                                embedMsg.react('<:Good_GT:1038826351156809808>').then(
                                                                                    embedMsg.react('<:ExcellentGT:1035604258650869931>')
                                                                                )
                                                                            )
                                                                        )
                                                                    )
                                                                )
                                                            })

                                                            if (estprice <= 15) {
                                                                message.client.channels.cache.get(config.dqChannel).send(
                                                                    `[ <@&1038417779646279751> ]\ntoday's daily quest is only **${estprice.toString()}** <:WL:1035605013222924288>!\n🔹 If you desire to be pinged for Future Cheap Daily-Quests, go to <#1036129152455159812> and react to the <@&975119737304522803> role to get notified of all future <:ExcellentGT:1035604258650869931> High Turnout DQ.\nℹ️ Make sure to get your daily-quest items from <#1036129152455159812> as well.\nHave a wonderful day.`
                                                                )
                                                            }
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    }
    /* #endregion */

    /* #region  COTD announce command */
    if (command === "cotd") {

        if (!message.member.roles.cache.some(role => role.name === "COTD Announcer")) { console.log("missing role"); return; };

        message.channel.send("[COTD] alright let's start. Type `cancel` to cancel")
        message.channel.send(cotdquestions.q1).then(msg => {
            const filter1 = m => m.author.id === message.author.id
            msg.channel.awaitMessages(filter1, {
                time: 5 * 60000,
                max: 1
            }).then(messages => {
                let msg1 = messages.first().content
                if (msg1.toLowerCase() === cancelInput) return message.channel.send("Ok, I have cancelled this process")
                message.channel.send(cotdquestions.q2).then(msg => {
                    const filter1 = m => m.author.id === message.author.id
                    msg.channel.awaitMessages(filter1, {
                        time: 5 * 60000,
                        max: 1
                    }).then(messages => {
                        let msg2 = messages.first().content
                        if (msg2.toLowerCase() === cancelInput) return message.channel.send("Ok, I have cancelled this process")
                        message.channel.send(cotdquestions.q3).then(msg => {
                            const filter1 = m => m.author.id === message.author.id
                            msg.channel.awaitMessages(filter1, {
                                time: 5 * 60000,
                                max: 1
                            }).then(messages => {
                                let msg3 = messages.first().content
                                if (msg3.toLowerCase() === cancelInput) return message.channel.send("Ok, I have cancelled this process")
                                message.channel.send(cotdquestions.q4).then(msg => {
                                    const filter1 = m => m.author.id === message.author.id
                                    msg.channel.awaitMessages(filter1, {
                                        time: 5 * 60000,
                                        max: 1
                                    }).then(messages => {
                                        let msg4 = messages.first().content
                                        if (msg4.toLowerCase() === cancelInput) return message.channel.send("Ok, I have cancelled this process")
                                        message.channel.send(cotdquestions.q5).then(msg => {
                                            const filter1 = m => m.author.id === message.author.id
                                            msg.channel.awaitMessages(filter1, {
                                                time: 5 * 60000,
                                                max: 1
                                            }).then(messages => {
                                                let msg5 = messages.first().content
                                                if (msg5.toLowerCase() === cancelInput) return message.channel.send("Ok, I have cancelled this process")
                                                message.channel.send("Catch of the day posted! thanks for contributing").then(msg => {
                                                    const estprice = parseInt(msg3) + parseInt(msg4);
                                                    const User = client.users.cache.get(message.author.id);
                                                    RiseDrop = ""
                                                    todaysFish = ""

                                                    //turnouts preset
                                                    if (msg5 == "high") {
                                                        RiseDrop = "<:ExcellentGT:1035604258650869931> high turnout"
                                                    }
                                                    else if (msg5 == "low") {
                                                        RiseDrop = "<:Very_poor:1035604418403516446> low turnout"
                                                    }
                                                    else {
                                                        RiseDrop = "<:AverageGT:1035611586578104320> unsure turnout"
                                                    }

                                                    Trainable = ""
                                                    if (msg2 == "yes") {
                                                        Trainable = "<:Trainingport:1035821307914362940> Trainable"
                                                    }
                                                    else if (msg2 == "no") {
                                                        Trainable = "<:Untrainable:1035822603031556137> Not Trainable"
                                                    }
                                                    else {
                                                        Trainable = "<:AverageGT:1035611586578104320> unsure"
                                                    }


                                                    fishInput = msg1.toLowerCase();
                                                    fishLink = ""
                                                    fishBaits = ""

                                                    //fish presets
                                                    if (fishInput == "bass") {
                                                        todaysFish = "<:Bass:1035859714774405121> Bass";
                                                        fishLink = "https://growtopia.fandom.com/wiki/Bass";
                                                        fishBaits = "<:Shinyflashything:1036315367779340403> <:Wigglyworm:1036315422208823297> <:Salmonegg:1036315383289872494> <:Fishingfly:1036315514231853137> <:Whizmogizmo:1036317202678304848>";
                                                    }

                                                    else if (fishInput == "sunfish") {
                                                        todaysFish = "<:Sunfish:1035859843162062908> Sunfish";
                                                        fishLink = "https://growtopia.fandom.com/wiki/Sunfish";
                                                        fishBaits = "<:Shinyflashything:1036315367779340403> <:Fishingfly:1036315514231853137> <:Shrimplure:1036315402977947738>";
                                                    }

                                                    else if (fishInput == "whale") {
                                                        todaysFish = "<:GTWhale:1036357304632746064> Whale";
                                                        fishLink = "https://growtopia.fandom.com/wiki/Whale";
                                                        fishBaits = "<:Shrimplure:1036315402977947738> <:Whizmogizmo:1036317202678304848>";
                                                    }

                                                    else if (fishInput == "gar") {
                                                        todaysFish = "<:Gar:1035860204241297408> Gar";
                                                        fishLink = "https://growtopia.fandom.com/wiki/Gar";
                                                        fishBaits = "<:Salmonegg:1036315383289872494> <:Fishingfly:1036315514231853137> <:Shrimplure:1036315402977947738> <:Whizmogizmo:1036317202678304848>";
                                                    }

                                                    else if (fishInput == "mahi mahi" || fishInput == "mahi" || fishInput == "mahimahi") {
                                                        todaysFish = "<:Mahimahi:1035862077581045840> Mahi Mahi";
                                                        fishLink = "https://growtopia.fandom.com/wiki/Mahi_Mahi";
                                                        fishBaits = "<:Wigglyworm:1036315422208823297> <:Shrimplure:1036315402977947738> <:Whizmogizmo:1036317202678304848>";
                                                    }

                                                    else if (fishInput == "catfish") {
                                                        todaysFish = "<:Catfish:1038464731062730772> Catfish";
                                                        fishLink = "https://growtopia.fandom.com/wiki/Catfish";
                                                        fishBaits = "<:Wigglyworm:1036315422208823297> <:Shrimplure:1036315402977947738> <:Whizmogizmo:1036317202678304848>";
                                                    }

                                                    else if (fishInput == "orca") {
                                                        todaysFish = "<:Orca:1038489431532912671> Orca";
                                                        fishLink = "https://growtopia.fandom.com/wiki/Orca";
                                                        fishBaits = "<:cotd:1036315453787734056>";
                                                    }

                                                    else if (fishInput == "seahorse") {
                                                        todaysFish = "<:Seahorse:1038934746346049547> Seahorse";
                                                        fishLink = "https://growtopia.fandom.com/wiki/Seahorse";
                                                        fishBaits = "<:cotd:1036315453787734056>";
                                                    }

                                                    else if (fishInput == "koifish") {
                                                        todaysFish = "<:Koifish:1038937548371796119> Koifish";
                                                        fishLink = "https://growtopia.fandom.com/wiki/Koifish";
                                                        fishBaits = "<:cotd:1036315453787734056>";
                                                    }

                                                    else if (fishInput == "firefin") {
                                                        todaysFish = "<:Firefin:1038935296110243941> Firefin";
                                                        fishLink = "https://growtopia.fandom.com/wiki/Firefin";
                                                        fishBaits = "<:cotd:1036315453787734056>";
                                                    }

                                                    else if (fishInput == "pineapple" || fishInput == "pinefish" || fishInput == "pineapple fish") {
                                                        todaysFish = "<:Pinefish:1038936470846713936> Pineapple Fish";
                                                        fishLink = "https://growtopia.fandom.com/wiki/Pineapple_Fish";
                                                        fishBaits = "<:cotd:1036315453787734056>";
                                                    }

                                                    else if (fishInput == "triggerfish" || fishInput == "picasso") {
                                                        todaysFish = "<:Triggerfish:1038934773420273795> Picasso Triggerfish";
                                                        fishLink = "https://growtopia.fandom.com/wiki/Picasso_Triggerfish";
                                                        fishBaits = "<:cotd:1036315453787734056>";
                                                    }

                                                    else if (fishInput == "mutant fish" || fishInput === "mutant" || fishInput === "mutantfish") {
                                                        todaysFish = "<:Mutantfish:1038489452621877308> Mutant Fish";
                                                        fishLink = "https://growtopia.fandom.com/wiki/Mutant_Fish";
                                                        fishBaits = "<:cotd:1036315453787734056>";
                                                    }

                                                    else if (fishInput == "goldfish") {
                                                        todaysFish = "<:Goldfish:1036356801190436914> Goldfish";
                                                        fishLink = "https://growtopia.fandom.com/wiki/Goldfish";
                                                        fishBaits = "<:Shinyflashything:1036315367779340403> <:Wigglyworm:1036315422208823297> <:Whizmogizmo:1036317202678304848>";
                                                    }

                                                    else if (fishInput == "dogfish") {
                                                        todaysFish = "<:Dogfish:1035862356657442878> Dogfish";
                                                        fishLink = "https://growtopia.fandom.com/wiki/Dogfish";
                                                        fishBaits = "<:Salmonegg:1036315383289872494> <:Fishingfly:1036315514231853137> <:Whizmogizmo:1036317202678304848>";
                                                    }

                                                    //defaults
                                                    else {
                                                        todaysFish = msg1;
                                                        fishLink = "https://growtopia.fandom.com/wiki/Fishes";
                                                        fishBaits = "<:cotd:1036315453787734056>";
                                                    }

                                                    console.log(`[IE_LOG] COTD POST DETECTED\nExecuter = ${User.tag} \nFish = ${fishInput}\nDate = ${currentdate.toLocaleDateString()} at ${currentdate.toLocaleTimeString()}\n`)
                                                    message.client.channels.cache.get(config.auditLog).send(`COTD POST GENERATED\nExecuter = ${User.tag} \nFish = ${fishInput}\nDate = ${currentdate.toLocaleDateString()} at ${currentdate.toLocaleTimeString()}\n`)

                                                    message.client.channels.cache.get(config.cotdChannel).send(
                                                        new Discord.MessageEmbed()
                                                            .setColor("#2f3136")
                                                            .setAuthor('CATCH-OF-THE-DAY ANNOUNCEMENTS! | click here to report a problem', 'https://cdn.discordapp.com/attachments/986649997128904775/1035866110983151636/1035817530972975167.webp', 'https://ptb.discord.com/channels/571992648190263317/994294684874715146/1001014705655124039')
                                                            .setURL('https://ptb.discord.com/channels/571992648190263317/994294684874715146/1001014705655124039')
                                                            .setDescription(``)
                                                            .addField("<:Info:1035902879099269210> Today\s COTD is:", `[${todaysFish}](${fishLink})`, true)
                                                            .addField("<:Info:1035902879099269210> Today\s Date:", `<t:${Math.floor(Date.now() / 1000)}:D>`, true)
                                                            .addField("<:Info:1035902879099269210> Estimated Fish Price:", `Normal lb for ${msg4} / <:WL:1035605013222924288>\nPerfect lb for ${msg3} / <:WL:1035605013222924288>`, true)
                                                            .addField("<:Info:1035902879099269210> Obtainable With", fishBaits, true)
                                                            .addField(`<:Info:1035902879099269210> Status Of Fish`, `${Trainable}`, true)
                                                            .addField("<:Info:1035902879099269210> Rate Of Demand", RiseDrop, true)
                                                            .addField("<a:bell:1036284896253063198> Important Subjects:", `[**Fishes info**](https://growtopia.fandom.com/wiki/Fishes) | [**Fishing Rods guideline**](https://growtopia.fandom.com/wiki/Guide:Fishing/Fishing_Rods) | [**Fish Nutrition**](https://growtopia.fandom.com/wiki/Guide:Fish_Training)`, true)
                                                            .setTimestamp()
                                                            .setFooter(`The price of fish is subject to change based on demand | generated by ${User.tag}`, "https://cdn.discordapp.com/emojis/1036258778527584296.webp?size=96&quality=lossless")
                                                    ).then(cotdEmbed => {
                                                        cotdEmbed.crosspost();
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    }
    /* #endregion */

    /* #region  ping command */
    if (command === "ping") {
        message.channel.send(`pong!\nClient latency is: ${Date.now() - message.createdTimestamp}ms\nAPI latency is: ${Math.round(client.ws.ping)}ms`);
    }
    /* #endregion */

    /* #region  gt details command */
    if (command === "gtdetails") {
        gt.getDetail().then(e => {
            const detailEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setAuthor('Growtopia Server details', 'https://cdn.discordapp.com/attachments/844794142248402964/1038087094666535042/691380522651353140.webp', `${e.worldOfDay.renderURL}`)
                .addField(`Players online:`, `${e.onlineUsersCount}`)
                .addField(`<:gtWotd:1038086851803762738> Today's World Of The Day: **${e.worldOfDay.worldName}**`, `** **`)
                .setImage(`https://s3.amazonaws.com/world.growtopiagame.com/${(e.worldOfDay.worldName).toLowerCase()}`)
                .setFooter('Powered by ${IE.version}')
                .setTimestamp()

            message.channel.send(detailEmbed);
        })
    }
    /* #endregion */

    /* #region  render growtopia world command */
    if (command === "render") {
        world = message.content.split(' ').slice(1).join(' ');

        if (!world) {
            message.channel.send('Please enter a world name')
            return;
        }

        gt.getDetail().then(e => {

            message.channel.send(`World render of ${world.toUpperCase()}`).then(message.channel.send(`https://s3.amazonaws.com/world.growtopiagame.com/${world.toLowerCase()}.png`));
        })
    }
    /* #endregion */

    /* #region  event announcer command */
    if (command === "event") {

        if (!message.member.roles.cache.some(role => role.name === "DQ Announcer")) { console.log("missing role"); return; };

        eventInput = message.content.split(' ').slice(1).join(' ').toLowerCase();

        if (!eventInput) {
            message.channel.send('Please specify an event. here\'s a list of possible events:\n\`\`\`\nlocke,\ncomet,\ncarnival,\ntournament,\ngeiger,\nsurgery,\nhowl,\nghost,\nmutant,\npandemic,\nvoucher\`\`\`');
        }

        /* #region  embed presets */
        if (eventInput == "locke") {
            message.client.channels.cache.get(config.cotdChannel).send(
                new Discord.MessageEmbed()
                    .setColor('#2f3136')
                    .setAuthor('The travelin salesman is here', 'https://images-ext-2.discordapp.net/external/sjYlB3zBRd51UfOoLsvcgmU_28eiqJhZKZ6dK72vsW0/https/i.imgur.com/6Npk2XT.png')
                    .setDescription('Every 10 minutes Locke visits a different Growtopia world! If you can figure out where he is, go visit him to purchase some cool items! You can also ask Locke questions about any items in Growtopia.')
                    .setFooter('This event lasts for 1 day!', 'https://cdn.discordapp.com/emojis/781317514944053268.webp?size=96&quality=lossless')
                    .setTimestamp()

            ).then(eventEmbed => {
                eventEmbed.crosspost();
            })
        }

        else if (eventInput == "comet") {
            message.client.channels.cache.get(config.cotdChannel).send(
                new Discord.MessageEmbed()
                    .setColor('#2f3136')
                    .setAuthor('It\'s night of the comet', 'https://images-ext-1.discordapp.net/external/yo9RcA7UVh9b1beWqK6JWn2WOb5t0Rd_DkDe8o05mm4/https/i.imgur.com/SdF52CV.png')
                    .setDescription('What\'s that in the sky?? A Comet is blazing a trail through the night! It will only be here for 24 hours...')
                    .setFooter('This event lasts for 1 day!', 'https://images-ext-1.discordapp.net/external/jF50KiRtj-TyXizAACeTPkPa8BfWD-ZChkdevjO7EqM/https/i.imgur.com/XBGLbHd.png')
                    .setTimestamp()

            ).then(eventEmbed => {
                eventEmbed.crosspost();
            })
        }

        else if (eventInput == "carnival") {
            message.client.channels.cache.get(config.cotdChannel).send(
                new Discord.MessageEmbed()
                    .setColor('#2f3136')
                    .setAuthor('The carnival has arrived!', 'https://cdn.discordapp.com/emojis/603228426534649857.gif?size=96&quality=lossless')
                    .setDescription(`Visit the world CARNIVAL! try your luck at winning one of the ringmasters fabulous rings, or play some fun games to win some exclusive Carnival items!\nThis event will last through <t:${Math.floor(Date.now() / 1000)}:D> to <t:${Math.floor((Date.now() / 1000) + 259200)}:D>`)
                    .setFooter('This event lasts for 3 days!', 'https://cdn.discordapp.com/attachments/844794142248402964/1038385854151929946/unknown.png')
                    .setTimestamp()

            ).then(eventEmbed => {
                eventEmbed.crosspost();
            })
        }

        else if (eventInput == "tournament") {
            message.client.channels.cache.get(config.cotdChannel).send(
                new Discord.MessageEmbed()
                    .setColor('#2f3136')
                    .setAuthor('The grand tournament is here!', 'https://static.wikia.nocookie.net/growtopia/images/8/8f/ItemSprites.png/revision/latest/window-crop/width/32/x-offset/1280/y-offset/704/window-width/32/window-height/32?format=webp&fill=cb-20221101121159')
                    .setDescription(`The Grand Tournament has come to Growtopia! This pet battle tournament runs for 5 days, on the 7th of every month. Head to the world TOURNAMENT now, to buy your tickets before it begins!\nThis event will last through <t:${Math.floor(Date.now() / 1000)}:D> to <t:${Math.floor((Date.now() / 1000) + 432000)}:D>`)
                    .setFooter('This event lasts for 5 days!', 'https://static.wikia.nocookie.net/growtopia/images/8/8f/ItemSprites.png/revision/latest/window-crop/width/32/x-offset/832/y-offset/576/window-width/32/window-height/32?format=webp&fill=cb-20221101121159')
                    .setTimestamp()
            ).then(eventEmbed => {
                eventEmbed.crosspost();
            })
        }

        else if (eventInput == "geiger") {
            message.client.channels.cache.get(config.cotdChannel).send(
                new Discord.MessageEmbed()
                    .setColor('#2f3136')
                    .setAuthor('It\'s geiger day!', 'https://static.wikia.nocookie.net/growtopia/images/8/8f/ItemSprites.png/revision/latest/window-crop/width/32/x-offset/1472/y-offset/2112/window-width/32/window-height/32?format=webp&fill=cb-20221101121159')
                    .setDescription(`During this day, Geiger Counters take 15 minutes to charge. Moreover, the *Irradiated* mod will also last for 15 minutes only. this day also offers a variety of exclusive drops!`)
                    .setFooter('This event lasts for 1 day!')
                    .setTimestamp()

            ).then(eventEmbed => {
                eventEmbed.crosspost();
            })
        }

        else if (eventInput == "surgery") {
            message.client.channels.cache.get(config.cotdChannel).send(
                new Discord.MessageEmbed()
                    .setColor('#2f3136')
                    .setAuthor('It\'s surgery day!', 'https://static.wikia.nocookie.net/growtopia/images/8/8f/ItemSprites.png/revision/latest/window-crop/width/32/x-offset/928/y-offset/2880/window-width/32/window-height/32?format=webp&fill=cb-20221101121159')
                    .setDescription(`During this day, Malpractice takes 15 minutes and Recovering takes 1 hour. When doing Surgery on Surgery Day, one can find a variety of exclusive drops!`)
                    .setFooter('This event lasts for 1 day!', 'https://static.wikia.nocookie.net/growtopia/images/8/8f/ItemSprites.png/revision/latest/window-crop/width/32/x-offset/224/y-offset/288/window-width/32/window-height/32?format=webp&fill=cb-20221101121159')
                    .setTimestamp()

            ).then(eventEmbed => {
                eventEmbed.crosspost();
            })
        }

        else if (eventInput == "howl") {
            message.client.channels.cache.get(config.cotdChannel).send(
                new Discord.MessageEmbed()
                    .setColor('#2f3136')
                    .setAuthor('All Howl\'s Eve has arrived!', 'https://i.imgur.com/npCECBd.png')
                    .setDescription(`For the brave souls who have completed the Trials of Fenrir, opportunity arises to obtain the greatest prizes in the depths of Valhowla! Be quick as you only have a limited time to complete it!`)
                    .setFooter('This event lasts for 1 day!', 'https://static.wikia.nocookie.net/growtopia/images/8/8f/ItemSprites.png/revision/latest/window-crop/width/32/x-offset/2016/y-offset/32/window-width/32/window-height/32?format=webp&fill=cb-20221101121159')
                    .setTimestamp()

            ).then(eventEmbed => {
                eventEmbed.crosspost();
            })
        }

        else if (eventInput == "ghost") {
            message.client.channels.cache.get(config.cotdChannel).send(
                new Discord.MessageEmbed()
                    .setColor('#2f3136')
                    .setAuthor('GhoOOooOst Day', 'https://cdn.discordapp.com/attachments/986649997128904775/1038536920868860055/bossghost.png')
                    .setDescription(`Boss Ghosts are haunting the abandoned worlds of Growtopia! Go find them and beat them!`)
                    .setFooter('This event lasts for 1 day!', 'https://images-ext-2.discordapp.net/external/MPYvfJ9YPhB1wAb5NzbEo0SVBUh514W19QrRh72M6-M/https/i.imgur.com/o1tUyA7.png')
                    .setTimestamp()

            ).then(eventEmbed => {
                eventEmbed.crosspost();
            })
        }

        else if (eventInput == "mutant") {
            message.client.channels.cache.get(config.cotdChannel).send(
                new Discord.MessageEmbed()
                    .setColor('#2f3136')
                    .setAuthor('It\'s the mutant kitcken!', 'https://static.wikia.nocookie.net/growtopia/images/8/8f/ItemSprites.png/revision/latest/window-crop/width/32/x-offset/320/y-offset/3008/window-width/32/window-height/32?format=webp&fill=cb-20221101121159')
                    .setDescription(`Cook disgusting food with mutant mixers, eat a handful to explode in grossness and obtain disgusting items!\nThis event will last through <t:${Math.floor(Date.now() / 1000)}:D> to <t:${Math.floor((Date.now() / 1000) + 259200)}:D>`)
                    .setFooter('This event lasts for 3 day!', 'https://static.wikia.nocookie.net/growtopia/images/8/8f/ItemSprites.png/revision/latest/window-crop/width/32/x-offset/1472/y-offset/2400/window-width/32/window-height/32?format=webp&fill=cb-20221101121159')
                    .setTimestamp()

            ).then(eventEmbed => {
                eventEmbed.crosspost();
            })
        }

        else if (eventInput == "pandemic") {
            message.client.channels.cache.get(config.cotdChannel).send(
                new Discord.MessageEmbed()
                    .setColor('#2f3136')
                    .setAuthor('The grow-virus pandemic has fallen upon us!', 'https://static.wikia.nocookie.net/growtopia/images/8/8f/ItemSprites.png/revision/latest/window-crop/width/32/x-offset/1248/y-offset/2976/window-width/32/window-height/32?format=webp&fill=cb-20221101121159')
                    .setDescription(`Zombies are roaming Growtopia! Zombies can now be killed using various weapons, and must infect Growtopia to win! Players can also perform Chemsynth in order to prevent the Zombies from winning.`)
                    .setFooter('Check a G-Virus info sign for pendimic stats', 'https://static.wikia.nocookie.net/growtopia/images/8/8f/ItemSprites.png/revision/latest/window-crop/width/32/x-offset/704/y-offset/1664/window-width/32/window-height/32?format=webp&fill=cb-20221101121159')
                    .setTimestamp()

            ).then(eventEmbed => {
                eventEmbed.crosspost();
            })
        }

        else if (eventInput == "voucher") {
            message.client.channels.cache.get(config.cotdChannel).send(
                new Discord.MessageEmbed()
                    .setColor('#2f3136')
                    .setAuthor('It\'s Voucherz dayz!', 'https://static.wikia.nocookie.net/growtopia/images/8/8f/ItemSprites.png/revision/latest/window-crop/width/32/x-offset/128/y-offset/544/window-width/32/window-height/32?format=webp&fill=cb-20221101121159')
                    .setDescription(`We\'ve got some wow-cher days coming up this month! Voucher Dayz is an event where, when you purchase selected IAPs from the store, you earn vouchers to redeem special store packs and exclusive cosmetic items.\nThis event will last through <t:${Math.floor(Date.now() / 1000)}:D> to <t:${Math.floor((Date.now() / 1000) + 172800)}:D>`)
                    .setFooter('This event will last for 2 days!', 'https://static.wikia.nocookie.net/growtopia/images/8/8f/ItemSprites.png/revision/latest/window-crop/width/32/x-offset/480/y-offset/2720/window-width/32/window-height/32?format=webp&fill=cb-20221101121159')
                    .setTimestamp()

            ).then(eventEmbed => {
                eventEmbed.crosspost();
            })
        }

        else if (eventInput == "restart") {
            message.client.channels.cache.get(config.cotdChannel).send(
                new Discord.MessageEmbed()
                    .setColor('#73263a')
                    .setAuthor('Daily Quest reset', 'https://cdn.discordapp.com/emojis/691300583625326592.webp?size=96&quality=lossless')
                    .setDescription(`After today's latest server restart at [<t:${Math.floor(Date.now() / 1000)}:D>] the daily quest's items have changed, please check the latest daily quest announcement to view the new items.\nfor inquiries or to report any issue join https://discord.gg/thelostnemo and click [here](https://ptb.discord.com/channels/571992648190263317/994294684874715146/1001014705655124039)`)
                    .setFooter('The Lost Nemo\'s Daily quest team', 'https://media.discordapp.net/attachments/986677752314859526/999442036342145097/Growpedia.png?width=868&height=905')
                    .setTimestamp()

            ).then(eventEmbed => {
                eventEmbed.crosspost();
            })
        }

        else {
            message.channel.send(`This event is unavailable/Doesn't exist`)
        }
        /* #endregion */
    }
    /* #endregion */

    /* #region  servers command */
    if (command === 'servers') {
        if (message.author.id != config.owner) { return; }

        let serverlist = ''
        client.guilds.cache.forEach((guild) => {
            serverlist = serverlist.concat(" - " + guild.name + ": ID: " + `\`${guild.id}\`` + "\n")
        })

        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Servers list", '')
            .setDescription(serverlist)
        message.channel.send({ embed });

    }
    /* #endregion */

    /* #region  announce command */
    if (command === "announce" || command === "ann") {
        const annChannel = message.mentions.channels.first();
        const annMessage = message.content.split(' ').slice(2).join(' ');

        if (!message.member.roles.cache.some(role => role.name === "Moderator")) {
            console.log("missing role");
            return;
        };


        if (!args[1]) {
            message.channel.send(`Missing an argument: \`annChannel\`, please input a channl to send the message in\nsyntax: ${config.prefix}announce [channel] [message]`)
            return;
        }

        if (!args[2]) {
            message.channel.send(`Missing an argument: \`annMessage\`, please input a channl to send the message in\nsyntax: ${config.prefix}announce [channel] [message]`)
            return;
        }

        message.guild.channels.cache.find(t => t.id == annChannel.id).send(
            new Discord.MessageEmbed()
                .setColor('#3903fc')
                .setAuthor('Emergancy Announcement!', 'https://cdn.discordapp.com/emojis/691300583625326592.webp?size=96&quality=lossless')
                .setDescription(`${annMessage}`)
                .setFooter(`This announcement was sent by ${message.author.tag}`)
                .setTimestamp()
        )
        message.channel.send(`The message has been announced`);
    }

    if (command === "report" || command === "bug") {
        const reportMsg = message.content.split(' ').slice(1).join(' ');

        if (!args[1]) {
            message.channel.send(`Missing an argument: \`report message\`, please input a message to send to the bot's owner\nsyntax: ${config.prefix}report [message]`)
            return;
        }

        client.channels.cache.find(channel => channel.id === config.reportLog).send(
            new Discord.MessageEmbed()
                .setColor('#240101')
                .setAuthor(`New bug report`, 'https://cdn.discordapp.com/attachments/844794142248402964/1038866050705522688/unknown.png')
                .addField(`Report:`, `${reportMsg}`)
                .setFooter(`Reported by ${message.author.tag} from ${message.guild.name}`)
                .setTimestamp()
        )
        message.author.send(`Thank you for the report!`);
        message.delete();
    }
    /* #endregion */

    /* #region  prefix command */
    /*if(command === "prefix")
    {
        newPrefix = message.content.split(' ').slice(1).join(' ');

        if(!newPrefix)
        {
            message.channel.send(`my current prefix is \`${config.prefix}\``)
            return;
        }

        config.prefix = newPrefix;
        message.channel.send(`Successfully changed the prefix! new prefix is: \`${newPrefix}\``)
        fs.writeFile("utils/config.json", JSON.stringify(config.prefix), (err) =>{
            if(err)
            {
                console.log(err)
            }
        });
    }*/
    /* #endregion */

    /* #region  user info command */
    if (command === "userinfo") {
        const flags = {
            DISCORD_EMPLOYEE: 'Discord Employee',
            DISCORD_PARTNER: 'Discord Partner',
            BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
            BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
            HYPESQUAD_EVENTS: 'HypeSquad Events',
            HOUSE_BRAVERY: 'House of Bravery',
            HOUSE_BRILLIANCE: 'House of Brilliance',
            HOUSE_BALANCE: 'House of Balance',
            EARLY_SUPPORTER: 'Early Supporter',
            TEAM_USER: 'Team User',
            SYSTEM: 'System',
            VERIFIED_BOT: 'Verified Bot',
            VERIFIED_DEVELOPER: 'Verified Bot Developer'
        };

        const statuses = {
            playing: "playing",
            listening: "listening",
            watching: "watching",
            streaming: "streaming",
            custom_status: "custom status"
        }

        const embed = new Discord.MessageEmbed()
        const moment = require('moment');

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        if (!member)
            return message.channel.send('Please mention the user for the userinfo..');
        const userFlags = (await member.user.fetchFlags()).toArray();
        const activities = [];
        let customStatus;
        for (const activity of member.presence.activities.values()) {
            switch (activity.type) {
                case 'PLAYING':
                    activities.push(`Playing **${activity.name}**`);
                    break;
                case 'LISTENING':
                    if (member.user.bot) activities.push(`Listening to **${activity.name}**`);
                    else activities.push(`Listening to **${activity.details}** by **${activity.state}**`);
                    break;
                case 'WATCHING':
                    activities.push(`Watching **${activity.name}**`);
                    break;
                case 'STREAMING':
                    activities.push(`Streaming **${activity.name}**`);
                    break;
                case 'CUSTOM_STATUS':
                    customStatus = activity.state;
                    break;
            }
        }
        unixTSjs = Math.floor(new Date(member.joinedAt).getTime() / 1000);
        unixTSjd = Math.floor(new Date(member.user.createdAt).getTime() / 1000);
        const uiembed = new Discord.MessageEmbed()
            .setTitle(`${member.displayName}'s Information`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .addField('User', member, true)
            .addField('Discriminator', `\`#${member.user.discriminator}\``, true)
            .addField('ID', `\`${member.id}\``, true)
            .addField('Status', statuses[member.presence.status], true)
            .addField('Bot', `\`${member.user.bot}\``, true)
            .addField('Color Role', member.roles.color || '`None`', true)
            .addField('Highest Role', member.roles.highest, true)
            .addField('Joined server on', `<t:${unixTSjs}:D>\n<t:${unixTSjs}:R>`, true)
            .addField('Joined Discord on', `<t:${unixTSjd}:D>`, true)
            .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor(member.displayHexColor);
        if (activities.length > 0) uiembed.setDescription(activities.join('\n'));
        if (customStatus) uiembed.spliceFields(0, 0, { name: 'Custom Status', value: customStatus });
        if (userFlags.length > 0) uiembed.addField('Badges', userFlags.map(flag => flags[flag]).join('\n'));
        message.channel.send(uiembed);

    }
    /* #endregion */

    /* #region  Server info command */
    if (command === "serverinfo") {
        const { MessageEmbed } = require('discord.js');
        const moment = require('moment');

        const filterLevels = {
            DISABLED: 'Off',
            MEMBERS_WITHOUT_ROLES: 'No Role',
            ALL_MEMBERS: 'Everyone'
        };

        const verificationLevels = {
            NONE: 'None',
            LOW: 'Low',
            MEDIUM: 'Medium',
            HIGH: 'high',
            VERY_HIGH: 'very high'
        };

        const regions = {
            brazil: 'Brazil',
            europe: 'Europe',
            hongkong: 'Hong Kong',
            india: 'India',
            japan: 'Japan',
            russia: 'Russia',
            singapore: 'Singapore',
            southafrica: 'South Africa',
            sydeny: 'Sydeny',
            'us-central': 'US Central',
            'us-east': 'US East',
            'us-west': 'US West',
            'us-south': 'US South'
        };

        const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
        const members = message.guild.members.cache;
        const channels = message.guild.channels.cache;
        const emojis = message.guild.emojis.cache;
        unixTSjs = Math.floor(new Date(message.guild.createdTimestamp).getTime() / 1000);

        const embed = new MessageEmbed()
            .setDescription(`**Guild information for __${message.guild.name}__**`)
            .setColor('BLUE')
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .addField('General', [
                `**❯ Name:** ${message.guild.name}`,
                `**❯ ID:** \`${message.guild.id}\``,
                `**❯ Owner:** ${message.guild.owner.user.tag} (\`${message.guild.ownerID}\`)`,
                `**❯ Region:** ${regions[message.guild.region]}`,
                `**❯ Boost Tier:** ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}`,
                `**❯ Explicit Filter:** ${filterLevels[message.guild.explicitContentFilter]}`,
                `**❯ Verification Level:** ${verificationLevels[message.guild.verificationLevel]}`,
                `**❯ Time Created:** ${`<t:${unixTSjs}:D> <t:${unixTSjs}:R>`}`,
                '\u200b'
            ])
            .addField('Statistics', [
                `**❯ Role Count:** ${roles.length}`,
                `**❯ Emoji Count:** ${emojis.size}`,
                `**❯ Regular Emoji Count:** ${emojis.filter(emoji => !emoji.animated).size}`,
                `**❯ Animated Emoji Count:** ${emojis.filter(emoji => emoji.animated).size}`,
                `**❯ Member Count:** ${message.guild.memberCount}`,
                `**❯ Humans:** ${members.filter(member => !member.user.bot).size}`,
                `**❯ Bots:** ${members.filter(member => member.user.bot).size}`,
                `**❯ Text Channels:** ${channels.filter(channel => channel.type === 'text').size}`,
                `**❯ Voice Channels:** ${channels.filter(channel => channel.type === 'voice').size}`,
                `**❯ Boost Count:** ${message.guild.premiumSubscriptionCount || '0'}`,
                '\u200b'
            ])
            .addField('Presence', [
                `**❯ Online:** ${members.filter(member => member.presence.status === 'online').size}`,
                `**❯ Idle:** ${members.filter(member => member.presence.status === 'idle').size}`,
                `**❯ Do Not Disturb:** ${members.filter(member => member.presence.status === 'dnd').size}`,
                `**❯ Offline:** ${members.filter(member => member.presence.status === 'offline').size}`,
                '\u200b'
            ])
            //.addField(`Roles [${roles.length - 1}]`, roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'None')
            .setTimestamp();
        message.channel.send(embed);
    }
    /* #endregion */

    /* #region  help menu command */
    if (command === "help") {
        const helpEmbed = new Discord.MessageEmbed()
            .setAuthor(`${client.user.username}\'s help menu`, `${client.user.displayAvatarURL()}`)
            .setColor("#212121")
            .setDescription(`My prefix is ${config.prefix}`)
            .addField(`${config.prefix}gtdetails`, "Sends the amount of players online and today\'s WOTD\n> Category: 'Growtopia'")
            .addField(`${config.prefix}dq`, "Begin the daily quest announcement generator.\n> Category: 'Growtopia'\n> Required Role: <@&999121968823549962>")
            .addField(`${config.prefix}cotd`, "Begin the catch of the day announcement generator.\n> Category: 'Growtopia'\n> Required Role: <@&879756780513681428>")
            .addField(`${config.prefix}event`, `Sends an announcement regarding a daily event.\n> Category: 'Growtopia'\n> Required Role: <@&999121968823549962>\n> Required args: [1] \n> Syntax: ${config.prefix}event [event]`)
            .addField(`${config.prefix}announce`, `Send a custom announcement to a desired channel.\n> aliases: 'ann'\n> Category: 'Utility'\n> Required Role: <@&999121968823549962>\n> Required args: [2] \n> Syntax: ${config.prefix}announce [channel] [announcement]`)
            .addField(`${config.prefix}report`, `Report a bug to the bot's owner\n> aliases: 'bug'\n> Required args: [1] \n> Syntax: ${config.prefix}report [message]\n> Category: 'Utility'`)
            .addField(`${config.prefix}serverinfo`, "Shows some statistics about the current server\n> Category: 'Utility'")
            .addField(`${config.prefix}userinfo`, `Shows some statistics about a certain user\n> Optional args: [1]\n> Category: 'Utility'\n> Syntax: ${config.prefix}userinfo {user}`)
            .addField(`${config.prefix}ping`, "Pong!\n> Category: 'Utility'")
            .setTimestamp()
            .setFooter(`${client.user.username} | bot created by YakiKaki#2271 | page 1/1`, "https://media.discordapp.net/attachments/986649997128904775/1035815040437194782/Y.png");

        const ownerHelpEmbed = new Discord.MessageEmbed()
            .setAuthor(`${client.user.username}\'s help menu`, `${client.user.displayAvatarURL()}`)
            .setColor("#212121")
            .setDescription(`My prefix is ${config.prefix}`)
            .addField(`${config.prefix}gtdetails`, "Sends the amount of players online and today\'s WOTD\n> Category: 'Growtopia'")
            .addField(`${config.prefix}dq`, "Begin the daily quest announcement generator.\n> Category: 'Growtopia'\n> Required Role: <@&999121968823549962>")
            .addField(`${config.prefix}cotd`, "Begin the catch of the day announcement generator.\n> Category: 'Growtopia'\n> Required Role: <@&879756780513681428>")
            .addField(`${config.prefix}event`, `Sends an announcement regarding a daily event.\n> Category: 'Growtopia'\n> Required Role: <@&999121968823549962>\n> Required args: [1] \n> Syntax: ${config.prefix}event [event]`)
            .addField(`${config.prefix}announce`, `Send a custom announcement to a desired channel.\n> aliases: 'ann'\n> Category: 'Utility'\n> Required Role: <@&999121968823549962>\n> Required args: [2] \n> Syntax: ${config.prefix}announce [channel] [announcement]`)
            .addField(`${config.prefix}report`, `Report a bug to the bot's owner\n> aliases: 'bug'\n> Required args: [1] \n> Syntax: ${config.prefix}report [message]\n> Category: 'Utility'`)
            .addField(`${config.prefix}serverinfo`, "Shows some statistics about the current server\n> Category: 'Utility'")
            .addField(`${config.prefix}userinfo`, `Shows some statistics about a certain user\n> Optional args: [1]\n> Category: 'Utility'\n> Syntax: ${config.prefix}userinfo {user}`)
            .addField(`${config.prefix}ping`, "Pong!\n> Category: 'Utility'")
            .addField(`${config.prefix}servers`, "Sends a list of the servers the bot is in\n> Category: 'Utility'\n> Owner only = 'true'")
            .setTimestamp()
            .setFooter(`${client.user.username} | bot created by YakiKaki#2271 | page 1/1`, "https://media.discordapp.net/attachments/986649997128904775/1035815040437194782/Y.png");

        if (message.author.id == config.owner) {
            message.channel.send(ownerHelpEmbed);
        }

        else {
            message.channel.send(helpEmbed);
        }
    }

    /* #endregion */

    /* #region  reputation System */
    if (command === "rep" || command === "addrep") {
        let user = message.mentions.members.first();
        if (!user) {
            message.channel.send(`[ERROR] please mention a user to increase his rep`);
            return;
        }

        if (user.id === message.author.id) {
            message.reply(`You cannot add reputation to yourself!`);
            return;
        }
        if (!rep[user.id]) {
            rep[user.id] = {
                rep: 0
            };
        }
        rep[user.id].rep = rep[user.id].rep + 1;
        message.channel.send(`Successfuly added reputation to <@${user.id}>, they now have ${rep[user.id].rep} reputation points`)
        fs.writeFile("utils/reputation.json", JSON.stringify(rep), (err) => {
            if (err) {
                console.log(err)
            }
        });
    }

    if (command === "minusrep") {
        let user = message.mentions.members.first();
        if (!user) {
            message.channel.send(`[ERROR] please mention a user to lower his rep`);
            return;
        }
        if (!rep[user.id]) {
            rep[user.id] = {
                rep: 0
            };
        }

        if (user.id === message.author.id) {
            message.reply(`You cannot remove reputation to yourself!`);
            return;
        }

        rep[user.id].rep = rep[user.id].rep - 1;
        message.channel.send(`Successfuly removed reputation to <@${user.id}>, they now have ${rep[user.id].rep} reputation points`)
        fs.writeFile("utils/reputation.json", JSON.stringify(rep), (err) => {
            if (err) {
                console.log(err)
            }
        });
    }

    if (command === "resetrep") {
        if (message.author.id != config.owner) {
            return;
        }

        let user = message.mentions.members.first();
        if (!user) {
            message.channel.send(`[ERROR] please mention a user to reset his rep`);
            return;
        }
        if (!rep[user.id]) {
            rep[user.id] = {
                rep: 0
            };
        }

        if (user.id === message.author.id) {
            message.reply(`You cannot reset your own reputation`);
            return;
        }

        rep[user.id].rep = 0;
        message.channel.send(`Successfuly reset reputation of <@${user.id}>, they now have ${rep[user.id].rep} reputation points.`)
        fs.writeFile("utils/reputation.json", JSON.stringify(rep), (err) => {
            if (err) {
                console.log(err)
            }
        });
    }

    if (command === "reputation" || command === "showrep") {
        let user = message.mentions.members.first();

        if (!rep[message.author.id]) {
            rep[message.author.id] = {
                rep: 0
            };
        }

        if (!user) {
            message.channel.send(`You have ${rep[message.author.id].rep} reputation points!`)
            return;
        }

        if (!rep[user.id]) {
            rep[user.id] = {
                rep: 0
            };
        }
        message.channel.send(`${user.user.username} has ${rep[user.id].rep} reputation points!`)
        fs.writeFile("utils/reputation.json", JSON.stringify(rep), (err) => {
            if (err) {
                console.log(err)
            }
        });
    }
    /* #endregion */

    /* #region  economy system */
    if (command === "profile") {
        let user = message.mentions.members.first();

        if (!ec[message.author.id]) {
            ec[message.author.id] = {
                coins: 0,
                tokens: 0,
                title: "None",
                class: "Attack",
                level: 0,
                xp: 0
            };
        }

        if (!user) {
            const profileEmbed = new Discord.MessageEmbed()
                .setAuthor(`${message.author.username}'s Profile`)
                .addField("<:Y_Title:1040718260431241337> Title", `${ec[message.author.id].title}`)
                .addField("Economy", `Gems: ${ec[message.author.id].coins}\nTokens: ${ec[message.author.id].tokens}`)
                .addField("RPG", `<:Y_Class:1040718072077635744> Class: ${ec[message.author.id].class}\nlevel: ${ec[message.author.id].level}`)
                .setThumbnail(message.author.avatarURL(dynamic = true))
                .setTimestamp()
                .setFooter(`[Beta]`)
            message.channel.send(profileEmbed)

            fs.writeFile("utils/economy.json", JSON.stringify(ec), (err) => {
                if (err) {
                    console.log(err)
                }
            });
            return;
        }

        if (!ec[user.id]) {
            ec[user.id] = {
                coins: 0,
                tokens: 0,
                title: "None",
                class: "Attack",
                level: 0,
                xp: 0
            };
        }

        const profileEmbed = new Discord.MessageEmbed()
            .setAuthor(`${user.user.username}'s Profile`)
            .addField("<:Y_Title:1040718260431241337> Title", `${ec[user.id].title}`)
            .addField("Economy", `Gems: ${ec[user.id].coins}\nTokens: ${ec[user.id].tokens}`)
            .addField("RPG", `<:Y_Class:1040718072077635744> Class: ${ec[user.id].class}\nlevel: ${ec[user.id].level}`)
            .setThumbnail(user.user.avatarURL(dynamic = true))
            .setTimestamp()
            .setFooter(`[Beta]`)
        message.channel.send(profileEmbed)

        fs.writeFile("utils/economy.json", JSON.stringify(ec), (err) => {
            if (err) {
                console.log(err)
            }
        });


    }

    if (command === "daily") {
        let user = message.mentions.members.first();

        if (!ec[message.author.id]) {
            message.reply(`You do not have a profile yet! please use \`${config.prefix}profile\` to start your journey`)
        }

        function generateRandom(maxLimit = 300) {
            let rand = Math.random() * maxLimit;

            rand = Math.floor(rand);

            return rand;
        }

        newTokens = generateRandom();

        ec[message.author.id].coins = ec[message.author.id].coins + Math.round(newTokens);
        message.channel.send(`You claimed your daily reward of ${newTokens} tokens!`)

        fs.writeFile("utils/economy.json", JSON.stringify(ec), (err) => {
            if (err) {
                console.log(err)
            }
        });
    }

    if (command === "tokens") {
        let user = message.mentions.members.first();

        if (!user) {
            message.channel.send(`You currently have ${ec[message.author.id].coins} coins!`)
            return;
        }

        if (!ec[user.id]) {
            message.channel.send(`this user is not registered in the economy`)
            return;
        }

        message.channel.send(`${user.user.username} currently has ${ec[user.id].coins} coins!`);
    }
    /* #endregion */
})
/* #endregion */

/* #region Error handler */
process.on("unhandledRejection", (reason, p) => {
    console.log("[ERROR] unhandledRejection Caught successfully!, check error log for details");

    client.channels.cache.get(config.crashLog).send(`⚠️ ERROR CAUGHT ⚠️\n\`\`\`${reason}\n\n${p}\`\`\``)
});

process.on("uncaughtException", (err, origin) => {
    console.log("[ERROR] uncaughtException Caught successfully!, check error log for details");

    client.channels.cache.get(config.crashLog).send(`⚠️ ERROR CAUGHT ⚠️\n\`\`\`${err}\n\n${origin}\`\`\``)
});

process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.log("[ERROR] uncaughtException Caught successfully!, check error log for details (MONITOR)");

    client.channels.cache.get(config.crashLog).send(`⚠️ ERROR CAUGHT ⚠️\n\`\`\`${err}\n\n${origin}\`\`\``)
});

process.on("multipleResolves", (type, promise, reason) => {
    console.log("[ERROR] multipleResolves Caught successfully!, check error log for details");

    client.channels.cache.get(config.crashLog).send(`⚠️ ERROR CAUGHT ⚠️\n\`\`\`${type}\n\n${promise}\n\n${reason}\`\`\``)
});
/* #endregion */

/* #region  Login handler */
if (beta == true) {
    client.login(config.betaToken)
}

else {
    client.login(config.token)
}
/* #endregion */