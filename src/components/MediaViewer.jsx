// src/components/MediaViewer.jsx
import { useState, useRef, useEffect } from 'react';

const MediaViewer = ({ 
  src, 
  type = 'image', // 'image' или 'video'
  alt = '',
  width = '100%',
  height = 'auto',
  className = '',
  previewEnabled = true, // можно ли открыть предпросмотр
  showExpandHint = true,
  hintPosition = 'bottom', // 'bottom', 'top', 'inside'
  autoplay = true,
  controls = true,
  loop = true,
  muted = false,
  poster = '' // для видео
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const mediaRef = useRef(null);
  const containerRef = useRef(null);

  // Закрытие по ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isFullscreen) {
        closeFullscreen();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isFullscreen]);

  // Блокировка скролла при открытом полноэкранном режиме
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isFullscreen]);

  const openFullscreen = (e) => {
    if (!previewEnabled) return;
    
    e.preventDefault();
    e.stopPropagation();
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  // Рендер медиа-контента
  const renderMedia = (isFullscreenMode = false) => {
    const commonProps = {
      ref: mediaRef,
      src,
      alt,
      className: `w-full h-full object-cover ${previewEnabled && !isFullscreenMode ? 'cursor-pointer' : ''}`,
      style: {
        objectFit: 'cover', // cover обрезает, contain показывает целиком
        pointerEvents: isFullscreenMode ? 'auto' : 'none'
      },
      onClick: isFullscreenMode ? undefined : openFullscreen
    };

    if (type === 'video') {
      return (
        <video
          {...commonProps}
          autoPlay={isFullscreenMode ? true : autoplay}
          controls={isFullscreenMode ? true : controls}
          loop={loop}
          muted={muted}
          poster={poster}
          playsInline
        />
      );
    }

    // Для изображений
    return <img {...commonProps} />;
  };

  // Рендер хинта в зависимости от позиции
  const renderHint = () => {
    if (!showExpandHint || !previewEnabled) return null;

    const hintContent = (
      <div className="flex items-center gap-2 text-white">
        <span className="bg-[#66225b] px-3 py-1 border-2 border-[#fbe6bf] text-[10px]">
          Нажми для просмотра
        </span>
      </div>
    );

    switch (hintPosition) {
      case 'bottom':
        return (
          <div className={`absolute left-1/2 transform -translate-x-1/2 transition-all duration-300 z-20
            ${isHovered ? 'bottom-2 opacity-100' : '-bottom-8 opacity-0'}`}>
            {hintContent}
          </div>
        );
      
      case 'top':
        return (
          <div className={`absolute left-1/2 transform -translate-x-1/2 transition-all duration-300 z-20
            ${isHovered ? 'top-2 opacity-100' : '-top-8 opacity-0'}`}>
            {hintContent}
          </div>
        );
      
      case 'inside':
      default:
        return (
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 z-20
            ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="bg-[#66225b]/90 border-2 border-[#fbe6bf] px-4 py-2 transform rotate-[-2deg]">
              <span className="text-[#ffa7d1] text-xs flex items-center gap-2">
                <span>🔍</span> НАЖМИ ДЛЯ ПРОСМОТРА
              </span>
            </div>
          </div>
        );
    }
  };

  // Основной рендер
  return (
    <>
      {/* Миниатюра */}
      <div
        ref={containerRef}
        className={`relative overflow-hidden group ${className}`}
        style={{ 
          width, 
          height,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={openFullscreen}
      >
        {renderMedia(false)}
        
        {/* Хинт о возможности раскрытия */}
        {renderHint()}
      </div>

      {/* Полноэкранный режим */}
      {isFullscreen && previewEnabled && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          style={{ 
            backdropFilter: 'blur(8px)',
            animation: 'fadeIn 0.2s ease-out'
          }}
          onClick={closeFullscreen}
        >
          {/* Кнопка закрытия */}
          <button
            className="absolute top-4 right-4 z-50 text-white text-4xl hover:text-[#ff6cb6] transition-colors duration-300"
            onClick={closeFullscreen}
          >
            ✕
          </button>

          {/* Инструкция по закрытию */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-[#66225b] px-4 py-2 border-2 border-[#fbe6bf]">
            <span className="flex items-center gap-2">
              <span>ESC</span>
              <span>или</span>
              <span>клик вне изображения</span>
            </span>
          </div>

          {/* Контейнер для медиа в полноэкранном режиме */}
          <div 
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()} // Предотвращаем закрытие при клике на медиа
          >
            {/* Рамка в стиле игры */}
            <div className="absolute inset-0 hell-sweet-border pointer-events-none" />
            
            {/* Медиа контейнер */}
            <div 
              className="overflow-hidden"
              style={{
                width: type === 'video' ? '80vw' : 'auto',
                height: type === 'video' ? '80vh' : 'auto',
                maxWidth: '90vw',
                maxHeight: '90vh'
              }}
            >
              {type === 'video' ? (
                <video
                  src={src}
                  controls
                  autoPlay
                  loop={loop}
                  muted={muted}
                  poster={poster}
                  className="w-full h-full"
                  style={{ objectFit: 'contain' }} // В полноэкранном режиме показываем целиком
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <img
                  src={src}
                  alt={alt}
                  className="w-full h-full"
                  style={{ objectFit: 'contain' }} // В полноэкранном режиме показываем целиком
                  onClick={(e) => e.stopPropagation()}
                />
              )}
            </div>
          </div>

          {/* Декоративные леденцы */}
          <div className="absolute top-20 left-20 opacity-20">
            <div className="pixel-lollipop animate-spin" style={{ animationDuration: '10s' }} />
          </div>
          <div className="absolute bottom-20 right-20 opacity-20">
            <div className="pixel-lollipop animate-spin" style={{ animationDuration: '8s' }} />
          </div>
        </div>
      )}

      {/* Стили для анимации */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default MediaViewer;





/*

// С подсказкой снизу (новое поведение)
<MediaViewer
  src={item.image}
  type="image"
  width="144px"
  height="160px"
  showExpandHint={true}
  hintPosition="bottom" // подсказка снизу
/>

// С подсказкой сверху
<MediaViewer
  src={item.image}
  type="image"
  width="144px"
  height="160px"
  hintPosition="top"
/>

// Отключить предпросмотр (картинка не открывается)
<MediaViewer
  src={item.image}
  type="image"
  width="144px"
  height="160px"
  previewEnabled={false}
/>

// Отключить подсказку полностью
<MediaViewer
  src={item.image}
  type="image"
  width="144px"
  height="160px"
  showExpandHint={false}
/>

// Видео с подсказкой снизу
<MediaViewer
  src="/videos/trailer.mp4"
  type="video"
  width="320px"
  height="240px"
  hintPosition="bottom"
  poster="/images/poster.jpg"
/>

*/