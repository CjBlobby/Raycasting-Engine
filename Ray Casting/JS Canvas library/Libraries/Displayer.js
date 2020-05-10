const canvas = document.querySelector('canvas');
const context = canvas.getContext("2d");

canvas.width = window.innerWidth-4;
canvas.height = window.innerHeight-4;

let mouseX = 0;
let mouseY = 0;

function rectangle(x, y, w, h) {
    
    context.fillRect(x, y, w, h);
    
}

function centerRect(x, y, w, h) {
    
    context.fillRect(x-w/2, y-h/2, w, h);
    
}

function circle(x, y, r) {
    
    context.beginPath();
    context.arc(x, y, r, Math.PI*2, 0, true);
    context.closePath();
    context.fill();
    
}


function line(x1, y1, x2, y2) {
    
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    
}

function fill(r, g=r, b=r, a=1) {
    context.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`
}

function stroke(r, g=r, b=r, a=1) {
    context.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`
}

function bgfill() {

    rectangle(0, 0, canvas.width, canvas.height);
    
}

window.addEventListener('mousemove', function(event) {
    mouseX = event.x-2;
    mouseY = event.y-2;
});


//KEY INPUTS

////////////////////ADDING IF FOR EVERY NEEDED KEY (FOR MY PURPOSES, <10)
let arrowUp = false;
let arrowRight = false;
let arrowLeft = false;
let arrowDown = false;

window.addEventListener('keydown', function(event) {
    if (event.keyCode == 37) {
        arrowLeft = true;
    }
    if (event.keyCode == 39) {
        arrowRight = true;
    }
    if (event.keyCode == 40) {
        arrowDown = true;
    }
    if (event.keyCode == 38) {
        arrowUp = true;
    }
    
});
window.addEventListener('keyup', function(event) {
    if (event.keyCode == 37) {
        arrowLeft = false;
    }
    if (event.keyCode == 39) {
        arrowRight = false;
    }
    if (event.keyCode == 40) {
        arrowDown = false;
    }
    if (event.keyCode == 38) {
        arrowUp = false;
    }
    
});


let frameCount = 0;
function looper() {
    frameCount ++;
    
    loop();
    
    //RECURSIVENESS
    requestAnimationFrame(looper);

}

//PRELOAD
window.onload = function() {
    
    preload();
    
};

function loadImage(imgPath) {
    
    let img = new Image();
    img.src = imgPath;
    return img;
    
}

function image(image, x, y, w, h, sx, sy, sw, sh) {
    
    if (image) {
        context.drawImage(image, x, y, w, h);
    }
    if (image && sw) {
        context.drawImage(image, sx, sy, sw, sh, x, y, w, h);
    }
    
}

startup();

looper();
