const {Pool}=require('pg');
const fs=require('node:fs');
const path=require('node:path');
const pool=new Pool({connectionString:process.env.DATABASE_URL,ssl:process.env.PGSSL==='false'?false:(process.env.NODE_ENV==='production'?{rejectUnauthorized:false}:false)});
async function initDb(){await pool.query(fs.readFileSync(path.join(__dirname,'../database/schema.sql'),'utf8'));}
async function getSettings(id){await pool.query('INSERT INTO guild_settings(guild_id) VALUES($1) ON CONFLICT DO NOTHING',[id]);const r=await pool.query('SELECT * FROM guild_settings WHERE guild_id=$1',[id]);return r.rows[0];}
async function updateSettings(id,patch){const allowed=new Set(['welcome_enabled','welcome_channel_id','welcome_message','logs_enabled','logs_channel_id','automod_enabled','tickets_enabled','ticket_category_id']);const entries=Object.entries(patch).filter(([k])=>allowed.has(k));if(!entries.length)return getSettings(id);await getSettings(id);const sets=entries.map(([k],i)=>k+'=$'+(i+2)).join(',');await pool.query('UPDATE guild_settings SET '+sets+',updated_at=NOW() WHERE guild_id=$1',[id,...entries.map(([,v])=>v)]);return getSettings(id);}
async function addCase(g,u,m,a,r){const x=await pool.query('INSERT INTO moderation_cases(guild_id,user_id,moderator_id,action,reason) VALUES($1,$2,$3,$4,$5) RETURNING *',[g,u,m,a,r||'No reason provided']);return x.rows[0];}
async function getCases(g,u){const x=await pool.query('SELECT * FROM moderation_cases WHERE guild_id=$1 AND user_id=$2 ORDER BY created_at DESC LIMIT 20',[g,u]);return x.rows;}
module.exports={pool,initDb,getSettings,updateSettings,addCase,getCases};
