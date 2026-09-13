const Game = () => {
  return (
    <iframe
      src="/sweet-hell/game/index.html"
      title="My Godot Game"
      /* h-[100dvh] учитывает адресную строку на смартфонах и не дает низу уползать */
      className="fixed inset-0 w-full h-[80dvh] z-50 border-0 m-0 p-0 bg-black"
      allow="autoplay; fullscreen"
    />
  );
};

export default Game;