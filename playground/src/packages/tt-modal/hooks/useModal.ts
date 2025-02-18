import ModalManager from '../utils/ModalManager';

export const useModal = () => {
  // create ModalManager instance
  const modalManager = new ModalManager();

  return {
    dialog: {
      open: modalManager.open.bind(modalManager),
      close: modalManager.close.bind(modalManager),
    },
  };
};