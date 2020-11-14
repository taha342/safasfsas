const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  if (
    !["751708415486853156", "751708415482658818", "751708415486853152"].some(
      role => message.member.roles.cache.get(role)
    ) &&
    !message.member.hasPermission("ADMINISTRATOR")
  )
    return message.reply(`Bu Komut İçin Yetkiniz Bulunmamaktadır.`);

  let tag = "◈";
  const kayıtlı = message.guild.roles.cache.find(
    r => r.id === "751708415482658820"
  );
  const kayıtsız = message.guild.roles.cache.find(
    r => r.id === "751708415482658817"
  );

  if (!kayıtlı) return message.reply("Kayıtlı Rolü Ayarlanmamış.");
  if (!kayıtsız) return message.reply("Kayıtsız Rolü Ayarlanmamış.");

  let member =
    message.mentions.users.first() || client.users.cache.get(args.join(" "));
  if (!member) return message.channel.send("Kimi Kayıt Etmem Gerekiyor ?");
  let stg = message.guild.member(member);
  let isim = args[1];
  let yas = args[2];
  if (!isim) return message.reply("");
  if (!yas) return message.reply("");

  stg.setNickname(`${tag} ${isim} | ${yas}`);
  stg.roles.add(kayıtlı);
  stg.roles.remove(kayıtsız);

  db.add(`kayıtSayi.${message.author.id}`, 1);
  db.add(`kadinUye.${message.author.id}`, 1);
  let kadın = db.get(`kadinUye.${message.author.id}`);
  let kayıtlar = db.fetch(`kayıtSayi.${message.author.id}`);

  const embed = new Discord.MessageEmbed()
    .setTitle(`<a:gokalp:773849287075037195> Kayıt İşlemi Tamamlandı`)
    .addField(
      `<a:neolduunubilimiyom:774213347670884352> Kayıt Eden:`,
      `<@${message.author.id}> Tarafından Kayıt Edildi`
    )
    .addField(
      `<a:neolduunubilimiyom:774213347670884352> Kayıt Edilen:`,
      `<@${stg.user.id}> Kayıt Oldu`
    )
    .addField(
      `<a:prizma:773849281429110784> Verilen Rol:`,
      `<@&${kayıtlı.id}> Rolleri Verildi`
    )
    .addField(
      `<a:sarok:773849277906157568> Alınan Rol:`,
      `<@&${kayıtsız.id}> Rolleri Alındı`
    )
    .addField(
      `<a:purplediamond:773849279478759445> Yeni İsmin:`,
      `\`${tag} ${isim} | ${yas}\` Olarak Güncellendi`
    )
    .addField(
      `<a:pin:773849289692151838> Yetkili Toplam:`,
      `\`${kayıtlar}\` Kayıtlara Sahip.`
    )
    .setFooter(`Diana #Code`)
    .setColor("GREEN");
  client.channels.cache.get("751708415486853159").send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kadın", "k", "woman", "girl", "kız"],
  permLevel: 0
};

exports.help = {
  name: "kadın"
};
