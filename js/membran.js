export default class Membran{
    constructor(type, screen) {
        this.width = screen.width * 0.02;
        this.height = screen.height;
        this.x = screen.width / 2 - this.width / 2;
        this.y = 0;

        this.type = type;

        switch (type) {
            case 'gray':
                this.color = 'rgba(127, 127, 127, 0.4)';
                break;
            case 'blue':
                this.color = 'rgba(0, 0, 255, 0.4)';
                break;
            case 'red':
                this.color = 'rgba(255, 0, 0, 0.4)';
                break;
            case 'green':
                this.color = 'rgba(0, 255, 0, 0.4)';
                break;
            case 'yellow':
                this.color = 'rgba(255, 255, 0, 0.4)';
                break;
            case 'orange':
                this.color = 'rgba(255, 127, 0, 0.4)';
                break;
            case 'pink':
                this.color = 'rgba(255, 0, 127, 0.4)';
                break;
            
            default:
                this.color = 'rgba(0, 0, 0, 0.4)';
                break;
            
        }
    }

    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}