const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="relative">
        {/* Glowing background effect */}
        <div className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
        
        {/* Main loader container */}
        <div className="relative">
          {/* Outer decorative ring */}
          <div className="w-16 h-16 border-4 border-blue-100 rounded-full shadow-lg"></div>
          
          {/* Primary spinning ring with gradient */}
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-500 border-r-blue-600 rounded-full animate-spin"></div>
          
          {/* Secondary spinning ring (reverse direction) */}
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-b-purple-500 border-l-purple-400 rounded-full animate-spin animation-delay-75" 
               style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          
          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;