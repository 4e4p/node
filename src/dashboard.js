const express=require('express');
const session=require('express-session');
const PgSession=require('connect-pg-simple')(session);
const helmet=require('helmet');
const path=require('node:path');
const {pool,getSettings,updateSettings}=require('./db');
function createDashboard(client){
const app=express();app.set('trust proxy',1);app.use(helmet({contentSecurityPolicy:false}));app.use(express.json({limit:'32kb'}));
app.use(session({store:new PgSession({pool,tableName:'user_sessions',createTableIfMissing:true}),secret:process.env.SESSION_SECRET,resave:false,saveUninitialized:false,cookie:{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',maxAge:604800000}}));
const redirect=encodeURIComponent(process.env.CALLBACK_URL);
app.get('/auth/login',(q,s)=>s.redirect('https://discord.com/oauth2/authorize?client_id='+process.env.CLIENT_ID+'&redirect_uri='+redirect+'&response_type=code&scope=identify%20guilds'));
app.get('/auth/callback',async(q,s)=>{try{const tr=await fetch('https://discord.com/api/oauth2/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({client_id:process.env.CLIENT_ID,client_secret:process.env.CLIENT_SECRET,grant_type:'authorization_code',code:q.query.code,redirect_uri:process.env.CALLBACK_URL})});const token=await tr.json();if(!token.access_token)return s.status(401).send('Discord login failed.');const h={Authorization:'Bearer '+token.access_token};const [u,g]=await Promise.all([fetch('https://discord.com/api/users/@me',{headers:h}).then(r=>r.json()),fetch('https://discord.com/api/users/@me/guilds',{headers:h}).then(r=>r.json())]);q.session.user={id:u.id,username:u.username,avatar:u.avatar,guilds:g};s.redirect('/');}catch(e){console.error(e);s.status(500).send('Login could not be completed.');}});
app.post('/auth/logout',(q,s)=>q.session.destroy(()=>s.json({ok:true})));
const auth=(q,s,n)=>q.session.user?n():s.status(401).json({error:'Sign in with Discord first.'});
const canManage=(q,id)=>{const g=(q.session.user.guilds||[]).find(x=>x.id===id);return g&&(BigInt(g.permissions)&BigInt(32))===BigInt(32)&&client.guilds.cache.has(id);};
app.get('/api/me',(q,s)=>s.json({user:q.session.user?{id:q.session.user.id,username:q.session.user.username,avatar:q.session.user.avatar}:null}));
app.get('/api/guilds',auth,(q,s)=>s.json((q.session.user.guilds||[]).filter(g=>(BigInt(g.permissions)&BigInt(32))===BigInt(32)&&client.guilds.cache.has(g.id)).map(g=>({id:g.id,name:g.name,icon:g.icon}))));
app.get('/api/guilds/:id/settings',auth,async(q,s)=>{if(!canManage(q,q.params.id))return s.status(403).json({error:'Manage Server permission and NODE membership required.'});s.json(await getSettings(q.params.id));});
app.patch('/api/guilds/:id/settings',auth,async(q,s)=>{if(!canManage(q,q.params.id))return s.status(403).json({error:'Manage Server permission and NODE membership required.'});const allowed=['welcome_enabled','welcome_channel_id','welcome_message','logs_enabled','logs_channel_id','automod_enabled','tickets_enabled'];const p=Object.fromEntries(Object.entries(q.body||{}).filter(([k])=>allowed.includes(k)));if(Object.values(p).some(v=>typeof v==='string'&&v.length>500))return s.status(400).json({error:'Setting is too long.'});s.json(await updateSettings(q.params.id,p));});
const lolDist=path.join(__dirname,'../node-lol/dist');app.use('/lol',express.static(lolDist));app.get('/lol/{*splat}',(q,s)=>s.sendFile(path.join(lolDist,'index.html'),e=>{if(e)s.status(404).send('NODE.LOL is building.');}));
const dist=path.join(__dirname,'../dashboard/dist');app.use(express.static(dist));app.get('/{*splat}',(q,s)=>s.sendFile(path.join(dist,'index.html'),e=>{if(e)s.status(404).send('Dashboard not built. Run npm run build.');}));return app;
}
module.exports={createDashboard};
