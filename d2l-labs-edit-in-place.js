/**
 * 'd2l-labs-edit-in-place
 * Lit-based web component for displaying text and editing it directly.
 *
 * @demo demo/d2l-labs-edit-in-place.html
 */
import '@brightspace-ui/core/components/inputs/input-text.js';
import '@brightspace-ui/core/components/button/button.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';

class EditInPlace extends LocalizeMixin(LitElement) {

	static get properties() {
		return {
			value: {type:String},
			placeholder: {type: String},
			size: { type: Number },
			readonly: {type: Boolean},
			maxlength: { type: String },

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
				height: 100%;
				min-height:42px;
			}

			.Label-Container{
				display: flex;
				height:100%;
			}

			.Editable-Text-Label {
				display:flex;
				justify-content: center;
				align-items: center;
			}

			.Editable-Text-Label:hover {
				color: #069;
				cursor: pointer;
				font-style: italic;
			}

			.Readonly-Text-Label {
				display:flex;
				justify-content: center;
				align-items: center;
			}

			.Input-Container{
				display:flex;
				height:100%;
			}

			.Input-Box{
				display: flex;
				justify-content: center;
				align-items: center;
				padding-right:6px;
			}

			.Input-Button{
				display: flex;
				justify-content: center;
				align-items: center;
				padding-left:6px;
				padding-right:6px;
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
		this.value = '';
		this.placeholder = 'Enter a value';

		this.__inputTextValue = '';
		this.__inputMode = false;
	}

	render() {
		return html`
			<div class="Edit-In-Place-Container">
				<div class="Label-Container" ?hidden="${this.__inputMode}">
					<div id="Edit-In-Place-Label" role="${this._determineLabelRole()}" tabindex="${this._determineLabelTabindex()}" class="${this._determineLabelClass()}" @click="${this._enterInputMode}" @keydown="${this._enterInputMode_keydown}">
						<span ?hidden="${this._canShowValueLabel()}" aria-label="Edit: ${this.value}">${this.value}</span>
						<span class="Placeholder-Label-Text" ?hidden="${!this._canShowValueLabel()}">${this.placeholder}</span>
					</div>
				</div>

				<div class="Input-Container" ?hidden="${!this.__inputMode}">
					<d2l-input-text
						id="Input-Box"
						class="Input-Box"
						size="${ifDefined(this.size)}"
						maxlength="${ifDefined(this.maxlength)}"
						placeholder="${this.placeholder}"
						@keydown="${this._saveValueChange_Keydown}"
						@change="${this._updateInputTextValue}">
					</d2l-input-text>
					<d2l-button class="Input-Button" primary @click="${this._saveValueChange}">Save</d2l-button>
					<d2l-button class="Input-Button" @click="${this._cancelValueChange}">Cancel</d2l-button>
				</div>
			</div>
		`;
	}

	_enterInputMode_keydown(e) {
		if (e.keyCode === 13)
		{
			this._enterInputMode();
		}
	}

	_enterInputMode() {
		if (this.readonly) {return;}
		this.shadowRoot.getElementById('Input-Box').value = this.value;
		this.__inputMode = true;
		this._focusInput(this.shadowRoot.getElementById('Input-Box'));
	}

	_enterLabelMode() {
		this.__inputMode = false;
		this._focusInput(this.shadowRoot.getElementById('Edit-In-Place-Label'));
	}

	_saveValueChange_Keydown(e) {
		this._updateInputTextValue(e);
		if (e.keyCode === 13)
		{
			this._saveValueChange();
		}
	}

	_saveValueChange() {
		this.value = this.__inputTextValue;
		this._enterLabelMode();

		this.dispatchEvent(new CustomEvent(
			'change',
			{bubbles: true, composed: false}
		));
	}

	_cancelValueChange() {
		this.__inputTextValue = this.value;
		this.shadowRoot.getElementById('Input-Box').value = this.value;
		this._enterLabelMode();
	}

	_updateInputTextValue(e) {
		this.__inputTextValue = e.target.value;
	}

	_canShowValueLabel() {
		return !this.value.length > 0;
	}

	async _focusInput(element) {
		await this.updateComplete; //Must wait for the property to unhide element before we can focus.
		element.focus();
	}

	_determineLabelRole() {
		return this.readonly ? '' : 'button';
	}

	_determineLabelTabindex() {
		return this.readonly ? '' : '0';
	}

	_determineLabelClass() {
		return this.readonly ? 'Readonly-Text-Label' :  'Editable-Text-Label';
	}
}
customElements.define('d2l-labs-edit-in-place', EditInPlace);
