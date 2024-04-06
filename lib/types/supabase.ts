export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Cursos: {
        Row: {
          curso_id: string
          key: string | null
          nombreCurso: string
          nombreProfesor: string | null
          profesor_ID: string | null
        }
        Insert: {
          curso_id?: string
          key?: string | null
          nombreCurso: string
          nombreProfesor?: string | null
          profesor_ID?: string | null
        }
        Update: {
          curso_id?: string
          key?: string | null
          nombreCurso?: string
          nombreProfesor?: string | null
          profesor_ID?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_Cursos_nombreProfesor_fkey"
            columns: ["nombreProfesor"]
            isOneToOne: false
            referencedRelation: "Usuarios"
            referencedColumns: ["nombre_completo"]
          },
          {
            foreignKeyName: "public_Cursos_profesor_ID_fkey"
            columns: ["profesor_ID"]
            isOneToOne: false
            referencedRelation: "Usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      Grupos: {
        Row: {
          curso: string
          grupo_id: string
          nombreGrupo: string
        }
        Insert: {
          curso: string
          grupo_id?: string
          nombreGrupo: string
        }
        Update: {
          curso?: string
          grupo_id?: string
          nombreGrupo?: string
        }
        Relationships: []
      }
      Matriculas: {
        Row: {
          curso: string
          estudiante_id: string
          grupo_id: string | null
          matricula_id: string
        }
        Insert: {
          curso: string
          estudiante_id: string
          grupo_id?: string | null
          matricula_id?: string
        }
        Update: {
          curso?: string
          estudiante_id?: string
          grupo_id?: string | null
          matricula_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_Matriculas_estudiante_id_fkey"
            columns: ["estudiante_id"]
            isOneToOne: false
            referencedRelation: "Usuarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_Matriculas_grupo_id_fkey"
            columns: ["grupo_id"]
            isOneToOne: false
            referencedRelation: "Grupos"
            referencedColumns: ["grupo_id"]
          },
        ]
      }
      RegistroTareas: {
        Row: {
          archivo_key: string
          estudiante_id: string
          fecha_entrega: string
          id: number
          pendiente: boolean
          tarea_id: number
        }
        Insert: {
          archivo_key: string
          estudiante_id?: string
          fecha_entrega: string
          id?: number
          pendiente?: boolean
          tarea_id: number
        }
        Update: {
          archivo_key?: string
          estudiante_id?: string
          fecha_entrega?: string
          id?: number
          pendiente?: boolean
          tarea_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_RegistroTareas_estudiante_id_fkey"
            columns: ["estudiante_id"]
            isOneToOne: false
            referencedRelation: "Usuarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_RegistroTareas_tarea_id_fkey"
            columns: ["tarea_id"]
            isOneToOne: false
            referencedRelation: "Tareas"
            referencedColumns: ["id"]
          },
        ]
      }
      Tareas: {
        Row: {
          curso: string
          end_time: string
          id: number
          instrucciones: string | null
          pendiente: boolean
          puntaje_asig: number | null
          start_time: string
          title: string
        }
        Insert: {
          curso?: string
          end_time: string
          id?: number
          instrucciones?: string | null
          pendiente?: boolean
          puntaje_asig?: number | null
          start_time: string
          title?: string
        }
        Update: {
          curso?: string
          end_time?: string
          id?: number
          instrucciones?: string | null
          pendiente?: boolean
          puntaje_asig?: number | null
          start_time?: string
          title?: string
        }
        Relationships: []
      }
      Usuarios: {
        Row: {
          cedula: number | null
          correo: string
          id: string
          nombre_completo: string | null
          profile_pic: string | null
          role: string
        }
        Insert: {
          cedula?: number | null
          correo: string
          id?: string
          nombre_completo?: string | null
          profile_pic?: string | null
          role?: string
        }
        Update: {
          cedula?: number | null
          correo?: string
          id?: string
          nombre_completo?: string | null
          profile_pic?: string | null
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_Usuarios_correo_fkey"
            columns: ["correo"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["email"]
          },
          {
            foreignKeyName: "public_Usuarios_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
