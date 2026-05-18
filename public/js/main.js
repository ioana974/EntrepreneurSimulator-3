// --- Loader ---
const loaderContainer = document.querySelector('.loader-container');
const progressBar = document.querySelector('.progress-bar');
const percentageText = document.querySelector('.percentage');

let progress = 0;
const interval = setInterval(()=>{
  progress += 2;
  progressBar.style.width = `${progress}%`;
  percentageText.textContent = `${progress}%`;

  if(progress >= 100){
    clearInterval(interval);
    loaderContainer.style.display = 'none';
  }
}, 50);

// --- Background particule ---
const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');
const hero = document.getElementById('home') || document.body;
function resizeCanvas(){
  // Size canvas to fill the entire hero viewport (window height - navbar height)
  const navHeight = document.querySelector('.navbar')?.offsetHeight || 80;
  canvas.width = window.innerWidth;
  canvas.height = Math.max(window.innerHeight - navHeight, hero.clientHeight);
  hero.style.minHeight = `calc(100vh - ${navHeight}px)`;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
window.addEventListener('orientationchange', resizeCanvas);

let particles = [];
class Particle {
  constructor(){
    this.x=Math.random()*canvas.width;
    this.y=Math.random()*canvas.height;
    this.size=Math.random()*3+1;
    this.speedX=(Math.random()-0.5)*1.5;
    this.speedY=(Math.random()-0.5)*1.5;
    // yellow-ish particles (#ffd700)
    this.color=`rgba(255,215,0,${0.3 + Math.random()*0.7})`;
  }
  update(){
    this.x+=this.speedX; this.y+=this.speedY;
    if(this.x<0||this.x>canvas.width) this.speedX*=-1;
    if(this.y<0||this.y>canvas.height) this.speedY*=-1;
  }
  draw(){
    ctx.fillStyle=this.color;
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fill();
  }
}

for(let i=0;i<120;i++) particles.push(new Particle());
function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{p.update();p.draw();});
  requestAnimationFrame(animate);
}
animate();

// Interacțiune cu cursor
canvas.addEventListener('mousemove', e=>{
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;
  particles.forEach(p=>{
    let dx=mx-p.x, dy=my-p.y, dist=Math.sqrt(dx*dx+dy*dy);
    if(dist<100){ p.x-=dx*0.01; p.y-=dy*0.01; }
  });
});
