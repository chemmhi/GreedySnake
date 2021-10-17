class Food{
    foodElement: HTMLElement;
    constructor() {
        this.foodElement = document.getElementById('food')!;
    }
    //获取x, y坐标用于判断是否蛇吃到了食物
    get X(){
        return this.foodElement.offsetLeft;
    }
    get Y(){
        return this.foodElement.offsetTop;
    }
    changePosition(snakeBody: HTMLCollection){
        //改变food标签的left和top
        //bug可能和蛇的身子重合
        let top = Math.floor(Math.random()*30)*10,
            left = Math.floor(Math.random()*30)*10;
        for(let i=snakeBody.length-1; i>=0; --i){
            const bd = snakeBody[i] as HTMLElement;
            if(top === bd.offsetTop && left === bd.offsetLeft){
                //说明新出现的食物在蛇的body中
                //首先找出body所占的所有X,Y
                //剔除所占有的X,Y，然后随机取值
                this.changePosition(snakeBody)
            }
        }
        this.foodElement.style.left = top + 'px';
        this.foodElement.style.top = left + 'px';
    }
}

export default Food;