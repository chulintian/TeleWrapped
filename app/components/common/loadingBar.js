export default function LoadingBar({duration}) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1/4 bg-white border-1 rounded-full h-3 relative overflow-hidden">
          <div 
            className="absolute rounded-full bot h-full bg-black animate-loading-bar"
            style={{ animationDuration: `${duration}s` }}
          ></div>
        </div>
      </div>
    );
  }
  