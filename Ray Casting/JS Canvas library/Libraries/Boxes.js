class Box {
    
    constructor(x, y, col, img){
        
        this.x = x;
        this.y = y;
        this.w = 16;
        this.col = col;
        
        this.img = img;
        this.faces = [new Face(img), new Face(img), new Face(img), new Face(img)];
        //TEMPORARY OBJECT VAR
        this.currentFace = null;
    }
    
    show(x, y, w, h) {
        
        rectangle(this.x/mapSize, this.y/mapSize, this.w/mapSize, this.w/mapSize);

    }
    
    hit(r) {
        
        let x = r.pos.x - this.x;
        let y = r.pos.y - this.y;
        
        let ind = 0;
        
        //IN SQUARE
        if (x>0 && x<this.w && y>0 && y<this.w) {
            
            if (x+y>this.w) {
                ind += 2;
            }
            if (x<y) {
                ind ++;
            }
            this.currentFace = this.faces[ind];
            this.faces[ind].count++;
            //this.faces[ind].lastR = r;
            if (!this.faces[ind].firstR) {
                this.faces[ind].firstR = r;
            }
            return true;
        }
        return false;
    }
    
}

class Face {
    
    constructor() {
        
        this.img = null;
        this.count = 0;
        this.firstX = null;
        this.lastR = null;
        this.prevDrawn = 0;
        
    }
    
    show(x, y, w, h) {
        let realW = this.count*colW;
        if (this.prevDrawn == 0) {
            this.firstX = x;
        }
        
        let imgX = mapToTenEighty(x-this.firstX, 0, realW);
        let imgW = mapToTenEighty(realW/this.count, 0, realW);
        fill(0);
        image(this.img, x, y, colW, h, imgX, 0, imgW, 1080);
        this.prevDrawn++;
        //circle(x, y+h, 5);
    }
    
}

function mapToTenEighty(x, low, high) {
    
    x -= low;
    high -= low;
    let scl = 1080/high;
    return x*scl;
    
}