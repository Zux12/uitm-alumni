const schema=require('../public/schema.json');
function validateReport(input,submit=false){
 if(!input || !['programme','convocation'].includes(input.kind))throw Error('Choose a report type.');
 const groups=schema.filter(g=>input.kind==='convocation'?g.id==='convocation':g.id!=='convocation');
 const data={};for(const f of groups.flatMap(g=>g.fields)){
  let v=input.data?.[f.key];if(v===undefined||v===null||v===''){if(submit&&f.required)throw Error(f.label+' is required.');data[f.key]='';continue;}
  if(f.type==='number'){v=Number(v);if(!Number.isFinite(v)||v<0||v>1e12||(f.integer&&!Number.isInteger(v)))throw Error('Invalid '+f.label);}
  else{if(typeof v!=='string'||v.length>10000)throw Error('Invalid '+f.label);v=v.trim();if(submit&&f.required&&!v)throw Error(f.label+' is required.');if(f.options.length&&!f.options.includes(v))throw Error('Invalid '+f.label);}
  data[f.key]=v;
 }
 if(data.start_date&&data.end_date&&data.start_date>data.end_date)throw Error('End date must be on or after start date.');
 const booths=[];if(input.kind==='convocation'){
  if(!Array.isArray(input.booths)||input.booths.length>50)throw Error('Maximum 50 booths.');
  for(const b of input.booths){const row={};for(const k of ['name','products','person','shift']){if(typeof b[k]!=='string'||b[k].length>1000)throw Error('Invalid booth details.');row[k]=b[k].trim();}for(const k of ['target','actual']){row[k]=b[k]===''?'':Number(b[k]);if(row[k]!==''&&(!Number.isFinite(row[k])||row[k]<0))throw Error('Invalid booth sales.');}booths.push(row);}
 }
 return {kind:input.kind,data,booths};
}
function canAccess(user,report){return !!user&&!!report&&(user.role==='admin'||report.owner===user.username);}
module.exports={validateReport,canAccess};
