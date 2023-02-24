import type { Directive, App } from "vue";
const ellipsisDirective: Directive = {
  beforeMount(el: HTMLElement, binding) {
    el.style.textOverflow = "ellipsis";
    el.style.whiteSpace = "nowarp";
    el.style.overflow = "hidden";
  },
};

export function setupEllipsisDirective(app: App) {
  app.directive("ellipsis", ellipsisDirective);
}

export default ellipsisDirective;
