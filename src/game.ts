import Phaser from 'phaser';
import cursorImg from '../public/cursor.png';
import shootEffectImg from '../public/shoot_effect.png';


class MainScene extends Phaser.Scene {
    private squares!: Phaser.GameObjects.Group;
    private score: number = 0;
    private scoreText!: Phaser.GameObjects.Text;
    private customCursor!: Phaser.GameObjects.Image;
    private shootEffect!: Phaser.GameObjects.Sprite;

    constructor() {
        super({ key: 'MainScene' });
    }

preload() {
    // Load a single image for the cursor
    this.load.image('cursor', cursorImg);

    // Load a sprite sheet for the shoot effect
    this.load.spritesheet('shootEffect', shootEffectImg, { 
        frameWidth: 40, // Correct size for each frame
        frameHeight: 40 // Correct size for each frame
    });
}


create() {
    this.squares = this.add.group();
    this.scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '16px', color: '#fff' });

    this.customCursor = this.add.image(0, 0, 'cursor');
    this.customCursor.setOrigin(0.5, 0.5);

    this.input.setDefaultCursor('none');
    
    // Set up shoot effect
    this.shootEffect = this.add.sprite(0, 0, 'shootEffect').setDepth(-1);
    this.shootEffect.setVisible(false);

    // Define shoot animation
    this.anims.create({
        key: 'shoot',
        frames: this.anims.generateFrameNumbers('shootEffect', { 
            start: 0, 
            end: 4 // Adjust as necessary for the number of frames you have
        }),
        frameRate: 14,
        repeat: 0
    });
    // Listen for animation complete to hide the shoot effect
    this.shootEffect.on('animationcomplete', () => {
        this.shootEffect.setVisible(false);
    });

    // Set up custom cursor with a higher depth to render on top
    this.customCursor = this.add.image(0, 0, 'cursor').setDepth(1);



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
        this.customCursor.setPosition(this.input.x, this.input.y);

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
    // Position the shoot effect and play the animation
    this.shootEffect.setPosition(pointer.x, pointer.y);
    this.shootEffect.setVisible(true);
    this.shootEffect.play('shoot');

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

