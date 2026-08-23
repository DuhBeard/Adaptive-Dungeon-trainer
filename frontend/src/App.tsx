import { useEffect, useRef, useState } from 'react'
import Phaser from 'phaser'
import { DungeonScene, type GameEvent } from './game/DungeonScene'
import './App.css'

function App() {
  const gameContainerRef = useRef<HTMLDivElement | null>(null)
  const gameRef = useRef<Phaser.Game | null>(null)
  const [events, setEvents] = useState<GameEvent[]>([])

  useEffect(() => {
    if (!gameContainerRef.current || gameRef.current) {
      return
    }

    const scene = new DungeonScene((event) => {
      setEvents((currentEvents) => [event, ...currentEvents].slice(0, 8))
    })

    gameRef.current = new Phaser.Game({
      type: Phaser.AUTO,
      parent: gameContainerRef.current,
      width: 800,
      height: 520,
      backgroundColor: '#12141f',
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
        },
      },
      scene,
    })

    return () => {
      gameRef.current?.destroy(true)
      gameRef.current = null
    }
  }, [])

  return (
    <main className="app-shell">
      <section className="game-panel">
        <div className="game-header">
          <div>
            <p className="eyebrow">Milestone 1</p>
            <h1>Adaptive Dungeon Trainer</h1>
          </div>
          <div className="controls">
            <span>Move: WASD / Arrow Keys</span>
            <span>Goal: collect all cores</span>
          </div>
        </div>
        <div ref={gameContainerRef} className="game-frame" />
      </section>

      <aside className="telemetry-panel">
        <p className="eyebrow">Telemetry Preview</p>
        <h2>Recent Events</h2>
        <ul>
          {events.length === 0 ? (
            <li className="empty-state">Start moving to generate events.</li>
          ) : (
            events.map((event) => (
              <li key={`${event.type}-${event.timestamp}`}>
                <strong>{event.type}</strong>
                <span>{event.detail}</span>
              </li>
            ))
          )}
        </ul>
      </aside>
    </main>
  )
}

export default App
