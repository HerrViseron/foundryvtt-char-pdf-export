class CharPDFExport {
    static ID = 'char-pdf-export';

    static SETTINGS = {
        ENABLED: 'enabled',
        PDF_FILE: 'pdf-file'
    }

    //A basic logging function
    static log(...args) {
        console.log(this.ID, '|', ...args);
    }

    static initialize() {
        this.log("Initializing...")
        
        // Actual initialization:
        game.settings.register(this.ID, this.SETTINGS.ENABLED, {
            name: `CHAR-PDF-EXPORT.settings.${this.SETTINGS.ENABLED}.Name`,
            hint: `CHAR-PDF-EXPORT.settings.${this.SETTINGS.ENABLED}.Hint`,
            config: true,
            scope: 'world',
            type: Boolean,
            default: true,
            requiresReload: true,
        });
        game.settings.register(this.ID, this.SETTINGS.PDF_FILE, {
            name: `CHAR-PDF-EXPORT.settings.${this.SETTINGS.PDF_FILE}.Name`,
            hint: `CHAR-PDF-EXPORT.settings.${this.SETTINGS.PDF_FILE}.Hint`,
            config: true,
            scope: 'world',
            type: String,
            default: "",
            filePicker: true,
        });
        // Finished with inizialization
        this.log("Char PDF Exporter is initialized!");
    }
}

class CharPDFExportData {
    
    //get all Character Information / Data
    static get characterData() {}

    //create the PDF File
    static createCharPDFSheet(charData) {}

}

Hooks.on('renderActorSheet5eCharacter', (actorSheet5eCharacter2, html) => {
    if (!game.settings.get(CharPDFExport.ID, CharPDFExport.SETTINGS.ENABLED)){
        CharPDFExport.log("PDF Export is disabled in settings!")
        return;
    }
    
    const charSheetHeaderCopyUUIDItem = html.find(`[data-tooltip="SHEETS.CopyUuid"]`)

    const tooltip = game.i18n.localize('CHAR-PDF-EXPORT.PDFHeaderButton')
    charSheetHeaderCopyUUIDItem.before(`\
        <a class='char-pdf-export-header-button pseudo-header-button' data-tooltip='${tooltip}' data-tooltip-direction='DOWN'>\
            <i class='fa-solid fa-file-pdf'></i>\
        </a>\
    `)

    html.on('click', '.char-pdf-export-header-button', (event) => {
        if (game.settings.get(CharPDFExport.ID, CharPDFExport.SETTINGS.PDF_FILE) == ""){
            CharPDFExport.log("ERROR: No PDF File set!")
            return;
        }
        CharPDFExport.log("Generating Char PDF Sheet using", game.settings.get(CharPDFExport.ID, CharPDFExport.SETTINGS.PDF_FILE))
    });

});

Hooks.once('init', () => {
    CharPDFExport.initialize();
});