/* Shared motion layer for the JOVILAP sample sites. Load right after <body>; per-site settings in window.MOTION. */
(function(){
  var C=window.MOTION||{},d=document.documentElement,rm=false;
  try{rm=matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){}
  var $$=function(s,r){return s?[].slice.call((r||document).querySelectorAll(s)):[]};
  var heroGo=[];
  function letters(name){return name.split('').map(function(ch,i){return ch===' '?'<i class="sp"></i>':'<i style="--i:'+i+'">'+ch.replace('&','&amp;')+'</i>'}).join('')}
  function mark(t){
    if(t==='stripes'){var s='';for(var i=0;i<8;i++)s+='<i style="--i:'+i+'"></i>';return '<div class="m-stripes">'+s+'</div>'}
    if(t==='gauge')return '<div class="m-gauge"><svg viewBox="0 0 150 84" aria-hidden="true"><path class="arc" d="M11 78 A64 64 0 0 1 139 78"/><path class="fill" d="M11 78 A64 64 0 0 1 139 78"/><g class="needle"><line x1="75" y1="78" x2="75" y2="26" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><circle cx="75" cy="78" r="7" fill="currentColor"/></g></svg></div>';
    if(t==='bricks'){var r='',k=0;for(var a=0;a<3;a++){r+='<div>';for(var b=0;b<3;b++)r+='<i style="--i:'+(k++)+'"></i>';r+='</div>'}return '<div class="m-bricks">'+r+'</div>'}
    return '';
  }
  var showLoader=!rm&&C.loader;
  if(showLoader&&C.oncePerSession){try{if(sessionStorage.getItem('m-seen-'+C.key)){showLoader=false}else{sessionStorage.setItem('m-seen-'+C.key,'1')}}catch(e){}}
  var loaderEnd=0;
  if(showLoader&&document.body){
    var l=document.createElement('div');l.className='m-loader';l.setAttribute('aria-hidden','true');
    l.innerHTML=mark(C.loader)+'<div class="m-name">'+letters(C.name||'')+'</div><div class="m-bar"></div>';
    document.body.insertBefore(l,document.body.firstChild);d.classList.add('m-loading');loaderEnd=1550;
    var done=function(){d.classList.remove('m-loading');heroGo.forEach(function(f){f()});heroGo=[]};
    l.addEventListener('animationend',function(e){if(e.animationName==='mOut'){l.remove()}});
    setTimeout(done,loaderEnd);setTimeout(function(){if(l.isConnected)l.remove()},3200);
  }
  function split(el,base){
    var i=0;
    (function walk(n){[].slice.call(n.childNodes).forEach(function(c){
      if(c.nodeType===3){if(!c.nodeValue.trim())return;var f=document.createDocumentFragment();c.nodeValue.split(/(\s+)/).forEach(function(w){if(!w)return;if(/^\s+$/.test(w)){f.appendChild(document.createTextNode(w));return}var s=document.createElement('span');s.className='m-w';s.style.setProperty('--i',i++);s.textContent=w;f.appendChild(s)});c.parentNode.replaceChild(f,c)}
      else if(c.nodeType===1&&!/^(SVG|IMG|BR)$/i.test(c.tagName))walk(c)})})(el);
    if(base)el.style.setProperty('--d',base);
  }
  function ready(){
    if(rm)return;
    // hero headline
    $$(C.hero||'').forEach(function(h){split(h,'0s');var go=function(){h.classList.add('m-go')};if(loaderEnd)heroGo.push(go);else requestAnimationFrame(go)});
    // section headings blur in on scroll
    var hs=$$(C.headings||'').filter(function(h){return !h.closest('.m-loader')&&!(C.hero&&h.matches(C.hero))});
    hs.forEach(function(h){split(h,'.1s')});
    if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('m-go');io.unobserve(e.target)}})},{rootMargin:'0px 0px -10% 0px'});hs.forEach(function(h){io.observe(h)})}else hs.forEach(function(h){h.classList.add('m-go')});
    // spotlight
    $$(C.spot||'').forEach(function(el){if(getComputedStyle(el).position==='static')el.classList.add('m-spot-host');var g=document.createElement('span');g.className='m-glow';g.setAttribute('aria-hidden','true');el.appendChild(g);
      el.addEventListener('pointermove',function(e){var r=el.getBoundingClientRect();el.style.setProperty('--mx',(e.clientX-r.left)+'px');el.style.setProperty('--my',(e.clientY-r.top)+'px')})});
    // border beam
    $$(C.beam||'').forEach(function(el){if(getComputedStyle(el).position==='static')el.classList.add('m-beam-host');var b=document.createElement('span');b.className='m-beam';b.setAttribute('aria-hidden','true');el.appendChild(b)});
    // button shine
    $$(C.shine||'').forEach(function(el,i){el.classList.add('m-shine-host');if(i<2&&el.closest('.hero'))el.classList.add('m-auto');var s=document.createElement('span');s.className='m-shine';s.setAttribute('aria-hidden','true');el.appendChild(s)});
    // marquee
    if(C.marquee&&C.marqueeAfter){var a=document.querySelector(C.marqueeAfter);if(a){var g='<div class="g">'+C.marquee.map(function(t){return '<span>'+t+'</span>'}).join('')+'</div>';var m=document.createElement('div');m.className='m-marq';m.setAttribute('aria-label',C.marqueeLabel||'Services');m.innerHTML='<div class="t">'+g+g.replace('class="g"','class="g" aria-hidden="true"')+'</div>';a.parentNode.insertBefore(m,a.nextSibling)}}
    // hero light rays
    if(C.rays){var hr=document.querySelector(C.rays);if(hr){var ry=document.createElement('div');ry.className='m-rays';ry.setAttribute('aria-hidden','true');ry.innerHTML='<i></i><i></i><i></i>';var at=C.raysAfter?hr.querySelector(C.raysAfter):null;if(at&&at.parentNode===hr)hr.insertBefore(ry,at.nextSibling);else hr.insertBefore(ry,hr.firstChild)}}
    // count-up numbers
    var nums=$$(C.count||'').filter(function(n){return /^\$?\d+(\.\d+)?$/.test(n.textContent.trim())});
    if(nums.length&&'IntersectionObserver' in window){var co=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;co.unobserve(e.target);var el=e.target,raw=el.textContent.trim(),pre=raw[0]==='$'?'$':'',v=parseFloat(raw.replace('$','')),dec=(raw.split('.')[1]||'').length,t0=null;
      var step=function(t){if(!t0)t0=t;var p=Math.min(1,(t-t0)/1400),q=1-Math.pow(1-p,3);el.textContent=pre+(v*q).toFixed(dec);if(p<1)requestAnimationFrame(step);else el.textContent=raw};requestAnimationFrame(step)})},{threshold:.4});nums.forEach(function(n){n.style.fontVariantNumeric='tabular-nums';co.observe(n)})}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready);else ready();
})();
