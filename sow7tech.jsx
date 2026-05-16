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
    <Btn color="#F97316" onClick={analyser}>Analyser →</Btn>
    {result && result!=="not_found" && <Card accent="#F97316">
      <div style={{ color:"#F97316", fontWeight:800, fontSize:15 }}>⚠️ {result.diagnostic}</div>
      <div style={{ color:"#94A3B8", fontSize:12 }}>Causes probables :</div>
      <ul style={{ margin:0, paddingLeft:18 }}>{result.causes.map((c,i)=><li key={i} style={{ color:"#CBD5E1", fontSize:13, marginBottom:3 }}>{c}</li>)}</ul>
      <div style={{ background:"#0F172A", borderRadius:8, padding:"10px 14px" }}>
        <span style={{ color:"#10B981", fontWeight:700, fontSize:13 }}>✅ Action : </span>
        <span style={{ color:"#E2E8F0", fontSize:13 }}>{result.action}</span>
      </div>
    </Card>}
    {result==="not_found" && <InfoBox>Essaie : <em>surchauffe, vibration, démarre pas, bruit, courant, disjoncteur...</em></InfoBox>}
  </div>;
}

// ── MODULE : IMPORT-EXPORT ────────────────────────────────
function ImportExportModule() {
  const [achat,setAchat]=useState(""); const [poids,setPoids]=useState(""); const [qte,setQte]=useState(""); const [r,setR]=useState(null);
  const calc=()=>{ const pa=parseFloat(achat),kg=parseFloat(poids),q=parseFloat(qte)||1; if(!pa||!kg)return; const t=kg*2.5*q,d=pa*q*0.20,rev=pa*q+t+d; setR({t,d,rev,v30:rev*1.30,v50:rev*1.50,m30:rev*0.30,m50:rev*0.50}); };
  return <div style={{ display:"flex", flexDirection:"column", gap:13 }}>
    <p style={{ color:"#94A3B8", fontSize:13, margin:0 }}>Simulateur Maroc ↔ Sénégal · Transport ~2.5 MAD/kg + douane 20%</p>
    {[["💰 Prix achat unitaire (MAD)",achat,setAchat,"ex: 350"],["⚖️ Poids unitaire (kg)",poids,setPoids,"ex: 1.2"],["📦 Quantité",qte,setQte,"ex: 50"]].map(([l,v,s,p])=><Field key={l} label={l} value={v} onChange={e=>s(e.target.value)} placeholder={p} type="number" />)}
    <Btn color="#10B981" onClick={calc}>Calculer →</Btn>
    {r && <Card><Row l="Transport estimé" v={r.t.toFixed(0)+" MAD"}/><Row l="Douane (20%)" v={r.d.toFixed(0)+" MAD"}/><Row l="Prix de revient" v={r.rev.toFixed(0)+" MAD"} bold/><Row l="Vente +30%" v={r.v30.toFixed(0)+" MAD"} color="#10B981"/><Row l="  → Marge" v={r.m30.toFixed(0)+" MAD"} color="#6EE7B7"/><Row l="Vente +50%" v={r.v50.toFixed(0)+" MAD"} color="#34D399"/><Row l="  → Marge" v={r.m50.toFixed(0)+" MAD"} color="#6EE7B7"/></Card>}
  </div>;
}

// ── MODULE : IMMOBILIER ───────────────────────────────────
function ImmoModule() {
  const [prix,setPrix]=useState(""); const [apport,setApport]=useState(""); const [duree,setDuree]=useState("20"); const [taux,setTaux]=useState("5.5"); const [loyer,setLoyer]=useState(""); const [r,setR]=useState(null);
  const calc=()=>{ const P=parseFloat(prix),ap=parseFloat(apport)||0,n=parseFloat(duree)*12,rt=parseFloat(taux)/100/12,L=parseFloat(loyer)||0; const cap=P-ap,men=cap>0?(cap*rt*Math.pow(1+rt,n))/(Math.pow(1+rt,n)-1):0; const total=men*n,cout=total-cap; setR({men,total,cout,rdt:L>0?((L*12)/P*100).toFixed(2):null,cf:L-men,hasL:L>0}); };
  return <div style={{ display:"flex", flexDirection:"column", gap:13 }}>
    <p style={{ color:"#94A3B8", fontSize:13, margin:0 }}>Simule ton investissement à Diamniadio ou Kénitra · FCFA ou MAD</p>
    {[["🏠 Prix du bien",prix,setPrix,"ex: 1200000"],["💳 Apport",apport,setApport,"ex: 200000"],["📅 Durée (années)",duree,setDuree,"ex: 20"],["📊 Taux (%)",taux,setTaux,"ex: 5.5"],["🏘️ Loyer/mois (optionnel)",loyer,setLoyer,"ex: 8000"]].map(([l,v,s,p])=><Field key={l} label={l} value={v} onChange={e=>s(e.target.value)} placeholder={p} type="number" />)}
    <Btn color="#6366F1" onClick={calc}>Simuler →</Btn>
    {r && <Card><Row l="Mensualité" v={r.men.toFixed(0)}/><Row l="Total remboursé" v={r.total.toFixed(0)}/><Row l="Coût du crédit" v={r.cout.toFixed(0)} color="#F87171"/>{r.hasL&&<><Row l="Rendement brut" v={r.rdt+"%"} color="#10B981"/><Row l="Cash-flow/mois" v={r.cf.toFixed(0)} color={r.cf>=0?"#34D399":"#F87171"}/></>}</Card>}
  </div>;
}

