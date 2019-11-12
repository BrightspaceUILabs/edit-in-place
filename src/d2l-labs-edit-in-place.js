/**
 * 'd2l-labs-edit-in-place
 * Lit-based web component for displaying text and editing it directly.
 *
 * @demo demo/d2l-labs-edit-in-place.html
 */

import { css, html, LitElement } from 'lit-element/lit-element.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import '@brightspace-ui/core/components/inputs/input-text.js';
import '@brightspace-ui/core/components/button/button.js';

class EditInPlace extends LocalizeMixin(LitElement) {

	static get properties() {
		return {
			value: {type:String},
			placeholder: {type: String},

			//Todo
			name: { type: String },
			readOnly: {type: Boolean},
			max: { type: String },
			min: { type: String },
			size: { type: Number },


			__inputText: {type:String},
			__inputMode: { type: Boolean },
		};
	}

	static get styles() {
		return css`
			:host {
				display: inline-block;
				width: 100%
			}

			.Edit-In-Place-Container{
				display: inline-block;
				overflow: visible;
				min-height: 42px;
				height: 42px;
				background:yellow;

			}

			.Label-Container{
				display: flex;
				height:100%;
			}

			.Editable-Text-Button {
				display:flex;
				justify-content: center;
				align-items: center;
				padding: 6px;
			}

			.Editable-Text-Button:hover {
				color: #069;
				cursor: pointer;
				font-style: italic;
			}

			.Input-Container{
				display:flex;
				height:100%;
			}

			.Input-Box{
				display: flex;
				justify-content: center;
				align-items: center;
				padding:6px;
			}

			.Input-Button{
				display: flex;
				justify-content: center;
				align-items: center;
				padding:6px;
			}

			.Label-Text {

			}

			.Placeholder-Label-Text{
				font-style: italic;
			}

			[hidden]{
				display:none;
			}
		`;
	}

	constructor() {
		super();

		this.__inputMode = false;
		this.value="This is the loaded text"
		this.placeholder="Enter Some Text"
		this.__inputTextValue = ""
	}

	render() {
		return html`
		<div class="Edit-In-Place-Container">
			<div class="Label-Container" ?hidden="${this.__inputMode}">
				<div role="button" tabindex="0" class="Editable-Text-Button" @click="${this.enterInputMode}" @keydown="${e => this.enterInputMode(e)}">
					<span ?hidden="${this.canShowValueLabel()}">${this.value}</span>
					<span class="Placeholder-Label-Text" ?hidden="${!this.canShowValueLabel()}">${this.placeholder}</span>
				</div>
			</div>

			<div class="Input-Container" ?hidden="${!this.__inputMode}">
				<d2l-input-text id="Input-Box" class="Input-Box"
					@keydown="${e => this.saveValueChange_Keypress(e)}"
					@change=${e => this.updateInputTextValue(e)}
					placeholder="${this.placeholder}"
				>
				</d2l-input-text>
				<d2l-button class="Input-Button" primary @click="${this.saveValueChange}">Save</d2l-button>
				<d2l-button class="Input-Button" @click="${this.cancelValueChange}">Cancel</d2l-button>
			</div>
		</div>
		`;
	}

	enterInputMode(e){
		if(e.keyCode === 13)
		{
			this.enterInputMode();
		}
	}

	enterInputMode(){
		this.__inputMode = true;
	}

	enterLabelMode(){
		this.__inputMode = false;
	}

	saveValueChange_Keypress(e){
		if(e.keyCode === 13)
		{
			this.updateInputTextValue(e);
			this.saveValueChange();
		}
	}

	saveValueChange(){
		this.value = this.__inputTextValue;
		this.enterLabelMode();
	}

	cancelValueChange(){
		this.__inputTextValue = this.value;
		this.shadowRoot.getElementById('Input-Box').value = this.value;
		this.enterLabelMode();
	}

	updateInputTextValue(e){
		this.__inputTextValue = e.target.value;
	}

	canShowValueLabel(){
		return !this.value.length > 0;
	}
}
customElements.define('d2l-labs-edit-in-place', EditInPlace);
