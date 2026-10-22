/* ============================================================
   Blewspace — site script
   SET THIS when you deploy so form requests reach your inbox:
   e.g. 'https://formsubmit.co/ajax/hello@blewspace.com'
   Empty = forms show the success screen but send nothing.
   ============================================================ */
var SUBMIT_URL = 'https://formsubmit.co/ajax/uzair.mansur33@gmail.com';

document.documentElement.classList.add('js');
var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var HOVER = window.matchMedia('(hover: hover)').matches;

/* nav + drawer */
(function(){
  var nav=document.querySelector('.nav');
  function s(){ nav&&nav.classList.toggle('solid',window.scrollY>20); }
  addEventListener('scroll',s,{passive:true}); s();
  var b=document.getElementById('menuBtn'), d=document.getElementById('drawer'), c=document.getElementById('drawerClose');
  if(b&&d){ b.onclick=function(){ d.hidden=false; document.body.style.overflow='hidden'; }; c.onclick=function(){ d.hidden=true; document.body.style.overflow=''; }; }
})();

/* reveal */
(function(){
  var els=document.querySelectorAll('.rv');
  if(REDUCED||!('IntersectionObserver' in window)){ els.forEach(function(e){e.classList.add('in');}); return; }
  var io=new IntersectionObserver(function(en){ en.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} }); },{threshold:.1,rootMargin:'0px 0px -40px 0px'});
  els.forEach(function(e,i){ e.style.transitionDelay=((i%3)*80)+'ms'; io.observe(e); });
  setTimeout(function(){ els.forEach(function(e){e.classList.add('in');}); },3000);
})();

/* hero stage: follows the mouse in 3D */
(function(){
  var st=document.querySelector('.stage-in'); if(!st||REDUCED||!HOVER) return;
  var hero=document.querySelector('.hero');
  hero.addEventListener('mousemove',function(e){
    var x=e.clientX/innerWidth-.5, y=e.clientY/innerHeight-.5;
    st.style.transform='rotateY('+(-14+x*16)+'deg) rotateX('+(8-y*10)+'deg)';
  });
  hero.addEventListener('mouseleave',function(){ st.style.transform=''; });
})();

/* tilt for showcase frames */
(function(){
  if(REDUCED||!HOVER) return;
  document.querySelectorAll('[data-tilt]').forEach(function(el){
    el.addEventListener('mousemove',function(e){ var r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5; el.style.transform='perspective(1000px) rotateY('+x*10+'deg) rotateX('+(-y*10)+'deg)'; });
    el.addEventListener('mouseleave',function(){ el.style.transform=''; });
  });
})();

/* count-up */
(function(){
  var els=document.querySelectorAll('[data-count]'); if(!els.length) return;
  function run(el){ var to=+el.dataset.count, suf=el.dataset.suf||'', t0=null; if(REDUCED){ el.textContent=to+suf; return; }
    function f(t){ if(!t0) t0=t; var p=Math.min((t-t0)/1400,1); el.textContent=Math.round(to*(1-Math.pow(1-p,3)))+suf; if(p<1) requestAnimationFrame(f); } requestAnimationFrame(f); }
  if(!('IntersectionObserver' in window)){ els.forEach(run); return; }
  var io=new IntersectionObserver(function(en){ en.forEach(function(e){ if(e.isIntersecting){ run(e.target); io.unobserve(e.target);} }); },{threshold:.5});
  els.forEach(function(e){ io.observe(e); });
})();

/* copy buttons */
document.querySelectorAll('[data-copy]').forEach(function(b){
  b.addEventListener('click',function(){ var old=b.textContent;
    if(navigator.clipboard&&navigator.clipboard.writeText) navigator.clipboard.writeText(b.dataset.copy).then(function(){ b.textContent='Copied ✓'; setTimeout(function(){b.textContent=old;},1500); },function(){ b.textContent='Select the text above'; });
  });
});

