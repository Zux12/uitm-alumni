'use strict';
window.TeamLanguage = (() => {
 const dictionary=window.TeamTranslations, key='ican-team-language';
 let language='en';try{if(localStorage.getItem(key)==='ms')language='ms';}catch{}
 const t=value=>{if(language!=='ms')return value;if(dictionary[value])return dictionary[value];if(typeof value==='string'&&value.startsWith('Enter a valid ')&&value.endsWith('.'))return 'Sila isi medan ini dengan nilai yang sah: '+(dictionary[value.slice(14,-1)]||value.slice(14,-1))+'.';if(typeof value==='string'&&value.startsWith('Your account is '))return 'Status akaun anda: '+(dictionary[value.slice(16,-1)]||value.slice(16,-1))+'.';return value;};
 const keys=Object.keys(dictionary).sort((a,b)=>b.length-a.length);
 const escape=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 const words=new RegExp('(?<![\\p{L}])(?:'+keys.map(escape).join('|')+')(?![\\p{L}])','gu');
 function fragment(text){return language==='ms'?text.replace(words,s=>dictionary[s]):text;}
 function html(source){if(language==='en')return source;return source.split(/(<[^>]*>)/g).map(part=>part.startsWith('<')?part.replace(/(aria-label|placeholder|title)="([^"]*)"/g,(_,attr,value)=>attr+'="'+fragment(value)+'"'):fragment(part)).join('');}
 const originals=new WeakMap();
 function staticPage(){for(const root of document.querySelectorAll('[data-language-static]')){const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let node;while(node=walker.nextNode()){if(node.parentElement.closest('script,style,[data-language-selector]'))continue;if(!originals.has(node))originals.set(node,node.nodeValue);node.nodeValue=fragment(originals.get(node));}for(const el of [root,...root.querySelectorAll('[aria-label]')].filter(el=>el.hasAttribute('aria-label'))){if(!el.dataset.originalLabel)el.dataset.originalLabel=el.getAttribute('aria-label');el.setAttribute('aria-label',t(el.dataset.originalLabel));}}
 document.documentElement.lang=language;document.title=language==='ms'?'Ruang Kerja Pasukan ICAN | UiTM':'ICAN Team Workspace | UiTM';
 document.querySelectorAll('[data-language]').forEach(b=>{const active=b.dataset.language===language;b.setAttribute('aria-pressed',String(active));b.classList.toggle('selected',active);});}
 function choose(next){if(!['en','ms'].includes(next))return;language=next;try{localStorage.setItem(key,next);}catch{}staticPage();window.dispatchEvent(new CustomEvent('ican-language-change'));}
 document.addEventListener('click',event=>{const button=event.target.closest('[data-language]');if(button)choose(button.dataset.language);});
 window.addEventListener('storage',event=>{if(event.key===key)choose(event.newValue==='ms'?'ms':'en');});
 document.addEventListener('DOMContentLoaded',staticPage);
 return {t,html,staticPage,get language(){return language;},choose};
})();
