class Vector {
    
    constructor(x, y) {
        
        this.x = x;
        this.y = y;
        this.mag = 0;
        this.ang = 0;
        
        this.updateMag();
        this.updateAng();
        
    }
    
    updateMag() {
        
        this.mag = (this.x**2 + this.y**2) ** 0.5;
        
    }
    
    updateAng() {
        
        let radian = Math.atan2(this.y, this.x);
        this.ang = radian * 180 / Math.PI;
        
        if (this.ang < 0) {
            this.angle += 360;
        } else if (this.ang > 360) {
            this.ang -= 360;
        }
        
    }
    
    add(vec, ret) {
        if (ret) {
            return new Vector(this.x+vec.x, this.y+vec.y);
        } else {
            this.x += vec.x;
            this.y += vec.y;
        }
    }
    sub(vec, ret) {
        if (ret) {
            return new Vector(this.x-vec.x, this.y-vec.y);
        } else {
            this.x -= vec.x;
            this.y -= vec.y;
        }
    }
    
    mult(num, ret) {
        if (ret) {
            return new Vector(this.x*num, this.y*num);
        } else {
            this.x *= vec.x;
            this.y *= vec.y;
        }
    }
    
    div(num, ret) {
        if (ret) {
            return new Vector(this.x/num, this.y/num);
        } else {
            this.x /= vec.x;
            this.y /= vec.y;
        }
    }
    
    setMag(num, ret) {
        if (ret) {
            let newV = new Vector(this.x, this.y);
            newV.x *= num / newV.mag;
            newV.y *= num / newV.mag;
            return newV;
        }
        this.updateMag();
        this.x *= num / this.mag;
        this.y *= num / this.mag;
        this.mag = num;
        
    }
    
    rotate(ang, ret) {
        if (ret) {
            let radang = (this.ang+ang) / 180 * Math.PI;
            let y = Math.sin(radang) * this.mag;
            let x = Math.cos(radang) * this.mag;
            return new Vector(x, y);
        } else {
            this.ang += ang;
            let radang = this.ang / 180 * Math.PI;
            this.y = Math.sin(radang) * this.mag;
            this.x = Math.cos(radang) * this.mag;
        }
        
    }
    
    copy() {
        
        return new Vector(this.x, this.y);
        
    }
    
}



