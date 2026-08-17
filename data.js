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
