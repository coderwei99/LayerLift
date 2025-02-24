import { ModalService } from '../utils/ModalManager';
export const modalService = new ModalService();

export const useModal = () => {
  return {
    open: modalService.open.bind(modalService),
    closeAll: modalService.closeAll.bind(modalService)
  };
};