// ── MODULE : BUSINESS ─────────────────────────────────────
function BusinessModule() {
  const [achat,setAchat]=useState(""); const [vente,setVente]=useState(""); const [qte,setQte]=useState("1"); const [charges,setCharges]=useState(""); const [devise,setDevise]=useState("FCFA"); const [r,setR]=useState(null);
  const calc=()=>{ const pa=parseFloat(achat),pv=parseFloat(vente),q=parseFloat(qte)||1,ch=parseFloat(charges)||0; if(!pa||!pv)return; const ca=pv*q,rev=pa*q+ch,ben=ca-rev; setR({ca,rev,ben,marge:((ben/ca)*100).toFixed(1),markup:((ben/(pa*q))*100).toFixed(1),pu:(ben/q).toFixed(0)}); };
  return <div style={{ display:"flex", flexDirection:"column", gap:13 }}>
    <p style={{ color:"#94A3B8", fontSize:13, margin:0 }}>Calcule ton bénéfice, ta marge et ton chiffre d'affaires.</p>
    <div style={{ display:"flex", gap:8 }}>{["FCFA","MAD"].map(d=><button key={d} onClick={()=>setDevise(d)} style={{ flex:1, background:devise===d?"#F59E0B22":"#0F172A", border:`1px solid ${devise===d?"#F59E0B":"#334155"}`, borderRadius:8, color:devise===d?"#F59E0B":"#64748B", padding:"8px", fontSize:13, fontWeight:devise===d?700:400, cursor:"pointer", fontFamily:"inherit" }}>{d}</button>)}</div>
    {[["🛒 Prix achat unitaire",achat,setAchat,"ex: 8000"],["🏷️ Prix vente unitaire",vente,setVente,"ex: 15000"],["📦 Quantité",qte,setQte,"ex: 20"],["⚙️ Charges fixes",charges,setCharges,"ex: 5000"]].map(([l,v,s,p])=><Field key={l} label={`${l} (${devise})`} value={v} onChange={e=>s(e.target.value)} placeholder={p} type="number" />)}
    <Btn color="#F59E0B" onClick={calc}>Calculer →</Btn>
    {r && <Card>
      <Row l="Chiffre d'affaires" v={`${r.ca.toFixed(0)} ${devise}`} bold/>
      <Row l="Prix de revient" v={`${r.rev.toFixed(0)} ${devise}`} color="#F87171"/>
      <Row l="Bénéfice net" v={`${r.ben.toFixed(0)} ${devise}`} color={r.ben>=0?"#34D399":"#F87171"} bold/>
      <Row l="Marge nette" v={`${r.marge}%`} color="#F59E0B"/>
      <Row l="Markup" v={`${r.markup}%`} color="#FCD34D"/>
      <Row l="Gain par unité" v={`${r.pu} ${devise}`} color="#94A3B8"/>
      {r.ben<0 && <div style={{ background:"#450A0A", borderRadius:8, padding:"8px 12px", color:"#FCA5A5", fontSize:12 }}>⚠️ Tu vends à perte. Augmente le prix ou réduis les charges.</div>}
    </Card>}
  </div>;
}

// ── MODULE : DEVIS CRÉATIF ────────────────────────────────
const PRESTATIONS = ["Logo simple","Charte graphique","Flyer / Affiche","Carte de visite","Post réseaux sociaux","Shooting portrait","Shooting produit","Reportage événement","Montage vidéo","Réel / Short","Motion design","Gestion réseaux (mois)"];
const COMPLEXITE = { "Simple":1, "Standard":1.5, "Complexe":2.2, "Premium":3 };

