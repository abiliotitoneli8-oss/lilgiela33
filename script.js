const GENS=[
 {n:'Pose misteriosa',e:'🧍',c:15,a:0.2},
 {n:'Óculos escuros',e:'🕶️',c:100,a:1},
 {n:'Trilha sonora épica',e:'🎧',c:600,a:6},
 {n:'Slow motion',e:'🎬',c:3500,a:30},
 {n:'Vento no cabelo',e:'🌬️',c:20000,a:150},
 {n:'Entrada de herói',e:'🚪',c:120000,a:800},
 {n:'Aura infinita',e:'♾️',c:900000,a:5000},
 {n:'Corrente de prata',e:'⛓️',c:6.5e6,a:30000},
 {n:'Moletom lendário',e:'🧥',c:5e7,a:180000},
 {n:'Fãs em coro',e:'📣',c:4e8,a:1.1e6},
 {n:'Neon na escuridão',e:'💡',c:3.5e9,a:7e6},
 {n:'Relâmpago de fundo',e:'⚡',c:3e10,a:4.5e7},
 {n:'Portal de aura',e:'🌀',c:3e11,a:3e8},
 {n:'Deus da aura',e:'🔱',c:3e12,a:2e9}
];
const UPS=[
 {n:'Olhar firme',e:'👁️',c:50,m:2},
 {n:'Sorriso certeiro',e:'😏',c:500,m:3},
 {n:'Postura impecável',e:'🏆',c:5000,m:5},
 {n:'Carisma lendário',e:'👑',c:50000,m:10},
 {n:'Aura cósmica',e:'🌌',c:600000,m:20},
 {n:'Silêncio dramático',e:'🤫',c:7e6,m:30},
 {n:'Cabelo no vento',e:'💨',c:8e7,m:50},
 {n:'Risada contagiante',e:'😁',c:9e8,m:100},
 {n:'Presença magnética',e:'🧲',c:1e10,m:200},
 {n:'Brilho nos olhos',e:'✨',c:1.2e11,m:500},
 {n:'Energia de protagonista',e:'🎭',c:1.5e12,m:1000},
 {n:'Aura transcendental',e:'🪐',c:2e13,m:2000}
];
const RANKS=[[0,'Sem aura'],[100,'Aura de iniciante'],[1e3,'Aura emergente'],[1e4,'Aura forte'],[1e5,'Aura absurda'],[1e6,'Aura de lenda'],[1e7,'Aura infinita'],[1e9,'Aura transcendental'],[1e11,'Aura divina'],[1e13,'Dono da aura']];
const KEY='aura-lilgiela33-v1';
let S={aura:0,total:0,gens:GENS.map(()=>0),ups:UPS.map(()=>0),t:Date.now()};
try{const r=localStorage.getItem(KEY);if(r){const o=JSON.parse(r);if(o&&o.gens&&o.ups)S=Object.assign(S,o)}}catch(e){}
while(S.gens.length<GENS.length)S.gens.push(0);while(S.ups.length<UPS.length)S.ups.push(0);
const $=id=>document.getElementById(id);
const fmt=n=>{if(n<1e3)return n<10&&n%1?n.toFixed(1):Math.floor(n).toString();const u=['k','M','B','T'];let i=-1;while(n>=1e3&&i<3){n/=1e3;i++}return n.toFixed(2)+u[i]};
const gcost=i=>Math.ceil(GENS[i].c*Math.pow(1.15,S.gens[i]));
const apc=()=>UPS.reduce((m,u,i)=>S.ups[i]?m*u.m:m,1);
const aps=()=>GENS.reduce((s,g,i)=>s+g.a*S.gens[i],0)*(1+0.01*S.ups.filter(Boolean).length*0);
function build(){
 $('ups').innerHTML=UPS.map((u,i)=>`<button class="item up" data-u="${i}"><span class="e">${u.e}</span><span class="t"><b>${u.n}</b><small>Clique x${u.m}</small></span><span class="cost">${fmt(u.c)}</span></button>`).join('');
 $('gens').innerHTML=GENS.map((g,i)=>`<button class="item" data-g="${i}"><span class="e">${g.e}</span><span class="t"><b>${g.n}</b><small>+${g.a}/s · <span class="cost" id="gc${i}"></span></small></span><span class="own" id="go${i}"></span></button>`).join('');
}
function render(){
 $('score').textContent=fmt(S.aura);
 $('aps').textContent=fmt(aps());$('apc').textContent=fmt(apc());
 let r=RANKS[0][1];for(const k of RANKS)if(S.total>=k[0])r=k[1];$('rank').textContent=r;
 GENS.forEach((g,i)=>{$('gc'+i).textContent=fmt(gcost(i));$('go'+i).textContent=S.gens[i];document.querySelector(`[data-g="${i}"]`).disabled=S.aura<gcost(i)});
 UPS.forEach((u,i)=>{const b=document.querySelector(`[data-u="${i}"]`);b.style.display=S.ups[i]?'none':'';b.disabled=S.aura<u.c});
 document.title=fmt(S.aura)+' aura · lilgiela33';
}
function pop(x,y,t){const p=document.createElement('div');p.className='pop';p.textContent=t;p.style.left=x-10+'px';p.style.top=y-20+'px';document.body.appendChild(p);setTimeout(()=>p.remove(),900)}
$('orb').addEventListener('click',e=>{const v=apc();S.aura+=v;S.total+=v;
 const r=e.target.getBoundingClientRect();pop(e.clientX||r.left+r.width/2,e.clientY||r.top+r.height/2,'+'+fmt(v));render()});
