import { CategoryDTO } from '../_models'

export interface AthleteDTO {
    id: number,
    name: string,
    lastName: string,
    documentNo: string,
    category: CategoryDTO
}
