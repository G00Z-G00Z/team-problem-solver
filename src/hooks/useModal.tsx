import { useCallback, useState } from 'react'

/**
 * Hook for managing a modal.
 * @param initial The initial state of the modal (defaults to close)
 * @returns [isOpen, openModal, closeModal, toggleModal]
 */
export const useModal: (
  initial?: boolean
) => [boolean, () => void, () => void, () => void] = (initial = false) => {
  const [isOpen, setIsOpen] = useState(initial);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((val) => !val);
  }, []);

  return [isOpen, open, close, toggle];
};
