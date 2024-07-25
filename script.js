// Initial Data
let currentColor = 'black';
let canDraw =false;
let mouseX = 0;
let mouseY=0;
let screen = document.querySelector('#tela');
let ctx = screen.getContext('2d'); //get the rendering context of an element



//  Events
document.querySelectorAll('.colorArea .color').forEach(item=>{
    item.addEventListener('click', colorClickEvent);
})

screen.addEventListener('mousedown', mouseDownEvent);
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);
document.querySelector('.clear').addEventListener('click',clearScreen);
//Functions
function colorClickEvent(e){
    let color= e.target.getAttribute('data-color');
    currentColor = color;

    document.querySelector('.color.active').classList.remove('active');
    e.target.classList.add('active');
}

function mouseDownEvent(e){
    canDraw = true;
    mouseX = e.pageX - screen.offsetLeft;// x-axis coordinate minus the offset function that measures the distance from the canvas to the end of the screen
    mouseY = e.pageY - screen.offsetTop;// y axis coordinate
}

function mouseMoveEvent(e){
    if(canDraw){
        draw(e.pageX, e.pageY);
    }
}

function mouseUpEvent(e){
    canDraw = false;
}

function draw(x,y){
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;

    ctx.beginPath(); // start drawing
    ctx.lineWidth = 5; 
    ctx.lineJoin = "round"; // point style 
    ctx.moveTo(mouseX, mouseY); // initial position
    ctx.lineTo(pointX,pointY); // final position
    ctx.closePath(); // stop drawing
    ctx.strokeStyle = currentColor; // get the initially selected color
    ctx.stroke(); // fill with the selected color

    mouseX = pointX; //the starting point becomes the ending point (global variable)

    mouseY = pointY; //the starting point becomes the ending point(global variable)
}

function clearScreen(){
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height)
}
