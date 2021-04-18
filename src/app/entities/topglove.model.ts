export interface TopGlovEntity {
    id: string,
    serialNumber: number,
    createdDateTime: Date,
    user: string,
    typeOfFormer: string,
    size: string,
    factory: string,
    firingOrRework: string | null | undefined,
    defectDetails: string | null | undefined,
    quality: string
}