function DevisModule() {
  const [client,setClient]=useState(""); const [presta,setPresta]=useState(PRESTATIONS[0]); const [cpx,setCpx]=useState("Standard"); const [heures,setHeures]=useState(""); const [taux,setTaux]=useState("3000"); const [devise,setDevise]=useState("FCFA"); const [r,setR]=useState(null); const [copie,setCopie]=useState(false);

  const calc=()=>{
    const h=parseFloat(heures)||1, t=parseFloat(taux)||3000, mult=COMPLEXITE[cpx];
    const base=h*t*mult, tva=base*0.18, total=base+tva;
    setR({base,tva,total,h,t,mult,acompte:total*0.5});
  };

  const devisTexte=r?`DEVIS — ${new Date().toLocaleDateString("fr-FR")}
Client : ${client||"À compléter"}
Prestation : ${presta} (${cpx})
Durée estimée : ${r.h}h
────────────────────
Montant HT : ${r.base.toFixed(0)} ${devise}
TVA (18%)  : ${r.tva.toFixed(0)} ${devise}
TOTAL TTC  : ${r.total.toFixed(0)} ${devise}
Acompte (50%) : ${r.acompte.toFixed(0)} ${devise}
────────────────────
Validité : 30 jours`:"";

  return <div style={{ display:"flex", flexDirection:"column", gap:13 }}>
    <p style={{ color:"#94A3B8", fontSize:13, margin:0 }}>Génère un devis pro en quelques secondes.</p>
    <div style={{ display:"flex", gap:8 }}>{["FCFA","MAD"].map(d=><button key={d} onClick={()=>setDevise(d)} style={{ flex:1, background:devise===d?"#E879F922":"#0F172A", border:`1px solid ${devise===d?"#E879F9":"#334155"}`, borderRadius:8, color:devise===d?"#E879F9":"#64748B", padding:"8px", fontSize:13, fontWeight:devise===d?700:400, cursor:"pointer", fontFamily:"inherit" }}>{d}</button>)}</div>
    <Field label="👤 Nom du client" value={client} onChange={e=>setClient(e.target.value)} placeholder="ex: Boutique Aminata" />
    <Select label="🎨 Type de prestation" value={presta} onChange={e=>setPresta(e.target.value)} options={PRESTATIONS} />
    <Select label="⚙️ Complexité" value={cpx} onChange={e=>setCpx(e.target.value)} options={Object.keys(COMPLEXITE)} />
    <Field label={`⏱️ Nombre d'heures estimé`} value={heures} onChange={e=>setHeures(e.target.value)} placeholder="ex: 4" type="number" />
    <Field label={`💰 Taux horaire (${devise})`} value={taux} onChange={e=>setTaux(e.target.value)} placeholder="ex: 3000" type="number" />
    <Btn color="#E879F9" onClick={calc}>Générer le devis →</Btn>
    {r && <>
      <Card accent="#E879F9">
        <Row l="Montant HT" v={`${r.base.toFixed(0)} ${devise}`}/>
        <Row l="TVA 18%" v={`${r.tva.toFixed(0)} ${devise}`} color="#94A3B8"/>
        <Row l="TOTAL TTC" v={`${r.total.toFixed(0)} ${devise}`} bold color="#E879F9"/>
        <Row l="Acompte (50%)" v={`${r.acompte.toFixed(0)} ${devise}`} color="#FCD34D"/>
      </Card>
      <div style={{ background:"#0F172A", borderRadius:10, padding:"12px 14px", fontFamily:"monospace", fontSize:11, color:"#94A3B8", whiteSpace:"pre-line", lineHeight:1.8 }}>{devisTexte}</div>
      <Btn color="#E879F9" onClick={()=>{ navigator.clipboard?.writeText(devisTexte); setCopie(true); setTimeout(()=>setCopie(false),2000); }}>{copie?"✅ Copié !":"📋 Copier le devis"}</Btn>
    </>}
  </div>;
}

