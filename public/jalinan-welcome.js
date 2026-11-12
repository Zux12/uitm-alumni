
(()=>{
 const dialog=document.getElementById('ai-welcome');
 let english=false;
 try{english=localStorage.getItem('jalinan-language')==='en'}catch{}
 const copy=english?{
 title:'Human stories. A new chapter with AI.',
 body:'Discover JALINAN, a UiTM alumni magazine exploring AI-managed publishing. The concept is for AI to select stories, prepare articles and refresh editions automatically, without routine human intervention.',
 status:'Current stage: interactive preview. AI-assisted articles and illustrations are on display; weekly story collection and automatic publishing are not yet active.',
 read:'Explore the magazine',close:'Close introduction',pause:'Pause countdown',resume:'Resume countdown',count:'Closing in'
 }:{
 title:'Kisah manusia. Bab baharu bersama AI.',
 body:'Kenali JALINAN, majalah alumni UiTM yang meneroka penerbitan diurus AI. Konsepnya ialah AI memilih cerita, menyediakan artikel dan mengemas kini edisi secara automatik, tanpa campur tangan manusia secara rutin.',
 status:'Status semasa: pratonton interaktif. Artikel berbantu AI dan ilustrasi dipaparkan; pengumpulan cerita mingguan serta penerbitan automatik belum diaktifkan.',
 read:'Terokai majalah',close:'Tutup pengenalan',pause:'Jeda kira detik',resume:'Sambung kira detik',count:'Ditutup dalam'
 };
 document.getElementById('ai-welcome-title').textContent=copy.title;
 document.getElementById('ai-welcome-copy').textContent=copy.body;
 document.getElementById('ai-welcome-status').textContent=copy.status;
 document.getElementById('ai-welcome-read').textContent=copy.read;
 document.getElementById('ai-welcome-close').setAttribute('aria-label',copy.close);
 const toggle=document.getElementById('ai-welcome-timer'),fill=document.getElementById('ai-welcome-progress-fill');
 let remaining=30,paused=false,timer;
 function paint(){toggle.textContent=paused?copy.resume:copy.count+' '+remaining+'s · '+copy.pause;toggle.setAttribute('aria-pressed',String(paused));fill.style.width=(remaining/30*100)+'%'}
 function close(){dialog.close()}
 toggle.addEventListener('click',()=>{paused=!paused;paint()});
 document.getElementById('ai-welcome-close').addEventListener('click',close);
 document.getElementById('ai-welcome-read').addEventListener('click',close);
 dialog.addEventListener('close',()=>{clearInterval(timer);document.getElementById('book').focus({preventScroll:true})});
 paint();
 if(typeof dialog.showModal==='function'){
  dialog.showModal();
  timer=setInterval(()=>{if(paused||document.hidden)return;remaining--;paint();if(remaining<=0)close()},1000);
 }
})();
