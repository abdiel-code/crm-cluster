import { useState, useCallback } from "react";

const useModal = () => {
  const [modalState, setModalState] = useState({ isOpen: false, id: null });

  const toggleModal = useCallback((id = null) => {
    setModalState((prev) => ({
      isOpen: !prev.isOpen,
      id: !prev.isOpen ? id : null,
    }));
  }, []);

  return [modalState, toggleModal];
};

export default useModal;
