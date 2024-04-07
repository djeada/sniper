import Phaser from 'phaser';

class MainScene extends Phaser.Scene {
    private squares!: Phaser.GameObjects.Group;  // Using definite assignment assertion
    private score: number = 0;
    private scoreText!: Phaser.GameObjects.Text; // Using definite assignment assertion

    constructor() {
        super({ key: 'MainScene' });
    }

    preload() {
        // Preload assets if any
    }

    create() {
        this.squares = this.add.group();
        this.scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '16px', color: '#fff' });

        this.time.addEvent({
            delay: 1000,
            callback: this.spawnSquare,
            callbackScope: this,
            loop: true
        });

        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            this.shoot(pointer);
        });
    }

    update() {
        Phaser.Actions.IncX(this.squares.getChildren(), 2);

        this.squares.getChildren().forEach((square: any) => { // Changed to 'any' to avoid conflict
            if ((square as Phaser.GameObjects.Rectangle).x > this.sys.canvas.width) {
                square.destroy();
            }
        });
    }

    private spawnSquare() {
        let square = this.add.rectangle(0, Phaser.Math.Between(0, this.sys.canvas.height), 20, 20, 0x00ff00);
        this.squares.add(square);
    }

    private shoot(pointer: Phaser.Input.Pointer) {
        this.squares.getChildren().forEach((square: any) => { // Changed to 'any' to avoid conflict
            if ((square as Phaser.GameObjects.Rectangle).getBounds().contains(pointer.x, pointer.y)) {
                square.destroy();
                this.score++;
                this.updateScoreText();
            }
        });
    }

    private updateScoreText() {
        this.scoreText.setText('Score: ' + this.score);
    }
}

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: MainScene
};

new Phaser.Game(config);

