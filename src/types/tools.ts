export type ToolType = 'rectangle' | 'ellipse' | 'arrow' | 'line' | 'draw'

export interface Tool {
    id: ToolType,
    name: string, 
    icon: string, 
    description: string
}
