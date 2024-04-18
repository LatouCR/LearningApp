export interface Materials {
    assignment: {
        id: number,
        title: string,
        end_time: Date,
        instrucciones: string | null,
        puntaje_asig: number | null,
    },
    userRole: string
}