const Discord = require("discord.js"); //
const client = new Discord.Client(); //
const ayarlar = require("./ayarlar.json"); //
const chalk = require("chalk"); //
const moment = require("moment"); //
var Jimp = require("jimp"); //
const { Client, Util } = require("discord.js"); //
const fs = require("fs"); //
const db = require("quick.db"); //
const express = require("express"); //
require("./util/eventLoader.js")(client); //
const path = require("path"); //
const snekfetch = require("snekfetch"); //
//

var prefix = ayarlar.prefix; //
//
const log = message => {
  //
  console.log(`${message}`); //
};

client.commands = new Discord.Collection(); //
client.aliases = new Discord.Collection(); //
fs.readdir("./komutlar/", (err, files) => {
  //
  if (err) console.error(err); //
  log(`${files.length} komut yüklenecek.`); //
  files.forEach(f => {
    //
    let props = require(`./komutlar/${f}`); //
    log(`Yüklenen komut: ${props.help.name}.`); //
    client.commands.set(props.help.name, props); //
    props.conf.aliases.forEach(alias => {
      //
      client.aliases.set(alias, props.help.name); //
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }

  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});
client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);

//-----------------------GİRENE-ROL-VERME----------------------\\     STG

client.on("guildMemberAdd", member => {
  member.roles.add("751708415482658817"); // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
});

//-----------------------GİRENE-ROL-VERME----------------------\\     STG

//-----------------------HOŞ-GELDİN-MESAJI----------------------\\     STG

client.on("guildMemberAdd", member => {
  const kanal = member.guild.channels.cache.find(
    r => r.id === "751708415486853159"
  );
  const register = "<@&751708415482658818>";
  let user = client.users.cache.get(member.id);
  require("moment-duration-format");
  const kurulus = new Date().getTime() - user.createdAt.getTime();
  member.setNickname(`◈ | İsim | Yaş`);
  var kontrol;
  if (kurulus < 1296000000)
    kontrol =
      "<a:yukleniyorr:773849290580951040> Hesap Durumu: Güvenilir Değil <a:carpi:773849283941105665>";
  if (kurulus > 1296000000)
    kontrol =
      "<a:yukleniyorr:773849290580951040> Hesap Durumu: Güvenilir Gözüküyor <a:onayli:773849293626015756>";
  moment.locale("tr");
  const strigalog = new Discord.MessageEmbed()
    .setAuthor(member.guild.name)
    .setDescription(
      "<a:redstar:773849293004996619> **Hoşgeldin! <@" +
        member +
        "> Seninle `" +
        member.guild.memberCount +
        "`Kişiyiz. <a:redstar:773849293004996619>\n\n<a:renklisa:774616001627029564> Müsait olduğunda Diana Odalarından Birine Geçip Kaydını Yaptırabilirsin. <a:renklisol:774616002473492490> \n\n<a:zil:773849283597434880> <@&751708415482658818> seninle ilgilenicektir. <a:zil:773849283597434880> \n\n<a:registerbook:773849279437602816> Hesabın Oluşturulma Tarihi: " +
        moment(member.user.createdAt).format("`YYYY DD MMMM dddd`") +
        " <a:registerbook:773849279437602816> \n\n" +
        kontrol +
        "\n\n<a:pin:773849289692151838> Tagımızı alarak ◈ bize destek olabilirsin.** <a:pin:773849289692151838>\n"
    )
    .setImage(
      "https://cdn.discordapp.com/attachments/773922519509893140/774695551353749554/diana_4.gif"
    );
  kanal.send(strigalog);
  kanal.send(register);
});
//-----------------------HOŞ-GELDİN-MESAJI----------------------\\     STG

//-----------------------OTO-TAG-----------------------\\     STG

client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
    const tag = "◈";
    const sunucu = "751708415335727185";
    const kanal = "773847710058414111";
    const rol = "773853559925768213";

    try {
      if (
        newUser.username.includes(tag) &&
        !client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.cache.has(rol)
      ) {
        await client.channels.cache
          .get(kanal)
          .send(
            new Discord.MessageEmbed()
              .setColor("GREEN")
              .setDescription(
                `${newUser} ${tag} Tagımızı Aldığı İçin <@&${rol}> Rolünü Verdim`
              )
          );
        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.add(rol);
        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .send(
            `Selam ${
              newUser.username
            }, Sunucumuzda ${tag} Tagımızı Aldığın İçin ${
              client.guilds.cache.get(sunucu).roles.cache.get(rol).name
            } Rolünü Sana Verdim!`
          );
      }
      if (
        !newUser.username.includes(tag) &&
        client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.cache.has(rol)
      ) {
        await client.channels.cache
          .get(kanal)
          .send(
            new Discord.MessageEmbed()
              .setColor("RED")
              .setDescription(
                `${newUser} ${tag} Tagımızı Çıkardığı İçin <@&${rol}> Rolünü Aldım`
              )
          );
        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.remove(rol);
        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .send(
            `Selam **${
              newUser.username
            }**, Sunucumuzda ${tag} Tagımızı Çıkardığın İçin ${
              client.guilds.cache.get(sunucu).roles.cache.get(rol).name
            } Rolünü Senden Aldım!`
          );
      }
    } catch (e) {
      console.log(`Bir hata oluştu! ${e}`);
    }
  }
});

