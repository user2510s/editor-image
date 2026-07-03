import DEFAULT_PARAMS from "./defaultParams";

type ParamKey = keyof typeof DEFAULT_PARAMS;

interface Control {
  key: ParamKey;
  label: string;
  min: number;
  max: number;
}

interface ControlGroup {
  title: string;
  controls: Control[];
}

const CONTROL_GROUPS: ControlGroup[] = [
  {
    title: "Tom monocromático",
    controls: [
      { key: "monochrome", label: "Intensidade da cor", min: 0, max: 100 },
    ],
  },
  {
    title: "Pixels aparentes",
    controls: [
      { key: "pixelSize", label: "Tamanho do pixel", min: 1, max: 16 },
    ],
  },
  {
    title: "Saturação",
    controls: [
      { key: "intensity", label: "Força da saturação", min: -100, max: 100 },
    ],
  },
  {
    title: "Ruído / grain",
    controls: [
      { key: "noise", label: "Quantidade de ruído", min: 0, max: 100 },
    ],
  },
  {
    title: "Baixo contraste em manchas",
    controls: [
      {
        key: "lowContrast",
        label: "Intensidade das manchas",
        min: 0,
        max: 100,
      },
    ],
  },
  {
    title: "Bloom (brilho)",
    controls: [
      { key: "bloom", label: "Intensidade do bloom", min: 0, max: 120 },
      { key: "bloomThreshold", label: "Limiar de brilho", min: 0, max: 100 },
    ],
  },
  {
    title: "Scanlines",
    controls: [
      { key: "scanlines", label: "Intensidade", min: 0, max: 100 },
      { key: "scanlineSpacing", label: "Espaçamento", min: 2, max: 10 },
    ],
  },
  {
    title: "Vinheta",
    controls: [
      { key: "vignette", label: "Escuridão nas bordas", min: 0, max: 100 },
    ],
  },
  {
    title: "Distorção",
    controls: [
      {
        key: "distortion",
        label: "Curvatura / instabilidade",
        min: 0,
        max: 100,
      },
    ],
  },
  {
    title: "Halftone",
    controls: [
      { key: "halftone", label: "Intensidade dos pontos", min: 0, max: 100 },
      { key: "dotSize", label: "Tamanho do ponto", min: 2, max: 14 },
    ],
  },
];

export default CONTROL_GROUPS;
