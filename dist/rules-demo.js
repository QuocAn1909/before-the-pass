(function(){
const svg=document.getElementById('rulesField'),caption=document.getElementById('ruleText');if(!svg)return;
const scenes={
offside:{passer:[29,48],runner:[77,28],defenders:[[63,22],[63,48]],end:[77,28],text:'OFFSIDE: Freeze at the moment the passer strikes the ball. The receiver is beyond the second-last opponent and becomes involved in play.'},
onside:{passer:[29,48],runner:[59,28],defenders:[[63,22],[63,48]],end:[59,28],text:'ONSIDE: The receiver is level with or behind the second-last opponent when the passer touches the ball.'},
corner:{passer:[95,66],runner:[81,32],defenders:[[81,27],[88,38]],end:[81,32],text:'CORNER: The player at the corner flag kicks the ball toward a teammate in front of goal.'},
penalty:{passer:[71,35],runner:[88,35],defenders:[[95,35],[68,15]],end:[97,30],text:'PENALTY: The designated kicker strikes from the penalty mark toward goal. Defending players must obey positioning rules.'},
throwin:{passer:[4,49],runner:[34,30],defenders:[[48,38],[65,28]],end:[34,30],text:'THROW-IN: The thrower stands beyond the sideline and throws with both hands from behind and over the head to a teammate.'},
goalkick:{passer:[90,40],runner:[62,28],defenders:[[49,22],[45,49]],end:[62,28],text:'GOAL KICK: The player restarts from the goal area and passes toward a teammate.'}
};
function dot(pos,color,label){return '<g><circle cx="'+pos[0]+'" cy="'+pos[1]+'" r="3.3" fill="'+color+'" stroke="#102b1d" stroke-width=".5"/><text x="'+pos[0]+'" y="'+(pos[1]+1.15)+'" text-anchor="middle" font-size="3.0" fill="#122b21" font-weight="700">'+label+'</text></g>';}
function draw(key){
 const c=scenes[key];if(!c)return;
 svg.innerHTML='<rect width="100" height="70" rx="2" fill="#1f633d"/><g fill="none" stroke="#d8efdf" stroke-width=".5"><rect x="2" y="2" width="96" height="66"/><path d="M50 2 V68 M77 18 H98 V52 H77"/><circle cx="50" cy="35" r="9"/></g>'+(key==='offside'||key==='onside'?'<path d="M63 2 V68" stroke="#ffdd70" stroke-dasharray="2 1" stroke-width=".8"/>':'')+dot(c.passer,'#fff','P')+dot(c.runner,'#e9fc8f','R')+c.defenders.map((p,i)=>dot(p,'#ff947e','D'+(i+1))).join('')+'<path id="ballTrack" stroke="#fff58e" stroke-dasharray="2 1" stroke-width=".8" d="M'+c.passer.join(' ')+' L'+c.end.join(' ')+'"/><circle id="teachingBall" cx="'+c.passer[0]+'" cy="'+c.passer[1]+'" r="1.6" fill="#141b16" stroke="white" stroke-width=".5"/><text x="5" y="9" fill="#fff" font-size="3.5">P = PASSER · R = RECEIVER · D = DEFENDER</text>';
 caption.textContent=c.text;
 const ball=svg.querySelector('#teachingBall');if(ball.animate)ball.animate([{cx:c.passer[0],cy:c.passer[1]},{cx:c.end[0],cy:c.end[1]}],{duration:1800,fill:'forwards',easing:'ease-in-out'});
}
document.querySelectorAll('[data-rule]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-rule]').forEach(x=>x.classList.toggle('active',x===b));draw(b.dataset.rule);}));draw('offside');
})();