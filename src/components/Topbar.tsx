const SearchIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
);
const BellIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);
const SettingsIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

type TopbarProps = {
  searchValue?: string;
  onSearchChange?: (v: string) => void;
};

export default function Topbar({ searchValue = "", onSearchChange }: TopbarProps) {
  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center px-6 gap-4 shrink-0">
      <div className="flex items-center gap-1 shrink-0">
        <span className="text-[#1a2c5b] font-black text-lg tracking-tight">TVU</span>
        <span className="text-gray-700 font-semibold text-lg tracking-tight"> PhishGuard</span>
      </div>

      <div className="flex-1 max-w-xl mx-auto relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <SearchIcon />
        </span>
        <input
          type="text"
          placeholder="Buscar..."
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
          className="w-full pl-9 pr-4 py-2 rounded-full border border-gray-300 bg-gray-50 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a2c5b]/30 focus:border-[#1a2c5b] transition"
        />
      </div>

      <div className="flex items-center gap-3 ml-auto shrink-0">
        <button className="text-gray-500 hover:text-gray-800 transition-colors p-1 rounded-md hover:bg-gray-100">
          <BellIcon />
        </button>
        <button className="text-gray-500 hover:text-gray-800 transition-colors p-1 rounded-md hover:bg-gray-100">
          <SettingsIcon />
        </button>
        <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
          Help Center
        </button>
        <div className="w-8 h-8 rounded-full bg-[#1a2c5b] text-white flex items-center justify-center text-xs font-bold cursor-pointer">
          U
        </div>
      </div>
    </header>
  );
}