import { useState } from "react";

// ── MODULES ───────────────────────────────────────────────
const MODULES = [
  { id:"diagnostic", label:"🔧 Diagnostic Élec",  color:"#F97316", section:"pro" },
  { id:"import",     label:"📦 Import-Export",     color:"#10B981", section:"biz" },
  { id:"immo",       label:"🏠 Investissement",    color:"#6366F1", section:"biz" },
  { id:"business",   label:"💼 Mon Business",      color:"#F59E0B", section:"biz" },
  { id:"devis",      label:"🎨 Devis Créatif",     color:"#E879F9", section:"creative" },
  { id:"brief",      label:"📋 Brief Client",      color:"#FB7185", section:"creative" },
  { id:"palette",    label:"🖌️ Palette & Typo",   color:"#A78BFA", section:"creative" },
  { id:"tarifs",     label:"💡 Tarifs Marché",     color:"#34D399", section:"creative" },
  { id:"quizcrea",   label:"🎓 Quiz Créatif",      color:"#F472B6", section:"creative" },
  { id:"code",       label:"🚗 Code de la Route",  color:"#38BDF8", section:"route" },
  { id:"quiz",       label:"⚡ Quiz Technique",    color:"#EC4899", section:"pro" },
];

const SECTIONS = [
  { id:"pro",      label:"⚙️ Pro Élec",    color:"#F97316" },
  { id:"biz",      label:"💼 Business",    color:"#F59E0B" },
  { id:"creative", label:"🎨 Studio",      color:"#E879F9" },
  { id:"route",    label:"🚗 Route",       color:"#38BDF8" },
];

// ── DONNÉES ───────────────────────────────────────────────
const PANNES = [
  { symptomes:["surchauffe","chaud","température"], diagnostic:"Surchauffe moteur", causes:["Ventilation obstruée","Surcharge mécanique","Roulements usés","Tension déséquilibrée"], action:"Vérifier la ventilation, mesurer le courant de ligne et comparer avec la plaque signalétique." },
  { symptomes:["vibre","vibration","tremble"], diagnostic:"Vibrations anormales", causes:["Déséquilibre rotor","Roulements défectueux","Accouplement mal aligné","Fixation desserrée"], action:"Contrôler l'alignement, resserrer les fixations, vérifier les roulements." },
  { symptomes:["démarre pas","ne démarre","bloqué","démarrage"], diagnostic:"Problème au démarrage", causes:["Alimentation absente","Contacteur défectueux","Thermique déclenchée","Enroulement ouvert"], action:"Vérifier les fusibles, réarmer le thermique, mesurer la tension aux bornes." },
  { symptomes:["bruit","grince","son anormal"], diagnostic:"Bruit mécanique suspect", causes:["Roulements secs ou usés","Corps étranger","Engrenage endommagé"], action:"Graisser ou remplacer les roulements. Inspecter visuellement l'intérieur." },
  { symptomes:["courant","intensité","surconsommation","ampère"], diagnostic:"Surconsommation de courant", causes:["Surcharge mécanique","Tension trop basse","Court-circuit partiel"], action:"Mesurer l'intensité sur chaque phase avec un pince-ampèremètre, comparer à l'In." },
  { symptomes:["claquement","disjoncteur","court-circuit","disjoncte"], diagnostic:"Court-circuit ou défaut d'isolement", causes:["Isolation dégradée","Humidité","Enroulement grillé"], action:"Tester la résistance d'isolement avec un mégohmmètre. Valeur mini : 1 MΩ." },
];

const QUIZ_TECH = [
  { q:"Cos φ = 0.75, P = 10 kW. Puissance apparente ?", choices:["13.3 kVA","7.5 kVA","10 kVA","15 kVA"], answer:0, expl:"S = P / cos φ = 10 / 0.75 = 13.3 kVA." },
  { q:"Résistance d'isolement minimale moteur (CEI) ?", choices:["100 kΩ","500 kΩ","1 MΩ","10 MΩ"], answer:2, expl:"1 MΩ minimum au mégohmmètre." },
  { q:"Le VFD sert principalement à :", choices:["Augmenter la tension","Régler la vitesse","Protéger des courts-circuits","Réduire le courant nominal"], answer:1, expl:"Le variateur agit sur fréquence et tension pour contrôler la vitesse." },
  { q:"Classe d'isolation F = température max :", choices:["105°C","130°C","155°C","180°C"], answer:2, expl:"F = 155°C. B = 130°C, H = 180°C." },
  { q:"Le relais thermique fonctionne par :", choices:["Effet Hall","Dilatation bimétallique","Induction","Résistance PTC"], answer:1, expl:"Lame bimétallique déformée par la chaleur du courant de surcharge." },
  { q:"Le couplage étoile d'un moteur 380V donne une tension par enroulement de :", choices:["380 V","220 V","660 V","110 V"], answer:1, expl:"En étoile : U_phase = U_ligne / √3 = 380 / 1.732 ≈ 220 V." },
  { q:"Un contacteur est commandé par :", choices:["Un fusible","Une bobine électromagnétique","Un disjoncteur","Un variateur"], answer:1, expl:"Le contacteur est actionné par une bobine qui crée un champ magnétique pour fermer les contacts." },
];

