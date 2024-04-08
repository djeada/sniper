import Phaser from 'phaser';
import cursorImg from '../public/cursor.png';
import shootEffectImg from '../public/shoot_effect.png';
import humanSpriteImg from '../public/human.png';
import backgroundMusicAudio from '../public/backgroundsound.mp3';
import shootingSoundAudio from '../public/shooting.mp3';

class MainScene extends Phaser.Scene {
    private humans: Phaser.GameObjects.Group;
    private score = 0;
    private lives = 3;
    private gameOverFlag = false;
    private scoreText: Phaser.GameObjects.Text;
    private livesText: Phaser.GameObjects.Text;
    private customCursor: Phaser.GameObjects.Image;
    private shootEffect: Phaser.GameObjects.Sprite;
    private backgroundMusic: Phaser.Sound.BaseSound;
    private shootingSound: Phaser.Sound.BaseSound;

    constructor() {
        super('MainScene');
    }

    preload() {
        this.load.image('cursor', cursorImg);
        this.load.spritesheet('shootEffect', shootEffectImg, { frameWidth: 40, frameHeight: 40 });
        this.load.spritesheet('humanSprite', humanSpriteImg, { frameWidth: 40, frameHeight: 40 });
        this.load.audio('backgroundMusic', backgroundMusicAudio);
        this.load.audio('shootingSound', shootingSoundAudio);
    }

    create() {
        this.humans = this.add.group();
        this.scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '16px', color: '#FFF' });
        this.livesText = this.add.text(10, 30, 'Lives: 3', { fontSize: '16px', color: '#FFF' });
        this.setupCursor();
        this.setupShootEffect();
        this.createHumanAnimation();
        this.setupBackgroundMusic();
        this.setupShootingSound();
        this.setupEvents();
    }

    update() {
        if (this.gameOverFlag) return;
        this.customCursor.setPosition(this.input.x, this.input.y);
        this.updateHumans();
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
        this.shootEffect.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => this.shootEffect.setVisible(false));
    }

    private createHumanAnimation() {
        this.anims.create({
            key: 'running',
            frames: this.anims.generateFrameNumbers('humanSprite', { start: 0, end: 6 }),
            frameRate: 8,
            repeat: -1
        });
    }

    private setupBackgroundMusic() {
        this.backgroundMusic = this.sound.add('backgroundMusic', { loop: true });
        this.backgroundMusic.play();
    }

    private setupShootingSound() {
        this.shootingSound = this.sound.add('shootingSound');
    }

    private setupEvents() {
        this.input.on(Phaser.Input.Events.POINTER_DOWN, this.handlePointerDown, this);
        this.time.addEvent({ delay: 1000, callback: this.spawnHuman, loop: true });
    }

    private spawnHuman = () => {
        if (this.gameOverFlag) return;
        const human = this.add.sprite(0, Phaser.Math.Between(0, this.sys.canvas.height), 'humanSprite').play('running');
        this.humans.add(human);
    }

    private handlePointerDown(pointer: Phaser.Input.Pointer) {
        this.shootEffect.setPosition(pointer.x, pointer.y).setVisible(true).play('shoot');
        this.humans.getChildren().forEach(human => {
            if (human.getBounds().contains(pointer.x, pointer.y)) {
                human.destroy();
                this.incrementScore();
            }
        });
        this.shootingSound.play();
    }

    private updateHumans() {
        this.humans.getChildren().forEach((human: Phaser.GameObjects.Sprite) => {
            human.x += 2;
            if (human.x > this.sys.canvas.width) {
                human.destroy();
                this.decrementLives();
            }
        });
    }

    private incrementScore() {
        this.score++;
        this.scoreText.setText(`Score: ${this.score}`);
    }

    private decrementLives() {
        this.lives--;
        this.livesText.setText(`Lives: ${this.lives}`);
        if (this.lives <= 0) this.gameOver();
    }

    private gameOver() {
        this.gameOverFlag = true;
        this.humans.clear(true);
        this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'Game Over', { fontSize: '40px', color: '#FF0000' }).setOrigin(0.5, 0.5);
        this.input.keyboard.removeAllListeners();
        this.input.once('pointerdown', () => {
            this.score = 0;
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

