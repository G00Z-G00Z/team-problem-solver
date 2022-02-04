import React, { FC } from 'react'
import ReactModal from 'react-modal'
import { appColors } from '../../types/AppColors'
import { hashMapWeightData, weightColors } from './interfaces'

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
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      aria={{
        describedby: "Description of how 'Divide Work' works",
      }}
      className={`w-2/3 max-w-lg mx-auto 
        bg-gray-100 dark:bg-gray-800 my-40 
        flex flex-col
        relative`}
    >
      <h1>How to use Divide Up Work?</h1>
      <p>
        This is an application that takes your <b>tasks</b> and their{" "}
        <b>difficulty</b>, and <b>splits them based on their difficulty</b> as
        evenly as possible.
      </p>

      <h2>How does the app split the tasks?</h2>

      <p>
        First, the app ask you to rate each tasks based on their{" "}
        <b>difficulty</b>. Then each difficulty is assigned a <b>weight</b> as
        shown below:{" "}
      </p>
      <ul>
        {weightColors.map(({ name, color, weight }, idx) => (
          <li key={idx}>
            <span
              className="rounded-full px-2 "
              style={{
                backgroundColor:
                  appColors[hashMapWeightData[weight].color][200],
                color: appColors[hashMapWeightData[weight].color][500],
              }}
            >
              {name}
            </span>{" "}
            <>&rarr;</> <span>{weight}pts</span>
          </li>
        ))}
      </ul>
      <p>
        Finally using these weights, the app gets the <b>total workload</b> and
        tries to divide the tasks as evenly as possible amongst the teamates.{" "}
      </p>
      <button className="absolute top-0 right-0" onClick={openModal}>
        Close
      </button>
    </ReactModal>
  );
};
