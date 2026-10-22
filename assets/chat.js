/* ============================================================
   Blewspace Assistant — floating chat widget
   - Answers ONLY about Blewspace (services, prices, work, process, contact).
   - Off-topic questions get a polite refusal plus contact details.
   - Can show a contact card and an in-chat booking form.
   SET CHAT_API_URL to your deployed api/chat endpoint to use real AI
   (e.g. 'https://your-project.vercel.app/api/chat'). Empty = built-in answers.
   ============================================================ */
var CHAT_API_URL = '';

(function(){
  var EMAIL='hello@blewspace.com', WA='+92 334 050 0622', WA_LINK='https://wa.me/923340500622';
  var R = (typeof REDUCED!=='undefined') ? REDUCED : false;
  function page(p){ return document.querySelector('.pg') ? '#'+p : (p==='home'?'index.html':p+'.html'); }
  function L(text,href){ return '<a href="'+href+'">'+text+'</a>'; }

  /* ---------- knowledge base (only facts published on this site) ---------- */
  var KB = [
    {k:/\b(hi|hello|hey|salam|assalam|good (morning|afternoon|evening))\b/i, a:"Hi! I'm the Blewspace assistant. Ask me about our services, prices, past work or how to start a project.", chips:['Services','Prices','Book a call']},
    {k:/\b(thank|thanks|thx|great|perfect|awesome)\b/i, a:"You're welcome! Anything else about your project I can help with?", chips:['Book a call','Contact']},
    {k:/\b(price|pricing|cost|costs|how much|budget|rate|rates|charge|quote|fee|fees|\$)\b/i, a:"Websites start from <b>$100</b> and admin dashboards from <b>$250</b>. Online stores, booking systems, client portals, web apps, online tools and AI chatbots get a fixed quote after a short call. No hourly billing.", chips:['Book a call','What do you build?']},
    {k:/\b(dashboard|dashboards|admin panel|pos|point of sale|inventory|pharmacy|clinic system|crm|erp|portal|portals)\b/i, a:"We build admin dashboards from <b>$250</b>, plus POS, pharmacy, clinic, finance and construction systems, and client or vendor portals. See "+L('Business Systems',page('case-systems'))+" for live demos.", chips:['Book a call','Prices']},
    {k:/\b(shopify|woocommerce|woo|store|stores|e-?commerce|shop|sell online|products)\b/i, a:"We build Shopify and WooCommerce stores, and custom Next.js stores when speed matters. Examples: "+L('Supplement Stores',page('case-supplements'))+" and "+L('Fashion Stores',page('case-fashion'))+". Stores get a fixed quote after a short call.", chips:['Book a call','Prices']},
    {k:/\b(booking|appointment|appointments|calendar|reservation|schedule system)\b/i, a:"Yes, we build online booking systems: live slots, deposits, reminder emails and an admin view. See "+L('Suburban Neurology',page('case-suburban'))+" and "+L('City Tour Kiosk',page('case-citytourkiosk'))+".", chips:['Book a call','Prices']},
    {k:/\b(kiosk|kiosks|touch ?screen)\b/i, a:"We built City Tour Kiosk, a touchscreen booking kiosk selling 65+ experiences in New York and Spain. "+L('Read the case study',page('case-citytourkiosk'))+".", chips:['Book a call']},
    {k:/\b(ai|chatbot|chat bot|assistant|gpt|automation)\b/i, a:"We build AI chat assistants trained on a business's services and prices, quote bots and automations. See "+L('AI chatbots',page('work-ai'))+".", chips:['Book a call','Prices']},
    {k:/\b(tool|tools|calculator|calculators|toollantern|converter)\b/i, a:"We build SEO-focused online tools and calculators, like ToolLantern, plus quote calculators for client sites. See "+L('Online tools',page('work-tools'))+".", chips:['Book a call']},
    {k:/\b(wordpress|elementor|webflow|next\.?js|react|platform|cms|php|laravel)\b/i, a:"We work with WordPress, WooCommerce, Shopify, Webflow and custom Next.js/React, plus PHP and MySQL for systems. We recommend the best fit on a short call.", chips:['Book a call','Prices']},
    {k:/\b(how long|timeline|time frame|turnaround|deadline|when|fast|quick|days|weeks)\b/i, a:"A 5-page website usually goes live in one to two weeks once we have your content. Stores and booking systems take a few weeks; larger systems are scheduled in the quote. We can usually start the same week.", chips:['Book a call','Prices']},
    {k:/\b(process|steps|how do you work|how does it work|workflow)\b/i, a:"Five steps: 1) discovery call, 2) written proposal and fixed price within 48 hours, 3) design of the main screen for your approval, 4) build and test on a private preview link, 5) launch, plus 30 days of free fixes.", chips:['Book a call']},
    {k:/\b(pay|payment|payments|deposit|milestone|invoice|paypal|bank)\b/i, a:"Small projects: a deposit and a final payment at launch. Larger systems: milestone payments as each stage is approved. You get one fixed written quote first.", chips:['Book a call','Prices']},
    {k:/\b(after launch|support|maintenance|care plan|update|updates|backup|hosting|domain)\b/i, a:"After launch you get 30 days of free fixes. We then offer monthly care for updates, backups and small changes. We also connect your domain and email at launch.", chips:['Book a call','Contact']},
    {k:/\b(content|copy|copywriting|write the (text|content))\b/i, a:"You don't need to write the content. Send rough notes or your old site and we write and arrange the copy. You approve every page.", chips:['Book a call']},
    {k:/\b(seo|google|rank|ranking|speed)\b/i, a:"Every site gets on-page SEO setup and is tested for speed on real phones. Fast pages rank better and convert better.", chips:['Book a call']},
    {k:/\b(own|ownership|code|lock-?in)\b/i, a:"You own everything: domain, code, content and logins, from day one. No lock-in.", chips:['Book a call']},
    {k:/\b(website|websites|landing page|site|redesign|web design|business site)\b/i, a:"Business websites start from <b>$100</b>: mobile-first design, contact forms and SEO setup. We also do redesigns. We've launched 40+ live sites; see "+L('Websites',page('work-websites'))+".", chips:['Book a call','How long does it take?']},
    {k:/\b(portfolio|work|projects|examples|case stud|clients|past work|samples)\b/i, a:"We have 9 in-depth case studies and 50+ live sites. Start with "+L('Our work',page('work'))+", or jump to "+L('Websites',page('work-websites'))+", "+L('E-commerce',page('work-ecommerce'))+" or "+L('Dashboards',page('work-dashboards'))+".", chips:['Book a call']},
    {k:/\b(where|location|based|country|time ?zone|uk|usa|europe|remote)\b/i, a:"Blewspace is a remote studio serving the US, UK and Europe. We reply within 24 hours on business days, covering US mornings and UK afternoons.", chips:['Contact','Book a call']},
    {k:/\b(about (you|blewspace|your (company|studio|team))|who are you|who is blewspace|your (company|team|studio|experience)|how many years|how experienced)\b/i, a:"Blewspace is a web studio that has shipped 60+ live websites and systems over 7+ years. You work directly with the people who design and write the code. "+L('About us',page('about'))+".", chips:['Our work','Book a call']},
    {k:/\b(contact|email|e-mail|whatsapp|phone|call you|reach|talk to)\b/i, a:"Here's how to reach us. We reply within 24 hours.", card:'contact'},
    {k:/\b(book|booking a call|meeting|consult|consultation|start|hire|get started|start a project|proposal)\b/i, a:"Great! Share a few details and we'll reply within 24 hours with a time and next steps.", card:'book'},
    {k:/\b(services|what do you (do|build|offer)|offer|capabilit)\b/i, a:"We build business websites, Shopify and WooCommerce stores, booking systems, admin dashboards, client portals, web apps, online tools and AI chatbots. "+L('See services',page('services'))+".", chips:['Prices','Our work','Book a call']}
  ];
  var CHIPMAP={'Services':'What services do you offer?','Prices':'How much does it cost?','Book a call':'I want to book a call','Contact':'How can I contact you?','What do you build?':'What do you build?','How long does it take?':'How long does it take?','Our work':'Show me your work'};
  var OFF="I can only help with questions about Blewspace: our services, prices, work and how to start a project. For anything else, please contact us directly.";

  var OFFTOPIC=/\b(poem|joke|story|recipe|cook|weather|capital of|president|prime minister|homework|essay|translate|cricket|football|movie|movies|song|lyrics|bitcoin|crypto|stock|medical|doctor advice|diagnos|girlfriend|boyfriend|religion|politic|math|solve|equation|chatgpt|python code|javascript code|write code|debug)\b/i;
  function ruleAnswer(q){
    var t=q.toLowerCase();
    if(OFFTOPIC.test(t)) return {a:OFF, card:'contact'};
    for(var i=0;i<KB.length;i++){ if(KB[i].k.test(t)) return KB[i]; }
    return {a:OFF, card:'contact'};
  }

  /* ---------- UI ---------- */
  var wrap=document.createElement('div'); wrap.className='bw-chat';
  wrap.innerHTML='<button type="button" class="bw-fab" aria-label="Open chat" aria-expanded="false"><span class="bw-av"></span><span class="bw-fab-t">Ask Blewspace</span><span class="bw-ping"></span></button>'+
    '<section class="bw-panel" role="dialog" aria-label="Blewspace assistant" hidden><header class="bw-head"><span class="bw-av"></span><div><b>Blewspace Assistant</b><small><i></i>Online · replies instantly</small></div><button type="button" class="bw-x" aria-label="Close chat">×</button></header>'+
    '<div class="bw-log" aria-live="polite"></div><div class="bw-chips"></div>'+
    '<form class="bw-in"><input type="text" placeholder="Ask about services, prices, our work…" aria-label="Your message" maxlength="400" autocomplete="off"><button type="submit" aria-label="Send">'+
    '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button></form><p class="bw-foot">Answers about Blewspace only</p></section>';
  document.body.appendChild(wrap);
  var fab=wrap.querySelector('.bw-fab'), panel=wrap.querySelector('.bw-panel'), log=wrap.querySelector('.bw-log'), chips=wrap.querySelector('.bw-chips'), form=wrap.querySelector('.bw-in'), inp=form.querySelector('input');
  var history=[], started=false;

  function open(){ panel.hidden=false; wrap.classList.add('open'); fab.setAttribute('aria-expanded','true');
    if(!started){ started=true; bot("Hi! I'm the Blewspace assistant. I can tell you about our services, prices, past work and how to start a project.", null, ['Services','Prices','Our work','Book a call']); }
    setTimeout(function(){ inp.focus(); },50); }
  function close(){ panel.hidden=true; wrap.classList.remove('open'); fab.setAttribute('aria-expanded','false'); }
  fab.onclick=function(){ panel.hidden?open():close(); };
  wrap.querySelector('.bw-x').onclick=close;
  document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&!panel.hidden) close(); });
  document.querySelectorAll('[data-open-chat]').forEach(function(b){ b.addEventListener('click',function(e){ e.preventDefault(); open(); }); });

  function esc(s){ return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }
  function scroll(){ log.scrollTop=log.scrollHeight; }
  function user(t){ var d=document.createElement('div'); d.className='bw-m u'; d.textContent=t; log.appendChild(d); scroll(); }
  function setChips(list){ chips.innerHTML=''; (list||[]).forEach(function(c){ var b=document.createElement('button'); b.type='button'; b.textContent=c; b.onclick=function(){ send(CHIPMAP[c]||c); }; chips.appendChild(b); }); }
  function typing(){ var d=document.createElement('div'); d.className='bw-m b bw-typing'; d.innerHTML='<i></i><i></i><i></i>'; log.appendChild(d); scroll(); return d; }
  function bot(html, card, chipList){
    var d=document.createElement('div'); d.className='bw-m b'; d.innerHTML=html; log.appendChild(d);
    if(card==='contact') log.appendChild(contactCard());
    if(card==='book') log.appendChild(bookCard());
    setChips(chipList || (card ? [] : ['Book a call','Contact'])); scroll();
  }

  function contactCard(){
    var c=document.createElement('div'); c.className='bw-card';
    c.innerHTML='<div class="bw-row"><span class="bw-ic">@</span><div><small>Email</small><b>'+EMAIL+'</b></div><button type="button" class="bw-copy">Copy</button></div>'+
      '<div class="bw-row"><span class="bw-ic">✆</span><div><small>WhatsApp</small><b>'+WA+'</b></div><a class="bw-copy" href="'+WA_LINK+'" target="_blank" rel="noopener">Open</a></div>'+
      '<button type="button" class="bw-cta">Book a call →</button>';
    c.querySelector('button.bw-copy').onclick=function(){ var b=this; if(navigator.clipboard) navigator.clipboard.writeText(EMAIL).then(function(){ b.textContent='Copied'; },function(){ b.textContent='Select it'; }); };
    c.querySelector('.bw-cta').onclick=function(){ send('I want to book a call'); };
    return c;
  }
  function nextDays(n){ var out=[],d=new Date(); d.setHours(0,0,0,0); d.setDate(d.getDate()+1); while(out.length<n){ var w=d.getDay(); if(w&&w!==6) out.push(new Date(d)); d.setDate(d.getDate()+1);} return out; }
  function bookCard(){
    var c=document.createElement('form'); c.className='bw-card bw-book'; c.noValidate=true;
    var days=nextDays(6).map(function(d){ return d.toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'}); });
    c.innerHTML='<b class="bw-ct">Book a free project call</b>'+
      '<label>Name<input name="name" autocomplete="name" placeholder="Jane Carter"></label>'+
      '<label>Email<input name="email" type="email" autocomplete="email" placeholder="jane@company.com"></label>'+
      '<label>What do you need?<select name="service"><option>Website</option><option>Online store</option><option>Booking system</option><option>Dashboard or portal</option><option>Web app</option><option>AI chatbot</option><option>Not sure yet</option></select></label>'+
      '<div class="bw-2"><label>Day<select name="day">'+days.map(function(d){return '<option>'+d+'</option>';}).join('')+'</select></label>'+
      '<label>Time<select name="time"><option>Morning (US ET)</option><option>Afternoon (US ET)</option><option>UK morning</option><option>UK afternoon</option></select></label></div>'+
      '<label>Notes (optional)<textarea name="msg" rows="2" placeholder="A few words about the project"></textarea></label>'+
      '<p class="bw-err" role="alert"></p><button type="submit" class="bw-cta">Request call →</button>';
    c.addEventListener('submit',function(e){
      e.preventDefault(); var f=c.elements, err=c.querySelector('.bw-err');
      var name=f.name.value.trim(), email=f.email.value.trim();
      if(name.length<2||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ err.textContent='Add your name and a valid email.'; return; }
      err.textContent=''; var btn=c.querySelector('button'); btn.disabled=true; btn.textContent='Sending…';
      var payload={_subject:'Chat call request: '+f.service.value+' — '+name,name:name,email:email,service:f.service.value,day:f.day.value,time:f.time.value,message:f.msg.value.trim(),source:'Website chat'};
      var done=function(){ c.innerHTML='<b class="bw-ct">✓ Request received</b><p class="bw-ok">Thanks, '+esc(name.split(' ')[0])+'. We will email '+esc(email)+' within 24 hours to confirm '+esc(f.day.value)+'.</p>'; setChips(['Our work','Prices']); scroll(); };
      var fail=function(){ btn.disabled=false; btn.textContent='Request call →'; err.textContent='Could not send. Please email '+EMAIL+' or use WhatsApp.'; };
      if(typeof sendForm==='function') sendForm(payload,done,fail); else done();
    });
    return c;
  }

  function send(text){
    text=String(text||'').trim(); if(!text) return;
    user(text); inp.value=''; setChips([]);
    history.push({role:'user',content:text}); if(history.length>12) history=history.slice(-12);
    var t=typing();
    function local(){ var r=ruleAnswer(text); setTimeout(function(){ t.remove(); bot(r.a, r.card, r.chips); history.push({role:'assistant',content:r.a.replace(/<[^>]+>/g,'')}); }, R?0:550); }
    if(!CHAT_API_URL){ local(); return; }
    fetch(CHAT_API_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:history})})
      .then(function(r){ if(!r.ok) throw 0; return r.json(); })
      .then(function(j){
        var reply=String(j.reply||''); if(!reply) throw 0;
        var card=null; if(/\[\[BOOK\]\]/.test(reply)) card='book'; else if(/\[\[CONTACT\]\]/.test(reply)) card='contact';
        reply=reply.replace(/\[\[(BOOK|CONTACT)\]\]/g,'').trim();
        t.remove(); bot(esc(reply).replace(/\n/g,'<br>'), card);
        history.push({role:'assistant',content:reply});
      }).catch(function(){ t.remove(); var r=ruleAnswer(text); bot(r.a, r.card, r.chips); });
  }
  form.addEventListener('submit',function(e){ e.preventDefault(); send(inp.value); });

  /* nudge once after 8s on first visit to a page */
  setTimeout(function(){ if(panel.hidden && !started) fab.classList.add('nudge'); }, 8000);
})();
