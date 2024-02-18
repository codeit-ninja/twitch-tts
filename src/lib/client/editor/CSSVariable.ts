export type CSSVariableConfigBase<T extends keyof CSSVariableConfig, X extends Record<string, any> = Record<string, any>> = {
    type: T;
    variable: string;
    label: string;
    value: string;
} & X;

export type CSSVariableConfig = {
    color: CSSVariableConfigBase<'color'>;
    range: CSSVariableConfigBase<'range', {
        min: 0,
        max: 5,
        step: .1,
        unit: 'rem'
    }>
}

export type CSSVariableField = 
    CSSVariableConfig['color'] |
    CSSVariableConfig['range']

export default class CSSVariable<T extends keyof CSSVariableConfig = keyof CSSVariableConfig> {
    constructor( 
        public type: T,
        public config: CSSVariableConfig[T] 
    ) {}
}