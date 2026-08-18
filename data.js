/* ============================================================
   PhysioQuest — Données du programme DEC 144.A0
   Techniques de physiothérapie (niveau collégial) · Cégep Saint-Jean-sur-Richelieu
   8 modules mappés sur la grille officielle du programme.

   ⚠️ CONTENU D'AMORÇAGE — À VALIDER PAR L'ENSEIGNANTE.
   Le module « Anatomie & repérage » (phare) est rempli à partir des
   lexiques FR (muscles, squelette) de l'écosystème. Les 7 autres modules
   ont quelques questions d'amorçage, à enrichir après validation.

   Format des choix: chaque question a un tableau "choices" où
   chaque item a { fr, en, correct }. L'ordre est mélangé au
   moment de l'affichage (voir app.js) — la position de la bonne
   réponse change donc à chaque tentative.
   ============================================================ */

const PROGRAM = {
  fr: { title: "PhysioQuest — Techniques de physiothérapie", subtitle: "DEC 144.A0 — niveau collégial" },
  en: { title: "PhysioQuest — Physiotherapy Technology", subtitle: "College diploma 144.A0" }
};

function ch(fr, en, correct) { return { fr, en, correct: !!correct }; }

/* Question de type vrai/faux: affirmation à juger. */
function tf(fr, en, isTrue) { return { type: "tf", fr, en, isTrue: !!isTrue }; }

/* Question de type "association de termes": l'élève touche un terme puis
   sa définition correspondante. pairs: tableau de
   { term_fr, term_en, def_fr, def_en }. Toutes les paires doivent être
   associées correctement pour que la question soit considérée réussie. */
function pair(term_fr, term_en, def_fr, def_en) { return { term_fr, term_en, def_fr, def_en }; }
function match(fr, en, pairs) { return { type: "match", fr, en, pairs }; }

/* Question de type "situation complexe" (mise en situation): un court
   scénario réaliste suivi d'un choix multiple basé sur le jugement
   professionnel. Réutilise le même format "choices" qu'un QCM standard. */
function scenario(fr, en, choices) { return { type: "scenario", fr, en, choices }; }

/* Paliers de difficulté d'une quête. Chaque compétence est maintenant
   divisée en 3 paliers progressifs (tiers[]), débloqués l'un après l'autre:
   Débutant -> Intermédiaire -> Avancé. Réussir le palier 1 d'une compétence
   déverrouille la compétence suivante sur la carte; réussir le palier 3
   (Avancé) accorde le badge de maîtrise de la compétence. */
const TIER_META = [
  { level: 1, name_fr: "Débutant", name_en: "Beginner", icon: "🌱" },
  { level: 2, name_fr: "Intermédiaire", name_en: "Intermediate", icon: "⚙️" },
  { level: 3, name_fr: "Avancé", name_en: "Advanced", icon: "🏆" }
];

/* Chaque compétence = une "quête". order = ordre de déblocage.
   ⚠️ CONTENU D'AMORÇAGE — À VALIDER PAR L'ENSEIGNANTE du Cégep Saint-Jean.
   Le module « Anatomie & repérage » (phare) est rempli avec ~40 questions
   dérivées des lexiques FR (muscles, squelette) de l'écosystème. Les 7 autres
   modules ont quelques questions d'amorçage pour rendre l'app navigable de
   bout en bout ; leur contenu détaillé viendra après validation. Niveau
   collégial (DEC 3 ans) — plus poussé que le DEP. */
