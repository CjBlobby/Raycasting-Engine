//The amount shapes are scaled by for the minimap. LOWER NUMBERS MEAN BIGGER.
const mapSize = 5;
let colW;

class Player {
    
    constructor(x, y) {
        
        this.pos = new Vector(x, y);
        this.dir = new Vector(2, 0);
        
        this.rays = [];
        
    }
    
    show() {

        circle(this.pos.x/mapSize, this.pos.y/mapSize, 12/mapSize);
        
        for (let r of this.rays) {
            
            r.show(this.pos);
            
        }
        
        line(0, canvas.height/mapSize, canvas.width/mapSize, canvas.height/mapSize);
        line(canvas.width/mapSize, 0, canvas.width/mapSize, canvas.height/mapSize);

    }
    
    turn(ang) {
        
        this.dir.rotate(ang);
        
    }
    
    cast(boxes) {
        this.rays = [];
        for (let x=1; x>=-1; x-=0.01) {
            let r = new Vector(x, 1.7);
            r.rotate(this.dir.ang-90);
            this.rays.push(new Ray(this.pos.copy(), r));
            this.rays[this.rays.length-1].arrayPos = this.rays.length-1;
        }
        for (let r of this.rays) {
            let i=0;
            while (!r.box && i<200) {
                i++;
                r.step();
                r.hit(boxes);
                
            }
            
        }
        if (!colW) {
            colW = canvas.width/this.rays.length;
        }
    }
    
    move(forward, side) {
        
        this.pos.add(this.dir.mult(forward*5, true));
        this.turn(side);
        
    }
    
}



class Ray {
    
    constructor(pos, dir) {
        
        this.pos = pos;
        this.dir = dir;
        this.box = null;
        this.face = null;
        
    }
    
    show(base) {

        line(base.x/mapSize, base.y/mapSize, this.pos.x/mapSize, this.pos.y/mapSize);
        if (this.box) {
            this.box.show();
        }
   
    }
    
    step() {
        
        this.pos.add(this.dir);
        
    }
    
    hit(boxes) {
        
        for (let b of boxes) {
                
            if (b.hit(this)) {
                this.face = b.currentFace;
                this.box = b;
            }
        }
        
    }
        
} 


function DisplayRays(p) {
    
    for (let i=0; i<p.rays.length; i++) {
        let ray = p.rays[i].pos.sub(p.pos, true);
        ray.rotate(-p.dir.ang+90);
        
        //SUPER IMPORTANT: TINKER AT YOUR OWN RISK
        let h = (0.8*canvas.height)/-ray.y*16;
        //KINDA HELPS FISH-EYE, if is for the absolute value of x
        if (ray.x > 0) {
            h -= ray.x/7;
        } else {
            h += ray.x/7;
        }
        
        let r = p.rays[i];
        if (r.box) {
            fill(r.box.col[0], r.box.col[1], r.box.col[2]);
            //IMAGE TEXTURING
            r.face.show(i*colW-colW/2, canvas.height/2-h/2, colW, h);
            
        } else {
            fill(255);

        }
        
        //centerRect(i*colW, canvas.height/2+h, colW, h);
    }
    
    for(let f of boxes[0].faces) {
        f.count = 0;
        f.prevDrawn = 0;
    }
    
} 



