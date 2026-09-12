const Game = () => {
  return (
    <div className="w-full h-[calc(100vh-8rem)] flex">
      <iframe
        src="/sweet-hell/game/index.html"
        title="My Godot Game"
        className="w-full flex-1 rounded-xl border-0"
        allow="autoplay; fullscreen"
      />
    </div>
  );
}

export default Game;