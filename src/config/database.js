const mongoose = require('mongoose');

const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']); // Use Google and Cloudflare DNS
const connectDB = async ()=>{
  mongoose.connect(process.env.DB_CONNECTION_SECRET_STRING)
};  
module.exports={connectDB}  