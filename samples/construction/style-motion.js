(function(){
  var d=document.documentElement,rm=false;try{rm=matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){}
  var $$=function(s){return [].slice.call(document.querySelectorAll(s))};
  var after=[],t0=0,show=!rm;
  try{if(sessionStorage.getItem('cn-seen'))show=false;else sessionStorage.setItem('cn-seen','1')}catch(e){}
  if(show&&document.body){
    var sh=document.createElement('div');sh.className='cn-load';sh.setAttribute('aria-hidden','true');sh.innerHTML='<b style="--i:0"></b><b style="--i:1"></b><b style="--i:2"></b><b style="--i:3"></b>';
    var md=document.createElement('div');md.className='cn-mid';md.setAttribute('aria-hidden','true');var r='',k=0;for(var a=0;a<3;a++){r+='<div>';for(var b=0;b<3;b++)r+='<i style="--i:'+(k++)+'"></i>';r+='</div>'}
    md.innerHTML='<div class="cn-bricks">'+r+'</div><div class="cn-title"><span>Sample Construction Co.</span></div>';
    document.body.insertBefore(sh,document.body.firstChild);document.body.insertBefore(md,sh);d.classList.add('cn-loading');t0=1550;
    setTimeout(function(){d.classList.remove('cn-loading');after.forEach(function(f){f()})},t0);setTimeout(function(){sh.remove();md.remove()},2800);
  }
  function ready(){
    if(rm)return;
    var gg=function(){d.classList.add('cn-gridgo')};t0?after.push(gg):gg();
    $$('.hero h1, .pagehead h1').forEach(function(h){var i=0;var txt=h.textContent.trim();h.setAttribute('aria-label',txt);h.classList.add('cn-h1');
      h.innerHTML=txt.split(/\s+/).map(function(w){return '<span class="cn-m" aria-hidden="true"><span style="--i:'+(i++)+'">'+w+'</span></span>'}).join(' ');
      var go=function(){h.classList.add('cn-go')};t0?after.push(go):requestAnimationFrame(function(){requestAnimationFrame(go)})});
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('cn-in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -12% 0px'});
    $$('.wc section h2').forEach(function(h){if(h.closest('.banner'))return;var dm=document.createElement('div');dm.className='cn-dim';dm.setAttribute('aria-hidden','true');dm.innerHTML='<i></i>';h.insertAdjacentElement('afterend',dm);io.observe(h.parentNode)});
    $$('.scard, .fcard, .tile, .rv, .slide').forEach(function(c){c.classList.add('cn-draw')});
    var nums=$$('.tile b').filter(function(n){return /^\$?\d+(\.\d+)?$/.test(n.textContent.trim())});
    var co=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;co.unobserve(e.target);var el=e.target,raw=el.textContent.trim(),pre=raw[0]==='$'?'$':'',v=parseFloat(raw.replace('$','')),dec=(raw.split('.')[1]||'').length,s=null;
      var st=function(t){if(!s)s=t;var p=Math.min(1,(t-s)/1300),q=1-Math.pow(1-p,3);el.textContent=pre+(v*q).toFixed(dec);if(p<1)requestAnimationFrame(st);else el.textContent=raw};requestAnimationFrame(st)})},{threshold:.4});
    nums.forEach(function(n){n.style.fontVariantNumeric='tabular-nums';co.observe(n)});
  }
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',ready):ready();
})();
