import type { LegalTexts } from "./types";

// Testi legali in italiano – traduzione del sorgente ungherese (hu.ts).

const it: LegalTexts = {
  terms: {
    title: "Termini e condizioni",
    lead: "I presenti termini disciplinano l'utilizzo del test del QI online disponibile sul sito {site}, del relativo risultato a pagamento e dell'abbonamento. Ti preghiamo di leggerli attentamente prima di effettuare il pagamento.",
    sections: [
      {
        h: "1. Dati del fornitore",
        p: [
          "- Ragione sociale: {company}",
          "- Sede legale: {address}, {country}",
          "- Registro: {register}",
          "- Numero di identificazione (IČO): {ico}",
          "- Codice fiscale (DIČ): {dic}",
          "- Capitale sociale: {capital}",
          "- E-mail: {email}",
          "- Sito web: {site}",
          "Di seguito: il «Fornitore». La persona fisica che utilizza il sito web è di seguito denominata «Utente».",
        ],
      },
      {
        h: "2. Il servizio",
        p: [
          "Sul sito web è possibile svolgere gratuitamente e senza registrazione un test del QI online composto da 30 domande. Dopo il completamento, il risultato dettagliato (stima del QI, percentile, analisi per area e soluzioni delle domande con spiegazione) può essere sbloccato a pagamento.",
          "Il risultato è una *stima a carattere puramente indicativo*, basata su una breve serie di domande online. Non costituisce una diagnosi medica, psicologica o di altra natura professionale e non è idoneo a fondare decisioni in ambito scolastico, lavorativo, sanitario o legale.",
          "Il servizio a pagamento può essere utilizzato da persone di età superiore ai 18 anni oppure da minori esclusivamente con il consenso del loro rappresentante legale.",
        ],
      },
      {
        h: "3. Pacchetti e prezzi",
        p: [
          "Il risultato dettagliato si sblocca con l'*accesso completo di {days} giorni*, al prezzo di *{trial}* (addebitato immediatamente al momento del pagamento). L'accesso comprende il risultato dettagliato del test svolto e, per tutta la sua durata, un numero illimitato di ulteriori test e risultati.",
          "Se l'Utente non disdice entro i primi {days} giorni, allo scadere dei {days} giorni l'accesso *si trasforma automaticamente in un abbonamento mensile al prezzo di {monthly}*; il primo canone mensile viene addebitato il {nextDay}° giorno e successivamente ogni mese in anticipo, finché l'Utente non lo disdice.",
          "I prezzi indicati sono gli importi finali effettivamente dovuti dall'Utente; non sono previsti costi aggiuntivi (per es. spese di spedizione o di gestione). In caso di conversione dei prezzi espressi in euro, la banca dell'Utente può applicare un proprio tasso di cambio e proprie commissioni.",
          "Il Fornitore si riserva il diritto di modificare i prezzi in futuro. La modifica non incide sui periodi già pagati; il Fornitore informa l'Utente via e-mail almeno 30 giorni prima dell'entrata in vigore, e l'Utente può disdire l'abbonamento gratuitamente prima che il nuovo prezzo diventi efficace.",
        ],
      },
      {
        h: "4. Conclusione del contratto e pagamento",
        p: [
          "Nella schermata di pagamento l'Utente accetta i presenti termini e la dichiarazione relativa all'esecuzione immediata del contenuto digitale, quindi inserisce i propri dati di pagamento nel modulo di pagamento Stripe visualizzato nella pagina. Prima di inviare il pagamento, l'Utente può tornare indietro in qualsiasi momento e modificare le proprie risposte e i dati inseriti.",
          "Il contratto tra il Fornitore e l'Utente si conclude con il buon esito del pagamento, nella lingua in cui l'Utente utilizza il sito web. Il Fornitore non archivia separatamente il contratto; Stripe invia via e-mail una ricevuta del pagamento all'indirizzo indicato dall'Utente. I presenti termini sono consultabili e salvabili in qualsiasi momento sul sito web.",
          "Il pagamento è elaborato da Stripe Payments Europe, Ltd. Metodi di pagamento accettati: carta di pagamento, Apple Pay, Google Pay. I dati della carta sono gestiti esclusivamente da Stripe; il Fornitore non vi ha accesso.",
          "In caso di abbonamento, l'Utente acconsente a che il Fornitore, tramite Stripe, addebiti il canone mensile sul metodo di pagamento indicato al termine del periodo di prova e successivamente ogni mese, finché l'abbonamento non viene disdetto. In caso di addebito non riuscito, Stripe può ritentare l'addebito; in caso di persistente mancato pagamento, l'abbonamento cessa.",
        ],
      },
      {
        h: "5. Esecuzione e accesso",
        p: [
          "Il risultato dettagliato viene visualizzato immediatamente dopo il buon esito del pagamento ed è accessibile anche in seguito tramite il link della pagina del risultato.",
          "L'accesso illimitato incluso nell'abbonamento è garantito dal sito web nel browser in cui l'abbonamento è stato attivato (a tal fine viene impostato un cookie necessario). Da un altro dispositivo, l'Utente può accedere al portale clienti con il proprio indirizzo e-mail tramite la pagina [Gestisci / disdici l'abbonamento](subscription).",
        ],
      },
      {
        h: "6. Disdetta dell'abbonamento",
        p: [
          "L'abbonamento *può essere disdetto in qualsiasi momento, senza obbligo di motivazione*: tramite il link [Gestisci / disdici l'abbonamento](subscription) in fondo al sito web, con pochi clic nel portale clienti di Stripe, oppure con un'e-mail all'indirizzo {email}.",
          "La disdetta ha effetto alla fine del periodo (di prova) in corso; fino ad allora l'accesso resta attivo e non vengono effettuati ulteriori addebiti. Se l'Utente disdice l'abbonamento durante il periodo di prova, il canone mensile non viene mai addebitato.",
          "Il Fornitore non rimborsa il corrispettivo del periodo già iniziato, salvo nei casi previsti dalla legge.",
        ],
      },
      {
        h: "7. Diritto di recesso",
        p: [
          "Nei contratti a distanza, il consumatore dispone di norma di un diritto di recesso di 14 giorni (ai sensi della direttiva 2011/83/UE del Parlamento europeo e del Consiglio e della legge slovacca n. 108/2024 Racc.).",
          "Il servizio consiste nella fornitura di contenuto digitale non su supporto materiale. Prima del pagamento, l'Utente *chiede espressamente l'inizio immediato dell'esecuzione* e prende atto che in tal modo perde il diritto di recesso. Di conseguenza, una volta iniziata l'esecuzione (la visualizzazione del risultato), l'Utente non ha diritto di recesso. L'abbonamento può comunque essere disdetto in qualsiasi momento ai sensi del punto 6.",
          "Se per qualsiasi motivo l'esecuzione non è iniziata (per esempio se dopo il pagamento il risultato non è stato visualizzato), l'Utente può recedere entro 14 giorni dalla conclusione del contratto con una dichiarazione esplicita inviata all'indirizzo {email}; in tal caso il Fornitore rimborsa l'intero importo entro 14 giorni al più tardi, sul metodo di pagamento originario.",
        ],
      },
      {
        h: "8. Garanzia e responsabilità",
        p: [
          "Il Fornitore garantisce che il contenuto digitale è conforme alla descrizione. Se il risultato non viene visualizzato o è errato, l'Utente può segnalarlo all'indirizzo {email}; il Fornitore elimina il difetto entro un termine ragionevole, in mancanza di che l'Utente può chiedere una riduzione del prezzo o risolvere il contratto (ai sensi della direttiva (UE) 2019/770).",
          "Il risultato è una stima; il Fornitore non risponde delle decisioni prese sulla base di esso. Fatti salvi i danni causati con dolo o colpa grave e gli inadempimenti contrattuali che ledono la vita, l'integrità fisica o la salute, la responsabilità del Fornitore è limitata all'importo pagato dall'Utente per il servizio in questione.",
          "Il Fornitore si adopera per garantire la disponibilità continua del sito web, ma non risponde delle interruzioni temporanee dovute a manutenzione o a malfunzionamenti di terzi (per es. del fornitore di hosting o del servizio di pagamento).",
        ],
      },
      {
        h: "9. Reclami e mezzi di tutela",
        p: [
          "Puoi inviare il tuo reclamo all'indirizzo {email}. Il Fornitore esamina il reclamo e risponde per iscritto entro 30 giorni al più tardi.",
          "Autorità di vigilanza: Slovenská obchodná inšpekcia (Ispettorato slovacco del commercio), Bajkalská 21/A, 827 99 Bratislava, www.soi.sk. La Slovenská obchodná inšpekcia opera anche come organismo di risoluzione alternativa delle controversie per la composizione extragiudiziale delle controversie dei consumatori.",
          "I consumatori residenti in un altro Stato membro dell'UE possono ottenere assistenza gratuita nelle controversie transfrontaliere dal Centro europeo dei consumatori del proprio paese (rete ECC-Net, https://www.eccnet.eu).",
        ],
      },
      {
        h: "10. Proprietà intellettuale",
        p: [
          "Le domande, i testi, le figure, gli elementi grafici e il codice sorgente del sito web sono proprietà intellettuale del Fornitore (o dei rispettivi titolari dei diritti). Ne è vietata la copia, la distribuzione o l'utilizzo a fini commerciali senza il previo consenso scritto del Fornitore. È consentito condividere il link al proprio risultato.",
        ],
      },
      {
        h: "11. Protezione dei dati",
        p: ["Il trattamento dei dati personali è descritto nel dettaglio nell'[Informativa sulla privacy](privacy)."],
      },
      {
        h: "12. Legge applicabile e modifica dei termini",
        p: [
          "Il contratto è regolato dalla legge della Repubblica slovacca. Ciò non priva il consumatore della protezione assicuratagli dalle disposizioni a cui non si può derogare convenzionalmente in virtù della legge del paese in cui ha la residenza abituale; il consumatore può anche adire il giudice del luogo in cui risiede.",
          "Il Fornitore può modificare i presenti termini con effetto per il futuro. Ai contratti già conclusi si applicano i termini in vigore al momento della conclusione; in caso di abbonamento, il Fornitore comunica le modifiche sostanziali via e-mail con almeno 30 giorni di anticipo e l'Utente può disdire l'abbonamento gratuitamente.",
          "L'eventuale invalidità di una disposizione dei presenti termini non pregiudica la validità delle restanti disposizioni.",
        ],
      },
    ],
  },

  privacy: {
    title: "Informativa sulla privacy",
    lead: "La presente informativa spiega quali dati personali trattiamo quando utilizzi il sito {site}, per quali finalità, per quanto tempo e quali sono i tuoi diritti. Il trattamento avviene ai sensi del Regolamento generale sulla protezione dei dati (UE) 2016/679 (GDPR).",
    sections: [
      {
        h: "1. Il titolare del trattamento",
        p: [
          "{company}, {address}, {country} · Numero di identificazione (IČO): {ico} · Registro: {register}",
          "Contatto per questioni relative alla protezione dei dati: {email}",
        ],
      },
      {
        h: "2. Quali dati trattiamo e per quali finalità?",
        p: [
          "*Svolgimento del test.* Le tue risposte, la fascia d'età indicata e il tempo impiegato sono memorizzati nel tuo browser (localStorage), così puoi riprendere il test. Per svolgere il test non servono nome, indirizzo e-mail né account. Questi dati ci arrivano solo quando sblocchi il risultato.",
          "*Sblocco del risultato e pagamento.* Allo sblocco, le tue risposte vengono associate ai dati della transazione di pagamento in forma breve e codificata, affinché il server possa calcolare il risultato. Il pagamento è gestito da Stripe: è Stripe a raccogliere i dati della carta (a cui noi non abbiamo accesso) e il tuo indirizzo e-mail per la ricevuta e la gestione dell'abbonamento. Da Stripe riceviamo lo stato del pagamento, il tuo indirizzo e-mail, il tuo paese e un identificativo cliente. Base giuridica: esecuzione del contratto (art. 6, par. 1, lett. b) GDPR) e adempimento di obblighi contabili (art. 6, par. 1, lett. c)).",
          "*Riconoscimento dell'abbonamento.* In caso di abbonamento, nel tuo browser impostiamo un cookie necessario e firmato (elm_sub), che contiene il tuo identificativo cliente Stripe, affinché il browser riconosca l'abbonamento attivo. Base giuridica: esecuzione del contratto.",
          "*Comunicazioni.* Se ci scrivi un'e-mail, trattiamo il tuo nome, il tuo indirizzo e-mail e il tuo messaggio per rispondere alla richiesta. Base giuridica: legittimo interesse o esecuzione del contratto.",
          "*Log tecnici.* Durante l'erogazione del sito web, il fornitore di hosting può registrare per breve tempo dati tecnici (indirizzo IP, orario, tipo di browser) a fini di sicurezza e di risoluzione dei problemi. Base giuridica: legittimo interesse (art. 6, par. 1, lett. f) GDPR).",
          "Non effettuiamo processi decisionali automatizzati né profilazione che producano effetti giuridici nei tuoi confronti. Il calcolo della stima del QI ha carattere puramente indicativo e non costituisce la base di alcuna decisione.",
        ],
      },
      {
        h: "3. Cookie e archiviazione locale",
        p: [
          "Utilizziamo esclusivamente cookie e archiviazione locale necessari al funzionamento; per questi non è richiesto il consenso. Non utilizziamo cookie analitici, pubblicitari o di tracciamento.",
          "- *lang* – la lingua scelta (1 anno)",
          "- *elm_sub* – riconoscimento dell'abbonamento, solo per gli abbonati (al massimo 400 giorni o fino alla cancellazione)",
          "- *tma_consent* – ricorda la tua scelta sui cookie (180 giorni)",
          "- *localStorage* – lo stato del test, le domande già viste e il risultato non ancora sbloccato (nel tuo browser, finché non lo cancelli)",
        ],
      },
      {
        h: "4. Chi riceve i dati?",
        p: [
          "- *Stripe Payments Europe, Ltd.* (1 Grand Canal Street Lower, Dublin 2, Irlanda) – pagamenti, abbonamenti e fatturazione. Stripe può trasferire alcuni dati anche negli Stati Uniti; il trasferimento si basa sul quadro UE-USA per la protezione dei dati (EU-U.S. Data Privacy Framework) e sulle clausole contrattuali tipo della Commissione europea.",
          "- *Fornitore di hosting* – gestione del sito web, in qualità di responsabile del trattamento.",
          "Non vendiamo i dati e non li cediamo a terzi per finalità di marketing. Comunichiamo dati alle autorità solo in adempimento di un obbligo di legge.",
        ],
      },
      {
        h: "5. Per quanto tempo conserviamo i dati?",
        p: [
          "- Dati di pagamento e contabili: 10 anni, ai sensi della legge slovacca sulla contabilità.",
          "- Dati degli abbonati: per la durata dell'abbonamento, poi fino alla scadenza del periodo di conservazione contabile.",
          "- Corrispondenza: al massimo 3 anni dalla chiusura della pratica (per far valere eventuali diritti entro i termini di prescrizione).",
          "- Log tecnici: al massimo 30 giorni.",
        ],
      },
      {
        h: "6. I tuoi diritti",
        p: [
          "Puoi chiedere informazioni sui dati che trattiamo su di te, nonché la loro rettifica o cancellazione, la limitazione del trattamento e la portabilità dei dati, e puoi opporti al trattamento basato sul legittimo interesse. Invia la tua richiesta all'indirizzo {email}; ti risponderemo entro un mese al più tardi.",
          "Puoi proporre reclamo all'autorità slovacca per la protezione dei dati (Úrad na ochranu osobných údajov Slovenskej republiky, Hraničná 12, 820 07 Bratislava, www.dataprotection.gov.sk) oppure presso l'autorità di protezione dei dati del tuo paese di residenza.",
        ],
      },
      {
        h: "7. Sicurezza, minori",
        p: [
          "Trasmettiamo i dati tramite una connessione cifrata (HTTPS); le risposte corrette e il calcolo del punteggio restano sul server, e i cookie sono protetti da una firma crittografica. Il pagamento è possibile solo per utenti maggiorenni o che agiscono con il consenso del proprio rappresentante legale; non trattiamo consapevolmente i dati di persone di età inferiore ai 16 anni senza il consenso di un genitore.",
          "Potremo aggiornare la presente informativa in caso di modifiche al servizio; la versione in vigore è sempre disponibile su questa pagina.",
        ],
      },
    ],
  },
};

export default it;
