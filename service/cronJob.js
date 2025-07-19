const cron = require('node-cron');
const File = require("../models/File");

async function markallExpiryFilesInDB(){
  const now = new Date();
  await File.updateMany(
    {expiry: {$lte: now}, isExpired: false},
    {$set: {isExpired: true, deletedAt: now}}
  );
}

function ExpiryCron(){
cron.schedule('* * * * *', () => {
  //Every day at 7AM
  markallExpiryFilesInDB()
    .then(() => console.log('Marked expired files'))
    .catch(err => console.error('Cron job error:', err));
  // console.log('running a task every minute');
});
}

module.exports=ExpiryCron;