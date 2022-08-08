import { Injectable } from "@angular/core";
import { Reporter } from "./reporter";

@Injectable({
    providedIn: 'root'
})

export class BrowserReportService implements Reporter {

    constructor(){}
    report(): void{
        console.log(`Browser report
            Browser width: - ${window.outerWidth}
            Browser hight - ${window.outerHeight}`
        );
    }
}