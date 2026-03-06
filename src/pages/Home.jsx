import { useNavigate } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';
import { getCategories } from '../data/gameData';

const Home = () => {
  const navigate = useNavigate();
  const categories = getCategories();

  return (
    <div className="relative">
      {/* Адски-сладкий заголовок */}
      <div className="text-center mb-16 relative">
        <h1 
          className="text-5xl md:text-7xl font-bold mb-6 mt-5 relative inline-block hell-flame"
          style={{
            color: '#fbe6bf',
            textShadow: `
              4px 4px 0 #cb2c36,
              8px 8px 0 #b788e5,
              12px 12px 0 #66225b,
              16px 16px 0 #ff6cb6
            `,
            letterSpacing: '8px'
          }}
        >
          SWEET HELL
        </h1>
        
        {/* Леденцы под заголовком */}
        <div className="flex justify-center gap-4 mt-8">
          <div className="pixel-lollipop animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="pixel-lollipop animate-bounce" style={{ animationDelay: '0.2s' }} />
          <div className="pixel-lollipop animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>
        
        {/* Адское пламя под текстом */}
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-gradient-to-r from-[#cb2c36] via-[#ff6cb6] to-[#b788e5] blur-xl opacity-50" />
      </div>

      {/* Сетка категорий */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
        {categories.map((category) => (
          <div key={category.id} className="relative group">
            <CategoryCard
              icon={category.icon}
              title={category.title}
              description={category.description}
              onClick={() => navigate(`/category/${category.id}`)}
            />
          </div>
        ))}
      </div>

      {/* Декоративный элемент - горящие ворота ада */}
      <div className="flex justify-center gap-2 mt-20">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="w-4 h-24 bg-gradient-to-t from-[#cb2c36] to-[#ff6cb6] transform skew-x-12 animate-pulse"
            style={{
              animationDelay: `${i * 0.1}s`,
              boxShadow: '0 0 20px #ff6cb6'
            }}
          />
        ))}
      </div>
      
      {/* Конфетный дождь */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 5}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            <div className="text-2xl">🍬</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;