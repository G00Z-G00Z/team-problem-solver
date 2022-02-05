import React, { FC, useContext } from 'react'
import ReactModal from 'react-modal'
import { appColors } from '../../types/AppColors'
import { hashMapWeightData, weightColors } from './interfaces'
import { ReactComponent as CloseIcon } from '../../assets/close.svg'
import { UiContext } from '../../context/uiContext'

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
}

export const InstructionModal: FC<Props> = ({
  isOpen,
  closeModal,
  openModal,
}) => {
  const { darkmode } = useContext(UiContext);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      aria={{
        describedby: "Description of how 'Divide Work' works",
      }}
      className={`w-4/5 lg:w-2/3 h-2/3 max-w-lg mx-auto px-5 py-4
      bg-gray-100
         dark:bg-gray-800 top-1/2 -translate-y-1/2 
        text-gray-800 dark:text-gray-200 
        flex flex-col gap-4
        relative rounded-lg 
        shadow-lg text-base
        transition-all
        overflow-y-auto
        `}
      style={{
        overlay: {
          backgroundColor: darkmode
            ? "hsla(0, 0%, 20.2%, .5)"
            : "hsla(0, 0%, 90.2%, .5)",
          backdropFilter: "blur(2px)",
          zIndex: 20,
          WebkitBackdropFilter: "blur(2px)",
        },
      }}
    >
      <button
        className="sticky top-0 left-0  fill-gray-300 dark:fill-gray-500  dark:hover:fill-gray-300 text-left"
        onClick={closeModal}
      >
        <CloseIcon className="stroke-1 fill-inherit  -top-3 -right-5  absolute" />
      </button>
      <h1 className="text-gray-900 dark:text-gray-200 w-full text-xl font-serif text-center font-bold">
        How to use "Divide Up Work"?
      </h1>
      <p>
        This is an application that takes your <b>tasks</b>, and{" "}
        <b>splits them based on their difficulty</b> as evenly as possible.
      </p>

      <h2 className="text-gray-900 dark:text-gray-200 w-full text-xl font-serif text-center font-bold">
        How does the app split the tasks?
      </h2>

      <p>
        First, the app ask you to rate each tasks based on their{" "}
        <b>difficulty</b> and then each one is assigned a <b>weight</b> as shown
        below:{" "}
      </p>
      <ul className=" max-w-md mx-auto">
        {weightColors.map(({ name, color, weight }, idx) => (
          <li key={idx} className="grid grid-cols-3 items-center">
            <div className="text-center">
              <span
                className="rounded-full px-2 flex-1"
                style={{
                  background: darkmode
                    ? appColors[hashMapWeightData[weight].color][200]
                    : appColors[hashMapWeightData[weight].color][100],
                  borderColor: darkmode
                    ? appColors[hashMapWeightData[weight].color][500]
                    : appColors[hashMapWeightData[weight].color][400],
                  color: appColors[hashMapWeightData[weight].color][500],
                }}
              >
                {name}
              </span>{" "}
            </div>
            <span className="text-center">&rarr;</span>{" "}
            <span className="text-center">{weight}pts</span>
          </li>
        ))}
      </ul>
      <p>
        Finally using these weights, the app gets the <b>total workload</b> and
        tries to divide the tasks as evenly as possible amongst the teamates.{" "}
      </p>

      <button
        className="
        bg-CTA-400 hover:bg-CTA-500 text-gray-100
        w-24 mx-auto py-1 px-3 rounded-md transition-colors
        text-lg"
        onClick={closeModal}
      >
        Got it!
      </button>
    </ReactModal>
  );
};
