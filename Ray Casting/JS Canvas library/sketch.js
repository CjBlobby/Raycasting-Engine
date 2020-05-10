let skirting, smiley;

//NECESSARY
function preload() {
    
    skirting = loadImage("Images/Skirting.png");
    smiley = loadImage("Images/Smiley.jpeg");
    
}

let boxes = [];;
let r;
let p;
let mousepos;

function startup() {
    p = new Player(100, 100);
    r = new Ray(p.pos.copy(), new Vector(1, 0));
    
    //IMAGE LOADING FOR MULTIPLE BOXES IS BROKEN
    boxes.push(new Box(45, 45, [0, 0, 0], smiley));
    //boxes.push(new Box(100, 45, [0, 0, 0], smiley));
    //boxes.push(new Box(45, 100, [0, 0, 0], smiley));
    //boxes.push(new Box(100, 100, [0, 0, 0], smiley));
}

function loop() {
    moveP();
    p.cast(boxes);
    

    fill(255);
    bgfill();
    
    fill(0);
    
    //
    p.show();
    //if (frameCount%100 == 5) {DisplayRays(p);}
    DisplayRays(p);
    ldFaceImages(boxes, smiley);
    //testImages()
}

function moveP() {
    
    if (arrowUp) {
        p.move(0.1, 0);
    } else if (arrowDown) {
        p.move(-0.08, 0);
    }
    if (arrowLeft) {
        p.move(0, -4);
    }
    if (arrowRight) {
        p.move(0, 4);
    }
    
}

function ldFaceImages(faces, img) {
    for (let box of boxes) {
        for (let face of box.faces) {
            if (img && !face.img) {
        
                face.img = img;
        
            }
        }
    }
    
}
