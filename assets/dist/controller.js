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
        document.querySelectorAll('.dropzone-preview-image-container').forEach(function (e) {
            return e.remove();
        });
        this._dispatchEvent('dropzone:clear');
    }
    onInputChange(event) {
        for (let fileItem in event.target.files) {
            let file = event.target.files[fileItem];

            if (typeof file === 'undefined') {
                return;
            } // Hide the input and placeholder

            this.inputTarget.style.display = 'none';
            this.placeholderTarget.style.display = 'none';
            this.previewFilenameTarget.textContent = file.name;
            this.previewTarget.style.display = 'flex';
            this.previewImageTarget.style.display = 'none';

            if (file.type) {
                this._populateImagePreview(file);
            }

            this._dispatchEvent('dropzone:change', file);
        }
    }
    _populateImagePreview(file) {
        let _this2 = this;

        if (typeof FileReader === 'undefined') {
            return;
        }
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            let parentDiv = document.createElement("div");
            parentDiv.classList.add('dropzone-preview-image-container');

            let divPreview = document.createElement("div");
            divPreview.classList.add('dropzone-preview-image');

            if (file.type.indexOf('image') !== -1) {
                divPreview.style.backgroundImage = 'url("' + event.target.result + '")';
            }else {
                divPreview.style.backgroundImage = 'url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJISURBVGhD7ZgxSAJRGMe98xxEB5egNoOGcBG0waEhocWpAseGAtc2G4KioFHa2mtrca9w0MGhRUUQCWxoaGhoaHBwUK//p18RZPbu7p0n8X7w8b736r3e/77ve+86n0KhUCgUDtC4FSYWi4WDweAp3BwsMhq0TheWqdVq1XHXOTq3wkDELpo8zK4IIgy7TSaT6+OucyxHJJFIlDRN2zRN83AwGBR5WBjDMG7QpMY9eZGxI6QMIRsQsl+v1695WJjP+XBJBEVGihjLqSWRIzwM2ryUNPNMCER0e71eRpYYLyPia7fb0sR4KWQLmz7DKZhHzTxATB9jtsV4JgSb30ZD9xEZiTFoHIQh6px9YWYuBBu+R0On3Q/jFJsNdHwi9CbaPR6SBq3Ja5d5SBhPi10m0i7EeDwexa0d5a4Qw+HwpdFoPHF3FBGsfYW1K1g7zcNCSIkINpDy+/0duJQSwqbregeplIXvGClC8M71iqYFe7ZiePKPiAr5s4dSSxW7i0gpdi70EtwV6k8D81qYn8bb7hsPfUER8bTYUeiL+OOiJ9Yq6sLJP2UTkSIET+8BT3Kp3+8v/2U4GBa+H7meQak1j8Uuq0YiSK8C3Gk1UsXvn7A/ERLiaY0EAoE1bCBHAqfYMQnmKdKRIiQUClXQ7FCUfjP8PN1sNt9HE+YBSi11IbqIEjJvKCHzxr8R4uRmt/URexp4O8hi7QLWtnyz2xFC36DodcQ1IOQSQg64K4Tl1III+v5UhNGXQTe4Q6Qv2FcoFAqFYgb4fB+QFlLOHpgJTgAAAABJRU5ErkJggg==\')';
            }

            let divFileName = document.createElement("div");
            divFileName.textContent = file.name;

            parentDiv.appendChild(divPreview);
            parentDiv.appendChild(divFileName);

            _this2.previewImageTarget.parentNode.appendChild(parentDiv);
        });
        reader.readAsDataURL(file);
    }
    _dispatchEvent(name, payload = {}) {
        this.element.dispatchEvent(new CustomEvent(name, { detail: payload }));
    }
}
default_1.targets = ['input', 'placeholder', 'preview', 'previewClearButton', 'previewFilename', 'previewImage'];

export { default_1 as default };
