import { Injectable } from "@angular/core";
import { Reporter } from "./reporter";

@Injectable({
    providedIn: 'root'
})

export class EngagingReportService implements Reporter {

    constructor(){}
    report(): void{
        console.log('User has been using the app for ... seconds');
    }
}