const COMPETENCIES = [
 {
  "id": "reperage",
  "order": 1,
  "title_fr": "Anatomie & repérage",
  "title_en": "Anatomy & landmarks",
  "icon": "🦴",
  "tiers": [
   {
    "level": 1,
    "questions": [
     {
      "fr": "Comment nomme-t-on l'os unique du bras (segment entre l'épaule et le coude)?",
      "en": "What is the single bone of the arm (segment between shoulder and elbow)?",
      "choices": [
       { "fr": "L'humérus", "en": "The humerus", "correct": true },
       { "fr": "Le fémur", "en": "The femur" },
       { "fr": "Le radius", "en": "The radius" },
       { "fr": "L'ulna", "en": "The ulna" }
      ],
      "explFr": "Le bras (segment épaule–coude) ne contient qu'un seul os : l'humérus. Le radius et l'ulna sont à l'avant-bras.",
      "explEn": "The arm (shoulder–elbow) has a single bone: the humerus. The radius and ulna are in the forearm."
     },
     {
      "fr": "Quel os forme la cuisse et constitue le plus long os du corps humain?",
      "en": "Which bone forms the thigh and is the longest bone in the human body?",
      "choices": [
       { "fr": "Le fémur", "en": "The femur", "correct": true },
       { "fr": "Le tibia", "en": "The tibia" },
       { "fr": "L'humérus", "en": "The humerus" },
       { "fr": "L'ulna", "en": "The ulna" }
      ],
      "explFr": "Le fémur, os de la cuisse, est le plus long et l'un des plus solides du squelette.",
      "explEn": "The femur, the thigh bone, is the longest and one of the strongest bones of the skeleton."
     },
     {
      "fr": "Quel est le nom anatomique de la rotule?",
      "en": "What is the anatomical name of the kneecap?",
      "choices": [
       { "fr": "La patella", "en": "The patella", "correct": true },
       { "fr": "Le talus", "en": "The talus" },
       { "fr": "Le calcanéus", "en": "The calcaneus" },
       { "fr": "Le scaphoïde", "en": "The scaphoid" }
      ],
      "explFr": "La patella (rotule) est un os sésamoïde situé dans le tendon du quadriceps, à l'avant du genou.",
      "explEn": "The patella (kneecap) is a sesamoid bone within the quadriceps tendon, at the front of the knee."
     },
     {
      "fr": "Quels sont les deux os de l'avant-bras?",
      "en": "What are the two bones of the forearm?",
      "choices": [
       { "fr": "Le radius et l'ulna", "en": "The radius and ulna", "correct": true },
       { "fr": "Le tibia et la fibula", "en": "The tibia and fibula" },
       { "fr": "Le fémur et la patella", "en": "The femur and patella" },
       { "fr": "L'humérus et la clavicule", "en": "The humerus and clavicle" }
      ],
      "explFr": "L'avant-bras compte deux os : le radius (côté du pouce) et l'ulna (côté du petit doigt).",
      "explEn": "The forearm has two bones: the radius (thumb side) and the ulna (little-finger side)."
     },
     {
      "fr": "Quels sont les deux os de la jambe (segment sous le genou)?",
      "en": "What are the two bones of the leg (segment below the knee)?",
      "choices": [
       { "fr": "Le tibia et la fibula", "en": "The tibia and fibula", "correct": true },
       { "fr": "Le radius et l'ulna", "en": "The radius and ulna" },
       { "fr": "Le fémur et le tibia", "en": "The femur and tibia" },
       { "fr": "Le calcanéus et le talus", "en": "The calcaneus and talus" }
      ],
      "explFr": "La jambe contient le tibia (médial, portant) et la fibula (latérale). Le fémur est à la cuisse.",
      "explEn": "The leg contains the tibia (medial, weight-bearing) and the fibula (lateral). The femur is in the thigh."
     },
     {
      "fr": "L'os du talon se nomme...",
      "en": "The heel bone is called...",
      "choices": [
       { "fr": "Le calcanéus", "en": "The calcaneus", "correct": true },
       { "fr": "Le talus", "en": "The talus" },
       { "fr": "Le premier métatarsien", "en": "The first metatarsal" },
       { "fr": "Le scaphoïde", "en": "The scaphoid" }
      ],
      "explFr": "Le calcanéus forme le talon ; c'est là que s'insère le tendon calcanéen (tendon d'Achille).",
      "explEn": "The calcaneus forms the heel; the calcaneal (Achilles) tendon attaches there."
     },
     {
      "fr": "Le muscle deltoïde recouvre principalement quelle articulation?",
      "en": "The deltoid muscle mainly covers which joint?",
      "choices": [
       { "fr": "L'épaule", "en": "The shoulder", "correct": true },
       { "fr": "Le genou", "en": "The knee" },
       { "fr": "La hanche", "en": "The hip" },
       { "fr": "Le coude", "en": "The elbow" }
      ],
      "explFr": "Le deltoïde coiffe l'épaule ; il lui donne son galbe et permet notamment l'abduction du bras.",
      "explEn": "The deltoid caps the shoulder, giving it its rounded shape and enabling arm abduction."
     },
     {
      "fr": "Dans quelle région du corps se trouve le muscle carré des lombes?",
      "en": "In which body region is the quadratus lumborum muscle located?",
      "choices": [
       { "fr": "La région lombaire (paroi abdominale postérieure)", "en": "The lumbar region (posterior abdominal wall)", "correct": true },
       { "fr": "La région cervicale", "en": "The cervical region" },
       { "fr": "Le mollet", "en": "The calf" },
       { "fr": "La paroi thoracique antérieure", "en": "The anterior chest wall" }
      ],
      "explFr": "Le carré des lombes occupe la région lombaire, sur la paroi abdominale postérieure, entre la 12e côte et la crête iliaque.",
      "explEn": "The quadratus lumborum lies in the lumbar region, on the posterior abdominal wall, between the 12th rib and the iliac crest."
     },
     {
      "fr": "Le muscle le plus superficiel du mollet est...",
      "en": "The most superficial muscle of the calf is...",
      "choices": [
       { "fr": "Le gastrocnémien", "en": "The gastrocnemius", "correct": true },
       { "fr": "Le soléaire", "en": "The soleus" },
       { "fr": "Le tibial antérieur", "en": "The tibialis anterior" },
       { "fr": "Le long fibulaire", "en": "The fibularis longus" }
      ],
      "explFr": "Le gastrocnémien est superficiel et forme le galbe du mollet ; le soléaire est plus profond, sous lui.",
      "explEn": "The gastrocnemius is superficial and shapes the calf; the soleus lies deeper, beneath it."
     },
     {
      "fr": "Vrai ou faux : l'omoplate se nomme aussi la scapula.",
      "en": "True or false: the shoulder blade is also called the scapula.",
      "type": "tf",
      "isTrue": true,
      "explFr": "« Scapula » est le terme anatomique de l'omoplate, l'os plat triangulaire de la ceinture scapulaire.",
      "explEn": "\"Scapula\" is the anatomical term for the shoulder blade, the flat triangular bone of the shoulder girdle."
     },
     {
      "fr": "Vrai ou faux : le fémur est le plus long os du corps humain.",
      "en": "True or false: the femur is the longest bone in the human body.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Le fémur est effectivement le plus long os ; il supporte une grande partie des charges du corps.",
      "explEn": "The femur is indeed the longest bone; it bears much of the body's load."
     },
     {
      "fr": "Vrai ou faux : la clavicule fait partie du membre supérieur (ceinture scapulaire).",
      "en": "True or false: the clavicle is part of the upper limb (shoulder girdle).",
      "type": "tf",
      "isTrue": true,
      "explFr": "La clavicule et la scapula forment la ceinture scapulaire, qui rattache le membre supérieur au tronc.",
      "explEn": "The clavicle and scapula form the shoulder girdle, attaching the upper limb to the trunk."
     },
     {
      "fr": "Associe chaque os à sa région.",
      "en": "Match each bone to its region.",
      "type": "match",
      "pairs": [
       { "term_fr": "Humérus", "term_en": "Humerus", "def_fr": "Bras", "def_en": "Arm" },
       { "term_fr": "Fémur", "term_en": "Femur", "def_fr": "Cuisse", "def_en": "Thigh" },
       { "term_fr": "Clavicule", "term_en": "Clavicle", "def_fr": "Ceinture scapulaire", "def_en": "Shoulder girdle" },
       { "term_fr": "Calcanéus", "term_en": "Calcaneus", "def_fr": "Pied (talon)", "def_en": "Foot (heel)" }
      ],
      "explFr": "Repérer la région d'un os est la base du repérage anatomique enseigné aux quadrants supérieur et inférieur.",
      "explEn": "Locating a bone's region is the basis of the anatomical landmarking taught for the upper and lower quadrants."
     },
     {
      "fr": "Le membre supérieur (quadrant supérieur) comprend, de proximal à distal...",
      "en": "The upper limb (upper quadrant) comprises, proximal to distal...",
      "choices": [
       { "fr": "Épaule, bras, avant-bras, main", "en": "Shoulder, arm, forearm, hand", "correct": true },
       { "fr": "Hanche, cuisse, jambe, pied", "en": "Hip, thigh, leg, foot" },
       { "fr": "Cou, thorax, abdomen, bassin", "en": "Neck, thorax, abdomen, pelvis" },
       { "fr": "Crâne, face, mandibule, cou", "en": "Skull, face, mandible, neck" }
      ],
      "explFr": "Le quadrant supérieur suit l'ordre épaule → bras → avant-bras → main. Le quadrant inférieur suit hanche → cuisse → jambe → pied.",
      "explEn": "The upper quadrant follows shoulder → arm → forearm → hand. The lower quadrant follows hip → thigh → leg → foot."
     }
    ]
   },
   {
    "level": 2,
    "questions": [
     {
      "fr": "La coiffe des rotateurs comprend le supra-épineux, l'infra-épineux, le petit rond et...",
      "en": "The rotator cuff includes supraspinatus, infraspinatus, teres minor and...",
      "choices": [
       { "fr": "Le subscapulaire", "en": "The subscapularis", "correct": true },
       { "fr": "Le grand rond", "en": "The teres major" },
       { "fr": "Le grand pectoral", "en": "The pectoralis major" },
       { "fr": "Le deltoïde", "en": "The deltoid" }
      ],
      "explFr": "La coiffe des rotateurs (SITS) : Supra-épineux, Infra-épineux, petit rond (Teres minor) et Subscapulaire. Elle stabilise la tête humérale.",
      "explEn": "The rotator cuff (SITS): Supraspinatus, Infraspinatus, Teres minor and Subscapularis. It stabilizes the humeral head."
     },
     {
      "fr": "Le groupe des ischio-jambiers comprend le biceps fémoral, le semi-tendineux et...",
      "en": "The hamstrings include biceps femoris, semitendinosus and...",
      "choices": [
       { "fr": "Le semi-membraneux", "en": "The semimembranosus", "correct": true },
       { "fr": "Le droit fémoral", "en": "The rectus femoris" },
       { "fr": "Le sartorius", "en": "The sartorius" },
       { "fr": "Le gracile", "en": "The gracilis" }
      ],
      "explFr": "Les ischio-jambiers : biceps fémoral, semi-tendineux et semi-membraneux. Ils fléchissent le genou et étendent la hanche.",
      "explEn": "The hamstrings: biceps femoris, semitendinosus and semimembranosus. They flex the knee and extend the hip."
     },
     {
      "fr": "Le quadriceps fémoral comprend le droit fémoral, le vaste latéral, le vaste médial et...",
      "en": "The quadriceps femoris includes rectus femoris, vastus lateralis, vastus medialis and...",
      "choices": [
       { "fr": "Le vaste intermédiaire", "en": "The vastus intermedius", "correct": true },
       { "fr": "Le sartorius", "en": "The sartorius" },
       { "fr": "Le tenseur du fascia lata", "en": "The tensor fasciae latae" },
       { "fr": "Le grand adducteur", "en": "The adductor magnus" }
      ],
      "explFr": "Les quatre chefs du quadriceps : droit fémoral, vaste latéral, vaste médial et vaste intermédiaire. Ils étendent le genou.",
      "explEn": "The four heads of the quadriceps: rectus femoris, vastus lateralis, vastus medialis and vastus intermedius. They extend the knee."
     },
     {
      "fr": "Le triceps sural est formé du soléaire et...",
      "en": "The triceps surae is formed by the soleus and...",
      "choices": [
       { "fr": "Du gastrocnémien", "en": "The gastrocnemius", "correct": true },
       { "fr": "Du tibial antérieur", "en": "The tibialis anterior" },
       { "fr": "Du long fibulaire", "en": "The fibularis longus" },
       { "fr": "Du droit fémoral", "en": "The rectus femoris" }
      ],
      "explFr": "Le triceps sural = gastrocnémien (2 chefs) + soléaire. Ils se rejoignent sur le tendon calcanéen et produisent la flexion plantaire.",
      "explEn": "The triceps surae = gastrocnemius (2 heads) + soleus. They join at the calcaneal tendon and produce plantar flexion."
     },
     {
      "fr": "Quelle est l'action principale du muscle tibial antérieur à la cheville?",
      "en": "What is the main action of the tibialis anterior at the ankle?",
      "choices": [
       { "fr": "La dorsiflexion (flexion dorsale)", "en": "Dorsiflexion", "correct": true },
       { "fr": "La flexion plantaire", "en": "Plantar flexion" },
       { "fr": "L'éversion pure", "en": "Pure eversion" },
       { "fr": "La rotation de la jambe", "en": "Leg rotation" }
      ],
      "explFr": "Le tibial antérieur assure la dorsiflexion (et l'inversion) de la cheville ; sa faiblesse cause le « pied tombant ».",
      "explEn": "The tibialis anterior produces dorsiflexion (and inversion) of the ankle; its weakness causes \"foot drop\"."
     },
     {
      "fr": "Quelle est l'action principale du muscle grand fessier?",
      "en": "What is the main action of the gluteus maximus?",
      "choices": [
       { "fr": "L'extension de la hanche", "en": "Hip extension", "correct": true },
       { "fr": "La flexion de la hanche", "en": "Hip flexion" },
       { "fr": "La flexion du genou", "en": "Knee flexion" },
       { "fr": "La dorsiflexion de la cheville", "en": "Ankle dorsiflexion" }
      ],
      "explFr": "Le grand fessier est le principal extenseur de la hanche (montée d'escalier, relevé de la position assise, course).",
      "explEn": "The gluteus maximus is the main hip extensor (climbing stairs, rising from sitting, running)."
     },
     {
      "fr": "Le muscle ilio-psoas est surtout le principal...",
      "en": "The iliopsoas muscle is mainly the primary...",
      "choices": [
       { "fr": "Fléchisseur de la hanche", "en": "Hip flexor", "correct": true },
       { "fr": "Extenseur du genou", "en": "Knee extensor" },
       { "fr": "Abducteur de l'épaule", "en": "Shoulder abductor" },
       { "fr": "Fléchisseur plantaire", "en": "Plantar flexor" }
      ],
      "explFr": "L'ilio-psoas (iliaque + grand psoas) est le fléchisseur le plus puissant de la hanche.",
      "explEn": "The iliopsoas (iliacus + psoas major) is the most powerful hip flexor."
     },
     {
      "fr": "Le diaphragme est avant tout...",
      "en": "The diaphragm is above all...",
      "choices": [
       { "fr": "Le principal muscle de l'inspiration", "en": "The main muscle of inspiration", "correct": true },
       { "fr": "Un muscle de la mastication", "en": "A muscle of chewing" },
       { "fr": "Un extenseur de la colonne", "en": "A spine extensor" },
       { "fr": "Un rotateur de l'épaule", "en": "A shoulder rotator" }
      ],
      "explFr": "Le diaphragme sépare thorax et abdomen ; sa contraction (descente) crée l'inspiration. Il est innervé par le nerf phrénique.",
      "explEn": "The diaphragm separates thorax and abdomen; its contraction (descent) creates inspiration. It is innervated by the phrenic nerve."
     },
     {
      "fr": "Vrai ou faux : le biceps brachial fléchit le coude ET participe à la supination de l'avant-bras.",
      "en": "True or false: the biceps brachii flexes the elbow AND helps supinate the forearm.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Le biceps brachial est fléchisseur du coude et un puissant supinateur (ex. tourner un tournevis, visser).",
      "explEn": "The biceps brachii flexes the elbow and is a strong supinator (e.g., turning a screwdriver)."
     },
     {
      "fr": "Vrai ou faux : le grand dorsal (latissimus dorsi) est un adducteur et extenseur de l'épaule.",
      "en": "True or false: the latissimus dorsi is an adductor and extensor of the shoulder.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Le grand dorsal fait l'adduction, l'extension et la rotation médiale de l'épaule (mouvement de « tirer vers le bas »).",
      "explEn": "The latissimus dorsi adducts, extends and medially rotates the shoulder (a \"pull-down\" motion)."
     },
     {
      "fr": "Le moyen fessier joue surtout un rôle de...",
      "en": "The gluteus medius mainly acts as a...",
      "choices": [
       { "fr": "Abducteur de la hanche et stabilisateur du bassin", "en": "Hip abductor and pelvic stabilizer", "correct": true },
       { "fr": "Fléchisseur du genou", "en": "Knee flexor" },
       { "fr": "Extenseur du coude", "en": "Elbow extensor" },
       { "fr": "Fléchisseur plantaire", "en": "Plantar flexor" }
      ],
      "explFr": "Le moyen fessier stabilise le bassin à la marche (appui unipodal) ; sa faiblesse donne un signe de Trendelenburg.",
      "explEn": "The gluteus medius stabilizes the pelvis during gait (single-leg stance); its weakness produces a Trendelenburg sign."
     },
     {
      "fr": "Associe chaque muscle à son action principale.",
      "en": "Match each muscle to its main action.",
      "type": "match",
      "pairs": [
       { "term_fr": "Tibial antérieur", "term_en": "Tibialis anterior", "def_fr": "Dorsiflexion de la cheville", "def_en": "Ankle dorsiflexion" },
       { "term_fr": "Gastrocnémien", "term_en": "Gastrocnemius", "def_fr": "Flexion plantaire", "def_en": "Plantar flexion" },
       { "term_fr": "Quadriceps", "term_en": "Quadriceps", "def_fr": "Extension du genou", "def_en": "Knee extension" },
       { "term_fr": "Ilio-psoas", "term_en": "Iliopsoas", "def_fr": "Flexion de la hanche", "def_en": "Hip flexion" }
      ],
      "explFr": "Relier un muscle à son action est essentiel pour interpréter un bilan musculaire.",
      "explEn": "Linking a muscle to its action is essential for interpreting a manual muscle test."
     },
     {
      "fr": "Le grand pectoral produit surtout, à l'épaule...",
      "en": "The pectoralis major mainly produces, at the shoulder...",
      "choices": [
       { "fr": "L'adduction et la rotation médiale", "en": "Adduction and medial rotation", "correct": true },
       { "fr": "L'abduction et la rotation latérale", "en": "Abduction and lateral rotation" },
       { "fr": "L'extension pure", "en": "Pure extension" },
       { "fr": "La dépression de la scapula seulement", "en": "Scapular depression only" }
      ],
      "explFr": "Le grand pectoral amène le bras vers la ligne médiane (adduction) et le tourne vers l'intérieur (rotation médiale).",
      "explEn": "The pectoralis major brings the arm toward the midline (adduction) and rotates it inward (medial rotation)."
     }
    ]
   },
   {
    "level": 3,
    "questions": [
     {
      "fr": "Sur quel repère osseux s'insère le tendon calcanéen (tendon d'Achille)?",
      "en": "Onto which bony landmark does the calcaneal (Achilles) tendon insert?",
      "choices": [
       { "fr": "La tubérosité du calcanéus", "en": "The calcaneal tuberosity", "correct": true },
       { "fr": "La tête du talus", "en": "The head of the talus" },
       { "fr": "La base du 1er métatarsien", "en": "The base of the 1st metatarsal" },
       { "fr": "La malléole médiale", "en": "The medial malleolus" }
      ],
      "explFr": "Le tendon calcanéen, terminaison du triceps sural, s'insère sur la face postérieure de la tubérosité calcanéenne.",
      "explEn": "The calcaneal tendon, the ending of the triceps surae, inserts on the posterior calcaneal tuberosity."
     },
     {
      "fr": "Le tendon du quadriceps englobe la patella, puis se poursuit par le ligament patellaire jusqu'à...",
      "en": "The quadriceps tendon encloses the patella, then continues as the patellar ligament to...",
      "choices": [
       { "fr": "La tubérosité tibiale", "en": "The tibial tuberosity", "correct": true },
       { "fr": "La tête de la fibula", "en": "The head of the fibula" },
       { "fr": "Le grand trochanter", "en": "The greater trochanter" },
       { "fr": "La malléole latérale", "en": "The lateral malleolus" }
      ],
      "explFr": "Le quadriceps agit sur le tibia via la patella puis le ligament patellaire, inséré sur la tubérosité tibiale.",
      "explEn": "The quadriceps acts on the tibia via the patella and then the patellar ligament, inserting on the tibial tuberosity."
     },
     {
      "fr": "Le biceps brachial s'insère distalement sur...",
      "en": "The biceps brachii inserts distally on...",
      "choices": [
       { "fr": "La tubérosité radiale (bicipitale)", "en": "The radial (bicipital) tuberosity", "correct": true },
       { "fr": "L'olécrâne de l'ulna", "en": "The olecranon of the ulna" },
       { "fr": "Le tubercule majeur de l'humérus", "en": "The greater tubercle of the humerus" },
       { "fr": "Le processus coracoïde", "en": "The coracoid process" }
      ],
      "explFr": "Le tendon distal du biceps brachial se fixe sur la tubérosité radiale, ce qui explique son rôle de supinateur.",
      "explEn": "The distal biceps tendon attaches to the radial tuberosity, which explains its supinator role."
     },
     {
      "fr": "Les muscles extenseurs du poignet (épicondyliens latéraux) ont une origine commune sur...",
      "en": "The wrist extensors (lateral epicondylar group) share a common origin on...",
      "choices": [
       { "fr": "L'épicondyle latéral de l'humérus", "en": "The lateral epicondyle of the humerus", "correct": true },
       { "fr": "L'épicondyle médial de l'humérus", "en": "The medial epicondyle of the humerus" },
       { "fr": "L'olécrâne", "en": "The olecranon" },
       { "fr": "La styloïde radiale", "en": "The radial styloid" }
      ],
      "explFr": "Le tendon extenseur commun naît de l'épicondyle latéral ; sa surcharge donne l'« épicondylite latérale » (tennis elbow).",
      "explEn": "The common extensor tendon arises from the lateral epicondyle; its overload causes \"lateral epicondylitis\" (tennis elbow)."
     },
     {
      "fr": "Quel repère osseux palpe-t-on à la pointe supérieure de l'épaule?",
      "en": "Which bony landmark is palpated at the top point of the shoulder?",
      "choices": [
       { "fr": "L'acromion de la scapula", "en": "The acromion of the scapula", "correct": true },
       { "fr": "Le grand trochanter", "en": "The greater trochanter" },
       { "fr": "La tubérosité tibiale", "en": "The tibial tuberosity" },
       { "fr": "L'olécrâne", "en": "The olecranon" }
      ],
      "explFr": "L'acromion, prolongement de l'épine scapulaire, est le repère osseux de la pointe de l'épaule.",
      "explEn": "The acromion, an extension of the scapular spine, is the bony landmark at the tip of the shoulder."
     },
     {
      "fr": "L'épine iliaque antéro-supérieure (EIAS) est l'origine de quel muscle?",
      "en": "The anterior superior iliac spine (ASIS) is the origin of which muscle?",
      "choices": [
       { "fr": "Le sartorius (couturier)", "en": "The sartorius", "correct": true },
       { "fr": "Le grand fessier", "en": "The gluteus maximus" },
       { "fr": "Le soléaire", "en": "The soleus" },
       { "fr": "Le grand dorsal", "en": "The latissimus dorsi" }
      ],
      "explFr": "Le sartorius naît de l'EIAS et descend en oblique jusqu'à la patte d'oie (face médiale du tibia).",
      "explEn": "The sartorius arises from the ASIS and runs obliquely to the pes anserinus (medial tibia)."
     },
     {
      "fr": "Le tendon du long chef du biceps brachial chemine dans...",
      "en": "The long head of the biceps brachii tendon runs through...",
      "choices": [
       { "fr": "Le sillon (gouttière) intertuberculaire de l'humérus", "en": "The intertubercular (bicipital) groove of the humerus", "correct": true },
       { "fr": "Le canal carpien", "en": "The carpal tunnel" },
       { "fr": "Le sillon du nerf ulnaire", "en": "The ulnar nerve groove" },
       { "fr": "La fosse infra-épineuse", "en": "The infraspinous fossa" }
      ],
      "explFr": "Le long chef du biceps passe dans le sillon intertuberculaire, entre les tubercules majeur et mineur de l'humérus.",
      "explEn": "The long head of the biceps runs in the intertubercular groove, between the greater and lesser tubercles of the humerus."
     },
     {
      "fr": "Quel nerf innerve le diaphragme?",
      "en": "Which nerve innervates the diaphragm?",
      "choices": [
       { "fr": "Le nerf phrénique", "en": "The phrenic nerve", "correct": true },
       { "fr": "Le nerf vague", "en": "The vagus nerve" },
       { "fr": "Le nerf sciatique", "en": "The sciatic nerve" },
       { "fr": "Le nerf médian", "en": "The median nerve" }
      ],
      "explFr": "Le nerf phrénique (racines C3-C5) innerve le diaphragme — d'où l'adage « C3, 4, 5 keeps the diaphragm alive ».",
      "explEn": "The phrenic nerve (roots C3-C5) innervates the diaphragm — hence \"C3, 4, 5 keeps the diaphragm alive\"."
     },
     {
      "fr": "Le muscle supra-épineux, fréquemment lésé dans la coiffe, s'insère sur...",
      "en": "The supraspinatus, often torn in the rotator cuff, inserts on...",
      "choices": [
       { "fr": "Le tubercule majeur de l'humérus", "en": "The greater tubercle of the humerus", "correct": true },
       { "fr": "Le tubercule mineur de l'humérus", "en": "The lesser tubercle of the humerus" },
       { "fr": "La tubérosité radiale", "en": "The radial tuberosity" },
       { "fr": "L'olécrâne", "en": "The olecranon" }
      ],
      "explFr": "Le supra-épineux, initiateur de l'abduction, s'insère sur la facette supérieure du tubercule majeur.",
      "explEn": "The supraspinatus, which initiates abduction, inserts on the superior facet of the greater tubercle."
     },
     {
      "fr": "Le tractus ilio-tibial se termine distalement sur...",
      "en": "The iliotibial tract ends distally on...",
      "choices": [
       { "fr": "Le tubercule de Gerdy (tibia latéral)", "en": "Gerdy's tubercle (lateral tibia)", "correct": true },
       { "fr": "La tête de la fibula", "en": "The head of the fibula" },
       { "fr": "La malléole médiale", "en": "The medial malleolus" },
       { "fr": "La tubérosité ischiatique", "en": "The ischial tuberosity" }
      ],
      "explFr": "Le tractus ilio-tibial (renforcé par le tenseur du fascia lata et le grand fessier) se fixe au tubercule de Gerdy.",
      "explEn": "The iliotibial tract (reinforced by the tensor fasciae latae and gluteus maximus) attaches to Gerdy's tubercle."
     },
     {
      "fr": "Vrai ou faux : la malléole médiale appartient au tibia et la malléole latérale à la fibula.",
      "en": "True or false: the medial malleolus belongs to the tibia and the lateral malleolus to the fibula.",
      "type": "tf",
      "isTrue": true,
      "explFr": "La malléole médiale est l'extrémité distale du tibia ; la malléole latérale est l'extrémité distale de la fibula.",
      "explEn": "The medial malleolus is the distal end of the tibia; the lateral malleolus is the distal end of the fibula."
     },
     {
      "fr": "Associe chaque repère de palpation à la structure correspondante.",
      "en": "Match each palpation landmark to its structure.",
      "type": "match",
      "pairs": [
       { "term_fr": "Acromion", "term_en": "Acromion", "def_fr": "Pointe de l'épaule", "def_en": "Tip of the shoulder" },
       { "term_fr": "Tubérosité tibiale", "term_en": "Tibial tuberosity", "def_fr": "Insertion du ligament patellaire", "def_en": "Patellar ligament insertion" },
       { "term_fr": "Malléole latérale", "term_en": "Lateral malleolus", "def_fr": "Extrémité distale de la fibula", "def_en": "Distal end of the fibula" },
       { "term_fr": "Olécrâne", "term_en": "Olecranon", "def_fr": "Pointe du coude (ulna)", "def_en": "Tip of the elbow (ulna)" }
      ],
      "explFr": "La palpation de repères osseux fiables oriente l'examen et le repérage des tissus mous en clinique.",
      "explEn": "Palpating reliable bony landmarks guides the exam and the location of soft tissues in the clinic."
     },
     {
      "fr": "Repérage : pour palper le corps musculaire du tibial antérieur, on demande au patient de...",
      "en": "Landmarking: to palpate the tibialis anterior belly, you ask the patient to...",
      "type": "scenario",
      "choices": [
       { "fr": "Faire une dorsiflexion + inversion ; on palpe juste en dehors de la crête tibiale", "en": "Perform dorsiflexion + inversion; palpate just lateral to the tibial crest", "correct": true },
       { "fr": "Faire une flexion plantaire ; on palpe au talon", "en": "Perform plantar flexion; palpate at the heel" },
       { "fr": "Contracter le quadriceps ; on palpe la cuisse antérieure", "en": "Contract the quadriceps; palpate the anterior thigh" },
       { "fr": "Serrer le poing ; on palpe l'avant-bras", "en": "Make a fist; palpate the forearm" }
      ],
      "explFr": "Le tibial antérieur se contracte en dorsiflexion/inversion ; son corps musculaire est palpable juste en dehors de la crête tibiale.",
      "explEn": "The tibialis anterior contracts in dorsiflexion/inversion; its belly is palpable just lateral to the tibial crest."
     },
     {
      "fr": "Quelle est l'origine proximale du long chef du biceps fémoral (ischio-jambier)?",
      "en": "What is the proximal origin of the long head of the biceps femoris (a hamstring)?",
      "choices": [
       { "fr": "La tubérosité ischiatique", "en": "The ischial tuberosity", "correct": true },
       { "fr": "L'épicondyle latéral du fémur", "en": "The lateral femoral epicondyle" },
       { "fr": "La crête iliaque", "en": "The iliac crest" },
       { "fr": "Le grand trochanter", "en": "The greater trochanter" }
      ],
      "explFr": "Comme les autres ischio-jambiers, le long chef du biceps fémoral naît de la tubérosité ischiatique.",
      "explEn": "Like the other hamstrings, the long head of the biceps femoris arises from the ischial tuberosity."
     }
    ]
   }
  ]
 },
 {
  "id": "physio",
  "order": 2,
  "title_fr": "Physiologie",
  "title_en": "Physiology",
  "icon": "🫀",
  "tiers": [
   {
    "level": 1,
    "questions": [
     {
      "fr": "Que désigne l'homéostasie?",
      "en": "What does homeostasis mean?",
      "choices": [
       { "fr": "Le maintien d'un milieu interne stable", "en": "Maintaining a stable internal environment", "correct": true },
       { "fr": "La multiplication des cellules", "en": "Cell multiplication" },
       { "fr": "La contraction des muscles", "en": "Muscle contraction" },
       { "fr": "Le vieillissement des tissus", "en": "Tissue aging" }
      ],
      "explFr": "L'homéostasie est l'équilibre dynamique du milieu interne (température, pH, glycémie...) malgré les variations externes.",
      "explEn": "Homeostasis is the dynamic balance of the internal environment (temperature, pH, blood sugar...) despite external changes."
     },
     {
      "fr": "Vrai ou faux : les systèmes nerveux et endocrinien participent tous deux à la régulation de l'homéostasie.",
      "en": "True or false: both the nervous and endocrine systems help regulate homeostasis.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Le système nerveux (rapide) et le système endocrinien (hormonal, plus lent) coordonnent la régulation homéostatique.",
      "explEn": "The nervous system (fast) and the endocrine system (hormonal, slower) coordinate homeostatic regulation."
     },
     {
      "fr": "Quel type de cellule sanguine assure le transport de l'oxygène?",
      "en": "Which blood cell carries oxygen?",
      "choices": [
       { "fr": "Le globule rouge (érythrocyte)", "en": "The red blood cell (erythrocyte)", "correct": true },
       { "fr": "Le globule blanc (leucocyte)", "en": "The white blood cell (leukocyte)" },
       { "fr": "La plaquette (thrombocyte)", "en": "The platelet (thrombocyte)" },
       { "fr": "Le neurone", "en": "The neuron" }
      ],
      "explFr": "Les globules rouges contiennent l'hémoglobine, qui fixe l'oxygène et le transporte vers les tissus.",
      "explEn": "Red blood cells contain hemoglobin, which binds oxygen and carries it to the tissues."
     },
     {
      "fr": "Le pH normal du sang artériel se situe autour de...",
      "en": "The normal pH of arterial blood is around...",
      "choices": [
       { "fr": "7,35 à 7,45", "en": "7.35 to 7.45", "correct": true },
       { "fr": "5,0 à 5,5", "en": "5.0 to 5.5" },
       { "fr": "6,0 à 6,5", "en": "6.0 to 6.5" },
       { "fr": "8,5 à 9,0", "en": "8.5 to 9.0" }
      ],
      "explFr": "Le pH sanguin est finement régulé entre 7,35 et 7,45 ; s'en écarter (acidose ou alcalose) perturbe l'organisme.",
      "explEn": "Blood pH is tightly regulated between 7.35 and 7.45; deviating (acidosis or alkalosis) disrupts the body."
     },
     {
      "fr": "Vrai ou faux : la rétroaction négative (feedback négatif) est le principal mécanisme de régulation de l'homéostasie.",
      "en": "True or false: negative feedback is the main mechanism regulating homeostasis.",
      "type": "tf",
      "isTrue": true,
      "explFr": "La rétroaction négative ramène une variable vers sa valeur cible (thermorégulation, glycémie...), ce qui stabilise le milieu interne.",
      "explEn": "Negative feedback brings a variable back toward its set point (thermoregulation, blood sugar...), stabilizing the internal environment."
     },
     {
      "fr": "Quelle molécule sert de principale « monnaie énergétique » de la cellule?",
      "en": "Which molecule is the cell's main energy currency?",
      "choices": [
       { "fr": "L'ATP (adénosine triphosphate)", "en": "ATP (adenosine triphosphate)", "correct": true },
       { "fr": "L'ADN", "en": "DNA" },
       { "fr": "Le collagène", "en": "Collagen" },
       { "fr": "L'hémoglobine", "en": "Hemoglobin" }
      ],
      "explFr": "L'ATP libère de l'énergie lors de l'hydrolyse de ses liaisons phosphate ; c'est le carburant direct de la contraction musculaire.",
      "explEn": "ATP releases energy when its phosphate bonds are hydrolyzed; it is the direct fuel of muscle contraction."
     },
     {
      "fr": "Associe chaque système à sa fonction principale.",
      "en": "Match each body system to its main function.",
      "type": "match",
      "pairs": [
       { "term_fr": "Système respiratoire", "term_en": "Respiratory system", "def_fr": "Échanges gazeux (O2/CO2)", "def_en": "Gas exchange (O2/CO2)" },
       { "term_fr": "Système cardiovasculaire", "term_en": "Cardiovascular system", "def_fr": "Transport du sang", "def_en": "Transport of blood" },
       { "term_fr": "Système urinaire", "term_en": "Urinary system", "def_fr": "Filtration et équilibre hydrique", "def_en": "Filtration and fluid balance" },
       { "term_fr": "Système nerveux", "term_en": "Nervous system", "def_fr": "Coordination rapide", "def_en": "Rapid coordination" }
      ],
      "explFr": "Les systèmes coopèrent pour maintenir l'homéostasie ; les relier à leur rôle éclaire leur impact en réadaptation.",
      "explEn": "The systems cooperate to maintain homeostasis; linking them to their role clarifies their impact in rehabilitation."
     }
    ]
   },
   {
    "level": 2,
    "questions": [
     {
      "fr": "À l'effort, l'augmentation de la fréquence cardiaque vise surtout à...",
      "en": "During exercise, the rise in heart rate mainly aims to...",
      "choices": [
       { "fr": "Augmenter l'apport d'oxygène aux muscles actifs", "en": "Increase oxygen delivery to active muscles", "correct": true },
       { "fr": "Refroidir le cerveau", "en": "Cool the brain" },
       { "fr": "Ralentir la respiration", "en": "Slow breathing" },
       { "fr": "Diminuer la glycémie", "en": "Lower blood sugar" }
      ],
      "explFr": "Le débit cardiaque augmente à l'effort pour livrer plus d'O2 et de nutriments aux muscles et évacuer le CO2.",
      "explEn": "Cardiac output rises during exercise to deliver more O2 and nutrients to muscles and remove CO2."
     },
     {
      "fr": "Le principal transporteur d'oxygène dans le sang est...",
      "en": "The main oxygen carrier in the blood is...",
      "choices": [
       { "fr": "L'hémoglobine (dans les globules rouges)", "en": "Hemoglobin (in red blood cells)", "correct": true },
       { "fr": "Le plasma seul", "en": "Plasma alone" },
       { "fr": "Les plaquettes", "en": "Platelets" },
       { "fr": "Les globules blancs", "en": "White blood cells" }
      ],
      "explFr": "L'oxygène se lie surtout à l'hémoglobine des globules rouges ; une faible partie est dissoute dans le plasma.",
      "explEn": "Oxygen binds mostly to hemoglobin in red blood cells; a small part is dissolved in plasma."
     },
     {
      "fr": "Le débit cardiaque (quantité de sang éjectée par minute) correspond à...",
      "en": "Cardiac output (blood ejected per minute) equals...",
      "choices": [
       { "fr": "Fréquence cardiaque × volume d'éjection systolique", "en": "Heart rate × stroke volume", "correct": true },
       { "fr": "Fréquence cardiaque × pression artérielle", "en": "Heart rate × blood pressure" },
       { "fr": "Volume d'éjection systolique ÷ fréquence respiratoire", "en": "Stroke volume ÷ respiratory rate" },
       { "fr": "Pression artérielle × volume sanguin total", "en": "Blood pressure × total blood volume" }
      ],
      "explFr": "Débit cardiaque = FC × volume d'éjection systolique. À l'effort, les deux augmentent pour livrer plus de sang aux muscles.",
      "explEn": "Cardiac output = HR × stroke volume. During exercise, both rise to deliver more blood to the muscles."
     },
     {
      "fr": "À l'effort, l'augmentation de la ventilation (respiration) vise surtout à...",
      "en": "During exercise, the rise in ventilation (breathing) mainly serves to...",
      "choices": [
       { "fr": "Apporter plus d'O2 et éliminer le CO2 produit", "en": "Bring in more O2 and remove the CO2 produced", "correct": true },
       { "fr": "Réchauffer les muscles", "en": "Warm the muscles" },
       { "fr": "Augmenter la glycémie", "en": "Raise blood sugar" },
       { "fr": "Ralentir le cœur", "en": "Slow the heart" }
      ],
      "explFr": "L'activité musculaire consomme de l'O2 et produit du CO2 ; la ventilation s'ajuste pour maintenir les échanges gazeux.",
      "explEn": "Muscle activity consumes O2 and produces CO2; ventilation adjusts to maintain gas exchange."
     },
     {
      "fr": "Vrai ou faux : l'entraînement en endurance augmente la densité des capillaires et des mitochondries dans le muscle.",
      "en": "True or false: endurance training increases capillary and mitochondrial density in muscle.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Ces adaptations améliorent l'apport et l'utilisation de l'O2, donc la capacité aérobie — un principe clé du réentraînement à l'effort.",
      "explEn": "These adaptations improve O2 delivery and use, hence aerobic capacity — a key principle of exercise reconditioning."
     },
     {
      "fr": "Pour un effort maximal très bref (moins de 10 secondes, ex. sprint), le muscle utilise surtout...",
      "en": "For a very brief maximal effort (under 10 s, e.g., a sprint), muscle mainly uses...",
      "choices": [
       { "fr": "Le système des phosphagènes (ATP-PC)", "en": "The phosphagen system (ATP-PC)", "correct": true },
       { "fr": "La bêta-oxydation des graisses", "en": "Fat beta-oxidation" },
       { "fr": "La photosynthèse", "en": "Photosynthesis" },
       { "fr": "La digestion des protéines", "en": "Protein digestion" }
      ],
      "explFr": "Le système ATP-PC (phosphocréatine) fournit une énergie immédiate mais de courte durée pour les efforts explosifs.",
      "explEn": "The ATP-PC (phosphocreatine) system provides immediate but short-lived energy for explosive efforts."
     },
     {
      "fr": "Associe chaque filière énergétique à sa caractéristique.",
      "en": "Match each energy system to its characteristic.",
      "type": "match",
      "pairs": [
       { "term_fr": "Système ATP-PC", "term_en": "ATP-PC system", "def_fr": "Effort explosif très bref", "def_en": "Very brief explosive effort" },
       { "term_fr": "Glycolyse anaérobie", "term_en": "Anaerobic glycolysis", "def_fr": "Effort intense, production de lactate", "def_en": "Intense effort, lactate production" },
       { "term_fr": "Système aérobie", "term_en": "Aerobic system", "def_fr": "Effort prolongé avec oxygène", "def_en": "Prolonged effort with oxygen" }
      ],
      "explFr": "Les trois filières coexistent ; leur contribution dépend de l'intensité et de la durée de l'effort.",
      "explEn": "The three systems coexist; their contribution depends on the intensity and duration of the effort."
     }
    ]
   },
   {
    "level": 3,
    "questions": [
     {
      "fr": "Quelle est l'unité fonctionnelle contractile du muscle strié squelettique?",
      "en": "What is the functional contractile unit of skeletal muscle?",
      "choices": [
       { "fr": "Le sarcomère", "en": "The sarcomere", "correct": true },
       { "fr": "Le neurone", "en": "The neuron" },
       { "fr": "Le néphron", "en": "The nephron" },
       { "fr": "L'alvéole", "en": "The alveolus" }
      ],
      "explFr": "Le sarcomère (entre deux stries Z) est l'unité contractile ; le glissement actine-myosine y produit la contraction.",
      "explEn": "The sarcomere (between two Z-lines) is the contractile unit; actin-myosin sliding produces contraction there."
     },
     {
      "fr": "Vrai ou faux : la contraction musculaire nécessite du calcium (Ca²⁺) et de l'ATP.",
      "en": "True or false: muscle contraction requires calcium (Ca²⁺) and ATP.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Le Ca²⁺ démasque les sites de liaison de l'actine, et l'ATP alimente le cycle des ponts d'union actine-myosine.",
      "explEn": "Ca²⁺ exposes actin binding sites, and ATP powers the actin-myosin cross-bridge cycle."
     },
     {
      "fr": "Lors de la contraction, d'où provient le calcium (Ca²⁺) libéré dans la fibre musculaire?",
      "en": "During contraction, where does the calcium (Ca²⁺) released into the muscle fiber come from?",
      "choices": [
       { "fr": "Du réticulum sarcoplasmique", "en": "The sarcoplasmic reticulum", "correct": true },
       { "fr": "Du noyau de la cellule", "en": "The cell nucleus" },
       { "fr": "Des mitochondries seulement", "en": "The mitochondria only" },
       { "fr": "De la membrane basale", "en": "The basement membrane" }
      ],
      "explFr": "Le potentiel d'action provoque la libération de Ca²⁺ par le réticulum sarcoplasmique, déclenchant le glissement actine-myosine.",
      "explEn": "The action potential triggers Ca²⁺ release from the sarcoplasmic reticulum, initiating actin-myosin sliding."
     },
     {
      "fr": "Quel neurotransmetteur est libéré à la jonction neuromusculaire (plaque motrice)?",
      "en": "Which neurotransmitter is released at the neuromuscular junction (motor endplate)?",
      "choices": [
       { "fr": "L'acétylcholine", "en": "Acetylcholine", "correct": true },
       { "fr": "L'adrénaline", "en": "Adrenaline" },
       { "fr": "L'insuline", "en": "Insulin" },
       { "fr": "La dopamine", "en": "Dopamine" }
      ],
      "explFr": "L'acétylcholine libérée par le motoneurone dépolarise la fibre musculaire, ce qui déclenche la contraction.",
      "explEn": "Acetylcholine released by the motor neuron depolarizes the muscle fiber, triggering contraction."
     },
     {
      "fr": "Vrai ou faux : une unité motrice comprend un motoneurone et toutes les fibres musculaires qu'il innerve.",
      "en": "True or false: a motor unit is one motor neuron plus all the muscle fibers it innervates.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Recruter plus d'unités motrices (ou les activer plus vite) augmente la force développée par le muscle.",
      "explEn": "Recruiting more motor units (or firing them faster) increases the force the muscle produces."
     },
     {
      "fr": "Les fibres musculaires de type I (lentes) se caractérisent surtout par...",
      "en": "Type I (slow) muscle fibers are mainly characterized by...",
      "choices": [
       { "fr": "Une grande résistance à la fatigue (métabolisme oxydatif)", "en": "High fatigue resistance (oxidative metabolism)", "correct": true },
       { "fr": "Une contraction très rapide et une fatigue rapide", "en": "Very fast contraction and quick fatigue" },
       { "fr": "Une absence totale de mitochondries", "en": "A complete absence of mitochondria" },
       { "fr": "Une incapacité à se contracter", "en": "An inability to contract" }
      ],
      "explFr": "Les fibres de type I, riches en mitochondries, soutiennent les efforts prolongés (posture, endurance) ; les type IIx sont rapides mais fatigables.",
      "explEn": "Type I fibers, rich in mitochondria, sustain prolonged efforts (posture, endurance); type IIx fibers are fast but fatigable."
     },
     {
      "fr": "Associe chaque élément à sa description.",
      "en": "Match each element to its description.",
      "type": "match",
      "pairs": [
       { "term_fr": "Sarcomère", "term_en": "Sarcomere", "def_fr": "Unité contractile du muscle", "def_en": "Muscle's contractile unit" },
       { "term_fr": "Acétylcholine", "term_en": "Acetylcholine", "def_fr": "Neurotransmetteur de la plaque motrice", "def_en": "Motor endplate neurotransmitter" },
       { "term_fr": "Fibre type I", "term_en": "Type I fiber", "def_fr": "Endurance, oxydative", "def_en": "Endurance, oxidative" },
       { "term_fr": "Fibre type IIx", "term_en": "Type IIx fiber", "def_fr": "Puissance, fatigable", "def_en": "Power, fatigable" }
      ],
      "explFr": "Comprendre ces composantes aide à interpréter la force, la fatigue et les effets de l'immobilisation ou de l'entraînement.",
      "explEn": "Understanding these components helps interpret strength, fatigue and the effects of immobilization or training."
     }
    ]
   }
  ]
 },
 {
  "id": "biomeca",
  "order": 3,
  "title_fr": "Biomécanique & contrôle moteur",
  "title_en": "Biomechanics & motor control",
  "icon": "⚙️",
  "tiers": [
   {
    "level": 1,
    "questions": [
     {
      "fr": "Un mouvement qui diminue l'angle d'une articulation est une...",
      "en": "A movement that decreases a joint's angle is a...",
      "choices": [
       { "fr": "Flexion", "en": "Flexion", "correct": true },
       { "fr": "Extension", "en": "Extension" },
       { "fr": "Abduction", "en": "Abduction" },
       { "fr": "Rotation", "en": "Rotation" }
      ],
      "explFr": "La flexion diminue l'angle articulaire (ex. plier le coude) ; l'extension l'augmente.",
      "explEn": "Flexion decreases the joint angle (e.g., bending the elbow); extension increases it."
     },
     {
      "fr": "Vrai ou faux : l'abduction éloigne un segment de la ligne médiane du corps.",
      "en": "True or false: abduction moves a segment away from the body's midline.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Abduction = s'éloigner de l'axe médian ; adduction = s'en rapprocher.",
      "explEn": "Abduction = moving away from the midline; adduction = moving toward it."
     },
     {
      "fr": "Quel plan divise le corps en une partie droite et une partie gauche?",
      "en": "Which plane divides the body into right and left parts?",
      "choices": [
       { "fr": "Le plan sagittal", "en": "The sagittal plane", "correct": true },
       { "fr": "Le plan frontal (coronal)", "en": "The frontal (coronal) plane" },
       { "fr": "Le plan transverse (horizontal)", "en": "The transverse (horizontal) plane" },
       { "fr": "Le plan oblique", "en": "The oblique plane" }
      ],
      "explFr": "Le plan sagittal sépare la droite de la gauche ; le plan médian passe exactement au centre du corps.",
      "explEn": "The sagittal plane separates right from left; the median plane passes exactly through the body's center."
     },
     {
      "fr": "Le plan frontal (coronal) divise le corps en une partie...",
      "en": "The frontal (coronal) plane divides the body into...",
      "choices": [
       { "fr": "Avant (antérieure) et arrière (postérieure)", "en": "Front (anterior) and back (posterior)", "correct": true },
       { "fr": "Droite et gauche", "en": "Right and left" },
       { "fr": "Haute et basse", "en": "Upper and lower" },
       { "fr": "Interne et externe", "en": "Inner and outer" }
      ],
      "explFr": "Le plan frontal sépare l'avant de l'arrière ; on y observe surtout l'abduction et l'adduction.",
      "explEn": "The frontal plane separates front from back; it is where abduction and adduction mainly occur."
     },
     {
      "fr": "Le mouvement qui amène la paume de la main vers le haut est...",
      "en": "The movement that turns the palm upward is...",
      "choices": [
       { "fr": "La supination", "en": "Supination", "correct": true },
       { "fr": "La pronation", "en": "Pronation" },
       { "fr": "La flexion", "en": "Flexion" },
       { "fr": "L'abduction", "en": "Abduction" }
      ],
      "explFr": "À l'avant-bras, la supination tourne la paume vers le haut ; la pronation la tourne vers le bas.",
      "explEn": "At the forearm, supination turns the palm up; pronation turns it down."
     },
     {
      "fr": "Vrai ou faux : l'adduction rapproche un segment de la ligne médiane du corps.",
      "en": "True or false: adduction moves a segment toward the body's midline.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Adduction = se rapprocher de l'axe médian (ex. ramener le bras contre le tronc) ; abduction = s'en éloigner.",
      "explEn": "Adduction = moving toward the midline (e.g., bringing the arm to the trunk); abduction = moving away."
     },
     {
      "fr": "Associe chaque mouvement à sa définition.",
      "en": "Match each movement to its definition.",
      "type": "match",
      "pairs": [
       { "term_fr": "Flexion", "term_en": "Flexion", "def_fr": "Diminue l'angle articulaire", "def_en": "Decreases the joint angle" },
       { "term_fr": "Extension", "term_en": "Extension", "def_fr": "Augmente l'angle articulaire", "def_en": "Increases the joint angle" },
       { "term_fr": "Abduction", "term_en": "Abduction", "def_fr": "Éloigne de la ligne médiane", "def_en": "Moves away from midline" },
       { "term_fr": "Adduction", "term_en": "Adduction", "def_fr": "Rapproche de la ligne médiane", "def_en": "Moves toward midline" }
      ],
      "explFr": "Maîtriser ce vocabulaire est indispensable pour décrire précisément un mouvement en biomécanique et en clinique.",
      "explEn": "Mastering this vocabulary is essential to precisely describe a movement in biomechanics and in the clinic."
     }
    ]
   },
   {
    "level": 2,
    "questions": [
     {
      "fr": "Dans le plan sagittal se font surtout les mouvements de...",
      "en": "In the sagittal plane, the main movements are...",
      "choices": [
       { "fr": "Flexion et extension", "en": "Flexion and extension", "correct": true },
       { "fr": "Abduction et adduction", "en": "Abduction and adduction" },
       { "fr": "Rotation interne et externe", "en": "Internal and external rotation" },
       { "fr": "Inclinaisons latérales seulement", "en": "Lateral bending only" }
      ],
      "explFr": "Le plan sagittal (avant-arrière) permet flexion/extension ; le plan frontal, abduction/adduction ; le plan transverse, les rotations.",
      "explEn": "The sagittal plane (front-back) allows flexion/extension; the frontal plane, abduction/adduction; the transverse plane, rotations."
     },
     {
      "fr": "Un levier dont l'appui (pivot) est situé entre la force et la charge est un levier du...",
      "en": "A lever whose fulcrum lies between the effort and the load is a lever of the...",
      "choices": [
       { "fr": "1er genre (interappui)", "en": "1st class (fulcrum in the middle)", "correct": true },
       { "fr": "2e genre", "en": "2nd class" },
       { "fr": "3e genre", "en": "3rd class" },
       { "fr": "4e genre", "en": "4th class" }
      ],
      "explFr": "Levier du 1er genre : appui central (ex. bascule). Beaucoup d'articulations du corps sont des leviers du 3e genre (force entre appui et charge).",
      "explEn": "A first-class lever has a central fulcrum (e.g., a seesaw). Many body joints are third-class levers (effort between fulcrum and load)."
     },
     {
      "fr": "La flexion du coude par le biceps brachial est un exemple de levier du...",
      "en": "Elbow flexion by the biceps brachii is an example of a lever of the...",
      "choices": [
       { "fr": "3e genre (force entre l'appui et la charge)", "en": "3rd class (effort between fulcrum and load)", "correct": true },
       { "fr": "1er genre (appui central)", "en": "1st class (central fulcrum)" },
       { "fr": "2e genre (charge centrale)", "en": "2nd class (central load)" },
       { "fr": "Aucun (ce n'est pas un levier)", "en": "None (it is not a lever)" }
      ],
      "explFr": "La plupart des articulations du corps sont des leviers du 3e genre : la force musculaire s'applique entre l'appui (articulation) et la charge.",
      "explEn": "Most body joints are third-class levers: the muscular effort is applied between the fulcrum (joint) and the load."
     },
     {
      "fr": "La montée sur la pointe des pieds (flexion plantaire, appui sur l'avant-pied) illustre surtout un levier du...",
      "en": "Rising on tiptoes (plantar flexion, weight on the forefoot) mainly illustrates a lever of the...",
      "choices": [
       { "fr": "2e genre (charge entre l'appui et la force)", "en": "2nd class (load between fulcrum and effort)", "correct": true },
       { "fr": "3e genre", "en": "3rd class" },
       { "fr": "1er genre", "en": "1st class" },
       { "fr": "4e genre", "en": "4th class" }
      ],
      "explFr": "Au pied en flexion plantaire, l'appui est à l'avant-pied, la charge (poids du corps) au centre et la force au talon : levier du 2e genre.",
      "explEn": "In foot plantar flexion, the fulcrum is at the forefoot, the load (body weight) is central and the effort is at the heel: a second-class lever."
     },
     {
      "fr": "Vrai ou faux : élargir la base de support et abaisser le centre de gravité augmentent la stabilité.",
      "en": "True or false: widening the base of support and lowering the center of gravity increase stability.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Une base large et un centre de gravité bas rendent l'équilibre plus stable — un principe clé pour les aides à la marche et les transferts.",
      "explEn": "A wide base and a low center of gravity make balance more stable — a key principle for walking aids and transfers."
     },
     {
      "fr": "Les mouvements de rotation (interne/externe) se font principalement dans quel plan?",
      "en": "Rotational movements (internal/external) mainly occur in which plane?",
      "choices": [
       { "fr": "Le plan transverse (horizontal)", "en": "The transverse (horizontal) plane", "correct": true },
       { "fr": "Le plan sagittal", "en": "The sagittal plane" },
       { "fr": "Le plan frontal", "en": "The frontal plane" },
       { "fr": "Aucun plan", "en": "No plane" }
      ],
      "explFr": "Les rotations s'effectuent dans le plan transverse, autour d'un axe longitudinal (vertical).",
      "explEn": "Rotations occur in the transverse plane, around a longitudinal (vertical) axis."
     },
     {
      "fr": "Associe chaque plan de mouvement au mouvement typique qui s'y produit.",
      "en": "Match each plane of movement to the typical movement in it.",
      "type": "match",
      "pairs": [
       { "term_fr": "Plan sagittal", "term_en": "Sagittal plane", "def_fr": "Flexion / extension", "def_en": "Flexion / extension" },
       { "term_fr": "Plan frontal", "term_en": "Frontal plane", "def_fr": "Abduction / adduction", "def_en": "Abduction / adduction" },
       { "term_fr": "Plan transverse", "term_en": "Transverse plane", "def_fr": "Rotations", "def_en": "Rotations" }
      ],
      "explFr": "Associer chaque plan à ses mouvements est la base de l'analyse du mouvement en biomécanique.",
      "explEn": "Linking each plane to its movements is the foundation of movement analysis in biomechanics."
     }
    ]
   },
   {
    "level": 3,
    "questions": [
     {
      "fr": "La proprioception correspond à...",
      "en": "Proprioception refers to...",
      "choices": [
       { "fr": "La perception de la position et du mouvement des segments corporels", "en": "The sense of position and movement of body segments", "correct": true },
       { "fr": "La perception de la douleur seulement", "en": "The sense of pain only" },
       { "fr": "La vision périphérique", "en": "Peripheral vision" },
       { "fr": "L'audition", "en": "Hearing" }
      ],
      "explFr": "La proprioception (récepteurs articulaires, musculaires, tendineux) informe le SNC de la position et du mouvement — clé de l'équilibre.",
      "explEn": "Proprioception (joint, muscle and tendon receptors) informs the CNS of position and movement — key to balance."
     },
     {
      "fr": "Vrai ou faux : un contrôle moteur « anticipatoire » (feedforward) prépare l'ajustement AVANT que la perturbation survienne.",
      "en": "True or false: 'feedforward' motor control prepares the adjustment BEFORE the perturbation occurs.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Les ajustements posturaux anticipés (feedforward) précèdent le mouvement volontaire ; le feedback corrige après coup.",
      "explEn": "Anticipatory postural adjustments (feedforward) precede voluntary movement; feedback corrects afterward."
     },
     {
      "fr": "Quel récepteur sensoriel du muscle détecte son étirement (variation de longueur)?",
      "en": "Which muscle sensory receptor detects its stretch (length change)?",
      "choices": [
       { "fr": "Le fuseau neuromusculaire", "en": "The muscle spindle", "correct": true },
       { "fr": "L'organe tendineux de Golgi", "en": "The Golgi tendon organ" },
       { "fr": "Le corpuscule de Pacini de la peau", "en": "The skin's Pacinian corpuscle" },
       { "fr": "La cellule ciliée de l'oreille", "en": "The ear's hair cell" }
      ],
      "explFr": "Le fuseau neuromusculaire, situé dans le muscle, détecte l'étirement et sa vitesse ; il déclenche le réflexe myotatique.",
      "explEn": "The muscle spindle, within the muscle, detects stretch and its speed; it triggers the stretch reflex."
     },
     {
      "fr": "Que détecte principalement l'organe tendineux de Golgi?",
      "en": "What does the Golgi tendon organ mainly detect?",
      "choices": [
       { "fr": "La tension (force) développée dans le tendon", "en": "The tension (force) in the tendon", "correct": true },
       { "fr": "La température de la peau", "en": "Skin temperature" },
       { "fr": "La couleur des objets", "en": "The color of objects" },
       { "fr": "La glycémie", "en": "Blood sugar" }
      ],
      "explFr": "L'organe tendineux de Golgi, à la jonction muscle-tendon, surveille la tension et protège contre une force excessive.",
      "explEn": "The Golgi tendon organ, at the muscle-tendon junction, monitors tension and protects against excessive force."
     },
     {
      "fr": "Vrai ou faux : l'apprentissage moteur passe typiquement par les stades cognitif, associatif, puis autonome.",
      "en": "True or false: motor learning typically progresses through the cognitive, associative, then autonomous stages.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Au stade cognitif on réfléchit beaucoup ; au stade autonome le geste devient automatique et fluide. Cela guide la façon d'enseigner un exercice.",
      "explEn": "In the cognitive stage one thinks a lot; in the autonomous stage the movement becomes automatic and fluid. This guides how to teach an exercise."
     },
     {
      "fr": "Une contraction où le muscle s'allonge tout en restant sous tension est dite...",
      "en": "A contraction in which the muscle lengthens while under tension is called...",
      "choices": [
       { "fr": "Excentrique", "en": "Eccentric", "correct": true },
       { "fr": "Concentrique", "en": "Concentric" },
       { "fr": "Isométrique", "en": "Isometric" },
       { "fr": "Passive", "en": "Passive" }
      ],
      "explFr": "En excentrique, le muscle freine le mouvement en s'allongeant (ex. descendre un escalier) ; en concentrique, il se raccourcit.",
      "explEn": "In eccentric action, the muscle brakes the movement while lengthening (e.g., going down stairs); in concentric, it shortens."
     },
     {
      "fr": "Associe chaque type de contraction à sa description.",
      "en": "Match each contraction type to its description.",
      "type": "match",
      "pairs": [
       { "term_fr": "Concentrique", "term_en": "Concentric", "def_fr": "Le muscle se raccourcit", "def_en": "The muscle shortens" },
       { "term_fr": "Excentrique", "term_en": "Eccentric", "def_fr": "Le muscle s'allonge sous charge", "def_en": "The muscle lengthens under load" },
       { "term_fr": "Isométrique", "term_en": "Isometric", "def_fr": "Longueur constante, pas de mouvement", "def_en": "Constant length, no movement" }
      ],
      "explFr": "Reconnaître le type de contraction est essentiel pour prescrire et doser un exercice de renforcement.",
      "explEn": "Recognizing the contraction type is essential to prescribe and dose a strengthening exercise."
     }
    ]
   }
  ]
 },
 {
  "id": "patho",
  "order": 4,
  "title_fr": "Pathologies",
  "title_en": "Pathologies",
  "icon": "🩺",
  "tiers": [
   {
    "level": 1,
    "questions": [
     {
      "fr": "Une entorse est une lésion touchant surtout...",
      "en": "A sprain is an injury mainly affecting...",
      "choices": [
       { "fr": "Un ligament", "en": "A ligament", "correct": true },
       { "fr": "Un os", "en": "A bone" },
       { "fr": "Un nerf", "en": "A nerve" },
       { "fr": "Une artère", "en": "An artery" }
      ],
      "explFr": "L'entorse est un étirement ou une déchirure ligamentaire ; l'atteinte d'un muscle/tendon est plutôt une élongation/claquage.",
      "explEn": "A sprain is a ligament stretch or tear; a muscle/tendon injury is rather a strain."
     },
     {
      "fr": "Vrai ou faux : une tendinopathie est une atteinte d'un tendon.",
      "en": "True or false: a tendinopathy is a disorder of a tendon.",
      "type": "tf",
      "isTrue": true,
      "explFr": "La tendinopathie regroupe les atteintes du tendon (dégénératives ou inflammatoires) liées souvent à une surcharge.",
      "explEn": "Tendinopathy covers tendon disorders (degenerative or inflammatory), often linked to overload."
     },
     {
      "fr": "Une élongation (ou claquage) musculaire touche surtout...",
      "en": "A muscle strain mainly affects...",
      "choices": [
       { "fr": "Un muscle ou son tendon", "en": "A muscle or its tendon", "correct": true },
       { "fr": "Un ligament", "en": "A ligament" },
       { "fr": "Un os", "en": "A bone" },
       { "fr": "Un nerf", "en": "A nerve" }
      ],
      "explFr": "L'élongation/claquage est une lésion de fibres musculaires ou de la jonction muscle-tendon ; l'entorse touche plutôt un ligament.",
      "explEn": "A strain is an injury to muscle fibers or the muscle-tendon junction; a sprain rather affects a ligament."
     },
     {
      "fr": "Quels sont les signes cardinaux (classiques) de l'inflammation?",
      "en": "What are the cardinal (classic) signs of inflammation?",
      "choices": [
       { "fr": "Rougeur, chaleur, œdème et douleur", "en": "Redness, heat, swelling and pain", "correct": true },
       { "fr": "Pâleur, froideur et engourdissement", "en": "Pallor, coldness and numbness" },
       { "fr": "Fièvre et toux uniquement", "en": "Fever and cough only" },
       { "fr": "Perte de cheveux et fatigue", "en": "Hair loss and fatigue" }
      ],
      "explFr": "Les quatre signes classiques : rougeur, chaleur, œdème (tuméfaction) et douleur — souvent accompagnés d'une perte de fonction.",
      "explEn": "The four classic signs: redness, heat, swelling and pain — often with loss of function."
     },
     {
      "fr": "Vrai ou faux : une luxation correspond à une perte de contact complète entre les surfaces d'une articulation.",
      "en": "True or false: a dislocation is a complete loss of contact between the surfaces of a joint.",
      "type": "tf",
      "isTrue": true,
      "explFr": "La luxation déplace complètement les surfaces articulaires ; une subluxation n'est qu'un déplacement partiel.",
      "explEn": "A dislocation completely displaces the joint surfaces; a subluxation is only a partial displacement."
     },
     {
      "fr": "L'ostéoporose se caractérise surtout par...",
      "en": "Osteoporosis is mainly characterized by...",
      "choices": [
       { "fr": "Une diminution de la densité osseuse et une fragilité accrue", "en": "Reduced bone density and increased fragility", "correct": true },
       { "fr": "Une inflammation des tendons", "en": "Tendon inflammation" },
       { "fr": "Une usure du cartilage seulement", "en": "Cartilage wear only" },
       { "fr": "Une atteinte des nerfs périphériques", "en": "Peripheral nerve damage" }
      ],
      "explFr": "L'ostéoporose fragilise l'os et augmente le risque de fracture ; l'exercice en mise en charge fait partie de la prévention. À valider.",
      "explEn": "Osteoporosis weakens bone and raises fracture risk; weight-bearing exercise is part of prevention. To be validated."
     },
     {
      "fr": "Associe chaque type de lésion à la structure atteinte.",
      "en": "Match each injury type to the structure affected.",
      "type": "match",
      "pairs": [
       { "term_fr": "Entorse", "term_en": "Sprain", "def_fr": "Ligament", "def_en": "Ligament" },
       { "term_fr": "Fracture", "term_en": "Fracture", "def_fr": "Os", "def_en": "Bone" },
       { "term_fr": "Luxation", "term_en": "Dislocation", "def_fr": "Articulation (surfaces déplacées)", "def_en": "Joint (displaced surfaces)" },
       { "term_fr": "Tendinopathie", "term_en": "Tendinopathy", "def_fr": "Tendon", "def_en": "Tendon" }
      ],
      "explFr": "Bien distinguer la structure atteinte oriente l'évaluation et le plan de traitement. À valider.",
      "explEn": "Correctly identifying the affected structure guides assessment and treatment planning. To be validated."
     }
    ]
   },
   {
    "level": 2,
    "questions": [
     {
      "fr": "L'arthrose est une atteinte dégénérative touchant surtout...",
      "en": "Osteoarthritis is a degenerative disorder mainly affecting...",
      "choices": [
       { "fr": "Le cartilage articulaire", "en": "The articular cartilage", "correct": true },
       { "fr": "La moelle osseuse", "en": "The bone marrow" },
       { "fr": "Les globules rouges", "en": "The red blood cells" },
       { "fr": "Les alvéoles pulmonaires", "en": "The lung alveoli" }
      ],
      "explFr": "L'arthrose use le cartilage articulaire, causant douleur, raideur et perte de mobilité progressive.",
      "explEn": "Osteoarthritis wears down articular cartilage, causing pain, stiffness and progressive loss of mobility."
     },
     {
      "fr": "Une fracture correspond à...",
      "en": "A fracture is...",
      "choices": [
       { "fr": "Une rupture de la continuité d'un os", "en": "A break in the continuity of a bone", "correct": true },
       { "fr": "Un déplacement d'un tendon", "en": "A tendon displacement" },
       { "fr": "Une inflammation d'une bourse", "en": "A bursa inflammation" },
       { "fr": "Une contraction involontaire", "en": "An involuntary contraction" }
      ],
      "explFr": "La fracture est une solution de continuité de l'os, souvent traumatique ; sa prise en charge influence la réadaptation.",
      "explEn": "A fracture is a break in bone continuity, often traumatic; its management shapes the rehabilitation."
     },
     {
      "fr": "La polyarthrite rhumatoïde est avant tout une maladie...",
      "en": "Rheumatoid arthritis is above all a disease that is...",
      "choices": [
       { "fr": "Inflammatoire et auto-immune touchant les articulations", "en": "Inflammatory and autoimmune, affecting the joints", "correct": true },
       { "fr": "Purement dégénérative liée à l'âge", "en": "Purely degenerative and age-related" },
       { "fr": "Une infection bactérienne des os", "en": "A bacterial bone infection" },
       { "fr": "Une maladie des globules rouges", "en": "A red blood cell disease" }
      ],
      "explFr": "La polyarthrite rhumatoïde est une atteinte inflammatoire auto-immune, souvent symétrique ; elle diffère de l'arthrose dégénérative. À valider.",
      "explEn": "Rheumatoid arthritis is an autoimmune inflammatory disorder, often symmetrical; it differs from degenerative osteoarthritis. To be validated."
     },
     {
      "fr": "Une hernie discale peut provoquer des symptômes en...",
      "en": "A herniated disc can cause symptoms by...",
      "choices": [
       { "fr": "Comprimant une racine nerveuse voisine", "en": "Compressing a nearby nerve root", "correct": true },
       { "fr": "Usant le cartilage du genou", "en": "Wearing the knee cartilage" },
       { "fr": "Bloquant une artère coronaire", "en": "Blocking a coronary artery" },
       { "fr": "Réduisant la densité osseuse", "en": "Reducing bone density" }
      ],
      "explFr": "Le matériel discal hernié peut comprimer une racine nerveuse et causer douleur, engourdissement ou faiblesse dans le trajet du nerf (ex. sciatalgie). À valider.",
      "explEn": "Herniated disc material can compress a nerve root and cause pain, numbness or weakness along the nerve (e.g., sciatica). To be validated."
     },
     {
      "fr": "Vrai ou faux : l'arthrose est de nature dégénérative alors que la polyarthrite rhumatoïde est de nature inflammatoire auto-immune.",
      "en": "True or false: osteoarthritis is degenerative while rheumatoid arthritis is inflammatory and autoimmune.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Distinction importante : l'arthrose use le cartilage (usure mécanique) ; la polyarthrite rhumatoïde attaque les articulations par un mécanisme immunitaire. À valider.",
      "explEn": "Important distinction: osteoarthritis wears cartilage (mechanical wear); rheumatoid arthritis attacks the joints through an immune mechanism. To be validated."
     },
     {
      "fr": "La toute première phase de la guérison d'un tissu lésé est la phase...",
      "en": "The very first phase of injured tissue healing is the...",
      "choices": [
       { "fr": "Inflammatoire (premiers jours)", "en": "Inflammatory (first days)", "correct": true },
       { "fr": "De remodelage (plusieurs mois)", "en": "Remodeling (several months)" },
       { "fr": "De maturation finale", "en": "Final maturation" },
       { "fr": "De cicatrisation terminée", "en": "Completed scarring" }
      ],
      "explFr": "La guérison suit trois phases : inflammatoire (premiers jours), proliférative/réparation, puis remodelage. Connaître la phase oriente le dosage du traitement. À valider.",
      "explEn": "Healing follows three phases: inflammatory (first days), proliferative/repair, then remodeling. Knowing the phase guides treatment dosing. To be validated."
     },
     {
      "fr": "Vrai ou faux : le tabagisme et le diabète peuvent retarder la guérison des tissus.",
      "en": "True or false: smoking and diabetes can delay tissue healing.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Ces facteurs nuisent à la circulation et à la réparation tissulaire, ce qui peut allonger la réadaptation. À valider.",
      "explEn": "These factors impair circulation and tissue repair, which can lengthen rehabilitation. To be validated."
     }
    ]
   },
   {
    "level": 3,
    "questions": [
     {
      "fr": "Un accident vasculaire cérébral (AVC) peut fréquemment entraîner...",
      "en": "A stroke (CVA) can frequently cause...",
      "choices": [
       { "fr": "Une hémiparésie ou hémiplégie (faiblesse d'un côté du corps)", "en": "Hemiparesis or hemiplegia (weakness on one side of the body)", "correct": true },
       { "fr": "Une fracture spontanée", "en": "A spontaneous fracture" },
       { "fr": "Une entorse de cheville", "en": "An ankle sprain" },
       { "fr": "Une tendinite de l'épaule", "en": "A shoulder tendinitis" }
      ],
      "explFr": "L'AVC atteint le cerveau et se traduit souvent par une faiblesse ou paralysie d'un hémicorps (côté opposé à la lésion). À valider.",
      "explEn": "A stroke affects the brain and often causes weakness or paralysis of one side of the body (opposite the lesion). To be validated."
     },
     {
      "fr": "Vrai ou faux : la sclérose en plaques est une maladie du système nerveux central.",
      "en": "True or false: multiple sclerosis is a disease of the central nervous system.",
      "type": "tf",
      "isTrue": true,
      "explFr": "La sclérose en plaques atteint la myéline du système nerveux central ; ses répercussions motrices concernent la réadaptation. À valider.",
      "explEn": "Multiple sclerosis affects the myelin of the central nervous system; its motor effects concern rehabilitation. To be validated."
     },
     {
      "fr": "La maladie de Parkinson se manifeste fréquemment par...",
      "en": "Parkinson's disease frequently presents with...",
      "choices": [
       { "fr": "Un tremblement de repos, une rigidité et une bradykinésie (lenteur)", "en": "Resting tremor, rigidity and bradykinesia (slowness)", "correct": true },
       { "fr": "Une fracture spontanée du fémur", "en": "A spontaneous femur fracture" },
       { "fr": "Une entorse de la cheville", "en": "An ankle sprain" },
       { "fr": "Une inflammation d'un tendon", "en": "A tendon inflammation" }
      ],
      "explFr": "La triade parkinsonienne (tremblement de repos, rigidité, bradykinésie) découle d'un déficit en dopamine ; l'équilibre et la marche sont souvent atteints. À valider.",
      "explEn": "The parkinsonian triad (resting tremor, rigidity, bradykinesia) stems from a dopamine deficit; balance and gait are often affected. To be validated."
     },
     {
      "fr": "Une lésion médullaire (moelle épinière) complète au niveau cervical peut entraîner...",
      "en": "A complete spinal cord injury at the cervical level can cause...",
      "choices": [
       { "fr": "Une tétraplégie (atteinte des quatre membres)", "en": "Tetraplegia (all four limbs affected)", "correct": true },
       { "fr": "Une atteinte d'un seul doigt", "en": "Loss in a single finger" },
       { "fr": "Une simple raideur passagère", "en": "A brief transient stiffness" },
       { "fr": "Une perte de la vision", "en": "Loss of vision" }
      ],
      "explFr": "Plus la lésion médullaire est haute, plus l'atteinte est étendue : une lésion cervicale complète peut toucher les quatre membres (tétraplégie). À valider.",
      "explEn": "The higher the spinal cord injury, the wider the impact: a complete cervical injury can affect all four limbs (tetraplegia). To be validated."
     },
     {
      "fr": "Vrai ou faux : la lombalgie commune (mal de dos) est souvent « non spécifique », sans cause structurelle précise identifiable.",
      "en": "True or false: common low back pain is often 'non-specific', with no precise identifiable structural cause.",
      "type": "tf",
      "isTrue": true,
      "explFr": "La majorité des lombalgies sont non spécifiques ; la prise en charge favorise le mouvement, l'éducation et la reprise progressive des activités. À valider.",
      "explEn": "Most low back pain is non-specific; management favors movement, education and gradual return to activity. To be validated."
     },
     {
      "fr": "La maladie pulmonaire obstructive chronique (MPOC) atteint surtout...",
      "en": "Chronic obstructive pulmonary disease (COPD) mainly affects...",
      "choices": [
       { "fr": "Les poumons et les voies respiratoires", "en": "The lungs and airways", "correct": true },
       { "fr": "Les articulations des mains", "en": "The hand joints" },
       { "fr": "La moelle épinière", "en": "The spinal cord" },
       { "fr": "Les ligaments du genou", "en": "The knee ligaments" }
      ],
      "explFr": "La MPOC limite le débit d'air et l'endurance ; la réadaptation vise la tolérance à l'effort et le dégagement des sécrétions. À valider.",
      "explEn": "COPD limits airflow and endurance; rehabilitation targets exercise tolerance and airway clearance. To be validated."
     },
     {
      "fr": "Associe chaque pathologie au système principalement atteint.",
      "en": "Match each condition to the system mainly affected.",
      "type": "match",
      "pairs": [
       { "term_fr": "AVC", "term_en": "Stroke", "def_fr": "Système nerveux central", "def_en": "Central nervous system" },
       { "term_fr": "MPOC", "term_en": "COPD", "def_fr": "Système respiratoire", "def_en": "Respiratory system" },
       { "term_fr": "Arthrose", "term_en": "Osteoarthritis", "def_fr": "Articulations (cartilage)", "def_en": "Joints (cartilage)" },
       { "term_fr": "Ostéoporose", "term_en": "Osteoporosis", "def_fr": "Os (densité)", "def_en": "Bone (density)" }
      ],
      "explFr": "Relier une pathologie au système atteint aide à anticiper les répercussions fonctionnelles en réadaptation. À valider.",
      "explEn": "Linking a condition to the affected system helps anticipate functional impacts in rehabilitation. To be validated."
     }
    ]
   }
  ]
 },
 {
  "id": "clinique",
  "order": 5,
  "title_fr": "Habiletés cliniques",
  "title_en": "Clinical skills",
  "icon": "📐",
  "tiers": [
   {
    "level": 1,
    "questions": [
     {
      "fr": "Avec quel instrument mesure-t-on l'amplitude articulaire?",
      "en": "Which instrument is used to measure joint range of motion?",
      "choices": [
       { "fr": "Le goniomètre", "en": "The goniometer", "correct": true },
       { "fr": "Le stéthoscope", "en": "The stethoscope" },
       { "fr": "Le thermomètre", "en": "The thermometer" },
       { "fr": "Le sphygmomanomètre", "en": "The sphygmomanometer" }
      ],
      "explFr": "Le goniomètre mesure les angles articulaires (amplitude active ou passive) — un outil de base du bilan.",
      "explEn": "The goniometer measures joint angles (active or passive range) — a basic assessment tool."
     },
     {
      "fr": "Vrai ou faux : la force musculaire peut être cotée sur une échelle de 0 à 5 (bilan musculaire manuel).",
      "en": "True or false: muscle strength can be graded on a 0-to-5 scale (manual muscle testing).",
      "type": "tf",
      "isTrue": true,
      "explFr": "Le bilan musculaire manuel cote la force de 0 (aucune contraction) à 5 (normale, contre résistance maximale).",
      "explEn": "Manual muscle testing grades strength from 0 (no contraction) to 5 (normal, against maximal resistance)."
     },
     {
      "fr": "L'amplitude de mouvement produite par le patient lui-même (par sa propre contraction) est dite...",
      "en": "The range of motion produced by the patient (through their own contraction) is called...",
      "choices": [
       { "fr": "Active", "en": "Active", "correct": true },
       { "fr": "Passive", "en": "Passive" },
       { "fr": "Résistée maximale", "en": "Maximal resisted" },
       { "fr": "Nulle", "en": "Null" }
      ],
      "explFr": "L'amplitude active dépend du patient (muscles, volonté, douleur) ; l'amplitude passive est produite par le thérapeute.",
      "explEn": "Active range depends on the patient (muscles, will, pain); passive range is produced by the therapist."
     },
     {
      "fr": "L'amplitude de mouvement obtenue par le thérapeute, sans effort du patient, est dite...",
      "en": "The range of motion obtained by the therapist, without patient effort, is called...",
      "choices": [
       { "fr": "Passive", "en": "Passive", "correct": true },
       { "fr": "Active", "en": "Active" },
       { "fr": "Volontaire", "en": "Voluntary" },
       { "fr": "Isométrique", "en": "Isometric" }
      ],
      "explFr": "Comparer amplitude active et passive aide à situer le problème (muscle/commande vs articulation/tissus).",
      "explEn": "Comparing active and passive range helps localize the problem (muscle/command vs joint/tissue)."
     },
     {
      "fr": "Vrai ou faux : l'évaluation de la douleur inclut sa localisation, son intensité, son type et les facteurs qui l'aggravent ou la soulagent.",
      "en": "True or false: pain assessment includes its location, intensity, type and the factors that worsen or relieve it.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Un portrait complet de la douleur (localisation, intensité, qualité, facteurs modulateurs) oriente l'évaluation et le suivi.",
      "explEn": "A complete pain picture (location, intensity, quality, modulating factors) guides assessment and follow-up."
     },
     {
      "fr": "Avec quel instrument mesure-t-on la circonférence d'un membre (pour suivre un œdème)?",
      "en": "Which instrument measures a limb's circumference (to track edema)?",
      "choices": [
       { "fr": "Le mètre-ruban", "en": "The tape measure", "correct": true },
       { "fr": "Le goniomètre", "en": "The goniometer" },
       { "fr": "Le stéthoscope", "en": "The stethoscope" },
       { "fr": "Le thermomètre", "en": "The thermometer" }
      ],
      "explFr": "Le mètre-ruban mesure la circonférence à des repères fixes pour suivre l'œdème ou l'atrophie dans le temps.",
      "explEn": "The tape measure records circumference at fixed landmarks to track edema or atrophy over time."
     },
     {
      "fr": "Associe chaque instrument à ce qu'il mesure.",
      "en": "Match each instrument to what it measures.",
      "type": "match",
      "pairs": [
       { "term_fr": "Goniomètre", "term_en": "Goniometer", "def_fr": "Amplitude articulaire", "def_en": "Joint range of motion" },
       { "term_fr": "Dynamomètre", "term_en": "Dynamometer", "def_fr": "Force (ex. préhension)", "def_en": "Strength (e.g., grip)" },
       { "term_fr": "Échelle visuelle analogue", "term_en": "Visual analog scale", "def_fr": "Douleur", "def_en": "Pain" },
       { "term_fr": "Mètre-ruban", "term_en": "Tape measure", "def_fr": "Circonférence / œdème", "def_en": "Circumference / edema" }
      ],
      "explFr": "Choisir le bon outil pour la bonne mesure est la base d'un bilan objectif et reproductible.",
      "explEn": "Choosing the right tool for the right measure is the basis of an objective, reproducible assessment."
     }
    ]
   },
   {
    "level": 2,
    "questions": [
     {
      "fr": "Une cotation musculaire de 3/5 signifie que le patient réalise un mouvement...",
      "en": "A muscle grade of 3/5 means the patient performs a movement...",
      "choices": [
       { "fr": "Complet contre la gravité, sans résistance ajoutée", "en": "Full against gravity, without added resistance", "correct": true },
       { "fr": "Complet contre une résistance maximale", "en": "Full against maximal resistance" },
       { "fr": "Nul, aucune contraction visible", "en": "None, no visible contraction" },
       { "fr": "Complet seulement si la gravité est éliminée", "en": "Full only with gravity eliminated" }
      ],
      "explFr": "3/5 : amplitude complète contre la gravité, mais aucune résistance manuelle tolérée. 2/5 : complet gravité éliminée.",
      "explEn": "3/5: full range against gravity, but no manual resistance tolerated. 2/5: full range with gravity eliminated."
     },
     {
      "fr": "Comment mesure-t-on objectivement l'œdème d'un membre?",
      "en": "How is limb edema objectively measured?",
      "choices": [
       { "fr": "Par la circonférence (mètre-ruban) ou la volumétrie", "en": "By circumference (tape measure) or volumetry", "correct": true },
       { "fr": "Par la prise de température", "en": "By taking temperature" },
       { "fr": "Par l'auscultation cardiaque", "en": "By heart auscultation" },
       { "fr": "Par le goniomètre", "en": "By goniometer" }
      ],
      "explFr": "L'œdème se quantifie par la mesure de circonférence à des repères fixes ou par volumétrie (déplacement d'eau).",
      "explEn": "Edema is quantified by circumference at fixed landmarks or by volumetry (water displacement)."
     },
     {
      "fr": "Une cotation musculaire de 5/5 signifie que le patient réalise un mouvement...",
      "en": "A muscle grade of 5/5 means the patient performs a movement...",
      "choices": [
       { "fr": "Complet contre une résistance maximale (force normale)", "en": "Full against maximal resistance (normal strength)", "correct": true },
       { "fr": "Seulement si la gravité est éliminée", "en": "Only with gravity eliminated" },
       { "fr": "Avec une simple contraction visible, sans mouvement", "en": "With just a visible contraction, no movement" },
       { "fr": "Impossible à réaliser", "en": "Impossible to perform" }
      ],
      "explFr": "5/5 = amplitude complète contre une résistance manuelle maximale : c'est la cote de force normale.",
      "explEn": "5/5 = full range against maximal manual resistance: the normal strength grade."
     },
     {
      "fr": "Une cotation musculaire de 0/5 correspond à...",
      "en": "A muscle grade of 0/5 corresponds to...",
      "choices": [
       { "fr": "Aucune contraction palpable", "en": "No palpable contraction", "correct": true },
       { "fr": "Un mouvement complet contre gravité", "en": "Full movement against gravity" },
       { "fr": "Une force normale", "en": "Normal strength" },
       { "fr": "Une contraction visible sans mouvement", "en": "A visible contraction without movement" }
      ],
      "explFr": "0/5 : aucune activité musculaire détectable. 1/5 : une contraction est palpable mais sans mouvement du segment.",
      "explEn": "0/5: no detectable muscle activity. 1/5: a contraction is palpable but the segment does not move."
     },
     {
      "fr": "Vrai ou faux : on teste le muscle en position anti-gravité pour distinguer un grade 3 et plus d'un grade 2 et moins.",
      "en": "True or false: the muscle is tested against gravity to distinguish grade 3 and above from grade 2 and below.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Vaincre la gravité sur toute l'amplitude correspond à un grade 3 ; en deçà, on teste en position où la gravité est éliminée.",
      "explEn": "Moving through full range against gravity is grade 3; below that, testing is done with gravity eliminated."
     },
     {
      "fr": "Le dynamomètre de type Jamar sert surtout à mesurer...",
      "en": "A Jamar-type dynamometer is mainly used to measure...",
      "choices": [
       { "fr": "La force de préhension de la main", "en": "Hand grip strength", "correct": true },
       { "fr": "L'amplitude du genou", "en": "Knee range of motion" },
       { "fr": "La fréquence cardiaque", "en": "Heart rate" },
       { "fr": "La température corporelle", "en": "Body temperature" }
      ],
      "explFr": "Le dynamomètre à main quantifie la force de préhension, utile pour suivre l'évolution d'une atteinte du membre supérieur.",
      "explEn": "The hand dynamometer quantifies grip strength, useful to track an upper-limb condition over time."
     },
     {
      "fr": "Associe chaque cotation du bilan musculaire manuel à sa signification.",
      "en": "Match each manual muscle test grade to its meaning.",
      "type": "match",
      "pairs": [
       { "term_fr": "5/5", "term_en": "5/5", "def_fr": "Complet contre résistance maximale", "def_en": "Full against maximal resistance" },
       { "term_fr": "3/5", "term_en": "3/5", "def_fr": "Complet contre gravité, sans résistance", "def_en": "Full against gravity, no resistance" },
       { "term_fr": "2/5", "term_en": "2/5", "def_fr": "Complet gravité éliminée", "def_en": "Full with gravity eliminated" },
       { "term_fr": "0/5", "term_en": "0/5", "def_fr": "Aucune contraction", "def_en": "No contraction" }
      ],
      "explFr": "Maîtriser l'échelle 0 à 5 est essentiel pour coter la fonction musculaire de façon reproductible.",
      "explEn": "Mastering the 0-to-5 scale is essential to grade muscle function reproducibly."
     }
    ]
   },
   {
    "level": 3,
    "questions": [
     {
      "fr": "L'échelle visuelle analogue (EVA) sert à évaluer...",
      "en": "The visual analog scale (VAS) is used to assess...",
      "choices": [
       { "fr": "La douleur", "en": "Pain", "correct": true },
       { "fr": "La tension artérielle", "en": "Blood pressure" },
       { "fr": "La force de préhension", "en": "Grip strength" },
       { "fr": "L'amplitude articulaire", "en": "Range of motion" }
      ],
      "explFr": "L'EVA (0 à 10) quantifie l'intensité subjective de la douleur ; utile pour suivre l'évolution en traitement.",
      "explEn": "The VAS (0 to 10) quantifies subjective pain intensity; useful to track progress in treatment."
     },
     {
      "fr": "Vrai ou faux : l'examen de la circulation périphérique inclut la palpation des pouls.",
      "en": "True or false: assessing peripheral circulation includes palpating pulses.",
      "type": "tf",
      "isTrue": true,
      "explFr": "La palpation des pouls (ex. pédieux, tibial postérieur) et l'observation de la coloration/température évaluent la circulation.",
      "explEn": "Palpating pulses (e.g., dorsalis pedis, posterior tibial) and observing color/temperature assess circulation."
     },
     {
      "fr": "Où palpe-t-on le pouls pédieux (artère dorsale du pied)?",
      "en": "Where is the dorsalis pedis pulse palpated?",
      "choices": [
       { "fr": "Sur le dessus (dos) du pied", "en": "On the top (dorsum) of the foot", "correct": true },
       { "fr": "Au creux du genou", "en": "Behind the knee" },
       { "fr": "Au poignet", "en": "At the wrist" },
       { "fr": "Sous la clavicule", "en": "Under the collarbone" }
      ],
      "explFr": "Le pouls pédieux se palpe sur le dos du pied ; sa présence renseigne sur la circulation artérielle du membre inférieur.",
      "explEn": "The dorsalis pedis pulse is palpated on the dorsum of the foot; its presence reflects lower-limb arterial circulation."
     },
     {
      "fr": "Le test de remplissage capillaire (recoloration de l'ongle après pression) évalue surtout...",
      "en": "The capillary refill test (nail color returning after pressure) mainly assesses...",
      "choices": [
       { "fr": "La perfusion (circulation) périphérique", "en": "Peripheral perfusion (circulation)", "correct": true },
       { "fr": "La force musculaire", "en": "Muscle strength" },
       { "fr": "L'amplitude articulaire", "en": "Joint range of motion" },
       { "fr": "L'acuité auditive", "en": "Hearing acuity" }
      ],
      "explFr": "Un remplissage capillaire lent peut évoquer une perfusion périphérique diminuée ; à interpréter avec les autres signes. À valider.",
      "explEn": "Slow capillary refill can suggest reduced peripheral perfusion; interpret with the other signs. To be validated."
     },
     {
      "fr": "Vrai ou faux : une mesure fiable donne des résultats constants lorsqu'elle est répétée, tandis qu'une mesure valide évalue réellement ce qu'elle prétend mesurer.",
      "en": "True or false: a reliable measure gives consistent results when repeated, while a valid measure truly assesses what it claims to.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Fiabilité = constance/reproductibilité ; validité = justesse. Un bon outil clinique doit idéalement être les deux.",
      "explEn": "Reliability = consistency/reproducibility; validity = accuracy. A good clinical tool should ideally be both."
     },
     {
      "fr": "L'évaluation fonctionnelle (se lever d'une chaise, marcher, monter un escalier) vise surtout à...",
      "en": "Functional assessment (rising from a chair, walking, climbing stairs) mainly aims to...",
      "choices": [
       { "fr": "Mesurer l'autonomie et les incapacités dans les activités", "en": "Measure independence and difficulties in activities", "correct": true },
       { "fr": "Déterminer le groupe sanguin", "en": "Determine the blood type" },
       { "fr": "Mesurer uniquement la taille", "en": "Measure height only" },
       { "fr": "Évaluer la vision", "en": "Assess vision" }
      ],
      "explFr": "L'évaluation fonctionnelle relie les déficits (force, amplitude...) aux activités réelles et à l'autonomie du patient.",
      "explEn": "Functional assessment links impairments (strength, range...) to the patient's real activities and independence."
     },
     {
      "fr": "Associe chaque signe ou mesure au domaine évalué.",
      "en": "Match each sign or measure to the domain it assesses.",
      "type": "match",
      "pairs": [
       { "term_fr": "Pouls périphérique", "term_en": "Peripheral pulse", "def_fr": "Circulation", "def_en": "Circulation" },
       { "term_fr": "Amplitude articulaire", "term_en": "Joint range", "def_fr": "Mobilité articulaire", "def_en": "Joint mobility" },
       { "term_fr": "Cotation 0 à 5", "term_en": "0-to-5 grade", "def_fr": "Fonction musculaire", "def_en": "Muscle function" },
       { "term_fr": "Échelle visuelle analogue", "term_en": "Visual analog scale", "def_fr": "Douleur", "def_en": "Pain" }
      ],
      "explFr": "Relier chaque mesure à son domaine structure le bilan : douleur, circulation, mobilité, fonction musculaire, autonomie.",
      "explEn": "Linking each measure to its domain structures the assessment: pain, circulation, mobility, muscle function, independence."
     }
    ]
   }
  ]
 },
 {
  "id": "modalites",
  "order": 6,
  "title_fr": "Modalités de traitement",
  "title_en": "Treatment modalities",
  "icon": "⚡",
  "tiers": [
   {
    "level": 1,
    "questions": [
     {
      "fr": "En phase aiguë, l'application de glace (cryothérapie) vise surtout à...",
      "en": "In the acute phase, applying ice (cryotherapy) mainly aims to...",
      "choices": [
       { "fr": "Diminuer la douleur et l'inflammation", "en": "Reduce pain and inflammation", "correct": true },
       { "fr": "Augmenter la température des tissus", "en": "Increase tissue temperature" },
       { "fr": "Accélérer la fréquence cardiaque", "en": "Speed up heart rate" },
       { "fr": "Renforcer un muscle", "en": "Strengthen a muscle" }
      ],
      "explFr": "Le froid provoque une vasoconstriction et un effet antalgique, utile en phase aiguë (blessure récente).",
      "explEn": "Cold causes vasoconstriction and an analgesic effect, useful in the acute phase (recent injury)."
     },
     {
      "fr": "Vrai ou faux : la chaleur (thermothérapie) favorise la vasodilatation et la détente musculaire.",
      "en": "True or false: heat (thermotherapy) promotes vasodilation and muscle relaxation.",
      "type": "tf",
      "isTrue": true,
      "explFr": "La chaleur augmente la circulation locale et détend les tissus ; on l'évite toutefois en phase inflammatoire aiguë.",
      "explEn": "Heat increases local circulation and relaxes tissues; it is avoided during the acute inflammatory phase."
     },
     {
      "fr": "Le froid appliqué sur les tissus provoque surtout...",
      "en": "Cold applied to tissues mainly causes...",
      "choices": [
       { "fr": "Une vasoconstriction (rétrécissement des vaisseaux)", "en": "Vasoconstriction (narrowing of vessels)", "correct": true },
       { "fr": "Une vasodilatation", "en": "Vasodilation" },
       { "fr": "Une hausse de la fréquence cardiaque", "en": "A rise in heart rate" },
       { "fr": "Une augmentation de la douleur", "en": "An increase in pain" }
      ],
      "explFr": "Le froid resserre les vaisseaux (vasoconstriction) et a un effet antalgique, d'où son intérêt en phase aiguë.",
      "explEn": "Cold narrows vessels (vasoconstriction) and has an analgesic effect, hence its value in the acute phase."
     },
     {
      "fr": "La chaleur appliquée sur les tissus provoque surtout...",
      "en": "Heat applied to tissues mainly causes...",
      "choices": [
       { "fr": "Une vasodilatation (élargissement des vaisseaux)", "en": "Vasodilation (widening of vessels)", "correct": true },
       { "fr": "Une vasoconstriction", "en": "Vasoconstriction" },
       { "fr": "Une baisse de la circulation locale", "en": "A drop in local circulation" },
       { "fr": "Une contraction réflexe", "en": "A reflex contraction" }
      ],
      "explFr": "La chaleur dilate les vaisseaux, augmente la circulation locale et détend les tissus ; on l'évite en phase inflammatoire aiguë.",
      "explEn": "Heat dilates vessels, increases local circulation and relaxes tissues; it is avoided in the acute inflammatory phase."
     },
     {
      "fr": "Vrai ou faux : on évite d'appliquer la glace directement sur la peau nue de façon prolongée, pour prévenir une brûlure par le froid (gelure).",
      "en": "True or false: ice should not be applied directly to bare skin for a long time, to prevent a cold burn (frostbite).",
      "type": "tf",
      "isTrue": true,
      "explFr": "On interpose une barrière (linge humide) et on limite la durée pour éviter une lésion cutanée par le froid.",
      "explEn": "A barrier (damp cloth) is used and duration is limited to avoid a cold-induced skin injury."
     },
     {
      "fr": "En physiothérapie, une « modalité » (ou agent physique) désigne...",
      "en": "In physiotherapy, a 'modality' (physical agent) refers to...",
      "choices": [
       { "fr": "Un agent physique thérapeutique : chaud, froid, courant électrique, ultrasons, etc.", "en": "A therapeutic physical agent: heat, cold, electrical current, ultrasound, etc.", "correct": true },
       { "fr": "Un type de médicament injectable", "en": "A type of injectable drug" },
       { "fr": "Un diagnostic médical", "en": "A medical diagnosis" },
       { "fr": "Une chirurgie", "en": "A surgery" }
      ],
      "explFr": "Les modalités (agents physiques) s'ajoutent à l'exercice et à la thérapie manuelle pour agir sur la douleur, l'inflammation ou la souplesse.",
      "explEn": "Modalities (physical agents) complement exercise and manual therapy to act on pain, inflammation or flexibility."
     },
     {
      "fr": "Associe chaque modalité à son effet principal.",
      "en": "Match each modality to its main effect.",
      "type": "match",
      "pairs": [
       { "term_fr": "Cryothérapie (froid)", "term_en": "Cryotherapy (cold)", "def_fr": "Antidouleur et anti-inflammatoire", "def_en": "Analgesic and anti-inflammatory" },
       { "term_fr": "Thermothérapie (chaleur)", "term_en": "Thermotherapy (heat)", "def_fr": "Vasodilatation et détente", "def_en": "Vasodilation and relaxation" },
       { "term_fr": "TENS", "term_en": "TENS", "def_fr": "Soulagement de la douleur", "def_en": "Pain relief" },
       { "term_fr": "Ultrasons", "term_en": "Ultrasound", "def_fr": "Chaleur profonde des tissus", "def_en": "Deep tissue heating" }
      ],
      "explFr": "Chaque modalité a des effets et des indications propres ; le choix dépend de l'objectif clinique. À valider.",
      "explEn": "Each modality has its own effects and indications; the choice depends on the clinical goal. To be validated."
     }
    ]
   },
   {
    "level": 2,
    "questions": [
     {
      "fr": "Le TENS est une forme de...",
      "en": "TENS is a form of...",
      "choices": [
       { "fr": "Électrothérapie pour le soulagement de la douleur", "en": "Electrotherapy for pain relief", "correct": true },
       { "fr": "Thérapie manuelle", "en": "Manual therapy" },
       { "fr": "Cryothérapie", "en": "Cryotherapy" },
       { "fr": "Hydrothérapie", "en": "Hydrotherapy" }
      ],
      "explFr": "Le TENS (neurostimulation électrique transcutanée) module la douleur par un courant électrique de faible intensité. À valider.",
      "explEn": "TENS (transcutaneous electrical nerve stimulation) modulates pain with a low-intensity electrical current. To be validated."
     },
     {
      "fr": "Les ultrasons thérapeutiques produisent principalement un effet...",
      "en": "Therapeutic ultrasound mainly produces an effect that is...",
      "choices": [
       { "fr": "Thermique profond (et mécanique) sur les tissus", "en": "Deep thermal (and mechanical) on tissues", "correct": true },
       { "fr": "Uniquement visuel", "en": "Only visual" },
       { "fr": "Uniquement psychologique", "en": "Only psychological" },
       { "fr": "De refroidissement des tissus", "en": "Cooling of tissues" }
      ],
      "explFr": "Les ultrasons génèrent chaleur profonde et micro-vibrations tissulaires ; indications et réglages sont à préciser. À valider.",
      "explEn": "Ultrasound generates deep heat and tissue micro-vibrations; indications and settings need to be specified. To be validated."
     },
     {
      "fr": "L'électrostimulation neuromusculaire (NMES) sert surtout à...",
      "en": "Neuromuscular electrical stimulation (NMES) is mainly used to...",
      "choices": [
       { "fr": "Provoquer ou renforcer une contraction musculaire", "en": "Elicit or strengthen a muscle contraction", "correct": true },
       { "fr": "Refroidir un tendon", "en": "Cool a tendon" },
       { "fr": "Mesurer la douleur", "en": "Measure pain" },
       { "fr": "Remplacer l'évaluation", "en": "Replace assessment" }
      ],
      "explFr": "La NMES déclenche une contraction par un courant électrique ; utile, par exemple, contre l'inhibition musculaire après une chirurgie. À valider.",
      "explEn": "NMES triggers a contraction with an electrical current; useful, for example, against muscle inhibition after surgery. To be validated."
     },
     {
      "fr": "Vrai ou faux : la théorie du portillon (« gate control ») aide à expliquer l'effet analgésique du TENS.",
      "en": "True or false: the gate control theory helps explain the analgesic effect of TENS.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Selon la théorie du portillon, stimuler des fibres non douloureuses peut « fermer la porte » aux signaux de douleur au niveau médullaire. À valider.",
      "explEn": "According to gate control theory, stimulating non-painful fibers can 'close the gate' to pain signals at the spinal level. To be validated."
     },
     {
      "fr": "En hydrothérapie, l'exercice en piscine profite surtout de...",
      "en": "In hydrotherapy, pool exercise mainly benefits from...",
      "choices": [
       { "fr": "La poussée d'Archimède, qui réduit la mise en charge sur les articulations", "en": "Buoyancy, which reduces joint loading", "correct": true },
       { "fr": "L'absence totale de résistance", "en": "A total absence of resistance" },
       { "fr": "Un refroidissement rapide du corps", "en": "Rapid cooling of the body" },
       { "fr": "Une immobilisation forcée", "en": "Forced immobilization" }
      ],
      "explFr": "La flottabilité allège le poids du corps, ce qui facilite le mouvement précoce ; l'eau offre aussi une résistance graduable.",
      "explEn": "Buoyancy offloads body weight, easing early movement; water also provides adjustable resistance."
     },
     {
      "fr": "La traction (mécanique ou manuelle) de la colonne vise notamment à...",
      "en": "Spinal traction (mechanical or manual) mainly aims to...",
      "choices": [
       { "fr": "Décomprimer ou étirer des structures vertébrales", "en": "Decompress or stretch spinal structures", "correct": true },
       { "fr": "Réchauffer la peau", "en": "Warm the skin" },
       { "fr": "Mesurer la force", "en": "Measure strength" },
       { "fr": "Provoquer une contraction", "en": "Trigger a contraction" }
      ],
      "explFr": "La traction applique une force d'éloignement pour réduire la pression sur des structures vertébrales ; indications et paramètres à préciser. À valider.",
      "explEn": "Traction applies a pulling force to reduce pressure on spinal structures; indications and settings to be specified. To be validated."
     },
     {
      "fr": "Associe chaque modalité à sa grande catégorie.",
      "en": "Match each modality to its broad category.",
      "type": "match",
      "pairs": [
       { "term_fr": "TENS", "term_en": "TENS", "def_fr": "Électrothérapie", "def_en": "Electrotherapy" },
       { "term_fr": "Application de glace", "term_en": "Ice application", "def_fr": "Cryothérapie (froid)", "def_en": "Cryotherapy (cold)" },
       { "term_fr": "Ultrasons", "term_en": "Ultrasound", "def_fr": "Ondes mécaniques", "def_en": "Mechanical waves" },
       { "term_fr": "Exercice en piscine", "term_en": "Pool exercise", "def_fr": "Hydrothérapie", "def_en": "Hydrotherapy" }
      ],
      "explFr": "Classer les modalités par catégorie aide à comprendre leur mode d'action et leurs précautions. À valider.",
      "explEn": "Grouping modalities by category helps understand their mechanism and precautions. To be validated."
     }
    ]
   },
   {
    "level": 3,
    "questions": [
     {
      "fr": "Dans les 24-48 h après une blessure aiguë, le protocole repos-glace-compression-élévation est connu sous...",
      "en": "In the first 24-48 h after an acute injury, the rest-ice-compression-elevation protocol is known as...",
      "choices": [
       { "fr": "RICE (ou GREC en français)", "en": "RICE", "correct": true },
       { "fr": "ABCDE", "en": "ABCDE" },
       { "fr": "FITT", "en": "FITT" },
       { "fr": "SOAP", "en": "SOAP" }
      ],
      "explFr": "RICE (Rest, Ice, Compression, Elevation) — en français GREC (Glace, Repos, Élévation, Compression). Les recommandations récentes évoluent ; à valider.",
      "explEn": "RICE (Rest, Ice, Compression, Elevation). Recent recommendations are evolving; to be validated."
     },
     {
      "fr": "Vrai ou faux : le choix d'une modalité doit tenir compte des contre-indications (ex. troubles de la sensibilité).",
      "en": "True or false: choosing a modality must consider contraindications (e.g., sensory deficits).",
      "type": "tf",
      "isTrue": true,
      "explFr": "Une sensibilité altérée, des troubles circulatoires ou cutanés peuvent contre-indiquer chaleur, froid ou électrothérapie.",
      "explEn": "Impaired sensation, circulatory or skin problems can contraindicate heat, cold or electrotherapy."
     },
     {
      "fr": "Dans quelle situation la chaleur est-elle généralement à éviter (contre-indiquée)?",
      "en": "In which situation is heat generally to be avoided (contraindicated)?",
      "choices": [
       { "fr": "Sur une inflammation aiguë récente ou une zone à sensibilité altérée", "en": "On a recent acute inflammation or an area with impaired sensation", "correct": true },
       { "fr": "Sur un muscle raide en phase chronique", "en": "On a stiff muscle in the chronic phase" },
       { "fr": "Avant un étirement doux", "en": "Before a gentle stretch" },
       { "fr": "Pour détendre un patient anxieux sans lésion", "en": "To relax an anxious patient with no injury" }
      ],
      "explFr": "La chaleur peut aggraver une inflammation aiguë et brûler une peau à sensibilité diminuée ; on l'évite alors. À valider.",
      "explEn": "Heat can worsen acute inflammation and burn skin with reduced sensation; it is avoided in those cases. To be validated."
     },
     {
      "fr": "Vrai ou faux : l'électrothérapie exige une grande prudence (souvent contre-indiquée) à proximité d'un stimulateur cardiaque (pacemaker).",
      "en": "True or false: electrotherapy requires great caution (often contraindicated) near a cardiac pacemaker.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Un courant électrique près d'un pacemaker peut interférer avec son fonctionnement ; on évite cette application. À valider.",
      "explEn": "An electrical current near a pacemaker may interfere with its function; this application is avoided. To be validated."
     },
     {
      "fr": "Sur quelle région évite-t-on généralement d'appliquer des ultrasons thérapeutiques?",
      "en": "Over which area should therapeutic ultrasound generally be avoided?",
      "choices": [
       { "fr": "Sur une zone de croissance osseuse active, une tumeur ou un thrombus", "en": "Over an active bone growth plate, a tumor or a thrombus", "correct": true },
       { "fr": "Sur un gros muscle sain", "en": "Over a large healthy muscle" },
       { "fr": "Sur une articulation raide chronique", "en": "Over a chronically stiff joint" },
       { "fr": "Sur une cicatrice ancienne et stable", "en": "Over an old, stable scar" }
      ],
      "explFr": "Les ultrasons sont à éviter, entre autres, sur les plaques de croissance actives, les tumeurs et les zones de thrombose. À valider.",
      "explEn": "Ultrasound is avoided over, among others, active growth plates, tumors and areas of thrombosis. To be validated."
     },
     {
      "fr": "Vrai ou faux : une modalité (chaud, froid, TENS...) ne remplace pas l'exercice thérapeutique ; elle le complète.",
      "en": "True or false: a modality (heat, cold, TENS...) does not replace therapeutic exercise; it complements it.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Les modalités préparent ou soutiennent le traitement (ex. réduire la douleur avant l'exercice), mais l'exercice actif demeure central.",
      "explEn": "Modalities prepare or support treatment (e.g., reducing pain before exercise), but active exercise remains central."
     },
     {
      "fr": "Associe chaque contre-indication à la modalité concernée.",
      "en": "Match each contraindication to the relevant modality.",
      "type": "match",
      "pairs": [
       { "term_fr": "Sensibilité altérée", "term_en": "Impaired sensation", "def_fr": "Chaud / froid", "def_en": "Heat / cold" },
       { "term_fr": "Stimulateur cardiaque", "term_en": "Cardiac pacemaker", "def_fr": "Électrothérapie", "def_en": "Electrotherapy" },
       { "term_fr": "Thrombose (caillot)", "term_en": "Thrombosis (clot)", "def_fr": "Ultrasons / chaleur", "def_en": "Ultrasound / heat" }
      ],
      "explFr": "Vérifier les contre-indications avant toute modalité est une exigence de sécurité. À valider.",
      "explEn": "Checking contraindications before any modality is a safety requirement. To be validated."
     }
    ]
   }
  ]
 },
 {
  "id": "demarche",
  "order": 7,
  "title_fr": "Démarche clinique & interventions",
  "title_en": "Clinical reasoning & interventions",
  "icon": "🧭",
  "tiers": [
   {
    "level": 1,
    "questions": [
     {
      "fr": "Quelle est la première étape de la démarche clinique en physiothérapie?",
      "en": "What is the first step of the clinical process in physiotherapy?",
      "choices": [
       { "fr": "L'évaluation (anamnèse et collecte de données)", "en": "Assessment (history and data collection)", "correct": true },
       { "fr": "Le congé du patient", "en": "Discharging the patient" },
       { "fr": "La facturation", "en": "Billing" },
       { "fr": "La rédaction d'un article", "en": "Writing an article" }
      ],
      "explFr": "La démarche débute par l'évaluation (anamnèse, examen), qui oriente les hypothèses, les objectifs et le plan de traitement.",
      "explEn": "The process begins with assessment (history, examination), which guides hypotheses, goals and the treatment plan."
     },
     {
      "fr": "Vrai ou faux : les objectifs de traitement devraient être mesurables.",
      "en": "True or false: treatment goals should be measurable.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Des objectifs mesurables (ex. amplitude, distance de marche) permettent d'évaluer les progrès et d'ajuster le plan.",
      "explEn": "Measurable goals (e.g., range of motion, walking distance) allow progress to be tracked and the plan adjusted."
     },
     {
      "fr": "À quoi sert l'anamnèse (histoire du patient) au début de l'évaluation?",
      "en": "What is the purpose of the history-taking (anamnesis) at the start of the assessment?",
      "choices": [
       { "fr": "Recueillir le motif, les antécédents et l'histoire de la condition", "en": "Gather the reason for consult, history and the story of the condition", "correct": true },
       { "fr": "Facturer la séance", "en": "Bill the session" },
       { "fr": "Donner immédiatement le congé", "en": "Discharge immediately" },
       { "fr": "Choisir la couleur du dossier", "en": "Choose the file color" }
      ],
      "explFr": "L'anamnèse oriente les hypothèses et cible l'examen physique ; c'est souvent l'étape la plus riche en indices.",
      "explEn": "History-taking guides the hypotheses and focuses the physical exam; it is often the richest source of clues."
     },
     {
      "fr": "Après avoir recueilli et analysé les données d'évaluation, le thérapeute formule...",
      "en": "After collecting and analyzing the assessment data, the therapist formulates...",
      "choices": [
       { "fr": "Des hypothèses, des objectifs et un plan de traitement", "en": "Hypotheses, goals and a treatment plan", "correct": true },
       { "fr": "Uniquement une facture", "en": "Only an invoice" },
       { "fr": "Un diagnostic médical de maladie", "en": "A medical disease diagnosis" },
       { "fr": "Une ordonnance de médicaments", "en": "A drug prescription" }
      ],
      "explFr": "L'analyse des données mène à des hypothèses, à des objectifs mesurables et à un plan d'intervention personnalisé.",
      "explEn": "Analyzing the data leads to hypotheses, measurable goals and a tailored intervention plan."
     },
     {
      "fr": "Vrai ou faux : la démarche clinique est un cycle continu : évaluer, planifier, intervenir, puis réévaluer.",
      "en": "True or false: the clinical process is a continuous cycle: assess, plan, intervene, then re-assess.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Ce cycle permet d'ajuster constamment le plan selon les progrès et la réponse du patient.",
      "explEn": "This cycle allows the plan to be continuously adjusted based on the patient's progress and response."
     },
     {
      "fr": "Le « motif de consultation » correspond à...",
      "en": "The 'reason for consultation' refers to...",
      "choices": [
       { "fr": "La raison principale pour laquelle le patient consulte", "en": "The main reason the patient seeks care", "correct": true },
       { "fr": "L'adresse du patient", "en": "The patient's address" },
       { "fr": "Le nom du médecin de famille", "en": "The name of the family doctor" },
       { "fr": "Le coût de la séance", "en": "The cost of the session" }
      ],
      "explFr": "Cerner le motif de consultation aide à prioriser les objectifs selon ce qui compte le plus pour le patient.",
      "explEn": "Clarifying the reason for consultation helps prioritize goals based on what matters most to the patient."
     },
     {
      "fr": "Associe chaque étape de la démarche clinique à sa description.",
      "en": "Match each step of the clinical process to its description.",
      "type": "match",
      "pairs": [
       { "term_fr": "Évaluation", "term_en": "Assessment", "def_fr": "Collecte et analyse des données", "def_en": "Collecting and analyzing data" },
       { "term_fr": "Planification", "term_en": "Planning", "def_fr": "Objectifs et plan de traitement", "def_en": "Goals and treatment plan" },
       { "term_fr": "Intervention", "term_en": "Intervention", "def_fr": "Application du traitement", "def_en": "Delivering the treatment" },
       { "term_fr": "Réévaluation", "term_en": "Re-assessment", "def_fr": "Ajustement selon les progrès", "def_en": "Adjusting based on progress" }
      ],
      "explFr": "Situer chaque étape dans le cycle clinique structure le raisonnement et la prise de décision.",
      "explEn": "Placing each step within the clinical cycle structures reasoning and decision-making."
     }
    ]
   },
   {
    "level": 2,
    "questions": [
     {
      "fr": "Après une immobilisation prolongée (ortho), une priorité fréquente de réadaptation est...",
      "en": "After prolonged immobilization (ortho), a common rehab priority is...",
      "choices": [
       { "fr": "Récupérer l'amplitude articulaire et la force", "en": "Restoring range of motion and strength", "correct": true },
       { "fr": "Immobiliser davantage", "en": "Immobilizing further" },
       { "fr": "Éviter tout mouvement à long terme", "en": "Avoiding all movement long-term" },
       { "fr": "Interrompre toute évaluation", "en": "Stopping all assessment" }
      ],
      "explFr": "L'immobilisation entraîne raideur et faiblesse ; on vise progressivement le retour de l'amplitude, de la force et de la fonction.",
      "explEn": "Immobilization causes stiffness and weakness; rehab progressively targets range, strength and function."
     },
     {
      "fr": "En réadaptation neurologique, une visée fréquente est...",
      "en": "In neurological rehabilitation, a common goal is...",
      "choices": [
       { "fr": "Améliorer le contrôle moteur, l'équilibre et les transferts", "en": "Improving motor control, balance and transfers", "correct": true },
       { "fr": "Augmenter uniquement la masse musculaire", "en": "Only increasing muscle mass" },
       { "fr": "Supprimer la proprioception", "en": "Removing proprioception" },
       { "fr": "Éviter la marche définitivement", "en": "Avoiding walking permanently" }
      ],
      "explFr": "La réadaptation neuro cible le contrôle moteur, l'équilibre, les transferts et l'autonomie fonctionnelle. À valider.",
      "explEn": "Neuro rehab targets motor control, balance, transfers and functional independence. To be validated."
     },
     {
      "fr": "Après une entorse de cheville, une intervention fréquente en réadaptation est...",
      "en": "After an ankle sprain, a common rehabilitation intervention is...",
      "choices": [
       { "fr": "La rééducation proprioceptive et le renforcement progressif", "en": "Proprioceptive retraining and progressive strengthening", "correct": true },
       { "fr": "L'immobilisation complète et permanente", "en": "Complete, permanent immobilization" },
       { "fr": "L'arrêt de toute activité à long terme", "en": "Stopping all activity long-term" },
       { "fr": "L'application de chaleur en phase aiguë immédiate", "en": "Applying heat in the immediate acute phase" }
      ],
      "explFr": "La rééducation proprioceptive (équilibre) et le renforcement progressif aident à restaurer la stabilité et à prévenir les récidives. À valider.",
      "explEn": "Proprioceptive (balance) retraining and progressive strengthening help restore stability and prevent recurrences. To be validated."
     },
     {
      "fr": "En réadaptation cardiorespiratoire, un objectif fréquent est...",
      "en": "In cardiorespiratory rehabilitation, a common goal is...",
      "choices": [
       { "fr": "Améliorer la tolérance à l'effort et faciliter le dégagement des sécrétions", "en": "Improve exercise tolerance and aid airway clearance", "correct": true },
       { "fr": "Augmenter uniquement la force de préhension", "en": "Only increase grip strength" },
       { "fr": "Éviter tout exercice respiratoire", "en": "Avoid all breathing exercises" },
       { "fr": "Réduire volontairement la ventilation", "en": "Deliberately reduce ventilation" }
      ],
      "explFr": "On vise l'endurance à l'effort, une respiration plus efficace et le dégagement des sécrétions selon la condition. À valider.",
      "explEn": "The aim is exercise endurance, more efficient breathing and airway clearance depending on the condition. To be validated."
     },
     {
      "fr": "Vrai ou faux : des objectifs « SMART » sont spécifiques, mesurables, atteignables, réalistes et temporellement définis.",
      "en": "True or false: 'SMART' goals are specific, measurable, achievable, realistic and time-bound.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Formuler des objectifs SMART rend le plan concret et facilite l'évaluation des progrès.",
      "explEn": "Framing SMART goals makes the plan concrete and makes progress easier to evaluate."
     },
     {
      "fr": "L'exercice thérapeutique peut viser plusieurs qualités, notamment...",
      "en": "Therapeutic exercise can target several qualities, including...",
      "choices": [
       { "fr": "La mobilité, la force, l'endurance, l'équilibre et la coordination", "en": "Mobility, strength, endurance, balance and coordination", "correct": true },
       { "fr": "Uniquement la souplesse des doigts", "en": "Only finger flexibility" },
       { "fr": "Uniquement la fréquence cardiaque au repos", "en": "Only resting heart rate" },
       { "fr": "Rien de mesurable", "en": "Nothing measurable" }
      ],
      "explFr": "Le choix des exercices dépend des objectifs : gagner en amplitude, en force, en endurance, en équilibre ou en coordination.",
      "explEn": "Exercise choice depends on the goals: gaining range, strength, endurance, balance or coordination."
     },
     {
      "fr": "Associe chaque clientèle à une intervention typique.",
      "en": "Match each population to a typical intervention.",
      "type": "match",
      "pairs": [
       { "term_fr": "Post-opération du genou", "term_en": "Post knee surgery", "def_fr": "Récupérer amplitude et force", "def_en": "Restore range and strength" },
       { "term_fr": "AVC", "term_en": "Stroke", "def_fr": "Contrôle moteur et transferts", "def_en": "Motor control and transfers" },
       { "term_fr": "MPOC", "term_en": "COPD", "def_fr": "Réentraînement à l'effort", "def_en": "Exercise reconditioning" },
       { "term_fr": "Personne âgée", "term_en": "Older adult", "def_fr": "Équilibre et prévention des chutes", "def_en": "Balance and fall prevention" }
      ],
      "explFr": "Adapter l'intervention à la clientèle et à ses objectifs est au cœur du raisonnement clinique. À valider.",
      "explEn": "Tailoring the intervention to the population and its goals is central to clinical reasoning. To be validated."
     }
    ]
   },
   {
    "level": 3,
    "questions": [
     {
      "fr": "Comment fait-on progresser un programme d'exercices?",
      "en": "How do you progress an exercise program?",
      "choices": [
       { "fr": "En ajustant charge, répétitions et complexité selon la tolérance", "en": "By adjusting load, repetitions and complexity to tolerance", "correct": true },
       { "fr": "En gardant toujours la même charge", "en": "By always keeping the same load" },
       { "fr": "En augmentant tout au maximum d'emblée", "en": "By maximizing everything at once" },
       { "fr": "En cessant dès la première séance", "en": "By stopping after the first session" }
      ],
      "explFr": "La progression (surcharge graduelle) module intensité, volume et difficulté selon la réponse et la tolérance du patient.",
      "explEn": "Progression (gradual overload) adjusts intensity, volume and difficulty based on the patient's response and tolerance."
     },
     {
      "fr": "Vrai ou faux : la réévaluation permet d'ajuster le plan de traitement selon les progrès.",
      "en": "True or false: re-assessment lets you adjust the treatment plan based on progress.",
      "type": "tf",
      "isTrue": true,
      "explFr": "La réévaluation périodique mesure les progrès et guide la modification (ou l'arrêt) des interventions.",
      "explEn": "Periodic re-assessment measures progress and guides changing (or stopping) interventions."
     },
     {
      "fr": "Le principe de « surcharge progressive » signifie...",
      "en": "The 'progressive overload' principle means...",
      "choices": [
       { "fr": "Augmenter graduellement la demande pour provoquer une adaptation", "en": "Gradually increasing the demand to drive adaptation", "correct": true },
       { "fr": "Garder exactement la même charge indéfiniment", "en": "Keeping exactly the same load indefinitely" },
       { "fr": "Tout maximiser dès la première séance", "en": "Maximizing everything from the first session" },
       { "fr": "Réduire la charge à chaque séance", "en": "Reducing the load every session" }
      ],
      "explFr": "Une demande légèrement supérieure aux capacités actuelles stimule l'adaptation ; on progresse selon la tolérance.",
      "explEn": "A demand slightly above current capacity stimulates adaptation; progression follows tolerance."
     },
     {
      "fr": "Le principe de « spécificité » de l'entraînement signifie que...",
      "en": "The 'specificity' principle of training means that...",
      "choices": [
       { "fr": "L'adaptation est spécifique au type d'exercice et à la tâche entraînée", "en": "Adaptation is specific to the type of exercise and the task trained", "correct": true },
       { "fr": "Tout exercice améliore également toutes les capacités", "en": "Any exercise improves all capacities equally" },
       { "fr": "La force et l'endurance sont identiques", "en": "Strength and endurance are identical" },
       { "fr": "Seule la génétique compte", "en": "Only genetics matter" }
      ],
      "explFr": "Pour améliorer une tâche (ex. monter un escalier), on entraîne des mouvements et des exigences qui s'en rapprochent.",
      "explEn": "To improve a task (e.g., climbing stairs), one trains movements and demands that resemble it."
     },
     {
      "fr": "Vrai ou faux : on cesse ou on adapte une intervention si la douleur ou des signes vitaux anormaux signalent un risque.",
      "en": "True or false: an intervention is stopped or adapted if pain or abnormal vital signs indicate a risk.",
      "type": "tf",
      "isTrue": true,
      "explFr": "La sécurité prime : des signaux d'alarme imposent d'arrêter, de réévaluer et de documenter avant de poursuivre.",
      "explEn": "Safety comes first: warning signs require stopping, re-assessing and documenting before continuing."
     },
     {
      "fr": "Le raisonnement clinique consiste essentiellement à...",
      "en": "Clinical reasoning essentially consists of...",
      "choices": [
       { "fr": "Intégrer les données, les connaissances et le jugement pour décider", "en": "Integrating data, knowledge and judgment to decide", "correct": true },
       { "fr": "Appliquer le même protocole à tous les patients", "en": "Applying the same protocol to every patient" },
       { "fr": "Deviner au hasard", "en": "Guessing at random" },
       { "fr": "Suivre uniquement l'avis du patient", "en": "Following only the patient's opinion" }
      ],
      "explFr": "Le raisonnement clinique relie l'évaluation, les connaissances et l'expérience pour prendre des décisions adaptées à chaque patient.",
      "explEn": "Clinical reasoning connects assessment, knowledge and experience to make decisions tailored to each patient."
     },
     {
      "fr": "Associe chaque principe d'entraînement à sa définition.",
      "en": "Match each training principle to its definition.",
      "type": "match",
      "pairs": [
       { "term_fr": "Surcharge", "term_en": "Overload", "def_fr": "Demande progressivement plus élevée", "def_en": "Progressively higher demand" },
       { "term_fr": "Spécificité", "term_en": "Specificity", "def_fr": "Adaptation propre à la tâche", "def_en": "Task-specific adaptation" },
       { "term_fr": "Réversibilité", "term_en": "Reversibility", "def_fr": "Perte des gains à l'arrêt", "def_en": "Loss of gains when stopping" },
       { "term_fr": "Progression", "term_en": "Progression", "def_fr": "Ajustement graduel de la charge", "def_en": "Gradual adjustment of load" }
      ],
      "explFr": "Ces principes guident la prescription et la progression sécuritaire des exercices thérapeutiques.",
      "explEn": "These principles guide the safe prescription and progression of therapeutic exercises."
     }
    ]
   }
  ]
 },
 {
  "id": "prof",
  "order": 8,
  "title_fr": "Profession, sécurité & communication",
  "title_en": "Profession, safety & communication",
  "icon": "🤝",
  "tiers": [
   {
    "level": 1,
    "questions": [
     {
      "fr": "Au Québec, les physiothérapeutes et les thérapeutes en réadaptation physique (T.R.P.) sont encadrés par...",
      "en": "In Quebec, physiotherapists and physical rehabilitation therapists are regulated by...",
      "choices": [
       { "fr": "L'Ordre professionnel de la physiothérapie du Québec (OPPQ)", "en": "The Ordre professionnel de la physiothérapie du Québec (OPPQ)", "correct": true },
       { "fr": "L'OIIQ (infirmières)", "en": "The OIIQ (nurses)" },
       { "fr": "Aucun ordre professionnel", "en": "No professional order" },
       { "fr": "Le Collège des médecins", "en": "The College of Physicians" }
      ],
      "explFr": "Le diplômé du DEC 144.A0 devient thérapeute en réadaptation physique, membre de l'OPPQ, qui encadre la pratique.",
      "explEn": "A 144.A0 graduate becomes a physical rehabilitation therapist, a member of the OPPQ, which regulates practice."
     },
     {
      "fr": "Vrai ou faux : la confidentialité des renseignements du patient doit être respectée en tout temps.",
      "en": "True or false: patient confidentiality must be respected at all times.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Le secret professionnel protège les renseignements du patient ; sa divulgation obéit à des règles strictes (consentement, exceptions légales).",
      "explEn": "Professional confidentiality protects patient information; disclosure follows strict rules (consent, legal exceptions)."
     },
     {
      "fr": "Pour être valide, le consentement du patient à un traitement doit être...",
      "en": "To be valid, a patient's consent to treatment must be...",
      "choices": [
       { "fr": "Libre et éclairé", "en": "Free and informed", "correct": true },
       { "fr": "Donné par un autre patient", "en": "Given by another patient" },
       { "fr": "Obtenu sans aucune explication", "en": "Obtained without any explanation" },
       { "fr": "Imposé par le thérapeute", "en": "Imposed by the therapist" }
      ],
      "explFr": "Le consentement libre et éclairé suppose que le patient comprend l'intervention, ses buts et ses risques, et qu'il accepte sans contrainte.",
      "explEn": "Free and informed consent means the patient understands the intervention, its aims and risks, and agrees without coercion."
     },
     {
      "fr": "Vrai ou faux : le thérapeute en réadaptation physique (T.R.P.) exerce dans un champ de pratique défini et réfère au besoin à d'autres professionnels.",
      "en": "True or false: the physical rehabilitation therapist works within a defined scope of practice and refers to other professionals when needed.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Reconnaître les limites de son champ de pratique et référer au professionnel approprié fait partie d'une pratique responsable. À valider.",
      "explEn": "Recognizing the limits of one's scope of practice and referring to the appropriate professional is part of responsible practice. To be validated."
     },
     {
      "fr": "L'hygiène des mains en milieu clinique sert surtout à...",
      "en": "Hand hygiene in the clinical setting mainly serves to...",
      "choices": [
       { "fr": "Prévenir la transmission des infections", "en": "Prevent the transmission of infections", "correct": true },
       { "fr": "Accélérer la facturation", "en": "Speed up billing" },
       { "fr": "Mesurer la douleur", "en": "Measure pain" },
       { "fr": "Remplacer le consentement", "en": "Replace consent" }
      ],
      "explFr": "L'hygiène des mains est la mesure la plus simple et la plus efficace pour réduire les infections associées aux soins.",
      "explEn": "Hand hygiene is the simplest and most effective measure to reduce healthcare-associated infections."
     },
     {
      "fr": "Associe chaque terme à sa signification.",
      "en": "Match each term to its meaning.",
      "type": "match",
      "pairs": [
       { "term_fr": "OPPQ", "term_en": "OPPQ", "def_fr": "Ordre professionnel de la physiothérapie du Québec", "def_en": "Quebec order of physiotherapy" },
       { "term_fr": "T.R.P.", "term_en": "PRT", "def_fr": "Thérapeute en réadaptation physique", "def_en": "Physical rehabilitation therapist" },
       { "term_fr": "Consentement", "term_en": "Consent", "def_fr": "Accord libre et éclairé", "def_en": "Free and informed agreement" },
       { "term_fr": "Secret professionnel", "term_en": "Professional secrecy", "def_fr": "Confidentialité des renseignements", "def_en": "Confidentiality of information" }
      ],
      "explFr": "Connaître ce vocabulaire professionnel situe le rôle du T.R.P. et ses obligations envers le patient et l'ordre.",
      "explEn": "Knowing this professional vocabulary frames the PRT's role and duties toward the patient and the order."
     }
    ]
   },
   {
    "level": 2,
    "questions": [
     {
      "fr": "Avant un transfert de patient (lit ↔ fauteuil), la priorité est de...",
      "en": "Before a patient transfer (bed ↔ chair), the priority is to...",
      "choices": [
       { "fr": "Assurer la sécurité : freins bloqués, environnement dégagé", "en": "Ensure safety: brakes locked, environment clear", "correct": true },
       { "fr": "Aller le plus vite possible", "en": "Go as fast as possible" },
       { "fr": "Transférer sans avertir le patient", "en": "Transfer without warning the patient" },
       { "fr": "Retirer les aides techniques", "en": "Remove all assistive devices" }
      ],
      "explFr": "Un transfert sécuritaire exige de bloquer les freins, dégager l'espace, informer le patient et adopter une bonne mécanique corporelle.",
      "explEn": "A safe transfer requires locking the brakes, clearing the space, informing the patient and using good body mechanics."
     },
     {
      "fr": "Les principes de manutention sécuritaire visent surtout à...",
      "en": "Safe patient-handling principles mainly aim to...",
      "choices": [
       { "fr": "Protéger le dos de l'intervenant et la sécurité du patient", "en": "Protect the clinician's back and the patient's safety", "correct": true },
       { "fr": "Accélérer la cadence de travail", "en": "Speed up the work pace" },
       { "fr": "Réduire le nombre d'évaluations", "en": "Reduce the number of assessments" },
       { "fr": "Éviter de plier les genoux", "en": "Avoid bending the knees" }
      ],
      "explFr": "Une bonne mécanique (rapprocher la charge, plier les genoux, éviter la torsion) prévient les blessures de l'intervenant et du patient.",
      "explEn": "Good mechanics (keep the load close, bend the knees, avoid twisting) prevent injury to clinician and patient."
     },
     {
      "fr": "Une bonne mécanique corporelle lors d'un effort recommande de...",
      "en": "Good body mechanics during an effort recommends...",
      "choices": [
       { "fr": "Garder la charge près du corps, plier les genoux et éviter la torsion du tronc", "en": "Keeping the load close, bending the knees and avoiding trunk twisting", "correct": true },
       { "fr": "Garder les jambes droites et arrondir le dos", "en": "Keeping the legs straight and rounding the back" },
       { "fr": "Éloigner la charge du corps", "en": "Holding the load away from the body" },
       { "fr": "Tourner rapidement le tronc en soulevant", "en": "Twisting the trunk quickly while lifting" }
      ],
      "explFr": "Rapprocher la charge, fléchir les genoux et pivoter avec les pieds (sans tordre le dos) protège la colonne de l'intervenant.",
      "explEn": "Keeping the load close, bending the knees and pivoting with the feet (without twisting the back) protects the clinician's spine."
     },
     {
      "fr": "Vrai ou faux : le port d'équipement de protection (gants, etc.) et l'hygiène des mains font partie des précautions de base (standards).",
      "en": "True or false: wearing protective equipment (gloves, etc.) and hand hygiene are part of standard (routine) precautions.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Les précautions de base s'appliquent à tous les patients pour limiter la transmission des micro-organismes.",
      "explEn": "Standard precautions apply to all patients to limit the transmission of micro-organisms."
     },
     {
      "fr": "Devant un patient à risque de chute lors d'un exercice debout, le thérapeute doit surtout...",
      "en": "With a patient at risk of falling during a standing exercise, the therapist should mainly...",
      "choices": [
       { "fr": "Sécuriser l'environnement et surveiller ou assister le patient", "en": "Secure the environment and supervise or assist the patient", "correct": true },
       { "fr": "S'éloigner pour le laisser seul", "en": "Step away to leave them alone" },
       { "fr": "Retirer tous les appuis disponibles", "en": "Remove all available supports" },
       { "fr": "Augmenter aussitôt la difficulté", "en": "Immediately increase the difficulty" }
      ],
      "explFr": "La prévention des chutes passe par un environnement dégagé, une surveillance rapprochée et une assistance ou une ceinture de marche au besoin.",
      "explEn": "Fall prevention relies on a clear environment, close supervision and assistance or a gait belt as needed."
     },
     {
      "fr": "L'approche biopsychosociale invite à considérer...",
      "en": "The biopsychosocial approach invites us to consider...",
      "choices": [
       { "fr": "Les facteurs biologiques, psychologiques et sociaux de la condition", "en": "The biological, psychological and social factors of the condition", "correct": true },
       { "fr": "Uniquement la lésion anatomique", "en": "Only the anatomical lesion" },
       { "fr": "Uniquement le budget du patient", "en": "Only the patient's budget" },
       { "fr": "Uniquement l'âge", "en": "Only age" }
      ],
      "explFr": "Au-delà de la lésion, les facteurs psychologiques (croyances, peur) et sociaux (travail, entourage) influencent l'évolution et le traitement.",
      "explEn": "Beyond the lesion, psychological factors (beliefs, fear) and social factors (work, support) influence outcome and treatment."
     },
     {
      "fr": "Associe chaque situation à la mesure de sécurité appropriée.",
      "en": "Match each situation to the appropriate safety measure.",
      "type": "match",
      "pairs": [
       { "term_fr": "Transfert lit ↔ fauteuil", "term_en": "Bed ↔ chair transfer", "def_fr": "Bloquer les freins", "def_en": "Lock the brakes" },
       { "term_fr": "Risque de chute", "term_en": "Fall risk", "def_fr": "Surveillance et assistance", "def_en": "Supervision and assistance" },
       { "term_fr": "Soulever une charge", "term_en": "Lifting a load", "def_fr": "Bonne mécanique corporelle", "def_en": "Good body mechanics" },
       { "term_fr": "Prévention des infections", "term_en": "Infection prevention", "def_fr": "Hygiène des mains", "def_en": "Hand hygiene" }
      ],
      "explFr": "Chaque situation clinique appelle une mesure de sécurité précise ; les anticiper prévient les incidents.",
      "explEn": "Each clinical situation calls for a specific safety measure; anticipating them prevents incidents."
     }
    ]
   },
   {
    "level": 3,
    "questions": [
     {
      "fr": "Un patient signale une douleur vive pendant un exercice. La meilleure conduite est de...",
      "en": "A patient reports sharp pain during an exercise. The best course of action is to...",
      "type": "scenario",
      "choices": [
       { "fr": "Cesser ou adapter l'exercice, réévaluer, puis documenter", "en": "Stop or adapt the exercise, re-assess, then document", "correct": true },
       { "fr": "Poursuivre sans changement", "en": "Continue unchanged" },
       { "fr": "Augmenter la charge immédiatement", "en": "Increase the load immediately" },
       { "fr": "Ignorer la plainte du patient", "en": "Ignore the patient's complaint" }
      ],
      "explFr": "La sécurité prime : on adapte ou cesse, on réévalue la cause, on informe le patient et on consigne l'incident au dossier.",
      "explEn": "Safety first: adapt or stop, re-assess the cause, inform the patient, and record the incident in the chart."
     },
     {
      "fr": "Vrai ou faux : une bonne communication clinique inclut d'expliquer le but de l'intervention et d'obtenir le consentement du patient.",
      "en": "True or false: good clinical communication includes explaining the intervention's purpose and obtaining the patient's consent.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Informer le patient et obtenir son consentement libre et éclairé sont au cœur d'une pratique éthique et sécuritaire.",
      "explEn": "Informing the patient and obtaining free, informed consent are central to ethical and safe practice."
     },
     {
      "fr": "Un patient anxieux dit ne pas comprendre les exercices que vous venez de lui montrer. La meilleure conduite est de...",
      "en": "An anxious patient says they do not understand the exercises you just showed. The best course of action is to...",
      "type": "scenario",
      "choices": [
       { "fr": "Prendre le temps de réexpliquer, vérifier sa compréhension et adapter au besoin", "en": "Take time to re-explain, check understanding and adapt as needed", "correct": true },
       { "fr": "Poursuivre sans tenir compte de son incompréhension", "en": "Carry on despite the confusion" },
       { "fr": "Doubler le nombre d'exercices", "en": "Double the number of exercises" },
       { "fr": "Lui remettre la feuille sans commentaire", "en": "Hand over the sheet without comment" }
      ],
      "explFr": "Une communication claire et adaptée, avec vérification de la compréhension, favorise l'adhésion et la sécurité du patient.",
      "explEn": "Clear, tailored communication with a comprehension check improves the patient's adherence and safety."
     },
     {
      "fr": "Vrai ou faux : tenir un dossier clinique à jour (documentation) est une obligation professionnelle et légale.",
      "en": "True or false: keeping an up-to-date clinical record (documentation) is a professional and legal obligation.",
      "type": "tf",
      "isTrue": true,
      "explFr": "La documentation assure la continuité des soins, la traçabilité des décisions et la protection du patient comme de l'intervenant.",
      "explEn": "Documentation ensures continuity of care, traceability of decisions and protection of both patient and clinician."
     },
     {
      "fr": "En cours de séance, vous remarquez qu'un appareil semble défectueux. La meilleure conduite est de...",
      "en": "During a session, you notice a device seems faulty. The best course of action is to...",
      "type": "scenario",
      "choices": [
       { "fr": "Cesser de l'utiliser, sécuriser la situation, puis signaler et documenter", "en": "Stop using it, make the situation safe, then report and document", "correct": true },
       { "fr": "Continuer à l'utiliser comme si de rien n'était", "en": "Keep using it as if nothing happened" },
       { "fr": "Le prêter à un collègue sans avertir", "en": "Lend it to a colleague without warning" },
       { "fr": "Ignorer le problème", "en": "Ignore the problem" }
      ],
      "explFr": "La sécurité impose de retirer le matériel douteux, de protéger le patient, puis de signaler le problème et de le consigner.",
      "explEn": "Safety requires removing the suspect equipment, protecting the patient, then reporting and recording the issue."
     },
     {
      "fr": "L'écoute active en communication clinique implique surtout de...",
      "en": "Active listening in clinical communication mainly involves...",
      "choices": [
       { "fr": "Reformuler, questionner et valider la compréhension du patient", "en": "Rephrasing, questioning and confirming the patient's understanding", "correct": true },
       { "fr": "Interrompre souvent le patient", "en": "Frequently interrupting the patient" },
       { "fr": "Parler sans laisser le patient s'exprimer", "en": "Talking without letting the patient speak" },
       { "fr": "Éviter tout contact visuel", "en": "Avoiding all eye contact" }
      ],
      "explFr": "L'écoute active (reformulation, questions ouvertes, validation) renforce le lien thérapeutique et la qualité de l'information recueillie.",
      "explEn": "Active listening (rephrasing, open questions, validation) strengthens the therapeutic bond and the quality of information gathered."
     },
     {
      "fr": "Associe chaque principe éthique ou professionnel à un exemple concret.",
      "en": "Match each ethical or professional principle to a concrete example.",
      "type": "match",
      "pairs": [
       { "term_fr": "Confidentialité", "term_en": "Confidentiality", "def_fr": "Ne pas divulguer sans consentement", "def_en": "Not disclosing without consent" },
       { "term_fr": "Consentement", "term_en": "Consent", "def_fr": "Informer avant d'intervenir", "def_en": "Informing before intervening" },
       { "term_fr": "Sécurité", "term_en": "Safety", "def_fr": "Prévenir les risques pour le patient", "def_en": "Preventing risks to the patient" },
       { "term_fr": "Compétence", "term_en": "Competence", "def_fr": "Référer au besoin à un autre professionnel", "def_en": "Referring to another professional when needed" }
      ],
      "explFr": "Relier chaque principe à une action concrète ancre l'éthique dans la pratique quotidienne.",
      "explEn": "Linking each principle to a concrete action anchors ethics in everyday practice."
     }
    ]
   }
  ]
 }
];

