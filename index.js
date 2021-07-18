require('http').createServer((req, res) => res.end(`¡El bot esta online como:UN BOT`)).listen(3000);
const Discord = require("discord.js");
const client = new Discord.Client();
const {MessageAttachment} = require('discord.js')
const Canvas = require('canvas')
const fclient = require("fortnite");
const fortnite = new fclient(`${process.env.fnstatsKEY}`);
let prefix = "!";


client.on('ready', () => {
   console.log(`¡Estoy vivo como ${client.user.tag}!`);
  function presence(){
  var status = ["⌨ !ayuda ⌨", "✨Creado por: Dark Deivid", `📋Estoy viendo a ${client.users.cache.size} usuarios📋`];
  var randomStatus = Math.floor(Math.random()*(status.length));
  client.user.setPresence({
       status: "dnd",
       activity: {
           name: status[randomStatus],
           type: "WATCHING"
       }
   });
}
  presence();
  setInterval(function(){
    var status = ["⌨ !ayuda ⌨", "✨Creado por: DARK DEIVID", `📋Estoy viendo a  ${client.users.cache.size} usuarios📋`];
  var randomStatus = Math.floor(Math.random()*(status.length));
  client.user.setPresence({
       status: "dnd",
       activity: {
           name: status[randomStatus],
           type: "WATCHING"
       }
   });
}, 5000);
});


