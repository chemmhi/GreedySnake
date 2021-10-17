class ScorePanel {
    private _score = 0;
    private _level = 1;

    scoreElement: HTMLElement;
    levelElement: HTMLElement;

    //最高等级
    maxLevel: number;
    //多少分升级
    levelGap: number;

    constructor(maxLevel: number = 10, levelGap: number = 10){
        this.scoreElement = document.getElementById('score')!;
        this.levelElement =document.getElementById('level')!;
        this.maxLevel =maxLevel
        this.levelGap = levelGap
    }
    scoreIncrement(){
        this.scoreElement.innerText = ++this._score + '';
        if(this._score % this.levelGap === 0){
            this.levelUp()
        }
    }
    levelUp(){
        if(this.level < this.maxLevel){
            this.levelElement.innerText = ++this._level + '';
        }
    }
    get level(){
        return this._level
    }
}

export default ScorePanel;