const CODE_ROUTE = [
  { cat:"Priorité",      q:"À un carrefour non signalisé, quelle règle s'applique ?", choices:["Priorité au plus rapide","Priorité à droite","Priorité à gauche","Priorité au plus grand"], answer:1, expl:"En l'absence de signalisation : priorité à droite. Tu cèdes le passage à tout véhicule venant par ta droite." },
  { cat:"Vitesses",      q:"Vitesse maximale en agglomération au Maroc ?", choices:["40 km/h","50 km/h","60 km/h","80 km/h"], answer:1, expl:"Agglomération : 50 km/h. Route : 100 km/h. Autoroute : 120 km/h." },
  { cat:"Distances",     q:"La distance de sécurité correspond à :", choices:["1 seconde","2 secondes","10 mètres fixes","Un véhicule de long"], answer:1, expl:"Règle des 2 secondes. Par mauvais temps, doubler." },
  { cat:"Alcool",        q:"Taux d'alcoolémie légal au Maroc ?", choices:["0,5 g/L","0,2 g/L","0,8 g/L","0,0 g/L"], answer:0, expl:"0,5 g/L de sang. Au-delà : retrait de permis et amende." },
  { cat:"Feux",          q:"Feu orange fixe = ?", choices:["Accélérer","S'arrêter si possible","Priorité absolue","Klaxonner"], answer:1, expl:"Orange = arrêt imminent sauf si freiner brutalement est dangereux." },
  { cat:"Signalisation", q:"Un panneau triangulaire rouge signifie :", choices:["Obligation","Interdiction","Danger","Indication"], answer:2, expl:"Triangle rouge = danger (virage, chaussée glissante, passage piéton...)." },
  { cat:"Dépassement",   q:"Le dépassement est PERMIS :", choices:["En haut d'une côte","Dans un virage","Sur ligne continue","Sur voie à sens unique large"], answer:3, expl:"Permis sur voie à sens unique large. Interdit en virage, côte, ligne continue." },
  { cat:"Piétons",       q:"Au passage piéton sans feu, qui est prioritaire ?", choices:["Le véhicule","Le piéton toujours","Le piéton engagé ou s'engageant","Le cycliste"], answer:2, expl:"Le piéton est prioritaire dès qu'il est engagé ou manifeste l'intention de traverser." },
  { cat:"Panneaux",      q:"Panneau circulaire bleu = ?", choices:["Interdiction","Obligation","Danger","Indication"], answer:1, expl:"Rond bleu = obligation. Rond rouge = interdiction." },
  { cat:"Stationnement", q:"Stationnement interdit :", choices:["Sur voie à sens unique","À moins de 5 m d'un carrefour","Devant école hors heures","Sur route nationale"], answer:1, expl:"Interdit à moins de 5 m d'un carrefour, devant garage, sortie pompiers, ou à moins de 15 m d'un arrêt de bus." },
];

