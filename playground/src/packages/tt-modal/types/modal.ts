import type { Component } from 'vue';
import type { ModalReturn } from '@arco-design/web-vue';

export interface TTModal {
  component: Component;
  props: Record<string, any>;
  modal: ModalReturn | null;
  parentModal: ModalReturn | null;
}