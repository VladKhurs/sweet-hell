import { useState } from "react";

const Game = () => {

  const [isVisible, setIstVisible] = useState(true)

  return (
    <div className="w-full h-[calc(100vh-8rem)] flex flex-col">

      {
        isVisible &&
        <div className="flex items-center flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            <p>Пустая страница?</p>
            <p>Перезагрузка поможет, рога ставлю</p>
          </div>

          <div className="flex flex-col gap-4 items-center">
            <button
              className="lollipop-button flex p-1"
              onClick={() => {
                window.location.reload()
              }}
            >Перезагрузить страницу</button>

            <button
              className="lollipop-button flex p-1"
              onClick={() => {
                setIstVisible(false)
              }}
            >Закрыть текст, игра работает</button>
          </div>
        </div>
      }

      <iframe
        src="/sweet-hell/game/index.html"
        title="My Godot Game"
        className="w-full rounded-xl flex-1 border-0"
        allow="autoplay; fullscreen"
      />
    </div>
  );
}

export default Game;