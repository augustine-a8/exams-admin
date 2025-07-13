import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";
import Avatar from "./Avatar";

const customShadow =
  "shadow-[0_0_0.25em_rgba(67,71,85,0.27),_0_0.25em_1em_rgba(90,125,188,0.05)]";

export default function Navbar() {
  const [showCollectionDropdown, setShowCollectionDropdown] =
    useState<boolean>(false);
  const [showRemunerationDropwdown, setShowRemunerationDropdown] =
    useState<boolean>(false);

  const toggleCollectionDropdown = () => {
    setShowCollectionDropdown((prev) => !prev);
  };

  const toggleRemunerationDropdown = () => {
    setShowRemunerationDropdown((prev) => !prev);
  };

  const collectionDropdownRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        collectionDropdownRef.current &&
        !collectionDropdownRef.current.contains(event.target as Node)
      ) {
        setShowCollectionDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [collectionDropdownRef]);

  const remunerationDropdownRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        remunerationDropdownRef.current &&
        !remunerationDropdownRef.current.contains(event.target as Node)
      ) {
        setShowRemunerationDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [remunerationDropdownRef]);

  return (
    <nav className="h-22 w-[100vw] grid place-items-center border-b border-b-gray-300 shadow-lg">
      <div className="flex flex-row items-center justify-between w-[90%]">
        <div className="w-16 h-16">
          <img
            src="/coe-logo.jpg"
            alt="College of engineering exams office logo"
          />
        </div>

        <ul className="flex flex-row items-center gap-8">
          <li className="relative">
            <button
              onClick={toggleCollectionDropdown}
              className="flex flex-row items-center gap-1 hover:opacity-70 duration-200 hover:cursor-pointer"
            >
              <p className="font-medium">Collection</p>
              <i className="ri-arrow-down-s-line text-lg text-gray-500"></i>
            </button>
            {showCollectionDropdown && (
              <ul
                ref={collectionDropdownRef}
                className={`bg-white rounded-lg p-1.5 absolute -left-10 -right-10 top-[calc(100%+10px)] ${customShadow}`}
              >
                <li className="py-2 px-4 rounded-md hover:cursor-pointer hover:bg-gray-100 font-medium">
                  <NavLink to={""}>
                    <p>Main Campus</p>
                  </NavLink>
                </li>
                <li className="py-2 px-4 rounded-md hover:cursor-pointer hover:bg-gray-100 font-medium">
                  <NavLink to={""}>
                    <p>Obuasi</p>
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          <li>
            <NavLink to={""} className="hover:opacity-70 duration-200">
              <p className="font-medium">Checker</p>
            </NavLink>
          </li>
          <li>
            <NavLink to={""} className="hover:opacity-70 duration-200">
              <p className="font-medium">Scantron</p>
            </NavLink>
          </li>
          <li className="relative">
            <button
              onClick={toggleRemunerationDropdown}
              className="flex flex-row items-center gap-1 hover:opacity-70 duration-200 hover:cursor-pointer"
            >
              <p className="font-medium">Remuneration</p>
              <i className="ri-arrow-down-s-line text-lg text-gray-500"></i>
            </button>
            {showRemunerationDropwdown && (
              <ul
                ref={remunerationDropdownRef}
                className={`bg-white rounded-lg p-1.5 absolute -left-10 -right-10 top-[calc(100%+10px)] ${customShadow}`}
              >
                <li className="py-2 px-4 rounded-md hover:cursor-pointer hover:bg-gray-100 font-medium">
                  <NavLink to={"/remuneration/signatures"}>
                    <p>Signatures</p>
                  </NavLink>
                </li>
                <li className="py-2 px-4 rounded-md hover:cursor-pointer hover:bg-gray-100 font-medium">
                  <NavLink to={""}>
                    <p>Report</p>
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          <li>
            <NavLink to={""} className="hover:opacity-70 duration-200">
              <p className="font-medium">Timetable</p>
            </NavLink>
          </li>
          <li>
            <NavLink to={""} className="hover:opacity-70 duration-200">
              <p className="font-medium">Students</p>
            </NavLink>
          </li>
        </ul>

        <div>
          <div>
            <Avatar name="Enemy Chaser" />
          </div>
        </div>
      </div>
    </nav>
  );
}