/* ---- Textes de l'interface (bilingue) ---- */
const UI_TEXT = {
  fr: {
    appName: "PhysioQuest",
    tagline: "Deviens thérapeute en réadaptation physique — DEC 144.A0",
    start: "Commencer l'aventure",
    yourName: "Ton prénom",
    chooseAvatar: "Choisis ton avatar",
    map: "Mon parcours",
    badges: "Badges",
    trophies: "Trophées",
    leaderboard: "Palmarès",
    profile: "Profil",
    level: "Niveau",
    xp: "XP",
    locked: "Verrouillé",
    completeToUnlock: "Termine la quête précédente pour déverrouiller",
    startQuest: "Démarrer la quête",
    retryQuest: "Reprendre la quête",
    question: "Question",
    of: "sur",
    submit: "Valider",
    next: "Suivant",
    finish: "Terminer",
    correct: "Bonne réponse!",
    incorrect: "Ce n'est pas ça...",
    questResult: "Résultat de la quête",
    score: "Score",
    passed: "Quête réussie! 🎉",
    failed: "Pas encore réussi — réessaie pour débloquer le badge (seuil: 70%)",
    backToMap: "Retour à la carte",
    newBadge: "Nouveau badge!",
    newTrophy: "Nouveau trophée!",
    hours: "heures",
    switchLang: "EN",
    privacy: "Confidentialité",
    resetProgress: "Réinitialiser tout",
    confirmReset: "Tout réinitialiser? Ton avatar, tes badges, trophées et toute ta progression seront effacés. Cette action est irréversible.",
    installApp: "Installer l'application",
    rank: "Rang",
    you: "Toi",
    leaderboardNote: "Classement local (démo) — un vrai palmarès de classe nécessite un serveur partagé.",
    completedQuests: "quêtes complétées",
    chooseVehicle: "Choisis ta machine",
    myVehicle: "Ta machine",
    vehicleGrows: "Évolue avec ton expérience",
    maxSize: "Taille maximale atteinte!",
    trueLabel: "Vrai",
    falseLabel: "Faux",
    tfPrompt: "Vrai ou faux?",
    masteredLabel: "compétences maîtrisées",
    tierLabel: "Palier",
    matchPrompt: "Touche un terme, puis sa définition qui correspond.",
    scenarioLabel: "Mise en situation",
    masteryUnlocked: "Compétence maîtrisée — badge débloqué!",
    accessCodeTitle: "Code d'accès",
    accessCodePrompt: "Entre le code d'accès fourni par ton enseignant pour continuer.",
    accessCodeTrialOver: "Ton essai gratuit de 7 jours est terminé. Entre le code d'accès fourni par ton établissement pour continuer.",
    accessCodePlaceholder: "Code d'accès",
    accessCodeSubmit: "Valider",
    accessCodeChecking: "Vérification...",
    accessCodeInvalid: "Code invalide ou inactif. Vérifie auprès de ton enseignant.",
    accessCodeOffline: "Connexion Internet requise pour valider ton code la première fois. Réessaie une fois connecté.",
    accessCodeNotConfigured: "L'application n'est pas encore configurée. Contacte ton enseignant.",
    welcomeHeading: "Comment ça marche",
    welcomeIntro: "Avant de commencer, voici un survol rapide de l'application.",
    welcomeSteps: [
      { icon: "🗺️", title: "Mon parcours", text: "Chaque compétence du programme est une quête sur la carte. Termine-les dans l'ordre pour avancer." },
      { icon: "📝", title: "Questions", text: "Réponds à des questions à choix multiples et vrai/faux liées à chaque compétence." },
      { icon: "🎖️", title: "Badges", text: "Réussis une quête à 70% ou plus pour débloquer son badge." },
      { icon: "🏆", title: "Trophées", text: "Décroche des trophées spéciaux pour tes exploits et ta progression." },
      { icon: "📊", title: "Palmarès", text: "Compare ton avancement avec celui du reste de la classe." },
      { icon: "🧑‍⚕️", title: "Ton avatar", text: "Choisis ton avatar — il évolue à mesure que tu gagnes de l'expérience." }
    ]
  },
  en: {
    appName: "PhysioQuest",
    tagline: "Become a physical rehab therapist — 144.A0",
    start: "Start the adventure",
    yourName: "Your first name",
    chooseAvatar: "Choose your avatar",
    map: "My path",
    badges: "Badges",
    trophies: "Trophies",
    leaderboard: "Leaderboard",
    profile: "Profile",
    level: "Level",
    xp: "XP",
    locked: "Locked",
    completeToUnlock: "Complete the previous quest to unlock",
    startQuest: "Start quest",
    retryQuest: "Retry quest",
    question: "Question",
    of: "of",
    submit: "Submit",
    next: "Next",
    finish: "Finish",
    correct: "Correct!",
    incorrect: "Not quite...",
    questResult: "Quest Result",
    score: "Score",
    passed: "Quest passed! 🎉",
    failed: "Not passed yet — try again to unlock the badge (threshold: 70%)",
    backToMap: "Back to map",
    newBadge: "New badge!",
    newTrophy: "New trophy!",
    hours: "hours",
    switchLang: "FR",
    privacy: "Privacy",
    resetProgress: "Reset everything",
    confirmReset: "Reset everything? Your avatar, badges, trophies and all progress will be erased. This cannot be undone.",
    installApp: "Install the app",
    rank: "Rank",
    you: "You",
    leaderboardNote: "Local (demo) ranking — a real class leaderboard needs a shared server.",
    completedQuests: "quests completed",
    chooseVehicle: "Choose your machine",
    myVehicle: "Your machine",
    vehicleGrows: "Evolves with your experience",
    maxSize: "Maximum size reached!",
    trueLabel: "True",
    falseLabel: "False",
    tfPrompt: "True or false?",
    masteredLabel: "competencies mastered",
    tierLabel: "Tier",
    matchPrompt: "Tap a term, then its matching definition.",
    scenarioLabel: "Scenario",
    masteryUnlocked: "Competency mastered — badge unlocked!",
    accessCodeTitle: "Access code",
    accessCodePrompt: "Enter the access code given by your teacher to continue.",
    accessCodeTrialOver: "Your free 7-day trial has ended. Enter the access code provided by your school to continue.",
    accessCodePlaceholder: "Access code",
    accessCodeSubmit: "Submit",
    accessCodeChecking: "Checking...",
    accessCodeInvalid: "Invalid or inactive code. Check with your teacher.",
    accessCodeOffline: "Internet connection required to validate your code the first time. Try again once connected.",
    accessCodeNotConfigured: "The app isn't configured yet. Contact your teacher.",
    welcomeHeading: "How it works",
    welcomeIntro: "Before you start, here's a quick overview of the app.",
    welcomeSteps: [
      { icon: "🗺️", title: "My path", text: "Each program competency is a quest on the map. Complete them in order to move forward." },
      { icon: "📝", title: "Questions", text: "Answer multiple-choice and true/false questions tied to each competency." },
      { icon: "🎖️", title: "Badges", text: "Pass a quest with 70% or more to unlock its badge." },
      { icon: "🏆", title: "Trophies", text: "Earn special trophies for your achievements and progress." },
      { icon: "📊", title: "Leaderboard", text: "Compare your progress with the rest of the class." },
      { icon: "🧑‍⚕️", title: "Your avatar", text: "Choose your avatar — it evolves as you earn experience." }
    ]
  }
};

