(function(){
const svg=document.getElementById('rulesField'),caption=document.getElementById('ruleText');if(!svg)return;
const cases={
 offside:{attacker:[67,26],defender:[58,30],ball:[33,44],pass:[67,26],text:'OFFSIDE: At the moment the teammate passes, the attacker is closer to the goal line than both the ball and the second-last defender. If involved in play, an indirect free kick is awarded.'},
 onside:{attacker:[51,26],defender:[58,30],ball:[33,44],pass:[51,26],text:'ONSIDE: The attacker is level with or behind the second-last opponent when the ball is played. The pass can continue.'},
 corner:{attacker:[93,7],defender:[56,25],ball:[93,7],pass:[50,15],text:'CORNER KICK: The defender touched the ball last before it went over the goal line. The ball is kicked from the corner arc.'},
 penalty:{attacker:[50,48],defender:[50,10],ball:[50,44],pass:[50,6],text:'PENALTY KICK: After a qualifying direct-free-kick offense in the defending team’s penalty area, the attacking team shoots from the penalty spot.'}
};
function draw(which){
 const c=cases[which];if(!c)return;
 svg.innerHTML='<rect width="100" height="70" rx="2" fill="#1e623f"/><g fill="none" stroke="#d9efdf" stroke-width=".5"><rect x="2" y="2" width="96" height="66"/><path d="M50 2 V68 M77 18 H98 V52 H77"/><circle cx="50" cy="35" r="9"/></g><path id="passLine" stroke="#faff85" stroke-width=".9" stroke-dasharray="2 2" d="M'+c.ball[0]+' '+c.ball[1]+' L'+c.pass[0]+' '+c.pass[1]+'"/><circle id="receiver" cx="'+c.attacker[0]+'" cy="'+c.attacker[1]+'" r="3.4" fill="#fff"/><circle cx="'+c.defender[0]+'" cy="'+c.defender[1]+'" r="3.4" fill="#ff826d"/><circle id="ruleBall" cx="'+c.ball[0]+'" cy="'+c.ball[1]+'" r="1.5" fill="#101514" stroke="#fff" stroke-width=".5"/><text x="5" y="9" fill="#fff" font-size="3.8">WHITE = ATTACK / RED = DEFENSE</text>';
 caption.textContent=c.text;
 const ball=svg.querySelector('#ruleBall');if(ball.animate)ball.animate([{cx:c.ball[0],cy:c.ball[1]},{cx:c.pass[0],cy:c.pass[1]}],{duration:1300,fill:'forwards',easing:'ease-in-out'});
}
document.querySelectorAll('[data-rule]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-rule]').forEach(x=>x.classList.toggle('active',x===b));draw(b.dataset.rule)}));draw('offside');
})();