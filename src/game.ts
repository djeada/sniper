import Phaser from 'phaser';
import cursorImg from '../public/cursor.png';
import shootEffectImg from '../public/shoot_effect.png';
import bacgrkoundMusicAudio from '../public/backgroundsound.mp3';
import shootingSoundAudio from '../public/shooting.mp3';

class MainScene extends Phaser.Scene {
    private squares: Phaser.GameObjects.Group;
    private score: number;
    private lives: number;
    private gameOverFlag: boolean;
    private scoreText: Phaser.GameObjects.Text;
    private customCursor: Phaser.GameObjects.Image;
    private shootEffect: Phaser.GameObjects.Sprite;

    constructor() {
       super({ key: 'MainScene' });
        this.lives = 3;
        this.score = 0;
        this.gameOverFlag = false;
    }

    preload() {
        this.load.image('cursor', cursorImg);
        this.load.spritesheet('shootEffect', shootEffectImg, { frameWidth: 40, frameHeight: 40 });
this.load.audio('backgroundMusic', bacgrkoundMusicAudio);
    this.load.audio('shootingSound', shootingSoundAudio);
    }

    create() {
    this.gameOverFlag = false;
    this.score = 0;
    this.lives = 3;

        this.squares = this.add.group();  // Initialize the group here
        this.scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '16px', color: '#fff' });
    this.livesText = this.add.text(10, 30, 'Lives: 3', { fontSize: '16px', color: '#fff' });        
this.setupCursor();
        this.setupShootEffect();
        this.spawnSquaresRegularly();
        this.input.on('pointerdown', this.handlePointerDown);
       this.time.addEvent({
            delay: 1000,
            callback: this.spawnSquare, // using arrow function to maintain context
            loop: true
        });

    const backgroundMusic = this.sound.add('backgroundMusic', { loop: true });
    backgroundMusic.play();

    this.shootingSound = this.sound.add('shootingSound');
    }

    update() {
        this.moveCursorToPointer();
    if (this.gameOverFlag) {

        return; // Stop updating if the game is over
    }

        this.updateSquares();
    }

    private setupCursor() {
        this.customCursor = this.add.image(0, 0, 'cursor').setDepth(1).setOrigin(0.5, 0.5);
        this.input.setDefaultCursor('none');
    }

    private setupShootEffect() {
        this.shootEffect = this.add.sprite(0, 0, 'shootEffect').setVisible(false).setDepth(-1);
        this.anims.create({
            key: 'shoot',
            frames: this.anims.generateFrameNumbers('shootEffect', { start: 0, end: 4 }),
            frameRate: 14,
            repeat: 0
        });
        this.shootEffect.on('animationcomplete', () => this.shootEffect.setVisible(false));
    }

    private spawnSquaresRegularly() {
        this.time.addEvent({
            delay: 1000,
            callback: this.spawnSquare,
            loop: true
        });
    }

    private moveCursorToPointer() {
        this.customCursor.setPosition(this.input.x, this.input.y);
    }

private updateSquares() {
    this.squares.getChildren().forEach((square: Phaser.GameObjects.Rectangle) => {
        square.x += 2;
        if (square.x > this.sys.canvas.width) {
            square.destroy();
            this.lives--;
            this.updateLivesText();
            if (this.lives <= 0 && !this.gameOverFlag) {
                this.gameOver();
            }
        }
    });
}



  private spawnSquare = () => {
    if (this.gameOverFlag) {

        return; // Stop updating if the game is over
    }
        const square = this.add.rectangle(0, Phaser.Math.Between(0, this.sys.canvas.height), 20, 20, 0x00ff00);
        this.squares.add(square);
    }

    private handlePointerDown = (pointer: Phaser.Input.Pointer) => {
        this.shoot(pointer);
    }

    private shoot(pointer: Phaser.Input.Pointer) {
        this.shootEffect.setPosition(pointer.x, pointer.y).setVisible(true).play('shoot');
        this.squares.getChildren().forEach((square: Phaser.GameObjects.Rectangle) => {
            if (square.getBounds().contains(pointer.x, pointer.y)) {
                square.destroy();
                this.incrementScore();
            }
        });
    this.shootingSound.play(); // Play shooting sound
    }

    private incrementScore() {
        this.score++;
        this.updateScoreText();
    }
private updateLivesText() {
    this.livesText.setText('Lives: ' + this.lives);
}
    private updateScoreText() {
        this.scoreText.setText(`Score: ${this.score}`);
    }
private gameOver() {
    this.gameOverFlag = true;
    this.squares.clear(true); // Clear all squares
    const gameOverText = this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'Game Over', { fontSize: '40px', color: '#ff0000' }).setOrigin(0.5, 0.5);

    this.input.keyboard.removeAllListeners(); // Remove all existing input listeners
    // Optionally, add a button or click event to restart the game
    this.input.once('pointerdown', () => {
        this.scene.restart();
        this.gameOverFlag = false;
    });
}


}

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: MainScene
};

new Phaser.Game(config);

