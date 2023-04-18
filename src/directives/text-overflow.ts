import type { Directive, App } from "vue";
const ellipsisDirective: Directive = {
  mounted(el: HTMLElement, binding) {
    el.style.cssText =
      (binding.value
        ? `-webkit-line-clamp:${binding.value};display: -webkit-box;-webkit-box-orient:vertical;word-wrap: break-word;`
        : "white-space:nowrap;") + "text-overflow:ellipsis;overflow:hidden;";
  },
};
export function setupEllipsisDirective(app: App) {
  app.directive("ellipsis", ellipsisDirective);
}
export default ellipsisDirective;
