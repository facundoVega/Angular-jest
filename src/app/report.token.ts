import { InjectionToken } from "@angular/core";
import { Reporter } from "./reporter";

export const REPORTERS = new InjectionToken<Reporter>('reporters');