import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import BackButton from './BackButton';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const showBackButton = location.pathname !== '/';

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        imageRendering: 'pixelated'
      }}
    >
        {/* Пиксельные облака/карамельки на фоне */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-8 h-8 bg-amber-200"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: 'rotate(45deg)',
              boxShadow: '4px 4px 0 #b788e5',
              opacity: 0.3
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {showBackButton && <BackButton onClick={() => navigate(-1)} />}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;