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
