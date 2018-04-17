var y,x,mod;

window.addEventListener('scroll', getScroll);

function getScroll() {
	y = window.scrollY;
	x = window.innerHeight;
	mod = y / x;
	mod = Math.floor(mod * 10) / 10
	console.log(`linear-gradient(to top, rgba(0, 0, 0,0), rgba(${Math.floor(mod * 66)}, ${Math.floor(mod * 134)}, ${Math.floor(mod * 244)},1))`);
	updateColor();
}

function updateColor() {
	var filter = document.getElementById('filter');
	filter.style.background = `linear-gradient(to top, rgba(0, 0, 0,0), rgba(${Math.floor(mod * 66)}, ${Math.floor(mod * 134)}, ${Math.floor(mod * 244)},1))`;
}
