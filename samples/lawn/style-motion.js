(function(){
  var d=document.documentElement,rm=false;try{rm=matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){}
  var $$=function(s){return [].slice.call(document.querySelectorAll(s))};
  var after=[],t0=0,show=!rm;
  try{if(sessionStorage.getItem('lw-seen'))show=false;else sessionStorage.setItem('lw-seen','1')}catch(e){}
  if(show&&document.body){
    var ld=document.createElement('div');ld.className='lw-load';ld.setAttribute('aria-hidden','true');var r='';for(var i=0;i<8;i++)r+='<i style="--i:'+i+'"></i>';
    ld.innerHTML='<div class="lw-sun">'+r+'</div><div class="lw-word">'+['Sample','Lawn','&amp;','Landscape'].map(function(w,i){return '<span style="--i:'+i+'">'+w+'</span>'}).join('')+'</div>';
    document.body.insertBefore(ld,document.body.firstChild);d.classList.add('lw-loading');t0=1650;
    setTimeout(function(){d.classList.remove('lw-loading');after.forEach(function(f){f()})},t0);setTimeout(function(){ld.remove()},2600);
  }
  function wrapWords(el,cls){var i=0;(function walk(n){[].slice.call(n.childNodes).forEach(function(c){if(c.nodeType===3){if(!c.nodeValue.trim())return;var f=document.createDocumentFragment();c.nodeValue.split(/(\s+)/).forEach(function(w){if(!w)return;if(/^\s+$/.test(w)){f.appendChild(document.createTextNode(w));return}var s=document.createElement('span');s.className=cls;s.style.setProperty('--i',i++);s.textContent=w;f.appendChild(s)});c.parentNode.replaceChild(f,c)}else if(c.nodeType===1&&c.tagName!=='svg')walk(c)})})(el)}
  function ready(){
    if(rm)return;
    $$('.hero h1, .pagehead h1').forEach(function(h){wrapWords(h,'lw-sp');var go=function(){h.classList.add('lw-go')};t0?after.push(go):requestAnimationFrame(go)});
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('lw-in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -12% 0px'});
    $$('main h2').forEach(function(h){wrapWords(h,'lw-lf');io.observe(h)});
    // ripple
    $$('.pill, .sc a').forEach(function(b){b.classList.add('lw-rip-host');b.addEventListener('pointerdown',function(e){var r=b.getBoundingClientRect(),s=Math.max(r.width,r.height)*2.2,x=document.createElement('span');x.className='lw-rip';x.style.width=x.style.height=s+'px';x.style.left=(e.clientX-r.left-s/2)+'px';x.style.top=(e.clientY-r.top-s/2)+'px';b.appendChild(x);setTimeout(function(){x.remove()},750)})});
    // drifting leaves
    var host=document.querySelector('.hero')||document.querySelector('.pagehead');if(!host)return;
    var cv=document.createElement('canvas');cv.className='lw-leaves';cv.setAttribute('aria-hidden','true');host.insertBefore(cv,host.firstChild);
    var ctx=cv.getContext('2d'),W,H,dpr=Math.min(2,devicePixelRatio||1),L=[],cols=['rgba(17,113,62,.28)','rgba(63,160,97,.25)','rgba(228,180,60,.32)'];
    var size=function(){W=host.clientWidth;H=host.clientHeight;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)};size();addEventListener('resize',size);
    for(var k=0;k<14;k++)L.push({x:Math.random()*W,y:Math.random()*H,s:8+Math.random()*12,r:Math.random()*6.28,vr:(Math.random()-.5)*.02,vy:.25+Math.random()*.45,sw:Math.random()*6.28,c:cols[k%3]});
    var leaf=function(p){ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.r);ctx.fillStyle=p.c;ctx.beginPath();ctx.moveTo(0,-p.s);ctx.quadraticCurveTo(p.s*.8,0,0,p.s);ctx.quadraticCurveTo(-p.s*.8,0,0,-p.s);ctx.fill();ctx.restore()};
    var on=true;new IntersectionObserver(function(es){on=es[0].isIntersecting}).observe(host);
    (function tick(){if(on){ctx.clearRect(0,0,W,H);L.forEach(function(p){p.sw+=.01;p.x+=Math.sin(p.sw)*.6;p.y+=p.vy;p.r+=p.vr;if(p.y>H+20){p.y=-20;p.x=Math.random()*W}leaf(p)})}requestAnimationFrame(tick)})();
  }
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',ready):ready();
})();
