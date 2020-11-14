const Discord = require("discord.js")
const db = require('quick.db');
exports.run = async(client, message, args) => {    
 if(!message.member.roles.some(r => ["751708415482658818" , "751708415486853156"].includes(r.id))) // ROL (KAYITÇI, VEYA Bİ ROL İDSİ) İDLERİ ÇOĞALTA BİLİRSİNİZ.
    return message.reply("Bu Komutu Kullanmak İçin Yeterli Yetkin Bulunmamakta !")
  //------------------------------------------------KAYITLAR-----------------------------------------------\\    STG   
 let adam = message.mentions.users.first()
if(!adam) {
  let erkek = db.fetch(`erkekUye.${message.author.id}`);
  let kadin = db.fetch(`kadinUye.${message.author.id}`);
  let kayit = db.fetch(`kayıtSayi.${message.author.id}`);
   if(kayit === null) kayit = "0"  
   if(erkek === null) erkek = "0" 
   if(kayit === undefined) kayit = "0"  
   if(erkek === undefined) erkek = "0" 
   if(kadin === null) kadin = "0"
   if(kadin === undefined) kadin = "0"

  const kaytlar = new Discord.RichEmbed()
 .setThumbnail(message.author.avatarURL)     
    .setTitle(`${message.author.username|| message.mentions.members.first}`) 
    .setDescription(`• Toplam Kayıtların: \`${kayit}\`
       • Toplam Erkek Kayıtların: \`${erkek}\`
       • Toplam Kadın Kayıtların: \`${kadin}\``)
    .setFooter(`Striga ❤️ Sadxmamy`)
    .setColor("0x2f3136")
  return message.channel.send(kaytlar)
};
if(adam) {
 let erkek1 = await db.fetch(`erkekUye.${adam.id}`)  
  let kadin1 = await db.fetch(`kadinUye.${adam.id}`);
  let kayit2 = await db.fetch(`kayıtSayi.${adam.id}`);
   if(kayit2 === null) kayit2 = "0"  
   if(erkek1 === null) erkek1 = "0" 
   if(kayit2 === undefined) kayit2 = "0"  
   if(erkek1 === undefined) erkek1 = "0" 
  if(kadin1 === null) kadin1 = "0"
  if(kadin1 === undefined) kadin1 = "0"
  const kaytlar2 = new Discord.RichEmbed()
 .setThumbnail(adam.avatarURL)     
    .setTitle(`${adam.username}`) 
    .setDescription(`• Toplam Kayıtların: \`${kayit2}\`
       • Toplam Erkek Kayıtların: \`${erkek1}\`
       • Toplam Kadın Kayıtların: \`${kadin1}\``)
    .setFooter(`Striga ❤️ Sadxmamy`)
    .setColor("0x2f3136")
  return message.channel.send(kaytlar2)
}}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['info', 'kontrol'],
  permLevel: 0,
  kategori: ``
};

exports.help = {
  name: 'stat',
  description: '',
  usage: ''
};