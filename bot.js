const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const moment = require('moment');

var startAt = "2018-09-20"

bot.on('ready', function () {
    console.log('Connected');
	console.log('Logged in as: ');
	console.log(bot.username + ' - (' + bot.id + ')');
});

bot.on("message", function (message) {
	if (message.author == bot.user) return;
	
	let role_admin = message.guild.roles.get('436679713977794560'); // mini jam admin
	let role_god = message.guild.roles.get('436699918208598018'); // mini jam jamgod
	
	// Listen for messages that will start with '!'
	if (message.content.substring(0, 1) == '!') {
		var args = message.content.substring(1).split(' ');
		var cmd = args[0];
	   
		args = args.splice(1);
		switch(cmd) {
			case 'time':
				var diff = moment(startAt).fromNow().asSeconds();
				message.reply('the next **Mini Jam** starts ' + diff + '.')
			break;
			case 'settime':
				if (message.member.roles.has(role_admin.id) || message.member.roles.has(role_god.id)) {
					startAt = "" + args[0]
					message.channel.send('ok')
				}
				else {
					message.channel.send('Sorry, you dont have permission to do that' + message.author + '.')
				}
			break;
		}
	}
});

bot.login(TOKEN);