const QUIZ_CREATIF = [
  { cat:"Photographie", q:"Qu'est-ce que la règle des tiers en photographie ?", choices:["Diviser l'image en 3 couleurs","Placer le sujet sur les intersections d'une grille 3x3","Utiliser 3 sources de lumière","Prendre 3 photos du même sujet"], answer:1, expl:"La règle des tiers divise l'image en une grille 3×3. Placer le sujet sur les intersections crée une composition plus dynamique qu'un cadrage centré." },
  { cat:"Photographie", q:"L'ouverture f/1.8 par rapport à f/11 donne :", choices:["Moins de lumière et profondeur de champ plus grande","Plus de lumière et profondeur de champ plus faible","Moins de lumière et fond flou","La même exposition"], answer:1, expl:"Une petite valeur f (f/1.8) = grande ouverture = beaucoup de lumière + fond flou (faible profondeur de champ). f/11 = petite ouverture = tout net." },
  { cat:"Photographie", q:"L'ISO en photographie correspond à :", choices:["La vitesse d'obturation","La sensibilité du capteur à la lumière","L'ouverture du diaphragme","La balance des blancs"], answer:1, expl:"L'ISO mesure la sensibilité du capteur. ISO élevé = image lumineuse mais avec du bruit (grain). ISO bas = image nette mais nécessite plus de lumière." },
  { cat:"Photographie", q:"La balance des blancs sert à :", choices:["Équilibrer les noirs et blancs","Corriger les dominantes de couleur selon la lumière","Régler la mise au point","Ajuster le contraste"], answer:1, expl:"La balance des blancs neutralise les dominantes colorées selon la source de lumière (soleil, nuage, ampoule...) pour des blancs vraiment blancs." },
  { cat:"Infographie",  q:"Quelle est la différence entre image vectorielle et image bitmap ?", choices:["Le vecteur est plus lourd","Le bitmap est redimensionnable sans perte","Le vecteur utilise des pixels","Le vecteur est redimensionnable sans perte"], answer:3, expl:"L'image vectorielle (Illustrator, SVG) est basée sur des formules mathématiques : elle est redimensionnable à l'infini sans perte. Le bitmap (Photoshop, JPG) est en pixels : il pixelise en agrandissant." },
  { cat:"Infographie",  q:"Dans Photoshop, à quoi servent les calques (layers) ?", choices:["Changer la résolution","Travailler chaque élément séparément sans modifier les autres","Exporter en PDF","Régler la luminosité globale"], answer:1, expl:"Les calques permettent de superposer des éléments indépendants. On peut modifier, masquer ou déplacer chaque calque sans toucher aux autres." },
  { cat:"Infographie",  q:"Le mode CMJN est utilisé pour :", choices:["Les écrans et sites web","L'impression professionnelle","Les réseaux sociaux","La télévision"], answer:1, expl:"CMJN (Cyan, Magenta, Jaune, Noir) est le mode couleur de l'impression. Pour les écrans, on utilise le mode RVB (Rouge, Vert, Bleu)." },
  { cat:"Infographie",  q:"Quel format convient le mieux pour un logo avec fond transparent ?", choices:["JPG","BMP","PNG","GIF"], answer:2, expl:"Le PNG supporte la transparence (canal alpha). Le JPG ne supporte pas la transparence et compresse avec perte. Pour un logo pro : PNG ou SVG." },
  { cat:"Multimédia",   q:"Qu'est-ce que le codec en vidéo ?", choices:["Un logiciel de montage","Un algorithme de compression/décompression vidéo","Un format de fichier","Une résolution d'écran"], answer:1, expl:"Un codec (COmpresseur-DECompresseur) est un algorithme qui compresse la vidéo à l'enregistrement et la décompresse à la lecture. Ex: H.264, H.265, ProRes." },
  { cat:"Multimédia",   q:"Quelle résolution correspond au format Full HD ?", choices:["1280x720","1920x1080","3840x2160","4096x2160"], answer:1, expl:"Full HD = 1920×1080 pixels. HD = 1280×720. 4K UHD = 3840×2160. La résolution affecte la qualité et le poids du fichier." },
  { cat:"Multimédia",   q:"Le format MP4 est :", choices:["Un codec vidéo","Un conteneur multimédia","Un logiciel de montage","Une résolution"], answer:1, expl:"MP4 est un conteneur (wrapper) qui peut contenir différents codecs vidéo et audio. Il est léger et compatible avec presque tous les appareils." },
  { cat:"Marketing",    q:"Qu'est-ce que le taux d'engagement sur Instagram ?", choices:["Le nombre d'abonnés","Les interactions (likes+commentaires+partages) divisées par la portée","Le nombre de publications","Le budget publicitaire"], answer:1, expl:"Taux d'engagement = (Likes + Commentaires + Partages) / Portée × 100. Un bon taux est signe d'une communauté active, plus fiable que le nombre d'abonnés." },
  { cat:"Marketing",    q:"Le format idéal pour une story Instagram est :", choices:["1080x1080 (carré)","1920x1080 (paysage)","1080x1920 (portrait)","1280x720 (HD)"], answer:2, expl:"Les stories sont en format portrait 9:16, soit 1080×1920 pixels. Le carré 1:1 est pour le feed. Le paysage 16:9 convient à YouTube." },
  { cat:"Marketing",    q:"Qu'est-ce qu'un CTA (Call To Action) ?", choices:["Un type de caméra","Un appel à l'action pour guider l'utilisateur","Un filtre Instagram","Un format de fichier"], answer:1, expl:"Le CTA est un élément (bouton, texte, visuel) qui incite l'utilisateur à faire une action : 'Acheter maintenant', 'Contactez-nous', 'Voir plus'..." },
  { cat:"Marketing",    q:"La règle du 80/20 dans le marketing de contenu signifie :", choices:["80% de publicité, 20% de contenu gratuit","80% de contenu utile/divertissant, 20% promotionnel","80% de photos, 20% de vidéos","80% de texte, 20% d'images"], answer:1, expl:"La règle 80/20 recommande de publier 80% de contenu à valeur ajoutée (conseils, inspiration, divertissement) et seulement 20% de contenu promotionnel pour maintenir l'engagement." },
  { cat:"Couleurs",     q:"Les couleurs complémentaires sont :", choices:["Des couleurs similaires","Des couleurs opposées sur le cercle chromatique","Les couleurs primaires","Les tons pastels"], answer:1, expl:"Les couleurs complémentaires sont opposées sur le cercle chromatique : Rouge/Vert, Bleu/Orange, Jaune/Violet. Elles créent un fort contraste visuel." },
  { cat:"Couleurs",     q:"Que signifie DPI (ou PPP) ?", choices:["Digital Print Interface","Points Par Pouce, mesure de résolution d'impression","Design Print Index","Densité Pixel Image"], answer:1, expl:"DPI = Dots Per Inch (Points Par Pouce). Pour l'impression professionnelle : 300 DPI minimum. Pour le web : 72 DPI suffit. Plus le DPI est élevé, plus l'image est nette à l'impression." },
];

