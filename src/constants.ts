import { Book, ListCheck, Speakerphone } from "tabler-icons-react";

export const urls = {
  LOGIN: "/login",
  REGISTER: "/registro",
  INDEX: "/",
};

export const unprotectedURLs = [urls.LOGIN, urls.REGISTER];

const ogTagImageNoProtocol = `${process.env.NEXT_PUBLIC_DOMAIN}/images/logo.png`;

export const OG_TAGS = {
  url: `https://${process.env.NEXT_PUBLIC_DOMAIN}`,
  title: "Máster UDG",
  description: "Seguimiento ABPs máster UDG",
  image: {
    url: `http://${ogTagImageNoProtocol}`,
    secure_url: `http://${ogTagImageNoProtocol}`,
    alt: "Máster UDG",
  },
  twitterCard: "summary",
};

export const evaluations = [
  {
    name: "Responsabilidad",
    explanation:
      "Asiste y llega puntual a las sesiones (o se excusa correctamente), trae las tareas hechas, muestra interés durante la sesión, se implica en las discusiones, y toma el liderazgo cuando domina el tema.",
    icon: ListCheck,
  },
  {
    name: "Comunicación",
    explanation:
      "Explica de manera clara y concisa los conceptos estudiados, pregunta y replica con claridad en los debates, muestra empatía y respeta la opinión de los compañeros, y en general facilita la dinámica del grupo con sus intervenciones y preguntas",
    icon: Speakerphone,
  },
  {
    name: "Habilidades de Conocimiento",
    explanation:
      "Utiliza correctamente sus conocimientos previos para analizar y entender el caso, aporta fuentes de conocimiento relevantes para la discusión del caso, sabe profundizar y hacer un análisis crítico de los conceptos que se debaten, y es capaz de relacionar distintos conceptos desde un perspectiva multidisciplinar.",
    icon: Book,
  },
];
