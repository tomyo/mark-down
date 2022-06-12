import { useShowdown as useConverter } from './use-showdown.js'

class MarkDown extends HTMLElement {

  constructor() {
    super();
    this.loading = true;
    this.setupShadow()
  }

  setupShadow() {
    this.attachShadow({ mode: 'open' });

    const template = document.createElement('template');
    template.innerHTML = `
      <slot> <!-- MD-IN --> </slot> 
      <div part="html-out"></div> 
    `;
    this.shadowRoot.appendChild(template.content);
  }

  connectedCallback() {
    const slot = this.shadowRoot.querySelector('slot');
    slot.addEventListener('slotchange', this.onSlotChange);

    if (slot.assignedNodes().length) this.convertContent();
  }

  onSlotChange = () => {
    if (this.loading) {
      console.warn('[mark-down] onSlotChange: skipping convertion in loading state.')
      return
    }

    console.info('[mark-down] onSlotChange: converting new content.')
    this.convertContent()
  }

  convertContent() {
    const slot = this.shadowRoot.querySelector('slot');
    const div = this.shadowRoot.querySelector('div');
    const [_, convert] = useConverter();

    this.loading = true;

    let md = "";
    for (const node of slot.assignedNodes()) {
      md += node.nodeName === '#text' ? node.textContent : node.innerHTML;
    }

    slot.style = 'display: none;';
    div.innerHTML = convert(md);

    this.loading = false;
  }
}

customElements.define("mark-down", MarkDown);