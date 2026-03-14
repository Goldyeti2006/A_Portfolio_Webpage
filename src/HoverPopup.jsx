import { useState, useCallback } from 'react';

export default function HoverPopup({ items }) {
  const [active, setActive] = useState(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const movePopup = useCallback((e) => {
    setPos({ x: e.clientX + 24, y: e.clientY - 80 });
  }, []);

  return (
    <>
      <div className="bg-[#111] rounded-xl py-2">
        {items.map((item) => (
          <div
            key={item.label}
            onMouseEnter={(e) => { setActive(item); movePopup(e); }}
            onMouseMove={movePopup}
            onMouseLeave={() => setActive(null)}
            className={`
              px-2 py-4 border-b border-white/10 cursor-pointer
              text-2xl font-light tracking-wide transition-colors duration-200
              ${active?.label === item.label ? 'text-[#FA8112]' : 'text-white/85 hover:text-white'}
            `}
          >
            {item.label}
          </div>
        ))}
      </div>

      {/* Follows cursor — fixed so it escapes any overflow:hidden parent */}
      <div
        className="fixed pointer-events-none z-[999] rounded-2xl overflow-hidden
                   flex flex-col items-center justify-center gap-3 p-6 min-w-[180px] min-h-[160px]
                   transition-all duration-200"
        style={{
          left: pos.x,
          top: pos.y,
          background: active?.color || '#fff',
          opacity: active ? 1 : 0,
          transform: active ? 'scale(1) translateY(0)' : 'scale(0.88) translateY(10px)',
        }}
      >
        {active?.image
          ? <img src={active.image} alt={active.label} className="w-28 h-auto object-contain" />
          : <span className="text-xl font-bold tracking-[0.15em]" style={{ color: active?.textColor || '#111' }}>
              {active?.label?.toUpperCase()}
            </span>
        }
        {active?.tag && (
          <span  className="rounded-full px-4 py-1 text-sm border"
    style={{ 
      color: displayData?.tagColor || 'rgba(255,255,255,0.7)',           // ← custom or default
      borderColor: displayData?.tagColor || 'rgba(255,255,255,0.2)',     // ← border matches text
    }}
  >
    {displayData.tag}
          </span>
        )}
      </div>
    </>
  );
}