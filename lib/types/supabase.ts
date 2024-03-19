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
          profesor_ID: string | null
        }
        Insert: {
          curso_id?: string
          key?: string | null
          nombreCurso: string
          profesor_ID?: string | null
        }
        Update: {
          curso_id?: string
          key?: string | null
          nombreCurso?: string
          profesor_ID?: string | null
        }
        Relationships: []
      }
      Grupos: {
        Row: {
          curso_id: string
          grupo_id: string
          nombreGrupo: string
        }
        Insert: {
          curso_id: string
          grupo_id?: string
          nombreGrupo: string
        }
        Update: {
          curso_id?: string
          grupo_id?: string
          nombreGrupo?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_Grupos_curso_id_fkey"
            columns: ["curso_id"]
            isOneToOne: false
            referencedRelation: "Cursos"
            referencedColumns: ["curso_id"]
          }
        ]
      }
      Matriculas: {
        Row: {
          estudiante_id: string
          grupo_id: string | null
          matricula_id: string
        }
        Insert: {
          estudiante_id: string
          grupo_id?: string | null
          matricula_id?: string
        }
        Update: {
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
          }
        ]
      }
      Usuarios: {
        Row: {
          cedula: number | null
          correo: string
          id: string
          nombre_completo: string | null
          role: string
        }
        Insert: {
          cedula?: number | null
          correo: string
          id?: string
          nombre_completo?: string | null
          role?: string
        }
        Update: {
          cedula?: number | null
          correo?: string
          id?: string
          nombre_completo?: string | null
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
          }
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
