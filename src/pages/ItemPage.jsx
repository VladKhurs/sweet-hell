import { useParams } from 'react-router-dom';
import { getItem } from '../data/gameData';
import DialogueBox from '../components/DialogueBox';
import MediaViewer from '../components/MediaViewer';

const ItemPage = () => {
  const { categoryId, itemId } = useParams();
  const item = getItem(categoryId, itemId);

  if (!item) {
    return (
      <div className="text-center py-20">
        <div className="text-8xl mb-4 hell-flame">👹</div>
        <h2 className="text-2xl candy-text mb-4">ITEM NOT FOUND</h2>
        <div className="pixel-lollipop mx-auto animate-spin" style={{ animationDuration: '3s' }} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto relative">
      {/* Леденец в углу */}
      <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 hidden lg:block">
        <div className="pixel-lollipop animate-spin" style={{ animationDuration: '8s' }} />
      </div>

      {/* Заголовок с конфетным градиентом */}
      <h1 className="text-3xl drop-shadow-[0_1.2px_2.7px_rgba(0,0,0,0.9)] md:text-5xl font-bold mb-8 candy-text leading-tight text-center">
        {item.title}
      </h1>

      {/* Основной контент */}
      <div className="hell-sweet-border md:p-8 p-4 relative">
        {/* Декоративные уголки из цветов персонажа */}
        <div className="absolute top-2 left-2 w-6 h-6 border-t-4 border-l-4 border-[#ff6cb6]" />
        <div className="absolute top-2 right-2 w-6 h-6 border-t-4 border-r-4 border-[#b788e5]" />
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-4 border-l-4 border-[#ffa7d1]" />
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-4 border-r-4 border-[#cb2c36]" />

        {/* Динамические данные */}
        {item.stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {Object.entries(item.stats).map(([key, value]) => (
              <div key={key} className="bg-[#4d4d4d] p-4 border-2 border-[#b788e5] text-center">
                <div className="text-[#ffa7d1] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.9)] text-xs uppercase mb-2">{key}</div>
                <div className="text-[#fbe6bf] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.9)] text-lg font-bold">{value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Детали */}
        {item.details && (
          <div className="mt-4 p-6 bg-gradient-to-r from-[#4d4d4d] to-[#66225b] border-2 border-[#ffa7d1]">
            <p className="text-[#fbe6bf] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.9)] text-xs leading-relaxed">{item.details}</p>
          </div>
        )}

        {item?.gallery &&
          <div className='flex flex-wrap mt-4 items-center'>
            {
                        item.gallery.map((imgElem) =>
            <MediaViewer
              src={imgElem.image}
              type="image"
              alt={item.title}
              width={`${imgElem.axial === 'vertical' ? '200px' : '330px'}`}
              height={`${imgElem.axial === 'vertical' ? '230px' : '200px'}`}
              className="mx-auto"
              previewEnabled={false}
            />
          )
            }
          </div>


        }

        {item.dialogues && item.dialogues.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl text-[#ff6cb6] mb-6 hell-flame text-center">
              🎭 ДИАЛОГИ 🎭
            </h3>
            <DialogueBox dialogues={item.dialogues} />
          </div>
        )}

        {
          item?.content && <p className="text-[#fbe6bf] text-left drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.9)] text-sm leading-relaxed whitespace-pre-line">
            {item.content}
          </p>
        }
      </div>

      {/* Индикатор-леденец снизу */}
      <div className="flex justify-center gap-4 mt-8">
        <div className="pixel-lollipop scale-50" />
        <div className="pixel-lollipop scale-50" style={{ animationDelay: '0.2s' }} />
        <div className="pixel-lollipop scale-50" style={{ animationDelay: '0.4s' }} />
      </div>
    </div>
  );
};

export default ItemPage;