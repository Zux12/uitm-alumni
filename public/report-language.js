'use strict';
window.ReportLanguage=(()=>{
 const dict=window.TeamTranslations,key='ican-report-language';let language='en';try{if(localStorage.getItem(key)==='ms')language='ms';}catch{}
 const t=s=>{if(language!=='ms')return s;if(dict[s])return dict[s];for(const prefix of ['Last saved:','Unable to connect:'])if(typeof s==='string'&&s.startsWith(prefix))return dict[prefix]+s.slice(prefix.length);return s;};
 function set(node,text){node.dataset.reportI18n=String(text);node.textContent=t(text);return node;}
 function refresh(){document.documentElement.lang=language;document.title=t('ICAN Alumni Reporting');document.querySelectorAll('[data-report-i18n]').forEach(n=>n.textContent=t(n.dataset.reportI18n));document.querySelectorAll('[data-report-placeholder]').forEach(n=>n.placeholder=t(n.dataset.reportPlaceholder));document.querySelectorAll('[data-report-label]').forEach(n=>n.setAttribute('aria-label',t(n.dataset.reportLabel)));document.querySelectorAll('[data-report-language]').forEach(n=>{const active=n.dataset.reportLanguage===language;n.classList.toggle('selected',active);n.setAttribute('aria-pressed',String(active));});}
 function choose(next){if(!['ms','en'].includes(next))return;language=next;try{localStorage.setItem(key,next);}catch{}refresh();window.dispatchEvent(new CustomEvent('ican-report-language-change'));}
 document.addEventListener('click',e=>{const b=e.target.closest('[data-report-language]');if(b)choose(b.dataset.reportLanguage);});document.addEventListener('DOMContentLoaded',refresh);
 return {t,set,refresh,choose,get language(){return language;}};
})();
