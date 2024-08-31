import React, { useCallback, useState } from "react";
import { useComments } from "../../contexts/Comment/Comment.provider";
import { IoIosClose, IoLogoWhatsapp } from "react-icons/io";
import { HiPhoneArrowDownLeft } from "react-icons/hi2";
import { format } from "date-fns";
import { IoCallSharp } from "react-icons/io5";
import { MdPhoneCallback } from "react-icons/md";
import { Link } from "react-router-dom";

interface CommentProps {
  callType: string;
  worker?: {
    id?: number;
    avatar?: { image: string }[];
    fullName: string;
    phoneNumber: string;
    profession?: { name?: string };
    address: string;
  };
  userApp: {
    fullName: string;
    phoneNumber: string;
  };
  comment: string;
  createdAt: string;
}

const GrowthChart = () => {
  const { calls } = useComments();
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState<CommentProps | null>(
    null
  );

  const closeSlider = useCallback(() => {
    setIsSliderOpen(false);
    setSelectedComment(null); // Réinitialiser les données sélectionnées
  }, []);

  const openSlider = useCallback((comment: CommentProps) => {
    setSelectedComment(comment);
    setIsSliderOpen(true);
  }, []);

  console.log(calls);

  return (
    <div className="flex-1 h-[444px] pt-5 rounded-[8px] border border-[#eff4fa] bg-[#fff] flex flex-col justify-between  items-center">
      <div className="w-full flex px-5 justify-between items-center border-b border-[#eff4fa] pb-2">
        <h6 className="text-[17px] font-semibold leading-[0.94] text-left text-[#222b45]">
          Derniers Appels
        </h6>
      </div>
      <div className="flow-root w-full pb-2 overflow-y-auto ">
        <ul
          role="list"
          className="divide-y divide-gray-200 w-full cursor-pointer"
        >
          {calls.map((item: any, index: number) => (
            <li
              key={index}
              onClick={() => openSlider(item)}
              className="py-1 sm:py-2 w-full px-5 hover:bg-[#eff4fa]"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {item.callType === "CALL" ? (
                    <HiPhoneArrowDownLeft
                      size={32}
                      className="text-[#14ABE3] w-8 h-8"
                    />
                  ) : (
                    <IoLogoWhatsapp
                      size={32}
                      className="text-green-600 w-8 h-8"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-gray-900 truncate">
                    {item.userApp?.fullName}
                  </p>
                  <p className="text-[11px] text-gray-500 truncate">
                    {item.userApp?.phoneNumber}
                  </p>
                </div>
                <div className="inline-flex items-center text-[11px] text-gray-500 truncate">
                  {format(new Date(item?.createdAt), "dd/MM/yyyy - HH:mm")}
                </div>
              </div>
            </li>
          ))}

          {isSliderOpen && selectedComment && (
            <div className="w-full fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
              <div className="relative w-[500px] h-[300px] bg-white flex flex-col gap-4 py-4 rounded-md">
                <button
                  onClick={closeSlider}
                  className="absolute top-3 right-3 text-black"
                >
                  <IoIosClose size={25} />
                </button>
                <div className="w-full flex flex-col mt-5 p-4 hover:bg-[#eff4fa]">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <IoCallSharp className="text-[#14ABE3]" size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-semibold text-gray-900 truncate">
                        {selectedComment.userApp?.fullName}
                      </p>
                      <p className="text-[11px] text-gray-500 truncate">
                        {selectedComment.userApp?.phoneNumber}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-[11px] text-gray-500 truncate">
                      {format(
                        new Date(selectedComment?.createdAt),
                        "dd/MM/yyyy - HH:mm"
                      )}
                    </div>
                  </div>
                </div>
                <Link
                  to={`/dashboard/workers/${selectedComment.worker?.id}`}
                  className="w-full flex flex-col hover:bg-[#eff4fa] p-4"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <MdPhoneCallback className=" text-green-600" size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-semibold text-gray-900 truncate">
                        {selectedComment.worker?.fullName}
                      </p>
                      <p className="text-[11px] text-gray-500 truncate">
                        {selectedComment.worker?.profession?.name}
                      </p>
                      <p className="text-[11px] text-gray-500 truncate">
                        {selectedComment.worker?.phoneNumber}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-[11px] text-gray-500 truncate">
                      {" "}
                      {selectedComment.worker?.address}
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default GrowthChart;
