const BackButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="pixel-button mb-6 flex items-center gap-2 text-sm group relative overflow-hidden"
    >
      {/* Анимированный фон при наведении */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#ff6cb6]/70 to-[#ffa7d1]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Контент кнопки (поверх фона) */}
      <div className="relative z-10 flex items-center gap-2 px-1">
        <span className="text-xl transform group-hover:-translate-x-1 transition-transform duration-300">
          ←
        </span>
        <span className="transform group-hover:scale-105 transition-transform duration-300">
          BACK
        </span>
      </div>
      
      {/* Анимированная линия снизу */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#cb2c36] to-[#b788e5] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </button>
  );
};

export default BackButton;