//Serendia'dan alınıp V12 Çevirilmiştir!

//-----------------------OTO-TAG-----------------------\\     STG

client.on("userUpdate", async (stg, yeni) => {
  var sunucu = client.guilds.cache.get("751708415335727185"); // Buraya Sunucu ID
  var uye = sunucu.members.cache.get(yeni.id);
  var tag = "◈ "; // Buraya Ekip Tag
  var tagrol = "751708415482658821"; // Buraya Ekip Rolünün ID
  var kanal = "751708415486853157"; // Loglanacağı Kanalın ID

  if (
    !sunucu.members.has(yeni.id) ||
    yeni.bot ||
    stg.username === yeni.username
  )
    return;

  if (yeni.username.includes(tag) && !uye.roles.has(tagrol)) {
    try {
      await uye.roles.add(tagrol);
      await uye.send(`Tagımızı aldığın için teşekkürler! Aramıza hoş geldin.`);
      await client.channels.cache
        .get(kanal)
        .send(`${yeni} adlı üye tagımızı alarak aramıza katıldı!`);
    } catch (err) {
      console.error(err);
    }
  }

  if (!yeni.username.includes(tag) && uye.roles.has(tagrol)) {
    try {
      await uye.roles.remove(
        uye.roles.filter(
          rol => rol.position >= sunucu.roles.get(tagrol).position
        )
      );
      await uye.send(
        `Tagımızı bıraktığın için ekip rolü ve yetkili rollerin alındı! Tagımızı tekrar alıp aramıza katılmak istersen;\nTagımız: **${tag}**`
      );
      await client.channels.cache
        .get(kanal)
        .send(`${yeni} adlı üye tagımızı bırakarak aramızdan ayrıldı!`);
    } catch (err) {
      console.error(err);
    }
  }
});

////////OTO ROL/////////////////

client.on("guildMemberAdd", async (member, guild, message) => {
  let role = await db.fetch(`otorol_${member.guild.id}`);
  let otorol = await db.fetch(`otorol_${member.guild.id}`);
  let i = await db.fetch(`otolog_${member.guild.id}`);
  if (!otorol || otorol.toLowerCase() === "yok") return;
  else {
    try {
      if (!i) return;
      console.log();
      member.addRole(member.guild.roles.get(otorol));
      var embed = new Discord.RichEmbed()
        .setDescription(
          `**Sunucuya Yeni Katılan** \`${member.user.tag}\` **Kullanıcısına** \`${role}\` **Rolü verildi.**`
        )
        .setColor("0x36393E")
        .setFooter(`Otorol Sistemi`);
      member.guild.channels.get(i).send(embed);
    } catch (e) {
      console.log(e);
    }
  }
});
///////////////////BOTU ODAYA SOKMA////////////////
client.on("ready", async function() {
  const voiceChannel = "773971804423192606";
  client.channels.cache
    .get(voiceChannel)
    .join()
    .catch(err => {
      throw err;
    });
});

//////////invite//////////////
const Invites = new Discord.Collection();

client.on("ready", () => {
  client.guilds.cache.forEach(guild => {
    guild
      .fetchInvites()
      .then(_invites => {
        Invites.set(guild.id, _invites);
      })
      .catch(err => {});
  });
});
client.on("inviteCreate", invite => {
  var gi = Invites.get(invite.guild.id);
  gi.set(invite.code, invite);
  Invites.set(invite.guild.id, gi);
});
client.on("inviteDelete", invite => {
  var gi = Invites.get(invite.guild.id);
  gi.delete(invite.code);
  Invites.set(invite.guild.id, gi);
});

client.on("guildCreate", guild => {
  guild
    .fetchInvites()
    .then(invites => {
      Invites.set(guild.id, invites);
    })
    .catch(e => {});
});

client.on("guildMemberAdd", async member => {
  let kişi = member.guild.memberCount;
  let payidar = (
    Invites.get(member.guild.id) || new Discord.Collection()
  ).clone();
  member.guild.fetchInvites().then(invites => {
    var invite =
      invites.find(
        _i => payidar.has(_i.code) && payidar.get(_i.code).uses < _i.uses
      ) ||
      payidar.find(_i => !invites.has(_i.code)) ||
      member.guild.vanityURLCode;
    Invites.set(member.guild.id, invites);
    const davet = new Discord.MessageEmbed()
      .setColor("#31")
      .setFooter(`Flax Code`, invite.inviter.avatarURL({ dynamic: true }))
      .setThumbnail(member.user.avatarURL({ dynamic: true, size: 1024 }))
      .setDescription(
        `**<@${member.user.id}>** *adlı kullanıcı sunucuya katıldı.* **__${kişi}__** *kişi olduk.\n Davet eden kullanıcı:* **${invite.inviter}**\n**__\`\`${invite.uses}\`\`__** *adet daveti var*`
      );
    client.channels.cache.get("774301640840708166").send(davet);
  });
});
