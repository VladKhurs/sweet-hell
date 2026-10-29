import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Vite BASE_URL also works when the site is deployed in a subfolder (GitHub Pages).
const gameUrl = `${import.meta.env.BASE_URL}game/index.html`;

export default function Game() {
  const navigate = useNavigate();
  const shellRef = useRef(null);
  const [frameVersion, setFrameVersion] = useState(0);
  const [confirmAction, setConfirmAction] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenError, setFullscreenError] = useState('');

  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(document.fullscreenElement === shellRef.current);
    }
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  async function toggleFullscreen() {
    setFullscreenError('');
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (shellRef.current?.requestFullscreen) {
        await shellRef.current.requestFullscreen();
      } else {
        setFullscreenError('Полноэкранный режим недоступен в этом браузере.');
      }
    } catch {
      setFullscreenError('Браузер не разрешил полноэкранный режим.');
    }
  }

  async function confirmNavigation() {
    const action = confirmAction;
    setConfirmAction(null);
    if (action === 'restart') {
      setFrameVersion((version) => version + 1);
      return;
    }
    if (action === 'exit') {
      if (document.fullscreenElement === shellRef.current) {
        try { await document.exitFullscreen(); } catch { /* Navigation still works. */ }
      }
      navigate('/');
    }
  }

  return (
    <main className="game-shell" ref={shellRef}>
      <header className="game-toolbar">
        <button className="game-control-button" type="button" onClick={() => setConfirmAction('exit')}>
          ← НА САЙТ
        </button>
        <span className="game-toolbar-title">SWEET HELL</span>
        <div className="game-toolbar-actions">
          {/* <button className="game-control-button" type="button" onClick={() => setConfirmAction('restart')}>
            ↻ ЗАНОВО
          </button> */}
          <button className="game-control-button" type="button" onClick={toggleFullscreen}>
            {isFullscreen ? '⤢ СВЕРНУТЬ' : '⛶ НА ВЕСЬ ЭКРАН'}
          </button>
        </div>
      </header>

      <section className="game-stage" aria-label="Игровое окно Sweet Hell">
        <iframe
          key={frameVersion}
          src={gameUrl}
          title="Sweet Hell — браузерная игра"
          className="game-frame"
          allow="autoplay; fullscreen; gamepad"
          allowFullScreen
        />
      </section>

      <footer className="game-footer">
        {fullscreenError && <span role="alert" className="game-error">{fullscreenError}</span>}
      </footer>

      {confirmAction && (
        <div className="game-confirm-backdrop" role="presentation">
          <div className="game-confirm-panel" role="dialog" aria-modal="true" aria-labelledby="game-confirm-title">
            <h2 id="game-confirm-title">
              {confirmAction === 'exit' ? 'ВЫЙТИ ИЗ ИГРЫ?' : 'ПЕРЕЗАПУСТИТЬ ИГРУ?'}
            </h2>
            <p>Прогресс после последнего чекпоинта может быть потерян.</p>
            <div className="game-confirm-actions">
              <button className="game-control-button" type="button" onClick={() => setConfirmAction(null)} autoFocus>
                ОТМЕНА
              </button>
              <button className="game-control-button game-control-danger" type="button" onClick={confirmNavigation}>
                {confirmAction === 'exit' ? 'ВЫЙТИ' : 'ЗАНОВО'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