/* ---------- portfolio (live screenshots of each site) ---------- */
var PROJECTS=[
  {c:'trailer',u:'https://camsuperline.com/',n:'Cam Superline',d:'Heavy-duty trailer manufacturer with full product catalogue and dealer locator.'},
  {c:'trailer',u:'https://midsotamfg.com/',n:'Midsota Manufacturing',d:'Deckover to dump trailers, built around a heavy-duty product range.'},
  {c:'trailer',u:'https://formulatrailers.com/',n:'Formula Trailers',d:'Enclosed cargo, car and contractor trailers with a quote system.'},
  {c:'trailer',u:'https://looktrailers.com/',n:'Look Trailers',d:'Premium enclosed trailers with a dealer finder.'},
  {c:'trailer',u:'https://sure-trac.com/',n:'Sure-Trac Trailers',d:'Full brand site for a North American trailer maker.'},
  {c:'trailer',u:'https://www.compass-trailers.com/',n:'Compass Trailers',d:'Enclosed trailers for work and play with a dealer network.'},
  {c:'ecommerce',u:'https://ferlausa.com/',n:'Ferla USA',d:'Shopify store for handcrafted leather belts.'},
  {c:'ecommerce',u:'https://varsoviamoda.com/',n:'Varsovia Moda',d:'Fashion Shopify store with custom theme and multiple languages.'},
  {c:'ecommerce',u:'https://dropashoe.com/',n:'Drop A Shoe',d:'Online store for fashion socks, tights and accessories.'},
  {c:'ecommerce',u:'https://ebooksells.com/',n:'Ebook Sells',d:'Digital products store with automated delivery and memberships.'},
  {c:'ecommerce',u:'https://monkups.com/',n:'Monkups',d:'E-commerce store with custom product setup and checkout flow.'},
  {c:'recruitment',u:'https://cmgrecruitment.com/',n:'CMG Recruitment',d:'Industrial, logistics and transport staffing across the UK.'},
  {c:'recruitment',u:'https://countyrecruitandconnect.co.uk/',n:'County Recruit & Connect',d:'Healthcare recruitment placing nurses and carers UK-wide.'},
  {c:'recruitment',u:'https://fearonrecruitment.co.uk/',n:'Fearon Recruitment',d:'Healthcare, construction, warehouse and security placements.'},
  {c:'recruitment',u:'https://teach-edrecruitment.co.uk/',n:'Teach-Ed Recruitment',d:'Education agency placing teachers across Devon schools.'},
  {c:'recruitment',u:'http://syncstaffing.co.uk/',n:'Sync Staffing',d:'Social care, HGV transport and warehouse recruitment.'},
  {c:'healthcare',u:'https://drcoralarvon.com/',n:'Dr. Coral Arvon',d:'Practitioner site with services and appointment booking.'},
  {c:'healthcare',u:'https://silvermoonhomecare.com/',n:'Silver Moon Home Care',d:'Home care services with care options and a referral form.'},
  {c:'tech',u:'https://cyvra.io/',n:'Cyvra',d:'Cybersecurity company with scanning tools and routed contact forms.'},
  {c:'tech',u:'https://veritumcybergrc.com/',n:'Veritum Cyber GRC',d:'Cyber governance, risk and compliance platform site.'},
  {c:'tech',u:'https://rezexaccountants.com/',n:'Rezex Accountants',d:'Accounting firm with a client portal.'},
  {c:'tech',u:'https://panisol.be/',n:'Panisol',d:'Belgian insulation company with product and service pages.'},
  {c:'travel',u:'https://xclusiveyachts.com/',n:'Xclusive Yachts',d:'Luxury yacht charter platform with a booking system.'},
  {c:'travel',u:'https://fairouztravel.ca/',n:'Fairouz Travel',d:'Canadian travel agency with tour packages and booking flow.'},
  {c:'travel',u:'https://croatiascoastalconcierge.com/',n:'Croatia Coastal Concierge',d:'Yacht hire, jet skis and water toys on the Croatian coast.'},
  {c:'business',u:'https://loftmatch.com/',n:'Loft Match',d:'Property platform matching renters with loft spaces.'},
  {c:'business',u:'https://usairconditioning.net/',n:'US Air Conditioning',d:'HVAC company with service areas and quote requests.'},
  {c:'business',u:'https://zttechnicalservices.com/',n:'ZT Technical Services',d:'Technical services and engineering company site.'},
  {c:'business',u:'https://warmfutures.co/',n:'Warm Futures',d:'Energy efficiency landing page with lead capture.'},
  {c:'business',u:'https://leadsconvert.io/',n:'Leads Convert',d:'SaaS marketing page with pricing table.'}
];
var CATS={all:'All',recruitment:'Recruitment',trailer:'Manufacturing',healthcare:'Healthcare',tech:'Tech & finance',travel:'Travel & luxury',business:'Business & property',ecommerce:'E-commerce'};
function shot(u){ return 'https://api.microlink.io/?url='+encodeURIComponent(u)+'&screenshot=true&screenshot.fullPage=true&viewport.width=1280&viewport.height=820&meta=false&embed=screenshot.url'; }
function dom(u){ return u.replace(/https?:\/\/(www\.)?/,'').replace(/\/.*$/,''); }
var LOCK='<svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';
function card(p){
  var a=document.createElement('a'); a.className='wcard'; a.href=p.u; a.target='_blank'; a.rel='noopener';
  var ini=p.n.split(/\s+/).map(function(w){return w[0];}).join('').slice(0,2);
  a.innerHTML='<div class="browser"><div class="bbar"><div class="bdots"><i></i><i></i><i></i></div><div class="burl">'+LOCK+dom(p.u)+'</div></div>'+
    '<div class="wthumb"><div class="wph"><span class="mono">'+ini+'</span><b>'+p.n+'</b><small>'+dom(p.u)+'</small></div></div></div>'+
    '<div class="wmeta"><div><h3>'+p.n+'</h3><p>'+p.d+'</p></div><span class="tg">'+CATS[p.c]+'</span></div>';
  var img=new Image(); img.className='shot'; img.alt=p.n+' website screenshot'; img.loading='lazy'; img.decoding='async';
  img.onload=function(){ if(img.naturalWidth<60) return; var th=a.querySelector('.wthumb'); th.appendChild(img);
    if(img.naturalHeight/img.naturalWidth>1){ img.classList.add('tall'); th.style.setProperty('--th',th.clientHeight+'px'); } };
  img.src=shot(p.u);
  return a;
}
/* grids: <div data-work="websites|ecommerce|featured"> with optional filters */
document.querySelectorAll('[data-work]').forEach(function(g){
  var kind=g.dataset.work, list;
  if(kind==='ecommerce') list=PROJECTS.filter(function(p){return p.c==='ecommerce';});
  else if(kind==='featured') list=['Cam Superline','CMG Recruitment','Xclusive Yachts','Ferla USA','Cyvra','Varsovia Moda'].map(function(n){return PROJECTS.filter(function(p){return p.n===n;})[0];});
  else list=PROJECTS.filter(function(p){return p.c!=='ecommerce';});
  var f=g.previousElementSibling&&g.previousElementSibling.classList.contains('filters')?g.previousElementSibling:null;
  function render(k){ g.innerHTML=''; list.filter(function(p){return k==='all'||p.c===k;}).forEach(function(p){ g.appendChild(card(p)); }); }
  if(f){
    Object.keys(CATS).forEach(function(k){
      var n=k==='all'?list.length:list.filter(function(p){return p.c===k;}).length; if(!n) return;
      var b=document.createElement('button'); b.type='button'; b.className='filter'; b.setAttribute('aria-pressed',String(k==='all')); b.innerHTML=CATS[k]+'<em>'+n+'</em>';
      b.onclick=function(){ f.querySelectorAll('.filter').forEach(function(x){x.setAttribute('aria-pressed','false');}); b.setAttribute('aria-pressed','true'); render(k); };
      f.appendChild(b);
    });
  }
  render('all');
});

