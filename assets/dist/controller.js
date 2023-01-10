import { Controller } from '@hotwired/stimulus';

class default_1 extends Controller {
    connect() {
        this.clear();
        this.previewClearButtonTarget.addEventListener('click', () => this.clear());
        this.inputTarget.addEventListener('change', (event) => this.onInputChange(event));
        this._dispatchEvent('dropzone:connect');
    }
    clear() {
        this.inputTarget.value = '';
        this.inputTarget.style.display = 'block';
        this.placeholderTarget.style.display = 'block';
        this.previewTarget.style.display = 'none';
        this.previewImageTarget.style.display = 'none';
        this.previewImageTarget.style.backgroundImage = 'none';
        this.previewFilenameTarget.textContent = '';
        this._dispatchEvent('dropzone:clear');
    }
    onInputChange(event) {
        for (var fileItem in event.target.files) {
            var file = event.target.files[fileItem];

            if (typeof file === 'undefined') {
                return;
            } // Hide the input and placeholder

            this.inputTarget.style.display = 'none';
            this.placeholderTarget.style.display = 'none';
            this.previewFilenameTarget.textContent = file.name;
            this.previewTarget.style.display = 'flex';
            this.previewImageTarget.style.display = 'none';
            if (file.type && file.type.indexOf('image') !== -1) {
                this._populateImagePreview(file);
            }

            this._dispatchEvent('dropzone:change', file);
        }
    }
    _populateImagePreview(file) {
        if (typeof FileReader === 'undefined') {
            return;
        }
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            var parentDiv = document.createElement("div");
            parentDiv.classList.add('dropzone-preview-image-container');

            var divPreview = document.createElement("div");
            divPreview.classList.add('dropzone-preview-image');
            divPreview.style.backgroundImage = 'url("' + event.target.result + '")';

            var divFileName = document.createElement("div");
            divFileName.textContent = file.name;

            parentDiv.appendChild(divPreview);
            parentDiv.appendChild(divFileName);

            this.previewImageTarget.parentNode.appendChild(parentDiv);
        });
        reader.readAsDataURL(file);
    }
    _dispatchEvent(name, payload = {}) {
        this.element.dispatchEvent(new CustomEvent(name, { detail: payload }));
    }
}
default_1.targets = ['input', 'placeholder', 'preview', 'previewClearButton', 'previewFilename', 'previewImage'];

export { default_1 as default };