// ── MODULE : BRIEF CLIENT ─────────────────────────────────
function BriefModule() {
  const [f,setF]=useState({ nom:"", projet:"", description:"", cible:"", couleurs:"", style:"", formats:"", deadline:"", budget:"", livrables:"" });
  const [brief,setBrief]=useState(""); const [copie,setCopie]=useState(false);
  const update=(k,v)=>setF(p=>({...p,[k]:v}));
  const generer=()=>{
    const b=`📋 BRIEF CLIENT — ${new Date().toLocaleDateString("fr-FR")}
━━━━━━━━━━━━━━━━━━━━
👤 Client : ${f.nom||"—"}
🎯 Projet : ${f.projet||"—"}
📝 Description : ${f.description||"—"}
👥 Cible : ${f.cible||"—"}
━━━━━━━━━━━━━━━━━━━━
🎨 Couleurs souhaitées : ${f.couleurs||"—"}
✨ Style / Ambiance : ${f.style||"—"}
📐 Formats attendus : ${f.formats||"—"}
━━━━━━━━━━━━━━━━━━━━
📦 Livrables : ${f.livrables||"—"}
📅 Deadline : ${f.deadline||"—"}
💰 Budget : ${f.budget||"—"}
━━━━━━━━━━━━━━━━━━━━
Document généré via Sow7Tech Assistance`;
    setBrief(b);
  };
  return <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
    <p style={{ color:"#94A3B8", fontSize:13, margin:0 }}>Remplis ce formulaire avant chaque projet pour éviter les malentendus avec le client.</p>
    {[["👤 Nom du client","nom","ex: Boutique Fatou"],["🎯 Type de projet","projet","ex: Logo + charte graphique"],["📝 Description du projet","description","ex: Boutique de mode africaine moderne..."],["👥 Cible visée","cible","ex: Femmes 25-45 ans, classe moyenne+"],["🎨 Couleurs souhaitées","couleurs","ex: Doré, crème, bordeaux"],["✨ Style / Ambiance","style","ex: Élégant, traditionnel moderne"],["📐 Formats à livrer","formats","ex: PNG, PDF, SVG"],["📦 Livrables attendus","livrables","ex: Logo, carte de visite, entête email"],["📅 Deadline","deadline","ex: 15 juin 2026"],["💰 Budget","budget","ex: 50 000 FCFA"]].map(([l,k,p])=>(
      <Field key={k} label={l} value={f[k]} onChange={e=>update(k,e.target.value)} placeholder={p} />
    ))}
    <Btn color="#FB7185" onClick={generer}>Générer le brief →</Btn>
    {brief && <>
      <div style={{ background:"#0F172A", borderRadius:10, padding:"12px 14px", fontFamily:"monospace", fontSize:11, color:"#94A3B8", whiteSpace:"pre-line", lineHeight:1.8 }}>{brief}</div>
      <Btn color="#FB7185" onClick={()=>{ navigator.clipboard?.writeText(brief); setCopie(true); setTimeout(()=>setCopie(false),2000); }}>{copie?"✅ Copié !":"📋 Copier le brief"}</Btn>
    </>}
  </div>;
}

// ── MODULE : PALETTE & TYPO ───────────────────────────────
function PaletteModule() {
  const [sel,setSel]=useState(0);
  const p=PALETTES[sel];
  return <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
    <p style={{ color:"#94A3B8", fontSize:13, margin:0 }}>Explore des palettes harmonieuses et leurs typographies associées.</p>
    <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
      {PALETTES.map((pl,i)=>(
        <button key={i} onClick={()=>setSel(i)} style={{ background:i===sel?"#1E293B":"#0F172A", border:`1px solid ${i===sel?"#A78BFA":"#1E293B"}`, borderRadius:10, padding:"10px 14px", cursor:"pointer", display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ display:"flex", gap:3 }}>{pl.couleurs.map((c,j)=><div key={j} style={{ width:14, height:14, borderRadius:4, background:c }} />)}</div>
          <span style={{ color:i===sel?"#E2E8F0":"#64748B", fontSize:13, fontWeight:i===sel?700:400 }}>{pl.nom}</span>
        </button>
      ))}
    </div>
    <Card accent="#A78BFA">
      <div style={{ color:"#A78BFA", fontWeight:800, fontSize:15 }}>{p.nom}</div>
      <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
        {p.couleurs.map((c,i)=>(
          <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
            <div style={{ width:44, height:44, borderRadius:10, background:c, border:"1px solid #334155" }} />
            <span style={{ color:"#64748B", fontSize:10, fontFamily:"monospace" }}>{c}</span>
          </div>
        ))}
      </div>
      <div style={{ color:"#94A3B8", fontSize:12, marginTop:4 }}>
        <span style={{ color:"#CBD5E1", fontWeight:600 }}>Typographies : </span>{p.typo.join(" + ")}
      </div>
      <div style={{ color:"#94A3B8", fontSize:12 }}>
        <span style={{ color:"#CBD5E1", fontWeight:600 }}>Usage idéal : </span>{p.usage}
      </div>
    </Card>
  </div>;
}

// ── MODULE : TARIFS MARCHÉ ────────────────────────────────
function TarifsModule() {
  const cats=["Tous",...new Set(TARIFS_DATA.map(t=>t.cat))];
  const [cat,setCat]=useState("Tous");
  const filtered=cat==="Tous"?TARIFS_DATA:TARIFS_DATA.filter(t=>t.cat===cat);
  return <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
    <p style={{ color:"#94A3B8", fontSize:13, margin:0 }}>Prix pratiqués au Sénégal et au Maroc. Ne te sous-vends jamais !</p>
    <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
      {cats.map(c=><button key={c} onClick={()=>setCat(c)} style={{ background:cat===c?"#34D39922":"#1E293B", border:`1px solid ${cat===c?"#34D399":"#334155"}`, borderRadius:20, color:cat===c?"#34D399":"#64748B", padding:"6px 14px", fontSize:12, cursor:"pointer", fontFamily:"inherit", fontWeight:cat===c?700:400 }}>{c}</button>)}
    </div>
    <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
      {filtered.map((t,i)=>(
        <Card key={i} accent="#34D399">
          <div style={{ color:"#F1F5F9", fontWeight:700, fontSize:13 }}>{t.service}</div>
          <div style={{ display:"flex", gap:6, alignItems:"center" }}>
            <span style={{ background:"#34D39922", color:"#34D399", borderRadius:20, padding:"3px 10px", fontSize:12, fontWeight:700 }}>{t.cat}</span>
            <span style={{ color:"#10B981", fontWeight:700, fontSize:13 }}>{t.min.toLocaleString()} – {t.max.toLocaleString()} {t.devise}</span>
          </div>
          <div style={{ color:"#64748B", fontSize:12 }}>💡 {t.conseil}</div>
        </Card>
      ))}
    </div>
  </div>;
}

