(function(root){
 'use strict';
 const DAY=86400000;
 const timestamp=d=>Date.parse(d+'T00:00:00Z');
 function planned(a,day,baseline=true){const p=baseline?a.baseline:a.plan;const start=timestamp(p.start),finish=timestamp(p.finish),at=timestamp(day);if(at<start)return 0;if(at>=finish)return 100;return 100*(at-start)/Math.max(DAY,finish-start);}
 function actual(a,day){const updates=a.updates.filter(u=>u.asOf<=day);return updates.length?updates.at(-1).progress:0;}
 function aggregate(rows,day,baseline=true,actuals=false){let total=0,value=0;for(const a of rows){const weight=a.baseline.weight||1;total+=weight;value+=weight*(actuals?actual(a,day):planned(a,day,baseline));}return total?value/total:0;}
 function bounds(rows,day){const dates=rows.flatMap(a=>[a.baseline.start,a.baseline.finish,a.plan.start,a.plan.finish,a.actualStart,a.actualFinish,...a.updates.map(u=>u.asOf)]).filter(Boolean);dates.push(day);dates.sort();return [dates[0],dates.at(-1)];}
 const api={planned,actual,aggregate,bounds,timestamp,DAY};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.TeamProgress=api;
})(typeof window==='undefined'?globalThis:window);
