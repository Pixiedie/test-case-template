import { SubscriptionIntentEnum, SubscriptionViewEnum } from '../subscription.enums';

export type SubscriptionHeaderContentType = {
  step: number;
  label: string;
  title: string;
  subtitle: string;
};

export const getSubscriptionHeaderContent = (
  view: SubscriptionViewEnum,
  intent: SubscriptionIntentEnum
): SubscriptionHeaderContentType => {
  switch (view) {
    case SubscriptionViewEnum.FORM:
      return {
        step: 1,
        label: 'Entreprise',
        title: 'Parlez-nous de votre entreprise',
        subtitle:
          'Aidez-nous à mieux comprendre votre activité grâce à quelques informations clés.',
      };
    case SubscriptionViewEnum.RESULTS:
      return {
        step: 2,
        label: 'Offres',
        title: 'Nos offres pour votre entreprise',
        subtitle: 'Comparez nos offres et sélectionnez celle qui correspond à votre activité.',
      };
    case SubscriptionViewEnum.SUBSCRIBER:
      return intent === SubscriptionIntentEnum.ADVISOR
        ? {
            step: 3,
            label: 'Coordonnées',
            title: 'Laissez-nous vos coordonnées',
            subtitle:
              "Un conseiller vous recontactera afin d'étudier ensemble votre situation et les offres qui pourraient vous correspondre.",
          }
        : {
            step: 3,
            label: 'Coordonnées',
            title: 'Finalisons votre souscription',
            subtitle: 'Renseignez les informations nécessaires pour créer votre contrat.',
          };
    case SubscriptionViewEnum.DONE:
      return {
        step: 4,
        label: 'Confirmation',
        title: 'Merci pour votre confiance',
        subtitle:
          'Votre demande est entre de bonnes mains. Un conseiller vous contactera prochainement afin de finaliser votre souscription.',
      };
  }
};
