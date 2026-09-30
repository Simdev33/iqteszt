// Testi delle domande in italiano – stessi identificativi del sorgente ungherese (hu.ts).
// La struttura (area, difficoltà, posizione della risposta corretta, successione) è in lib/questions.ts:
// nell'array options la risposta corretta deve stare nella stessa posizione che in ungherese!
import type { QuestionTexts } from "./types";

const it: QuestionTexts = {
  matrixPrompt: "Quale figura va al posto del punto interrogativo?",
  items: {
    "m-count": { explain: "In ogni riga la forma resta la stessa e, da sinistra a destra, il numero di figure aumenta di uno: 1, 2, 3. Alla fine della terza riga vanno quindi tre triangoli." },
    "m-countDown": { explain: "In ogni riga la forma è la stessa e, da sinistra a destra, il numero di figure diminuisce di uno: 3, 2, 1. Alla fine dell'ultima riga va quindi un solo esagono." },
    "m-countRows": { explain: "Ogni colonna ha la sua forma e, scendendo, il numero di figure aumenta di uno: 2, 3, 4. Nella colonna dei rombi vanno quindi quattro rombi." },
    "n-squares": {
      prompt: "Quale numero continua la successione?",
      options: ["30", "34", "36", "49"],
      explain: "Sono i quadrati perfetti: 1², 2², 3², 4², 5² – il successivo è 6² = 36.",
    },
    "n-add": {
      prompt: "Quale numero continua la successione?",
      options: ["17", "18", "19", "21"],
      explain: "A ogni passo il numero aumenta di 3: 14 + 3 = 17.",
    },
    "n-halve": {
      prompt: "Quale numero continua la successione?",
      options: ["2", "3", "4", "6"],
      explain: "Ogni termine è la metà del precedente: 12 : 2 = 6.",
    },
    "v-nest": {
      prompt: "Uccello : nido = ape : ?",
      options: ["miele", "fiore", "alveare", "pungiglione"],
      explain: "L'uccello vive nel nido, l'ape nell'alveare. La relazione: essere vivente → la sua casa.",
    },
    "v-fish": {
      prompt: "Pesce : nuota = uccello : ?",
      options: ["nido", "vola", "piuma", "uovo"],
      explain: "Il pesce si sposta nuotando, l'uccello volando. La relazione: essere vivente → il suo modo tipico di muoversi.",
    },
    "v-doctor": {
      prompt: "Medico : ospedale = insegnante : ?",
      options: ["alunno", "scuola", "libro di testo", "lezione"],
      explain: "Il medico lavora in ospedale, l'insegnante a scuola. La relazione: professione → luogo di lavoro.",
    },
    "m-fillColumns": { explain: "Ogni riga ha la sua forma, mentre le colonne determinano il riempimento: vuoto, tratteggiato, pieno. Il terzo elemento della riga delle stelle è quindi una stella piena." },
    "m-fillRows": { explain: "Le colonne determinano la forma (triangolo, esagono, segno più), le righe il riempimento: vuoto, pieno a metà, pieno. L'elemento mancante è il segno più pieno." },
    "m-fillReverse": { explain: "Ogni riga ha la sua forma, mentre il riempimento delle colonne, da sinistra a destra, è: pieno, tratteggiato, vuoto. Alla fine della riga dei quadrati va quindi un quadrato vuoto." },
    "l-days": {
      prompt: "Se dopodomani sarà venerdì, che giorno era l'altro ieri?",
      options: ["domenica", "lunedì", "martedì", "mercoledì"],
      explain: "Se dopodomani è venerdì, oggi è mercoledì. Due giorni prima di mercoledì era lunedì.",
    },
    "l-days2": {
      prompt: "Se l'altro ieri era giovedì, che giorno sarà dopodomani?",
      options: ["domenica", "lunedì", "martedì", "venerdì"],
      explain: "Se l'altro ieri era giovedì, oggi è sabato. Due giorni dopo sabato sarà lunedì.",
    },
    "l-bell": {
      prompt: "Una campana batte un rintocco ogni 20 minuti e ne batte uno anche nell'istante in cui si comincia a contare. Quanti rintocchi batte in tutto in 2 ore, contando anche quello alla fine della seconda ora?",
      options: ["6", "7", "8", "12"],
      explain: "I rintocchi cadono a 0, 20, 40, 60, 80, 100 e 120 minuti: sono 7. La risposta 6 è il classico «errore dei paletti della staccionata»: si dimentica il rintocco iniziale.",
    },
    "m-rotation": { explain: "A ogni passo la freccia ruota di 45° in senso orario, e ogni riga parte ruotata di 90° rispetto alla precedente. L'ultima riga, dopo 180° e 225°, termina a 270°, cioè con la freccia rivolta a sinistra." },
    "m-rotationBack": { explain: "A ogni passo la freccia ruota di 45° verso sinistra (in senso antiorario), e le righe partono da 0°, 90° e 180°. L'ultima riga: in basso, in basso a destra, poi a destra." },
    "m-rotationHand": { explain: "A ogni passo la lancetta ruota di 90° verso destra, e le righe partono sfalsate di 45°. L'ultima riga punta verso le ore 6, le ore 9 e infine le ore 12, cioè verso l'alto." },
    "n-double": {
      prompt: "Quale numero continua la successione?",
      options: ["47", "62", "63", "64"],
      explain: "Ogni termine è il doppio del precedente più uno: 31 × 2 + 1 = 63.",
    },
    "n-triangular": {
      prompt: "Quale numero continua la successione?",
      options: ["18", "20", "21", "25"],
      explain: "Le differenze aumentano di uno alla volta: +2, +3, +4, +5, quindi ora tocca a +6: 15 + 6 = 21.",
    },
    "n-primes": {
      prompt: "Quale numero continua la successione?",
      options: ["12", "13", "15", "17"],
      explain: "Sono i numeri primi (divisibili solo per 1 e per sé stessi). Il primo numero primo dopo 11 è 13.",
    },
    "v-opposite": {
      prompt: "Quale parola si avvicina di più al contrario di GENEROSO?",
      options: ["ricco", "avaro", "modesto", "invidioso"],
      explain: "La persona generosa dà volentieri e molto. Il suo contrario è l'avaro, che è restio a dare anche il minimo.",
    },
    "v-brave": {
      prompt: "Quale parola si avvicina di più al contrario di CORAGGIOSO?",
      options: ["forte", "vigliacco", "silenzioso", "pigro"],
      explain: "La persona coraggiosa affronta il pericolo, il vigliacco lo evita. Le altre parole descrivono qualità del tutto diverse.",
    },
    "v-diligent": {
      prompt: "Quale parola ha il significato più vicino a LABORIOSO?",
      options: ["intelligente", "operoso", "veloce", "preciso"],
      explain: "Sia la persona laboriosa sia quella operosa lavora molto e con costanza. Intelligente, veloce e preciso indicano qualità diverse.",
    },
    "m-latin": { explain: "In ogni riga e in ogni colonna il cerchio, il quadrato e il triangolo compaiono esattamente una volta, mentre il riempimento è lo stesso lungo ciascuna riga. Nell'ultima riga manca il quadrato pieno." },
    "m-latinFill": { explain: "In ogni riga la forma è la stessa, mentre ciascun riempimento (pieno, tratteggiato, vuoto) compare esattamente una volta in ogni riga e colonna. Nella riga dei rombi manca il rombo tratteggiato." },
    "m-latinCount": { explain: "In ogni riga la forma è la stessa, mentre ciascuna quantità (1, 2, 3) compare esattamente una volta in ogni riga e colonna. Nell'ultima riga mancano le tre stelle." },
    "l-painters": {
      prompt: "Se 3 imbianchini dipingono 3 pareti in 3 giorni, in quanti giorni 6 imbianchini dipingono 6 pareti?",
      options: ["1 giorno", "3 giorni", "6 giorni", "12 giorni"],
      explain: "Un imbianchino dipinge una parete in 3 giorni. Sei imbianchini lavorano in parallelo, quindi anche 6 pareti sono pronte in 3 giorni.",
    },
    "l-hens": {
      prompt: "Se 4 galline fanno 4 uova in 4 giorni, quante uova fanno 8 galline in 8 giorni?",
      options: ["8", "16", "32", "64"],
      explain: "Una gallina fa 1 uovo in 4 giorni, quindi 2 uova in 8 giorni. Così 8 galline fanno 8 × 2 = 16 uova.",
    },
    "l-snail": {
      prompt: "Una lumaca parte dal fondo di un pozzo profondo 10 metri. Di giorno sale di 3 metri, di notte scivola giù di 2 metri. In quale giorno esce dal pozzo?",
      options: ["il 5°", "il 7°", "l'8°", "il 10°"],
      explain: "Dopo sette giorni e sette notti si trova a 7 metri. L'8° giorno sale di 3 metri e raggiunge i 10 metri: da lì non scivola più indietro.",
    },
    "m-walker": { explain: "Il punto arancione si sposta di angolo in angolo in senso orario, mentre l'anello viola procede in senso opposto lungo i punti medi dei lati. Lo schema si ripete ogni quattro passi, quindi la nona cella coincide con la prima." },
    "m-orbit": { explain: "Lungo il bordo ci sono otto posizioni. A ogni passo il punto arancione avanza di una posizione in senso orario, l'anello viola di una posizione in senso antiorario. Dopo otto passi entrambi tornano al punto di partenza: il punto in alto al centro, l'anello nell'angolo in basso a destra." },
    "m-quadrants": { explain: "Il quadrato viola si sposta di quadrante in quadrante in senso orario, quello arancione in senso opposto. Lo schema si ripete ogni quattro passi, quindi la nona cella coincide con la prima." },
    "n-alternate": {
      prompt: "Quale numero continua la successione?",
      options: ["12", "24", "28", "30"],
      explain: "Si alternano due operazioni: ×2, poi −2. 5 → 10 → 8 → 16 → 14 → 28.",
    },
    "n-interleave": {
      prompt: "Quale numero continua la successione?",
      options: ["4", "5", "6", "7"],
      explain: "Due successioni sono intrecciate: un termine sì e uno no si ha 1, 3, 5 (+2), gli altri sono 12, 10, 8 (−2). Il settimo termine appartiene alla prima successione: 5 + 2 = 7.",
    },
    "n-fibo": {
      prompt: "Quale numero continua la successione?",
      options: ["36", "42", "48", "52"],
      explain: "Ogni termine è la somma dei due precedenti: 16 + 26 = 42.",
    },
    "v-odd": {
      prompt: "Qual è l'intruso?",
      options: ["violino", "violoncello", "flauto", "contrabbasso"],
      explain: "Il violino, il violoncello e il contrabbasso sono strumenti ad arco, il flauto invece è uno strumento a fiato.",
    },
    "v-planet": {
      prompt: "Qual è l'intruso?",
      options: ["Mercurio", "Venere", "Luna", "Marte"],
      explain: "Mercurio, Venere e Marte sono pianeti; la Luna invece è il satellite della Terra, non un pianeta.",
    },
    "v-polygon": {
      prompt: "Qual è l'intruso?",
      options: ["triangolo", "quadrato", "cerchio", "pentagono"],
      explain: "Il triangolo, il quadrato e il pentagono sono poligoni con lati rettilinei. Il cerchio non è un poligono.",
    },
    "m-union": { explain: "In ogni riga la terza figura è la sovrapposizione delle prime due: resta ogni linea presente in almeno una delle due. Nell'ultima riga la risposta è quindi data dall'insieme della linea mediana verticale, del lato superiore e della linea mediana orizzontale." },
    "m-unionLines": { explain: "In ogni riga la terza figura è la sovrapposizione delle prime due. Nell'ultima riga il lato sinistro, il lato destro e la linea mediana orizzontale formano insieme una lettera H." },
    "m-unionDots": { explain: "In ogni riga la terza figura contiene ogni punto presente in almeno una delle prime due. Nell'ultima riga: il punto in basso a sinistra, quello centrale, quello in alto a destra e quello in basso a destra." },
    "l-ages": {
      prompt: "Anna è più grande di Bruno. Bruno è più grande di Dora. Carlo è più giovane di Dora. Chi è il più giovane?",
      options: ["Anna", "Bruno", "Carlo", "Dora"],
      explain: "L'ordine dal più grande al più giovane è: Anna > Bruno > Dora > Carlo. Il più giovane è Carlo.",
    },
    "l-queue": {
      prompt: "Cinque persone sono in fila. Irene è davanti a Elena, Laura è tra Irene ed Elena, Elena è davanti a Franco e Giorgio è in fondo alla fila. Chi è in testa alla fila?",
      options: ["Elena", "Irene", "Laura", "Franco"],
      explain: "L'ordine è: Irene, Laura, Elena, Franco, Giorgio. In testa alla fila c'è Irene.",
    },
    "l-heights": {
      prompt: "Pietro è più alto di Luca, ma più basso di Rita. Rita è più bassa di Tommaso. Chi è la seconda persona più alta?",
      options: ["Pietro", "Rita", "Tommaso", "Luca"],
      explain: "In ordine di altezza decrescente: Tommaso, Rita, Pietro, Luca. La seconda persona più alta è Rita.",
    },
    "m-countSum": { explain: "In ogni riga la somma degli elementi delle prime due celle dà la terza: 1 + 3 = 4, 2 + 1 = 3, quindi 3 + 2 = 5 triangoli tratteggiati." },
    "m-countDiff": { explain: "In ogni riga si sottrae il numero di elementi della seconda cella da quello della prima: 5 − 1 = 4, 6 − 4 = 2, quindi 4 − 1 = 3 stelle." },
    "m-countColumns": { explain: "Qui bisogna sommare per colonne: il numero di elementi delle prime due righe dà la terza (1 + 1 = 2, 2 + 3 = 5). Per i rombi: 1 + 3 = 4." },
    "n-bat": {
      prompt: "Una mazza e una pallina costano insieme 1,10 €. La mazza costa 1,00 € più della pallina. Quanto costa la pallina?",
      options: ["0,05 €", "0,10 €", "0,15 €", "1,00 €"],
      explain: "Se la pallina costa x, la mazza costa x + 1,00 €; insieme 2x + 1,00 = 1,10, quindi x = 0,05 €. La risposta istintiva di 0,10 € è una trappola: la mazza costerebbe 1,10 € e il totale sarebbe 1,20 €.",
    },
    "n-lily": {
      prompt: "In uno stagno la superficie coperta dalle ninfee raddoppia ogni giorno. In 48 giorni le ninfee coprono l'intero stagno. In quanti giorni ne avevano coperto la metà?",
      options: ["24 giorni", "36 giorni", "46 giorni", "47 giorni"],
      explain: "Se la superficie raddoppia ogni giorno, il giorno prima della copertura totale era coperta solo metà dello stagno: 48 − 1 = 47. La risposta 24 giorni è una trappola: varrebbe per una crescita costante.",
    },
    "n-taps": {
      prompt: "Una vasca si riempie in 6 minuti con un rubinetto e in 3 minuti con l'altro. In quanti minuti si riempie aprendo entrambi i rubinetti contemporaneamente?",
      options: ["2 minuti", "3 minuti", "4,5 minuti", "9 minuti"],
      explain: "Ogni minuto il primo rubinetto riempie 1/6 della vasca, il secondo 1/3; insieme 1/6 + 2/6 = 1/2. Quindi la vasca si riempie in 2 minuti.",
    },
    "m-sides": { explain: "Da sinistra a destra, a ogni passo il poligono ha un lato in più, e ogni riga inizia con un lato in più della precedente. Dato che il riempimento è lo stesso lungo ogni riga, la risposta è un ettagono pieno." },
    "m-sidesDots": { explain: "Le colonne determinano il poligono (3, 4, 5 lati), le righe il numero di pallini interni (1, 2, 3). La cella in basso a destra: un pentagono con tre pallini." },
    "m-sidesDown": { explain: "Da sinistra a destra, a ogni passo il poligono ha un lato in meno, e ogni riga inizia con un lato in meno della precedente (7, 6, 5). Le colonne determinano il riempimento. L'elemento mancante: un triangolo pieno." },
    "v-homonym": {
      prompt: "Quale parola indica sia un cereale sia l'atto di ridere?",
      options: ["grano", "riso", "sorriso", "farro"],
      explain: "Il riso è un cereale, ma «riso» significa anche il ridere, come nel proverbio «il riso fa buon sangue».",
    },
    "v-feather": {
      prompt: "Quale parola indica sia uno degli elementi che ricoprono il corpo degli uccelli sia uno strumento per scrivere?",
      options: ["ala", "penna", "matita", "piumino"],
      explain: "La penna fa parte del piumaggio degli uccelli ed è anche il nome dello strumento per scrivere.",
    },
    "v-pear": {
      prompt: "Quale parola indica sia un frutto sia l'attività di chi cattura i pesci?",
      options: ["mela", "pesca", "caccia", "amo"],
      explain: "La pesca è un frutto, ma «pesca» è anche l'attività di catturare i pesci con canna, amo o rete.",
    },
    "m-nestedLatin": { explain: "Due regole agiscono in modo indipendente: sia la forma esterna (cerchio, quadrato, esagono) sia la forma interna arancione (triangolo, cerchio, quadrato) compaiono una volta in ogni riga e colonna. La cella mancante: un triangolo rivolto verso l'alto dentro un quadrato." },
    "m-nestedLatin2": { explain: "La forma esterna (quadrato, triangolo, cerchio) e la forma interna arancione (segno più, stella, rombo) formano due quadrati latini indipendenti. La cella mancante: un segno più dentro un triangolo." },
    "m-nestedCount": { explain: "Sia la forma esterna (esagono, rombo, cerchio) sia il numero di pallini (1, 2, 3) compaiono esattamente una volta in ogni riga e colonna. La cella mancante: un rombo con un pallino." },
    "l-cube": {
      prompt: "Un cubo 3×3×3 viene dipinto all'esterno e poi tagliato in 27 cubetti uguali. Quanti cubetti hanno esattamente due facce dipinte?",
      options: ["6", "8", "12", "24"],
      explain: "Hanno due facce dipinte i cubetti che stanno sugli spigoli, ma non negli angoli. Il cubo ha 12 spigoli, con 1 cubetto di questo tipo ciascuno: 12.",
    },
    "l-cube4": {
      prompt: "Un cubo 4×4×4 viene dipinto all'esterno e poi tagliato in 64 cubetti uguali. Quanti cubetti hanno esattamente una faccia dipinta?",
      options: ["16", "24", "32", "36"],
      explain: "Hanno una sola faccia dipinta i cubetti nella parte interna delle facce del cubo grande: 2 × 2 = 4 per ogni faccia, in tutto 24 sulle 6 facce.",
    },
    "l-clock": {
      prompt: "Che angolo formano la lancetta delle ore e quella dei minuti esattamente alle 3:30?",
      options: ["60°", "75°", "90°", "105°"],
      explain: "La lancetta dei minuti è sul 6 (180°). La lancetta delle ore è a metà strada tra il 3 e il 4: 90° + 15° = 105°. La differenza tra le due è 180° − 105° = 75°.",
    },
    "n-power": {
      prompt: "Quale numero continua la successione?",
      options: ["31", "32", "33", "34"],
      explain: "Le differenze raddoppiano: +1, +2, +4, +8, quindi il passo successivo è +16: 17 + 16 = 33. (In altre parole: 2ⁿ + 1.)",
    },
    "n-squareMinus": {
      prompt: "Quale numero continua la successione?",
      options: ["46", "48", "49", "50"],
      explain: "Le differenze sono numeri dispari consecutivi: +5, +7, +9, +11, ora +13: 35 + 13 = 48. (In altre parole: n² − 1, qui 7² − 1.)",
    },
    "n-factorial": {
      prompt: "Quale numero continua la successione?",
      options: ["240", "360", "600", "720"],
      explain: "Ogni termine si ottiene moltiplicando il precedente per un numero che cresce di uno a ogni passo: ×2, ×3, ×4, ×5, ora ×6: 120 × 6 = 720.",
    },
    "m-xor": { explain: "In ogni riga, nella terza figura restano solo le linee presenti in esattamente una delle prime due figure: le linee in comune scompaiono. Nell'ultima riga il lato destro è in comune, quindi scompare." },
    "m-xorDots": { explain: "In ogni riga, nella terza figura restano solo i punti presenti in esattamente una delle prime due. Nell'ultima riga il punto in basso a sinistra è in comune, quindi scompare." },
    "m-xorDiag": { explain: "In ogni riga, nella terza figura restano solo le linee presenti in esattamente una delle prime due. Nell'ultima riga la linea mediana verticale è in comune, quindi scompare." },
    "v-symphony": {
      prompt: "Libro : capitolo = sinfonia : ?",
      options: ["direttore", "movimento", "nota", "orchestra"],
      explain: "Un libro è composto da capitoli, una sinfonia da movimenti. La relazione: opera intera → le sue grandi unità strutturali.",
    },
    "v-tadpole": {
      prompt: "Bruco : farfalla = girino : ?",
      options: ["pesce", "rana", "lucertola", "ninfea"],
      explain: "Il bruco diventa farfalla, il girino diventa rana. La relazione: stadio di sviluppo → animale adulto.",
    },
    "v-map": {
      prompt: "Mappa : territorio = spartito : ?",
      options: ["strumento", "musica", "musicista", "carta"],
      explain: "La mappa rappresenta il territorio con dei segni, lo spartito la musica. La relazione: sistema di segni → ciò che descrive.",
    },
    "m-rotateFill": { explain: "Lungo ogni riga il triangolo ruota di 90° alla volta in senso orario, mentre ciascuno dei tre riempimenti compare una volta in ogni riga e colonna. L'ultima cella: un triangolo vuoto rivolto verso l'alto." },
    "m-rotateFillArrow": { explain: "Lungo ogni riga la freccia ruota di 90° alla volta verso sinistra, mentre ciascuno dei riempimenti (tratteggiato, pieno, vuoto) compare una volta in ogni riga e colonna. La cella mancante: una freccia piena rivolta verso l'alto." },
    "m-rotateSize": { explain: "Lungo ogni riga la metà colorata del cerchio ruota di 90° alla volta in senso orario, mentre la dimensione (piccola, media, grande) forma un quadrato latino. L'elemento mancante: un cerchio piccolo con la metà sinistra piena." },
    "l-syllogism": {
      prompt: "Tutti gli zorg sono blip. Alcuni blip sono rossi. Che cosa ne segue con certezza?",
      options: ["Alcuni zorg sono rossi.", "Nessuno zorg è rosso.", "Tutte le cose rosse sono zorg.", "Nessuna di queste conclusioni è certa."],
      explain: "Può darsi che i blip rossi siano proprio quelli che non sono zorg. Dalle due affermazioni nessuna delle possibilità segue necessariamente.",
    },
    "l-violin": {
      prompt: "Nessun violinista è pilota. Alcuni piloti sono scacchisti. Che cosa ne segue con certezza?",
      options: ["Alcuni scacchisti non sono violinisti.", "Nessuno scacchista è violinista.", "Alcuni violinisti sono scacchisti.", "Nessuna di queste conclusioni è certa."],
      explain: "Gli scacchisti che sono piloti sicuramente non sono violinisti: quindi alcuni scacchisti non sono violinisti. Se gli altri scacchisti suonino il violino, non lo sappiamo.",
    },
    "l-boxes": {
      prompt: "Solo una di tre scatole contiene un tesoro. Sulla scatola A c'è scritto: «Il tesoro è qui.» Sulla B: «Il tesoro non è qui.» Sulla C: «Il tesoro non è nella A.» Esattamente una delle scritte è vera. Dov'è il tesoro?",
      options: ["nella A", "nella B", "nella C", "non si può stabilire"],
      explain: "Se fosse nella A, sarebbero vere sia la scritta della A sia quella della B. Se fosse nella C, sarebbero vere la B e la C. È vera esattamente una scritta (quella della C) solo se il tesoro è nella B.",
    },
    "n-percent": {
      prompt: "Il prezzo di un prodotto viene aumentato del 20%, poi il nuovo prezzo viene ridotto del 20%. Com'è il prezzo finale rispetto a quello iniziale?",
      options: ["uguale", "inferiore del 4%", "superiore del 4%", "inferiore del 2%"],
      explain: "1,2 × 0,8 = 0,96: il prezzo finale è il 96% di quello iniziale, cioè inferiore del 4%. Lo sconto si calcola già sul prezzo più alto.",
    },
    "n-average": {
      prompt: "La media dei quattro compiti di uno studente è di 7,5 punti. Quanti punti deve prendere nel quinto per avere una media esattamente di 8?",
      options: ["8,5", "9", "10", "12"],
      explain: "Il punteggio totale finora è 4 × 7,5 = 30. Con cinque compiti, per la media di 8 servono 5 × 8 = 40 punti, quindi nel quinto 40 − 30 = 10 punti.",
    },
    "n-speed": {
      prompt: "Un'auto va da A a B a 60 km/h e torna indietro sulla stessa strada a 40 km/h. Qual è la sua velocità media sull'intero percorso di andata e ritorno?",
      options: ["48 km/h", "50 km/h", "52 km/h", "55 km/h"],
      explain: "Se il tragitto è di 120 km, all'andata servono 2 ore, al ritorno 3 ore: 240 km in 5 ore, cioè 48 km/h. 50 km/h è sbagliato perché l'auto passa più tempo sul tratto più lento.",
    },
    "m-combine": { explain: "In ogni riga la terza figura prende la forma esterna dalla prima cella e la forma interna arancione dalla seconda. Nell'ultima riga, quindi, all'esterno c'è un quadrato e all'interno un rombo." },
    "m-combineFill": { explain: "La terza colonna prende il riempimento dalla prima cella e la forma dalla seconda. Nell'ultima riga: un quadrato (come nella seconda cella) vuoto (come nella prima)." },
    "m-combineCount": { explain: "Nella terza colonna il numero di elementi è dato dalla prima cella, la forma dalla seconda. Nell'ultima riga: un solo esagono (1 elemento, come nella cella del rombo)." },
    "m-clock": { explain: "Due lancette ruotano in ordine di lettura (proseguendo riga dopo riga): quella lunga ruota di 90° verso destra a ogni passo, quella corta arancione di 45° verso sinistra. Dopo otto passi quella lunga punta verso l'alto, quella corta verso destra." },
    "m-clockBack": { explain: "In ordine di lettura, la lancetta lunga ruota di 90° verso sinistra a ogni passo, quella corta arancione di 45° verso destra. Dopo otto passi quella lunga punta verso l'alto, quella corta verso il basso." },
    "m-clockMixed": { explain: "In ordine di lettura, la lancetta lunga ruota di 45° verso destra, quella corta arancione di 90° verso sinistra. Dopo otto passi entrambe tornano alla posizione iniziale: quella lunga punta verso il basso, quella corta verso destra." },
    "m-tripleLatin": { explain: "La forma (insieme al riempimento) e il numero di elementi formano due quadrati latini distinti: ogni valore compare una volta in ogni riga e colonna. La cella mancante: tre triangoli tratteggiati." },
    "m-tripleLatin2": { explain: "La forma (con il riempimento che le corrisponde) e il numero di elementi formano due quadrati latini indipendenti. La cella mancante: due rombi tratteggiati." },
    "m-tripleColumns": { explain: "Sia la forma sia il riempimento compaiono una volta in ogni riga e colonna, mentre il numero di elementi è dato dalla colonna (1, 2, 3). La cella mancante: tre quadrati vuoti." },
  },
};

export default it;
