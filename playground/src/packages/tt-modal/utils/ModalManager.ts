import { createApp, h, type Component, type App, ref, reactive, type UnwrapNestedRefs } from 'vue';
import { Modal } from '@arco-design/web-vue';

type ModalInstance = {
  id: symbol;
  app: App;
  container: HTMLDivElement;
  close: () => void;
};

interface ModalOptions {
  title?: string;
  width?: number | string;
  okText?: string;
  cancelText?: string;
}

export class ModalService {
  private instances: ModalInstance[] = [];

  public open<T extends object>(
    component: Component,
    formModel: T,
    options: ModalOptions = {}
  ): Promise<UnwrapNestedRefs<T>> {
    const container = document.createElement('div');
    const id = Symbol('modal-instance');
    const self = this;

    const state = reactive(formModel) as UnwrapNestedRefs<T>;
    let resolveRef: (value: UnwrapNestedRefs<T>) => void;
    let rejectRef: (reason?: any) => void;

    const app = createApp({
      setup() {
        const visible = ref(true);

        const handleSubmit = () => {
          visible.value = false;
          resolveRef({ ...state });
        };

        const handleCancel = (reason = 'Modal canceled') => {
          visible.value = false;
          rejectRef(new Error(reason));
        };

        return () => h(Modal, {
          visible: visible.value,
          title: options.title,
          width: options.width,
          okText: options.okText,
          cancelText: options.cancelText,
          onOk: handleSubmit,
          onCancel: () => handleCancel('User clicked cancel'),
          onMaskClick: () => handleCancel('User clicked mask'),
          afterClose: () => {
            self.removeInstance(id);
            app.unmount();
            container.remove();
          }
        }, {
          default: () => h(component, {
            model: state,
            onSubmit: handleSubmit,
            onClose: () => handleCancel('User triggered close')
          })
        });
      }
    });

    this.instances.push({
      id,
      app,
      container,
      close: () => {
        rejectRef(new Error('Programmatic close'));
        app.unmount();
      }
    });

    document.body.appendChild(container);
    app.mount(container);

    return new Promise<UnwrapNestedRefs<T>>((resolve, reject) => {
      resolveRef = resolve;
      rejectRef = reject;
    });
  }

  private removeInstance(id: symbol) {
    const index = this.instances.findIndex(i => i.id === id);
    if (index > -1) {
      const instance = this.instances.splice(index, 1)[0];
      instance.container.remove();
    }
  }

  public closeAll() {
    this.instances.forEach(instance => instance.close());
    this.instances = [];
  }
}
