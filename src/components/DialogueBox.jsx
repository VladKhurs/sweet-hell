import { useState } from 'react';

const DialogueBox = ({ dialogues }) => {
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [viewMode, setViewMode] = useState('novel'); // 'novel' или 'script'
  
  const currentDialogue = dialogues[currentDialogueIndex];
  const currentLine = currentDialogue?.lines[currentLineIndex];
  
  const isLastLine = currentLineIndex === currentDialogue?.lines.length - 1;
  const isLastDialogue = currentDialogueIndex === dialogues.length - 1;
  const isComplete = isLastLine && isLastDialogue;

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

  // Цвета для разных говорящих
  const getSpeakerColor = (speaker) => {
    return speaker === 'Люми' ? 'text-[#ff6cb6]' : 'text-[#b788e5]';
  };

  // Режим "Весь диалог за раз"
  if (viewMode === 'script') {
    return (
      <div className="mt-8">
        {/* Кнопка переключения режима */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setViewMode('novel')}
            className="lollipop-button text-xs py-2 px-4"
          >
            🎮 РЕЖИМ НОВЕЛЛЫ
          </button>
        </div>

        {/* Все диалоги */}
        <div className="space-y-8">
          {dialogues.map((dialogue, dIdx) => (
            <div key={dIdx} className="relative">
              {/* Заголовок диалога */}
              <div className="text-center mb-6">
                <span className="text-xs text-[#fbe6bf] bg-[#66225b] px-4 py-2 
                               inline-block border-2 border-[#ffa7d1]">
                  💬 {dialogue.title} 💬
                </span>
              </div>

              {/* Все строки диалога */}
              <div className="space-y-4">
                {dialogue.lines.map((line, lIdx) => (
                  <div 
                    key={lIdx}
                    className={`relative p-4 ${
                      line.speaker === 'Люми' 
                        ? 'bg-gradient-to-r from-[#4d4d4d] to-[#66225b]' 
                        : 'bg-[#2a1515]'
                    } border-l-4 ${
                      line.speaker === 'Люми' 
                        ? 'border-[#ff6cb6]' 
                        : 'border-[#b788e5]'
                    }`}
                  >
                    {/* Имя говорящего */}
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
                    
                    {/* Текст */}
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

  // Режим "Визуальная новелла"
  return (
    <div className="mt-8">
      {/* Кнопка переключения режима */}
      <div className="flex justify-between items-center mb-4">
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
          onClick={() => setViewMode('script')}
          className="lollipop-button text-xs py-2 px-4"
        >
          📜 ПРОЛИСТАТЬ ДИАЛОГ
        </button>
      </div>

      {/* Заголовок диалога */}
      <div className="text-center mb-4">
        <span className="text-xs text-[#fbe6bf] bg-[#66225b] px-4 py-2 inline-block border-2 border-[#ffa7d1]">
          💬 {currentDialogue.title} 💬
        </span>
      </div>

      {/* Диалоговое окно в стиле RPG */}
      <div 
        className="relative p-6 cursor-pointer group"
        onClick={!isComplete ? nextLine : null}
      >
        {/* Пиксельная рамка как в старых RPG */}
        <div className="absolute inset-0 bg-[#4d4d4d] border-4 border-[#fbe6bf] 
                      shadow-[8px_8px_0_0_#66225b, 12px_12px_0_0_#cb2c36]" />
        
        {/* Внутренний фон */}
        <div className="absolute inset-1 bg-gradient-to-br from-[#2a1515] to-[#4d4d4d] 
                      border-2 border-[#b788e5]" />
        
        {/* Контент диалога */}
        <div className="relative z-10">
          {/* Имя говорящего */}
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
          
          {/* Текст диалога */}
          <div className="relative">
            <p className="text-[#fbe6bf] text-sm leading-relaxed pl-4 
                       border-l-4 border-[#ff6cb6] min-h-[80px] text-left">
              {currentLine.text}
            </p>
          </div>
          
          {/* Индикатор нажатия */}
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

      {/* Счетчик строк */}
      <div className="text-center mt-2">
        <span className="text-[#b788e5] text-[10px]">
          {currentLineIndex + 1} / {currentDialogue.lines.length}
        </span>
      </div>
    </div>
  );
};

export default DialogueBox;