client.on('message', async (message) => {
   if(message.content.startsWith('/gamemode 1')) {
    message.channel.send(`¡tu modo de juego a sido cambiado a **creativo**!`);
   }
  if(message.content.startsWith('/gamemode 0')) {
    message.channel.send(`¡tu modo de juego a sido cambiado a **supervivencia**!`);
  }
  if(message.content.startsWhith('prueba')) {
    message.channel.send(`Esto es una prueba facha`)
  }
  function quitarTilde(texto) { 
    return texto
           .normalize('NFD')
           .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,"$1")
           .normalize();
}


function verificarSPAM() {
        let SPAM = ['discord.gg', '.gg']; 
       
        
        if(SPAM.some((x) => quitarTilde(message.content.toLowerCase()).match(x))) {
            const embed = new Discord.MessageEmbed()
                .setTitle(':x: | AntiSPAM')
                .setColor(0x0099FF)
                .setDescription('**Tu mensaje ha sido clasificado como SPAM, por lo tanto, no se enviar**')
                .addField('Informacion', "**Esta prohibido enviar invitaciones, si continuas, seras baneado**");
                message.channel.send(embed); 
            
            message.delete();
            const advert = new Discord.MessageEmbed()
                .setTitle(':shield: | SPAM')
                .addField("Canal:", `<#${message.channel.id}>`, true)
                .addField("Usario:", `<@${message.author.id}>`, true)
                .addField("Mensaje:", message.content, true)
                .addField("Fecha:", new Date());
                client.channels.cache.get('821859691666735124').send(advert).catch(console.error);
                
        }
}

verificarSPAM();
if (!message.content.startsWith(prefix)) return; 
if (message.author.bot) return;
const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();
if(command === "prueba") {
  const pito = new Discord.MessageEmbed()
  .setTitle("Titulo")
  .setAuthor("Pij")
  .setColor("RANDOM")
  .setDescription("Descripcion random")
  .setFooter("Pij")
  .setImage("")
  message.channel.send(pito)
}
if(command === "ayuda") {
  const embed = new Discord.MessageEmbed()
  .setTitle("Comandos de Ayuda")
  .addField("!comandos", "Muestra la lista de comandos disponibles.")
  .setColor("RANDOM")
  message.channel.send(embed)
} 
if(command === "comandos") {
  const embed = new Discord.MessageEmbed()
.setTitle("Comandos")
.addField("<a:Adioskirby:839249260801425412>", "Comandos de Diversion", true)
.addField("<a:Si:839251944622260234>", "Comandos de Moderacion", true)
.setColor("RANDOM")
message.channel.send(embed).then(async msg => {
msg.react("<a:Adioskirby:839249260801425412>")
msg.react("<a:Si:839251944622260234>")
await msg.awaitReactions((reaction, user) => user.id == message.author.id && user.id != client.user.id && (reaction.emoji.id == '839249260801425412'), { max: 1, time: 30000 }).then(async collected => {
  const embed = new Discord.MessageEmbed()
  .setTitle("Comandos")
  .addField("!avatar", "Muestra el avatar tuyo o de una persona.", true)
  .addField("!fortniteshop", "Muestra la tienda de fortnite.", true)
  .addField("!fortnitestats", "Muestra las estadisticas de una persona en fortnite.", true)
  .addField("!soyadmin", "Muestra el meme de soy admin solo que con la foto de perfil de una persona.", true)
  .setColor("RANDOM")
  msg.edit(embed)
})
await msg.awaitReactions((reaction, user) => user.id == message.author.id && user.id != client.user.id && (reaction.emoji.id == '839251944622260234'), { max: 1, time: 30000 }).then(async collected => {
  const embed = new Discord.MessageEmbed()
  .setTitle("Comandos")
  .addField("!nuke", "Nukea un canal de texto.", true)
  .addField("!ban", "Banea a la persona que menciones", true)
  .addField("!kick", "Expulsa a la persona que menciones", true)
  .setColor("RANDOM")
  msg.edit(embed)
})
});
}
if(command === "fortniteshop") {
  message.channel.send("Espera puede tardar un poco... <a:cargando:840612417456963595>")


  const img = new Discord.MessageAttachment("https://api.nitestats.com/v1/shop/image?header=IvanBot%20Fortnite%20Shop&subheader=Make%20by:%20xTraper&background=https://i.imgur.com/UFHPPVx.jpg", "tienda.png") 
 message.channel.send(img);
}
if(command === "fortnitestats") {
  let jugadorstr = args.slice(0).join(" ")
let plataforma = args[1]
if(!jugadorstr) return message.channel.send("ingresa el nombre de un jugador")
if(!plataforma) return message.channel.send("ingresa una plataforma, puede ser pc o gamepad")

fortnite.user(jugadorstr, plataforma).then((jugador) => {
const embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setDescription(`Estadisticas de [${jugadorstr}](${jugador.url})`)
.addField("Victorias: ", `Solo: ${jugador.stats.solo.wins}, Duo: ${jugador.stats.duo.wins}, Squad: ${jugador.stats.squad.wins}`)
.addField("Eliminaciones: ", `Solo: ${jugador.stats.solo.kills}, Duo: ${jugador.stats.duo.kills}, Squad: ${jugador.stats.squad.kills}`)
.addField("Partidas: ", `Solo: ${jugador.stats.solo.matches}, Duo: ${jugador.stats.duo.matches}, Squad: ${jugador.stats.squad.matches}`)
message.channel.send(embed)
}).catch((e) => message.reply("error: "+e))
}
if(command === "avatar") {
let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author; 
    const avatar = new Discord.MessageEmbed()
.setDescription(`[Descargar Avatar](${user.displayAvatarURL({
        format: 'png',
        dynamic: true
    })})`)
.setImage(user.displayAvatarURL({dynamic: true, size : 1024 }))
.setColor("RANDOM")
.setFooter(`Avatar de solicitado por: ${message.member.displayName}`);
message.channel.send(avatar)
}
if(command === "soyadmin") {
let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author 


let avatar = user.displayAvatarURL({ dynamic: false, size: 128, format: 'png' })

const canvas = Canvas.createCanvas(468, 415) 
const ctx = canvas.getContext('2d') 

let bg = await Canvas.loadImage('https://cdn.discordapp.com/attachments/750461925099307129/752473603127377961/IMG_20200907_051913_014.JPG') 
ctx.drawImage(bg, 0, 0) 

ctx.beginPath() 
ctx.arc(canvas.width/2, 70, 60, 0, Math.PI * 2) 
ctx.fillStyle = '#000' 
ctx.fill() 
ctx.stroke() 
ctx.closePath() 
ctx.clip() 
 
let imagen = await Canvas.loadImage(avatar) 
ctx.drawImage(imagen, 169, 10.7) 

let att = new MessageAttachment(canvas.toBuffer(), 'admin.png') 
message.channel.send(att) 
}
if(command === "nuke") {
if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(`> ¡Necesitas el permiso de **Gestionar canales**!`)
      let canal = message.channel;
      let pariente = message.channel.parentID;
      let posicion = message.channel.position;
      let nombre = message.channel.name;
      message.channel.delete()
      message.guild.channels.create(nombre, {
        type: "text",
        parent: pariente
      }).then(channel => {
        channel.setPosition(posicion)
        const embed = new Discord.MessageEmbed()
        .setTitle("**Canal NUEKADO**")
        .setColor("RANDOM")
        .setImage("https://i.pinimg.com/originals/06/c3/92/06c392b847166a9a671bfcd590d8fff7.gif")
        channel.send(embed)
      });
}
if(command === "ban") {
var server = message.guild;
         let permsBot = message.guild.me.hasPermission("BAN_MEMBERS") 

        if (!permsBot) return message.channel.send("No tengo permisos!")
          
        let perms = message.member.hasPermission("BAN_MEMBERS") 
        if (!perms) return message.channel.send("No tienes permisos!")

        let persona = message.mentions.members.first() 
        if(!persona) return message.channel.send("No mencionaste a nadie!")
		
        if(persona.highestRole > message.member.highestRole){ 
            return message.channel.send("No puedes banear a ese usuario porque su rol es mayor que el tuyo!")
        }
          
        if(persona.highestRole > message.guild.me.highestRole){ 
            return message.channel.send("No puedo banear a ese usuario porque su rol es mayor que el mio!")
        }
        
        var razon = args.slice(2).join(' ') 
        if(!razon) {
          razon = `Sin Razón` 
        }
				
        razon = razon
            
          if(persona.id === '529240642010873876') return message.reply('Obviamente no puedes banear al owner del bot -_-')
        if(!message.guild.member(persona).bannable) return message.reply('Ese usuario no es baneable!')
          
        message.guild.member(persona).ban(razon).catch(e => {
          console.log(e)
          return message.reply("A ocurrido un error desconocido!")
        }) 
        const embed = new Discord.MessageEmbed()
        .setTitle(`${persona.user.tag} Fue Baneado!`)
        .setAuthor(server.name, server.iconURL)
        .addField(`Baneado Por `, `${message.author.tag}!`)
        .addField(`Razón: `, `${razon}`)
        message.channel.send(embed) 
          const embedUser = new Discord.MessageEmbed()
        .setTitle(`${persona.user.tag} Has Sido Kickeado!`)
        .setAuthor(server.name, server.iconURL)
        .addField(`Has Sido Kickeado De:`, `${server.name}`)
        .addField(`Kickeado Por `, `${message.author.tag}!`)
        .addField(`Razón: `, `${razon}`)
        persona.send(embedUser) 
}
if(command === "kick") {
var server = message.guild;
         let permsBot = message.guild.me.hasPermission("KICK_MEMBERS") 
         if (!permsBot) return message.channel.send("No tengo permisos!")
        

        var perms = message.member.hasPermission("KICK_MEMBERS");
        if(!perms) return message.channel.send("No tienes Permisos!");

        let user = message.mentions.members.first();
	      if(user){
        let razon = args.slice(2).join(" ");
        if(!razon) {
          razon = `Sin Razón` 
        }
    
          if(user.highestRole > message.member.highestRole){ 
            return message.channel.send("No puedes expulsar a ese usuario porque su rol es mayor que el tuyo!")
        }
          
        if(user.highestRole > message.guild.me.highestRole){ 
            return message.channel.send("No puedo expulsar a ese usuario porque su rol es mayor que el mio!")
        }
          
          if(user.id === '529240642010873876') return message.reply('Obviamente no puedes kickear al owner del bot -_-')
        if (!message.guild.member(user).kickable) return message.reply('Ese usuario no puede ser kickeado!');
     
        message.guild.member(user).kick(razon).catch(e => {
          console.log(e)
        }) 
        const embed = new Discord.MessageEmbed()
        .setTitle(`${user.user.tag} Fue Kickeado!`)
        .setAuthor(server.name, server.iconURL)
        .addField(`Kickeado Por `, `${message.author.tag}!`)
        .addField(`Razón: `, `${razon}`)
        message.channel.send(embed) 
          const embedUser = new Discord.MessageEmbed()
        .setTitle(`${user.user.tag} Has Sido Kickeado!`)
        .setAuthor(server.name, server.iconURL)
        .addField(`Has Sido Kickeado De:`, `${server.name}`)
        .addField(`Kickeado Por `, `${message.author.tag}!`)
        .addField(`Razón: `, `${razon}`)
        user.send(embedUser) 
        }else{
          message.channel.send('Debes mencionar a un usuario!')
        }
}
if(command === "github") {
message.channel.send("")
}
});


client.login(process.env.Token);
