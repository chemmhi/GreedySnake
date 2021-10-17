class Snake {
    snake: HTMLElement;
    head: HTMLElement;
    //包含head
    bodies: HTMLCollection

    constructor(){
        this.snake = document.getElementById('snake')!;
        this.bodies = this.snake.getElementsByTagName('div');
        this.head = this.bodies[0] as HTMLElement;
    }
    //需要判断是否吃上了食物，所以需要过去坐标进行比较
    get X(){
        return this.head.offsetLeft;
    }
    get Y(){
        return this.head.offsetTop;
    }
    set X(value:number){
        if(this.X === value) return;
        if(value < 0 || value > 290){
            throw new Error('撞墙了');
        }
        //如果你想要设置的value值等于第二个div的左偏移，说明你想掉头了
        const bodies = this.bodies;
        if(bodies[1] && (bodies[1] as HTMLElement).offsetLeft === value) {
            if(value > this.X){
                //说明正在向左移动，你在尝试向右掉头,应该禁止
                value = this.X - 10;
            }else{
                value = this.X + 10;
            }
        }
        this.moveBody();
        this.head.style.left = value + 'px';
        this.checkStrike();
    }
    set Y(value: number){
        if(this.Y === value) return;
        //撞墙处理
        if(value < 0 || value > 290){
            throw new Error('撞墙了')
        }
        const bodies = this.bodies;
        if(bodies[1] && (bodies[1] as HTMLElement).offsetTop === value) {
            if(value > this.Y){
                //说明正在向上移动，你在尝试向下掉头,应该禁止
                value = this.Y - 10;
            }else{
                value = this.Y + 10;
            }
        }
        this.moveBody();
        this.head.style.top = value + 'px';
        this.checkStrike();
    }
    addBody(){
        const divEl = document.createElement('div');
        this.snake.appendChild(divEl);
    }
    moveBody(){
        const bodies = this.bodies;
        for(let i=bodies.length-1; i>0; --i){
            let preX = (bodies[i-1] as HTMLElement).offsetLeft,
                preY = (bodies[i-1] as HTMLElement).offsetTop;
            (bodies[i] as HTMLElement).style.left = preX + 'px';
            (bodies[i] as HTMLElement).style.top = preY + 'px';
        }
    };
    checkStrike(){
        const bodies = this.bodies;
        //只有body数超过4的时候才有可能和自己相撞
        if(bodies.length > 4){
            for(let i=4; i<bodies.length; i++){
                const bd = bodies[i] as HTMLElement;
                if(this.X === bd.offsetLeft && this.Y === bd.offsetTop){
                    throw new Error('撞到自己了');
                }
            }
        }

    }
}

export default Snake;