import { useParams, useNavigate } from 'react-router-dom';
import { getCategory } from '../data/gameData';
import MediaViewer from '../components/MediaViewer';

const Category = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const category = getCategory(categoryId);

  if (!category) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl candy-text">CATEGORY LOST IN HELL</h2>
        <div className="pixel-lollipop mx-auto mt-8" />
      </div>
    );
  }

  const items = Object.values(category.items);

  return (
    <div>
      <h1 className="md:text-4xl text-3xl break-all leading-tight drop-shadow-[0_1.2px_2.7px_rgba(0,0,0,0.9)] font-bold mb-12 candy-text text-center">
        {category.title}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {items.map((item, index) => (
          <div
            key={item.id}
            onClick={() => navigate(`/category/${categoryId}/${item.id}`)}
            className="hell-sweet-border p-8 cursor-pointer 
                       transition-all hover:translate-x-2 hover:-translate-y-2
                       relative group"
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
          >
            {/* Конфетный индикатор */}
            <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-[#ff6cb6] to-[#ffa7d1] rounded-full 
                          border-2 border-[#fbe6bf] opacity-0 group-hover:opacity-100 transition-all
                          flex items-center justify-center text-[#66225b] font-bold">
              {index + 1}
            </div>
            
            <h2 className="text-xl font-bold mb-3 text-[#fbe6bf] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.9)] group-hover:candy-text">
              {item.title}
            </h2>
            
            <p className="text-[#ffa7d1] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.9)] text-xs mb-4 leading-relaxed">
              {item.description}
            </p>

            {
              item?.image && (
                <MediaViewer
                  src={item.image}
                  type="image"
                  alt={item.title}
                  width="144px"
                  height="160px"
                  className="mx-auto"
                  previewEnabled={false}
                />
              )
            }
            
            {/* Статистика если есть */}
            {item.stats && (
              <div className="grid grid-cols-2 gap-2 mt-4">
                {Object.entries(item.stats).map(([key, value]) => (
                  <div key={key} className="bg-[#4d4d4d] p-2 border border-[#b788e5]">
                    <span className="text-[#b788e5] drop-shadow-[0_1.2px_0.8px_rgba(0,0,0,0.9)] text-[8px] uppercase">{key}</span>
                    <span className="ml-1 text-[#fbe6bf] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.9)] text-[10px]">{value}</span>
                  </div>
                ))}
              </div>
            )}
            
            {/* Индикатор перехода - леденец */}
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all">
              <div className="pixel-lollipop scale-50" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;