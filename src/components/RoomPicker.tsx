import { useEffect, useRef, useState } from "react";
import { cn } from "../utils/cn";
import type { IRoom } from "../types";

interface RoomPickerProps {
  rooms: IRoom[];
  onRoomRangeChange: (room: IRoom) => void;
}

const RoomPicker: React.FC<RoomPickerProps> = ({
  rooms,
  onRoomRangeChange,
}) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selectedRoom, setSelectedRoom] = useState<IRoom | null>(null);

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
              {rooms.map((room: IRoom) => {
                const { _id, name } = room;

                return (
                  <div
                    key={_id}
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
