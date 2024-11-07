interface Translations {
  myKey: string;
  welcome: string;
  aboutMe: {
    title: string;
    paragraph1: string;
    paragraph2: string;
  };
  introCard: {
    hi: string;
    hi2: string;
  };
  offerCard: {
    title: string;
    subtitle: string;
  };
}

interface GlobalTranslations {
  languages: {
    [key: string]: {
      label: string;
      text: string;
    };
  };
}