$('gens').addEventListener('click',e=>{const b=e.target.closest('[data-g]');if(!b)return;const i=+b.dataset.g,c=gcost(i);if(S.aura>=c){S.aura-=c;S.gens[i]++;render()}});
$('ups').addEventListener('click',e=>{const b=e.target.closest('[data-u]');if(!b)return;const i=+b.dataset.u;if(!S.ups[i]&&S.aura>=UPS[i].c){S.aura-=UPS[i].c;S.ups[i]=1;render()}});
$('reset').onclick=()=>{if(confirm('Zerar toda a aura?')){S={aura:0,total:0,gens:GENS.map(()=>0),ups:UPS.map(()=>0),t:Date.now()};try{localStorage.removeItem(KEY)}catch(e){}render()}};
let last=performance.now();
setInterval(()=>{const n=performance.now(),d=(n-last)/1000;last=n;const g=aps()*d;S.aura+=g;S.total+=g;render()},100);
setInterval(()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}},5000);
build();render();

/* ===== MÚSICA =====
   Coloque seus arquivos .mp3 na pasta "musica" e liste aqui. */
const MUSICAS=[
 {t:'Música 1',f:'merdasacontecem.mp3'},
 {t:'Música 2',f:'euteesqueci.mp3'},
 {t:'Música 3',f:'musica/musica3.mp3'}
];
const audio=new Audio();audio.volume=.5;
let mi=0,mOn=false,mErr=0,mAuto=true;
function mLoad(i){mi=(i+MUSICAS.length)%MUSICAS.length;audio.src=MUSICAS[mi].f;$('mName').textContent=MUSICAS[mi].t}
function mPlay(){mOn=true;audio.play().catch(()=>{});$('mPlay').textContent='⏸ Música'}
function mPause(){mOn=false;audio.pause();$('mPlay').textContent='▶ Música'}
function mNext(){mLoad(mi+1);if(mOn)mPlay()}
$('mPlay').onclick=()=>{mAuto=false;mOn?mPause():mPlay()};
$('mNext').onclick=()=>{mAuto=false;mNext();mPlay()};
$('mVol').oninput=e=>{audio.volume=+e.target.value};
audio.addEventListener('ended',mNext);
audio.addEventListener('playing',()=>{mErr=0});
audio.addEventListener('error',()=>{if(++mErr>=MUSICAS.length){mPause();$('mName').textContent='Nenhuma música encontrada na pasta "musica"';return}mNext()});
$('orb').addEventListener('click',()=>{if(mAuto&&!mOn){mAuto=false;mPlay()}});
mLoad(0);

/* ===== FOTOS =====
   Cole aqui os links DIRETOS das imagens (terminam em .jpg, .png, .webp...). */
const FOTOS=[
 // 'https://exemplo.com/foto1.jpg',
 // 'https://exemplo.com/foto2.jpg'
];
(function(){
 const box=$('fotos'),lb=$('lb');
 if(!FOTOS.length){box.innerHTML='<p class="vazio">Nenhuma foto ainda. Adicione os links na lista FOTOS do script.js.</p>'}
 FOTOS.forEach(u=>{const b=document.createElement('button'),i=new Image();
  i.src=u;i.alt='Foto';i.loading='lazy';i.referrerPolicy='no-referrer';
  i.onerror=()=>b.remove();b.appendChild(i);
  b.onclick=()=>{lb.querySelector('img').src=u;lb.classList.add('on')};box.appendChild(b)});
 lb.onclick=()=>lb.classList.remove('on');
 document.addEventListener('keydown',e=>{if(e.key==='Escape')lb.classList.remove('on')});
})();

/* ===== CÉU ESTRELADO ===== */
(function(){
 const c=$('stars'),x=c.getContext('2d');let W,H,st=[];
 const calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
 function init(){W=c.width=innerWidth;H=c.height=innerHeight;
  st=Array.from({length:Math.floor(W*H/2800)},()=>({x:Math.random()*W,y:Math.pow(Math.random(),1.5)*H,r:Math.random()*1.1+.2,p:Math.random()*6.3,s:Math.random()*.02+.005}))}
 function draw(){x.clearRect(0,0,W,H);
  for(const s of st){s.p+=s.s;const a=calm?.6:.35+.45*Math.sin(s.p);
   x.fillStyle='rgba(205,245,240,'+Math.max(.05,a)+')';x.beginPath();x.arc(s.x,s.y,s.r,0,6.3);x.fill()}
  if(!calm)requestAnimationFrame(draw)}
 addEventListener('resize',()=>{init();if(calm)draw()});init();draw();
})();
