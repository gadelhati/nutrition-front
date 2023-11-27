import { StationHistoricOnShore } from "./station.historic.on.shore.interface";

export const initialStationHistoricOnShore: StationHistoricOnShore = {
    id: '',
    localDepth: 0,
    activation: new Date(),
    latitude: 0,
    longitude: 0,
    marsdenSquare: 0,
    marsdenSubSquare_1: 0,
    wmoSquare: 0,
    marsdenSubSquare_5: 0,
    
    stationCategory: undefined,
    equipment: undefined,
    surveying: undefined,
    institution: undefined,
    country: undefined,

    number: 0,
    name: '',
    altitude: 0,
    status: true,
    deactivation: new Date(),
}