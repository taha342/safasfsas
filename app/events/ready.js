const chalk = require("chalk");
const moment = require("moment");
const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

var prefix = ayarlar.prefix;

module.exports = client => {
  console.log(`${client.user.username} Başarıyla Aktif Oldum`);

  client.user.setStatus("idle");

  //idle = boşta
  //dnd = rahatsız etmeyin
  //online = çevrimiçi

  console.log(
    `                                                                                                                                                                     `
  );
  client.user.setActivity(`DİANA❤️◈`, { type: "STREAMING" });

  //LISTENING = DİNLİYOR
  //WATCHING = İZLİYOR
  //PLAYING = OYNUYOR
  //STREAMING = YAYINDA
};
