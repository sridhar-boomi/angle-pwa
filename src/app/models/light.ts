export interface Light {
  serie: string;
  types: LightType[];
}

export interface LightType {
  name: string;
  angle: number;
}