const TARIFS_DATA = [
  { cat:"Infographie",   service:"Logo simple",              min:15000,  max:50000,  devise:"FCFA", conseil:"Inclure 2-3 propositions initiales et 2 révisions." },
  { cat:"Infographie",   service:"Charte graphique complète",min:80000,  max:250000, devise:"FCFA", conseil:"Logo + couleurs + typographies + guide d'utilisation." },
  { cat:"Infographie",   service:"Flyer / Affiche A4",       min:8000,   max:25000,  devise:"FCFA", conseil:"Tarifer plus si impression incluse." },
  { cat:"Infographie",   service:"Carte de visite (design)", min:5000,   max:15000,  devise:"FCFA", conseil:"Recto-verso = supplément de 30%." },
  { cat:"Infographie",   service:"Post réseaux sociaux (x5)", min:10000, max:35000,  devise:"FCFA", conseil:"Proposer des packs mensuels pour fidéliser." },
  { cat:"Photographie",  service:"Shooting portrait (1h)",   min:20000,  max:75000,  devise:"FCFA", conseil:"Inclure 10-15 photos retouchées livrées." },
  { cat:"Photographie",  service:"Shooting produit (demi-journée)", min:35000, max:100000, devise:"FCFA", conseil:"Tarifer par produit si catalogue volumineux." },
  { cat:"Photographie",  service:"Reportage événement",      min:50000,  max:200000, devise:"FCFA", conseil:"Inclure la durée, le nombre de photos et les droits d'usage." },
  { cat:"Multimédia",    service:"Montage vidéo court (< 3min)", min:25000, max:80000, devise:"FCFA", conseil:"Demander les fichiers bruts bien organisés avant de commencer." },
  { cat:"Multimédia",    service:"Réels / Shorts Instagram",  min:10000, max:40000,  devise:"FCFA", conseil:"Pack de 4 réels/mois = meilleure rentabilité." },
  { cat:"Multimédia",    service:"Motion design (logo animé)", min:30000, max:100000, devise:"FCFA", conseil:"Livrer en MP4 transparent (fond vert ou alpha)." },
  { cat:"Marketing",     service:"Gestion réseaux (1 mois)",  min:30000, max:120000, devise:"FCFA", conseil:"Définir le nombre de publications/semaine dans le contrat." },
];

const PALETTES = [
  { nom:"Sérénité tropicale", couleurs:["#0D9488","#14B8A6","#99F6E4","#F0FDFA","#134E4A"], typo:["Playfair Display","Lato"], usage:"Bien-être, nature, cosmétiques naturels" },
  { nom:"Luxe moderne",       couleurs:["#1C1917","#292524","#D4A853","#F5F5F4","#FFFFFF"], typo:["Cormorant Garamond","Montserrat"], usage:"Mode, bijoux, hôtellerie haut de gamme" },
  { nom:"Tech & Innovation",  couleurs:["#0F172A","#1E293B","#3B82F6","#60A5FA","#E2E8F0"], typo:["Space Grotesk","Inter"], usage:"Startups, apps, tech, SaaS" },
  { nom:"Énergie créative",   couleurs:["#7C3AED","#A855F7","#F472B6","#FDE68A","#FFFFFF"], typo:["Poppins","DM Sans"], usage:"Agence créative, mode jeune, événements" },
  { nom:"Terre & Authenticité",couleurs:["#92400E","#B45309","#D97706","#FEF3C7","#FFFBEB"], typo:["Merriweather","Source Sans Pro"], usage:"Artisanat, alimentation, tourisme local" },
  { nom:"Minimalisme net",    couleurs:["#18181B","#3F3F46","#71717A","#E4E4E7","#FFFFFF"], typo:["IBM Plex Sans","IBM Plex Serif"], usage:"Portfolio, architecture, design épuré" },
];

