import { Modal, type ModalConfig } from '@arco-design/web-vue';
import { h } from 'vue';
import type { Component } from 'vue';
import type { TTModal } from '../types/modal';
import type { RenderContent } from '@arco-design/web-vue/es/_utils/types';


class ModalManager {
  private dialogStack: any[] = [];

  constructor() {
    this.dialogStack = []; // 存储打开的 Modal 堆栈
  }

  open(component: Component, props: Omit<ModalConfig, 'content'>, parentModal = null): Promise<any> {
    return new Promise((resolve, reject) => {
      const parentDialog = this.dialogStack[this.dialogStack.length - 1];

      const currentDialog: TTModal = {
        component,
        props,
        modal: null,
        parentModal: parentDialog,
      };

      const modal = Modal.open({
        title: props.title || 'Dialog Title',
        content: h(component, {
          ...props,
          openSubModal: this.openSubModal.bind(this),
        }) as unknown as RenderContent,
        onCancel: () => {
          this.close(currentDialog);
          reject('canceled');
        },
        onOk: () => {
          // 通过 ref 获取组件实例和其内部数据
          this.close(currentDialog);
          resolve(1);
        },
        ...props,
      });

      currentDialog.modal = modal;
      this.dialogStack.push(currentDialog);
    });
  }

  close(dialog: TTModal) {
    if (!dialog.modal) return;
    dialog.modal.close(); // 关闭当前对话框

    // 移除堆栈中的当前对话框
    const index = this.dialogStack.indexOf(dialog);
    if (index !== -1) {
      this.dialogStack.splice(index, 1);
    }

    // 如果存在父级 Modal，关闭父级 Modal
    if (dialog.parentModal) {
      dialog.parentModal.close();
    }
  }

  // 用于打开子级 Modal 的方法
  openSubModal(component: Component, props: Omit<ModalConfig, 'content'>) {
    this.open(component, props);
  }
}

export default ModalManager;
