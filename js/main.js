const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = canvas.width =400;
const CANVAS_HEIGHT = canvas.height =320;
// const collosion = collision.length;


// const collisionMap = []
// for(let i =0; i < collosion.length; i += 80){
//   collisionMap.push(collosion.slice(i,80 + i))
// }






let gamespeed = 0;

const backgroundLayer1 = new Image();
backgroundLayer1.src = './images/prince-of persia-map.png';
/*const backgroundLayer2 = new Image();
backgroundLayer2.src = 'layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = 'layer-3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = 'layer-4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = 'layer-5.png';*/

let x = 0;
let x2 = 2400;


/*function animate() {
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
  ctx.drawImage(backgroundLayer1, x,0);
 /* ctx.drawImage(backgroundLayer4, x,0);
  ctx.drawImage(backgroundLayer5, x,0);
  ctx.drawImage(backgroundLayer3, x2,0);
  ctx.drawImage(backgroundLayer4, x2,0);
  ctx.drawImage(backgroundLayer5, x2,0);/
  
  if ( x < -2400) x = 2400 + x2 - gamespeed;
  else x -= gamespeed;
 /* if ( x2 < -2400) x2 = 2400 + x - gamespeed;
  else x2 -= gamespeed;
  requestAnimationFrame(animate);
};
animate(0);*/



function animate() {
  ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
ctx.drawImage(backgroundLayer1, x,0);


if ( x < -2400) x = 2400 + x2 - gamespeed;
else x -= gamespeed;

requestAnimationFrame(animate);
};
animate('0');