// ── COMPOSANTS UI ─────────────────────────────────────────
function Btn({ color, textColor="#fff", onClick, children, small }) {
  return <button onClick={onClick} style={{ background:`linear-gradient(135deg,${color},${color}bb)`, border:"none", borderRadius:10, color:textColor, padding:small?"8px 14px":"12px 20px", fontSize:small?12:14, fontWeight:700, cursor:"pointer", fontFamily:"inherit", width:small?"auto":"100%" }}>{children}</button>;
}
function Field({ label, value, onChange, placeholder, type="text" }) {
  return <div><label style={{ color:"#94A3B8", fontSize:12, display:"block", marginBottom:4 }}>{label}</label>
    <input value={value} onChange={onChange} placeholder={placeholder} type={type} style={{ width:"100%", background:"#0F172A", border:"1px solid #334155", borderRadius:8, color:"#F1F5F9", padding:"10px 12px", fontSize:14, fontFamily:"inherit", outline:"none", boxSizing:"border-box" }} /></div>;
}
function Select({ label, value, onChange, options }) {
  return <div><label style={{ color:"#94A3B8", fontSize:12, display:"block", marginBottom:4 }}>{label}</label>
    <select value={value} onChange={onChange} style={{ width:"100%", background:"#0F172A", border:"1px solid #334155", borderRadius:8, color:"#F1F5F9", padding:"10px 12px", fontSize:13, fontFamily:"inherit", outline:"none" }}>
      {options.map(o=><option key={o} value={o}>{o}</option>)}
    </select></div>;
}
function InfoBox({ children, color }) {
  return <div style={{ background:"#1E293B", borderRadius:10, padding:"12px 14px", color:color||"#94A3B8", fontSize:13, lineHeight:1.6 }}>{children}</div>;
}
function Row({ l, v, color, bold }) {
  return <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
    <span style={{ color:"#64748B", fontSize:13 }}>{l}</span>
    <span style={{ color:color||"#F1F5F9", fontWeight:bold?700:500, fontSize:13 }}>{v}</span>
  </div>;
}
function Card({ children, accent }) {
  return <div style={{ background:"#1E293B", borderRadius:12, padding:16, borderLeft:accent?`3px solid ${accent}`:"none", display:"flex", flexDirection:"column", gap:8 }}>{children}</div>;
}
function ChoiceList({ choices, selected, answer, onChoose }) {
  return <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
    {choices.map((c,i)=>{
      let bg="#1E293B", border="#334155", color="#CBD5E1";
      if(selected!==null){ if(i===answer){bg="#064E3B";border="#10B981";color="#6EE7B7";}else if(i===selected){bg="#450A0A";border="#EF4444";color="#FCA5A5";} }
      return <button key={i} onClick={()=>onChoose(i)} style={{ background:bg, border:`1px solid ${border}`, borderRadius:10, color, padding:"11px 14px", fontSize:13, textAlign:"left", cursor:selected===null?"pointer":"default", fontFamily:"inherit", transition:"all 0.2s" }}>
        {["A","B","C","D"][i]}. {c}
      </button>;
    })}
  </div>;
}

// ── MODULE : DIAGNOSTIC ───────────────────────────────────
function DiagnosticModule() {
  const [input,setInput]=useState(""); const [result,setResult]=useState(null);
  const analyser=()=>{ const l=input.toLowerCase(); setResult(PANNES.find(p=>p.symptomes.some(s=>l.includes(s)))||"not_found"); };
  return <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
    <p style={{ color:"#94A3B8", fontSize:13, margin:0 }}>Décris le symptôme (ex : "surchauffe", "vibration", "ne démarre plus"...)</p>
    <textarea value={input} onChange={e=>setInput(e.target.value)} placeholder="Ex: Le moteur vibre depuis ce matin..." style={{ background:"#0F172A", border:"1px solid #334155", borderRadius:10, color:"#F1F5F9", padding:"12px 14px", fontSize:14, minHeight:80, resize:"vertical", fontFamily:"inherit", outline:"none" }} />
    <