/* ---- Paliers de niveau (basés sur XP total) ---- */
const LEVELS = [
  { min: 0,    name_fr: "Novice",       name_en: "Novice",     avatarStage: 0 },
  { min: 200,  name_fr: "Apprenti(e)",  name_en: "Apprentice", avatarStage: 2 },
  { min: 500,  name_fr: "Compétent(e)", name_en: "Competent",  avatarStage: 4 },
  { min: 1000, name_fr: "Chevronné(e)", name_en: "Seasoned",   avatarStage: 6 },
  { min: 2000, name_fr: "Expert(e)",    name_en: "Expert",     avatarStage: 9 },
  { min: 3500, name_fr: "Maître",       name_en: "Master",     avatarStage: 11 }
];

/* ---- Personnages d'avatar (créatures fantastiques qui éclosent) ----
   Chaque avatar est rendu par un emoji évoluant avec l'XP (de l'œuf à la
   créature légendaire) — voir avatarSVG()/avatarStageForXP() dans app.js.
   "stages" = les 12 formes successives affichées selon l'expérience. */
const AVATAR_CHARACTERS = [
 {
  "id": "dragon",
  "name_fr": "Dragon",
  "name_en": "Dragon",
  "title_fr": "Le Sage",
  "title_en": "The Sage",
  "stages": [
   "🥚",
   "🥚",
   "🦎",
   "🦎",
   "🐲",
   "🐲",
   "🐉",
   "🐉",
   "🐉",
   "🐉",
   "🐉",
   "🐉"
  ]
 },
 {
  "id": "licorne",
  "name_fr": "Licorne",
  "name_en": "Unicorn",
  "title_fr": "La Guérisseuse",
  "title_en": "The Healer",
  "stages": [
   "🥚",
   "🥚",
   "🐴",
   "🐴",
   "🦄",
   "🦄",
   "🦄",
   "🦄",
   "🦄",
   "🦄",
   "🦄",
   "🦄"
  ]
 },
 {
  "id": "phenix",
  "name_fr": "Phénix",
  "name_en": "Phoenix",
  "title_fr": "Le Résilient",
  "title_en": "The Resilient One",
  "stages": [
   "🥚",
   "🥚",
   "🐣",
   "🐣",
   "🐦",
   "🐦",
   "🦅",
   "🦅",
   "🦅",
   "🦅",
   "🦅",
   "🦅"
  ]
 },
 {
  "id": "griffon",
  "name_fr": "Griffon",
  "name_en": "Griffin",
  "title_fr": "Le Courageux",
  "title_en": "The Brave One",
  "stages": [
   "🥚",
   "🥚",
   "🐱",
   "🐱",
   "🦁",
   "🦁",
   "🦁",
   "🦁",
   "🦁",
   "🦁",
   "🦁",
   "🦁"
  ]
 }
];