/* hero slider (website / store / clinic) */
(function(){
  var st=document.querySelector('.stage'); if(!st) return;
  var sl=st.querySelectorAll('.slide'), lb=st.querySelectorAll('.label span'), url=st.querySelector('.hero-url'), i=0;
  var URLS=['wanderly-travel.com','maison-store.com/shop','brightsmile-dental.com'];
  function show(n){ i=n; sl.forEach(function(s,k){ s.classList.toggle('on',k===i); }); lb.forEach(function(s,k){ s.classList.toggle('on',k===i); }); if(url) url.lastChild.textContent=URLS[i]; }
  lb.forEach(function(s,k){ s.addEventListener('click',function(){ show(k); }); });
  if(!REDUCED) setInterval(function(){ if(!document.hidden) show((i+1)%sl.length); },4200);
})();

/* tabs */
document.querySelectorAll('[data-tabs]').forEach(function(box){
  var tabs=box.querySelectorAll('.tab'), panels=box.querySelectorAll('.panel');
  tabs.forEach(function(t,k){ t.addEventListener('click',function(){ tabs.forEach(function(x,j){ x.setAttribute('aria-selected',String(j===k)); }); panels.forEach(function(p,j){ p.classList.toggle('on',j===k); }); }); });
});

/* systems switcher */
document.querySelectorAll('[data-sys]').forEach(function(box){
  var items=box.querySelectorAll('.sys-item'), img=box.querySelector('.shot-main img'), url=box.querySelector('.sys-url'), cap=box.querySelector('.sys-cap p'), link=box.querySelector('.sys-cap a');
  items.forEach(function(it){ it.addEventListener('click',function(){
    items.forEach(function(x){ x.setAttribute('aria-selected','false'); }); it.setAttribute('aria-selected','true');
    img.src=it.querySelector('img').src; img.alt=it.dataset.name; url.lastChild.textContent=it.dataset.url; cap.textContent=it.dataset.desc; link.href=it.dataset.href;
  }); });
});

