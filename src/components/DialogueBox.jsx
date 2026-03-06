import { useEffect, useState, useRef } from 'react';

const DialogueBox = ({ dialogues }) => {
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [viewMode, setViewMode] = useState('novel');
  const [isMobile, setIsMobile] = useState(false);
  
  // Рефы для запоминания позиции скролла
  const scrollPositionRef = useRef(0);
  const containerRef = useRef(null);

  const currentDialogue = dialogues[currentDialogueIndex];
  const currentLine = currentDialogue?.lines[currentLineIndex];

  const isLastLine = currentLineIndex === currentDialogue?.lines.length - 1;
  const isLastDialogue = currentDialogueIndex === dialogues.length - 1;
  const isComplete = isLastLine && isLastDialogue;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Функция для плавной прокрутки к сохраненной позиции
  const smoothScrollToSavedPosition = () => {
    if (scrollPositionRef.current > 0) {
      window.scrollTo({
        top: scrollPositionRef.current,
        behavior: 'smooth'
      });
      // Сбрасываем позицию после прокрутки
      setTimeout(() => {
        scrollPositionRef.current = 0;
      }, 1000);
    }
  };

  // Обработчик переключения режима с запоминанием позиции
  const handleModeSwitch = (newMode) => {
    // Запоминаем текущую позицию скролла
    scrollPositionRef.current = window.scrollY;
    
    // Переключаем режим
    setViewMode(newMode);
    
    // Даем время на отрисовку нового контента и плавно прокручиваем обратно
    setTimeout(smoothScrollToSavedPosition, 100);
  };

  const nextLine = () => {
    if (currentLineIndex < currentDialogue.lines.length - 1) {
      setCurrentLineIndex(currentLineIndex + 1);
    } else if (currentDialogueIndex < dialogues.length - 1) {
      setCurrentDialogueIndex(currentDialogueIndex + 1);
      setCurrentLineIndex(0);
    }
  };

  const resetDialogue = () => {
    setCurrentDialogueIndex(0);
    setCurrentLineIndex(0);
  };

  if (!currentLine) return null;

  const getSpeakerColor = (speaker) => {
    return speaker === 'Люми' ? 'text-[#ff6cb6]' : 'text-[#b788e5]';
  };

  if (viewMode === 'script') {
    return (
      <div ref={containerRef} className="mt-8">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => handleModeSwitch('novel')}
            className="lollipop-button text-xs py-2 px-4"
          >
            🎮 РЕЖИМ НОВЕЛЛЫ
          </button>
        </div>

        <div className="space-y-8">
          {dialogues.map((dialogue, dIdx) => (
            <div key={dIdx} className="relative">
              <div className="text-center mb-6">
                <span className="text-xs text-[#fbe6bf] bg-[#66225b] px-4 py-2 
                               inline-block border-2 border-[#ffa7d1]">
                  💬 {dialogue.title} 💬
                </span>
              </div>

              <div className="space-y-4">
                {dialogue.lines.map((line, lIdx) => (
                  <div
                    key={lIdx}
                    className={`relative p-4 ${line.speaker === 'Люми'
                      ? 'bg-gradient-to-r from-[#4d4d4d] to-[#66225b]'
                      : 'bg-[#2a1515]'
                      } border-l-4 ${line.speaker === 'Люми'
                        ? 'border-[#ff6cb6]'
                        : 'border-[#b788e5]'
                      }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-bold ${getSpeakerColor(line.speaker)}`}>
                        {line.speaker}
                      </span>
                      {line.emotion && (
                        <span className="text-[10px] text-[#ffa7d1]">
                          [{line.emotion}]
                        </span>
                      )}
                    </div>

                    <p className="text-[#fbe6bf] text-xs leading-relaxed pl-2 text-left">
                      {line.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="mt-8">
      <div className="flex flex-wrap gap-3 justify-between items-center mb-4">
        <div>
          {isComplete && (
            <button
              onClick={resetDialogue}
              className="lollipop-button text-xs py-2 px-4"
            >
              🔄 ПРОЧИТАТЬ ЕЩЁ РАЗ
            </button>
          )}
        </div>
        <button
          onClick={() => handleModeSwitch('script')}
          className="lollipop-button text-xs py-2 px-4"
        >
          📜 ПРОЛИСТАТЬ ДИАЛОГ
        </button>
      </div>

      <div className="text-center mb-4">
        <span className="text-xs text-[#fbe6bf] bg-[#66225b] px-4 py-2 inline-block border-2 border-[#ffa7d1]">
          💬 {currentDialogue.title} 💬
        </span>
      </div>

      {
        isMobile ?
          <div
            onClick={!isComplete ? nextLine : null}
            className={`relative w-[calc(100%+20px)] right-[10px] py-4 px-1 ${currentLine.speaker === 'Люми'
              ? 'bg-gradient-to-r from-[#4d4d4d] to-[#66225b]'
              : 'bg-[#2a1515]'
              } border-l-4 ${currentLine.speaker === 'Люми'
                ? 'border-[#ff6cb6]'
                : 'border-[#b788e5]'
              }`}
          >
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`text-xs pl-4 font-bold ${getSpeakerColor(currentLine.speaker)}`}>
                {currentLine.speaker}
              </span>
              {currentLine.emotion && (
                <span className="text-[10px] text-[#ffa7d1]">
                  [{currentLine.emotion}]
                </span>
              )}
            </div>

            <p className="text-[#fbe6bf] min-h-[80px] flex items-center text-xs leading-relaxed pl-2 text-left">
              {currentLine.text}
            </p>

            {!isComplete && (
              <div className={`absolute bottom-0 right-0 text-[#ffa7d1] 
                          ${isMobile ? 'text-[8px]' : 'text-xs'}
                          flex items-center gap-1
                          ${isMobile ? 'opacity-70 animate-pulse' : 'opacity-0 group-hover:opacity-100 transition-opacity'}`}>
                <span>ТАПНИ</span>
                <span className="text-base animate-bounce">▼</span>
              </div>
            )}
          </div>
          :
          <div
            className="relative p-6 cursor-pointer group"
            onClick={!isComplete ? nextLine : null}
          >
            <div className="absolute inset-0 bg-[#4d4d4d] border-4 border-[#fbe6bf] 
                      shadow-[8px_8px_0_0_#66225b, 12px_12px_0_0_#cb2c36]" />

            <div className="absolute inset-1 bg-gradient-to-br from-[#2a1515] to-[#4d4d4d] 
                      border-2 border-[#b788e5]" />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <span className={`text-sm font-bold ${getSpeakerColor(currentLine.speaker)} bg-[#2a1515] px-3 py-1 
                           border-2 border-[#ffa7d1] transform -skew-x-12`}>
                  {currentLine.speaker}
                </span>
                {currentLine.emotion && (
                  <span className="text-xs text-[#ffa7d1] opacity-75">
                    [{currentLine.emotion}]
                  </span>
                )}
              </div>

              <div className="relative">
                <p className="text-[#fbe6bf] text-sm leading-relaxed pl-4 
                       border-l-4 border-[#ff6cb6] min-h-[80px] text-left">
                  {currentLine.text}
                </p>
              </div>

              {!isComplete && (
                <div className="absolute bottom-0 right-0 text-[#ffa7d1] text-xs 
                          opacity-0 group-hover:opacity-100 transition-opacity
                          flex items-center gap-1">
                  <span>НАЖМИ ЧТОБЫ ПРОДОЛЖИТЬ</span>
                  <span className="text-lg animate-pulse">▼</span>
                </div>
              )}
            </div>
          </div>
      }

      <div className="text-center mt-2">
        <span className="text-[#b788e5] text-[10px]">
          {currentLineIndex + 1} / {currentDialogue.lines.length}
        </span>
      </div>
    </div>
  );
};

export default DialogueBox;