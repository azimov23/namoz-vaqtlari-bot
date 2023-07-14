import { Bot, Keyboard } from "grammy";
import axios from "axios";
import * as cheerio from "cheerio";

import regions2 from "./regions2.js";
import regions3 from "./regions3.js";
import regions from "./regions.js";
import months from "./months.js";
import days from "./days.js";

const bot = new Bot("6323072159:AAHgfUljoUa4VFKVbpZf9HBoNrt2Ke1jyqw");

bot.command("start", (ctx) => {
  ctx.reply(
    `Assalomu alaykum ${`${ctx.from.first_name} ${
      ctx.from.last_name ? ctx.from.last_name : ""
    }`} \n\nHududni tanlang`,
    {
      reply_markup: {
        inline_keyboard: [
          regions.map((reg) => ({ text: reg.name, callback_data: reg.id })),
          regions2.map((reg) => ({ text: reg.name, callback_data: reg.id })),
          regions3.map((reg) => ({ text: reg.name, callback_data: reg.id })),
        ],
      },
    }
  );
  console.log(ctx);
});

bot.on("message", (ctx) => {
  ctx.reply(
    `Assalomu alaykum ${`${ctx.from.first_name} ${
      ctx.from.last_name ? ctx.from.last_name : ""
    }`} \n\nHududni tanlang`,
    {
      reply_markup: {
        inline_keyboard: [
          regions.map((reg) => ({ text: reg.name, callback_data: reg.id })),
          regions2.map((reg) => ({ text: reg.name, callback_data: reg.id })),
          regions3.map((reg) => ({ text: reg.name, callback_data: reg.id })),
        ],
      },
    }
  );
});

bot.on("callback_query", async (ctx) => {
  const reg_id = ctx.callbackQuery.data;
  const date = new Date();
  const year = date.getFullYear();
  const weekday = days[date.getDay()];
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const monthName = months[date.getMonth()];
  const res = await axios.get(
    `https://www.islom.uz/vaqtlar/${reg_id}/${month}`
  );
  const $ = cheerio.load(res.data);
  const bomdod = $("tr.bugun > td:nth-child(4)").text();
  const quyosh = $("tr.bugun > td:nth-child(5)").text();
  const peshin = $("tr.bugun > td:nth-child(6)").text();
  const asr = $("tr.bugun > td:nth-child(7)").text();
  const shom = $("tr.bugun > td:nth-child(8)").text();
  const xufton = $("tr.bugun > td:nth-child(9)").text();

  const regionName = regions.find((r) => r.id == reg_id)?.name;
  const regionName2 = regions2.find((r) => r.id == reg_id)?.name;
  const regionName3 = regions3.find((r) => r.id == reg_id)?.name;

  ctx.reply(
    `Namoz vaqtlari «${
      regionName
        ? regionName
        : regionName2
        ? regionName2
        : regionName3
        ? regionName3
        : ""
    }» vaqti bo'yicha \n\nSana: ${year} yil  ${day}-${monthName}, ${weekday}\n\nBomdod: ${bomdod}\n\nQuyosh: ${quyosh}\n\nPeshin: ${peshin}\n\nAsr: ${asr}\n\nShom: ${shom}\n\nXufton: ${xufton}\n\n----------------------------------\n\nManba: www.islom.uz\n#namoz_vaqtlari\n\n Hududni tanlang `,
    {
      reply_markup: {
        inline_keyboard: [
          regions.map((reg) => ({ text: reg.name, callback_data: reg.id })),
          regions2.map((reg) => ({ text: reg.name, callback_data: reg.id })),
          regions3.map((reg) => ({ text: reg.name, callback_data: reg.id })),
        ],
      },
    }
  );
});

bot.start();