const AVATAR_COLORS = [
  { id: "sarcelle", hex: "#0f8b8d", name_fr: "Sarcelle", name_en: "Teal" },
  { id: "jaune",  hex: "#f7b500", name_fr: "Jaune soleil", name_en: "Sunny Yellow" },
  { id: "orange", hex: "#ff7a1a", name_fr: "Orange vif", name_en: "Bright Orange" },
  { id: "vert",   hex: "#3bb54a", name_fr: "Vert menthe", name_en: "Mint Green" },
  { id: "bleu",   hex: "#2a7de1", name_fr: "Bleu clinique", name_en: "Clinic Blue" },
  { id: "rouge",  hex: "#e13c3c", name_fr: "Rouge", name_en: "Red" }
];

/* ---- Machines de l'élève (grossissent avec le XP) ----
   Le dessin SVG de chaque machine est dans app.js (fonction vehicleSVG). */
const VEHICLE_TYPES = [
  { id: "camion", name_fr: "Camion à benne", name_en: "Dump Truck" },
  { id: "pelle", name_fr: "Pelle mécanique", name_en: "Excavator" },
  { id: "bouteur", name_fr: "Bouteur", name_en: "Bulldozer" },
  { id: "chargeuse", name_fr: "Chargeuse", name_en: "Loader" }
];