// ── MODULE : QUIZ CRÉATIF ─────────────────────────────────
function QuizCreatifModule() {
  const cats=["Tout",...new Set(QUIZ_CREATIF.map(q=>q.cat))];
  const [catFilter,setCatFilter]=useState("Tout");
  const [mode,setMode]=useState("menu");
  const [questions,setQuestions]=useState([]);
  const [idx,setIdx]=useState(0); const [sel,setSel]=useState(null); const [score,setScore]=useState(0); const [wrongs,setWrongs]=useState([]);

  const start=()=>{
    const pool=catFilter==="Tout"?QUIZ_CREATIF:QUIZ_CREATIF.filter(q=>q.cat===catFilter);
    setQuestions([...pool].sort(()=>Math.random()-0.5).slice(0,Math.min(10,pool.length)));
    setIdx(0);setSel(null);setScore(0);setWrongs([]);setMode("quiz");
  };
  const choisir=(i)=>{ if(sel!==null)return; setSel(i); if(i===questions[idx].answer)setScore(s=>s+1); else setWrongs(w=>[...w,{...questions[idx],chosen:i}]); };
  const suivant=()=>{ if(idx+1>=questions.length){setMode("result");return;} setIdx(idx+1);setSel(null); };
  const pct=questions.length>0?Math.round((score/questions.length)*100):0;

  if(mode==="menu") return <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
    <p style={{ color:"#94A3B8", fontSize:13, margin:0 }}>Quiz pour réviser infographie, photo, multimédia et marketing. Choisis une catégorie :</p>
    <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
      {cats.map(c=><button key={c} onClick={()=>setCatFilter(c)} style={{ background:catFilter===c?"#F472B622":"#1E293B", border:`1px solid ${catFilter===c?"#F472B6":"#334155"}`, borderRadius:20, color:catFilter===c?"#F472B6":"#64748B", padding:"7px 14px", fontSize:12, cursor:"pointer", fontFamily:"inherit", fontWeight:catFilter===c?700:400 }}>{c}</button>)}
    </div>
    <Btn color="#F472B6" onClick={start}>Démarrer →</Btn>
    <Card>
      <div style={{ color:"#F472B6", fontWeight:700, fontSize:12, marginBottom:4 }}>📚 Ce quiz couvre :</div>
      {["Photographie : exposition, composition, balance des blancs","Infographie : vectoriel, calques, modes couleur, formats","Multimédia : codecs, résolutions, formats vidéo","Marketing : engagement, CTA, formats réseaux","Couleurs : complémentaires, DPI, cercle chromatique"].map((t,i)=><div key={i} style={{ color:"#94A3B8", fontSize:12 }}>· {t}</div>)}
    </Card>
  </div>;

  if(mode==="result") return <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:16, textAlign:"center", padding:"8px 0" }}>
    <div style={{ fontSize:44 }}>{pct>=80?"🏆":pct>=60?"👍":"📚"}</div>
    <div><div style={{ color:"#F472B6", fontSize:26, fontWeight:800 }}>{score}/{questions.length}</div><div style={{ color:"#64748B", fontSize:13 }}>{pct}% de bonnes réponses</div></div>
    <div style={{ color:pct>=80?"#34D399":pct>=60?"#FCD34D":"#F87171", fontSize:14, fontWeight:600 }}>{pct>=80?"Excellent ! Maîtrise confirmée 🎨":pct>=60?"Bon niveau, continue à réviser !":"Quelques notions à retravailler."}</div>
    {wrongs.length>0 && <div style={{ width:"100%", background:"#1E293B", borderRadius:12, padding:14, textAlign:"left" }}>
      <div style={{ color:"#F87171", fontWeight:700, fontSize:13, marginBottom:10 }}>Questions ratées :</div>
      {wrongs.map((w,i)=><div key={i} style={{ marginBottom:12, borderBottom:"1px solid #334155", paddingBottom:10 }}>
        <div style={{ color:"#CBD5E1", fontSize:12, fontWeight:600, marginBottom:4 }}>{w.q}</div>
        <div style={{ color:"#F87171", fontSize:12 }}>❌ {w.choices[w.chosen]}</div>
        <div style={{ color:"#34D399", fontSize:12 }}>✅ {w.choices[w.answer]}</div>
        <div style={{ color:"#64748B", fontSize:11, marginTop:4 }}>{w.expl}</div>
      </div>)}
    </div>}
    <div style={{ display:"flex", gap:10, width:"100%" }}>
      <button onClick={()=>setMode("menu")} style={{ flex:1, background:"#1E293B", border:"1px solid #334155", borderRadius:10, color:"#94A3B8", padding:"11px", fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>← Catégories</button>
      <button onClick={start} style={{ flex:2, background:"linear-gradient(135deg,#F472B6,#FB7185)", border:"none", borderRadius:10, color:"#fff", padding:"11px", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>Recommencer</button>
    </div>
  </div>;

  const q=questions[idx];
  return <div style={{ display:"flex", flexDirection:"column", gap:13 }}>
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
      <span style={{ background:"#F472B622", color:"#F472B6", borderRadius:20, padding:"3px 10px", fontSize:11, fontWeight:700 }}>{q.cat}</span>
      <span style={{ color:"#64748B", fontSize:12 }}>{idx+1}/{questions.length} · ✅ {score}</span>
    </div>
    <div style={{ background:"#1E293B", borderRadius:10, height:4 }}><div style={{ background:"#F472B6", borderRadius:10, height:4, width:`${((idx+1)/questions.length)*100}%`, transition:"width 0.4s" }} /></div>
    <div style={{ background:"#1E293B", borderRadius:12, padding:16, color:"#F1F5F9", fontSize:14, fontWeight:600, lineHeight:1.6 }}>{q.q}</div>
    <ChoiceList choices={q.choices} selected={sel} answer={q.answer} onChoose={choisir} />
    {sel!==null && <InfoBox>💡 {q.expl}</InfoBox>}
    {sel!==null && <Btn color="#F472B6" onClick={suivant}>{idx+1>=questions.length?"Voir résultat →":"Question suivante →"}</Btn>}
  </div>;
}

// ── MODULE : CODE DE LA ROUTE ─────────────────────────────
function CodeRouteModule() {
  const cats=["Tout",...new Set(CODE_ROUTE.map(q=>q.cat))];
  const [catFilter,setCatFilter]=useState("Tout"); const [mode,setMode]=useState("menu"); const [questions,setQuestions]=useState([]); const [idx,setIdx]=useState(0); const [sel,setSel]=useState(null); const [score,setScore]=useState(0); const [wrongs,setWrongs]=useState([]);
  const start=()=>{ const pool=catFilter==="Tout"?CODE_ROUTE:CODE_ROUTE.filter(q=>q.cat===catFilter); setQuestions([...pool].sort(()=>Math.random()-0.5).slice(0,Math.min(8,pool.length))); setIdx(0);setSel(null);setScore(0);setWrongs([]);setMode("quiz"); };
  const choisir=(i)=>{ if(sel!==null)return; setSel(i); if(i===questions[idx].answer)setScore(s=>s+1); else setWrongs(w=>[...w,{...questions[idx],chosen:i}]); };
  const suivant=()=>{ if(idx+1>=questions.length){setMode("result");return;} setIdx(idx+1);setSel(null); };
  const pct=questions.length>0?Math.round((score/questions.length)*100):0;

  if(mode==="menu") return <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
    <p style={{ color:"#94A3B8", fontSize:13, margin:0 }}>Prépare ton permis marocain. Choisis une catégorie :</p>
    <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>{cats.map(c=><button key={c} onClick={()=>setCatFilter(c)} style={{ background:catFilter===c?"#38BDF822":"#1E293B", border:`1px solid ${catFilter===c?"#38BDF8":"#334155"}`, borderRadius:20, color:catFilter===c?"#38BDF8":"#64748B", padding:"7px 14px", fontSize:12, cursor:"pointer", fontFamily:"inherit", fontWeight:catFilter===c?700:400 }}>{c}</button>)}</div>
    <Btn color="#38BDF8" textColor="#0F172A" onClick={start}>Démarrer →</Btn>
    <Card><div style={{ color:"#38BDF8", fontWeight:700, fontSize:12, marginBottom:6 }}>📋 À retenir :</div>{["Agglomération : 50 km/h","Route : 100 km/h · Autoroute : 120 km/h","Alcoolémie max : 0,5 g/L","Priorité à droite (carrefour non signalisé)","Distance sécurité : 2 secondes"].map((t,i)=><div key={i} style={{ color:"#94A3B8", fontSize:12 }}>· {t}</div>)}</Card>
  </div>;

  if(mode==="result") return <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:16, textAlign:"center" }}>
    <div style={{ fontSize:44 }}>{pct>=80?"🏆":pct>=60?"👍":"📚"}</div>
    <div><div style={{ color:"#38BDF8", fontSize:26, fontWeight:800 }}>{score}/{questions.length}</div><div style={{ color:"#64748B", fontSize:13 }}>{pct}%</div></div>
    <div style={{ color:pct>=80?"#34D399":pct>=60?"#FCD34D":"#F87171", fontSize:14, fontWeight:600 }}>{pct>=80?"Prêt(e) pour l'examen !":pct>=60?"Continue à réviser !":"Quelques notions à retravailler."}</div>
    {wrongs.length>0 && <div style={{ width:"100%", background:"#1E293B", borderRadius:12, padding:14, textAlign:"left" }}>
      <div style={{ color:"#F87171", fontWeight:700, fontSize:13, marginBottom:10 }}>Questions ratées :</div>
      {wrongs.map((w,i)=><div key={i} style={{ marginBottom:12, borderBottom:"1px solid #334155", paddingBottom:10 }}>
        <div style={{ color:"#CBD5E1", fontSize:12, fontWeight:600, marginBottom:4 }}>{w.q}</div>
        <div style={{ color:"#F87171", fontSize:12 }}>❌ {w.choices[w.chosen]}</div>
        <div style={{ color:"#34D399", fontSize:12 }}>✅ {w.choices[w.answer]}</div>
        <div style={{ color:"#64748B", fontSize:11, marginTop:4 }}>{w.expl}</div>
      </div>)}
    </div>}
    <div style={{ display:"flex", gap:10, width:"100%" }}>
      <button onClick={()=>setMode("menu")} style={{ flex:1, background:"#1E293B", border:"1px solid #334155", borderRadius:10, color:"#94A3B8", padding:"11px", fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>← Catégories</button>
      <button onClick={start} style={{ flex:2, background:"linear-gradient(135deg,#38BDF8,#7DD3FC)", border:"none", borderRadius:10, color:"#0F172A", padding:"11px", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>Recommencer</button>
    </div>
  </div>;

  const q=questions[idx];
  return <div style={{ display:"flex", flexDirection:"column", gap:13 }}>
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
      <span style={{ background:"#38BDF822", color:"#38BDF8", borderRadius:20, padding:"3px 10px", fontSize:11, fontWeight:700 }}>{q.cat}</span>
      <span style={{ color:"#64748B", fontSize:12 }}>{idx+1}/{questions.length} · ✅ {score}</span>
    </div>
    <div style={{ background:"#1E293B", borderRadius:10, height:4 }}><div style={{ background:"#38BDF8", borderRadius:10, height:4, width:`${((idx+1)/questions.length)*100}%`, transition:"width 0.4s" }} /></div>
    <div style={{ background:"#1E293B", borderRadius:12, padding:16, color:"#F1F5F9", fontSize:14, fontWeight:600, lineHeight:1.6 }}>{q.q}</div>
    <ChoiceList choices={q.choices} selected={sel} answer={q.answer} onChoose={choisir} />
    {sel!==null && <InfoBox>💡 {q.expl}</InfoBox>}
    {sel!==null && <Btn color="#38BDF8" textColor="#0F172A" onClick={suivant}>{idx+1>=questions.length?"Voir résultat →":"Suivant →"}</Btn>}
  </div>;
}

// ── MODULE : QUIZ TECHNIQUE ───────────────────────────────
function QuizModule() {
  const [idx,setIdx]=useState(0); const [sel,setSel]=useState(null); const [score,setScore]=useState(0); const [done,setDone]=useState(false);
  const choisir=(i)=>{ if(sel!==null)return; setSel(i); if(i===QUIZ_TECH[idx].answer)setScore(s=>s+1); };
  const suivant=()=>{ if(idx+1>=QUIZ_TECH.length){setDone(true);return;} setIdx(idx+1);setSel(null); };
  const reset=()=>{ setIdx(0);setSel(null);setScore(0);setDone(false); };
  if(done) return <div style={{ textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center", gap:14, padding:"10px 0" }}>
    <div style={{ fontSize:44 }}>{score>=5?"🏆":score>=4?"👍":"📚"}</div>
    <div style={{ color:"#EC4899", fontSize:24, fontWeight:800 }}>{score}/{QUIZ_TECH.length}</div>
    <div style={{ color:"#94A3B8", fontSize:13 }}>{score===QUIZ_TECH.length?"Maîtrise parfaite !":score>=4?"Bon niveau !":"Révise les bases."}</div>
    <Btn color="#EC4899" onClick={reset}>Recommencer</Btn>
  </div>;
  const q=QUIZ_TECH[idx];
  return <div style={{ display:"flex", flexDirection:"column", gap:13 }}>
    <div style={{ display:"flex", justifyContent:"space-between" }}>
      <span style={{ color:"#64748B", fontSize:12 }}>Q {idx+1}/{QUIZ_TECH.length}</span>
      <span style={{ color:"#EC4899", fontSize:12, fontWeight:700 }}>Score : {score}</span>
    </div>
    <div style={{ background:"#1E293B", borderRadius:12, padding:16, color:"#F1F5F9", fontSize:14, fontWeight:600, lineHeight:1.5 }}>{q.q}</div>
    <ChoiceList choices={q.choices} selected={sel} answer={q.answer} onChoose={choisir} />
    {sel!==null && <InfoBox>💡 {q.expl}</InfoBox>}
    {sel!==null && <Btn color="#EC4899" onClick={suivant}>{idx+1>=QUIZ_TECH.length?"Voir résultat →":"Suivant →"}</Btn>}
  </div>;
}

// ── APP PRINCIPALE ────────────────────────────────────────
const MODULE_MAP = {
  diagnostic:<DiagnosticModule/>, import:<ImportExportModule/>, immo:<ImmoModule/>,
  business:<BusinessModule/>, devis:<DevisModule/>, brief:<BriefModule/>,
  palette:<PaletteModule/>, tarifs:<TarifsModule/>, quizcrea:<QuizCreatifModule/>,
  code:<CodeRouteModule/>, quiz:<QuizModule/>,
};
const TITLES = {
  diagnostic:"Diagnostic Électromécanique", import:"Calculateur Import-Export",
  immo:"Simulateur Immobilier", business:"Mon Business",
  devis:"Générateur de Devis", brief:"Brief Client",
  palette:"Palette & Typographie", tarifs:"Tarifs du Marché",
  quizcrea:"Quiz Créatif", code:"Code de la Route", quiz:"Quiz Technique Élec",
};

export default function App() {
  const [active, setActive] = useState("diagnostic");
  const [section, setSection] = useState("pro");
  const mod = MODULES.find(m => m.id === active);
  const sec = SECTIONS.find(s => s.id === section);
  const visibleModules = MODULES.filter(m => m.section === section);

  const handleSection = (s) => {
    setSection(s);
    const first = MODULES.find(m => m.section === s);
    if (first) setActive(first.id);
  };

  return (
    <div style={{ minHeight:"100vh", background:"#020817", display:"flex", flexDirection:"column", alignItems:"center", fontFamily:"'Sora','Segoe UI',sans-serif", padding:"20px 14px" }}>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />

      {/* HEADER */}
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:18, width:"100%", maxWidth:520 }}>
        <div style={{ width:42, height:42, borderRadius:12, flexShrink:0, background:`linear-gradient(135deg,${mod.color},${mod.color}88)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>⚡</div>
        <div>
          <div style={{ fontSize:20, fontWeight:800, color:"#F1F5F9", lineHeight:1.1 }}>
            Sow7Tech <span style={{ color:mod.color }}>Assistance</span>
          </div>
          <div style={{ fontSize:10, color:"#475569", letterSpacing:2, textTransform:"uppercase", marginTop:2 }}>Ton assistant personnel &amp; pro</div>
        </div>
      </div>

      {/* SECTIONS */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:6, width:"100%", maxWidth:520, marginBottom:10 }}>
        {SECTIONS.map(s=>(
          <button key={s.id} onClick={()=>handleSection(s.id)} style={{ background:section===s.id?s.color+"33":"#0F172A", border:`1.5px solid ${section===s.id?s.color:"#1E293B"}`, borderRadius:10, color:section===s.id?s.color:"#475569", padding:"9px 4px", fontSize:11, fontWeight:section===s.id?700:500, cursor:"pointer", fontFamily:"inherit", lineHeight:1.3, transition:"all 0.2s" }}>{s.label}</button>
        ))}
      </div>

      {/* MODULES DE LA SECTION */}
      <div style={{ display:"grid", gridTemplateColumns:`repeat(${Math.min(visibleModules.length,3)},1fr)`, gap:7, width:"100%", maxWidth:520, marginBottom:18 }}>
        {visibleModules.map(m=>(
          <button key={m.id} onClick={()=>setActive(m.id)} style={{ background:active===m.id?m.color+"22":"#0F172A", border:`1.5px solid ${active===m.id?m.color:"#1E293B"}`, borderRadius:10, color:active===m.id?m.color:"#475569", padding:"9px 5px", fontSize:10.5, fontWeight:active===m.id?700:500, cursor:"pointer", fontFamily:"inherit", lineHeight:1.4, transition:"all 0.2s" }}>{m.label}</button>
        ))}
      </div>

      {/* MODULE ACTIF */}
      <div style={{ width:"100%", maxWidth:520, background:"#0A1628", border:`1px solid ${mod.color}33`, borderRadius:16, padding:"20px 16px", boxShadow:`0 0 40px ${mod.color}10` }}>
        <h2 style={{ margin:"0 0 16px", fontSize:16, fontWeight:800, color:mod.color }}>{TITLES[active]}</h2>
        {MODULE_MAP[active]}
      </div>

      <div style={{ color:"#334155", fontSize:11, marginTop:18 }}>Sow7Tech Assistance · Kénitra 🇸🇳 · FCFA</div>
    </div>
  );
}
