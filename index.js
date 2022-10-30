const Discord = require('discord.js')

const client = new Discord.Client()

const config = require('./utils/config.json')
const currentdate = new Date();
client.on('ready', () => {
    console.log(`Current date: ` + currentdate.toLocaleDateString())
    console.log(`${client.user.tag} is online!`)
    console.log(`Connection with API established.`)
})

client.on('message', async message => {

    let args = message.content.slice(config.prefix.length).trim().split(/ +/)
    let command = args.shift().toLowerCase()


    let questions = {
        firstQuestion: "what is the first daily quest item? ",
        secondQuestion: "what is the second daily quest item?",
        thirdQuestion: "what is the first item's price (in world locks)? [must be a number]",
        fourthQuestion:  "what is the second item's price (in world locks)? [must be a number]",
        fifthQuestion: "price prediction? [rising or dropping?]",
        sixthQuestion: "What role day is it?",
    }

    let cotdquestions = {
        firstQuestion: "what is the cotd fish? ",
        secondQuestion: "is the fish trainable? [yes/no]",
        thirdQuestion: "what is the perfect variant fish price (per world lock)? [must be a number]",
        fourthQuestion:  "what is the normal variant fish price (per world lock)? [must be a number]",
        fifthQuestion: "is the turnout high or low? [high/low]",
        sixthQuestion: "What is it obtained with?",
    }


    if (!message.content.startsWith(config.prefix) || message.author.bot) return
    if (command === "dq") {
        message.channel.send("I have started this process in your DM's. Type `cancel` to cancel")
        message.author.send(questions.firstQuestion).then(msg => {
            const filter1 = m => m.author.id === message.author.id
            msg.channel.awaitMessages(filter1, {
                time: 5 * 60000,
                max: 1
            }).then(messages => {
                let msg1 = messages.first().content
                if(msg1.toLowerCase() === "cancel") return message.author.send("Ok, I have cancelled this process")
                message.author.send(questions.secondQuestion).then(msg => {
                    const filter1 = m => m.author.id === message.author.id
                    msg.channel.awaitMessages(filter1, {
                        time: 5 * 60000,
                        max: 1
                    }).then(messages => {
                        let msg2 = messages.first().content
                        if(msg2.toLowerCase() === "cancel") return message.author.send("Ok, I have cancelled this process")
                        message.author.send(questions.thirdQuestion).then(msg => {
                            const filter1 = m => m.author.id === message.author.id
                            msg.channel.awaitMessages(filter1, {
                                time: 5 * 60000,
                                max: 1
                            }).then(messages => {
                                let msg3 = messages.first().content
                                if(msg3.toLowerCase() === "cancel") return message.author.send("Ok, I have cancelled this process")
                                message.author.send(questions.fourthQuestion).then(msg => {
                                    const filter1 = m => m.author.id === message.author.id
                                    msg.channel.awaitMessages(filter1, {
                                        time: 5 * 60000,
                                        max: 1
                                    }).then(messages => {
                                        let msg4 = messages.first().content
                                        if(msg4.toLowerCase() === "cancel") return message.author.send("Ok, I have cancelled this process")
                                        message.author.send(questions.fifthQuestion).then(msg => {
                                            const filter1 = m => m.author.id === message.author.id
                                            msg.channel.awaitMessages(filter1, {
                                                time: 5 * 60000,
                                                max: 1
                                            }).then(messages => {
                                                let msg5 = messages.first().content
                                                if(msg5.toLowerCase() === "cancel") return message.author.send("Ok, I have cancelled this process")
                                                message.author.send(questions.sixthQuestion).then(msg => {
                                                    const filter1 = m => m.author.id === message.author.id
                                                    msg.channel.awaitMessages(filter1, {
                                                        time: 5 * 60000,
                                                        max: 1
                                                    }).then(messages => {
                                                let msg6 = messages.first().content
                                                if(msg6.toLowerCase() === "cancel") return message.author.send("Ok, I have cancelled this process")
                                                message.author.send("Daily quest posted! thanks for contributing").then(msg => {
                                                    const estprice = parseInt(msg3) + parseInt(msg4);
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
                                                        RiseDrop = "<:ExcellentGT:1035604258650869931> Rising"
                                                    }
                                                    else if(risedropInput == "dropping")
                                                    {
                                                        RiseDrop = "<:Very_poor:1035604418403516446> dropping"
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

                                                    console.log(`[IE_LOG] DQ POST DETECTED\nExecuter = ${User.tag} \nDaily quest = ${msg1} & ${msg2}\nDate = ${currentdate.toLocaleDateString()} at ${currentdate.toLocaleTimeString()}\n`)

                                                    message.client.channels.cache.get(config.dqChannel).send(
                                                        new Discord.MessageEmbed()
                                                            .setColor("#32a856")
                                                            .setAuthor('Daily Quest announcement | click here to report a problem', 'https://cdn.discordapp.com/attachments/986649997128904775/1035866267875278848/1035606248902631554.webp', 'https://ptb.discord.com/channels/571992648190263317/994294684874715146/1001014705655124039')
                                                            .setDescription(`**WARNING**: Check the names of the items you'll be exchanging your wls for; it's a **Common Scam** to buy items or blocks that are the same color as the DQ requirement but have different names. so kindly check your trades before accepting.`)
                                                            .addField("<:Info:1035902879099269210> Today daily quest is:", "**"+ msg1 + "**" + " For **" + msg3 + "** " + price1 + "\n" + "**" + msg2 + "**" + " for **" + msg4 + "** " + price2, true)      
                                                            .addField("<:Info:1035902879099269210> Today\s Date:", currentdate.toLocaleDateString(), true)
                                                            .addField("<:Info:1035902879099269210> Estimated final price", + toString(estprice) + " <:WL:1035605013222924288>", true)
                                                            .addField("<:Info:1035902879099269210> Price prediction", RiseDrop, true)
                                                            .addField("<:Info:1035902879099269210> Role Day", roleDay, true)
                                                            .setTimestamp()
                                                            .setFooter(`The Lost Nemo! | generated by ${User.tag} | To submit your Daily Quest, dial 12345 using a telephone.`, "https://media.discordapp.net/attachments/986677752314859526/999442036342145097/Growpedia.png?width=868&height=905")
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
    })
})
    }

    if (command === "cotd") {
        message.channel.send("I have started this process in your DM's. Type `cancel` to cancel")
        message.author.send(cotdquestions.firstQuestion).then(msg => {
            const filter1 = m => m.author.id === message.author.id
            msg.channel.awaitMessages(filter1, {
                time: 5 * 60000,
                max: 1
            }).then(messages => {
                let msg1 = messages.first().content
                if(msg1.toLowerCase() === "cancel") return message.author.send("Ok, I have cancelled this process")
                message.author.send(cotdquestions.secondQuestion).then(msg => {
                    const filter1 = m => m.author.id === message.author.id
                    msg.channel.awaitMessages(filter1, {
                        time: 5 * 60000,
                        max: 1
                    }).then(messages => {
                        let msg2 = messages.first().content
                        if(msg2.toLowerCase() === "cancel") return message.author.send("Ok, I have cancelled this process")
                        message.author.send(cotdquestions.thirdQuestion).then(msg => {
                            const filter1 = m => m.author.id === message.author.id
                            msg.channel.awaitMessages(filter1, {
                                time: 5 * 60000,
                                max: 1
                            }).then(messages => {
                                let msg3 = messages.first().content
                                if(msg3.toLowerCase() === "cancel") return message.author.send("Ok, I have cancelled this process")
                                message.author.send(cotdquestions.fourthQuestion).then(msg => {
                                    const filter1 = m => m.author.id === message.author.id
                                    msg.channel.awaitMessages(filter1, {
                                        time: 5 * 60000,
                                        max: 1
                                    }).then(messages => {
                                        let msg4 = messages.first().content
                                        if(msg4.toLowerCase() === "cancel") return message.author.send("Ok, I have cancelled this process")
                                        message.author.send(cotdquestions.fifthQuestion).then(msg => {
                                            const filter1 = m => m.author.id === message.author.id
                                            msg.channel.awaitMessages(filter1, {
                                                time: 5 * 60000,
                                                max: 1
                                            }).then(messages => {
                                                let msg5 = messages.first().content
                                                if(msg5.toLowerCase() === "cancel") return message.author.send("Ok, I have cancelled this process")
                                                message.author.send(cotdquestions.sixthQuestion).then(msg => {
                                                    const filter1 = m => m.author.id === message.author.id
                                                    msg.channel.awaitMessages(filter1, {
                                                        time: 5 * 60000,
                                                        max: 1
                                                    }).then(messages => {
                                                let msg6 = messages.first().content
                                                if(msg6.toLowerCase() === "cancel") return message.author.send("Ok, I have cancelled this process")
                                                message.author.send("Daily quest posted! thanks for contributing").then(msg => {
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
                                                        Trainable = "<:Untrainable:1035822603031556137> Untrainable"
                                                    }
                                                    else
                                                    {
                                                        Trainable = "<:AverageGT:1035611586578104320> unsure"
                                                    }


                                                    fishInput = msg1.toLowerCase();

                                                    //fish presets
                                                    if(fishInput == "bass")
                                                    {
                                                        todaysFish = "<:Bass:1035859714774405121> Bass";
                                                    }

                                                    else if(fishInput == "sunfish")
                                                    {
                                                        todaysFish = "<:Sunfish:1035859843162062908> Sunfish";
                                                    }

                                                    else if(fishInput == "gar")
                                                    {
                                                        todaysFish = "<:Gar:1035860204241297408> Gar";
                                                    }

                                                    else if(fishInput == "mahi mahi")
                                                    {
                                                        todaysFish = "<:Mahimahi:1035862077581045840> Mahi Mahi";
                                                    }

                                                    else if(fishInput == "mahi mahi")
                                                    {
                                                        todaysFish = "<:Mahimahi:1035862077581045840> Mahi Mahi";
                                                    }

                                                    else if(fishInput == "dogfish")
                                                    {
                                                        todaysFish = "<:Dogfish:1035862356657442878> Dogfish";
                                                    }

                                                    else
                                                    {
                                                        todaysFish = msg1;
                                                    }

                                                    console.log(`[IE_LOG] COTD POST DETECTED\nExecuter = ${User.tag} \nFish = ${fishInput}\nDate = ${currentdate.toLocaleDateString()} at ${currentdate.toLocaleTimeString()}\n`)

                                                    message.client.channels.cache.get(config.cotdChannel).send(
                                                        new Discord.MessageEmbed()
                                                            .setColor("#bf6d1b")
                                                            .setAuthor('Catch-Of-The-Day announcement | click here to report a problem', 'https://cdn.discordapp.com/attachments/986649997128904775/1035866110983151636/1035817530972975167.webp', 'https://ptb.discord.com/channels/571992648190263317/994294684874715146/1001014705655124039')
                                                            .setURL('https://ptb.discord.com/channels/571992648190263317/994294684874715146/1001014705655124039')
                                                            .setDescription(``)
                                                            .addField("Today\s COTD is:", todaysFish, true)
                                                            .addField("Today\s Date:", currentdate.toLocaleDateString(), true)
                                                            .addField("Estimated fish price:", `Normal lb for ${msg4} / <:WL:1035605013222924288>\nPerfect lb for ${msg3} / <:WL:1035605013222924288>`, true)
                                                            .addField("Obtainable with",msg6, true)
                                                            .addField(`Status of fish`, `${Trainable}`,true)
                                                            .addField("Rate of demand", RiseDrop, true)
                                                            .setTimestamp()
                                                            .setFooter(`The Lost Nemo! | generated by ${User.tag}`, "https://media.discordapp.net/attachments/986677752314859526/999442036342145097/Growpedia.png?width=868&height=905")
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
    })
})
    }

    if(command==="ping")
    {
        message.channel.send(`pong!\nClient latency is: ${Date.now() - message.createdTimestamp}ms\nAPI latency is: ${Math.round(client.ws.ping)}ms`);
    }

    if(command==="help")
    {
       const helpEmbed = new Discord.MessageEmbed()
            .setTitle('<:Yaki:993969426162532363> YakiBot\'s help menu')
            .setColor("#212121")
            .setDescription(`My prefix is ${config.prefix}`)
            .addField(`${config.prefix}dq`, "Begin the daily quest announcement generator.\n> Category: 'Growtopia'\n> Required Role: <@&999121968823549962>")
            .addField(`${config.prefix}cotd`,"Begin the catch of the day announcement generator.\n> Category: 'Growtopia'\n> Required Role: <@&879756780513681428>")
            .addField(`${config.prefix}ping`, "Pong!\n> Category: 'Utility'")
            .setTimestamp()
            .setFooter(`YakiBot | bot created by YakiKaki#2271 | page 1/1`, "https://media.discordapp.net/attachments/986649997128904775/1035815040437194782/Y.png");
        message.channel.send(helpEmbed);
    }
})

client.login(config.token)