/* La hauteur affichée (en pixels) interpole entre minHeight et maxHeight
   selon le XP actuel de l'élève (voir vehicleHeight() dans app.js). La
   largeur est calculée automatiquement pour respecter les proportions
   propres à chaque machine (voir VEHICLE_VIEWBOX dans app.js). */
const VEHICLE_GROWTH = { minHeight: 78, maxHeight: 178, maxXP: 3500 };

/* ---- Commandes de cabine (questions basées sur une image) ----
   Chaque machine a 4 commandes numérotées, dessinées par cabinSVG()
   dans app.js aux coordonnées cx/cy (viewBox 0 0 360 220). Ces mêmes
   coordonnées servent à la fois à dessiner l'illustration et à
   positionner les zones cliquables des questions de type "hotspot" —
   l'image et les questions restent donc toujours alignées.
   Configuration générique à titre pédagogique — la disposition réelle
   varie selon le fabricant et le modèle (à valider par l'enseignant). */
const CABIN_CONTROLS = {
  pelle: [
    { num: 1, cx: 100, cy: 168, kind: "joystick",
      label_fr: "Joystick gauche", label_en: "Left joystick",
      desc_fr: "Contrôle la rotation de la tourelle et le godet",
      desc_en: "Controls turret rotation and the bucket" },
    { num: 2, cx: 210, cy: 168, kind: "joystick",
      label_fr: "Joystick droit", label_en: "Right joystick",
      desc_fr: "Contrôle la flèche et le bras (balancier)",
      desc_en: "Controls the boom and the stick (arm)" },
    { num: 3, cx: 160, cy: 205, kind: "pedal",
      label_fr: "Pédales de translation", label_en: "Travel pedals",
      desc_fr: "Font avancer ou reculer les chenilles",
      desc_en: "Move the tracks forward or backward" },
    { num: 4, cx: 320, cy: 150, kind: "button",
      label_fr: "Klaxon", label_en: "Horn button",
      desc_fr: "Avertit les personnes autour de la machine avant un mouvement",
      desc_en: "Warns people around the machine before a movement" }
  ],
  bouteur: [
    { num: 1, cx: 110, cy: 172, kind: "lever",
      label_fr: "Levier de la lame", label_en: "Blade control lever",
      desc_fr: "Lève, abaisse et incline la lame",
      desc_en: "Raises, lowers and tilts the blade" },
    { num: 2, cx: 210, cy: 172, kind: "lever",
      label_fr: "Manettes de direction (chenilles)", label_en: "Steering clutch levers",
      desc_fr: "Contrôlent la direction en ralentissant une chenille à la fois",
      desc_en: "Control steering by slowing one track at a time" },
    { num: 3, cx: 160, cy: 205, kind: "pedal",
      label_fr: "Pédale de frein", label_en: "Brake pedal",
      desc_fr: "Ralentit ou immobilise la machine",
      desc_en: "Slows or stops the machine" },
    { num: 4, cx: 320, cy: 150, kind: "button",
      label_fr: "Klaxon", label_en: "Horn button",
      desc_fr: "Avertit les personnes autour de la machine avant un mouvement",
      desc_en: "Warns people around the machine before a movement" }
  ],
  chargeuse: [
    { num: 1, cx: 210, cy: 168, kind: "lever",
      label_fr: "Levier de commande du godet", label_en: "Bucket control lever",
      desc_fr: "Lève, abaisse et bascule le godet",
      desc_en: "Raises, lowers and tilts the bucket" },
    { num: 2, cx: 110, cy: 172, kind: "wheel",
      label_fr: "Volant de direction", label_en: "Steering wheel",
      desc_fr: "Contrôle la direction des roues",
      desc_en: "Controls the direction of the wheels" },
    { num: 3, cx: 160, cy: 205, kind: "pedal",
      label_fr: "Pédale d'accélérateur", label_en: "Accelerator pedal",
      desc_fr: "Contrôle le régime moteur et la vitesse",
      desc_en: "Controls engine speed and travel speed" },
    { num: 4, cx: 320, cy: 150, kind: "button",
      label_fr: "Klaxon", label_en: "Horn button",
      desc_fr: "Avertit les personnes autour de la machine avant un mouvement",
      desc_en: "Warns people around the machine before a movement" }
  ],
  niveleuse: [
    { num: 1, cx: 190, cy: 172, kind: "lever",
      label_fr: "Leviers de la lame", label_en: "Blade control levers",
      desc_fr: "Ajustent l'angle, la hauteur et l'inclinaison de la lame",
      desc_en: "Adjust the blade's angle, height and tilt" },
    { num: 2, cx: 100, cy: 172, kind: "wheel",
      label_fr: "Volant de direction", label_en: "Steering wheel",
      desc_fr: "Contrôle la direction des roues avant",
      desc_en: "Controls the direction of the front wheels" },
    { num: 3, cx: 255, cy: 172, kind: "switch",
      label_fr: "Commande d'articulation du châssis", label_en: "Frame articulation control",
      desc_fr: "Articule le châssis pour resserrer le rayon de braquage",
      desc_en: "Articulates the frame to tighten the turning radius" },
    { num: 4, cx: 320, cy: 150, kind: "button",
      label_fr: "Klaxon", label_en: "Horn button",
      desc_fr: "Avertit les personnes autour de la machine avant un mouvement",
      desc_en: "Warns people around the machine before a movement" }
  ]
};

