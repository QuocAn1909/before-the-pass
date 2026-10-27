(function(root){
const shapes={'4-3-3':[4,3,3],'4-2-3-1':[4,2,3,1],'4-4-2':[4,4,2],'3-5-2':[3,5,2],'3-4-3':[3,4,3],'5-3-2':[5,3,2],'4-1-4-1':[4,1,4,1],'4-3-2-1':[4,3,2,1]};
function layout(name,ours=true){
 const groups=shapes[name]||shapes['4-3-3'];const numbers=[2,3,4,5,6,7,8,9,10,11];const out=[{shirt:1,x:50,y:ours?99:13,role:'GK'}];let i=0;
 groups.forEach((count,row)=>{const y=ours?84-row*(61/(groups.length-1||1)):28+row*(61/(groups.length-1||1));for(let n=0;n<count;n++)out.push({shirt:numbers[i++],x:50+(n-(count-1)/2)*Math.min(17,76/count),y,role:row===0?'DEF':row===groups.length-1?'FWD':'MID'});});return out;
}
const api={shapes,layout};if(typeof module!=='undefined')module.exports=api;root.Formations=api;
})(typeof window!=='undefined'?window:globalThis);
