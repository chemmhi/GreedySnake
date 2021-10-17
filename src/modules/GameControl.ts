import Snake from "./snake";
import ScorePanel from "./scorePanel";
import Food from "./food";

class GameControl {
    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;
    //移动方向
    direction: string = '';
    //游戏是否结束
    isLive: boolean = true;
    constructor() {
        this.snake = new Snake();
        this.scorePanel = new ScorePanel();
        this.food = new Food();
    }
    init(){
        document.addEventListener('keydown', this.keyDownHandle.bind(this));
        this.run();
    }
    keyDownHandle(event: KeyboardEvent){
        this.direction = event.key;
    }
    run(){
        let Y = this.snake.Y,
            X = this.snake.X;
        switch (this.direction){
            case 'ArrowUp':
            case 'Up':
                Y -= 10;
                break;
            case 'ArrowDown':
            case 'Down':
                Y += 10;
                break;
            case 'ArrowLeft':
            case 'Left':
                X -= 10;
                break;
            case 'ArrowRight':
            case 'Right':
                X += 10;
                break;
        }
        //检查是否吃到了食物
        this.checkEat(X, Y)

        try{
            this.snake.X = X;
            this.snake.Y = Y;
        }catch (e){
            this.isLive = false;
            alert('Game Over!')
        }
        this.isLive && setTimeout(this.run.bind(this), 300-(this.scorePanel.level - 1) * 30)
    }
    checkEat(X: number, Y: number){
        if(X === this.food.X && Y === this.food.Y){
            this.snake.addBody()
            this.food.changePosition(this.snake.bodies)
            this.scorePanel.scoreIncrement()
        }
    }
}


export default GameControl;