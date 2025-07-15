import { DatePicker, RoomPicker } from "../components";
import { useQuery } from "@apollo/client";
import { GET_ALL_ROOMS, GET_SIGNATURES } from "../api";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import type { IRoom, ISignature } from "../types";

export default function Signature() {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const {
    data: getSignaturesData,
    loading: getSignaturesLoading,
    error: getSignaturesError,
  } = useQuery(GET_SIGNATURES, {
    variables: { pageNumber, itemsPerPage },
  });

  const {
    data: getAllRoomsData,
    loading: getAllRoomsLoading,
    error: getAllRoomsError,
  } = useQuery(GET_ALL_ROOMS);

  const handleDateRangeChange = (from: Date | null, to: Date | null) => {
    console.log("Selected Date Range:", { from, to });
  };

  const handleRoomChange = (room: IRoom) => {
    console.log("Selected Room: ", room);
  };

  if (getSignaturesLoading || getAllRoomsLoading) {
    return (
      <div className="w-full h-full grid place-items-center">
        <ClipLoader size={24} color="black" />
      </div>
    );
  }

  if (getSignaturesError || getAllRoomsError) {
    return (
      <div className="w-full h-full grid place-items-center">
        {getSignaturesError && (
          <p className="text-red-500 font-medium text-center">
            {getSignaturesError.message}
          </p>
        )}
        {getAllRoomsError && (
          <p className="text-red-500 font-medium text-center">
            {getAllRoomsError.message}
          </p>
        )}
      </div>
    );
  }

  const signatures = getSignaturesData.getSignatures.signatures;
  const pageInfo = getSignaturesData.getSignatures.pageInfo;

  const rooms: IRoom[] = getAllRoomsData.getAllRooms;

  return (
    <div>
      <div className="flex flex-row items-center justify-between lg:py-10">
        <div>
          <p className="text-2xl font-medium lg:mb-4">
            Signed Invigilator Records
          </p>
          <p className="w-[70%] text-sm text-gray-500">
            A comprehensive log of invigilator signatures, detailing the date of
            signature, the invigilated session, and the corresponding
            examination room.
          </p>
        </div>
        <div>
          <button>
            <div className="border border-gray-500 rounded-full px-4 py-2 hover:cursor-pointer hover:bg-black hover:text-white duration-200">
              <p>Export all data</p>
            </div>
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-300 shadow-lg rounded-xl">
        <div className="flex flex-row items-center justify-between p-4 border-b border-b-gray-300">
          <div className="border border-gray-200 rounded-md flex flex-row px-2 py-1 gap-1">
            <i className="ri-search-line text-gray-300"></i>
            <input
              type="text"
              placeholder="Search exam support"
              className="outline-0 border-0"
            />
          </div>

          <div className="flex flex-row items-center gap-2">
            <div className="min-w-[250px]">
              <DatePicker onDateRangeChange={handleDateRangeChange} />
            </div>
            <div className="min-w-[150px]">
              <RoomPicker rooms={rooms} onRoomRangeChange={handleRoomChange} />
            </div>
          </div>
        </div>

        <div>
          <table className="w-full">
            <thead>
              <tr className="flex flex-row">
                <th className="flex-[2_0_0] uppercase font-medium py-3 px-6 border-r border-b border-gray-300 bg-[#f8f9fa] text-[#7f7f7f] text-left text-sm">
                  Name
                </th>
                <th className="flex-1 uppercase font-medium py-3 px-6 border-r border-b border-gray-300 bg-[#f8f9fa] text-[#7f7f7f] text-left text-sm">
                  Category
                </th>
                <th className="flex-1 uppercase font-medium py-3 px-6 border-r border-b border-gray-300 bg-[#f8f9fa] text-[#7f7f7f] text-left text-sm">
                  Room
                </th>
                <th className="flex-1 uppercase font-medium py-3 px-6 border-r border-b border-gray-300 bg-[#f8f9fa] text-[#7f7f7f] text-left text-sm">
                  Duration
                </th>
                <th className="flex-[2_0_0] uppercase font-medium py-3 px-6 border-r border-b border-gray-300 bg-[#f8f9fa] text-[#7f7f7f] text-left text-sm">
                  Date
                </th>
                <th className="flex-1 uppercase font-medium py-3 px-6 border-b border-gray-300 bg-[#f8f9fa] text-[#7f7f7f] text-left text-sm">
                  Session
                </th>
              </tr>
            </thead>
            <tbody className="w-full table-fixed block max-h-[calc(100vh-30.75rem)] overflow-y-auto">
              {signatures.map((signature: ISignature) => {
                const { _id, user, room, session, signedAt, duration } =
                  signature;

                const hours = duration / 60;

                return (
                  <tr key={_id} className="flex flex-row">
                    <td className="flex-[2_0_0] font-medium py-4 px-6 border-b border-b-gray-200">
                      {user.name}
                    </td>
                    <td className="flex-1 font-medium text-gray-500 py-4 px-6 border-b border-b-gray-200">
                      {user.category}
                    </td>
                    <td className="flex-1 font-medium text-gray-500 py-4 px-6 border-b border-b-gray-200">
                      {room.name}
                    </td>
                    <td className="flex-1 font-medium text-gray-500 py-4 px-6 border-b border-b-gray-200">
                      {hours} {hours > 1 ? "hrs" : "hr"}
                    </td>
                    <td className="flex-[2_0_0] font-medium text-gray-500 py-4 px-6 border-b border-b-gray-200">
                      {new Date(signedAt).toDateString()}
                    </td>
                    <td className="flex-1 font-medium text-gray-500 py-4 px-6 border-b border-b-gray-200">
                      {session}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex items-center justify-between px-6 py-4 border-t border-t-gray-300">
            <div>
              <p className="text-gray-500 text-sm">
                Showing <span className="font-semibold">{pageInfo.start}</span>{" "}
                to <span className="font-semibold">{pageInfo.end}</span> of{" "}
                <span className="font-semibold">{pageInfo.total}</span>{" "}
                Signatures
              </p>
            </div>
            <div>
              <div>
                <nav
                  aria-label="Pagination"
                  className="flex -space-x-px rounded-md shadow-xs"
                >
                  <button className="inline-flex items-center px-2 py-2 rounded-l-md ring-1 ring-gray-300 ring-inset cursor-pointer hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    <i className="ri-arrow-left-s-line"></i>
                  </button>
                  <button className="inline-flex items-center px-4 py-2 ring-1 ring-gray-300 ring-inset cursor-pointer hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    1
                  </button>
                  <button className="inline-flex items-center px-4 py-2 ring-1 ring-gray-300 ring-inset cursor-pointer hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    2
                  </button>
                  <button className="inline-flex items-center px-4 py-2 ring-1 ring-gray-300 ring-inset cursor-pointer hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    3
                  </button>
                  <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 ring-inset focus:outline-offset-0">
                    ...
                  </span>
                  <button className="inline-flex items-center px-4 py-2 ring-1 ring-gray-300 ring-inset cursor-pointer hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    8
                  </button>
                  <button className="inline-flex items-center px-4 py-2 ring-1 ring-gray-300 ring-inset cursor-pointer hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    9
                  </button>
                  <button className="inline-flex items-center px-4 py-2 ring-1 ring-gray-300 ring-inset cursor-pointer hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    10
                  </button>
                  <button className="inline-flex items-center px-2 py-2 rounded-r-md ring-1 ring-gray-300 ring-inset cursor-pointer hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    <i className="ri-arrow-right-s-line"></i>
                  </button>
                </nav>
              </div>
            </div>
            <div className="inline-flex items-center space-x-2">
              <p className="text-sm font-medium text-gray-500">Go to page</p>
              <input
                type="number"
                name="go_to_page"
                id="go_to_page"
                min={1}
                value={pageNumber}
                onChange={(e) => {
                  const newPageNumber = Number(e.target.value);
                  if (newPageNumber > 0) {
                    setPageNumber(newPageNumber);
                  }
                }}
                className="ring-1 ring-gray-300 rounded-md w-20 px-2 py-1 outline-0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
