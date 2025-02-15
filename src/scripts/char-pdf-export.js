

class CharPDFExport {
    static ID = 'char-pdf-export';

    static TEMPLATES = {
        CHARPDFEXPORT: `modules/${this.ID}/templates/char-pdf-export.hbs`
    }

    //A basic logging function
    static log(...args) {
        console.log(this.ID, ' | ', ...args);
    }
}

Hooks.on('renderActorSheet5eCharacter', (ActorSheet5eCharacter2, html) => {
    const charSheetHeaderCopyUUIDItem = html.find(`[data-tooltip="SHEETS.CopyUuid"]`)
    
    CharPDFExport.log("Hook executed");

    const tooltip = game.i18n.localize('CHAR-PDF-EXPORT.PDFHeaderButton')
    charSheetHeaderCopyUUIDItem.before(
        <a class='char-pdf-export-header-button pseudo-header-button' data-tooltip='${tooltip}' data-tooltip-direction='DOWN'>
            <i class='fa-solid fa-file-pdf'></i>
        </a>
    )
});

class CharPDFExportData {
    
    //get all Character Information / Data
    static get characterData() {}

    //create the PDF File
    static createCharPDFSheet(charData) {}

}