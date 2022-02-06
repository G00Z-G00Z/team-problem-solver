import ReactModal from 'react-modal'
import { FC, useContext } from 'react'
import { RoundedCheckbox } from './RoundedCheckbox'
import { UiContext } from '../../context/uiContext'

// Check the documentation on how to put it:
// https://reactcommunity.org/react-modal/
interface Props {
  isOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
  contentElement: (
    props: React.ComponentPropsWithRef<"div">,
    children: React.ReactNode
  ) => React.ReactElement;
}

export const Modal: FC<Props> = ({
  isOpen,
  closeModal,
  openModal,
  contentElement,
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
      className={`w-4/5 lg:w-2/3 h-2/3 max-w-lg mx-auto px-5 py-4
      bg-gray-100
         dark:bg-gray-800 top-1/2 -translate-y-1/2 
        text-gray-800 dark:text-gray-200 
        flex flex-col gap-4
        relative rounded-lg 
        shadow-lg text-base
        transition-all
        overflow-y-auto
        outline-none
        `}
      style={{
        overlay: {
          backgroundColor: "",
          backdropFilter: "blur(2px)",
          zIndex: 20,
          WebkitBackdropFilter: "blur(2px)",
        },
      }}
      contentElement={contentElement}
    />
  );
};
