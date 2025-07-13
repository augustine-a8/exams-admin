import { useEffect, useRef, useState } from "react";
import { cn } from "../utils/cn";

const Rooms = [
  { name: "LT", id: "6318a99a440810c85abaeb04" },
  { name: "304", id: "6318a99a440810c85abaeb09" },
  { name: "PB212", id: "6318a99a440810c85abaeb13" },
  { name: "RMA", id: "6318a99a440810c85abaeb05" },
  { name: "PB001", id: "6318a99a440810c85abaeb0c" },
  { name: "PB201", id: "6318a99a440810c85abaeb11" },
  { name: "PB214", id: "6318a99a440810c85abaeb12" },
  { name: "N2", id: "6318a99a440810c85abaeb16" },
  { name: "ECR", id: "6318a99a440810c85abaeb18" },
  { name: "PB020", id: "6318a99a440810c85abaeb0d" },
  { name: "N1", id: "6318a99a440810c85abaeb15" },
  { name: "VSLA", id: "6318a99a440810c85abaeb0b" },
  { name: "PB208", id: "6318a99a440810c85abaeb14" },
  { name: "EA", id: "6318a99a440810c85abaeb19" },
  { name: "NEB-FF1", id: "6318a99a440810c85abaeb1c" },
  { name: "RMB", id: "6318a99a440810c85abaeb06" },
  { name: "PB012", id: "6318a99a440810c85abaeb0f" },
  { name: "PB008", id: "6318a99a440810c85abaeb10" },
  { name: "A110", id: "6318a99a440810c85abaeb1a" },
  { name: "NAF1", id: "6318a99a440810c85abaeb1e" },
  { name: "303", id: "6318a99a440810c85abaeb08" },
  { name: "206", id: "6318a99a440810c85abaeb07" },
  { name: "PB014", id: "6318a99a440810c85abaeb0e" },
  { name: "VCR", id: "6318a99a440810c85abaeb17" },
  { name: "NEB-GF", id: "6318a99a440810c85abaeb0a" },
  { name: "NEB-FF2", id: "6318a99a440810c85abaeb1d" },
  { name: "NEB-SF", id: "63ea826efae905b39edf455b" },
  { name: "Computer Based", id: "6432c62ad5b7e2b7f2146a95" },
  { name: "GIS Lab", id: "64a04f7a77cd2a4195dd5899" },
  { name: "NEB-TF", id: "64cfc1a594d8a563f04a1ffe" },
];

interface RoomPickerProps {
  onRoomRangeChange: (room: { name: string; id: string }) => void;
}

const RoomPicker: React.FC<RoomPickerProps> = ({ onRoomRangeChange }) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selectedRoom, setSelectedRoom] = useState<{
    name: string;
    id: string;
  } | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        dropdownButtonRef.current &&
        !dropdownButtonRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full">
      <button
        className={cn(
          selectedRoom === null ? "text-[#7f7f7f]" : "text-gray-800",
          "w-full flex flex-row items-center border border-[#e5e5e5] rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out cursor-pointer"
        )}
        onClick={toggleDropdown}
        ref={dropdownButtonRef}
      >
        <p className="flex-1 text-left">
          {selectedRoom === null ? "Choose Room" : selectedRoom.name}
        </p>
        <i
          className={cn(
            showDropdown ? "ri-arrow-up-s-fill" : "ri-arrow-down-s-fill"
          )}
        ></i>
      </button>
      {showDropdown && (
        <div
          className="absolute z-10 left-0 -right-14 top-[calc(100%+8px)] bg-white border border-gray-300 rounded-xl shadow-xl overflow-hidden"
          ref={dropdownRef}
        >
          <div className="bg-white rounded-md">
            <div className="bg-[#e5e5e5] rounded-md px-2 py-1 flex items-center gap-2 m-2">
              <input
                type="text"
                placeholder="Search"
                className="border-0 outline-0 flex-grow min-w-0"
              />
              <i className="ri-search-line text-[#495057] flex-shrink-0"></i>
            </div>
            <div className="max-h-[250px] overflow-y-auto">
              {Rooms.map((room) => {
                const { id, name } = room;

                return (
                  <div
                    key={id}
                    className="px-4 py-2 hover:cursor-pointer hover:bg-[#e9ecef]"
                    role="button"
                    onClick={() => {
                      onRoomRangeChange(room);
                      setSelectedRoom(room);
                      toggleDropdown();
                    }}
                  >
                    <p>{name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomPicker;