/* AI demo chat */
(function(){
  var f=document.getElementById('botForm'); if(!f) return;
  var log=document.getElementById('botLog'), inp=document.getElementById('botIn');
  var R=[[/price|cost|how much|budget/i,'Websites start from $100 and dashboards from $250. Stores, portals and apps get a fixed quote after a short call.'],
         [/time|long|fast|when/i,'A 5-page website usually takes one to two weeks once we have your content.'],
         [/shopify|woo|store|shop/i,'Yes, we build Shopify and WooCommerce stores, and custom Next.js stores when you need more speed.'],
         [/dashboard|portal|system|pos/i,'We build dashboards, client portals and POS systems. Have a look at the Dashboards page for live demos.'],
         [/hi|hello|hey|salam/i,'Hello! Ask me about prices, timelines or what we build.']];
  function add(t,who){ var d=document.createElement('div'); d.className='msg '+who; d.textContent=t; log.appendChild(d); log.scrollTop=log.scrollHeight; }
  f.addEventListener('submit',function(e){ e.preventDefault(); var v=inp.value.trim(); if(!v) return; add(v,'u'); inp.value='';
    var a='I can help with prices, timelines and services. For anything specific, use Start a project and we will reply within 24 hours.';
    for(var i=0;i<R.length;i++){ if(R[i][0].test(v)){ a=R[i][1]; break; } }
    setTimeout(function(){ add(a,'b'); },500); });
  document.querySelectorAll('[data-ask]').forEach(function(b){ b.addEventListener('click',function(){ inp.value=b.dataset.ask; f.requestSubmit?f.requestSubmit():f.dispatchEvent(new Event('submit')); }); });
})();

/* nav dropdown (touch + keyboard) */
document.querySelectorAll('.dd > button').forEach(function(b){
  b.addEventListener('click',function(e){ e.stopPropagation(); var p=b.parentNode, o=!p.classList.contains('open'); document.querySelectorAll('.dd.open').forEach(function(x){x.classList.remove('open');}); p.classList.toggle('open',o); b.setAttribute('aria-expanded',String(o)); });
});
document.addEventListener('click',function(){ document.querySelectorAll('.dd.open').forEach(function(x){x.classList.remove('open'); x.querySelector('button').setAttribute('aria-expanded','false');}); });

/* shared */
function sendForm(payload,ok,fail){
  if(!SUBMIT_URL){ ok(); return; }
  payload._template='table'; payload._captcha='false'; if(payload.email) payload._replyto=payload.email;
  fetch(SUBMIT_URL,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(payload)})
    .then(function(r){ if(!r.ok) throw 0; ok(); }).catch(fail);
}
function esc(s){ return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }
var EMAIL_RE=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function confetti_unused(){
  if(REDUCED) return;
  var c=document.createElement('canvas'); c.className='confetti'; document.body.appendChild(c);
  var x=c.getContext('2d'), W=c.width=innerWidth, H=c.height=innerHeight, cols=['#2f5bff','#12c79a','#ffb020','#ff5c47','#7a5cff'], P=[];
  for(var i=0;i<140;i++) P.push({x:W/2,y:H/2.4,vx:(Math.random()-.5)*16,vy:Math.random()*-14-4,s:Math.random()*8+4,r:Math.random()*6,c:cols[i%5]});
  var t=0; (function f(){ x.clearRect(0,0,W,H); P.forEach(function(p){ p.vy+=.45; p.x+=p.vx; p.y+=p.vy; p.r+=.2; x.save(); x.translate(p.x,p.y); x.rotate(p.r); x.fillStyle=p.c; x.fillRect(-p.s/2,-p.s/4,p.s,p.s/2); x.restore(); });
    if(++t<130) requestAnimationFrame(f); else c.remove(); })();
}
var TICK='<svg viewBox="0 0 96 96"><circle cx="48" cy="48" r="30" fill="none" stroke="#2346ff" stroke-width="4"/><path d="M34 49l10 10 19-21" fill="none" stroke="#2346ff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

/* contact quick form */
(function(){
  var f=document.getElementById('quickForm'); if(!f) return;
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var n=f.querySelector('#qName'),m=f.querySelector('#qEmail'),t=f.querySelector('#qMsg'),er=document.getElementById('qErr');
    [n,m,t].forEach(function(z){z.parentNode.classList.remove('err');});
    var bad=[]; if(n.value.trim().length<2) bad.push(n); if(!EMAIL_RE.test(m.value.trim())) bad.push(m); if(t.value.trim().length<5) bad.push(t);
    if(bad.length){ bad.forEach(function(z){z.parentNode.classList.add('err');}); er.textContent='Add your name, a valid email and a short message.'; bad[0].focus(); return; }
    er.textContent=''; var btn=f.querySelector('button[type=submit]'); btn.disabled=true; btn.textContent='Sending…';
    sendForm({_subject:'Website message from '+n.value.trim(),name:n.value.trim(),email:m.value.trim(),message:t.value.trim()},
      function(){ f.innerHTML='<div class="done" style="padding:6px 0">'+TICK+'<h2 style="font-size:1.9rem">Message received</h2><p>We reply within 24 hours on business days.</p></div>';  },
      function(){ btn.disabled=false; btn.textContent='Send message'; er.textContent='The message did not send. Check your connection and try again, or use WhatsApp.'; });
  });
})();

