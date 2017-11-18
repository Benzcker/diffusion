export default class Atom {
    constructor(x, y, r, type, side){
        this.x = x;
        this.y = y;
        this.r = r;
        this.maxSpeed = 1/this.r*10;
        this.color = type;
        this.type = type;

        this.side = side;
    }

    draw(context) {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.r, Math.PI*2, false);
        context.fill();
    }

    update(dt, temperature, screen, membran) {
        const vx = myRandom()*this.maxSpeed*temperature;
        const vy = myRandom()*this.maxSpeed*temperature;

        this.x += vx * dt;
        if (this.x - this.r < 0){
            this.x = this.r;
        } else if (this.x + this.r > screen.width) {
            this.x = screen.width - this.r;
        }

        if (membran && membran.type != this.color) {
            if (this.side === 'L' && this.x + this.r > membran.x) {
                this.x = membran.x - this.r;
            } else if (this.side === 'R' && this.x - this.r < membran.x + membran.width) {
                this.x = membran.x + membran.width + this.r;
            }
        }

        this.y += vy * dt;
        if (this.y - this.r < 0){
            this.y = this.r;
        } else if (this.y + this.r > screen.height) {
            this.y = screen.height - this.r;
        }
    }
}


export function newAtom(_x, _y, _r, _color, screen, side){
    const x = _x || Math.random()*screen.width;
    const y = _y || Math.random()*screen.height;
    const r = _r || Math.random()*20+10;
    
    const color = _color || 'black';
    
    const a = new Atom(x, y, r, color, side);
    return a;
}

function myRandom() {
    return (Math.random()-0.5)*2
}