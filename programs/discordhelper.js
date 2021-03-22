var fps = 8,
	bar,
	animation = [],
	frame = 0;

window.addEventListener('load', function() {
	setInterval(animate, 1000 / fps);
	bar = document.getElementById('example');
	
	makeAnimation('c['  ,'**|**')
	makeAnimation('cb[' ,'```|```')
	makeAnimation('i['  ,'*|*')
	makeAnimation('b['  ,'**|**')
	makeAnimation('bi[' ,'***|***')
	makeAnimation('u['  ,'__|__')
	makeAnimation('ui[' ,'__*|*__')
	makeAnimation('ub[' ,'__**|**__')
	makeAnimation('ubi[','__***|***__')
	makeAnimation('s['  ,'~~|~~')
})

function animate() {
	bar.innerHTML = animation[frame];
	frame++;
	if(frame > animation.length - 1) frame = 0;
}

function makeAnimation(hotstring, result) {
	for(var i = 0; i < hotstring.length+1; i++) animation.push(hotstring.substr(0,i) + '|')
	for(var i = 0; i < 9; i++) animation.push(result)
	for(var i = 0; i < 6; i++) animation.push('|')
}