(function(root){
const shapes={'4-3-3':[4,3,3],'4-2-3-1':[4,2,3,1],'4-4-2':[4,4,2],'3-5-2':[3,5,2],'3-4-3':[3,4,3],'5-3-2':[5,3,2],'4-1-4-1':[4,1,4,1],'4-3-2-1':[4,3,2,1]};
function layout(name,ours=true){const rows=shapes[name]||shapes['4-3-3'],numbers=[2,3,4,5,6,7,8,9,10,11];let k=0;const out=[{shirt:1,x:50,y:ours?102:10,role:'GK'}];rows.forEach((count,i)=>{const depth=(i+1)/(rows.length+1),y=ours?103-depth*84:9+depth*84;for(let j=0;j<count;j++)out.push({shirt:numbers[k++],x:50+(j-(count-1)/2)*Math.min(18,78/Math.max(1,count-1)),y,role:i===0?'DEF':i===rows.length-1?'FWD':'MID'});});return out;}
const api={shapes,layout};if(typeof module!=='undefined')module.exports=api;root.Formations=api;
})(typeof window!=='undefined'?window:globalThis);