/* ---------- start-a-project wizard ---------- */
(function(){
  var root=document.getElementById('wizard'); if(!root) return;
  var IC={
    web:'<path d="M3 5h18v13H3zM3 9h18M8 21h8"/>',store:'<path d="M6 7h12l-1 13H7zM9 7a3 3 0 0 1 6 0"/>',app:'<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M13 5l-2 14"/>',
    portal:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',dash:'<path d="M3 3h7v9H3zM14 3h7v5h-7zM14 12h7v9h-7zM3 16h7v5H3z"/>',
    book:'<path d="M3 5h18v16H3zM3 10h18M8 3v4M16 3v4M9 15l2 2 4-4"/>',kiosk:'<path d="M6 2h12v15H6zM9 21h6M12 17v4"/>',ai:'<path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/>'
  };
  
  var TYPES=[
    {k:'website',l:'Website',s:'Business site, landing page or redesign',i:'web',p:'from $100'},
    {k:'store',l:'Online store',s:'Sell products online',i:'store'},
    {k:'webapp',l:'Web app',s:'Custom software in the browser',i:'app'},
    {k:'portal',l:'Client portal',s:'Customers log in to their own area',i:'portal'},
    {k:'dashboard',l:'Admin dashboard',s:'Sales, stock, staff and reports',i:'dash'},
    {k:'booking',l:'Booking system',s:'Appointments, slots and reminders',i:'book'},
    {k:'kiosk',l:'Kiosk system',s:'Touchscreen self-service',i:'kiosk'},
    {k:'ai',l:'AI assistant',s:'Chatbot trained on your business',i:'ai'}
  ];
  var FOLLOW={
    website:[{id:'platform',q:'Which platform would you like?',o:[['WordPress','Easy to edit yourself'],['WooCommerce','WordPress with a shop'],['Shopify','Hosted, simple to run'],['Custom (Next.js / React)','Fastest, fully bespoke'],['Webflow','Visual editor'],['Not sure','We will recommend one']]},
             {id:'pages',q:'How many pages?',o:[['1 page','Landing page'],['Up to 5 pages','Home, about, services…'],['Up to 10 pages','Larger business site'],['10+ pages','Big site or catalogue']]}],
    store:[{id:'platform',q:'Which platform?',o:[['Shopify','Hosted, simple to run'],['WooCommerce','On WordPress'],['Custom (Next.js)','Headless, fully bespoke'],['Not sure','We will recommend one']]},
           {id:'products',q:'How many products?',o:[['Under 20'],['20 – 100'],['100 – 1,000'],['1,000+']]}],
    webapp:[{id:'kind',q:'What will the app do?',o:[['Manage customers','CRM, leads, follow-ups'],['Inventory & POS','Stock, sales, receipts'],['Bookings & scheduling','Staff, slots, payments'],['Marketplace','Buyers, sellers, payouts'],['Something else','Tell us later']]},
            {id:'users',q:'Who will use it?',o:[['My team only'],['My customers'],['Both']]}],
    portal:[{id:'who',q:'Who logs in to the portal?',o:[['Clients','Orders, invoices, files'],['Vendors / partners','Listings, bookings, payouts'],['Staff and clients','Two kinds of access']]},
            {id:'see',q:'What should they see?',multi:1,o:[['Orders & invoices'],['Files & documents'],['Project status'],['Messages'],['Payments'],['Reports']]}],
    dashboard:[{id:'track',q:'What should the dashboard track?',multi:1,o:[['Sales'],['Inventory'],['Staff & attendance'],['Bookings'],['Finance & cash flow'],['Customers']]},
               {id:'data',q:'Where does the data come from?',o:[['We enter it','Forms inside the dashboard'],['My website or store','Connect what you have'],['Other software','API integration']]}],
    booking:[{id:'biz',q:'What kind of business?',o:[['Clinic or dental'],['Salon or spa'],['Consulting'],['Tours or rentals'],['Other']]},
             {id:'pay',q:'Take payment when people book?',o:[['Yes, online payment','Card or deposit at booking'],['No, pay on site','Booking only']]}],
    kiosk:[{id:'units',q:'How many kiosks?',o:[['1 kiosk'],['2 – 5 kiosks'],['6+ kiosks']]},
           {id:'kpay',q:'Card payments on the kiosk?',o:[['Yes'],['No']]}],
    ai:[{id:'where',q:'Where should the assistant live?',o:[['On my website'],['WhatsApp'],['Inside my team tools']]},
        {id:'train',q:'What should it know?',o:[['My website content'],['My documents and FAQs'],['Both']]}]
  };
  var EXTRAS=['Online payments','Booking calendar','Admin dashboard','Customer login','Multi-language','SEO setup','Blog','AI chat assistant','Email / WhatsApp alerts','API integration'];
  var MAP={booking:'Booking calendar',dashboard:'Admin dashboard',portal:'Customer login',ai:'AI chat assistant'};
  var BUDGETS=['$100 – $300','$300 – $1,000','$1,000 – $3,000','$3,000 – $7,000','$7,000+','Not sure yet'];
  var TIMES=[['As soon as possible','Start this week'],['Within a month',''],['1 – 3 months',''],['Flexible','No fixed date']];
  var NO_BUDGET={dashboard:1,portal:1};
  var STEPS=['type','follow','extras','plan','details','review'];
  var S={type:null,ans:{},extras:[],budget:null,time:null,d:{}}, step=0;
  var main=document.getElementById('wizMain'), bar=document.getElementById('wizBar'), cnt=document.getElementById('wizCount'), picks=document.getElementById('picks');

  function T(){ return TYPES.filter(function(t){return t.k===S.type;})[0]; }
  function opt(v,label,sub,pressed,extra,price){ return '<button type="button" class="opt" aria-pressed="'+pressed+'" data-v="'+esc(v)+'">'+(extra||'')+'<b>'+esc(label)+'</b>'+(sub?'<small>'+esc(sub)+'</small>':'')+(price?'<span class="p">'+price+'</span>':'')+'</button>'; }
  function grid(n){ return n>=6?'opts':n===4?'opts four':n===2?'opts two':'opts'; }
  function side(){
    var t=T(); if(!picks) return;
    var tags=[]; if(t) tags.push(t.l);
    if(t) FOLLOW[t.k].forEach(function(f){ var a=S.ans[f.id]; if(a) tags=tags.concat([].concat(a)); });
    tags=tags.concat(S.extras); if(S.budget&&!NO_BUDGET[S.type]) tags.push(S.budget); if(S.time) tags.push(S.time);
    picks.innerHTML=tags.length?tags.map(function(x){return '<span>'+esc(x)+'</span>';}).join(''):'<em>Your answers will appear here.</em>';
  }
  function render(){
    var name=STEPS[step], h='';
    bar.style.width=(step/(STEPS.length-1)*100)+'%'; cnt.textContent='Step '+(step+1)+' of '+STEPS.length;
    if(name==='type'){
      h='<div class="q"><h2>What would you like us to <span class="s">build</span>?</h2><p class="qsub">Pick the main thing. You can add features in a moment.</p><div class="opts four" data-g="type">'+
        TYPES.map(function(t){ return opt(t.k,t.l,t.s,S.type===t.k,'<span class="oi"><svg viewBox="0 0 24 24">'+IC[t.i]+'</svg></span>',t.p); }).join('')+'</div></div>';
    }
    if(name==='follow'){
      var t=T();
      h='<div class="q"><h2>Tell us about your <span class="s">'+t.l.toLowerCase()+'</span>.</h2><p class="qsub">Two quick questions so we plan it right.</p>'+
        FOLLOW[t.k].map(function(f){ var cur=S.ans[f.id];
          return '<span class="qlbl">'+f.q+(f.multi?' <small style="color:var(--muted);font-weight:600">· pick any</small>':'')+'</span><div class="'+grid(f.o.length)+'" data-g="f:'+f.id+'"'+(f.multi?' data-multi="1"':'')+'>'+
            f.o.map(function(o){ var on=f.multi?(cur||[]).indexOf(o[0])>-1:cur===o[0]; return opt(o[0],o[0],o[1]||'',on); }).join('')+'</div>'; }).join('')+'</div>';
    }
    if(name==='extras'){
      var skip=MAP[S.type];
      h='<div class="q"><h2>Any extra <span class="s">features</span>?</h2><p class="qsub">Optional. Pick as many as you like, or skip.</p><div class="opts" data-g="extras" data-multi="1">'+
        EXTRAS.filter(function(x){return x!==skip;}).map(function(x){ return opt(x,x,'',S.extras.indexOf(x)>-1); }).join('')+'</div></div>';
    }
    if(name==='plan'){
      var nb=NO_BUDGET[S.type];
      h='<div class="q"><h2>'+(nb?'When do you want to <span class="s">start</span>?':'Budget and <span class="s">timing</span>')+'</h2><p class="qsub">'+(nb?'We scope dashboards and portals together on a short call.':'This helps us suggest the right scope. Websites start from $100.')+'</p>'+
        (nb?'':'<span class="qlbl">Your budget</span><div class="opts" data-g="budget">'+BUDGETS.map(function(b){ return opt(b,b,'',S.budget===b); }).join('')+'</div>')+
        '<span class="qlbl">Start date</span><div class="opts four" data-g="time">'+TIMES.map(function(x){ return opt(x[0],x[0],x[1],S.time===x[0]); }).join('')+'</div></div>';
    }
    if(name==='details'){
      var d=S.d;
      h='<div class="q"><h2>Where should we send your <span class="s">proposal</span>?</h2><p class="qsub">We reply within 24 hours with questions or a written quote.</p>'+
        '<div class="f2"><div class="field"><label for="dName">Full name</label><input id="dName" autocomplete="name" value="'+esc(d.name)+'" placeholder="Jane Carter"></div>'+
        '<div class="field"><label for="dEmail">Email</label><input id="dEmail" type="email" autocomplete="email" value="'+esc(d.email)+'" placeholder="jane@company.com"></div>'+
        '<div class="field"><label for="dCompany">Company</label><input id="dCompany" autocomplete="organization" value="'+esc(d.company)+'" placeholder="Carter Family Dental"></div>'+
        '<div class="field"><label for="dPhone">Phone / WhatsApp (optional)</label><input id="dPhone" type="tel" autocomplete="tel" value="'+esc(d.phone)+'" placeholder="+1 555 010 0100"></div>'+
        '<div class="field"><label for="dSite">Current website (optional)</label><input id="dSite" value="'+esc(d.site)+'" placeholder="company.com"></div>'+
        '<div class="field"><label for="dCountry">Country</label><select id="dCountry">'+['United States','United Kingdom','Canada','Australia','Europe','Other'].map(function(c){return '<option'+(d.country===c?' selected':'')+'>'+c+'</option>';}).join('')+'</select></div></div>'+
        '<div class="field" style="margin-top:16px"><label for="dMsg">Tell us about the project</label><textarea id="dMsg" placeholder="What should it do? Any sites you like?">'+esc(d.msg)+'</textarea></div></div>';
    }
    if(name==='review'){
      var t2=T(), rows=[['Project',t2.l]];
      FOLLOW[t2.k].forEach(function(f){ if(S.ans[f.id]) rows.push([f.q.replace('?',''),[].concat(S.ans[f.id]).join(', ')]); });
      rows.push(['Extra features',S.extras.join(', ')||'None']);
      if(!NO_BUDGET[S.type]) rows.push(['Budget',S.budget]);
      rows.push(['Start',S.time],['Name',S.d.name],['Email',S.d.email],['Company',S.d.company],['Phone',S.d.phone||'—'],['Website',S.d.site||'—'],['Country',S.d.country],['Notes',S.d.msg||'—']);
      h='<div class="q"><h2>Everything look <span class="s">right</span>?</h2><p class="qsub">Go back to change anything, or send it over.</p><div class="review">'+rows.map(function(r){ return '<div><span>'+esc(r[0])+'</span><p>'+esc(r[1])+'</p></div>'; }).join('')+'</div></div>';
    }
    main.innerHTML=h+'<p class="err-msg" id="wErr" role="alert"></p><div class="wiz-nav"><button type="button" class="btn btn-o" id="wBack"'+(step?'':' hidden')+'>Back</button><span></span><button type="button" class="btn btn-a" id="wNext">'+(name==='review'?'Send request':'Continue')+' <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button></div>';
    bind(); side();
  }
  function bind(){
    main.querySelectorAll('[data-g]').forEach(function(g){
      var key=g.dataset.g, multi=g.dataset.multi;
      g.querySelectorAll('.opt').forEach(function(b){ b.onclick=function(){
        var v=b.dataset.v;
        if(multi){
          var arr=key==='extras'?S.extras:(S.ans[key.slice(2)]=S.ans[key.slice(2)]||[]);
          var i=arr.indexOf(v); if(i>-1) arr.splice(i,1); else arr.push(v); b.setAttribute('aria-pressed',String(i<0));
        } else {
          g.querySelectorAll('.opt').forEach(function(x){x.setAttribute('aria-pressed','false');}); b.setAttribute('aria-pressed','true');
          if(key==='type'){ if(S.type!==v){ S.ans={}; } S.type=v; }
          else if(key==='budget') S.budget=v; else if(key==='time') S.time=v; else S.ans[key.slice(2)]=v;
        }
        document.getElementById('wErr').textContent=''; side();
        if(key==='type'&&!REDUCED) setTimeout(next,280);
      }; });
    });
    document.getElementById('wNext').onclick=next;
    document.getElementById('wBack').onclick=function(){ save(); step--; render(); top(); };
  }
  function top(){ root.scrollIntoView({behavior:REDUCED?'auto':'smooth',block:'start'}); }
  function save(){ if(STEPS[step]!=='details') return; function v(id){ return document.getElementById(id).value.trim(); }
    S.d={name:v('dName'),email:v('dEmail'),company:v('dCompany'),phone:v('dPhone'),site:v('dSite'),country:v('dCountry'),msg:v('dMsg')}; }
  function err(m){ document.getElementById('wErr').textContent=m; }
  function next(){
    var name=STEPS[step];
    if(name==='type'&&!S.type) return err('Choose what you would like us to build.');
    if(name==='follow'){ var miss=FOLLOW[S.type].filter(function(f){ var a=S.ans[f.id]; return !a||(f.multi&&!a.length); }); if(miss.length) return err('Please answer: '+miss[0].q); }
    if(name==='plan'){ if(!NO_BUDGET[S.type]&&!S.budget) return err('Choose a budget range.'); if(!S.time) return err('Choose when you want to start.'); }
    if(name==='details'){
      save(); var bad=[];
      if((S.d.name||'').length<2) bad.push('dName'); if(!EMAIL_RE.test(S.d.email||'')) bad.push('dEmail'); if((S.d.company||'').length<2) bad.push('dCompany');
      main.querySelectorAll('.field.err').forEach(function(f){f.classList.remove('err');});
      if(bad.length){ bad.forEach(function(id){ document.getElementById(id).parentNode.classList.add('err'); }); document.getElementById(bad[0]).focus(); return err('Add your name, a valid email and your company name.'); }
    }
    if(name==='review') return submit();
    step++; render(); top();
  }
  function submit(){
    var t=T(), b=document.getElementById('wNext'), ref='BLW-'+String(Date.now()%100000).padStart(5,'0');
    var details={}; FOLLOW[t.k].forEach(function(f){ details[f.q]=[].concat(S.ans[f.id]).join(', '); });
    var payload={_subject:'New project request: '+t.l+' — '+S.d.company,reference:ref,project:t.l,answers:details,extras:S.extras.join(', '),budget:NO_BUDGET[S.type]?'(not asked)':S.budget,start:S.time,name:S.d.name,email:S.d.email,company:S.d.company,phone:S.d.phone,website:S.d.site,country:S.d.country,message:S.d.msg};
    b.disabled=true; b.textContent='Sending…';
    sendForm(payload,function(){
      bar.style.width='100%'; cnt.textContent='Sent ✓';
      main.innerHTML='<div class="done">'+TICK+'<h2>Request <span class="s">received</span></h2><p>Thank you, '+esc(S.d.name.split(' ')[0])+'. We will review your '+esc(t.l.toLowerCase())+' and email '+esc(S.d.email)+' within 24 hours.</p><span class="ref">Reference '+ref+'</span></div>';
      
    },function(){ b.disabled=false; b.textContent='Send request'; err('Your request did not send. Check your connection and try again, or message us on WhatsApp.'); });
  }
  var pre=(location.hash||'').slice(1); if(TYPES.some(function(t){return t.k===pre;})){ S.type=pre; step=1; }
  render();
})();

