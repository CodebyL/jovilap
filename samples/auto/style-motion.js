(function(){
  var d=document.documentElement,rm=false;try{rm=matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){}
  var $$=function(s){return [].slice.call(document.querySelectorAll(s))};
  var after=[],t0=0;
  if(!rm&&document.body){
    var name='SAMPLE AUTO REPAIR',n='';for(var i=0;i<name.length;i++)n+=name[i]===' '?'<i style="--i:'+i+'">&nbsp;</i>':'<i style="--i:'+i+'">'+name[i]+'</i>';
    var door=document.createElement('div');door.className='am-door';door.setAttribute('aria-hidden','true');var s='';for(var k=0;k<9;k++)s+='<i style="--i:'+k+'"></i>';door.innerHTML=s;
    var ld=document.createElement('div');ld.className='am-load';ld.setAttribute('aria-hidden','true');
    ld.innerHTML='<svg class="am-gauge" viewBox="0 0 150 84"><path class="arc" d="M11 78 A64 64 0 0 1 139 78"/><path class="fill" d="M11 78 A64 64 0 0 1 139 78"/><g class="needle"><line x1="75" y1="78" x2="75" y2="26" stroke="#F2F1EE" stroke-width="4" stroke-linecap="round"/><circle cx="75" cy="78" r="7" fill="#F2F1EE"/></g></svg><div class="am-name">'+n+'</div>';
    document.body.insertBefore(door,document.body.firstChild);document.body.insertBefore(ld,door);d.classList.add('am-loading');t0=1500;
    setTimeout(function(){d.classList.remove('am-loading');after.forEach(function(f){f()})},t0);
    setTimeout(function(){door.remove();ld.remove()},2600);
  }
  function ready(){
    if(rm)return;
    // split-flap headline
    var h=document.querySelector('.hero h1');
    if(h){var txt=h.textContent.trim(),ci=0;h.setAttribute('aria-label',txt);h.innerHTML=txt.split(' ').map(function(w){return '<span class="am-word" aria-hidden="true">'+w.split('').map(function(c){return '<span class="am-c" style="--i:'+(ci++)+'">'+c+'</span>'}).join('')+'</span>'}).join(' ');
      var go=function(){h.classList.add('am-go')};t0?after.push(go):requestAnimationFrame(go)}
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('am-in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -12% 0px'});
    // heading plates
    $$('main h2').forEach(function(x){x.classList.add('am-h');io.observe(x)});
    // caution tape
    var hero=document.querySelector('.hero');
    if(hero){var tp=document.createElement('div');tp.className='am-tape';tp.innerHTML='<p>Diagnosis first &nbsp;·&nbsp; Straight prices &nbsp;·&nbsp; Only the work you approve</p>';hero.parentNode.insertBefore(tp,hero.nextSibling);io.observe(tp);
      var sc=document.createElement('div');sc.className='am-scan';sc.setAttribute('aria-hidden','true');hero.appendChild(sc)}
    // 3D tilt
    $$('.card, .rcard, .rgrid article, .inset').forEach(function(c){c.classList.add('am-tilt');
      c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform='perspective(800px) rotateY('+(x*10)+'deg) rotateX('+(-y*10)+'deg) translateZ(6px)'});
      c.addEventListener('pointerleave',function(){c.style.transform=''})});
    // odometer stats
    $$('.stats b').forEach(function(b){var raw=b.textContent.trim();b.setAttribute('aria-label',raw);var cols=[];
      b.innerHTML=raw.split('').map(function(ch){if(!/\d/.test(ch))return '<span aria-hidden="true">'+ch+'</span>';var c='<span class="am-odo" aria-hidden="true"><span class="col" data-v="'+ch+'">';for(var q=0;q<=9;q++)c+='<span>'+q+'</span>';return c+'</span></span>'}).join('');
      var o2=new IntersectionObserver(function(es){if(es[0].isIntersecting){$$('.col').forEach(function(){});[].slice.call(b.querySelectorAll('.col')).forEach(function(c,i){c.style.transitionDelay=(i*120)+'ms';c.style.transform='translateY(-'+(+c.dataset.v*1.05)+'em)'});o2.disconnect()}},{threshold:.5});o2.observe(b)});
    // tach scroll bar
    var tb=document.createElement('div');tb.className='am-tach';tb.setAttribute('aria-hidden','true');document.body.appendChild(tb);var tk=0;
    var up=function(){tk=0;var m=document.documentElement.scrollHeight-innerHeight;tb.style.transform='scaleX('+(m>0?scrollY/m:0)+')'};addEventListener('scroll',function(){if(!tk){tk=1;requestAnimationFrame(up)}},{passive:true});up();
  }
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',ready):ready();
})();
