const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZU4rTVk5TFNlLy9yUjJRS3MxREM0a1l2OFdZSmlvS3RrcHRnQjl2MjBWST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ1grL0FCKzhIQ1lmU2JraHFub2ErRkovdllYRDI2R0F2UzR0QWhpQnVDQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRQkRQVk4yaVBoZGVuWWZaMUdOTTJIUEJOS3RMVEY3cEtMZHAyUVl4ZTBNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI1SmIrTXNjMGtrN2VKSjRMME9ld0h5YXhJVnF2MklKd3ltd0FGaVFmZmcwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNEZlJRTmxid0lIT0FhZy9CT0RmTjhsby9rMUt1c0k5WmU4MVVCVE4xMEU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJFVXZ3STNQaW9YbXhOS2VrRkVVYjN2NS93TnRIb0xWSmllL09xT3hOemc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0NxTHE1cFlJeGJ5bE9Wdk1mcmkybkZsd2Q4dXdVK2lPTmVTM3AyZ1BWRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNDlHc1VxZGtLbEsyKzdsTDZsS3VyeFZFM3pnakhMdVdLbk0vLzNaLzNUOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNHdDN1UUs3RE12S2J6dHdydGwyczJuMThRTTNobXRGWWx1YlJCWnNIVHhqWEU2WDZqMEJydnEwQWZSRDY1a05QdHZiNHJJNmhUbG5lSVBBUCszaURBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTEsImFkdlNlY3JldEtleSI6Ikt2OTNwc3RBcWVoK0lUekRoeFZzN0drNlE5MC9aUjJIWWRwa1FrUUdHK1k9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTE3NzYwODQ2MjM2QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkIwNTcxRDI4OTMxQ0NDQzRBQjE2M0I3QzYzMTE3MUU3In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjMzMTc0MzZ9LHsia2V5Ijp7InJlbW90ZUppZCI6IjkxNzc2MDg0NjIzNkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJDNDk2RjkzMUE1NEMyOTE4Q0Y1OURCNzQyQUIzRDlCQyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIzMzE3NDM2fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJKSUxCYlhaN1JYQzlQX2JGcmpiRWhBIiwicGhvbmVJZCI6IjViN2U2NjVhLTgzNWEtNDc4MS04OGU3LTkwYTg1YTBjOTRjNiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLRlRodXRCWnk1M1Vock80QlB0dUVwVHoyZTg9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYlQrUjdwRDh2eDlPMExxbGhVeVJ6dWVod1JVPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkVEMllIRTdWIiwibWUiOnsiaWQiOiI5MTc3NjA4NDYyMzY6NUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLwnZSH8J2UovCdlKrwnZSs8J2Uq8OXzZzDl/CdlI/wnZSs8J2Ur/CdlKEg8J+YiCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUEgyMDgwRkVLdjUzclVHR0FRZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiZlVGMVNOQnQzSHpHR3ZFSUZqaVV2Ykl5bTFGZkF0V0g1cGt2ZEo1ZjVnWT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiaGlzTEVYQjZEOVl2SFhIWTZtRUZ5UHZWQ2d4ZDVBTTR1ZXZIOEFpOUFsb2V1RkpMYzZscWlCYW9QOTZWRWtibzh4SXY5WEp5M0p6OUI1UUNDNUxBREE9PSIsImRldmljZVNpZ25hdHVyZSI6IkcxNk9rRjQ3SjJyT0NpWjZQZVJTaTZsd1pRNVk2QjdiVFRsNnd1SFZ3QUgyNHQ5eS9kK3dhZWZJbUNCNnJaOFpPWFdoTU9rN1NIQ21wODlWWEcyQkJBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTE3NzYwODQ2MjM2OjVAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWDFCZFVqUWJkeDh4aHJ4Q0JZNGxMMnlNcHRSWHdMVmgrYVpMM1NlWCtZRyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMzMxNzQzMiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFESm8ifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "joel_it",
    NUMERO_OWNER : process.env.OWNER_NUM || "255714595078",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Naruto bot',
    URL : process.env.BOT_MENU_LINKS || 'ttps://telegra.ph/file/4f47eea9c68463c5d8340.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
