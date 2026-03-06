import MediaViewer from "./MediaViewer";

const CategoryCard = ({ icon, title, description, onClick }) => {
  // Градиенты для разных категорий
  const getCategoryGradient = (title) => {
    switch (title) {
      case 'Персонажи':
        return 'from-[#cb2c36] to-[#ff6cb6]';
      case 'Локации':
        return 'from-[#b788e5] to-[#66225b]';
      case 'Общее':
        return 'from-[#ffa7d1] to-[#fbe6bf]';
      default:
        return 'from-[#4d4d4d] to-[#66225b]';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`
        hell-sweet-border cursor-pointer 
        transition-all hover:scale-105 hover:rotate-1
        md:p-8 p-5 relative overflow-hidden group
      `}
    >
      {/* Конфетный градиент на фоне */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient(title)} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />

      {/* Пиксельные леденцы на фоне */}
      <div className="absolute top-2 right-2 w-8 h-8 opacity-20 group-hover:opacity-40 transition-opacity">
        <div className="pixel-lollipop scale-50" />
      </div>

      {/* Иконка с адским свечением */}
      {
        icon && (
          <MediaViewer
            src={icon}
            type="image"
            alt={icon}
            width="144px"
            height="160px"
            className="mx-auto"
            previewEnabled={false}
          />
        )
      }

      {/* Заголовок с конфетным градиентом */}
      <h2 className="text-xl mt-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.9)] font-bold mb-3 candy-text tracking-wider">
        {title}
      </h2>

      {/* Описание */}
      <p className="text-[#fbe6bf] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.9)] text-xs leading-relaxed opacity-90 group-hover:opacity-100">
        {description}
      </p>

      {/* Декоративные элементы - конфетти из цветов персонажа */}
      <div className="absolute bottom-2 left-2 flex gap-1">
        <div className="w-2 h-2 bg-[#cb2c36] animate-pulse" />
        <div className="w-2 h-2 bg-[#b788e5] animate-pulse" style={{ animationDelay: '0.2s' }} />
        <div className="w-2 h-2 bg-[#ff6cb6] animate-pulse" style={{ animationDelay: '0.4s' }} />
      </div>

      {/* Указатель-леденец при наведении */}
      <div className="absolute -bottom-2 -right-2 w-12 h-12 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:rotate-12">
        <div className="pixel-lollipop scale-75" />
      </div>
    </div>
  );
};

export default CategoryCard;