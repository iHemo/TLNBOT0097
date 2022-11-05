const Discord = require('discord.js')

const client = new Discord.Client()

const config = require('./utils/config.json')
const gt = require('growtopia-details')
const currentdate = new Date();
client.on('ready', () => {
    console.log(`Current date: ` + currentdate.toLocaleDateString())
    console.log(`${client.user.tag} is online!`)
    console.log(`Connection with API established.`)
})

client.on('message', async message => {

    let args = message.content.trim().split(/ +/g);
    let command = args[0].slice(config.prefix.length).toLowerCase();


    let questions = {
        firstQuestion: "what is the first daily quest item? ",
        secondQuestion: "what is the second daily quest item?",
        thirdQuestion: "what is the first item's price (in world locks)? [must be a number]",
        fourthQuestion:  "what is the second item's price (in world locks)? [must be a number]",
        fifthQuestion: "price prediction? [\`rising/dropping/stable\`]",
        sixthQuestion: "What role day is it?",
    }

    let cotdquestions = {
        firstQuestion: "what is the cotd fish? ",
        secondQuestion: "is the fish trainable? [yes/no]",
        thirdQuestion: "what is the perfect variant fish price (per world lock)? [must be a number]",
        fourthQuestion:  "what is the normal variant fish price (per world lock)? [must be a number]",
        fifthQuestion: "is the turnout high or low? [high/low]",
    }


    if (!message.content.startsWith(config.prefix) || message.author.bot) return
    if (command === "dq") {
        message.channel.send("[Daily quest] alright let's start. Type `cancel` to cancel")
        message.channel.send(questions.firstQuestion).then(msg => {
            const filter1 = m => m.author.id === message.author.id
            msg.channel.awaitMessages(filter1, {
                time: 5 * 60000,
                max: 1
            }).then(messages => {
                let msg1 = messages.first().content
                if(msg1.toLowerCase() === "cancel") return message.author.send("Ok, I have cancelled this process")
                message.channel.send(questions.secondQuestion).then(msg => {
                    const filter1 = m => m.author.id === message.author.id
                    msg.channel.awaitMessages(filter1, {
                        time: 5 * 60000,
                        max: 1
                    }).then(messages => {
                        let msg2 = messages.first().content
                        if(msg2.toLowerCase() === "cancel") return message.author.send("Ok, I have cancelled this process")
                        message.channel.send(questions.thirdQuestion).then(msg => {
                            const filter1 = m => m.author.id === message.author.id
                            msg.channel.awaitMessages(filter1, {
                                time: 5 * 60000,
                                max: 1
                            }).then(messages => {
                                let msg3 = messages.first().content
                                if(msg3.toLowerCase() === "cancel") return message.author.send("Ok, I have cancelled this process")
                                message.channel.send(questions.fourthQuestion).then(msg => {
                                    const filter1 = m => m.author.id === message.author.id
                                    msg.channel.awaitMessages(filter1, {
                                        time: 5 * 60000,
                                        max: 1
                                    }).then(messages => {
                                        let msg4 = messages.first().content
                                        if(msg4.toLowerCase() === "cancel") return message.author.send("Ok, I have cancelled this process")
                                        message.channel.send(questions.fifthQuestion).then(msg => {
                                            const filter1 = m => m.author.id === message.author.id
                                            msg.channel.awaitMessages(filter1, {
                                                time: 5 * 60000,
                                                max: 1
                                            }).then(messages => {
                                                let msg5 = messages.first().content
                                                if(msg5.toLowerCase() === "cancel") return message.author.send("Ok, I have cancelled this process")
                                                message.channel.send(questions.sixthQuestion).then(msg => {
                                                    const filter1 = m => m.author.id === message.author.id
                                                    msg.channel.awaitMessages(filter1, {
                                                        time: 5 * 60000,
                                                        max: 1
                                                    }).then(messages => {
                                                let msg6 = messages.first().content
                                                if(msg6.toLowerCase() === "cancel") return message.author.send("Ok, I have cancelled this process")
                                                message.channel.send("Daily quest posted! thanks for contributing").then(msg => {
                                                    prc1 = parseInt(msg3, 10);
                                                    prc2 = parseInt(msg4, 10);
                                                    const estprice = prc1 + prc2;
                                                    const User = client.users.cache.get(message.author.id); 
                                                    RiseDrop = ""
                                                    roleDay = ""
                                                    price1 = ""
                                                    price2 = ""
                                                    risedropInput = msg5.toLowerCase();
                                                    roledayInput = msg6.toLowerCase();

                                                    //turnout presets
                                                    if(risedropInput == "rising")
                                                    {
                                                        RiseDrop = "<:ExcellentGT:1035604258650869931> slowly Rising"
                                                    }
                                                    else if(risedropInput == "dropping")
                                                    {
                                                        RiseDrop = "<:Very_poor:1035604418403516446> slowly Dropping"
                                                    }

                                                    else if(risedropInput == "stable")
                                                    {
                                                        RiseDrop = ":bar_chart: Stable"
                                                    }

                                                    else
                                                    {
                                                        RiseDrop = "<:AverageGT:1035611586578104320> unsure"
                                                    }

                                                    //roleday presets
                                                    if(roledayInput == "surgery" || roledayInput == "surg" || roledayInput == "surgeon")
                                                    {
                                                        roleDay = "<:gtsurgeon:1035869861630464000> Surgery"
                                                    }

                                                    else if(roledayInput == "builder")
                                                    {
                                                        roleDay = "<:builder:1035870019772493884> Builder"
                                                    }

                                                    else if(roledayInput == "farmer")
                                                    {
                                                        roleDay = "<:farmer:1035870186106011659> Farmer"
                                                    }

                                                    else if(roledayInput == "cooking" || roledayInput == "chef")
                                                    {
                                                        roleDay = "<:Chef:1035872661340946454> Chef"
                                                    }

                                                    else if(roledayInput == "fish" || roledayInput == "fishing")
                                                    {
                                                        roleDay = "<:fishing:1036258778527584296> Fishing"
                                                    }

                                                    else if(roledayInput == "star" || roledayInput == "startopia")
                                                    {
                                                        roleDay = "<:startopia:1035872660153958410> Startopia"
                                                    }

                                                    else if(roledayInput == "jack" || roledayInput == "joat" || roledayInput == "jack of all trades")
                                                    {
                                                        roleDay = "<:joat:1035871083296989324> Jack of all trades!"
                                                    }

                                                    else
                                                    {
                                                        roleDay = "<:joat:1035871083296989324> Jack of all trades!"
                                                    }

                                                    if(msg3 == "1")
                                                    {
                                                        price1 = "World lock"
                                                    }

                                                    else
                                                    {
                                                        price1 = "World locks"

                                                    }

                                                    if(msg4 == "1")
                                                    {
                                                        price2 = "World lock"
                                                    }

                                                    else
                                                    {
                                                        price2 = "World locks"
                                                    }

                                                    const itemLink1 = `https://growtopia.fandom.com/wiki/${msg1}`
                                                    const itemLink2 = `https://growtopia.fandom.com/wiki/${msg2}`

                                                    console.log(`[IE_LOG] DQ POST DETECTED\nExecuter = ${User.tag} \nDaily quest = ${msg1} & ${msg2}\nDate = ${currentdate.toLocaleDateString()} at ${currentdate.toLocaleTimeString()}\n`)

                                                    message.client.channels.cache.get(config.dqChannel).send(
                                                        new Discord.MessageEmbed()
                                                            .setColor("#32a856")
                                                            .setAuthor('Daily Quest announcement | click here to report a problem', 'https://cdn.discordapp.com/attachments/986649997128904775/1035866267875278848/1035606248902631554.webp', 'https://ptb.discord.com/channels/571992648190263317/994294684874715146/1001014705655124039')
                                                            .setDescription(`**WARNING**: Check the names of the items you'll be exchanging your wls for; it's a **Common Scam** to buy items or blocks that are the same color as the DQ requirement but have different names. so kindly check your trades before accepting.`)
                                                            .addField("<:Info:1035902879099269210> Today daily quest is:", "**"+ `[${msg1}](${itemLink1})` + "**" + " For **" + msg3 + "** " + price1 + "\n" + "**" + `[${msg2}](${itemLink2})` + "**" + " for **" + msg4 + "** " + price2, true)      
                                                            .addField("<:Info:1035902879099269210> Today\s Date:", currentdate.toLocaleDateString(), true)
                                                            .addField("<:Info:1035902879099269210> Estimated final price", + estprice.toString() + " <:WL:1035605013222924288>", true)
                                                            .addField("<:Info:1035902879099269210> Price prediction", RiseDrop, true)
                                                            .addField("<:Info:1035902879099269210> Role Day", roleDay, true)
                                                            .setTimestamp()
                                                            .setFooter(`The Lost Nemo! | generated by ${User.tag} | To submit your Daily Quest, dial 12345 using a telephone.`, "https://media.discordapp.net/attachments/986677752314859526/999442036342145097/Growpedia.png?width=868&height=905")
                                                    )//.then(message.crosspost()).catch(console.error());

                                                    if(estprice <= 15)
                                                    {
                                                        message.client.channels.cache.get(config.dqChannel).send(
                                                            `[ <@&975119737304522803> ]\ntoday's daily quest is only **${estprice.toString()}** <:WL:1035605013222924288>!\n🔹 If you desire to be pinged for Future Cheap Daily-Quests, go to <#1036129152455159812> and react to the <@&975119737304522803> role to get notified of all future :ExcellentGT: High Turnout DQ.\nℹ️ Make sure to get your daily-quest items from <#1036129152455159812> as well.\nHave a wonderful day. :ihheart:`
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

    if (command === "cotd") {
        message.channel.send("[COTD] alright let's start. Type `cancel` to cancel")
        message.channel.send(cotdquestions.firstQuestion).then(msg => {
            const filter1 = m => m.author.id === message.author.id
            msg.channel.awaitMessages(filter1, {
                time: 5 * 60000,
                max: 1
            }).then(messages => {
                let msg1 = messages.first().content
                if(msg1.toLowerCase() === "cancel") return message.author.send("Ok, I have cancelled this process")
                message.channel.send(cotdquestions.secondQuestion).then(msg => {
                    const filter1 = m => m.author.id === message.author.id
                    msg.channel.awaitMessages(filter1, {
                        time: 5 * 60000,
                        max: 1
                    }).then(messages => {
                        let msg2 = messages.first().content
                        if(msg2.toLowerCase() === "cancel") return message.author.send("Ok, I have cancelled this process")
                        message.channel.send(cotdquestions.thirdQuestion).then(msg => {
                            const filter1 = m => m.author.id === message.author.id
                            msg.channel.awaitMessages(filter1, {
                                time: 5 * 60000,
                                max: 1
                            }).then(messages => {
                                let msg3 = messages.first().content
                                if(msg3.toLowerCase() === "cancel") return message.author.send("Ok, I have cancelled this process")
                                message.channel.send(cotdquestions.fourthQuestion).then(msg => {
                                    const filter1 = m => m.author.id === message.author.id
                                    msg.channel.awaitMessages(filter1, {
                                        time: 5 * 60000,
                                        max: 1
                                    }).then(messages => {
                                        let msg4 = messages.first().content
                                        if(msg4.toLowerCase() === "cancel") return message.author.send("Ok, I have cancelled this process")
                                        message.channel.send(cotdquestions.fifthQuestion).then(msg => {
                                            const filter1 = m => m.author.id === message.author.id
                                            msg.channel.awaitMessages(filter1, {
                                                time: 5 * 60000,
                                                max: 1
                                            }).then(messages => {
                                                let msg5 = messages.first().content
                                                if(msg5.toLowerCase() === "cancel") return message.author.send("Ok, I have cancelled this process")
                                                message.channel.send("Catch of the day posted! thanks for contributing").then(msg => {
                                                    const estprice = parseInt(msg3) + parseInt(msg4);
                                                    const User = client.users.cache.get(message.author.id); 
                                                    RiseDrop = ""
                                                    todaysFish = ""

                                                    //turnouts preset
                                                    if(msg5 == "high")
                                                    {
                                                        RiseDrop = "<:ExcellentGT:1035604258650869931> high turnout"
                                                    }
                                                    else if(msg5 == "low")
                                                    {
                                                        RiseDrop = "<:Very_poor:1035604418403516446> low turnout"
                                                    }
                                                    else
                                                    {
                                                        RiseDrop = "<:AverageGT:1035611586578104320> unsure turnout"
                                                    }

                                                    Trainable = ""
                                                    if(msg2 == "yes")
                                                    {
                                                        Trainable = "<:Trainingport:1035821307914362940> Trainable"
                                                    }
                                                    else if(msg2 == "no")
                                                    {
                                                        Trainable = "<:Untrainable:1035822603031556137> Not Trainable"
                                                    }
                                                    else
                                                    {
                                                        Trainable = "<:AverageGT:1035611586578104320> unsure"
                                                    }


                                                    fishInput = msg1.toLowerCase();
                                                    fishLink = ""
                                                    fishBaits = ""

                                                    //fish presets
                                                    if(fishInput == "bass")
                                                    {
                                                        todaysFish = "<:Bass:1035859714774405121> Bass";
                                                        fishLink = "https://growtopia.fandom.com/wiki/Bass";
                                                        fishBaits = "<:Shinyflashything:1036315367779340403> <:Wigglyworm:1036315422208823297> <:Salmonegg:1036315383289872494> <:Fishingfly:1036315514231853137> <:Whizmogizmo:1036317202678304848>";
                                                    }

                                                    else if(fishInput == "sunfish")
                                                    {
                                                        todaysFish = "<:Sunfish:1035859843162062908> Sunfish";
                                                        fishLink = "https://growtopia.fandom.com/wiki/Sunfish";
                                                        fishBaits = "<:Shinyflashything:1036315367779340403> <:Fishingfly:1036315514231853137> <:Shrimplure:1036315402977947738>";
                                                    }

                                                    else if(fishInput == "whale")
                                                    {
                                                        todaysFish = "<:GTWhale:1036357304632746064> Whale";
                                                        fishLink = "https://growtopia.fandom.com/wiki/Whale";
                                                        fishBaits = "<:Shrimplure:1036315402977947738> <:Whizmogizmo:1036317202678304848>";
                                                    }

                                                    else if(fishInput == "gar")
                                                    {
                                                        todaysFish = "<:Gar:1035860204241297408> Gar";
                                                        fishLink = "https://growtopia.fandom.com/wiki/Gar";
                                                        fishBaits = "<:Salmonegg:1036315383289872494> <:Fishingfly:1036315514231853137> <:Shrimplure:1036315402977947738> <:Whizmogizmo:1036317202678304848>";
                                                    }

                                                    else if(fishInput == "mahi mahi")
                                                    {
                                                        todaysFish = "<:Mahimahi:1035862077581045840> Mahi Mahi";
                                                        fishLink = "https://growtopia.fandom.com/wiki/Mahi_Mahi";
                                                        fishBaits = "<:Wigglyworm:1036315422208823297> <:Shrimplure:1036315402977947738> <:Whizmogizmo:1036317202678304848>";
                                                    }

                                                    else if(fishInput == "goldfish")
                                                    {
                                                        todaysFish = "<:Goldfish:1036356801190436914> Goldfish";
                                                        fishLink = "https://growtopia.fandom.com/wiki/Goldfish";
                                                        fishBaits = "<:Shinyflashything:1036315367779340403> <:Wigglyworm:1036315422208823297> <:Whizmogizmo:1036317202678304848>";
                                                    }

                                                    else if(fishInput == "dogfish")
                                                    {
                                                        todaysFish = "<:Dogfish:1035862356657442878> Dogfish";
                                                        fishLink = "https://growtopia.fandom.com/wiki/Dogfish";
                                                        fishBaits = "<:Salmonegg:1036315383289872494> <:Fishingfly:1036315514231853137> <:Whizmogizmo:1036317202678304848>";
                                                    }

                                                    //defaults
                                                    else
                                                    {
                                                        todaysFish = msg1;
                                                        fishLink = "https://growtopia.fandom.com/wiki/Fishes";
                                                        fishBaits = "<:cotd:1036315453787734056>";
                                                    }

                                                    console.log(`[IE_LOG] COTD POST DETECTED\nExecuter = ${User.tag} \nFish = ${fishInput}\nDate = ${currentdate.toLocaleDateString()} at ${currentdate.toLocaleTimeString()}\n`)

                                                    message.client.channels.cache.get(config.cotdChannel).send(
                                                        new Discord.MessageEmbed()
                                                            .setColor("#bf6d1b")
                                                            .setAuthor('Catch-Of-The-Day announcement | click here to report a problem', 'https://cdn.discordapp.com/attachments/986649997128904775/1035866110983151636/1035817530972975167.webp', 'https://ptb.discord.com/channels/571992648190263317/994294684874715146/1001014705655124039')
                                                            .setURL('https://ptb.discord.com/channels/571992648190263317/994294684874715146/1001014705655124039')
                                                            .setDescription(``)
                                                            .addField("Today\s COTD is:", `[${todaysFish}](${fishLink})`, true)
                                                            .addField("Today\s Date:", currentdate.toLocaleDateString(), true)
                                                            .addField("Estimated fish price:", `Normal lb for ${msg4} / <:WL:1035605013222924288>\nPerfect lb for ${msg3} / <:WL:1035605013222924288>`, true)
                                                            .addField("Obtainable with",fishBaits, true)
                                                            .addField(`Status of fish`, `${Trainable}`,true)
                                                            .addField("Rate of demand", RiseDrop, true)
                                                            .addField("<a:bell:1036284896253063198> Important Subjects:", `[**Fishes info**](https://growtopia.fandom.com/wiki/Fishes) | [**Fishing Rods guideline**](https://growtopia.fandom.com/wiki/Guide:Fishing/Fishing_Rods) | [**Fish Nutrition**](https://growtopia.fandom.com/wiki/Guide:Fish_Training)`, true)
                                                            .setTimestamp()
                                                            .setFooter(`The price of fish is subject to change based on demand | generated by ${User.tag}`, "https://media.discordapp.net/attachments/986677752314859526/999442036342145097/Growpedia.png?width=868&height=905")
                                                    )//.then(message.crosspost()).catch(console.error());
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

    if(command==="ping")
    {
        message.channel.send(`pong!\nClient latency is: ${Date.now() - message.createdTimestamp}ms\nAPI latency is: ${Math.round(client.ws.ping)}ms`);
    }

    if(command==="gtdetails")
    {
        gt.getDetail().then(e=>{
            const detailEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setAuthor('Growtopia Server details', 'https://cdn.discordapp.com/attachments/844794142248402964/1038087094666535042/691380522651353140.webp', `${e.worldOfDay.renderURL}`)
            .addField(`Players online:`, `${e.onlineUsersCount}`)
            .addField(`<:gtWotd:1038086851803762738> Today's World Of The Day: **${e.worldOfDay.worldName}**`, e.worldOfDay.renderURL)
            .setImage(e.worldOfDay.renderURL)
            .setFooter('Powered by ${IE.version}')
            .setTimestamp()

            message.channel.send(detailEmbed);
        }) 
    }

    if(command==="event")
    {
        eventInput = args[1].toLowerCase();
     
        if (!args[1]) 
        {
            message.channel.send('Please specify an event. here\'s a list of possible events:\n\`\`\`\nlocke,\ncomet,\ncarnival,\ntournament,\ngeiger,\nsurgery,\nhowl,\nghost,\nmutant,\npandemic,\nvoucher\`\`\`');
        }
        if(eventInput == "locke")
        {
            message.client.channels.cache.get(config.cotdChannel).send(
            new Discord.MessageEmbed()
            .setColor('#b825f7')
            .setAuthor('The travelin salesman is here', 'https://images-ext-2.discordapp.net/external/sjYlB3zBRd51UfOoLsvcgmU_28eiqJhZKZ6dK72vsW0/https/i.imgur.com/6Npk2XT.png')
            .setDescription('Every 10 minutes Locke visits a different Growtopia world! If you can figure out where he is, go visit him to purchase some cool items! You can also ask Locke questions about any items in Growtopia.')
            .setFooter('This event lasts for 1 day!', 'https://cdn.discordapp.com/emojis/781317514944053268.webp?size=96&quality=lossless')
            .setTimestamp()

        )}

        if(eventInput == "comet")
        {
            message.client.channels.cache.get(config.cotdChannel).send(
            new Discord.MessageEmbed()
            .setColor('#42f557')
            .setAuthor('It\'s night of the comet', 'https://images-ext-1.discordapp.net/external/yo9RcA7UVh9b1beWqK6JWn2WOb5t0Rd_DkDe8o05mm4/https/i.imgur.com/SdF52CV.png')
            .setDescription('What\'s that in the sky?? A Comet is blazing a trail through the night! It will only be here for 24 hours...')
            .setFooter('This event lasts for 1 day!', 'https://images-ext-1.discordapp.net/external/jF50KiRtj-TyXizAACeTPkPa8BfWD-ZChkdevjO7EqM/https/i.imgur.com/XBGLbHd.png')
            .setTimestamp()

        )}

        if(eventInput == "carnival")
        {
            message.client.channels.cache.get(config.cotdChannel).send(
            new Discord.MessageEmbed()
            .setColor('#bd3f19')
            .setAuthor('The carnival has arrived!', 'https://cdn.discordapp.com/emojis/603228426534649857.gif?size=96&quality=lossless')
            .setDescription(`Visit the world CARNIVAL! try your luck at winning one of the ringmasters fabulous rings, or play some fun games to win some exclusive Carnival items!\nThis event will last through <t:${Math.floor(Date.now()/1000)}:D> to <t:${Math.floor((Date.now()/1000)+ 259200)}:D>`)
            .setFooter('This event lasts for 3 days!', 'https://cdn.discordapp.com/attachments/844794142248402964/1038385854151929946/unknown.png')
            .setTimestamp()

        )}

        else
        {
            message.reply(`This event is unavailable/Doesn't exist`)
        }
    }

    if(command==="announce" || command === "ann")
    {
        const annChannel = message.mentions.channels.first();
        const annMessage = message.content.split(' ').slice(2).join(' ');

        if(!args[1])
        {
            message.channel.send(`Missing an argument: \`annChannel\`, please input a channl to send the message in\nsyntax: ${config.prefix}announce [channel] [message]`)
            return;
        }

        if(!args[2])
        {
            message.channel.send(`Missing an argument: \`annMessage\`, please input a channl to send the message in\nsyntax: ${config.prefix}announce [channel] [message]`)
            return;
        }

        message.guild.channels.cache.find(t => t.id == annChannel.id).send(
            new Discord.MessageEmbed()
            .setColor('#3903fc')
            .setAuthor('News Announcement!', 'https://cdn.discordapp.com/emojis/691300583625326592.webp?size=96&quality=lossless')
            .setDescription(`${annMessage}`)
            .setFooter(`This announcement was sent by ${message.author.tag}`)
            .setTimestamp()
        )
        message.channel.send(`The message has been announced`);
    }

    if(command==="help")
    {
       const helpEmbed = new Discord.MessageEmbed()
            .setTitle('<:Yaki:993969426162532363> YakiBot\'s help menu')
            .setColor("#212121")
            .setDescription(`My prefix is ${config.prefix}`)
            .addField(`${config.prefix}gtdetails`,"Sends the amount of players online and today\'s WOTD\n> Category: 'Growtopia'")
            .addField(`${config.prefix}dq`, "Begin the daily quest announcement generator.\n> Category: 'Growtopia'\n> Required Role: <@&999121968823549962>")
            .addField(`${config.prefix}cotd`,"Begin the catch of the day announcement generator.\n> Category: 'Growtopia'\n> Required Role: <@&879756780513681428>")
            .addField(`${config.prefix}event`,`Sends an announcement regarding a daily event.\n> Category: 'Growtopia'\n> Required Role: <@&999121968823549962>\n> Required args: [1] \n> Syntax: ${config.prefix}event [event]`)
            .addField(`${config.prefix}announce`,`Send a custom announcement to a desired channel.\n> aliases: 'ann'\n> Category: 'Utility'\n> Required Role: <@&999121968823549962>\n> Required args: [2] \n> Syntax: ${config.prefix}announce [channel] [announcement]`)
            .addField(`${config.prefix}ping`, "Pong!\n> Category: 'Utility'")
            .setTimestamp()
            .setFooter(`YakiBot | bot created by YakiKaki#2271 | page 1/1`, "https://media.discordapp.net/attachments/986649997128904775/1035815040437194782/Y.png");
        message.channel.send(helpEmbed);
    }
})

client.login(config.token)