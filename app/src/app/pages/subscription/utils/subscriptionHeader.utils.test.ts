import { SubscriptionIntentEnum, SubscriptionViewEnum } from '../subscription.enums';
import { getSubscriptionHeaderContent } from './subscriptionHeader.utils';

describe('src/app/pages/subscription/utils/subscriptionHeader.utils', () => {
  describe('getSubscriptionHeaderContent', () => {
    it('When the view is FORM then returns step 1 with the form title', () => {
      const content = getSubscriptionHeaderContent(
        SubscriptionViewEnum.FORM,
        SubscriptionIntentEnum.SUBSCRIPTION
      );

      expect(content.step).toBe(1);
      expect(content.title).toBe('Parlez-nous de votre entreprise');
    });

    it('When the view is RESULTS then returns step 2 with the offers title', () => {
      const content = getSubscriptionHeaderContent(
        SubscriptionViewEnum.RESULTS,
        SubscriptionIntentEnum.SUBSCRIPTION
      );

      expect(content.step).toBe(2);
      expect(content.title).toBe('Nos offres pour votre entreprise');
    });

    it('When the view is SUBSCRIBER with subscription intent then returns the subscription title', () => {
      const content = getSubscriptionHeaderContent(
        SubscriptionViewEnum.SUBSCRIBER,
        SubscriptionIntentEnum.SUBSCRIPTION
      );

      expect(content.step).toBe(3);
      expect(content.title).toBe('Finalisons votre souscription');
    });

    it('When the view is SUBSCRIBER with advisor intent then returns the advisor title', () => {
      const content = getSubscriptionHeaderContent(
        SubscriptionViewEnum.SUBSCRIBER,
        SubscriptionIntentEnum.ADVISOR
      );

      expect(content.step).toBe(3);
      expect(content.title).toBe('Laissez-nous vos coordonnées');
    });

    it('When the view is DONE then returns the thank-you title whatever the intent', () => {
      const subscription = getSubscriptionHeaderContent(
        SubscriptionViewEnum.DONE,
        SubscriptionIntentEnum.SUBSCRIPTION
      );
      const advisor = getSubscriptionHeaderContent(
        SubscriptionViewEnum.DONE,
        SubscriptionIntentEnum.ADVISOR
      );

      expect(subscription.step).toBe(4);
      expect(subscription.title).toBe('Merci pour votre confiance');
      expect(advisor).toEqual(subscription);
    });
  });
});
