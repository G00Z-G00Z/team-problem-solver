import React, { Children, FC, useContext } from 'react'
import ReactModal from 'react-modal'
import { appColors } from '../../types/AppColors'
import { hashMapWeightData, weightColors } from './interfaces'
import { Modal } from '../../components/General/Modal'
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
    <Modal
      closeModal={closeModal}
      openModal={openModal}
      isOpen={isOpen}
      contentElement={(props, children) => (
        <div {...props}>
          {" "}
          {children}
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
            <b>difficulty</b> and then each one is assigned a <b>weight</b> as
            shown below:{" "}
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
            Finally using these weights, the app gets the <b>total workload</b>{" "}
            and tries to divide the tasks as evenly as possible amongst the
            teamates.{" "}
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
        </div>
      )}
    />
  );
};
