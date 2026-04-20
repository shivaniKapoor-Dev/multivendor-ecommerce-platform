import React, { useEffect, useState } from 'react';
import { X, Check } from "lucide-react";

export default function SideFilter({ isOpen, setIsOpen, setFilters }) {
  const [selected, setSelected] = useState({
    colour: [],
    size: [],
    inStock: false
  });

  useEffect(() => {
    setFilters(selected);
  }, [selected, setFilters]);

  const filterGroups = [
    { key: "size", title: "Size", options: ["Small", "Medium", "Large"] },
    { key: "colour", title: "Color", options: ["Blue", "Red", "Green", "Black", "White"] }
  ];

  const handleChange = (key, value) => {
    setSelected((prev) => {
      const exists = prev[key].includes(value);
      return {
        ...prev,
        [key]: exists ? prev[key].filter((v) => v !== value) : [...prev[key], value]
      };
    });
  };

  const handleStockChange = () => {
    setSelected((prev) => ({ ...prev, inStock: !prev.inStock }));
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed left-0 z-40 w-72 p-6 shadow-xl
          top-16 h-[calc(100vh-4rem)] overflow-y-auto
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:relative lg:top-0 lg:h-auto lg:translate-x-0 lg:shadow-none lg:border-r lg:border-gray-100
        `}
      >
        <div className="flex justify-between items-center mb-8 lg:hidden">
          <h2 className="text-lg font-bold uppercase tracking-tight">Filters</h2>
          <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-100 rounded-full">
            <X size={22} />
          </button>
        </div>

        <div className="space-y-8">
          {filterGroups.map((group) => (
            <div key={group.key} className="border-b border-gray-50 pb-6 last:border-0">
              <h3 className="font-bold text-[11px] mb-4 uppercase tracking-widest text-gray-400">
                {group.title}
              </h3>

              <div className="space-y-3">
                {group.options.map((option) => {
                  const isChecked = selected[group.key].includes(option);
                  return (
                    <label key={option} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleChange(group.key, option)}
                          className="
                            peer appearance-none w-5 h-5 border border-gray-300 rounded
                            checked:bg-black checked:border-black transition-all cursor-pointer
                          "
                        />
                        <Check
                          size={14}
                          className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                          strokeWidth={3}
                        />
                      </div>

                      <span className={`text-sm transition-colors ${isChecked ? "text-black font-medium" : "text-gray-600 group-hover:text-black"}`}>
                        {option}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="border-b border-gray-50 pb-6">
            <h3 className="font-bold text-[11px] mb-4 uppercase tracking-widest text-gray-400">
              Availability
            </h3>

            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={selected.inStock}
                  onChange={handleStockChange}
                  className="
                    peer appearance-none w-5 h-5 border border-gray-300 rounded
                    checked:bg-black checked:border-black transition-all cursor-pointer
                  "
                />
                <Check
                  size={14}
                  className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                  strokeWidth={3}
                />
              </div>

              <span className={`text-sm transition-colors ${selected.inStock ? "text-black font-medium" : "text-gray-600 group-hover:text-black"}`}>
                In stock only
              </span>
            </label>
          </div>

          <button
            onClick={() => {
              const resetFilters = {
                colour: [],
                size: [],
                inStock: false
              };
              setSelected(resetFilters);
            }}
            className="w-full lg:w-auto text-[10px] font-bold text-gray-400 hover:text-black hover:underline uppercase transition-all py-2"
          >
            Clear All Filters
          </button>
        </div>
      </aside>
    </>
  );
}