/* real-screenshot rotators */
(function(){
  var rs=document.querySelectorAll('[data-rot]'); if(!rs.length||REDUCED) return;
  rs.forEach(function(r,n){
    var imgs=r.querySelectorAll('img'), cap=r.querySelector('.cap-t'), i=0; if(imgs.length<2) return;
    setTimeout(function(){ setInterval(function(){ if(document.hidden) return; imgs[i].classList.remove('on'); i=(i+1)%imgs.length; imgs[i].classList.add('on'); if(cap) cap.innerHTML=imgs[i].dataset.cap||''; },3600); }, n*700);
  });
})();
/* filters built from static cards */
document.querySelectorAll('[data-filter]').forEach(function(f){
  var g=f.nextElementSibling, cards=g.querySelectorAll('[data-cat]'), cats={}, order=[];
  var NAMES={manufacturing:'Manufacturing',recruitment:'Recruitment',health:'Health & wellbeing',healthcare:'Healthcare',tech:'Tech & finance',agency:'Agencies & services',travel:'Travel, film & lifestyle',home:'Property, energy & home'};
  cards.forEach(function(c){ var k=c.dataset.cat; if(!cats[k]){ cats[k]=0; order.push(k);} cats[k]++; });
  function btn(k,label,n){ var b=document.createElement('button'); b.type='button'; b.className='filter'; b.setAttribute('aria-pressed',String(k==='all')); b.innerHTML=label+'<em>'+n+'</em>';
    b.onclick=function(){ f.querySelectorAll('.filter').forEach(function(x){x.setAttribute('aria-pressed','false');}); b.setAttribute('aria-pressed','true'); cards.forEach(function(c){ c.hidden=!(k==='all'||c.dataset.cat===k); c.classList.add('in'); }); };
    f.appendChild(b); }
  btn('all','All',cards.length); order.forEach(function(k){ btn(k,NAMES[k]||k,cats[k]); });
});

/* screen players: real client screens shown as an animation */
(function(){
  document.querySelectorAll('[data-player]').forEach(function(pl,n){
    var imgs=pl.querySelectorAll('.pl-stage img:not(.bgsite)'), labs=pl.querySelectorAll('.pl-steps span'), i=0, dur=2800, t=null;
    pl.style.setProperty('--dur',dur+'ms');
    function show(k){ i=k; imgs.forEach(function(im,j){ im.classList.toggle('on',j===i); });
      labs.forEach(function(l,j){ l.classList.remove('on'); l.classList.toggle('done',j<i); if(j===i){ void l.offsetWidth; l.classList.add('on'); } }); }
    function loop(){ clearInterval(t); t=setInterval(function(){ if(!document.hidden) show((i+1)%imgs.length); },dur); }
    labs.forEach(function(l,j){ l.addEventListener('click',function(e){ e.preventDefault(); e.stopPropagation(); show(j); loop(); }); });
    show(0); if(!REDUCED) setTimeout(loop,n*350);
  });
})();