/* ---- Trophées (méta-réussites) ---- */
const TROPHIES = [
  { id: "t_first", name_fr: "Premier pas", name_en: "First Step", icon: "🥉",
    desc_fr: "Réussir ton premier palier de compétence", desc_en: "Pass your first competency tier",
    check: (state) => Object.keys(state.completed).length >= 1 },
  { id: "t_half", name_fr: "Mi-parcours", name_en: "Halfway There", icon: "🥈",
    desc_fr: "Maîtriser 4 modules (palier Avancé)", desc_en: "Master 4 modules (Advanced tier)",
    check: (state) => (state.badges || []).length >= 4 },
  { id: "t_all", name_fr: "Diplômé virtuel", name_en: "Virtual Graduate", icon: "🏆",
    desc_fr: "Maîtriser les 8 modules du programme", desc_en: "Master all 8 modules of the program",
    check: (state) => (state.badges || []).length >= 8 },
  { id: "t_perfect", name_fr: "Sans faute", name_en: "Flawless", icon: "💯",
    desc_fr: "Obtenir 100% à un palier", desc_en: "Score 100% on a tier",
    check: (state) => Object.values(state.completed).some(s => s.score === 100) },
  { id: "t_safety", name_fr: "Pratique sécuritaire", name_en: "Safe Practice", icon: "🦺",
    desc_fr: "Réussir le palier Débutant du module Profession, sécurité & communication", desc_en: "Pass the Beginner tier of the Profession, safety & communication module",
    check: (state) => state.completed["prof_1"] && state.completed["prof_1"].score >= 70 },
  { id: "t_streak", name_fr: "Assidu", name_en: "Dedicated", icon: "🔥",
    desc_fr: "Se connecter 3 jours différents", desc_en: "Log in on 3 different days",
    check: (state) => (state.loginDays || []).length >= 3 },
  { id: "t_podium", name_fr: "Sur le podium", name_en: "On the Podium", icon: "🏅",
    desc_fr: "Atteindre le top 3 du palmarès", desc_en: "Reach the top 3 of the leaderboard",
    check: (state) => (LEADERBOARD_SEED.filter(p => p.xp > state.xp).length) < 3 },
  { id: "t_matcher", name_fr: "Bon association", name_en: "Great Match", icon: "🧩",
    desc_fr: "Réussir 15 questions d'association de termes", desc_en: "Complete 15 term-matching questions",
    check: (state) => (state.matchesCompleted || 0) >= 15 }
];

/* ---- Palmarès (données d'exemple — classe fictive) ----
   À remplacer par de vraies données élèves lorsqu'un backend
   partagé sera branché (voir README). */
const LEADERBOARD_SEED = [
  { name: "Mia-Rose T.", xp: 3120, avatarChar: "licorne", avatarColor: "vert" },
  { name: "Xavier L.", xp: 2450, avatarChar: "dragon", avatarColor: "bleu" },
  { name: "Sam D.", xp: 1780, avatarChar: "phenix", avatarColor: "orange" },
  { name: "Alicia P.", xp: 1290, avatarChar: "griffon", avatarColor: "rouge" },
  { name: "Kevin R.", xp: 860, avatarChar: "dragon", avatarColor: "jaune" },
  { name: "Noémie B.", xp: 430, avatarChar: "licorne", avatarColor: "sarcelle" },
  { name: "Tommy G.", xp: 120, avatarChar: "phenix", avatarColor: "vert" }
];
