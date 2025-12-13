
export default function DropdownMenu({ title, items, open, onClick }) {
  return (
    <li className="relative">
      <button
        onClick={onClick}
        className="text-[#079992] bg-[#e0f7f7] px-4 py-2 rounded-md font-bold flex items-center gap-1 hover:bg-[#38ada9] hover:text-white transition"
      >
        {title}
        <span className="text-xs">&#9662;</span>
      </button>

      <ul
        className={`submenu absolute left-0 top-11 bg-white border border-[#cfeeee] rounded-xl shadow-xl flex flex-col gap-1 overflow-hidden transition-all
          ${open ? "max-h-96 opacity-100 pointer-events-auto p-2" : "max-h-0 opacity-0 pointer-events-none"}
        `}
      >
        {items.map((item) => (
          <li key={item}>
            <a
              href="#"
              className="block px-4 py-2 text-[#079992] hover:bg-[#e8faf9] hover:pl-6 hover:text-[#03857f] rounded-md transition-all"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
}
