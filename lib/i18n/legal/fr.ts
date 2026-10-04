import type { LegalTexts } from "./types";

// Textes juridiques en français – traduction de hu.ts.

const fr: LegalTexts = {
  terms: {
    title: "Conditions générales de vente",
    lead: "Les présentes conditions régissent l'utilisation du test de QI en ligne proposé sur le site {site}, ainsi que du résultat payant et de l'abonnement qui s'y rattachent. Nous vous invitons à les lire attentivement avant tout paiement.",
    sections: [
      {
        h: "1. Informations sur le prestataire",
        p: [
          "- Raison sociale : {company}",
          "- Siège social : {address}, {country}",
          "- Immatriculation : {register}",
          "- Numéro d'identification de l'entreprise (IČO) : {ico}",
          "- Numéro d'identification fiscale (DIČ) : {dic}",
          "- Capital social : {capital}",
          "- E-mail : {email}",
          "- Site web : {site}",
          "Ci-après : le « Prestataire ». La personne physique qui utilise le site est ci-après dénommée l'« Utilisateur ».",
        ],
      },
      {
        h: "2. Le service",
        p: [
          "Le site permet de passer gratuitement et sans inscription un test de QI en ligne composé de 30 questions. Après le test, le résultat détaillé (estimation du QI, centile, détail par domaine et solutions des questions avec explications) peut être débloqué contre paiement.",
          "Le résultat est une *estimation indicative* fondée sur une courte série de questions en ligne. Il ne constitue pas un diagnostic médical, psychologique ou autre diagnostic professionnel et ne peut servir de base à des décisions scolaires, professionnelles, médicales ou juridiques.",
          "Les formules payantes du service sont réservées aux personnes âgées de plus de 18 ans ; les mineurs ne peuvent y recourir qu'avec l'accord de leur représentant légal.",
        ],
      },
      {
        h: "3. Formules et prix",
        p: [
          "Le résultat détaillé se débloque avec l'*accès complet de {days} jours*, au prix de *{trial}* (débité immédiatement lors du paiement). L'accès comprend le résultat détaillé du test concerné, ainsi qu'un nombre illimité d'autres tests et résultats pendant toute sa durée.",
          "Si l'Utilisateur ne résilie pas au cours des {days} premiers jours, l'accès *se transforme automatiquement en abonnement mensuel de {monthly}* à l'issue des {days} jours ; la première mensualité est prélevée le {nextDay}e jour, puis chaque mois et d'avance, jusqu'à la résiliation par l'Utilisateur.",
          "Les prix indiqués sont les montants totaux effectivement dus par l'Utilisateur ; aucun autre frais (par exemple de livraison ou de gestion) ne s'applique. En cas de conversion des prix exprimés en euros, la banque de l'Utilisateur peut appliquer son propre taux de change et ses propres frais.",
          "Le Prestataire se réserve le droit de modifier ses prix à l'avenir. Une modification n'affecte pas une période déjà payée ; le Prestataire en informe l'Utilisateur par e-mail au moins 30 jours avant son entrée en vigueur, et l'Utilisateur peut résilier l'abonnement sans frais avant l'application du nouveau prix.",
        ],
      },
      {
        h: "4. Conclusion du contrat et paiement",
        p: [
          "Sur l'écran de paiement, l'Utilisateur accepte les présentes conditions ainsi que la déclaration relative à l'exécution immédiate du contenu numérique, puis saisit ses données de paiement dans le formulaire de paiement Stripe qui s'affiche sur la page. Avant de valider le paiement, l'Utilisateur peut à tout moment revenir en arrière et modifier ses réponses et les données saisies.",
          "Le contrat entre le Prestataire et l'Utilisateur est conclu au moment où le paiement est effectué avec succès, dans la langue dans laquelle l'Utilisateur utilise le site. Le Prestataire n'archive pas séparément le contrat ; Stripe envoie un reçu de paiement par e-mail à l'adresse indiquée par l'Utilisateur. Les présentes conditions sont accessibles et enregistrables à tout moment sur le site.",
          "Le paiement est traité par Stripe Payments Europe, Ltd. Moyens de paiement acceptés : carte bancaire, Apple Pay, Google Pay. Les données de carte sont traitées exclusivement par Stripe ; le Prestataire n'y a pas accès.",
          "En cas d'abonnement, l'Utilisateur autorise le Prestataire à débiter, via Stripe, le moyen de paiement indiqué du montant de l'abonnement à la fin de la période d'essai, puis chaque mois, jusqu'à la résiliation de l'abonnement. En cas d'échec d'un prélèvement, Stripe peut le tenter à nouveau ; en cas d'échec de paiement persistant, l'abonnement prend fin.",
        ],
      },
      {
        h: "5. Exécution et accès",
        p: [
          "Le résultat détaillé s'affiche immédiatement après le paiement réussi et reste accessible ultérieurement via le lien de la page de résultat.",
          "L'accès illimité lié à l'abonnement est fourni par le site dans le navigateur dans lequel l'abonnement a été souscrit (un cookie nécessaire y est déposé à cet effet). Sur un autre appareil, l'Utilisateur peut se connecter au portail client avec son adresse e-mail depuis la page [Gérer / résilier l'abonnement](subscription).",
        ],
      },
      {
        h: "6. Résiliation de l'abonnement",
        p: [
          "L'abonnement peut être *résilié à tout moment, sans motif* : via le lien [Gérer / résilier l'abonnement](subscription) en bas du site, en quelques clics sur le portail client de Stripe, ou par e-mail envoyé à {email}.",
          "La résiliation prend effet à la fin de la période (d'essai) en cours ; l'accès est maintenu jusque-là et aucun autre prélèvement n'est effectué. Si l'Utilisateur résilie l'abonnement pendant la période d'essai, aucune mensualité n'est prélevée.",
          "Le Prestataire ne rembourse pas le prix d'une période déjà commencée, sauf dans les cas prévus par la loi.",
        ],
      },
      {
        h: "7. Droit de rétractation",
        p: [
          "Pour un contrat conclu à distance, le consommateur dispose en principe d'un droit de rétractation de 14 jours (en vertu de la directive 2011/83/UE du Parlement européen et du Conseil et de la loi slovaque n° 108/2024 Rec.).",
          "Le service est un contenu numérique non fourni sur un support matériel. Avant le paiement, l'Utilisateur *demande expressément le début immédiat de l'exécution* et reconnaît qu'il perd ainsi son droit de rétractation. Par conséquent, une fois l'exécution commencée (affichage du résultat), l'Utilisateur ne dispose plus du droit de rétractation. L'abonnement peut néanmoins être résilié à tout moment conformément à l'article 6.",
          "Si l'exécution n'a pas commencé pour une raison quelconque (par exemple si le résultat ne s'est pas affiché après le paiement), l'Utilisateur peut se rétracter dans un délai de 14 jours à compter de la conclusion du contrat par une déclaration dénuée d'ambiguïté envoyée à {email} ; dans ce cas, le Prestataire rembourse l'intégralité du prix au plus tard dans les 14 jours, sur le moyen de paiement initial.",
        ],
      },
      {
        h: "8. Garantie et responsabilité",
        p: [
          "Le Prestataire garantit que le contenu numérique est conforme à sa description. Si le résultat ne s'affiche pas ou est erroné, l'Utilisateur peut le signaler à {email} ; le Prestataire corrige le défaut dans un délai raisonnable, à défaut de quoi l'Utilisateur peut demander une réduction du prix ou mettre fin au contrat (conformément à la directive (UE) 2019/770).",
          "Le résultat est une estimation ; le Prestataire n'est pas responsable des décisions prises sur la base de ce résultat. Sauf en cas de dommages causés intentionnellement ou par négligence grave, ainsi que de manquement contractuel portant atteinte à la vie, à l'intégrité physique ou à la santé, la responsabilité du Prestataire est limitée au montant payé par l'Utilisateur pour le service concerné.",
          "Le Prestataire s'efforce d'assurer la disponibilité continue du site, mais n'est pas responsable des interruptions temporaires dues à la maintenance ou à une défaillance d'un tiers (par exemple l'hébergeur ou le prestataire de paiement).",
        ],
      },
      {
        h: "9. Réclamations et voies de recours",
        p: [
          "Vous pouvez adresser vos réclamations à {email}. Le Prestataire examine la réclamation et y répond par écrit dans un délai maximal de 30 jours.",
          "Autorité de contrôle : Slovenská obchodná inšpekcia (Inspection slovaque du commerce), Bajkalská 21/A, 827 99 Bratislava, www.soi.sk. La Slovenská obchodná inšpekcia agit également en tant qu'organisme de règlement extrajudiciaire des litiges de consommation.",
          "Les consommateurs résidant dans un autre État membre de l'UE peuvent obtenir une aide gratuite en cas de litige transfrontalier auprès du Centre européen des consommateurs de leur pays (réseau ECC-Net, https://www.eccnet.eu).",
        ],
      },
      {
        h: "10. Propriété intellectuelle",
        p: [
          "Les questions, textes, figures, éléments graphiques et le code source du site sont la propriété intellectuelle du Prestataire (ou de ses ayants droit). Toute copie, diffusion ou utilisation commerciale sans l'autorisation écrite préalable du Prestataire est interdite. Le partage du lien de son propre résultat est autorisé.",
        ],
      },
      {
        h: "11. Protection des données",
        p: ["Le traitement des données personnelles est détaillé dans la [politique de confidentialité](privacy)."],
      },
      {
        h: "12. Droit applicable, modification des conditions",
        p: [
          "Le contrat est régi par le droit de la République slovaque. Ce choix ne prive pas le consommateur de la protection que lui assurent les dispositions auxquelles il ne peut être dérogé par accord en vertu du droit de son pays de résidence habituelle ; le consommateur peut également saisir le tribunal de son lieu de résidence.",
          "Le Prestataire peut modifier les présentes conditions pour l'avenir. Les contrats déjà conclus restent régis par les conditions en vigueur au moment de leur conclusion ; pour un abonnement, le Prestataire informe l'Utilisateur de toute modification substantielle par e-mail au moins 30 jours à l'avance, et l'Utilisateur peut résilier l'abonnement sans frais.",
          "Si l'une des dispositions des présentes conditions est invalide, la validité des autres dispositions n'en est pas affectée.",
        ],
      },
    ],
  },

  privacy: {
    title: "Politique de confidentialité",
    lead: "La présente politique explique quelles données personnelles nous traitons lorsque vous utilisez le site {site}, à quelles fins, pendant combien de temps, et quels sont vos droits. Le traitement est effectué conformément au règlement général sur la protection des données (UE) 2016/679 (RGPD).",
    sections: [
      {
        h: "1. Le responsable du traitement",
        p: [
          "{company}, {address}, {country} · Numéro d'identification de l'entreprise (IČO) : {ico} · Immatriculation : {register}",
          "Contact pour les questions relatives à la protection des données : {email}",
        ],
      },
      {
        h: "2. Quelles données traitons-nous, et à quelles fins ?",
        p: [
          "*Passage du test.* Vos réponses, la tranche d'âge indiquée et la durée du test sont stockées par votre propre navigateur (localStorage), afin que vous puissiez reprendre le test. Aucun nom, adresse e-mail ou compte utilisateur n'est nécessaire pour passer le test. Ces données ne nous parviennent que lorsque vous débloquez le résultat.",
          "*Déblocage du résultat et paiement.* Lors du déblocage, vos réponses sont associées, sous une forme courte et codée, aux données de la transaction de paiement, afin que le serveur puisse en calculer le résultat. Le paiement est effectué par Stripe : c'est Stripe qui recueille les données de carte (auxquelles nous n'avons pas accès), ainsi que votre adresse e-mail pour le reçu et la gestion de l'abonnement. Stripe nous transmet le statut du paiement, votre adresse e-mail, votre pays et un identifiant client. Base juridique : l'exécution du contrat (art. 6, par. 1, point b) du RGPD) et le respect des obligations comptables (art. 6, par. 1, point c)).",
          "*Reconnaissance de l'abonnement.* En cas d'abonnement, nous déposons dans votre navigateur un cookie signé et nécessaire (elm_sub) contenant votre identifiant client Stripe, afin que le navigateur reconnaisse l'abonnement actif. Base juridique : l'exécution du contrat.",
          "*Communication.* Si vous nous écrivez par e-mail, nous traitons votre nom, votre adresse e-mail et votre message afin de répondre à votre demande. Base juridique : l'intérêt légitime ou l'exécution du contrat.",
          "*Journaux techniques.* Lors de la mise à disposition du site, l'hébergeur peut enregistrer brièvement des données techniques (adresse IP, horodatage, type de navigateur) à des fins de sécurité et de résolution des incidents. Base juridique : l'intérêt légitime (art. 6, par. 1, point f) du RGPD).",
          "Aucune prise de décision automatisée ni aucun profilage produisant des effets juridiques à votre égard n'a lieu. Le calcul de l'estimation du QI est indicatif et ne sert de base à aucune décision.",
        ],
      },
      {
        h: "3. Cookies et stockage local",
        p: [
          "Les cookies et le stockage local strictement nécessaires (voir ci-dessous) ne requièrent pas de consentement. Nous n'utilisons des cookies d'analyse et publicitaires qu'avec votre consentement (voir ci-dessous).",
          "- *lang* – la langue choisie (1 an)",
          "- *elm_sub* – reconnaissance de l'abonnement, uniquement pour les abonnés (400 jours au maximum ou jusqu'à sa suppression)",
          "- *tma_consent* – mémorise votre choix concernant les cookies (180 jours)",
          "- *localStorage* – l'état du test, les questions déjà vues et le résultat non encore débloqué (dans votre navigateur, jusqu'à ce que vous les supprimiez)",
          "- *sessionStorage* – après le paiement, le lien vers votre résultat pour la page de remerciement (jusqu'à la fermeture de l'onglet)",
          "*Cookies d'analyse et publicitaires – uniquement avec votre consentement.* Si vous cliquez sur « Accepter » dans le bandeau cookies, nous chargeons la balise Google de Google Ireland Limited (Gordon House, Barrow Street, Dublin 4, Irlande) à deux fins : Google Analytics nous montre comment les visiteurs utilisent le site, et la mesure des conversions Google Ads indique si nos annonces mènent à des achats. Google dépose alors ses propres cookies (par exemple _ga et _ga_… pendant 2 ans au plus, _gcl_au pendant 90 jours au plus) et reçoit votre adresse IP, des données sur votre navigateur et votre appareil, l'adresse des pages consultées, l'identifiant du clic sur l'annonce si vous venez d'une annonce et, en cas d'achat, son montant et l'identifiant de transaction du paiement. Base juridique : votre consentement (art. 6, par. 1, point a) du RGPD). Sans votre consentement, la balise Google n'est pas chargée du tout. Vous pouvez donner ou retirer votre consentement à tout moment grâce au lien « Paramètres des cookies » en bas de page ; le retrait ne remet pas en cause la licéité du traitement effectué auparavant. Google peut également transférer des données vers les États-Unis (cadre de protection des données UE–États-Unis) ; sa politique de confidentialité : https://policies.google.com/privacy.",
        ],
      },
      {
        h: "4. Qui reçoit les données ?",
        p: [
          "- *Stripe Payments Europe, Ltd.* (1 Grand Canal Street Lower, Dublin 2, Irlande) – paiement, abonnement et facturation. Stripe peut également transférer certaines données aux États-Unis ; ce transfert repose sur le cadre de protection des données UE–États-Unis et sur les clauses contractuelles types de la Commission européenne.",
          "- *Hébergeur* – exploitation du site, en qualité de sous-traitant.",
          "- *Google Ireland Limited* (Gordon House, Barrow Street, Dublin 4, Irlande) – Google Analytics et mesure des conversions Google Ads, uniquement avec votre consentement (voir section 3).",
          "Nous ne vendons aucune donnée. En dehors de la mesure Google fondée sur votre consentement décrite à la section 3, nous ne transmettons aucune donnée à des tiers à des fins de marketing. Nous ne communiquons de données aux autorités qu'en vertu d'une obligation légale.",
        ],
      },
      {
        h: "5. Combien de temps conservons-nous les données ?",
        p: [
          "- Données de paiement et comptables : 10 ans, conformément à la loi comptable slovaque.",
          "- Données d'abonné : pendant toute la durée de l'abonnement, puis jusqu'à l'expiration du délai de conservation comptable.",
          "- Correspondance : 3 ans au maximum après la clôture du dossier (pour faire valoir des droits dans le délai de prescription).",
          "- Journaux techniques : 30 jours au maximum.",
        ],
      },
      {
        h: "6. Vos droits",
        p: [
          "Vous pouvez demander des informations sur les données vous concernant que nous traitons, ainsi que leur rectification, leur effacement, la limitation de leur traitement et leur portabilité, et vous pouvez vous opposer à un traitement fondé sur l'intérêt légitime. Envoyez votre demande à {email} ; nous vous répondrons dans un délai d'un mois au plus.",
          "Vous pouvez introduire une réclamation auprès de l'autorité slovaque de protection des données (Úrad na ochranu osobných údajov Slovenskej republiky – Office de protection des données personnelles de la République slovaque, Hraničná 12, 820 07 Bratislava, www.dataprotection.gov.sk) ou auprès de l'autorité de protection des données de votre pays de résidence.",
        ],
      },
      {
        h: "7. Sécurité, mineurs",
        p: [
          "Les données sont transmises via une connexion chiffrée (HTTPS) ; les bonnes réponses et la notation restent sur le serveur, et les cookies sont protégés par une signature cryptographique. Seul un utilisateur majeur ou agissant avec l'accord de son représentant légal peut effectuer un paiement ; nous ne traitons pas sciemment les données de personnes de moins de 16 ans sans l'accord d'un parent.",
          "Nous pouvons mettre à jour la présente politique en cas d'évolution du service ; la version en vigueur est toujours disponible sur cette page.",
        ],
      },
    ],
  },
};

export default fr;
