
---

# LayerLift - 轻量级 Vue 3 模态框管理库

`LayerLift` 是一个基于 Vue 3 和 Arco Design 的模态框管理库，旨在为开发者提供一个轻量、灵活的方式来动态创建和管理模态框。它支持响应式数据、自定义组件和强大的回调机制，非常适合需要弹窗交互的现代前端项目。

## 功能亮点
- **动态模态框**：通过代码渲染自定义组件作为模态框内容。
- **响应式支持**：无缝集成 Vue 3 的 `reactive`，实时同步数据。
- **灵活回调**：通过 `resolve` 和 `reject` 轻松处理确认或取消逻辑。
- **多实例管理**：支持同时打开多个模态框，并可一键关闭所有实例。
- **高度可配置**：自定义标题、宽度、按钮文本等，满足多样化需求。

## 安装

通过 npm 安装 `LayerLift`：

```bash
npm install layerlift
```

确保你的项目已安装以下依赖：
- Vue 3: `npm install vue`
- Arco Design Web Vue: `npm install @arco-design/web-vue`

并在项目中引入 Arco Design 的样式：
```javascript
// main.ts 或 main.js
import '@arco-design/web-vue/dist/arco.css';
```

## 快速上手

### 示例代码
以下是一个简单的使用示例，展示如何使用 `LayerLift` 打开一个模态框：

```vue
<!-- 示例组件 -->
<script setup lang="ts">
import { reactive } from 'vue';
import { useModal } from 'layerlift';
import CustomModal from './CustomModal.vue';

const modal = useModal();

const handleOpenModal = async () => {
  const formData = reactive({ name: '', age: '' });

  try {
    const result = await modal.open(
      CustomModal, // 自定义模态框组件
      formData, // 初始数据模型
      async (state, resolve, reject) => {
        // 模拟异步操作
        const res = await fetchData();
        if (res.success) {
          resolve(state); // 成功时关闭并返回值
        } else {
          reject(); // 失败时保持打开
        }
      },
      { title: '编辑信息', width: 600 } // 配置项
    );
    console.log('模态框返回:', result);
  } catch (e) {
    console.error('操作失败:', e.message);
  }
};

const fetchData = () => Promise.resolve({ success: true });
</script>

<template>
  <button @click="handleOpenModal">打开模态框</button>
</template>
```

### 自定义模态框组件
你需要创建一个自定义组件作为模态框内容，例如：

```vue
<!-- CustomModal.vue -->
<script setup lang="ts">
defineProps<{
  model: { name: string; age: string };
  onSubmit: () => void;
  onClose: () => void;
}>();
</script>

<template>
  <div>
    <a-input v-model="model.name" placeholder="请输入姓名" />
    <a-input v-model="model.age" placeholder="请输入年龄" />
    <a-button type="primary" @click="onSubmit">提交</a-button>
    <a-button @click="onClose">关闭</a-button>
  </div>
</template>
```

## API 参考

### `useModal`
```typescript
import { useModal } from 'layerlift';
const modal = useModal();
```
返回一个 `ModalService` 实例，用于管理模态框。

### `modal.open`
```typescript
modal.open<T extends object>(
  component: Component, // 模态框内容的 Vue 组件
  formModel: T, // 初始数据模型（需为 reactive 对象）
  callback: (state: T, resolve: (value: T) => void, reject: (forceClose?: boolean) => void) => void, // 自定义逻辑
  options?: ModalOptions // 配置项
): Promise<T>
```

- **参数**：
  - `component`: 渲染为模态框内容的 Vue 组件。
  - `formModel`: 传入的响应式数据模型。
  - `callback`: 处理模态框逻辑的回调函数。
    - `state`: 当前数据状态。
    - `resolve(value)`: 成功时调用，关闭模态框并返回 `value`。
    - `reject(forceClose?)`: 失败时调用，默认保持打开，传入 `true` 强制关闭。
  - `options` (可选):
    - `title`: 模态框标题 (string)。
    - `width`: 模态框宽度 (number | string)。
    - `okText`: 确认按钮文本 (string)。
    - `cancelText`: 取消按钮文本 (string)。

- **返回值**: `Promise`，成功时返回更新后的 `formModel`，失败时抛出错误。

### `modal.closeAll`
```typescript
modal.closeAll(): void
```
关闭所有已打开的模态框实例。

## 自定义组件要求
自定义模态框组件需要接受以下 props：
- `model`: 数据模型（响应式对象）。
- `onSubmit`: 提交事件处理函数。
- `onClose`: 关闭事件处理函数。

## 注意事项
1. **依赖样式**：确保已引入 `@arco-design/web-vue/dist/arco.css`，否则模态框样式可能缺失。
2. **错误处理**：建议用 `try/catch` 包裹 `modal.open` 调用，以捕获异常。
3. **关闭行为**：调用 `reject` 时模态框默认不关闭，需明确传入 `reject(true)` 强制关闭。
4. **TypeScript 支持**：推荐使用 TypeScript 以获得更好的类型提示。

## 贡献
欢迎提交 issue 或 pull request，帮助我们改进 `LayerLift`！如果有功能建议或 bug 反馈，请随时联系我们。

## 许可证
MIT License

---
