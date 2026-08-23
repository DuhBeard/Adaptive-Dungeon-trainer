import Phaser from 'phaser'

export type GameEvent = {
  type: string
  detail: string
  timestamp: number
}

type EventSink = (event: GameEvent) => void

const PLAYER_SPEED = 190
type PlayerBody = Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body }

export class DungeonScene extends Phaser.Scene {
  private player?: PlayerBody
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys
  private wasd?: Record<string, Phaser.Input.Keyboard.Key>
  private cores?: Phaser.Physics.Arcade.StaticGroup
  private scoreText?: Phaser.GameObjects.Text
  private statusText?: Phaser.GameObjects.Text
  private collectedCores = 0
  private readonly totalCores = 5
  private lastMoveEventAt = 0

  private readonly emitGameEvent: EventSink

  constructor(emitGameEvent: EventSink) {
    super('DungeonScene')
    this.emitGameEvent = emitGameEvent
  }

  create() {
    this.collectedCores = 0
    this.createRoom()
    this.createPlayer()
    this.createCores()
    this.createHud()
    this.createInput()

    this.logEvent('level_started', 'Entered the first training room.')
  }

  update(time: number) {
    if (!this.player || !this.cursors || !this.wasd) {
      return
    }

    const left = this.cursors.left.isDown || this.wasd.A.isDown
    const right = this.cursors.right.isDown || this.wasd.D.isDown
    const up = this.cursors.up.isDown || this.wasd.W.isDown
    const down = this.cursors.down.isDown || this.wasd.S.isDown

    const velocity = new Phaser.Math.Vector2(
      Number(right) - Number(left),
      Number(down) - Number(up),
    )

    if (velocity.lengthSq() > 0) {
      velocity.normalize().scale(PLAYER_SPEED)
      this.player.body.setVelocity(velocity.x, velocity.y)

      if (time - this.lastMoveEventAt > 1200) {
        this.lastMoveEventAt = time
        this.logEvent('player_moved', `Position ${Math.round(this.player.x)}, ${Math.round(this.player.y)}`)
      }
    } else {
      this.player.body.setVelocity(0, 0)
    }
  }

  private createRoom() {
    const graphics = this.add.graphics()
    graphics.fillStyle(0x171a2a, 1)
    graphics.fillRect(40, 40, 720, 440)
    graphics.lineStyle(4, 0x6ccff6, 1)
    graphics.strokeRect(40, 40, 720, 440)

    graphics.lineStyle(2, 0x2b3150, 1)
    for (let x = 80; x < 760; x += 40) {
      graphics.lineBetween(x, 40, x, 480)
    }
    for (let y = 80; y < 480; y += 40) {
      graphics.lineBetween(40, y, 760, y)
    }

    this.physics.world.setBounds(48, 48, 704, 424)
  }

  private createPlayer() {
    const playerBody = this.add.rectangle(110, 420, 28, 28, 0xffd166)
    this.player = this.physics.add.existing(playerBody) as PlayerBody
    this.player.body.setCollideWorldBounds(true)
  }

  private createCores() {
    this.cores = this.physics.add.staticGroup()

    const corePositions = [
      [160, 130],
      [360, 110],
      [625, 165],
      [245, 330],
      [600, 385],
    ]

    corePositions.forEach(([x, y]) => {
      const core = this.add.circle(x, y, 12, 0x7bf1a8)
      this.cores?.add(core)
    })

    if (this.player && this.cores) {
      this.physics.add.overlap(this.player, this.cores, (_, core) => {
        this.collectCore(core as Phaser.GameObjects.Arc)
      })
    }
  }

  private createHud() {
    this.scoreText = this.add.text(56, 54, 'Cores: 0 / 5', {
      color: '#f7f7fb',
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
      fontSize: '18px',
    })

    this.statusText = this.add.text(56, 82, 'Collect every green core to complete the room.', {
      color: '#a8b0d4',
      fontFamily: 'system-ui, sans-serif',
      fontSize: '15px',
    })
  }

  private createInput() {
    this.cursors = this.input.keyboard?.createCursorKeys()
    this.wasd = this.input.keyboard?.addKeys('W,A,S,D') as Record<string, Phaser.Input.Keyboard.Key>
  }

  private collectCore(core: Phaser.GameObjects.Arc) {
    core.disableInteractive()
    core.destroy()
    this.collectedCores += 1
    this.scoreText?.setText(`Cores: ${this.collectedCores} / ${this.totalCores}`)
    this.logEvent('core_collected', `${this.collectedCores} of ${this.totalCores} cores collected.`)

    if (this.collectedCores === this.totalCores) {
      this.statusText?.setText('Room complete. Next up: hazards, enemies, and saved telemetry.')
      this.logEvent('level_completed', 'Collected every core in the room.')
    }
  }

  private logEvent(type: string, detail: string) {
    this.emitGameEvent({
      type,
      detail,
      timestamp: Date.now(),
    })
  }
}
