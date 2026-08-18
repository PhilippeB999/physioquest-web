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
      "fr": "L'os coxal (os de la hanche) résulte de la fusion de trois os : l'ilion, l'ischion et...",
      "en": "The hip bone (os coxae) forms from the fusion of three bones: the ilium, the ischium and...",
      "choices": [
       { "fr": "Le pubis", "en": "The pubis", "correct": true },
       { "fr": "Le sacrum", "en": "The sacrum" },
       { "fr": "Le fémur", "en": "The femur" },
       { "fr": "La patella", "en": "The patella" }
      ],
      "explFr": "Chaque os coxal réunit l'ilion, l'ischion et le pubis ; les deux os coxaux et le sacrum forment le bassin.",
      "explEn": "Each hip bone unites the ilium, ischium and pubis; the two hip bones and the sacrum form the pelvis."
     },
     {
      "fr": "Vrai ou faux : la colonne vertébrale d'un adulte compte typiquement 7 vertèbres cervicales, 12 thoraciques et 5 lombaires.",
      "en": "True or false: an adult spine typically has 7 cervical, 12 thoracic and 5 lumbar vertebrae.",
      "type": "tf",
      "isTrue": true,
      "explFr": "La colonne comprend 7 cervicales, 12 thoraciques, 5 lombaires, puis le sacrum et le coccyx.",
      "explEn": "The spine has 7 cervical, 12 thoracic and 5 lumbar vertebrae, then the sacrum and coccyx."
     },
     {
      "fr": "Quel os plat, au centre de la paroi thoracique antérieure, s'articule avec les clavicules et les cartilages des côtes?",
      "en": "Which flat bone, at the center of the anterior chest wall, articulates with the clavicles and rib cartilages?",
      "choices": [
       { "fr": "Le sternum", "en": "The sternum", "correct": true },
       { "fr": "La scapula", "en": "The scapula" },
       { "fr": "Le sacrum", "en": "The sacrum" },
       { "fr": "L'ilion", "en": "The ilium" }
      ],
      "explFr": "Le sternum ferme la cage thoracique en avant ; il s'articule avec les clavicules et la plupart des côtes.",
      "explEn": "The sternum closes the rib cage in front; it articulates with the clavicles and most ribs."
     },
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
      "fr": "Quelle est une action de la partie supérieure du muscle trapèze sur la ceinture scapulaire?",
      "en": "What is an action of the upper trapezius on the shoulder girdle?",
      "choices": [
       { "fr": "L'élévation de la scapula (hausser les épaules)", "en": "Scapular elevation (shrugging)", "correct": true },
       { "fr": "La flexion du coude", "en": "Elbow flexion" },
       { "fr": "La dorsiflexion de la cheville", "en": "Ankle dorsiflexion" },
       { "fr": "L'extension du genou", "en": "Knee extension" }
      ],
      "explFr": "Le trapèze supérieur élève la scapula (hausser les épaules) et participe à sa rotation vers le haut.",
      "explEn": "The upper trapezius elevates the scapula (shrugging) and helps its upward rotation."
     },
     {
      "fr": "Quelle est l'action principale du muscle triceps brachial?",
      "en": "What is the main action of the triceps brachii?",
      "choices": [
       { "fr": "L'extension du coude", "en": "Elbow extension", "correct": true },
       { "fr": "La flexion du coude", "en": "Elbow flexion" },
       { "fr": "L'abduction de l'épaule", "en": "Shoulder abduction" },
       { "fr": "La pronation de l'avant-bras", "en": "Forearm pronation" }
      ],
      "explFr": "Le triceps brachial est le principal extenseur du coude ; il s'oppose au biceps (fléchisseur).",
      "explEn": "The triceps brachii is the main elbow extensor; it opposes the biceps (a flexor)."
     },
     {
      "fr": "Vrai ou faux : les muscles adducteurs de la cuisse (grand, long et court adducteurs, gracile) rapprochent la cuisse de la ligne médiane.",
      "en": "True or false: the thigh adductors (adductor magnus, longus, brevis and gracilis) bring the thigh toward the midline.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Le groupe des adducteurs, à la face médiale de la cuisse, rapproche le membre inférieur de l'axe médian.",
      "explEn": "The adductor group, on the medial thigh, brings the lower limb toward the midline."
     },
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
      "fr": "Le grand trochanter, repère osseux palpable à la face latérale de la hanche, appartient à quel os?",
      "en": "The greater trochanter, a bony landmark palpable on the lateral hip, belongs to which bone?",
      "choices": [
       { "fr": "Le fémur", "en": "The femur", "correct": true },
       { "fr": "L'os coxal", "en": "The hip bone" },
       { "fr": "Le tibia", "en": "The tibia" },
       { "fr": "La fibula", "en": "The fibula" }
      ],
      "explFr": "Le grand trochanter est une saillie proximale du fémur ; s'y insèrent notamment le moyen et le petit fessier.",
      "explEn": "The greater trochanter is a proximal projection of the femur; the gluteus medius and minimus insert there."
     },
     {
      "fr": "Le muscle deltoïde s'insère distalement sur quel repère de l'humérus?",
      "en": "The deltoid muscle inserts distally on which landmark of the humerus?",
      "choices": [
       { "fr": "La tubérosité deltoïdienne (V deltoïdien)", "en": "The deltoid tuberosity", "correct": true },
       { "fr": "L'olécrâne", "en": "The olecranon" },
       { "fr": "La tubérosité radiale", "en": "The radial tuberosity" },
       { "fr": "La malléole latérale", "en": "The lateral malleolus" }
      ],
      "explFr": "Le deltoïde se fixe à la tubérosité deltoïdienne, sur la face latérale de la diaphyse humérale.",
      "explEn": "The deltoid attaches to the deltoid tuberosity, on the lateral aspect of the humeral shaft."
     },
     {
      "fr": "Associe chaque repère osseux palpable à l'os auquel il appartient.",
      "en": "Match each palpable bony landmark to the bone it belongs to.",
      "type": "match",
      "pairs": [
       { "term_fr": "Grand trochanter", "term_en": "Greater trochanter", "def_fr": "Fémur", "def_en": "Femur" },
       { "term_fr": "Crête iliaque", "term_en": "Iliac crest", "def_fr": "Os coxal", "def_en": "Hip bone" },
       { "term_fr": "Tête de la fibula", "term_en": "Head of the fibula", "def_fr": "Fibula", "def_en": "Fibula" },
       { "term_fr": "Épine de la scapula", "term_en": "Spine of the scapula", "def_fr": "Scapula", "def_en": "Scapula" }
      ],
      "explFr": "Reconnaître à quel os appartient chaque repère palpable est la base d'un repérage fiable en clinique.",
      "explEn": "Knowing which bone each palpable landmark belongs to is the basis of reliable landmarking in the clinic."
     },
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
      "fr": "Quel organe pompe le sang dans tout l'organisme?",
      "en": "Which organ pumps blood throughout the body?",
      "choices": [
       { "fr": "Le cœur", "en": "The heart", "correct": true },
       { "fr": "Le foie", "en": "The liver" },
       { "fr": "Les reins", "en": "The kidneys" },
       { "fr": "L'estomac", "en": "The stomach" }
      ],
      "explFr": "Le cœur, muscle creux, propulse le sang dans les vaisseaux vers tous les tissus de l'organisme.",
      "explEn": "The heart, a hollow muscle, propels blood through the vessels to all the body's tissues."
     },
     {
      "fr": "Le sang qui quitte le cœur pour aller vers les tissus circule dans les...",
      "en": "Blood leaving the heart toward the tissues travels through the...",
      "choices": [
       { "fr": "Artères", "en": "Arteries", "correct": true },
       { "fr": "Veines", "en": "Veins" },
       { "fr": "Bronches", "en": "Bronchi" },
       { "fr": "Nerfs", "en": "Nerves" }
      ],
      "explFr": "Les artères transportent le sang du cœur vers les tissus ; les veines le ramènent vers le cœur.",
      "explEn": "Arteries carry blood from the heart to the tissues; veins bring it back to the heart."
     },
     {
      "fr": "Vrai ou faux : les veines ramènent le sang vers le cœur.",
      "en": "True or false: veins return blood to the heart.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Les veines ramènent le sang vers le cœur ; beaucoup possèdent des valvules qui empêchent le reflux.",
      "explEn": "Veins return blood to the heart; many contain valves that prevent backflow."
     },
     {
      "fr": "Où se produisent les échanges gazeux (O2/CO2) dans les poumons?",
      "en": "Where does gas exchange (O2/CO2) occur in the lungs?",
      "choices": [
       { "fr": "Dans les alvéoles pulmonaires", "en": "In the pulmonary alveoli", "correct": true },
       { "fr": "Dans la trachée", "en": "In the trachea" },
       { "fr": "Dans l'œsophage", "en": "In the esophagus" },
       { "fr": "Dans le diaphragme", "en": "In the diaphragm" }
      ],
      "explFr": "Les alvéoles, entourées de capillaires, sont le lieu des échanges gazeux entre l'air et le sang.",
      "explEn": "The alveoli, surrounded by capillaries, are where gases are exchanged between air and blood."
     },
     {
      "fr": "Quel gaz, produit par les cellules, est éliminé lors de l'expiration?",
      "en": "Which gas, produced by cells, is eliminated during exhalation?",
      "choices": [
       { "fr": "Le dioxyde de carbone (CO2)", "en": "Carbon dioxide (CO2)", "correct": true },
       { "fr": "L'oxygène (O2)", "en": "Oxygen (O2)" },
       { "fr": "L'azote (N2)", "en": "Nitrogen (N2)" },
       { "fr": "L'hydrogène (H2)", "en": "Hydrogen (H2)" }
      ],
      "explFr": "Le métabolisme cellulaire produit du CO2, transporté par le sang puis éliminé par les poumons à l'expiration.",
      "explEn": "Cellular metabolism produces CO2, carried by the blood and then removed by the lungs on exhalation."
     },
     {
      "fr": "Vrai ou faux : la température corporelle normale se situe autour de 37 °C.",
      "en": "True or false: normal body temperature is around 37 °C.",
      "type": "tf",
      "isTrue": true,
      "explFr": "La température centrale est maintenue autour de 37 °C par la thermorégulation (un exemple d'homéostasie).",
      "explEn": "Core temperature is kept around 37 °C by thermoregulation (an example of homeostasis)."
     },
     {
      "fr": "Quel système assure la coordination rapide de l'organisme par des influx électriques?",
      "en": "Which system provides the body's rapid coordination through electrical impulses?",
      "choices": [
       { "fr": "Le système nerveux", "en": "The nervous system", "correct": true },
       { "fr": "Le système digestif", "en": "The digestive system" },
       { "fr": "Le système urinaire", "en": "The urinary system" },
       { "fr": "Le système tégumentaire (peau)", "en": "The integumentary system (skin)" }
      ],
      "explFr": "Le système nerveux transmet des influx électriques rapides ; le système endocrinien agit plus lentement par les hormones.",
      "explEn": "The nervous system transmits fast electrical impulses; the endocrine system acts more slowly through hormones."
     },
     {
      "fr": "Le principal sucre utilisé comme carburant par les cellules est...",
      "en": "The main sugar used as fuel by cells is...",
      "choices": [
       { "fr": "Le glucose", "en": "Glucose", "correct": true },
       { "fr": "Le collagène", "en": "Collagen" },
       { "fr": "La kératine", "en": "Keratin" },
       { "fr": "L'hémoglobine", "en": "Hemoglobin" }
      ],
      "explFr": "Le glucose est un carburant majeur des cellules ; sa dégradation permet, avec l'oxygène, de produire de l'ATP.",
      "explEn": "Glucose is a major cellular fuel; its breakdown, with oxygen, produces ATP."
     },
     {
      "fr": "Associe chaque composant du sang à sa fonction.",
      "en": "Match each blood component to its function.",
      "type": "match",
      "pairs": [
       { "term_fr": "Plasma", "term_en": "Plasma", "def_fr": "Transport liquide (nutriments, déchets)", "def_en": "Fluid transport (nutrients, waste)" },
       { "term_fr": "Globule rouge", "term_en": "Red blood cell", "def_fr": "Transport de l'oxygène", "def_en": "Oxygen transport" },
       { "term_fr": "Globule blanc", "term_en": "White blood cell", "def_fr": "Défense immunitaire", "def_en": "Immune defense" },
       { "term_fr": "Plaquette", "term_en": "Platelet", "def_fr": "Coagulation", "def_en": "Clotting" }
      ],
      "explFr": "Chaque composant du sang a un rôle distinct : transport, défense et coagulation.",
      "explEn": "Each blood component has a distinct role: transport, defense and clotting."
     },
     {
      "fr": "Vrai ou faux : les hormones sont des messagers chimiques transportés par le sang.",
      "en": "True or false: hormones are chemical messengers carried by the blood.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Les hormones, sécrétées par les glandes endocrines, voyagent dans le sang pour agir à distance sur leurs cibles.",
      "explEn": "Hormones, secreted by endocrine glands, travel in the blood to act on distant targets."
     },
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
      "fr": "Au repos, la fréquence cardiaque normale d'un adulte se situe généralement entre...",
      "en": "At rest, a normal adult heart rate is generally between...",
      "choices": [
       { "fr": "60 et 100 battements par minute", "en": "60 and 100 beats per minute", "correct": true },
       { "fr": "10 et 30 battements par minute", "en": "10 and 30 beats per minute" },
       { "fr": "120 et 160 battements par minute", "en": "120 and 160 beats per minute" },
       { "fr": "200 et 240 battements par minute", "en": "200 and 240 beats per minute" }
      ],
      "explFr": "Chez l'adulte au repos, la fréquence cardiaque normale se situe habituellement entre 60 et 100 bpm. À valider.",
      "explEn": "In a resting adult, a normal heart rate is usually between 60 and 100 bpm. To be validated."
     },
     {
      "fr": "La pression artérielle se compose de deux valeurs : la systolique et la...",
      "en": "Blood pressure has two values: the systolic and the...",
      "choices": [
       { "fr": "Diastolique", "en": "Diastolic", "correct": true },
       { "fr": "Respiratoire", "en": "Respiratory" },
       { "fr": "Métabolique", "en": "Metabolic" },
       { "fr": "Veineuse centrale", "en": "Central venous" }
      ],
      "explFr": "La systolique reflète la contraction du cœur, la diastolique le relâchement ; on les note par exemple 120/80 mmHg. À valider.",
      "explEn": "Systolic reflects heart contraction, diastolic reflects relaxation; written for example 120/80 mmHg. To be validated."
     },
     {
      "fr": "Vrai ou faux : à l'effort, la circulation sanguine est redistribuée en priorité vers les muscles actifs.",
      "en": "True or false: during exercise, blood flow is preferentially redistributed to the active muscles.",
      "type": "tf",
      "isTrue": true,
      "explFr": "À l'effort, le débit sanguin augmente vers les muscles actifs (et la peau) et diminue vers des organes moins sollicités. À valider.",
      "explEn": "During exercise, blood flow increases to active muscles (and skin) and decreases to less-demanded organs. To be validated."
     },
     {
      "fr": "Une formule d'estimation courante de la fréquence cardiaque maximale théorique est...",
      "en": "A common estimate of theoretical maximal heart rate is...",
      "choices": [
       { "fr": "220 moins l'âge", "en": "220 minus age", "correct": true },
       { "fr": "100 plus l'âge", "en": "100 plus age" },
       { "fr": "L'âge multiplié par 10", "en": "Age times 10" },
       { "fr": "Toujours 200, peu importe l'âge", "en": "Always 200, regardless of age" }
      ],
      "explFr": "La formule « 220 − âge » n'est qu'une estimation approximative de la FC maximale ; la variabilité individuelle est grande. À valider.",
      "explEn": "The '220 − age' formula is only a rough estimate of maximal HR; individual variability is large. To be validated."
     },
     {
      "fr": "Après un effort intense, la consommation d'oxygène reste élevée quelques minutes (dette d'oxygène). Cela sert surtout à...",
      "en": "After intense exercise, oxygen consumption stays elevated for a few minutes (oxygen debt). This mainly serves to...",
      "choices": [
       { "fr": "Reconstituer les réserves d'énergie et éliminer les déchets métaboliques", "en": "Replenish energy stores and clear metabolic by-products", "correct": true },
       { "fr": "Refroidir instantanément les muscles", "en": "Instantly cool the muscles" },
       { "fr": "Arrêter complètement la respiration", "en": "Stop breathing entirely" },
       { "fr": "Diminuer définitivement la fréquence cardiaque", "en": "Permanently lower heart rate" }
      ],
      "explFr": "La récupération demande de l'oxygène pour reconstituer les réserves (ex. phosphocréatine) et rééquilibrer le milieu interne. À valider.",
      "explEn": "Recovery requires oxygen to rebuild stores (e.g., phosphocreatine) and restore the internal balance. To be validated."
     },
     {
      "fr": "Vrai ou faux : l'entraînement aérobie régulier tend à abaisser la fréquence cardiaque de repos.",
      "en": "True or false: regular aerobic training tends to lower resting heart rate.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Un cœur mieux entraîné éjecte plus de sang par battement, ce qui abaisse souvent la fréquence cardiaque de repos. À valider.",
      "explEn": "A better-trained heart ejects more blood per beat, which often lowers resting heart rate. To be validated."
     },
     {
      "fr": "Lors d'un effort de longue durée à intensité modérée, le muscle utilise surtout comme carburant...",
      "en": "During a prolonged, moderate-intensity effort, muscle mainly uses as fuel...",
      "choices": [
       { "fr": "Un mélange de glucides et de lipides (métabolisme aérobie)", "en": "A mix of carbohydrates and fats (aerobic metabolism)", "correct": true },
       { "fr": "Uniquement de la phosphocréatine", "en": "Only phosphocreatine" },
       { "fr": "Uniquement des protéines", "en": "Only proteins" },
       { "fr": "Aucun carburant", "en": "No fuel at all" }
      ],
      "explFr": "En aérobie prolongé, le muscle oxyde surtout glucides et lipides ; la part des lipides augmente avec la durée. À valider.",
      "explEn": "In prolonged aerobic effort, muscle mainly oxidizes carbohydrates and fats; the fat share rises with duration. To be validated."
     },
     {
      "fr": "La production de lactate augmente surtout lors d'un effort...",
      "en": "Lactate production rises mainly during an effort that is...",
      "choices": [
       { "fr": "Intense, quand la demande dépasse l'apport d'oxygène (glycolyse anaérobie)", "en": "Intense, when demand exceeds oxygen supply (anaerobic glycolysis)", "correct": true },
       { "fr": "Très léger et bref", "en": "Very light and brief" },
       { "fr": "Au repos complet", "en": "At complete rest" },
       { "fr": "Uniquement pendant le sommeil", "en": "Only during sleep" }
      ],
      "explFr": "Quand l'intensité dépasse un certain seuil, la glycolyse anaérobie s'accélère et produit du lactate. À valider.",
      "explEn": "When intensity passes a certain threshold, anaerobic glycolysis speeds up and produces lactate. To be validated."
     },
     {
      "fr": "Associe chaque paramètre cardiorespiratoire à sa définition.",
      "en": "Match each cardiorespiratory parameter to its definition.",
      "type": "match",
      "pairs": [
       { "term_fr": "Volume d'éjection systolique", "term_en": "Stroke volume", "def_fr": "Sang éjecté à chaque battement", "def_en": "Blood ejected per beat" },
       { "term_fr": "Fréquence cardiaque", "term_en": "Heart rate", "def_fr": "Battements par minute", "def_en": "Beats per minute" },
       { "term_fr": "Débit cardiaque", "term_en": "Cardiac output", "def_fr": "FC × volume d'éjection", "def_en": "HR × stroke volume" },
       { "term_fr": "VO2 max", "term_en": "VO2 max", "def_fr": "Consommation maximale d'oxygène", "def_en": "Maximal oxygen uptake" }
      ],
      "explFr": "Ces paramètres décrivent la performance du système cardiorespiratoire à l'effort. À valider.",
      "explEn": "These parameters describe cardiorespiratory performance during exercise. To be validated."
     },
     {
      "fr": "Vrai ou faux : jusqu'à un certain point, la ventilation (fréquence et amplitude respiratoires) augmente avec l'intensité de l'effort.",
      "en": "True or false: up to a point, ventilation (breathing rate and depth) rises with exercise intensity.",
      "type": "tf",
      "isTrue": true,
      "explFr": "La ventilation s'ajuste à la demande métabolique pour fournir l'O2 et éliminer le CO2 produit à l'effort. À valider.",
      "explEn": "Ventilation adjusts to metabolic demand to supply O2 and remove the CO2 produced during exercise. To be validated."
     },
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
      "fr": "Le couplage excitation-contraction désigne la séquence par laquelle...",
      "en": "Excitation-contraction coupling refers to the sequence by which...",
      "choices": [
       { "fr": "Un potentiel d'action déclenche la libération de Ca²⁺ et la contraction", "en": "An action potential triggers Ca²⁺ release and contraction", "correct": true },
       { "fr": "Le muscle fabrique de l'ADN", "en": "The muscle makes DNA" },
       { "fr": "Le sang se coagule dans le muscle", "en": "Blood clots within the muscle" },
       { "fr": "Le tendon s'ossifie", "en": "The tendon turns to bone" }
      ],
      "explFr": "L'excitation électrique de la fibre libère du Ca²⁺ du réticulum sarcoplasmique, ce qui permet le glissement actine-myosine.",
      "explEn": "Electrical excitation of the fiber releases Ca²⁺ from the sarcoplasmic reticulum, allowing actin-myosin sliding."
     },
     {
      "fr": "À haute fréquence de stimulation, les contractions d'une fibre musculaire fusionnent en...",
      "en": "At a high stimulation frequency, a muscle fiber's twitches fuse into...",
      "choices": [
       { "fr": "Une contraction soutenue (tétanos)", "en": "A sustained contraction (tetanus)", "correct": true },
       { "fr": "Un relâchement complet", "en": "A complete relaxation" },
       { "fr": "Une atrophie immédiate", "en": "Immediate atrophy" },
       { "fr": "Une rupture du tendon", "en": "A tendon rupture" }
      ],
      "explFr": "La sommation des stimulations rapprochées produit une contraction soutenue (tétanique), plus forte qu'une secousse isolée. À valider.",
      "explEn": "Summation of closely spaced stimuli produces a sustained (tetanic) contraction, stronger than a single twitch. To be validated."
     },
     {
      "fr": "Vrai ou faux : le recrutement des unités motrices suit habituellement le principe de la taille (les petites unités, plus lentes, sont recrutées en premier).",
      "en": "True or false: motor unit recruitment usually follows the size principle (small, slower units are recruited first).",
      "type": "tf",
      "isTrue": true,
      "explFr": "Selon le principe de la taille (Henneman), on recrute d'abord les petites unités motrices, puis les plus grandes selon la force requise. À valider.",
      "explEn": "By the size principle (Henneman), small motor units are recruited first, then larger ones as more force is needed. To be validated."
     },
     {
      "fr": "Les fibres musculaires de type II (rapides) se distinguent surtout par...",
      "en": "Type II (fast) muscle fibers are mainly distinguished by...",
      "choices": [
       { "fr": "Une contraction rapide et puissante mais une fatigue plus rapide", "en": "Fast, powerful contraction but quicker fatigue", "correct": true },
       { "fr": "Une contraction très lente et infatigable", "en": "Very slow, fatigue-proof contraction" },
       { "fr": "Une absence de myofilaments", "en": "An absence of myofilaments" },
       { "fr": "Une incapacité à produire de la force", "en": "An inability to produce force" }
      ],
      "explFr": "Les fibres de type II se contractent vite et fort (efforts explosifs) mais fatiguent plus vite que les fibres de type I.",
      "explEn": "Type II fibers contract quickly and forcefully (explosive efforts) but fatigue faster than type I fibers."
     },
     {
      "fr": "L'hypertrophie musculaire à l'entraînement en résistance correspond surtout à...",
      "en": "Muscle hypertrophy from resistance training mainly corresponds to...",
      "choices": [
       { "fr": "Une augmentation de la taille (section) des fibres musculaires", "en": "An increase in the size (cross-section) of muscle fibers", "correct": true },
       { "fr": "Une multiplication du nombre d'os", "en": "A multiplication of the number of bones" },
       { "fr": "Une perte de myofilaments", "en": "A loss of myofilaments" },
       { "fr": "Un rétrécissement des fibres", "en": "A shrinking of fibers" }
      ],
      "explFr": "L'entraînement en résistance augmente surtout la section transversale des fibres (hypertrophie), d'où un gain de force. À valider.",
      "explEn": "Resistance training mainly increases the fibers' cross-sectional area (hypertrophy), yielding a strength gain. To be validated."
     },
     {
      "fr": "Vrai ou faux : après quelques jours d'immobilisation, un muscle peut déjà présenter une atrophie et une perte de force.",
      "en": "True or false: after a few days of immobilization, a muscle can already show atrophy and loss of strength.",
      "type": "tf",
      "isTrue": true,
      "explFr": "L'inactivité et l'immobilisation entraînent rapidement une atrophie et une baisse de force, ce qui justifie le mouvement précoce. À valider.",
      "explEn": "Inactivity and immobilization quickly cause atrophy and reduced strength, justifying early movement. To be validated."
     },
     {
      "fr": "Les tout premiers gains de force en début d'entraînement s'expliquent surtout par...",
      "en": "The very first strength gains at the start of training are mainly explained by...",
      "choices": [
       { "fr": "Des adaptations nerveuses (meilleur recrutement), avant l'hypertrophie", "en": "Neural adaptations (better recruitment), before hypertrophy", "correct": true },
       { "fr": "Une hypertrophie massive dès la première séance", "en": "Massive hypertrophy from the first session" },
       { "fr": "Une augmentation du nombre d'os", "en": "An increase in the number of bones" },
       { "fr": "Une perte de coordination", "en": "A loss of coordination" }
      ],
      "explFr": "Les premières semaines, la force augmente surtout grâce à un meilleur recrutement et une meilleure coordination ; l'hypertrophie vient ensuite. À valider.",
      "explEn": "In the first weeks, strength rises mainly through better recruitment and coordination; hypertrophy comes later. To be validated."
     },
     {
      "fr": "Le réflexe myotatique (d'étirement), comme le réflexe rotulien, est déclenché par la stimulation du...",
      "en": "The stretch reflex, like the knee-jerk reflex, is triggered by stimulation of the...",
      "choices": [
       { "fr": "Fuseau neuromusculaire", "en": "Muscle spindle", "correct": true },
       { "fr": "Corpuscule de Pacini", "en": "Pacinian corpuscle" },
       { "fr": "Récepteur de la rétine", "en": "Retinal receptor" },
       { "fr": "Bourgeon du goût", "en": "Taste bud" }
      ],
      "explFr": "L'étirement brusque stimule le fuseau neuromusculaire, qui déclenche une contraction réflexe du muscle étiré (réflexe myotatique).",
      "explEn": "A sudden stretch stimulates the muscle spindle, which triggers a reflex contraction of the stretched muscle (stretch reflex)."
     },
     {
      "fr": "Associe chaque phénomène musculaire à sa description.",
      "en": "Match each muscular phenomenon to its description.",
      "type": "match",
      "pairs": [
       { "term_fr": "Hypertrophie", "term_en": "Hypertrophy", "def_fr": "Augmentation de la section des fibres", "def_en": "Increase in fiber cross-section" },
       { "term_fr": "Atrophie", "term_en": "Atrophy", "def_fr": "Perte de masse musculaire", "def_en": "Loss of muscle mass" },
       { "term_fr": "Endurance", "term_en": "Endurance", "def_fr": "Résistance à la fatigue", "def_en": "Resistance to fatigue" },
       { "term_fr": "Puissance", "term_en": "Power", "def_fr": "Force combinée à la vitesse", "def_en": "Force combined with speed" }
      ],
      "explFr": "Distinguer ces notions aide à choisir et à doser les exercices selon l'objectif (force, endurance, puissance). À valider.",
      "explEn": "Distinguishing these notions helps select and dose exercises according to the goal (strength, endurance, power). To be validated."
     },
     {
      "fr": "Après 3 semaines de plâtre au poignet, un patient a perdu de la force. Physiologiquement, la reprise progressive vise surtout à...",
      "en": "After 3 weeks in a wrist cast, a patient has lost strength. Physiologically, gradual reconditioning mainly aims to...",
      "type": "scenario",
      "choices": [
       { "fr": "Restimuler le recrutement des unités motrices, puis l'hypertrophie, par une charge graduée", "en": "Re-stimulate motor unit recruitment, then hypertrophy, through graded loading", "correct": true },
       { "fr": "Éviter tout mouvement pour toujours", "en": "Avoid all movement forever" },
       { "fr": "Charger au maximum dès la première séance", "en": "Load maximally from the first session" },
       { "fr": "Remplacer l'exercice par du repos strict prolongé", "en": "Replace exercise with prolonged strict rest" }
      ],
      "explFr": "La reprise graduée réactive d'abord la commande nerveuse, puis développe l'hypertrophie ; la charge progresse selon la tolérance. À valider.",
      "explEn": "Graded reconditioning first reactivates neural drive, then builds hypertrophy; load progresses with tolerance. To be validated."
     },
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
      "fr": "Le mouvement qui augmente l'angle d'une articulation (ex. redresser le coude) est...",
      "en": "The movement that increases a joint's angle (e.g., straightening the elbow) is...",
      "choices": [
       { "fr": "L'extension", "en": "Extension", "correct": true },
       { "fr": "La flexion", "en": "Flexion" },
       { "fr": "L'adduction", "en": "Adduction" },
       { "fr": "La pronation", "en": "Pronation" }
      ],
      "explFr": "L'extension augmente l'angle articulaire (ex. redresser le coude ou le genou) ; la flexion le diminue.",
      "explEn": "Extension increases the joint angle (e.g., straightening the elbow or knee); flexion decreases it."
     },
     {
      "fr": "Tourner la paume de la main vers le bas est un mouvement de...",
      "en": "Turning the palm downward is a movement of...",
      "choices": [
       { "fr": "Pronation", "en": "Pronation", "correct": true },
       { "fr": "Supination", "en": "Supination" },
       { "fr": "Abduction", "en": "Abduction" },
       { "fr": "Extension", "en": "Extension" }
      ],
      "explFr": "À l'avant-bras, la pronation tourne la paume vers le bas ; la supination la tourne vers le haut.",
      "explEn": "At the forearm, pronation turns the palm down; supination turns it up."
     },
     {
      "fr": "Vrai ou faux : la position anatomique de référence est debout, regard à l'horizontale, bras le long du corps, paumes tournées vers l'avant.",
      "en": "True or false: the anatomical reference position is standing, gaze horizontal, arms at the sides, palms facing forward.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Tous les termes de position (antérieur, médial, etc.) se définissent par rapport à cette position anatomique de référence.",
      "explEn": "All position terms (anterior, medial, etc.) are defined relative to this anatomical reference position."
     },
     {
      "fr": "En anatomie, le terme « proximal » désigne une structure...",
      "en": "In anatomy, the term 'proximal' refers to a structure...",
      "choices": [
       { "fr": "Plus proche de la racine du membre (du tronc)", "en": "Closer to the root of the limb (the trunk)", "correct": true },
       { "fr": "Plus éloignée du tronc", "en": "Farther from the trunk" },
       { "fr": "Située vers l'arrière", "en": "Located toward the back" },
       { "fr": "Située vers la ligne médiane", "en": "Located toward the midline" }
      ],
      "explFr": "Proximal = plus près de l'attache du membre au tronc ; le coude est proximal par rapport au poignet.",
      "explEn": "Proximal = closer to where the limb attaches to the trunk; the elbow is proximal to the wrist."
     },
     {
      "fr": "Le terme « distal » désigne une structure...",
      "en": "The term 'distal' refers to a structure...",
      "choices": [
       { "fr": "Plus éloignée de la racine du membre", "en": "Farther from the root of the limb", "correct": true },
       { "fr": "Plus proche du tronc", "en": "Closer to the trunk" },
       { "fr": "Située vers l'avant", "en": "Located toward the front" },
       { "fr": "Toujours du côté gauche", "en": "Always on the left side" }
      ],
      "explFr": "Distal = plus loin de l'attache au tronc ; la main est distale par rapport au coude.",
      "explEn": "Distal = farther from the trunk attachment; the hand is distal to the elbow."
     },
     {
      "fr": "Vrai ou faux : « antérieur » signifie situé vers l'avant du corps et « postérieur » vers l'arrière.",
      "en": "True or false: 'anterior' means toward the front of the body and 'posterior' toward the back.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Antérieur (ventral) = vers l'avant ; postérieur (dorsal) = vers l'arrière, en position anatomique.",
      "explEn": "Anterior (ventral) = toward the front; posterior (dorsal) = toward the back, in the anatomical position."
     },
     {
      "fr": "À la cheville, relever la pointe du pied vers la jambe (ramener le dos du pied vers le haut) est une...",
      "en": "At the ankle, lifting the toes toward the leg (bringing the top of the foot up) is a...",
      "choices": [
       { "fr": "Dorsiflexion (flexion dorsale)", "en": "Dorsiflexion", "correct": true },
       { "fr": "Flexion plantaire", "en": "Plantar flexion" },
       { "fr": "Éversion", "en": "Eversion" },
       { "fr": "Pronation", "en": "Pronation" }
      ],
      "explFr": "La dorsiflexion diminue l'angle entre le dos du pied et la jambe (assurée surtout par le tibial antérieur).",
      "explEn": "Dorsiflexion decreases the angle between the top of the foot and the leg (mainly by the tibialis anterior)."
     },
     {
      "fr": "À la cheville, pointer le pied vers le bas (comme pour appuyer sur une pédale) est une...",
      "en": "At the ankle, pointing the foot down (as if pressing a pedal) is a...",
      "choices": [
       { "fr": "Flexion plantaire", "en": "Plantar flexion", "correct": true },
       { "fr": "Dorsiflexion", "en": "Dorsiflexion" },
       { "fr": "Inversion", "en": "Inversion" },
       { "fr": "Supination", "en": "Supination" }
      ],
      "explFr": "La flexion plantaire pointe le pied vers le bas (assurée surtout par le triceps sural).",
      "explEn": "Plantar flexion points the foot downward (mainly by the triceps surae)."
     },
     {
      "fr": "Associe chaque terme de position à son sens.",
      "en": "Match each positional term to its meaning.",
      "type": "match",
      "pairs": [
       { "term_fr": "Médial", "term_en": "Medial", "def_fr": "Vers la ligne médiane", "def_en": "Toward the midline" },
       { "term_fr": "Latéral", "term_en": "Lateral", "def_fr": "Vers l'extérieur", "def_en": "Toward the outside" },
       { "term_fr": "Supérieur", "term_en": "Superior", "def_fr": "Vers le haut", "def_en": "Toward the top" },
       { "term_fr": "Inférieur", "term_en": "Inferior", "def_fr": "Vers le bas", "def_en": "Toward the bottom" }
      ],
      "explFr": "Ce vocabulaire de position permet de décrire précisément où se trouve une structure par rapport à une autre.",
      "explEn": "This positional vocabulary allows precise description of where one structure lies relative to another."
     },
     {
      "fr": "Vrai ou faux : la circumduction est un mouvement circulaire combinant flexion, abduction, extension et adduction (ex. faire des cercles avec le bras tendu).",
      "en": "True or false: circumduction is a circular movement combining flexion, abduction, extension and adduction (e.g., circling the outstretched arm).",
      "type": "tf",
      "isTrue": true,
      "explFr": "La circumduction décrit un cône : elle enchaîne flexion, abduction, extension et adduction (possible à l'épaule, la hanche...).",
      "explEn": "Circumduction traces a cone: it chains flexion, abduction, extension and adduction (possible at the shoulder, hip...)."
     },
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
      "fr": "Une articulation très mobile, entourée d'une capsule et contenant du liquide synovial (ex. épaule, genou), est dite...",
      "en": "A highly mobile joint, enclosed in a capsule and containing synovial fluid (e.g., shoulder, knee), is called...",
      "choices": [
       { "fr": "Synoviale (diarthrose)", "en": "Synovial (diarthrosis)", "correct": true },
       { "fr": "Fibreuse (immobile)", "en": "Fibrous (immobile)" },
       { "fr": "Cartilagineuse (peu mobile)", "en": "Cartilaginous (slightly mobile)" },
       { "fr": "Osseuse (fusionnée)", "en": "Bony (fused)" }
      ],
      "explFr": "Les articulations synoviales (diarthroses) sont les plus mobiles ; leur cavité contient du liquide synovial lubrifiant.",
      "explEn": "Synovial joints (diarthroses) are the most mobile; their cavity holds lubricating synovial fluid."
     },
     {
      "fr": "L'articulation de l'épaule (gléno-humérale), mobile dans les trois plans, est de type...",
      "en": "The shoulder joint (glenohumeral), mobile in all three planes, is of the type...",
      "choices": [
       { "fr": "Énarthrose (sphéroïde, « à rotule »)", "en": "Ball-and-socket (spheroidal)", "correct": true },
       { "fr": "Trochléenne (charnière)", "en": "Hinge" },
       { "fr": "Plane (glissement)", "en": "Plane (gliding)" },
       { "fr": "Trochoïde (pivot)", "en": "Pivot" }
      ],
      "explFr": "L'épaule est une énarthrose (tête sphérique dans une cavité), d'où sa grande mobilité dans les trois plans.",
      "explEn": "The shoulder is a ball-and-socket joint (spherical head in a socket), giving it great mobility in all three planes."
     },
     {
      "fr": "L'articulation du coude (huméro-ulnaire), qui fléchit et s'étend surtout, est de type...",
      "en": "The elbow joint (humeroulnar), which mainly flexes and extends, is of the type...",
      "choices": [
       { "fr": "Trochléenne (charnière / ginglyme)", "en": "Hinge (ginglymus)", "correct": true },
       { "fr": "Sphéroïde (à rotule)", "en": "Ball-and-socket" },
       { "fr": "En selle", "en": "Saddle" },
       { "fr": "Plane", "en": "Plane" }
      ],
      "explFr": "Le coude est une articulation trochléenne (charnière) : elle permet surtout la flexion et l'extension, dans un seul plan.",
      "explEn": "The elbow is a hinge joint: it mainly allows flexion and extension, in a single plane."
     },
     {
      "fr": "Vrai ou faux : plus le bras de levier d'un muscle par rapport à l'articulation est grand, plus son moment de force (couple) est important pour une même force.",
      "en": "True or false: the larger a muscle's lever arm relative to the joint, the greater its torque (moment) for the same force.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Le moment de force = force × bras de levier ; un bras de levier plus grand augmente l'effet de rotation pour une même force. À valider.",
      "explEn": "Torque = force × lever arm; a longer lever arm increases the turning effect for the same force. To be validated."
     },
     {
      "fr": "Le centre de gravité du corps humain, en position anatomique, se situe approximativement...",
      "en": "The human body's center of gravity, in the anatomical position, is located approximately...",
      "choices": [
       { "fr": "Au niveau du bassin (devant la 2e vertèbre sacrée)", "en": "At the pelvis (in front of the 2nd sacral vertebra)", "correct": true },
       { "fr": "Au sommet du crâne", "en": "At the top of the skull" },
       { "fr": "Sous les pieds", "en": "Below the feet" },
       { "fr": "À la pointe des doigts", "en": "At the fingertips" }
      ],
      "explFr": "En position anatomique, le centre de gravité se situe environ au niveau du bassin ; il se déplace avec la posture et les charges portées. À valider.",
      "explEn": "In the anatomical position, the center of gravity is roughly at the pelvis; it shifts with posture and loads carried. To be validated."
     },
     {
      "fr": "Pour soulever une charge en protégeant le dos, il est recommandé de garder la charge...",
      "en": "To lift a load while protecting the back, it is recommended to keep the load...",
      "choices": [
       { "fr": "Près du corps (pour réduire le bras de levier)", "en": "Close to the body (to reduce the lever arm)", "correct": true },
       { "fr": "Le plus loin possible du corps", "en": "As far as possible from the body" },
       { "fr": "Au-dessus de la tête en tout temps", "en": "Overhead at all times" },
       { "fr": "En tordant le tronc", "en": "By twisting the trunk" }
      ],
      "explFr": "Rapprocher la charge du corps raccourcit le bras de levier et réduit la contrainte sur la colonne lombaire.",
      "explEn": "Keeping the load close shortens the lever arm and reduces the stress on the lumbar spine."
     },
     {
      "fr": "Vrai ou faux : une contraction isométrique produit une tension sans variation de la longueur du muscle ni mouvement de l'articulation.",
      "en": "True or false: an isometric contraction produces tension with no change in muscle length and no joint movement.",
      "type": "tf",
      "isTrue": true,
      "explFr": "En isométrique, le muscle développe une force mais ne se raccourcit ni ne s'allonge (ex. tenir une position, pousser un mur).",
      "explEn": "In isometric action, the muscle generates force but neither shortens nor lengthens (e.g., holding a position, pushing a wall)."
     },
     {
      "fr": "Dans le plan frontal, autour d'un axe antéro-postérieur, se font surtout...",
      "en": "In the frontal plane, around an anteroposterior axis, mainly occur...",
      "choices": [
       { "fr": "L'abduction et l'adduction (et les inclinaisons latérales)", "en": "Abduction and adduction (and lateral bending)", "correct": true },
       { "fr": "La flexion et l'extension", "en": "Flexion and extension" },
       { "fr": "Les rotations interne et externe", "en": "Internal and external rotation" },
       { "fr": "La pronation et la supination", "en": "Pronation and supination" }
      ],
      "explFr": "Le plan frontal accueille l'abduction/adduction et les inclinaisons latérales du tronc.",
      "explEn": "The frontal plane hosts abduction/adduction and lateral trunk bending."
     },
     {
      "fr": "Associe chaque type d'articulation à un exemple.",
      "en": "Match each joint type to an example.",
      "type": "match",
      "pairs": [
       { "term_fr": "Synoviale", "term_en": "Synovial", "def_fr": "Genou", "def_en": "Knee" },
       { "term_fr": "Cartilagineuse", "term_en": "Cartilaginous", "def_fr": "Disque intervertébral", "def_en": "Intervertebral disc" },
       { "term_fr": "Fibreuse", "term_en": "Fibrous", "def_fr": "Sutures du crâne", "def_en": "Skull sutures" },
       { "term_fr": "Sphéroïde (à rotule)", "term_en": "Ball-and-socket", "def_fr": "Hanche", "def_en": "Hip" }
      ],
      "explFr": "La structure d'une articulation détermine sa mobilité : des sutures fixes jusqu'à la hanche très mobile.",
      "explEn": "A joint's structure sets its mobility: from fixed sutures to the highly mobile hip."
     },
     {
      "fr": "Un patient soulève une boîte lourde loin de son corps, jambes tendues et dos arrondi. Sur le plan biomécanique, ce geste augmente surtout...",
      "en": "A patient lifts a heavy box away from the body, legs straight and back rounded. Biomechanically, this mainly increases...",
      "type": "scenario",
      "choices": [
       { "fr": "La contrainte sur les structures lombaires (long bras de levier)", "en": "The load on the lumbar structures (long lever arm)", "correct": true },
       { "fr": "La stabilité de la colonne", "en": "The stability of the spine" },
       { "fr": "La sécurité du geste", "en": "The safety of the movement" },
       { "fr": "Rien du tout", "en": "Nothing at all" }
      ],
      "explFr": "Charge éloignée + dos arrondi + jambes tendues allongent le bras de levier et majorent la contrainte lombaire ; on corrige la technique. À valider.",
      "explEn": "Load held away + rounded back + straight legs lengthen the lever arm and raise lumbar stress; correct the technique. To be validated."
     },
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
      "fr": "L'inhibition réciproque désigne le fait que, lorsqu'un muscle agoniste se contracte...",
      "en": "Reciprocal inhibition means that, when an agonist muscle contracts...",
      "choices": [
       { "fr": "Son antagoniste se relâche pour permettre le mouvement", "en": "Its antagonist relaxes to allow the movement", "correct": true },
       { "fr": "Son antagoniste se contracte encore plus fort", "en": "Its antagonist contracts even harder" },
       { "fr": "Tous les muscles se figent", "en": "All muscles freeze" },
       { "fr": "Le muscle agoniste s'atrophie", "en": "The agonist muscle atrophies" }
      ],
      "explFr": "Pour fluidifier le mouvement, la contraction d'un agoniste s'accompagne d'un relâchement réflexe de l'antagoniste. À valider.",
      "explEn": "To smooth movement, an agonist's contraction is paired with a reflex relaxation of the antagonist. To be validated."
     },
     {
      "fr": "Le réflexe tendineux (via l'organe tendineux de Golgi) tend à...",
      "en": "The tendon reflex (via the Golgi tendon organ) tends to...",
      "choices": [
       { "fr": "Réduire la tension pour protéger le muscle et le tendon d'une force excessive", "en": "Reduce tension to protect the muscle and tendon from excessive force", "correct": true },
       { "fr": "Augmenter indéfiniment la force", "en": "Increase force indefinitely" },
       { "fr": "Supprimer la proprioception", "en": "Abolish proprioception" },
       { "fr": "Accélérer le rythme cardiaque", "en": "Speed up the heart rate" }
      ],
      "explFr": "L'organe tendineux de Golgi détecte une tension élevée et provoque un relâchement protecteur du muscle. À valider.",
      "explEn": "The Golgi tendon organ senses high tension and triggers a protective relaxation of the muscle. To be validated."
     },
     {
      "fr": "Vrai ou faux : l'équilibre repose sur l'intégration d'informations visuelles, vestibulaires (oreille interne) et proprioceptives.",
      "en": "True or false: balance relies on integrating visual, vestibular (inner ear) and proprioceptive information.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Le contrôle de l'équilibre combine la vision, le système vestibulaire et la proprioception ; un déficit de l'un peut être compensé par les autres. À valider.",
      "explEn": "Balance control combines vision, the vestibular system and proprioception; a deficit in one can be compensated by the others. To be validated."
     },
     {
      "fr": "Dans le cycle de la marche, la phase pendant laquelle le pied est en contact avec le sol s'appelle...",
      "en": "In the gait cycle, the phase when the foot is in contact with the ground is called...",
      "choices": [
       { "fr": "La phase d'appui (mise en charge)", "en": "The stance phase (weight-bearing)", "correct": true },
       { "fr": "La phase oscillante", "en": "The swing phase" },
       { "fr": "La phase de sommeil", "en": "The sleep phase" },
       { "fr": "La phase de repos assis", "en": "The seated rest phase" }
      ],
      "explFr": "La phase d'appui va du contact du talon au décollement des orteils ; le membre supporte alors le poids du corps. À valider.",
      "explEn": "The stance phase runs from heel contact to toe-off; the limb then supports the body's weight. To be validated."
     },
     {
      "fr": "La phase pendant laquelle le pied ne touche pas le sol et avance s'appelle...",
      "en": "The phase during which the foot does not touch the ground and moves forward is called...",
      "choices": [
       { "fr": "La phase oscillante (d'oscillation)", "en": "The swing phase", "correct": true },
       { "fr": "La phase d'appui", "en": "The stance phase" },
       { "fr": "La phase de double appui", "en": "The double-support phase" },
       { "fr": "La phase debout immobile", "en": "The quiet standing phase" }
      ],
      "explFr": "En phase oscillante, le membre avance sans contact avec le sol pour préparer le prochain appui. À valider.",
      "explEn": "In the swing phase, the limb advances without ground contact to prepare the next stance. To be validated."
     },
     {
      "fr": "Vrai ou faux : lors de la marche normale, les deux pieds sont au sol en même temps pendant de courtes périodes (double appui).",
      "en": "True or false: in normal walking, both feet are on the ground at the same time for brief periods (double support).",
      "type": "tf",
      "isTrue": true,
      "explFr": "La marche comporte de courtes phases de double appui ; la course, elle, comporte une phase sans aucun appui. À valider.",
      "explEn": "Walking includes brief double-support phases; running instead has a phase with no support at all. To be validated."
     },
     {
      "fr": "La stratégie de cheville, la stratégie de hanche et le pas sont trois stratégies utilisées pour...",
      "en": "The ankle strategy, the hip strategy and stepping are three strategies used to...",
      "choices": [
       { "fr": "Maintenir ou récupérer l'équilibre", "en": "Maintain or recover balance", "correct": true },
       { "fr": "Digérer les aliments", "en": "Digest food" },
       { "fr": "Réguler la température", "en": "Regulate temperature" },
       { "fr": "Produire des hormones", "en": "Produce hormones" }
      ],
      "explFr": "Face à un déséquilibre, on utilise d'abord de petits ajustements à la cheville, puis la hanche, puis un pas si la perturbation est grande. À valider.",
      "explEn": "When off-balance, we first use small ankle adjustments, then the hip, then a step if the perturbation is large. To be validated."
     },
     {
      "fr": "Une contraction excentrique du quadriceps intervient surtout lorsqu'on...",
      "en": "An eccentric contraction of the quadriceps mainly occurs when one...",
      "choices": [
       { "fr": "Descend un escalier ou s'assoit lentement (le muscle freine en s'allongeant)", "en": "Goes down stairs or sits slowly (the muscle brakes while lengthening)", "correct": true },
       { "fr": "Reste totalement immobile et détendu", "en": "Stays completely still and relaxed" },
       { "fr": "Dort profondément", "en": "Sleeps deeply" },
       { "fr": "Retient sa respiration", "en": "Holds one's breath" }
      ],
      "explFr": "En descendant un escalier, le quadriceps se contracte en s'allongeant pour freiner la flexion du genou (contraction excentrique).",
      "explEn": "Going down stairs, the quadriceps contracts while lengthening to brake knee flexion (eccentric contraction)."
     },
     {
      "fr": "Associe chaque source d'information à son rôle dans l'équilibre.",
      "en": "Match each information source to its role in balance.",
      "type": "match",
      "pairs": [
       { "term_fr": "Vision", "term_en": "Vision", "def_fr": "Repères visuels de l'environnement", "def_en": "Visual cues from the environment" },
       { "term_fr": "Système vestibulaire", "term_en": "Vestibular system", "def_fr": "Position et mouvement de la tête", "def_en": "Position and motion of the head" },
       { "term_fr": "Proprioception", "term_en": "Proprioception", "def_fr": "Position des articulations", "def_en": "Position of the joints" },
       { "term_fr": "Base de support", "term_en": "Base of support", "def_fr": "Surface d'appui au sol", "def_en": "Ground contact surface" }
      ],
      "explFr": "L'équilibre intègre plusieurs sources d'information ; les reconnaître aide à comprendre et à rééduquer les troubles de l'équilibre. À valider.",
      "explEn": "Balance integrates several information sources; recognizing them helps understand and retrain balance disorders. To be validated."
     },
     {
      "fr": "Une personne âgée est légèrement déséquilibrée vers l'avant en position debout. La stratégie posturale la plus probable en premier recours est...",
      "en": "An older adult is slightly off-balance forward while standing. The most likely first-line postural strategy is...",
      "type": "scenario",
      "choices": [
       { "fr": "La stratégie de cheville (petits ajustements), puis la hanche ou un pas si la perturbation est plus grande", "en": "The ankle strategy (small adjustments), then hip or a step if the perturbation is larger", "correct": true },
       { "fr": "Retenir sa respiration jusqu'à la chute", "en": "Holding the breath until falling" },
       { "fr": "Fermer les yeux pour mieux voir", "en": "Closing the eyes to see better" },
       { "fr": "Sauter le plus haut possible", "en": "Jumping as high as possible" }
      ],
      "explFr": "Un petit déséquilibre est corrigé par la stratégie de cheville ; les stratégies de hanche puis du pas s'ajoutent selon l'ampleur. À valider.",
      "explEn": "A small imbalance is corrected by the ankle strategy; hip and stepping strategies add on as the disturbance grows. To be validated."
     },
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
      "fr": "Une bursite est l'inflammation d'une...",
      "en": "Bursitis is inflammation of a...",
      "choices": [
       { "fr": "Bourse séreuse", "en": "Bursa", "correct": true },
       { "fr": "Artère", "en": "Artery" },
       { "fr": "Vertèbre", "en": "Vertebra" },
       { "fr": "Glande salivaire", "en": "Salivary gland" }
      ],
      "explFr": "Les bourses séreuses réduisent le frottement près des articulations ; leur inflammation (bursite) cause douleur et enflure. À valider.",
      "explEn": "Bursae reduce friction near joints; their inflammation (bursitis) causes pain and swelling. To be validated."
     },
     {
      "fr": "Une contusion (« bleu ») résulte surtout d'un...",
      "en": "A contusion ('bruise') mainly results from a...",
      "choices": [
       { "fr": "Choc direct provoquant un saignement dans les tissus mous", "en": "Direct blow causing bleeding in the soft tissues", "correct": true },
       { "fr": "Rupture d'un os", "en": "Break in a bone" },
       { "fr": "Manque de vitamines", "en": "Vitamin deficiency" },
       { "fr": "Excès de sommeil", "en": "Excess sleep" }
      ],
      "explFr": "La contusion vient d'un traumatisme direct qui rompt de petits vaisseaux, d'où l'ecchymose (le « bleu »). À valider.",
      "explEn": "A contusion comes from a direct blow that ruptures small vessels, producing the bruise. To be validated."
     },
     {
      "fr": "Vrai ou faux : une fracture « ouverte » s'accompagne d'une plaie où l'os communique avec l'extérieur.",
      "en": "True or false: an 'open' fracture involves a wound where the bone communicates with the outside.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Une fracture ouverte (avec plaie) augmente le risque d'infection ; une fracture fermée n'a pas de plaie associée. À valider.",
      "explEn": "An open fracture (with a wound) raises infection risk; a closed fracture has no associated wound. To be validated."
     },
     {
      "fr": "Le terme médical « œdème » désigne...",
      "en": "The medical term 'edema' refers to...",
      "choices": [
       { "fr": "Une accumulation anormale de liquide dans les tissus (enflure)", "en": "An abnormal buildup of fluid in the tissues (swelling)", "correct": true },
       { "fr": "Une fracture de fatigue", "en": "A stress fracture" },
       { "fr": "Une perte de sensibilité", "en": "A loss of sensation" },
       { "fr": "Une contraction involontaire", "en": "An involuntary contraction" }
      ],
      "explFr": "L'œdème est une accumulation de liquide dans les tissus ; on le suit, entre autres, par la mesure de circonférence. À valider.",
      "explEn": "Edema is a fluid buildup in the tissues; it can be tracked, among other ways, by circumference measurement. To be validated."
     },
     {
      "fr": "Une atrophie musculaire correspond à...",
      "en": "Muscle atrophy corresponds to...",
      "choices": [
       { "fr": "Une diminution du volume et de la force du muscle", "en": "A decrease in muscle volume and strength", "correct": true },
       { "fr": "Une augmentation de la taille du muscle", "en": "An increase in muscle size" },
       { "fr": "Une inflammation d'un tendon", "en": "An inflammation of a tendon" },
       { "fr": "Une fracture spontanée", "en": "A spontaneous fracture" }
      ],
      "explFr": "L'atrophie (fonte musculaire) survient avec l'inactivité, l'immobilisation ou certaines maladies ; elle réduit la force. À valider.",
      "explEn": "Atrophy (muscle wasting) occurs with inactivity, immobilization or certain diseases; it reduces strength. To be validated."
     },
     {
      "fr": "Vrai ou faux : le suffixe « -ite » (ex. tendinite, arthrite) évoque une inflammation.",
      "en": "True or false: the suffix '-itis' (e.g., tendinitis, arthritis) indicates inflammation.",
      "type": "tf",
      "isTrue": true,
      "explFr": "En terminologie médicale, « -ite » signale une inflammation (arthrite = inflammation d'une articulation). À valider.",
      "explEn": "In medical terminology, '-itis' signals inflammation (arthritis = inflammation of a joint). To be validated."
     },
     {
      "fr": "Une raideur articulaire (perte d'amplitude) après une immobilisation prolongée est souvent liée à...",
      "en": "Joint stiffness (loss of range) after prolonged immobilization is often related to...",
      "choices": [
       { "fr": "Un enraidissement des tissus mous et de la capsule articulaire", "en": "Tightening of the soft tissues and joint capsule", "correct": true },
       { "fr": "Une augmentation de la densité osseuse", "en": "An increase in bone density" },
       { "fr": "Une amélioration de la force", "en": "An improvement in strength" },
       { "fr": "Une accélération de la circulation", "en": "A speeding up of circulation" }
      ],
      "explFr": "L'immobilisation raccourcit et enraidit les tissus mous et la capsule, limitant l'amplitude ; d'où l'intérêt de la mobilisation précoce. À valider.",
      "explEn": "Immobilization shortens and stiffens soft tissues and the capsule, limiting range; hence the value of early mobilization. To be validated."
     },
     {
      "fr": "La spasticité (augmentation du tonus, résistance à l'étirement) est un signe fréquent d'atteinte...",
      "en": "Spasticity (increased tone, resistance to stretch) is a common sign of a lesion of the...",
      "choices": [
       { "fr": "Du système nerveux central", "en": "Central nervous system", "correct": true },
       { "fr": "D'un ligament", "en": "A ligament" },
       { "fr": "D'une bourse séreuse", "en": "A bursa" },
       { "fr": "D'un ongle", "en": "A fingernail" }
      ],
      "explFr": "La spasticité est un signe d'atteinte du système nerveux central (ex. après un AVC ou une lésion médullaire). À valider.",
      "explEn": "Spasticity is a sign of a central nervous system lesion (e.g., after a stroke or spinal cord injury). To be validated."
     },
     {
      "fr": "Associe chaque suffixe médical à son sens.",
      "en": "Match each medical suffix to its meaning.",
      "type": "match",
      "pairs": [
       { "term_fr": "-ite", "term_en": "-itis", "def_fr": "Inflammation", "def_en": "Inflammation" },
       { "term_fr": "-algie", "term_en": "-algia", "def_fr": "Douleur", "def_en": "Pain" },
       { "term_fr": "-pathie", "term_en": "-pathy", "def_fr": "Maladie / atteinte", "def_en": "Disease / disorder" },
       { "term_fr": "-ectomie", "term_en": "-ectomy", "def_fr": "Ablation chirurgicale", "def_en": "Surgical removal" }
      ],
      "explFr": "Décoder les suffixes médicaux aide à comprendre rapidement le vocabulaire des pathologies. À valider.",
      "explEn": "Decoding medical suffixes helps quickly understand the vocabulary of pathologies. To be validated."
     },
     {
      "fr": "Vrai ou faux : une tendinite (inflammation aiguë) et une tendinose (dégénérescence chronique) sont deux formes de tendinopathie.",
      "en": "True or false: tendinitis (acute inflammation) and tendinosis (chronic degeneration) are two forms of tendinopathy.",
      "type": "tf",
      "isTrue": true,
      "explFr": "« Tendinopathie » englobe les atteintes du tendon, qu'elles soient plutôt inflammatoires (tendinite) ou dégénératives (tendinose). À valider.",
      "explEn": "'Tendinopathy' covers tendon disorders, whether more inflammatory (tendinitis) or degenerative (tendinosis). To be validated."
     },
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
      "fr": "La sciatalgie (douleur du trajet du nerf sciatique) irradie typiquement...",
      "en": "Sciatica (pain along the sciatic nerve) typically radiates...",
      "choices": [
       { "fr": "À l'arrière de la cuisse et de la jambe", "en": "Down the back of the thigh and leg", "correct": true },
       { "fr": "Au bout des doigts de la main", "en": "To the fingertips of the hand" },
       { "fr": "Au sommet du crâne", "en": "To the top of the skull" },
       { "fr": "Autour de l'œil", "en": "Around the eye" }
      ],
      "explFr": "Le nerf sciatique chemine à l'arrière du membre inférieur ; son irritation cause une douleur qui descend dans la fesse, la cuisse et la jambe. À valider.",
      "explEn": "The sciatic nerve runs down the back of the lower limb; its irritation causes pain radiating into the buttock, thigh and leg. To be validated."
     },
     {
      "fr": "Le syndrome du canal carpien résulte de la compression, au poignet, du...",
      "en": "Carpal tunnel syndrome results from compression, at the wrist, of the...",
      "choices": [
       { "fr": "Nerf médian", "en": "Median nerve", "correct": true },
       { "fr": "Nerf sciatique", "en": "Sciatic nerve" },
       { "fr": "Nerf phrénique", "en": "Phrenic nerve" },
       { "fr": "Nerf facial", "en": "Facial nerve" }
      ],
      "explFr": "Au canal carpien, la compression du nerf médian donne engourdissements et faiblesse dans le territoire du pouce, de l'index et du majeur. À valider.",
      "explEn": "In the carpal tunnel, compression of the median nerve causes numbness and weakness in the thumb, index and middle finger. To be validated."
     },
     {
      "fr": "Vrai ou faux : une capsulite rétractile (« épaule gelée ») entraîne une perte marquée de l'amplitude de l'épaule.",
      "en": "True or false: adhesive capsulitis ('frozen shoulder') causes a marked loss of shoulder range of motion.",
      "type": "tf",
      "isTrue": true,
      "explFr": "La capsulite rétractile épaissit et rétracte la capsule de l'épaule, limitant nettement l'amplitude, surtout la rotation latérale. À valider.",
      "explEn": "Adhesive capsulitis thickens and tightens the shoulder capsule, markedly limiting range, especially lateral rotation. To be validated."
     },
     {
      "fr": "L'épicondylite latérale (« tennis elbow ») touche surtout les tendons...",
      "en": "Lateral epicondylitis ('tennis elbow') mainly affects the tendons of the...",
      "choices": [
       { "fr": "Des muscles extenseurs du poignet, à l'épicondyle latéral", "en": "Wrist extensor muscles, at the lateral epicondyle", "correct": true },
       { "fr": "Du quadriceps, au genou", "en": "Quadriceps, at the knee" },
       { "fr": "Du triceps sural, au talon", "en": "Triceps surae, at the heel" },
       { "fr": "Des ischio-jambiers, à la hanche", "en": "Hamstrings, at the hip" }
      ],
      "explFr": "L'épicondylite latérale est une tendinopathie des extenseurs du poignet à leur origine sur l'épicondyle latéral de l'humérus. À valider.",
      "explEn": "Lateral epicondylitis is a tendinopathy of the wrist extensors at their origin on the lateral humeral epicondyle. To be validated."
     },
     {
      "fr": "Une déchirure du ligament croisé antérieur (LCA) du genou compromet surtout...",
      "en": "A tear of the knee's anterior cruciate ligament (ACL) mainly compromises...",
      "choices": [
       { "fr": "La stabilité du genou (contrôle du glissement antérieur et de la rotation)", "en": "Knee stability (control of anterior translation and rotation)", "correct": true },
       { "fr": "La vision", "en": "Vision" },
       { "fr": "La digestion", "en": "Digestion" },
       { "fr": "La respiration", "en": "Breathing" }
      ],
      "explFr": "Le LCA limite le tiroir antérieur du tibia et contrôle la rotation ; sa rupture donne une instabilité du genou. À valider.",
      "explEn": "The ACL limits anterior tibial translation and controls rotation; its rupture causes knee instability. To be validated."
     },
     {
      "fr": "Vrai ou faux : l'entorse latérale de cheville (atteinte du ligament talo-fibulaire antérieur) est de loin la plus fréquente.",
      "en": "True or false: lateral ankle sprain (anterior talofibular ligament) is by far the most common.",
      "type": "tf",
      "isTrue": true,
      "explFr": "L'entorse en inversion, touchant surtout le ligament talo-fibulaire antérieur, est l'entorse de cheville la plus fréquente. À valider.",
      "explEn": "The inversion sprain, mainly affecting the anterior talofibular ligament, is the most common ankle sprain. To be validated."
     },
     {
      "fr": "La fasciite plantaire provoque typiquement une douleur...",
      "en": "Plantar fasciitis typically causes pain...",
      "choices": [
       { "fr": "Sous le talon, souvent vive aux premiers pas du matin", "en": "Under the heel, often sharp on the first steps in the morning", "correct": true },
       { "fr": "À l'épaule, la nuit seulement", "en": "In the shoulder, at night only" },
       { "fr": "Au poignet, en écrivant", "en": "In the wrist, when writing" },
       { "fr": "À la mâchoire, en mangeant", "en": "In the jaw, when eating" }
      ],
      "explFr": "La fasciite plantaire donne une douleur sous le talon/la voûte, classiquement plus intense aux premiers pas le matin. À valider.",
      "explEn": "Plantar fasciitis causes pain under the heel/arch, classically worse on the first steps in the morning. To be validated."
     },
     {
      "fr": "Une tendinopathie de la coiffe des rotateurs se manifeste surtout par une douleur...",
      "en": "A rotator cuff tendinopathy mainly presents with pain...",
      "choices": [
       { "fr": "À l'épaule, aggravée par les mouvements au-dessus de la tête", "en": "In the shoulder, worsened by overhead movements", "correct": true },
       { "fr": "Au talon, à la course", "en": "In the heel, when running" },
       { "fr": "Au genou, en montant les escaliers", "en": "In the knee, climbing stairs" },
       { "fr": "Au bas du dos, assis", "en": "In the low back, when sitting" }
      ],
      "explFr": "La coiffe des rotateurs stabilise l'épaule ; son atteinte donne une douleur aux mouvements du bras, surtout au-dessus de la tête. À valider.",
      "explEn": "The rotator cuff stabilizes the shoulder; its disorder causes pain with arm movements, especially overhead. To be validated."
     },
     {
      "fr": "Associe chaque atteinte à sa région du corps.",
      "en": "Match each condition to its body region.",
      "type": "match",
      "pairs": [
       { "term_fr": "Syndrome du canal carpien", "term_en": "Carpal tunnel syndrome", "def_fr": "Poignet (nerf médian)", "def_en": "Wrist (median nerve)" },
       { "term_fr": "Épicondylite latérale", "term_en": "Lateral epicondylitis", "def_fr": "Coude", "def_en": "Elbow" },
       { "term_fr": "Fasciite plantaire", "term_en": "Plantar fasciitis", "def_fr": "Pied (talon)", "def_en": "Foot (heel)" },
       { "term_fr": "Capsulite rétractile", "term_en": "Adhesive capsulitis", "def_fr": "Épaule", "def_en": "Shoulder" }
      ],
      "explFr": "Situer une atteinte à sa région oriente l'évaluation et le plan de traitement. À valider.",
      "explEn": "Locating a condition to its region guides assessment and the treatment plan. To be validated."
     },
     {
      "fr": "Un patient décrit une douleur vive sous le talon au lever, qui diminue après quelques minutes de marche. Quelle atteinte est la plus évoquée (à confirmer par l'évaluation)?",
      "en": "A patient describes sharp heel pain on rising that eases after a few minutes of walking. Which condition is most suggested (to confirm on assessment)?",
      "type": "scenario",
      "choices": [
       { "fr": "Une fasciite plantaire", "en": "Plantar fasciitis", "correct": true },
       { "fr": "Une capsulite de l'épaule", "en": "Shoulder capsulitis" },
       { "fr": "Un syndrome du canal carpien", "en": "Carpal tunnel syndrome" },
       { "fr": "Une épicondylite latérale", "en": "Lateral epicondylitis" }
      ],
      "explFr": "La douleur talonnière aux premiers pas du matin évoque classiquement une fasciite plantaire ; l'évaluation confirme le diagnostic. À valider.",
      "explEn": "Heel pain on the first morning steps classically suggests plantar fasciitis; assessment confirms the diagnosis. To be validated."
     },
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
      "fr": "Une thrombose veineuse profonde (TVP) est un caillot dans une veine profonde. Un signe d'alarme fréquent est...",
      "en": "A deep vein thrombosis (DVT) is a clot in a deep vein. A common warning sign is...",
      "choices": [
       { "fr": "Une douleur, une chaleur et un œdème unilatéral du mollet", "en": "Pain, warmth and unilateral calf swelling", "correct": true },
       { "fr": "Une vision double", "en": "Double vision" },
       { "fr": "Une perte d'audition", "en": "Hearing loss" },
       { "fr": "Une éruption sur le visage", "en": "A facial rash" }
      ],
      "explFr": "Un mollet douloureux, chaud et enflé d'un seul côté peut évoquer une TVP : c'est un drapeau rouge qui impose une référence médicale. À valider.",
      "explEn": "A painful, warm, swollen calf on one side may suggest a DVT: a red flag requiring medical referral. To be validated."
     },
     {
      "fr": "Vrai ou faux : une TVP est une urgence potentielle, car le caillot peut migrer vers les poumons (embolie pulmonaire).",
      "en": "True or false: a DVT is a potential emergency, because the clot can travel to the lungs (pulmonary embolism).",
      "type": "tf",
      "isTrue": true,
      "explFr": "Un caillot détaché peut gagner les poumons et provoquer une embolie pulmonaire ; devant une suspicion de TVP, on réfère sans tarder. À valider.",
      "explEn": "A dislodged clot can reach the lungs and cause a pulmonary embolism; if a DVT is suspected, refer promptly. To be validated."
     },
     {
      "fr": "Le diabète peut entraîner une atteinte des nerfs périphériques appelée...",
      "en": "Diabetes can cause peripheral nerve damage called...",
      "choices": [
       { "fr": "Neuropathie (perte de sensibilité, surtout aux pieds)", "en": "Neuropathy (loss of sensation, especially in the feet)", "correct": true },
       { "fr": "Fracture de fatigue", "en": "Stress fracture" },
       { "fr": "Entorse", "en": "Sprain" },
       { "fr": "Luxation", "en": "Dislocation" }
      ],
      "explFr": "La neuropathie diabétique réduit la sensibilité (surtout aux pieds), ce qui augmente le risque de plaies non ressenties. À valider.",
      "explEn": "Diabetic neuropathy reduces sensation (especially in the feet), raising the risk of unnoticed wounds. To be validated."
     },
     {
      "fr": "Chez une personne diabétique avec neuropathie, un risque important au pied est...",
      "en": "In a person with diabetes and neuropathy, an important foot risk is...",
      "choices": [
       { "fr": "Une plaie ou un ulcère non ressenti (perte de sensibilité protectrice)", "en": "An unnoticed wound or ulcer (loss of protective sensation)", "correct": true },
       { "fr": "Une pilosité excessive", "en": "Excessive hair growth" },
       { "fr": "Une meilleure guérison des plaies", "en": "Faster wound healing" },
       { "fr": "Une augmentation de la force", "en": "An increase in strength" }
      ],
      "explFr": "Sans sensation protectrice, une lésion du pied peut passer inaperçue et s'aggraver ; l'inspection régulière des pieds est essentielle. À valider.",
      "explEn": "Without protective sensation, a foot injury can go unnoticed and worsen; regular foot inspection is essential. To be validated."
     },
     {
      "fr": "Vrai ou faux : après un AVC, on observe souvent une atteinte du côté du corps opposé à la lésion cérébrale.",
      "en": "True or false: after a stroke, one often sees impairment on the side of the body opposite the brain lesion.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Les voies motrices se croisent : une lésion d'un hémisphère atteint surtout le côté opposé du corps (hémiparésie controlatérale). À valider.",
      "explEn": "Motor pathways cross: a lesion in one hemisphere mainly affects the opposite side of the body (contralateral hemiparesis). To be validated."
     },
     {
      "fr": "En réadaptation après une amputation d'un membre inférieur, une visée fréquente est...",
      "en": "In rehabilitation after a lower-limb amputation, a common aim is...",
      "choices": [
       { "fr": "Préparer le moignon et réentraîner l'équilibre et la marche (avec prothèse au besoin)", "en": "Prepare the residual limb and retrain balance and gait (with a prosthesis as needed)", "correct": true },
       { "fr": "Éviter tout mouvement définitivement", "en": "Avoid all movement permanently" },
       { "fr": "Interrompre toute évaluation", "en": "Stop all assessment" },
       { "fr": "Immobiliser le tronc en permanence", "en": "Permanently immobilize the trunk" }
      ],
      "explFr": "La réadaptation vise le soin et la mise en forme du moignon, l'équilibre, les transferts et la marche, souvent avec une prothèse. À valider.",
      "explEn": "Rehabilitation targets residual-limb care and shaping, balance, transfers and gait, often with a prosthesis. To be validated."
     },
     {
      "fr": "Un « drapeau rouge » (red flag) en physiothérapie est un signe qui...",
      "en": "A 'red flag' in physiotherapy is a sign that...",
      "choices": [
       { "fr": "Évoque une pathologie grave nécessitant une référence médicale", "en": "Suggests a serious condition requiring medical referral", "correct": true },
       { "fr": "Confirme une guérison complète", "en": "Confirms full recovery" },
       { "fr": "Indique d'augmenter la charge sans réserve", "en": "Means to increase the load without reservation" },
       { "fr": "Est toujours sans importance", "en": "Is always unimportant" }
      ],
      "explFr": "Un drapeau rouge signale un possible problème grave (infection, cancer, atteinte neurologique...) et impose de référer plutôt que de traiter. À valider.",
      "explEn": "A red flag signals a possible serious problem (infection, cancer, neurological damage...) and calls for referral rather than treatment. To be validated."
     },
     {
      "fr": "Vrai ou faux : une perte de force ou de sensibilité qui progresse rapidement, ou une perte de contrôle des sphincters, est un drapeau rouge exigeant une référence urgente.",
      "en": "True or false: rapidly progressing loss of strength or sensation, or loss of bladder/bowel control, is a red flag requiring urgent referral.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Ces signes peuvent traduire une atteinte neurologique grave (ex. syndrome de la queue de cheval) et imposent une prise en charge médicale urgente. À valider.",
      "explEn": "These signs may reflect serious neurological damage (e.g., cauda equina syndrome) and require urgent medical care. To be validated."
     },
     {
      "fr": "Associe chaque signe d'alarme (drapeau rouge) à l'action appropriée.",
      "en": "Match each warning sign (red flag) to the appropriate action.",
      "type": "match",
      "pairs": [
       { "term_fr": "Fièvre + douleur intense", "term_en": "Fever + severe pain", "def_fr": "Référer pour investigation médicale", "def_en": "Refer for medical investigation" },
       { "term_fr": "Perte de contrôle des sphincters", "term_en": "Loss of bladder/bowel control", "def_fr": "Référer en urgence", "def_en": "Refer urgently" },
       { "term_fr": "Mollet chaud, enflé, unilatéral", "term_en": "Warm, swollen, unilateral calf", "def_fr": "Suspecter une TVP", "def_en": "Suspect a DVT" },
       { "term_fr": "Douleur nocturne inexpliquée qui s'aggrave", "term_en": "Unexplained worsening night pain", "def_fr": "Investigation médicale", "def_en": "Medical investigation" }
      ],
      "explFr": "Reconnaître les drapeaux rouges et savoir référer fait partie de la sécurité du patient. À valider.",
      "explEn": "Recognizing red flags and knowing when to refer is part of patient safety. To be validated."
     },
     {
      "fr": "En traitant une lombalgie, le patient rapporte depuis peu une incontinence urinaire nouvelle et un engourdissement de la région périnéale. La conduite appropriée est de...",
      "en": "While treating low back pain, the patient reports new urinary incontinence and numbness in the perineal region. The appropriate course of action is to...",
      "type": "scenario",
      "choices": [
       { "fr": "Cesser, ne pas traiter et référer en urgence (drapeau rouge, possible syndrome de la queue de cheval)", "en": "Stop, not treat and refer urgently (red flag, possible cauda equina syndrome)", "correct": true },
       { "fr": "Poursuivre le traitement sans changement", "en": "Continue treatment unchanged" },
       { "fr": "Augmenter l'intensité des exercices", "en": "Increase exercise intensity" },
       { "fr": "Ignorer les nouveaux symptômes", "en": "Ignore the new symptoms" }
      ],
      "explFr": "Incontinence nouvelle et engourdissement périnéal sont des drapeaux rouges : on cesse et on réfère en urgence. À valider.",
      "explEn": "New incontinence and perineal numbness are red flags: stop and refer urgently. To be validated."
     },
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
      "fr": "Un examen physique en physiothérapie commence souvent par...",
      "en": "A physical exam in physiotherapy often begins with...",
      "choices": [
       { "fr": "L'observation (posture, démarche, tuméfaction, attitude)", "en": "Observation (posture, gait, swelling, guarding)", "correct": true },
       { "fr": "L'application immédiate d'ultrasons", "en": "Immediately applying ultrasound" },
       { "fr": "La rédaction du congé", "en": "Writing the discharge" },
       { "fr": "La facturation", "en": "Billing" }
      ],
      "explFr": "On observe d'abord le patient (posture, démarche, enflure, façon de bouger) avant de passer aux mesures et à la palpation.",
      "explEn": "The patient is first observed (posture, gait, swelling, movement) before moving to measurements and palpation."
     },
     {
      "fr": "La palpation sert notamment à repérer...",
      "en": "Palpation is used notably to detect...",
      "choices": [
       { "fr": "La douleur, la chaleur, l'œdème et les repères anatomiques", "en": "Pain, warmth, edema and anatomical landmarks", "correct": true },
       { "fr": "La tension artérielle exacte", "en": "The exact blood pressure" },
       { "fr": "Le taux de sucre dans le sang", "en": "The blood sugar level" },
       { "fr": "L'acuité visuelle", "en": "Visual acuity" }
      ],
      "explFr": "La palpation évalue la texture, la température, l'enflure, la douleur et localise les repères osseux et musculaires.",
      "explEn": "Palpation assesses texture, temperature, swelling, pain and locates bony and muscular landmarks."
     },
     {
      "fr": "Vrai ou faux : on compare habituellement le côté atteint au côté sain (controlatéral) lors de l'évaluation.",
      "en": "True or false: the affected side is usually compared with the healthy (contralateral) side during assessment.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Comparer avec le côté sain fournit une référence propre au patient pour juger l'amplitude, la force ou l'enflure.",
      "explEn": "Comparing with the healthy side gives a patient-specific reference to judge range, strength or swelling."
     },
     {
      "fr": "Pour mesurer une amplitude articulaire au goniomètre, on aligne son axe (pivot) sur...",
      "en": "To measure joint range with a goniometer, its axis (pivot) is aligned with...",
      "choices": [
       { "fr": "L'axe de rotation de l'articulation", "en": "The joint's axis of rotation", "correct": true },
       { "fr": "Le bout des doigts", "en": "The fingertips" },
       { "fr": "Le nombril", "en": "The navel" },
       { "fr": "Le lobe de l'oreille", "en": "The earlobe" }
      ],
      "explFr": "On place l'axe du goniomètre sur l'axe de rotation, un bras fixe et un bras mobile le long des segments pour lire l'angle.",
      "explEn": "The goniometer axis is placed on the axis of rotation, with a fixed and a moving arm along the segments to read the angle."
     },
     {
      "fr": "L'anamnèse (histoire du patient) fait partie de l'évaluation subjective ; les mesures (amplitude, force) font partie de l'évaluation...",
      "en": "History-taking is part of the subjective assessment; measurements (range, strength) are part of the assessment that is...",
      "choices": [
       { "fr": "Objective", "en": "Objective", "correct": true },
       { "fr": "Fictive", "en": "Fictional" },
       { "fr": "Financière", "en": "Financial" },
       { "fr": "Administrative", "en": "Administrative" }
      ],
      "explFr": "L'évaluation combine le subjectif (ce que rapporte le patient) et l'objectif (mesures et observations reproductibles).",
      "explEn": "Assessment combines the subjective (what the patient reports) and the objective (reproducible measurements and observations)."
     },
     {
      "fr": "Vrai ou faux : noter la date, l'heure et les valeurs mesurées permet de suivre l'évolution du patient.",
      "en": "True or false: recording the date, time and measured values lets you track the patient's progress.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Des mesures datées et consignées permettent de comparer dans le temps et d'objectiver les progrès (ou l'absence de progrès).",
      "explEn": "Dated, recorded measurements allow comparison over time and objectify progress (or lack thereof)."
     },
     {
      "fr": "Prendre le pouls radial (au poignet) permet d'évaluer...",
      "en": "Taking the radial pulse (at the wrist) allows you to assess...",
      "choices": [
       { "fr": "La fréquence cardiaque (et sa régularité)", "en": "Heart rate (and its regularity)", "correct": true },
       { "fr": "L'amplitude du genou", "en": "Knee range of motion" },
       { "fr": "La force des ischio-jambiers", "en": "Hamstring strength" },
       { "fr": "La glycémie", "en": "Blood sugar" }
      ],
      "explFr": "Le pouls radial permet de compter la fréquence cardiaque et d'apprécier sa régularité.",
      "explEn": "The radial pulse allows counting the heart rate and appreciating its regularity."
     },
     {
      "fr": "La saturation en oxygène (SpO2) se mesure généralement avec...",
      "en": "Oxygen saturation (SpO2) is generally measured with...",
      "choices": [
       { "fr": "Un saturomètre (oxymètre de pouls)", "en": "A pulse oximeter", "correct": true },
       { "fr": "Un goniomètre", "en": "A goniometer" },
       { "fr": "Un mètre-ruban", "en": "A tape measure" },
       { "fr": "Un dynamomètre", "en": "A dynamometer" }
      ],
      "explFr": "L'oxymètre de pouls, pincé au doigt, estime la saturation en oxygène du sang ; utile pour surveiller l'effort. À valider.",
      "explEn": "The finger pulse oximeter estimates blood oxygen saturation; useful for monitoring exertion. To be validated."
     },
     {
      "fr": "Associe chaque signe vital à sa mesure.",
      "en": "Match each vital sign to its measurement.",
      "type": "match",
      "pairs": [
       { "term_fr": "Fréquence cardiaque", "term_en": "Heart rate", "def_fr": "Pouls (battements/min)", "def_en": "Pulse (beats/min)" },
       { "term_fr": "Pression artérielle", "term_en": "Blood pressure", "def_fr": "Tensiomètre (mmHg)", "def_en": "Sphygmomanometer (mmHg)" },
       { "term_fr": "Fréquence respiratoire", "term_en": "Respiratory rate", "def_fr": "Respirations par minute", "def_en": "Breaths per minute" },
       { "term_fr": "Température", "term_en": "Temperature", "def_fr": "Thermomètre (°C)", "def_en": "Thermometer (°C)" }
      ],
      "explFr": "Connaître les signes vitaux et leurs outils de mesure est essentiel pour la surveillance clinique. À valider.",
      "explEn": "Knowing the vital signs and their measurement tools is essential for clinical monitoring. To be validated."
     },
     {
      "fr": "Vrai ou faux : avant de mesurer, il faut expliquer la manœuvre au patient et obtenir sa collaboration.",
      "en": "True or false: before measuring, you should explain the manoeuvre to the patient and obtain their cooperation.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Expliquer la mesure rassure le patient, améliore sa collaboration et rend le résultat plus fiable.",
      "explEn": "Explaining the measurement reassures the patient, improves cooperation and makes the result more reliable."
     },
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
      "fr": "Un test de force musculaire manuel évalue la force en...",
      "en": "A manual muscle test assesses strength by...",
      "choices": [
       { "fr": "Appliquant une résistance graduée contre le mouvement du patient", "en": "Applying graded resistance against the patient's movement", "correct": true },
       { "fr": "Mesurant la température de la peau", "en": "Measuring skin temperature" },
       { "fr": "Comptant les battements du cœur", "en": "Counting heartbeats" },
       { "fr": "Observant la couleur des ongles", "en": "Observing nail color" }
      ],
      "explFr": "Le testeur oppose une résistance manuelle au mouvement du patient et cote la force selon l'échelle 0 à 5.",
      "explEn": "The tester applies manual resistance to the patient's movement and grades strength on the 0-to-5 scale."
     },
     {
      "fr": "La « sensation de fin de course » (end-feel) explorée en fin d'amplitude passive renseigne surtout sur...",
      "en": "The 'end-feel' explored at the end of passive range mainly informs about...",
      "choices": [
       { "fr": "La nature de la structure qui limite le mouvement (capsule, muscle, os)", "en": "The type of structure limiting the movement (capsule, muscle, bone)", "correct": true },
       { "fr": "La glycémie du patient", "en": "The patient's blood sugar" },
       { "fr": "La couleur de la peau", "en": "The skin color" },
       { "fr": "Le groupe sanguin", "en": "The blood type" }
      ],
      "explFr": "En fin d'amplitude passive, la sensation perçue (dure/osseuse, ferme/capsulaire, molle/tissus) oriente sur la structure limitante. À valider.",
      "explEn": "At the end of passive range, the perceived feel (hard/bony, firm/capsular, soft/tissue) hints at the limiting structure. To be validated."
     },
     {
      "fr": "Vrai ou faux : une amplitude active limitée mais une amplitude passive complète oriente plutôt vers un problème musculaire ou de commande qu'articulaire.",
      "en": "True or false: limited active range with full passive range points more to a muscular/motor-control problem than to a joint problem.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Si le thérapeute obtient toute l'amplitude en passif mais que le patient n'y arrive pas seul, la cause est plutôt musculaire ou de commande. À valider.",
      "explEn": "If the therapist gets full passive range but the patient cannot achieve it alone, the cause is more muscular or motor-control. To be validated."
     },
     {
      "fr": "Le test de Romberg (debout, pieds joints, yeux fermés) explore surtout...",
      "en": "The Romberg test (standing, feet together, eyes closed) mainly explores...",
      "choices": [
       { "fr": "L'équilibre et la proprioception (contrôle postural)", "en": "Balance and proprioception (postural control)", "correct": true },
       { "fr": "La force de préhension", "en": "Grip strength" },
       { "fr": "L'amplitude de l'épaule", "en": "Shoulder range of motion" },
       { "fr": "La fréquence respiratoire", "en": "Respiratory rate" }
      ],
      "explFr": "Les yeux fermés, l'équilibre repose surtout sur la proprioception et le système vestibulaire ; une instabilité marquée est un signe à interpréter. À valider.",
      "explEn": "With eyes closed, balance relies mainly on proprioception and the vestibular system; marked instability is a sign to interpret. To be validated."
     },
     {
      "fr": "Le « Timed Up and Go » (se lever, marcher 3 m, revenir, se rasseoir, chronométré) évalue surtout...",
      "en": "The Timed Up and Go (rise, walk 3 m, return, sit, timed) mainly assesses...",
      "choices": [
       { "fr": "La mobilité fonctionnelle et le risque de chute", "en": "Functional mobility and fall risk", "correct": true },
       { "fr": "La tension artérielle", "en": "Blood pressure" },
       { "fr": "La vision", "en": "Vision" },
       { "fr": "L'audition", "en": "Hearing" }
      ],
      "explFr": "Le Timed Up and Go mesure la mobilité fonctionnelle et aide à estimer le risque de chute, surtout chez la personne âgée. À valider.",
      "explEn": "The Timed Up and Go measures functional mobility and helps estimate fall risk, especially in older adults. To be validated."
     },
     {
      "fr": "Vrai ou faux : un test spécial (ex. test orthopédique) doit toujours être interprété avec l'ensemble du tableau clinique, pas isolément.",
      "en": "True or false: a special test (e.g., an orthopedic test) should always be interpreted with the whole clinical picture, not in isolation.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Aucun test isolé n'est parfait ; on l'interprète avec l'anamnèse, les autres mesures et l'évolution. À valider.",
      "explEn": "No single test is perfect; it is interpreted alongside the history, other measures and the course over time. To be validated."
     },
     {
      "fr": "Pour évaluer la sensibilité cutanée superficielle, on peut...",
      "en": "To assess superficial skin sensation, one can...",
      "choices": [
       { "fr": "Effleurer légèrement la peau et comparer les deux côtés", "en": "Lightly touch the skin and compare both sides", "correct": true },
       { "fr": "Mesurer la circonférence du membre", "en": "Measure the limb circumference" },
       { "fr": "Prendre la tension artérielle", "en": "Take the blood pressure" },
       { "fr": "Compter les respirations", "en": "Count the breaths" }
      ],
      "explFr": "Un toucher léger comparé de chaque côté (yeux fermés) explore la sensibilité superficielle ; on note les zones altérées. À valider.",
      "explEn": "A light touch compared on each side (eyes closed) explores superficial sensation; altered areas are noted. To be validated."
     },
     {
      "fr": "La goniométrie de l'épaule mesure, entre autres, la flexion, l'abduction et...",
      "en": "Shoulder goniometry measures, among others, flexion, abduction and...",
      "choices": [
       { "fr": "Les rotations médiale et latérale", "en": "Medial and lateral rotation", "correct": true },
       { "fr": "La dorsiflexion de la cheville", "en": "Ankle dorsiflexion" },
       { "fr": "La pronation de l'avant-bras seulement", "en": "Forearm pronation only" },
       { "fr": "La flexion des orteils", "en": "Toe flexion" }
      ],
      "explFr": "L'épaule, très mobile, se mesure en flexion, abduction et rotations médiale/latérale, entre autres mouvements.",
      "explEn": "The highly mobile shoulder is measured in flexion, abduction and medial/lateral rotation, among other movements."
     },
     {
      "fr": "Associe chaque test fonctionnel à ce qu'il évalue.",
      "en": "Match each functional test to what it assesses.",
      "type": "match",
      "pairs": [
       { "term_fr": "Timed Up and Go", "term_en": "Timed Up and Go", "def_fr": "Mobilité / risque de chute", "def_en": "Mobility / fall risk" },
       { "term_fr": "Test de Romberg", "term_en": "Romberg test", "def_fr": "Équilibre / proprioception", "def_en": "Balance / proprioception" },
       { "term_fr": "Test de marche de 6 minutes", "term_en": "6-minute walk test", "def_fr": "Endurance à l'effort", "def_en": "Exercise endurance" },
       { "term_fr": "Dynamomètre (Jamar)", "term_en": "Dynamometer (Jamar)", "def_fr": "Force de préhension", "def_en": "Grip strength" }
      ],
      "explFr": "Choisir le bon test fonctionnel selon l'objectif rend l'évaluation pertinente et mesurable. À valider.",
      "explEn": "Choosing the right functional test for the goal makes the assessment relevant and measurable. To be validated."
     },
     {
      "fr": "Un patient a une flexion active du genou limitée à 90°, mais vous obtenez 120° en passif, sans douleur. Cela oriente surtout vers...",
      "en": "A patient has active knee flexion limited to 90°, but you obtain 120° passively, without pain. This mainly points to...",
      "type": "scenario",
      "choices": [
       { "fr": "Une atteinte de la force ou de la commande musculaire plutôt qu'une limitation articulaire", "en": "A strength or motor-control deficit rather than a joint limitation", "correct": true },
       { "fr": "Une articulation totalement bloquée", "en": "A completely blocked joint" },
       { "fr": "Un problème de vision", "en": "A vision problem" },
       { "fr": "Une fracture certaine", "en": "A definite fracture" }
      ],
      "explFr": "Amplitude passive complète mais active limitée: l'articulation bouge, donc le déficit est plutôt musculaire ou de commande. À valider.",
      "explEn": "Full passive but limited active range: the joint moves, so the deficit is more muscular or motor-control. To be validated."
     },
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
      "fr": "Une pression artérielle d'environ 120/80 mmHg chez l'adulte est considérée...",
      "en": "A blood pressure of about 120/80 mmHg in an adult is considered...",
      "choices": [
       { "fr": "Dans les valeurs normales usuelles", "en": "Within the usual normal range", "correct": true },
       { "fr": "Toujours dangereusement basse", "en": "Always dangerously low" },
       { "fr": "Toujours dangereusement haute", "en": "Always dangerously high" },
       { "fr": "Impossible à mesurer", "en": "Impossible to measure" }
      ],
      "explFr": "Une valeur autour de 120/80 mmHg est généralement considérée normale chez l'adulte ; l'interprétation tient compte du contexte. À valider.",
      "explEn": "A value around 120/80 mmHg is generally considered normal in adults; interpretation accounts for context. To be validated."
     },
     {
      "fr": "Vrai ou faux : une chute de la pression artérielle avec étourdissements au passage couché → debout évoque une hypotension orthostatique.",
      "en": "True or false: a drop in blood pressure with dizziness when moving from lying to standing suggests orthostatic hypotension.",
      "type": "tf",
      "isTrue": true,
      "explFr": "L'hypotension orthostatique (baisse de tension au lever) peut causer étourdissements et chutes ; on se lève lentement et on surveille. À valider.",
      "explEn": "Orthostatic hypotension (a BP drop on standing) can cause dizziness and falls; rise slowly and monitor. To be validated."
     },
     {
      "fr": "Avant et pendant un effort en réadaptation, surveiller les signes vitaux permet surtout de...",
      "en": "Before and during exercise in rehabilitation, monitoring vital signs mainly allows you to...",
      "choices": [
       { "fr": "Assurer la sécurité et adapter l'intensité", "en": "Ensure safety and adjust the intensity", "correct": true },
       { "fr": "Déterminer le groupe sanguin", "en": "Determine the blood type" },
       { "fr": "Mesurer la taille du patient", "en": "Measure the patient's height" },
       { "fr": "Évaluer la vision", "en": "Assess vision" }
      ],
      "explFr": "La surveillance des signes vitaux détecte une réponse anormale à l'effort et guide l'ajustement ou l'arrêt de l'exercice. À valider.",
      "explEn": "Vital-sign monitoring detects an abnormal response to exercise and guides adjusting or stopping it. To be validated."
     },
     {
      "fr": "L'échelle de Borg (perception de l'effort) sert à...",
      "en": "The Borg scale (rating of perceived exertion) is used to...",
      "choices": [
       { "fr": "Estimer l'intensité perçue d'un effort par le patient", "en": "Estimate the patient's perceived intensity of an effort", "correct": true },
       { "fr": "Mesurer l'amplitude du coude", "en": "Measure elbow range" },
       { "fr": "Coter la douleur au repos seulement", "en": "Rate pain at rest only" },
       { "fr": "Compter les globules rouges", "en": "Count red blood cells" }
      ],
      "explFr": "L'échelle de Borg quantifie l'effort ressenti ; utile pour doser l'intensité, surtout en réadaptation cardiorespiratoire. À valider.",
      "explEn": "The Borg scale quantifies perceived exertion; useful to dose intensity, especially in cardiorespiratory rehab. To be validated."
     },
     {
      "fr": "Vrai ou faux : documenter une évaluation de façon claire, datée et objective est essentiel pour la continuité des soins et le suivi.",
      "en": "True or false: documenting an assessment clearly, dated and objectively is essential for continuity of care and follow-up.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Une documentation claire et datée permet à tout intervenant de comprendre l'état du patient et d'assurer le suivi.",
      "explEn": "Clear, dated documentation lets any clinician understand the patient's status and ensure follow-up."
     },
     {
      "fr": "La méthode SOAP (Subjectif, Objectif, Analyse, Plan) est surtout utilisée pour...",
      "en": "The SOAP method (Subjective, Objective, Assessment, Plan) is mainly used to...",
      "choices": [
       { "fr": "Structurer la note clinique au dossier", "en": "Structure the clinical note in the record", "correct": true },
       { "fr": "Calculer la fréquence cardiaque maximale", "en": "Calculate maximal heart rate" },
       { "fr": "Mesurer l'amplitude articulaire", "en": "Measure joint range" },
       { "fr": "Choisir la couleur du dossier", "en": "Choose the file color" }
      ],
      "explFr": "SOAP organise la note en subjectif, objectif, analyse et plan ; cela structure le raisonnement et la communication. À valider.",
      "explEn": "SOAP organizes the note into subjective, objective, assessment and plan; this structures reasoning and communication. To be validated."
     },
     {
      "fr": "Comparer une mesure de circonférence à un repère fixe, à quelques jours d'intervalle, permet de suivre...",
      "en": "Comparing a circumference measurement at a fixed landmark, a few days apart, allows you to track...",
      "choices": [
       { "fr": "L'évolution de l'œdème ou de l'atrophie", "en": "The change in edema or atrophy", "correct": true },
       { "fr": "La couleur des yeux", "en": "Eye color" },
       { "fr": "Le groupe sanguin", "en": "The blood type" },
       { "fr": "La glycémie", "en": "Blood sugar" }
      ],
      "explFr": "En mesurant toujours au même repère, on peut objectiver la variation d'œdème (enflure) ou d'atrophie dans le temps.",
      "explEn": "By always measuring at the same landmark, one can objectify changes in edema or atrophy over time."
     },
     {
      "fr": "Vrai ou faux : un outil de mesure peut être fiable (résultats reproductibles) sans être valide (mesurer réellement la bonne chose).",
      "en": "True or false: a measurement tool can be reliable (reproducible results) without being valid (actually measuring the right thing).",
      "type": "tf",
      "isTrue": true,
      "explFr": "Fiabilité et validité sont distinctes : un outil peut donner des résultats constants mais qui ne reflètent pas ce qu'on veut mesurer.",
      "explEn": "Reliability and validity are distinct: a tool can give consistent results that still do not reflect what one wants to measure."
     },
     {
      "fr": "Associe chaque section de la note SOAP à son contenu.",
      "en": "Match each section of the SOAP note to its content.",
      "type": "match",
      "pairs": [
       { "term_fr": "S (subjectif)", "term_en": "S (subjective)", "def_fr": "Ce que rapporte le patient", "def_en": "What the patient reports" },
       { "term_fr": "O (objectif)", "term_en": "O (objective)", "def_fr": "Mesures et observations", "def_en": "Measurements and observations" },
       { "term_fr": "A (analyse)", "term_en": "A (assessment)", "def_fr": "Interprétation et hypothèses", "def_en": "Interpretation and hypotheses" },
       { "term_fr": "P (plan)", "term_en": "P (plan)", "def_fr": "Interventions et suivi", "def_en": "Interventions and follow-up" }
      ],
      "explFr": "Chaque section de la note SOAP a un rôle précis ; les distinguer clarifie la rédaction au dossier. À valider.",
      "explEn": "Each SOAP section has a specific role; distinguishing them clarifies charting. To be validated."
     },
     {
      "fr": "Pendant un exercice debout, un patient devient pâle, étourdi, et sa pression chute en se relevant. La meilleure conduite immédiate est de...",
      "en": "During a standing exercise, a patient becomes pale, dizzy, and their blood pressure drops on standing. The best immediate action is to...",
      "type": "scenario",
      "choices": [
       { "fr": "Cesser l'effort, l'asseoir ou l'allonger en sécurité, surveiller les signes vitaux et documenter", "en": "Stop the effort, sit or lie them down safely, monitor vital signs and document", "correct": true },
       { "fr": "Augmenter l'intensité de l'exercice", "en": "Increase the exercise intensity" },
       { "fr": "Ignorer les symptômes", "en": "Ignore the symptoms" },
       { "fr": "Le laisser seul debout", "en": "Leave them standing alone" }
      ],
      "explFr": "Devant des signes d'hypotension orthostatique, on arrête, on sécurise (assis/couché), on surveille et on consigne l'épisode. À valider.",
      "explEn": "Facing signs of orthostatic hypotension, stop, make safe (sit/lie), monitor and record the episode. To be validated."
     },
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
      "fr": "En phase aiguë (blessure récente, inflammation), on privilégie généralement...",
      "en": "In the acute phase (recent injury, inflammation), one generally favors...",
      "choices": [
       { "fr": "Le froid (glace) plutôt que la chaleur", "en": "Cold (ice) rather than heat", "correct": true },
       { "fr": "La chaleur profonde plutôt que le froid", "en": "Deep heat rather than cold" },
       { "fr": "Aucune précaution particulière", "en": "No particular precaution" },
       { "fr": "Un renforcement maximal immédiat", "en": "Immediate maximal strengthening" }
      ],
      "explFr": "En phase aiguë, le froid aide à limiter douleur et inflammation ; la chaleur est plutôt réservée aux phases plus tardives. À valider.",
      "explEn": "In the acute phase, cold helps limit pain and inflammation; heat is rather reserved for later phases. To be validated."
     },
     {
      "fr": "La durée habituelle d'une application de glace se compte en...",
      "en": "The usual duration of an ice application is measured in...",
      "choices": [
       { "fr": "Minutes (avec une barrière sur la peau)", "en": "Minutes (with a barrier on the skin)", "correct": true },
       { "fr": "Heures continues", "en": "Continuous hours" },
       { "fr": "Journées entières", "en": "Whole days" },
       { "fr": "Secondes seulement", "en": "Seconds only" }
      ],
      "explFr": "On applique la glace quelques minutes (typiquement une dizaine à une vingtaine), avec une barrière, en surveillant la peau. À valider.",
      "explEn": "Ice is applied for a few minutes (typically about ten to twenty), with a barrier, while watching the skin. To be validated."
     },
     {
      "fr": "Vrai ou faux : la chaleur est souvent utilisée en phase chronique pour assouplir les tissus avant les exercices ou les étirements.",
      "en": "True or false: heat is often used in the chronic phase to loosen tissues before exercise or stretching.",
      "type": "tf",
      "isTrue": true,
      "explFr": "En phase chronique, la chaleur détend et assouplit les tissus, ce qui peut faciliter le mouvement et les étirements. À valider.",
      "explEn": "In the chronic phase, heat relaxes and loosens tissues, which can ease movement and stretching. To be validated."
     },
     {
      "fr": "Une compresse chaude humide (type hydrocollateur) est un exemple de...",
      "en": "A moist hot pack (hydrocollator type) is an example of...",
      "choices": [
       { "fr": "Thermothérapie superficielle", "en": "Superficial thermotherapy", "correct": true },
       { "fr": "Cryothérapie", "en": "Cryotherapy" },
       { "fr": "Électrothérapie", "en": "Electrotherapy" },
       { "fr": "Thérapie manuelle", "en": "Manual therapy" }
      ],
      "explFr": "La compresse chaude humide réchauffe les tissus de surface (thermothérapie superficielle) ; les ultrasons chauffent plus en profondeur. À valider.",
      "explEn": "A moist hot pack heats surface tissues (superficial thermotherapy); ultrasound heats deeper. To be validated."
     },
     {
      "fr": "La compression (bandage) après une blessure aiguë vise surtout à...",
      "en": "Compression (bandaging) after an acute injury mainly aims to...",
      "choices": [
       { "fr": "Limiter l'œdème (enflure)", "en": "Limit edema (swelling)", "correct": true },
       { "fr": "Augmenter la douleur", "en": "Increase pain" },
       { "fr": "Réchauffer les tissus profonds", "en": "Heat the deep tissues" },
       { "fr": "Renforcer le muscle", "en": "Strengthen the muscle" }
      ],
      "explFr": "La compression aide à contenir l'œdème après une blessure aiguë ; elle fait partie du protocole GREC/RICE. À valider.",
      "explEn": "Compression helps contain swelling after an acute injury; it is part of the RICE protocol. To be validated."
     },
     {
      "fr": "Vrai ou faux : élever le membre blessé au-dessus du niveau du cœur aide à réduire l'œdème.",
      "en": "True or false: elevating the injured limb above heart level helps reduce swelling.",
      "type": "tf",
      "isTrue": true,
      "explFr": "L'élévation favorise le retour veineux et lymphatique, ce qui aide à limiter l'accumulation de liquide (œdème). À valider.",
      "explEn": "Elevation promotes venous and lymphatic return, helping to limit fluid buildup (edema). To be validated."
     },
     {
      "fr": "Après une application de froid, on surveille la peau pour prévenir...",
      "en": "After a cold application, the skin is monitored to prevent...",
      "choices": [
       { "fr": "Une lésion cutanée par le froid (pâleur, blanchiment, engourdissement excessif)", "en": "A cold-induced skin injury (pallor, blanching, excessive numbness)", "correct": true },
       { "fr": "Une amélioration de la vision", "en": "An improvement in vision" },
       { "fr": "Une hausse de la glycémie", "en": "A rise in blood sugar" },
       { "fr": "Une accélération de la digestion", "en": "Faster digestion" }
      ],
      "explFr": "Un froid trop intense ou trop prolongé peut léser la peau ; pâleur marquée, blanchiment ou douleur imposent d'arrêter. À valider.",
      "explEn": "Cold that is too intense or prolonged can damage the skin; marked pallor, blanching or pain mean stopping. To be validated."
     },
     {
      "fr": "Le massage thérapeutique fait partie des interventions de...",
      "en": "Therapeutic massage is part of interventions classed as...",
      "choices": [
       { "fr": "Thérapie manuelle", "en": "Manual therapy", "correct": true },
       { "fr": "Électrothérapie", "en": "Electrotherapy" },
       { "fr": "Cryothérapie", "en": "Cryotherapy" },
       { "fr": "Hydrothérapie", "en": "Hydrotherapy" }
      ],
      "explFr": "Le massage est une technique de thérapie manuelle (agir avec les mains), distincte des agents physiques comme le froid ou l'électricité. À valider.",
      "explEn": "Massage is a manual therapy technique (using the hands), distinct from physical agents like cold or electricity. To be validated."
     },
     {
      "fr": "Associe chaque élément du protocole GREC / RICE à son but.",
      "en": "Match each element of the RICE protocol to its purpose.",
      "type": "match",
      "pairs": [
       { "term_fr": "Glace", "term_en": "Ice", "def_fr": "Réduire douleur et inflammation", "def_en": "Reduce pain and inflammation" },
       { "term_fr": "Repos relatif", "term_en": "Relative rest", "def_fr": "Protéger la structure lésée", "def_en": "Protect the injured structure" },
       { "term_fr": "Élévation", "term_en": "Elevation", "def_fr": "Réduire l'œdème", "def_en": "Reduce swelling" },
       { "term_fr": "Compression", "term_en": "Compression", "def_fr": "Limiter l'enflure", "def_en": "Limit swelling" }
      ],
      "explFr": "Le protocole GREC/RICE combine plusieurs mesures pour la phase aiguë ; les recommandations évoluent (mouvement précoce). À valider.",
      "explEn": "The RICE protocol combines several acute-phase measures; recommendations are evolving (early movement). To be validated."
     },
     {
      "fr": "Vrai ou faux : on interpose toujours une barrière (linge) entre la glace et la peau et on limite la durée d'application.",
      "en": "True or false: a barrier (cloth) is always placed between the ice and the skin, and the duration is limited.",
      "type": "tf",
      "isTrue": true,
      "explFr": "La barrière et la limite de durée préviennent la lésion cutanée par le froid (gelure). À valider.",
      "explEn": "The barrier and time limit prevent a cold-induced skin injury (frostbite). To be validated."
     },
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
      "fr": "Un TENS réglé à haute fréquence agit surtout, selon la théorie du portillon, en...",
      "en": "A high-frequency TENS mainly acts, per the gate control theory, by...",
      "choices": [
       { "fr": "Stimulant des fibres non douloureuses pour « fermer la porte » à la douleur", "en": "Stimulating non-painful fibers to 'close the gate' to pain", "correct": true },
       { "fr": "Chauffant les tissus en profondeur", "en": "Heating the tissues deeply" },
       { "fr": "Refroidissant le tendon", "en": "Cooling the tendon" },
       { "fr": "Renforçant directement le muscle", "en": "Directly strengthening the muscle" }
      ],
      "explFr": "Selon la théorie du portillon, l'activation de fibres tactiles non douloureuses peut réduire la transmission des signaux de douleur. À valider.",
      "explEn": "Per gate control theory, activating non-painful touch fibers can reduce the transmission of pain signals. To be validated."
     },
     {
      "fr": "Les ultrasons thérapeutiques utilisés en mode continu produisent surtout un effet...",
      "en": "Therapeutic ultrasound used in continuous mode mainly produces an effect that is...",
      "choices": [
       { "fr": "Thermique (échauffement des tissus profonds)", "en": "Thermal (heating of deep tissues)", "correct": true },
       { "fr": "De refroidissement", "en": "Cooling" },
       { "fr": "Uniquement sonore audible", "en": "Only audible sound" },
       { "fr": "Uniquement lumineux", "en": "Only light" }
      ],
      "explFr": "En mode continu, l'ultrason génère surtout un échauffement des tissus profonds ; le mode pulsé accentue l'effet mécanique. À valider.",
      "explEn": "In continuous mode, ultrasound mainly produces deep-tissue heating; pulsed mode emphasizes the mechanical effect. To be validated."
     },
     {
      "fr": "Vrai ou faux : lors de l'application d'ultrasons, on déplace continuellement la tête de traitement pour éviter une surchauffe localisée.",
      "en": "True or false: during ultrasound, the treatment head is moved continuously to avoid localized overheating.",
      "type": "tf",
      "isTrue": true,
      "explFr": "On garde la tête d'ultrason en mouvement pour répartir l'énergie et éviter de concentrer trop de chaleur en un point. À valider.",
      "explEn": "The ultrasound head is kept moving to spread the energy and avoid concentrating too much heat at one spot. To be validated."
     },
     {
      "fr": "Un gel de couplage est nécessaire aux ultrasons parce que...",
      "en": "A coupling gel is needed for ultrasound because...",
      "choices": [
       { "fr": "Les ondes se propagent mal dans l'air (le gel assure le contact et la transmission)", "en": "The waves travel poorly through air (the gel ensures contact and transmission)", "correct": true },
       { "fr": "Il refroidit la peau", "en": "It cools the skin" },
       { "fr": "Il colore la peau", "en": "It colors the skin" },
       { "fr": "Il remplace le consentement", "en": "It replaces consent" }
      ],
      "explFr": "Le gel élimine l'air entre la tête et la peau, permettant aux ultrasons de bien pénétrer les tissus. À valider.",
      "explEn": "The gel removes air between the head and the skin, letting the ultrasound penetrate the tissues well. To be validated."
     },
     {
      "fr": "La NMES (électrostimulation neuromusculaire) peut être utile pour...",
      "en": "NMES (neuromuscular electrical stimulation) can be useful to...",
      "choices": [
       { "fr": "Aider à réactiver un muscle inhibé (ex. quadriceps après une chirurgie du genou)", "en": "Help reactivate an inhibited muscle (e.g., quadriceps after knee surgery)", "correct": true },
       { "fr": "Refroidir une articulation", "en": "Cool a joint" },
       { "fr": "Mesurer l'amplitude", "en": "Measure range of motion" },
       { "fr": "Remplacer l'anamnèse", "en": "Replace history-taking" }
      ],
      "explFr": "La NMES provoque une contraction par un courant ; elle peut aider à réactiver un muscle inhibé, en complément de l'exercice actif. À valider.",
      "explEn": "NMES elicits a contraction with a current; it can help reactivate an inhibited muscle, alongside active exercise. To be validated."
     },
     {
      "fr": "Vrai ou faux : la chaleur avant un étirement peut faciliter le gain de souplesse, tandis que le froid après l'effort peut soulager la douleur.",
      "en": "True or false: heat before stretching can aid flexibility gains, while cold after exertion can relieve pain.",
      "type": "tf",
      "isTrue": true,
      "explFr": "La chaleur assouplit les tissus (utile avant l'étirement) et le froid a un effet antalgique (utile après l'effort). À valider.",
      "explEn": "Heat loosens tissues (useful before stretching) and cold is analgesic (useful after exertion). To be validated."
     },
     {
      "fr": "L'hydrothérapie en piscine chaude combine souvent deux effets :",
      "en": "Warm-pool hydrotherapy often combines two effects:",
      "choices": [
       { "fr": "La flottabilité (allègement) et la chaleur (détente)", "en": "Buoyancy (offloading) and heat (relaxation)", "correct": true },
       { "fr": "Le refroidissement et l'immobilisation", "en": "Cooling and immobilization" },
       { "fr": "L'électricité et la traction", "en": "Electricity and traction" },
       { "fr": "La compression et le vide", "en": "Compression and vacuum" }
      ],
      "explFr": "En piscine chaude, la flottabilité allège les articulations et la chaleur de l'eau détend ; l'eau offre aussi une résistance graduable. À valider.",
      "explEn": "In a warm pool, buoyancy offloads the joints and the warmth relaxes; water also offers adjustable resistance. To be validated."
     },
     {
      "fr": "La résistance de l'eau lors d'un exercice en piscine...",
      "en": "Water resistance during pool exercise...",
      "choices": [
       { "fr": "Augmente avec la vitesse du mouvement (résistance graduable)", "en": "Increases with movement speed (adjustable resistance)", "correct": true },
       { "fr": "Est nulle en tout temps", "en": "Is zero at all times" },
       { "fr": "Diminue quand on va plus vite", "en": "Decreases when you go faster" },
       { "fr": "Ne dépend d'aucun facteur", "en": "Depends on no factor" }
      ],
      "explFr": "Plus on bouge vite dans l'eau, plus la résistance augmente ; on peut donc doser l'effort sans poids externes. À valider.",
      "explEn": "The faster you move in water, the greater the resistance; effort can thus be dosed without external weights. To be validated."
     },
     {
      "fr": "Associe chaque modalité à son objectif principal.",
      "en": "Match each modality to its main goal.",
      "type": "match",
      "pairs": [
       { "term_fr": "NMES", "term_en": "NMES", "def_fr": "Provoquer une contraction musculaire", "def_en": "Elicit a muscle contraction" },
       { "term_fr": "Ultrasons continus", "term_en": "Continuous ultrasound", "def_fr": "Chaleur profonde", "def_en": "Deep heat" },
       { "term_fr": "TENS", "term_en": "TENS", "def_fr": "Soulager la douleur", "def_en": "Relieve pain" },
       { "term_fr": "Hydrothérapie", "term_en": "Hydrotherapy", "def_fr": "Exercice allégé (flottabilité)", "def_en": "Offloaded exercise (buoyancy)" }
      ],
      "explFr": "Chaque modalité vise un objectif particulier ; le choix dépend du but clinique et des contre-indications. À valider.",
      "explEn": "Each modality targets a particular goal; the choice depends on the clinical aim and contraindications. To be validated."
     },
     {
      "fr": "Vous voulez réduire la douleur d'un patient avant une séance d'exercices, sans le renforcer directement. Parmi ces choix, le plus cohérent est...",
      "en": "You want to reduce a patient's pain before an exercise session, without directly strengthening them. Among these choices, the most consistent is...",
      "type": "scenario",
      "choices": [
       { "fr": "Le TENS (électroanalgésie), en complément de l'exercice", "en": "TENS (electroanalgesia), alongside exercise", "correct": true },
       { "fr": "La NMES pour renforcer immédiatement", "en": "NMES to strengthen immediately" },
       { "fr": "Aucune intervention et un renforcement maximal", "en": "No intervention and maximal strengthening" },
       { "fr": "Une immobilisation totale", "en": "Complete immobilization" }
      ],
      "explFr": "Pour un effet antalgique avant l'exercice, le TENS est cohérent ; il complète l'exercice actif sans le remplacer. À valider.",
      "explEn": "For an analgesic effect before exercise, TENS is consistent; it complements active exercise without replacing it. To be validated."
     },
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
      "fr": "Avant toute modalité thermique ou électrique, une vérification essentielle est...",
      "en": "Before any thermal or electrical modality, an essential check is...",
      "choices": [
       { "fr": "L'intégrité de la sensibilité et de la peau de la région traitée", "en": "The integrity of sensation and skin over the treated area", "correct": true },
       { "fr": "La couleur des yeux du patient", "en": "The patient's eye color" },
       { "fr": "La taille des chaussures", "en": "The shoe size" },
       { "fr": "Le lieu de naissance", "en": "The place of birth" }
      ],
      "explFr": "Une sensibilité ou une peau altérée expose à des brûlures ou lésions non ressenties ; on vérifie avant d'appliquer chaud, froid ou courant. À valider.",
      "explEn": "Impaired sensation or skin risks unnoticed burns or injuries; check before applying heat, cold or current. To be validated."
     },
     {
      "fr": "Vrai ou faux : appliquer de la chaleur sur une région à sensibilité diminuée augmente le risque de brûlure non ressentie.",
      "en": "True or false: applying heat to an area with reduced sensation increases the risk of an unnoticed burn.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Sans sensation normale, le patient peut ne pas percevoir une chaleur excessive ; le risque de brûlure augmente, d'où la prudence. À valider.",
      "explEn": "Without normal sensation, the patient may not feel excessive heat; burn risk rises, hence the caution. To be validated."
     },
     {
      "fr": "L'électrothérapie est généralement contre-indiquée...",
      "en": "Electrotherapy is generally contraindicated...",
      "choices": [
       { "fr": "Au-dessus d'un stimulateur cardiaque ou sur une zone de thrombose", "en": "Over a cardiac pacemaker or over an area of thrombosis", "correct": true },
       { "fr": "Sur un gros muscle sain, en phase chronique", "en": "Over a large healthy muscle, in the chronic phase" },
       { "fr": "Chez tout patient sans exception", "en": "In every patient without exception" },
       { "fr": "Uniquement le matin", "en": "Only in the morning" }
      ],
      "explFr": "Le courant est à éviter près d'un pacemaker et sur une zone de thrombose (risque de mobiliser un caillot), entre autres. À valider.",
      "explEn": "Current is avoided near a pacemaker and over an area of thrombosis (risk of dislodging a clot), among others. To be validated."
     },
     {
      "fr": "On évite habituellement d'appliquer des ultrasons...",
      "en": "Ultrasound is usually avoided...",
      "choices": [
       { "fr": "Sur les yeux, sur l'utérus d'une femme enceinte, sur une tumeur ou une plaque de croissance active", "en": "Over the eyes, over a pregnant uterus, over a tumor or an active growth plate", "correct": true },
       { "fr": "Sur une cicatrice ancienne et stable", "en": "Over an old, stable scar" },
       { "fr": "Sur un muscle sain en phase chronique", "en": "Over a healthy muscle in the chronic phase" },
       { "fr": "Sur une articulation raide chronique", "en": "Over a chronically stiff joint" }
      ],
      "explFr": "Les ultrasons ont plusieurs contre-indications (yeux, grossesse sur l'abdomen/bas du dos, tumeur, cartilage de croissance...). À valider.",
      "explEn": "Ultrasound has several contraindications (eyes, pregnancy over the abdomen/low back, tumor, growth plate...). To be validated."
     },
     {
      "fr": "Vrai ou faux : le froid est à utiliser avec prudence chez une personne présentant des troubles circulatoires ou une hypersensibilité au froid.",
      "en": "True or false: cold should be used cautiously in a person with circulatory disorders or cold hypersensitivity.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Troubles circulatoires et hypersensibilité au froid sont des précautions/contre-indications relatives à la cryothérapie. À valider.",
      "explEn": "Circulatory disorders and cold hypersensitivity are precautions/relative contraindications to cryotherapy. To be validated."
     },
     {
      "fr": "Devant une rougeur cutanée anormale ou une douleur inhabituelle pendant une modalité, la conduite est de...",
      "en": "Facing abnormal skin redness or unusual pain during a modality, the course of action is to...",
      "choices": [
       { "fr": "Cesser l'application, examiner la peau et documenter", "en": "Stop the application, examine the skin and document", "correct": true },
       { "fr": "Poursuivre en augmentant l'intensité", "en": "Continue while increasing the intensity" },
       { "fr": "Ignorer et terminer la séance", "en": "Ignore it and finish the session" },
       { "fr": "Prolonger l'application", "en": "Prolong the application" }
      ],
      "explFr": "Un signe cutané anormal ou une douleur inhabituelle imposent d'arrêter, d'inspecter la peau et de consigner l'incident. À valider.",
      "explEn": "An abnormal skin sign or unusual pain requires stopping, inspecting the skin and recording the incident. To be validated."
     },
     {
      "fr": "Une modalité est choisie en fonction de...",
      "en": "A modality is chosen according to...",
      "choices": [
       { "fr": "L'objectif clinique, la phase de guérison et les contre-indications du patient", "en": "The clinical goal, the healing phase and the patient's contraindications", "correct": true },
       { "fr": "La couleur de l'appareil", "en": "The color of the device" },
       { "fr": "La préférence du fabricant seulement", "en": "The manufacturer's preference only" },
       { "fr": "Le hasard", "en": "Random chance" }
      ],
      "explFr": "Le choix d'une modalité découle de l'objectif, de la phase de guérison et de la vérification des contre-indications. À valider.",
      "explEn": "Choosing a modality follows from the goal, the healing phase and checking contraindications. To be validated."
     },
     {
      "fr": "Vrai ou faux : les modalités passives (chaud, froid, TENS) sont des compléments et ne remplacent pas l'exercice actif et l'éducation du patient.",
      "en": "True or false: passive modalities (heat, cold, TENS) are complements and do not replace active exercise and patient education.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Les modalités passives soutiennent le traitement, mais l'exercice actif et l'éducation restent au cœur de la réadaptation.",
      "explEn": "Passive modalities support treatment, but active exercise and education remain central to rehabilitation."
     },
     {
      "fr": "Associe chaque situation à la précaution appropriée.",
      "en": "Match each situation to the appropriate precaution.",
      "type": "match",
      "pairs": [
       { "term_fr": "Sensibilité altérée", "term_en": "Impaired sensation", "def_fr": "Éviter chaleur/froid intenses", "def_en": "Avoid intense heat/cold" },
       { "term_fr": "Stimulateur cardiaque", "term_en": "Cardiac pacemaker", "def_fr": "Éviter l'électrothérapie thoracique", "def_en": "Avoid chest electrotherapy" },
       { "term_fr": "Grossesse", "term_en": "Pregnancy", "def_fr": "Éviter certaines modalités sur l'abdomen/bas du dos", "def_en": "Avoid some modalities over the abdomen/low back" },
       { "term_fr": "Peau lésée", "term_en": "Broken skin", "def_fr": "Protéger / éviter l'application directe", "def_en": "Protect / avoid direct application" }
      ],
      "explFr": "Associer chaque situation à sa précaution est un réflexe de sécurité avant toute modalité. À valider.",
      "explEn": "Linking each situation to its precaution is a safety habit before any modality. To be validated."
     },
     {
      "fr": "Un patient porteur d'un stimulateur cardiaque demande un TENS pour une douleur au haut du dos. La conduite prudente est de...",
      "en": "A patient with a cardiac pacemaker asks for TENS for upper-back pain. The prudent course of action is to...",
      "type": "scenario",
      "choices": [
       { "fr": "Éviter l'électrothérapie dans cette région et privilégier une autre approche, après vérification", "en": "Avoid electrotherapy in that region and prefer another approach, after checking", "correct": true },
       { "fr": "Appliquer le TENS à intensité maximale", "en": "Apply TENS at maximal intensity" },
       { "fr": "Ignorer le pacemaker", "en": "Ignore the pacemaker" },
       { "fr": "Poser le TENS directement sur la poitrine", "en": "Place the TENS directly on the chest" }
      ],
      "explFr": "Un pacemaker est une contre-indication au courant dans cette région ; on choisit une autre approche après vérification. À valider.",
      "explEn": "A pacemaker contraindicates current in that region; choose another approach after checking. To be validated."
     },
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
      "fr": "Le « plan de traitement » découle directement...",
      "en": "The 'treatment plan' follows directly from...",
      "choices": [
       { "fr": "Des objectifs fixés à partir de l'évaluation", "en": "The goals set from the assessment", "correct": true },
       { "fr": "Du hasard", "en": "Random chance" },
       { "fr": "Du coût de la séance", "en": "The cost of the session" },
       { "fr": "De la couleur du dossier", "en": "The color of the file" }
      ],
      "explFr": "Le plan de traitement traduit les objectifs (issus de l'évaluation) en interventions concrètes et priorisées.",
      "explEn": "The treatment plan turns the goals (from the assessment) into concrete, prioritized interventions."
     },
     {
      "fr": "Un objectif à court terme se distingue d'un objectif à long terme surtout par...",
      "en": "A short-term goal differs from a long-term goal mainly by...",
      "choices": [
       { "fr": "Son échéance (délai plus rapproché)", "en": "Its deadline (a nearer timeframe)", "correct": true },
       { "fr": "Le fait qu'il ne soit jamais mesurable", "en": "Being never measurable" },
       { "fr": "Son absence totale de lien avec le patient", "en": "Having no link to the patient" },
       { "fr": "Le fait qu'il soit toujours impossible", "en": "Being always impossible" }
      ],
      "explFr": "Les objectifs à court terme jalonnent, à échéance rapprochée, la route vers les objectifs à long terme.",
      "explEn": "Short-term goals are near-term milestones on the road toward the long-term goals."
     },
     {
      "fr": "Vrai ou faux : le patient devrait participer au choix de ses objectifs (approche centrée sur le patient).",
      "en": "True or false: the patient should take part in setting their own goals (patient-centered approach).",
      "type": "tf",
      "isTrue": true,
      "explFr": "Impliquer le patient dans ses objectifs améliore la pertinence du plan, la motivation et l'adhésion au traitement.",
      "explEn": "Involving the patient in goal-setting improves the plan's relevance, motivation and treatment adherence."
     },
     {
      "fr": "Le « pronostic » en réadaptation correspond à...",
      "en": "The 'prognosis' in rehabilitation refers to...",
      "choices": [
       { "fr": "Une prévision de l'évolution attendue et du potentiel de récupération", "en": "A prediction of the expected course and recovery potential", "correct": true },
       { "fr": "Le montant de la facture", "en": "The invoice amount" },
       { "fr": "La liste des exercices seulement", "en": "The exercise list only" },
       { "fr": "L'adresse du patient", "en": "The patient's address" }
      ],
      "explFr": "Le pronostic estime jusqu'où et en combien de temps le patient pourrait récupérer, en fonction de plusieurs facteurs. À valider.",
      "explEn": "The prognosis estimates how far and how fast the patient may recover, based on several factors. To be validated."
     },
     {
      "fr": "L'éducation du patient (expliquer sa condition, ses exercices, les précautions) sert surtout à...",
      "en": "Patient education (explaining the condition, exercises, precautions) mainly serves to...",
      "choices": [
       { "fr": "Favoriser l'adhésion, l'autonomie et la sécurité", "en": "Foster adherence, autonomy and safety", "correct": true },
       { "fr": "Allonger inutilement la séance", "en": "Needlessly lengthen the session" },
       { "fr": "Remplacer l'évaluation", "en": "Replace the assessment" },
       { "fr": "Effrayer le patient", "en": "Frighten the patient" }
      ],
      "explFr": "Un patient bien informé comprend son plan, participe activement et applique les précautions ; l'éducation est une intervention à part entière.",
      "explEn": "A well-informed patient understands the plan, participates actively and applies precautions; education is a full intervention."
     },
     {
      "fr": "Vrai ou faux : un programme d'exercices à domicile complète les séances et favorise les progrès entre les rendez-vous.",
      "en": "True or false: a home exercise program complements sessions and supports progress between appointments.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Le programme à domicile prolonge le travail entre les séances ; sa simplicité et sa clarté favorisent l'observance.",
      "explEn": "The home program extends the work between sessions; its simplicity and clarity support adherence."
     },
     {
      "fr": "Réévaluer périodiquement le patient permet surtout de...",
      "en": "Periodically re-assessing the patient mainly allows you to...",
      "choices": [
       { "fr": "Vérifier les progrès et ajuster le plan", "en": "Check progress and adjust the plan", "correct": true },
       { "fr": "Éviter tout changement", "en": "Avoid any change" },
       { "fr": "Facturer davantage", "en": "Bill more" },
       { "fr": "Remplacer le consentement", "en": "Replace consent" }
      ],
      "explFr": "La réévaluation mesure l'évolution et guide la poursuite, la modification ou l'arrêt des interventions.",
      "explEn": "Re-assessment measures change and guides continuing, modifying or stopping interventions."
     },
     {
      "fr": "Le « congé » (fin du suivi) en physiothérapie est approprié lorsque...",
      "en": "'Discharge' (end of follow-up) in physiotherapy is appropriate when...",
      "choices": [
       { "fr": "Les objectifs sont atteints ou le patient est autonome (ou orienté ailleurs au besoin)", "en": "Goals are met or the patient is independent (or referred elsewhere as needed)", "correct": true },
       { "fr": "Dès la première séance, systématiquement", "en": "After the first session, systematically" },
       { "fr": "Uniquement si le patient déménage", "en": "Only if the patient moves away" },
       { "fr": "Jamais, en aucun cas", "en": "Never, under any circumstances" }
      ],
      "explFr": "Le congé se planifie quand les objectifs sont atteints ou que le patient peut poursuivre seul, parfois avec un programme d'entretien. À valider.",
      "explEn": "Discharge is planned when goals are met or the patient can continue independently, sometimes with a maintenance program. To be validated."
     },
     {
      "fr": "Associe chaque terme de la démarche clinique à sa description.",
      "en": "Match each clinical-process term to its description.",
      "type": "match",
      "pairs": [
       { "term_fr": "Objectif", "term_en": "Goal", "def_fr": "Résultat visé et mesurable", "def_en": "Targeted, measurable outcome" },
       { "term_fr": "Intervention", "term_en": "Intervention", "def_fr": "Moyen utilisé pour l'atteindre", "def_en": "Means used to reach it" },
       { "term_fr": "Réévaluation", "term_en": "Re-assessment", "def_fr": "Mesure des progrès", "def_en": "Measuring progress" },
       { "term_fr": "Congé", "term_en": "Discharge", "def_fr": "Fin du suivi", "def_en": "End of follow-up" }
      ],
      "explFr": "Situer chaque terme dans la démarche clarifie la logique du plan, de l'objectif au congé.",
      "explEn": "Placing each term within the process clarifies the plan's logic, from goal to discharge."
     },
     {
      "fr": "Vrai ou faux : la démarche clinique s'appuie sur les données probantes, l'expérience clinique et les préférences du patient.",
      "en": "True or false: the clinical process draws on evidence, clinical experience and patient preferences.",
      "type": "tf",
      "isTrue": true,
      "explFr": "La pratique fondée sur les données probantes combine la recherche, le jugement clinique et les valeurs du patient. À valider.",
      "explEn": "Evidence-based practice combines research, clinical judgment and the patient's values. To be validated."
     },
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
      "fr": "Le principe FITT décrit les paramètres d'une prescription d'exercice : Fréquence, Intensité, Temps (durée) et...",
      "en": "The FITT principle describes exercise prescription parameters: Frequency, Intensity, Time (duration) and...",
      "choices": [
       { "fr": "Type (nature de l'exercice)", "en": "Type (kind of exercise)", "correct": true },
       { "fr": "Température de la pièce", "en": "Room temperature" },
       { "fr": "Talent inné", "en": "Innate talent" },
       { "fr": "Tarif de la séance", "en": "Session fee" }
      ],
      "explFr": "FITT = Fréquence, Intensité, Temps, Type ; ces paramètres cadrent le dosage d'un exercice. À valider.",
      "explEn": "FITT = Frequency, Intensity, Time, Type; these parameters frame the dosage of an exercise. To be validated."
     },
     {
      "fr": "Pour améliorer l'endurance cardiorespiratoire, on privilégie des exercices...",
      "en": "To improve cardiorespiratory endurance, one favors exercises that are...",
      "choices": [
       { "fr": "Aérobies, prolongés, à intensité modérée, répétés régulièrement", "en": "Aerobic, prolonged, moderate-intensity, repeated regularly", "correct": true },
       { "fr": "Très brefs et explosifs seulement", "en": "Very brief and explosive only" },
       { "fr": "Uniquement isométriques et immobiles", "en": "Only isometric and still" },
       { "fr": "Sans aucune régularité", "en": "With no regularity at all" }
      ],
      "explFr": "L'endurance se développe par un travail aérobie régulier et prolongé, à intensité modérée, selon la tolérance. À valider.",
      "explEn": "Endurance develops through regular, prolonged aerobic work at moderate intensity, as tolerated. To be validated."
     },
     {
      "fr": "Vrai ou faux : pour gagner en amplitude articulaire, les étirements et la mobilisation sont des interventions cohérentes.",
      "en": "True or false: to gain joint range, stretching and mobilization are consistent interventions.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Étirements et mobilisations visent le gain d'amplitude ; ils s'adaptent à la structure limitante et à la tolérance. À valider.",
      "explEn": "Stretching and mobilizations target range gains; they adapt to the limiting structure and to tolerance. To be validated."
     },
     {
      "fr": "Un exercice en chaîne cinétique fermée (ex. squat, pied au sol) se caractérise par...",
      "en": "A closed kinetic chain exercise (e.g., squat, foot on the floor) is characterized by...",
      "choices": [
       { "fr": "Une extrémité fixée au sol/support, sollicitant plusieurs articulations ensemble", "en": "A fixed distal end on the ground/support, working several joints together", "correct": true },
       { "fr": "Une extrémité distale toujours libre dans l'air", "en": "A distal end always free in the air" },
       { "fr": "Aucun mouvement possible", "en": "No movement possible" },
       { "fr": "L'absence totale de muscles sollicités", "en": "No muscles involved at all" }
      ],
      "explFr": "En chaîne fermée, l'extrémité est fixée (pied au sol) et plusieurs articulations travaillent ensemble (ex. squat). À valider.",
      "explEn": "In a closed chain, the distal end is fixed (foot on the floor) and several joints work together (e.g., squat). To be validated."
     },
     {
      "fr": "Un exercice en chaîne cinétique ouverte (ex. extension du genou assis, jambe libre) se caractérise par...",
      "en": "An open kinetic chain exercise (e.g., seated knee extension, free leg) is characterized by...",
      "choices": [
       { "fr": "Une extrémité distale libre", "en": "A free distal end", "correct": true },
       { "fr": "Une extrémité fixée au sol", "en": "A distal end fixed to the ground" },
       { "fr": "L'immobilité complète du corps", "en": "Complete immobility of the body" },
       { "fr": "L'utilisation obligatoire d'électricité", "en": "Mandatory use of electricity" }
      ],
      "explFr": "En chaîne ouverte, l'extrémité distale bouge librement (ex. extension du genou assis) ; on cible souvent un mouvement/muscle précis. À valider.",
      "explEn": "In an open chain, the distal end moves freely (e.g., seated knee extension); it often targets a specific movement/muscle. To be validated."
     },
     {
      "fr": "Vrai ou faux : on adapte l'intensité d'un exercice selon la douleur, la fatigue et la réponse du patient.",
      "en": "True or false: exercise intensity is adjusted according to pain, fatigue and the patient's response.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Le dosage se module selon la tolérance ; douleur ou fatigue excessive imposent d'ajuster ou de cesser.",
      "explEn": "Dosing is modulated by tolerance; excessive pain or fatigue requires adjusting or stopping."
     },
     {
      "fr": "Pour prévenir les chutes chez une personne âgée, une intervention pertinente est...",
      "en": "To prevent falls in an older adult, a relevant intervention is...",
      "choices": [
       { "fr": "L'entraînement de l'équilibre et de la force des membres inférieurs", "en": "Training balance and lower-limb strength", "correct": true },
       { "fr": "L'immobilisation prolongée au lit", "en": "Prolonged bed immobilization" },
       { "fr": "L'arrêt de toute marche", "en": "Stopping all walking" },
       { "fr": "L'augmentation brutale de la difficulté sans supervision", "en": "A sudden unsupervised increase in difficulty" }
      ],
      "explFr": "Améliorer l'équilibre et la force des jambes réduit le risque de chute ; on ajoute au besoin l'aménagement du domicile. À valider.",
      "explEn": "Improving balance and leg strength lowers fall risk; home adaptations are added as needed. To be validated."
     },
     {
      "fr": "L'échauffement avant l'effort vise surtout à...",
      "en": "A warm-up before exercise mainly aims to...",
      "choices": [
       { "fr": "Préparer les muscles, les articulations et le système cardiovasculaire", "en": "Prepare the muscles, joints and cardiovascular system", "correct": true },
       { "fr": "Fatiguer le patient avant l'exercice", "en": "Tire the patient before exercise" },
       { "fr": "Remplacer l'exercice principal", "en": "Replace the main exercise" },
       { "fr": "Refroidir les tissus", "en": "Cool the tissues" }
      ],
      "explFr": "L'échauffement augmente progressivement la demande pour préparer l'organisme et réduire le risque de blessure. À valider.",
      "explEn": "The warm-up gradually raises demand to prepare the body and reduce injury risk. To be validated."
     },
     {
      "fr": "Associe chaque objectif à une intervention typique.",
      "en": "Match each goal to a typical intervention.",
      "type": "match",
      "pairs": [
       { "term_fr": "Gagner en force", "term_en": "Gain strength", "def_fr": "Renforcement progressif (surcharge)", "def_en": "Progressive strengthening (overload)" },
       { "term_fr": "Gagner en amplitude", "term_en": "Gain range", "def_fr": "Étirements / mobilisations", "def_en": "Stretching / mobilizations" },
       { "term_fr": "Gagner en endurance", "term_en": "Gain endurance", "def_fr": "Exercice aérobie", "def_en": "Aerobic exercise" },
       { "term_fr": "Améliorer l'équilibre", "term_en": "Improve balance", "def_fr": "Exercices proprioceptifs", "def_en": "Proprioceptive exercises" }
      ],
      "explFr": "Relier l'objectif à l'intervention appropriée est au cœur d'une prescription d'exercice cohérente. À valider.",
      "explEn": "Linking the goal to the appropriate intervention is central to a coherent exercise prescription. To be validated."
     },
     {
      "fr": "Un patient a bien récupéré son amplitude, mais reste faible du quadriceps après une chirurgie du genou. La progression logique est de...",
      "en": "A patient has regained range but remains weak in the quadriceps after knee surgery. The logical progression is to...",
      "type": "scenario",
      "choices": [
       { "fr": "Introduire un renforcement graduel (surcharge progressive) selon la tolérance", "en": "Introduce gradual strengthening (progressive overload) as tolerated", "correct": true },
       { "fr": "Cesser tout exercice", "en": "Stop all exercise" },
       { "fr": "Charger au maximum immédiatement", "en": "Load maximally right away" },
       { "fr": "Immobiliser à nouveau le genou", "en": "Immobilize the knee again" }
      ],
      "explFr": "Une fois l'amplitude récupérée, on progresse le renforcement du quadriceps par surcharge graduelle, selon la tolérance. À valider.",
      "explEn": "Once range is regained, quadriceps strengthening progresses by gradual overload, as tolerated. To be validated."
     },
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
      "fr": "La pratique fondée sur les données probantes intègre trois éléments :",
      "en": "Evidence-based practice integrates three elements:",
      "choices": [
       { "fr": "Les meilleures données de recherche, l'expertise clinique et les préférences du patient", "en": "The best research evidence, clinical expertise and patient preferences", "correct": true },
       { "fr": "Le hasard, l'habitude et la publicité", "en": "Chance, habit and advertising" },
       { "fr": "Uniquement l'opinion du thérapeute", "en": "Only the therapist's opinion" },
       { "fr": "Uniquement le budget disponible", "en": "Only the available budget" }
      ],
      "explFr": "La pratique fondée sur les données probantes combine recherche, jugement clinique et valeurs/préférences du patient. À valider.",
      "explEn": "Evidence-based practice combines research, clinical judgment and the patient's values/preferences. To be validated."
     },
     {
      "fr": "Vrai ou faux : deux patients ayant le même diagnostic peuvent nécessiter des plans de traitement différents.",
      "en": "True or false: two patients with the same diagnosis may need different treatment plans.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Objectifs, contexte, capacités et préférences varient d'une personne à l'autre ; le plan s'individualise malgré un diagnostic identique. À valider.",
      "explEn": "Goals, context, abilities and preferences vary between people; the plan is individualized despite an identical diagnosis. To be validated."
     },
     {
      "fr": "Si un patient ne progresse pas comme prévu, une bonne conduite est de...",
      "en": "If a patient is not progressing as expected, a good course of action is to...",
      "choices": [
       { "fr": "Réévaluer les hypothèses, l'observance et le plan, puis ajuster", "en": "Re-assess the hypotheses, adherence and plan, then adjust", "correct": true },
       { "fr": "Répéter exactement la même chose sans réfléchir", "en": "Repeat exactly the same thing without thinking" },
       { "fr": "Cesser toute communication", "en": "Stop all communication" },
       { "fr": "Blâmer uniquement le patient", "en": "Blame the patient only" }
      ],
      "explFr": "Une absence de progrès invite à revoir les hypothèses, l'observance du programme et le dosage, puis à ajuster le plan. À valider.",
      "explEn": "A lack of progress prompts revisiting the hypotheses, program adherence and dosing, then adjusting the plan. To be validated."
     },
     {
      "fr": "Le principe d'« individualisation » signifie que le programme doit être...",
      "en": "The 'individualization' principle means the program must be...",
      "choices": [
       { "fr": "Adapté aux capacités, aux objectifs et au contexte de la personne", "en": "Tailored to the person's abilities, goals and context", "correct": true },
       { "fr": "Identique pour tout le monde", "en": "Identical for everyone" },
       { "fr": "Toujours le plus intense possible", "en": "Always as intense as possible" },
       { "fr": "Défini au hasard", "en": "Set at random" }
      ],
      "explFr": "L'individualisation adapte l'exercice à la personne (âge, condition, objectifs, mode de vie) pour un traitement pertinent et sécuritaire. À valider.",
      "explEn": "Individualization tailors exercise to the person (age, condition, goals, lifestyle) for relevant, safe treatment. To be validated."
     },
     {
      "fr": "Vrai ou faux : le principe de réversibilité rappelle que les gains obtenus peuvent se perdre si l'entraînement cesse.",
      "en": "True or false: the reversibility principle reminds us that gains can be lost if training stops.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Les adaptations diminuent avec l'arrêt de l'entraînement (« use it or lose it ») ; d'où l'intérêt d'un programme d'entretien. À valider.",
      "explEn": "Adaptations decline when training stops ('use it or lose it'); hence the value of a maintenance program. To be validated."
     },
     {
      "fr": "Pour rendre une tâche fonctionnelle plus facile au départ, on peut...",
      "en": "To make a functional task easier at first, one can...",
      "choices": [
       { "fr": "Réduire la charge, l'amplitude, la vitesse ou la complexité, puis progresser", "en": "Reduce load, range, speed or complexity, then progress", "correct": true },
       { "fr": "Toujours commencer au niveau maximal", "en": "Always start at the maximal level" },
       { "fr": "Supprimer toute supervision", "en": "Remove all supervision" },
       { "fr": "Interdire tout repos", "en": "Forbid any rest" }
      ],
      "explFr": "On simplifie d'abord la tâche (moins de charge, d'amplitude, de vitesse ou de complexité), puis on progresse selon la réussite. À valider.",
      "explEn": "The task is first simplified (less load, range, speed or complexity), then progressed as success allows. To be validated."
     },
     {
      "fr": "Mesurer un résultat (ex. distance de marche, amplitude) avant et après une période de traitement sert à...",
      "en": "Measuring an outcome (e.g., walking distance, range) before and after a treatment period serves to...",
      "choices": [
       { "fr": "Objectiver l'efficacité de l'intervention", "en": "Objectify the intervention's effectiveness", "correct": true },
       { "fr": "Décorer le dossier", "en": "Decorate the file" },
       { "fr": "Remplacer le consentement", "en": "Replace consent" },
       { "fr": "Fixer le tarif", "en": "Set the fee" }
      ],
      "explFr": "Comparer une mesure avant/après objective les progrès et documente l'efficacité (ou non) du traitement.",
      "explEn": "Comparing a measure before/after objectifies progress and documents the treatment's effectiveness (or lack thereof)."
     },
     {
      "fr": "Vrai ou faux : la collaboration interprofessionnelle (médecin, ergothérapeute, infirmière...) fait partie d'une prise en charge globale du patient.",
      "en": "True or false: interprofessional collaboration (physician, occupational therapist, nurse...) is part of comprehensive patient care.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Travailler avec les autres professionnels assure une prise en charge cohérente et complète du patient. À valider.",
      "explEn": "Working with other professionals ensures coherent, comprehensive care of the patient. To be validated."
     },
     {
      "fr": "Associe chaque principe d'entraînement à un exemple d'application.",
      "en": "Match each training principle to an example of its application.",
      "type": "match",
      "pairs": [
       { "term_fr": "Surcharge", "term_en": "Overload", "def_fr": "Augmenter graduellement la charge", "def_en": "Gradually increase the load" },
       { "term_fr": "Spécificité", "term_en": "Specificity", "def_fr": "Entraîner un geste proche de la tâche visée", "def_en": "Train a movement close to the target task" },
       { "term_fr": "Progression", "term_en": "Progression", "def_fr": "Complexifier au fil des séances", "def_en": "Add complexity over the sessions" },
       { "term_fr": "Individualisation", "term_en": "Individualization", "def_fr": "Adapter au patient", "def_en": "Tailor to the patient" }
      ],
      "explFr": "Traduire chaque principe en exemple concret aide à concevoir un programme efficace et sécuritaire. À valider.",
      "explEn": "Turning each principle into a concrete example helps design an effective, safe program. To be validated."
     },
     {
      "fr": "Après 4 semaines, un patient a atteint tous ses objectifs mesurables et est autonome avec son programme. La suite logique est de...",
      "en": "After 4 weeks, a patient has met all measurable goals and is independent with their program. The logical next step is to...",
      "type": "scenario",
      "choices": [
       { "fr": "Planifier le congé avec un programme d'entretien et des consignes de suivi", "en": "Plan discharge with a maintenance program and follow-up instructions", "correct": true },
       { "fr": "Poursuivre indéfiniment sans raison", "en": "Continue indefinitely for no reason" },
       { "fr": "Cesser brusquement sans consignes", "en": "Stop abruptly with no instructions" },
       { "fr": "Recommencer l'évaluation à zéro", "en": "Restart the assessment from scratch" }
      ],
      "explFr": "Objectifs atteints et autonomie acquise : on planifie le congé avec un programme d'entretien et un plan de suivi au besoin. À valider.",
      "explEn": "Goals met and independence achieved: plan discharge with a maintenance program and follow-up as needed. To be validated."
     },
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
      "fr": "Un thérapeute qui ne peut pas répondre à un besoin situé hors de son champ de compétence doit...",
      "en": "A therapist who cannot meet a need outside their scope of competence should...",
      "choices": [
       { "fr": "Référer le patient au professionnel approprié", "en": "Refer the patient to the appropriate professional", "correct": true },
       { "fr": "Improviser un traitement quand même", "en": "Improvise a treatment anyway" },
       { "fr": "Ignorer le besoin du patient", "en": "Ignore the patient's need" },
       { "fr": "Cacher ses limites au patient", "en": "Hide their limits from the patient" }
      ],
      "explFr": "Reconnaître ses limites et référer au bon professionnel fait partie d'une pratique responsable et sécuritaire.",
      "explEn": "Recognizing one's limits and referring to the right professional is part of responsible, safe practice."
     },
     {
      "fr": "La tenue d'un dossier clinique sert notamment à...",
      "en": "Keeping a clinical record serves notably to...",
      "choices": [
       { "fr": "Assurer la continuité des soins et la traçabilité des décisions", "en": "Ensure continuity of care and traceability of decisions", "correct": true },
       { "fr": "Impressionner les collègues", "en": "Impress colleagues" },
       { "fr": "Remplacer l'évaluation", "en": "Replace the assessment" },
       { "fr": "Augmenter le tarif", "en": "Raise the fee" }
      ],
      "explFr": "Le dossier documente l'évaluation, les interventions et l'évolution ; il assure la continuité et protège patient et intervenant.",
      "explEn": "The record documents assessment, interventions and progress; it ensures continuity and protects patient and clinician."
     },
     {
      "fr": "Vrai ou faux : le respect, la politesse et le professionnalisme font partie de la relation thérapeutique.",
      "en": "True or false: respect, courtesy and professionalism are part of the therapeutic relationship.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Une relation respectueuse et professionnelle renforce la confiance, l'adhésion et la qualité des soins.",
      "explEn": "A respectful, professional relationship strengthens trust, adherence and quality of care."
     },
     {
      "fr": "Se présenter au patient et lui expliquer ce qu'on va faire relève surtout de...",
      "en": "Introducing yourself and explaining what you will do relates mainly to...",
      "choices": [
       { "fr": "Une bonne communication et l'obtention du consentement", "en": "Good communication and obtaining consent", "correct": true },
       { "fr": "La facturation", "en": "Billing" },
       { "fr": "La mesure de la force", "en": "Strength measurement" },
       { "fr": "Le choix de la couleur du dossier", "en": "Choosing the file color" }
      ],
      "explFr": "Se présenter et expliquer l'intervention établit la communication et prépare le consentement libre et éclairé.",
      "explEn": "Introducing yourself and explaining the intervention establishes communication and sets up free, informed consent."
     },
     {
      "fr": "La désinfection de l'équipement entre deux patients vise surtout à...",
      "en": "Disinfecting equipment between patients mainly aims to...",
      "choices": [
       { "fr": "Prévenir la transmission des infections", "en": "Prevent the transmission of infections", "correct": true },
       { "fr": "Accélérer la facturation", "en": "Speed up billing" },
       { "fr": "Mesurer la douleur", "en": "Measure pain" },
       { "fr": "Remplacer l'hygiène des mains", "en": "Replace hand hygiene" }
      ],
      "explFr": "Nettoyer et désinfecter l'équipement entre les patients limite la transmission des micro-organismes. À valider.",
      "explEn": "Cleaning and disinfecting equipment between patients limits the transmission of micro-organisms. To be validated."
     },
     {
      "fr": "Vrai ou faux : un professionnel doit maintenir et mettre à jour ses compétences (formation continue).",
      "en": "True or false: a professional must maintain and update their skills (continuing education).",
      "type": "tf",
      "isTrue": true,
      "explFr": "La formation continue permet de rester à jour avec les meilleures pratiques et de fournir des soins de qualité. À valider.",
      "explEn": "Continuing education keeps one up to date with best practices and delivers quality care. To be validated."
     },
     {
      "fr": "Le port de gants est indiqué notamment...",
      "en": "Wearing gloves is indicated notably...",
      "choices": [
       { "fr": "En cas de contact possible avec du sang, des liquides biologiques ou une plaie", "en": "When contact with blood, body fluids or a wound is possible", "correct": true },
       { "fr": "Uniquement pour serrer la main", "en": "Only to shake hands" },
       { "fr": "Jamais, en aucune situation", "en": "Never, in any situation" },
       { "fr": "Seulement pour écrire au dossier", "en": "Only to write in the chart" }
      ],
      "explFr": "Les gants font partie des précautions de base lorsqu'un contact avec du sang, des liquides ou une plaie est possible. À valider.",
      "explEn": "Gloves are part of standard precautions when contact with blood, fluids or a wound is possible. To be validated."
     },
     {
      "fr": "En cas de doute sur une prescription ou une situation, la conduite prudente est de...",
      "en": "When in doubt about a prescription or a situation, the prudent course of action is to...",
      "choices": [
       { "fr": "Vérifier ou consulter avant d'agir", "en": "Check or consult before acting", "correct": true },
       { "fr": "Présumer et agir vite", "en": "Assume and act quickly" },
       { "fr": "Ignorer le doute", "en": "Ignore the doubt" },
       { "fr": "Laisser le patient décider seul du traitement", "en": "Let the patient decide the treatment alone" }
      ],
      "explFr": "Devant un doute, vérifier ou consulter un collègue/le prescripteur est plus sûr que de présumer. À valider.",
      "explEn": "When in doubt, checking or consulting a colleague/the prescriber is safer than assuming. To be validated."
     },
     {
      "fr": "Associe chaque comportement professionnel à sa description.",
      "en": "Match each professional behavior to its description.",
      "type": "match",
      "pairs": [
       { "term_fr": "Confidentialité", "term_en": "Confidentiality", "def_fr": "Protéger les renseignements du patient", "def_en": "Protect the patient's information" },
       { "term_fr": "Consentement", "term_en": "Consent", "def_fr": "Informer et obtenir l'accord", "def_en": "Inform and obtain agreement" },
       { "term_fr": "Compétence", "term_en": "Competence", "def_fr": "Agir dans son champ et référer au besoin", "def_en": "Act within scope and refer when needed" },
       { "term_fr": "Sécurité", "term_en": "Safety", "def_fr": "Prévenir les risques pour le patient", "def_en": "Prevent risks to the patient" }
      ],
      "explFr": "Ces comportements structurent une pratique éthique, sécuritaire et centrée sur le patient.",
      "explEn": "These behaviors structure an ethical, safe and patient-centered practice."
     },
     {
      "fr": "Vrai ou faux : au Québec, la Loi 25 renforce la protection des renseignements personnels, y compris en santé.",
      "en": "True or false: in Quebec, Law 25 strengthens the protection of personal information, including in health care.",
      "type": "tf",
      "isTrue": true,
      "explFr": "La Loi 25 encadre plus strictement la collecte, l'utilisation et la protection des renseignements personnels. À valider.",
      "explEn": "Law 25 more strictly governs the collection, use and protection of personal information. To be validated."
     },
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
      "fr": "Avant d'aider un patient à se lever, il est prudent de...",
      "en": "Before helping a patient to stand, it is prudent to...",
      "choices": [
       { "fr": "Verrouiller les freins, chausser le patient, dégager l'espace et l'informer", "en": "Lock the brakes, put on the patient's footwear, clear the space and inform them", "correct": true },
       { "fr": "Le tirer rapidement par un bras sans prévenir", "en": "Yank them up by one arm without warning" },
       { "fr": "Laisser les obstacles au sol", "en": "Leave obstacles on the floor" },
       { "fr": "Retirer tous les appuis", "en": "Remove all supports" }
      ],
      "explFr": "Sécuriser l'environnement (freins, chaussures, espace) et informer le patient prévient les chutes lors du lever. À valider.",
      "explEn": "Securing the environment (brakes, footwear, space) and informing the patient prevents falls when standing up. To be validated."
     },
     {
      "fr": "Une ceinture de marche (ceinture de transfert) sert surtout à...",
      "en": "A gait belt (transfer belt) is mainly used to...",
      "choices": [
       { "fr": "Offrir une prise sûre pour assister et sécuriser le patient", "en": "Provide a secure hold to assist and safeguard the patient", "correct": true },
       { "fr": "Mesurer le tour de taille", "en": "Measure the waist" },
       { "fr": "Immobiliser définitivement le patient", "en": "Permanently immobilize the patient" },
       { "fr": "Remplacer le consentement", "en": "Replace consent" }
      ],
      "explFr": "La ceinture de marche donne une prise ferme et sûre pour guider ou retenir le patient lors des transferts et de la marche. À valider.",
      "explEn": "The gait belt gives a firm, safe hold to guide or steady the patient during transfers and walking. To be validated."
     },
     {
      "fr": "Vrai ou faux : on adapte sa communication au patient (langue, âge, culture, capacités cognitives, déficits sensoriels).",
      "en": "True or false: communication is adapted to the patient (language, age, culture, cognitive abilities, sensory deficits).",
      "type": "tf",
      "isTrue": true,
      "explFr": "Adapter le message et le canal au patient favorise la compréhension, l'adhésion et la sécurité.",
      "explEn": "Adapting the message and channel to the patient supports understanding, adherence and safety."
     },
     {
      "fr": "Pour communiquer avec un patient malentendant, une bonne pratique est de...",
      "en": "To communicate with a hard-of-hearing patient, a good practice is to...",
      "choices": [
       { "fr": "Se placer face à lui, parler clairement et vérifier la compréhension", "en": "Face them, speak clearly and check understanding", "correct": true },
       { "fr": "Parler très vite en lui tournant le dos", "en": "Speak very fast with your back turned" },
       { "fr": "Éviter tout contact visuel", "en": "Avoid all eye contact" },
       { "fr": "Ne rien expliquer", "en": "Explain nothing" }
      ],
      "explFr": "Se placer face au patient, articuler clairement et confirmer la compréhension améliore la communication avec un malentendant. À valider.",
      "explEn": "Facing the patient, articulating clearly and confirming understanding improves communication with a hard-of-hearing person. To be validated."
     },
     {
      "fr": "Devant un patient qui refuse un traitement, le thérapeute doit...",
      "en": "Facing a patient who refuses a treatment, the therapist must...",
      "choices": [
       { "fr": "Respecter son refus, l'informer des conséquences et documenter", "en": "Respect the refusal, inform them of the consequences and document", "correct": true },
       { "fr": "Imposer le traitement de force", "en": "Force the treatment" },
       { "fr": "Ignorer le refus", "en": "Ignore the refusal" },
       { "fr": "Cesser toute relation professionnelle sur-le-champ", "en": "End the professional relationship on the spot" }
      ],
      "explFr": "Le patient a le droit de refuser ; on l'informe des conséquences, on respecte sa décision et on consigne le refus. À valider.",
      "explEn": "The patient has the right to refuse; inform them of the consequences, respect the decision and record the refusal. To be validated."
     },
     {
      "fr": "Vrai ou faux : lever une charge en tournant brusquement le tronc augmente le risque de blessure au dos.",
      "en": "True or false: lifting a load while twisting the trunk sharply increases the risk of back injury.",
      "type": "tf",
      "isTrue": true,
      "explFr": "La torsion du tronc sous charge sollicite dangereusement la colonne ; on pivote plutôt avec les pieds, dos droit.",
      "explEn": "Twisting the loaded trunk dangerously stresses the spine; instead pivot with the feet, keeping the back straight."
     },
     {
      "fr": "L'installation ergonomique du poste de travail (hauteur de table, position) vise surtout à...",
      "en": "Ergonomic setup of the workstation (table height, position) mainly aims to...",
      "choices": [
       { "fr": "Protéger le thérapeute et faciliter le soin", "en": "Protect the therapist and ease the care", "correct": true },
       { "fr": "Ralentir le travail", "en": "Slow down the work" },
       { "fr": "Remplacer la mécanique corporelle", "en": "Replace body mechanics" },
       { "fr": "Décorer la salle", "en": "Decorate the room" }
      ],
      "explFr": "Ajuster la hauteur de la table et sa position réduit les contraintes sur le thérapeute et facilite un soin sécuritaire. À valider.",
      "explEn": "Adjusting table height and position reduces strain on the therapist and eases safe care. To be validated."
     },
     {
      "fr": "Un incident ou accident (chute, blessure) survenu pendant une séance doit être...",
      "en": "An incident or accident (fall, injury) during a session must be...",
      "choices": [
       { "fr": "Sécurisé, pris en charge, signalé et documenté", "en": "Made safe, managed, reported and documented", "correct": true },
       { "fr": "Caché à tout le monde", "en": "Hidden from everyone" },
       { "fr": "Oublié aussitôt", "en": "Immediately forgotten" },
       { "fr": "Ignoré si personne n'a vu", "en": "Ignored if no one saw" }
      ],
      "explFr": "Devant un incident, on sécurise, on porte assistance, puis on signale et on documente selon les procédures. À valider.",
      "explEn": "After an incident, make safe, provide assistance, then report and document per procedures. To be validated."
     },
     {
      "fr": "Associe chaque situation à la mesure appropriée.",
      "en": "Match each situation to the appropriate measure.",
      "type": "match",
      "pairs": [
       { "term_fr": "Patient malentendant", "term_en": "Hard-of-hearing patient", "def_fr": "Se placer face, parler clairement", "def_en": "Face them, speak clearly" },
       { "term_fr": "Soulever une charge lourde", "term_en": "Lifting a heavy load", "def_fr": "Bonne mécanique corporelle", "def_en": "Good body mechanics" },
       { "term_fr": "Patient qui refuse un soin", "term_en": "Patient refusing care", "def_fr": "Respecter et documenter", "def_en": "Respect and document" },
       { "term_fr": "Transfert lit ↔ fauteuil", "term_en": "Bed ↔ chair transfer", "def_fr": "Verrouiller les freins", "def_en": "Lock the brakes" }
      ],
      "explFr": "Chaque situation appelle une mesure précise de sécurité ou de communication ; les anticiper prévient les incidents. À valider.",
      "explEn": "Each situation calls for a specific safety or communication measure; anticipating them prevents incidents. To be validated."
     },
     {
      "fr": "Vous devez transférer un patient hémiplégique du lit au fauteuil roulant. La première mesure de sécurité est de...",
      "en": "You must transfer a hemiplegic patient from the bed to the wheelchair. The first safety measure is to...",
      "type": "scenario",
      "choices": [
       { "fr": "Verrouiller les freins du fauteuil, le positionner du bon côté et informer le patient", "en": "Lock the wheelchair brakes, position it on the correct side and inform the patient", "correct": true },
       { "fr": "Transférer le plus vite possible sans préparation", "en": "Transfer as fast as possible without preparation" },
       { "fr": "Tirer le patient par le bras atteint", "en": "Pull the patient by the affected arm" },
       { "fr": "Retirer les appuis et s'éloigner", "en": "Remove supports and step away" }
      ],
      "explFr": "Avant le transfert : freins verrouillés, fauteuil du bon côté, patient informé, bonne mécanique corporelle et assistance adaptée. À valider.",
      "explEn": "Before the transfer: brakes locked, wheelchair on the correct side, patient informed, good body mechanics and suitable assistance. To be validated."
     },
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
      "fr": "Un patient vous confie un renseignement personnel et demande de ne pas l'inscrire au dossier. La conduite appropriée est de...",
      "en": "A patient shares personal information and asks you not to record it. The appropriate action is to...",
      "type": "scenario",
      "choices": [
       { "fr": "Expliquer les obligations de tenue de dossier et de confidentialité, puis documenter ce qui est cliniquement pertinent", "en": "Explain the record-keeping and confidentiality obligations, then document what is clinically relevant", "correct": true },
       { "fr": "Ne rien noter et tout oublier", "en": "Note nothing and forget everything" },
       { "fr": "Divulguer l'information à des collègues non concernés", "en": "Share the information with uninvolved colleagues" },
       { "fr": "Refuser désormais de traiter le patient", "en": "Refuse to treat the patient from now on" }
      ],
      "explFr": "On explique les règles de dossier et de confidentialité, et on consigne l'information cliniquement pertinente, sans la divulguer indûment. À valider.",
      "explEn": "Explain the record and confidentiality rules, and record clinically relevant information, without disclosing it improperly. To be validated."
     },
     {
      "fr": "Vrai ou faux : le secret professionnel peut comporter des exceptions prévues par la loi (ex. danger grave et imminent pour la personne ou autrui).",
      "en": "True or false: professional confidentiality may have exceptions provided by law (e.g., serious and imminent danger to the person or others).",
      "type": "tf",
      "isTrue": true,
      "explFr": "La confidentialité est la règle, mais la loi prévoit des exceptions (ex. danger grave et imminent) ; on agit alors selon le cadre légal. À valider.",
      "explEn": "Confidentiality is the rule, but the law provides exceptions (e.g., serious, imminent danger); one then acts within the legal framework. To be validated."
     },
     {
      "fr": "Pendant une séance, un patient devient soudainement pâle et en sueur et se plaint d'une douleur à la poitrine. La conduite appropriée est de...",
      "en": "During a session, a patient suddenly becomes pale and sweaty and complains of chest pain. The appropriate action is to...",
      "type": "scenario",
      "choices": [
       { "fr": "Cesser l'activité, l'installer en sécurité, surveiller ses signes et alerter les secours ou l'aide médicale", "en": "Stop the activity, make them safe, monitor their signs and alert emergency or medical help", "correct": true },
       { "fr": "Poursuivre l'exercice comme prévu", "en": "Continue the exercise as planned" },
       { "fr": "Augmenter l'intensité pour tester", "en": "Increase the intensity to test" },
       { "fr": "Ignorer les symptômes", "en": "Ignore the symptoms" }
      ],
      "explFr": "Une douleur thoracique soudaine avec pâleur et sueurs est une urgence potentielle : on arrête, on sécurise, on surveille et on alerte les secours. À valider.",
      "explEn": "Sudden chest pain with pallor and sweating is a potential emergency: stop, make safe, monitor and alert emergency help. To be validated."
     },
     {
      "fr": "Une relation professionnelle appropriée implique de...",
      "en": "An appropriate professional relationship involves...",
      "choices": [
       { "fr": "Maintenir des limites claires et éviter les conflits d'intérêts", "en": "Maintaining clear boundaries and avoiding conflicts of interest", "correct": true },
       { "fr": "Effacer toute limite avec le patient", "en": "Erasing all boundaries with the patient" },
       { "fr": "Favoriser ses intérêts personnels", "en": "Favoring one's own personal interests" },
       { "fr": "Ignorer le code de déontologie", "en": "Ignoring the code of ethics" }
      ],
      "explFr": "Des limites professionnelles claires et l'absence de conflit d'intérêts protègent le patient et la relation thérapeutique. À valider.",
      "explEn": "Clear professional boundaries and no conflict of interest protect the patient and the therapeutic relationship. To be validated."
     },
     {
      "fr": "Vrai ou faux : obtenir le consentement est un processus continu : le patient peut le retirer à tout moment.",
      "en": "True or false: obtaining consent is an ongoing process: the patient can withdraw it at any time.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Le consentement se maintient tout au long du suivi ; le patient peut le retirer en tout temps, ce que l'on respecte.",
      "explEn": "Consent is maintained throughout care; the patient may withdraw it at any time, which is respected."
     },
     {
      "fr": "Un collègue vous demande des renseignements sur un patient qu'il ne traite pas, par simple curiosité. Vous devez...",
      "en": "A colleague asks you for information about a patient they are not treating, out of simple curiosity. You should...",
      "type": "scenario",
      "choices": [
       { "fr": "Refuser de divulguer (respect de la confidentialité)", "en": "Decline to share (respecting confidentiality)", "correct": true },
       { "fr": "Tout raconter en détail", "en": "Tell everything in detail" },
       { "fr": "Montrer le dossier complet", "en": "Show the entire record" },
       { "fr": "Publier l'information", "en": "Publish the information" }
      ],
      "explFr": "L'accès aux renseignements d'un patient se limite aux personnes qui en ont besoin pour les soins ; la curiosité ne le justifie pas. À valider.",
      "explEn": "Access to a patient's information is limited to those who need it for care; curiosity does not justify it. To be validated."
     },
     {
      "fr": "Documenter un refus de traitement doit inclure...",
      "en": "Documenting a treatment refusal should include...",
      "choices": [
       { "fr": "L'information donnée au patient, sa décision et le contexte", "en": "The information given to the patient, their decision and the context", "correct": true },
       { "fr": "Uniquement l'heure de départ", "en": "Only the departure time" },
       { "fr": "Une opinion personnelle sur le patient", "en": "A personal opinion about the patient" },
       { "fr": "Rien du tout", "en": "Nothing at all" }
      ],
      "explFr": "On consigne ce qui a été expliqué, la décision du patient et le contexte, ce qui protège le patient et l'intervenant. À valider.",
      "explEn": "Record what was explained, the patient's decision and the context, which protects both patient and clinician. To be validated."
     },
     {
      "fr": "Vrai ou faux : reconnaître ses limites et demander de l'aide ou de la supervision est un signe de professionnalisme, pas de faiblesse.",
      "en": "True or false: recognizing one's limits and asking for help or supervision is a sign of professionalism, not weakness.",
      "type": "tf",
      "isTrue": true,
      "explFr": "Demander de l'aide au bon moment protège le patient et fait partie d'une pratique compétente et sécuritaire.",
      "explEn": "Asking for help at the right time protects the patient and is part of competent, safe practice."
     },
     {
      "fr": "Associe chaque situation à la bonne conduite.",
      "en": "Match each situation to the correct action.",
      "type": "match",
      "pairs": [
       { "term_fr": "Douleur thoracique soudaine", "term_en": "Sudden chest pain", "def_fr": "Urgence : sécuriser et alerter les secours", "def_en": "Emergency: make safe and alert help" },
       { "term_fr": "Demande de renseignements par curiosité", "term_en": "Info request out of curiosity", "def_fr": "Refuser (confidentialité)", "def_en": "Decline (confidentiality)" },
       { "term_fr": "Besoin hors de son champ", "term_en": "Need outside one's scope", "def_fr": "Référer au professionnel approprié", "def_en": "Refer to the appropriate professional" },
       { "term_fr": "Refus de traitement", "term_en": "Treatment refusal", "def_fr": "Respecter et documenter", "def_en": "Respect and document" }
      ],
      "explFr": "Associer chaque situation à la conduite appropriée ancre l'éthique et la sécurité dans la pratique. À valider.",
      "explEn": "Matching each situation to the right action anchors ethics and safety in practice. To be validated."
     },
     {
      "fr": "Vous constatez qu'un traitement dépasse votre champ de compétence pour ce patient complexe. La conduite professionnelle est de...",
      "en": "You realize a treatment is beyond your scope of competence for this complex patient. The professional course of action is to...",
      "type": "scenario",
      "choices": [
       { "fr": "En informer le patient et le référer ou consulter le professionnel approprié", "en": "Inform the patient and refer to or consult the appropriate professional", "correct": true },
       { "fr": "Improviser sans en parler à personne", "en": "Improvise without telling anyone" },
       { "fr": "Cacher la situation au patient", "en": "Hide the situation from the patient" },
       { "fr": "Cesser tout soin sans explication", "en": "Stop all care without explanation" }
      ],
      "explFr": "Reconnaître ses limites, en informer le patient et référer ou consulter est la conduite professionnelle attendue. À valider.",
      "explEn": "Recognizing one's limits, informing the patient and referring or consulting is the expected professional conduct. To be validated."
     },
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
