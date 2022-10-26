const template = document.createElement("template");

template.innerHTML = `
<style>
  .mini-box {
    width: 500px;
    height: 150px;
    background: #eee;
    margin-bottom: 10px;
    margin-right: 10px;
    
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button {
    border: 1px solid #ccc;
    background: #fff;
    padding: 10px;
  }

  button:hover {
    background: #333;
    color: #fff;
  }

  .container {
    text-align: center;
  }

  #result {
    margin-top: 10px;
    display: none;
  }

  #result.open {
    display: block;
  }

  #confirmation_modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.4);
    display: none;

    justify-content: center;
    align-items: center;
    text-align: center;
  }

  #confirmation_modal .content {
    background: #fff;
    padding: 20px;
  }

  #confirmation_modal .buttons button {
    padding: 10px 30px;
  }

  #confirmation_modal.open {
    display: flex;
  }
</style>
<div class="mini-box">
  <div class="container">
    <button id="button" onclick="this.getRootNode().host.openConfirmationModal()">Click</button>
    <div id="result"></div>
  </div>
  <div id="confirmation_modal">
    <div class="content">
      <p id="confirmation_text"></p>
      <div class="buttons">
        <button id="confirm" onclick="this.getRootNode().host.onConfirm()">Yes</button>
        <button id="cancel" onclick="this.getRootNode().host.onCancel()">No</button>
      </div>
    </div>
  </div>
</div>
`;

class ConfirmationModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector("#button").innerText = this.getAttribute("btnText");
    this.shadowRoot.querySelector("#confirmation_text").innerText = this.getAttribute("confirmationMessage");
    this.shadowRoot.querySelector("#confirm").innerText = this.getAttribute("confirmText");
    this.shadowRoot.querySelector("#cancel").innerText = this.getAttribute("cancelText");
  }

  connectedCallback() {
  }

  openConfirmationModal() {
    this.shadowRoot.querySelector('#confirmation_modal').classList.add("open")
    this.shadowRoot.querySelector("#result").innerText = ""
    this.shadowRoot.querySelector("#result").classList.remove("open")
  }

  closeConfirmationModal() {
    this.shadowRoot.querySelector('#confirmation_modal').classList.remove("open")
    this.shadowRoot.querySelector("#result").classList.add("open")
  }

  onConfirm() {
    this.closeConfirmationModal()
    this.shadowRoot.querySelector("#result").innerText = this.getAttribute("confirmMessage");
  }

  onCancel() {
    this.closeConfirmationModal()
    this.shadowRoot.querySelector("#result").innerText = this.getAttribute("cancelMessage");
  }
}
window.customElements.define("confirmation-modal", ConfirmationModal);
