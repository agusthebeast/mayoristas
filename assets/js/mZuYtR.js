// Configuración de marca y contacto
const BRAND = {
  color: "#4c2882",
  phone: "541127494568", // WhatsApp internacional sin "+"
};

// URL del logo
const LOGO_URL = "https://res.cloudinary.com/dnvwywqfc/image/upload/v1756656997/SYX_1_thdjbr.png";

// Banners
const BANNERS = [
  "https://res.cloudinary.com/dnvwywqfc/image/upload/v1756658220/Dise%C3%B1o_sin_t%C3%ADtulo_3_iae1ug.png",
  "https://res.cloudinary.com/dnvwywqfc/image/upload/v1756658546/Dise%C3%B1o_sin_t%C3%ADtulo_4_xsyxwv.png",
  "https://res.cloudinary.com/dnvwywqfc/image/upload/v1756658557/Dise%C3%B1o_sin_t%C3%ADtulo_5_wrbfmg.png",
];

// Categorías
const CATEGORIES = [
  {
    id: "remoto",
    nombre: "Control remoto",
    banner: "https://res.cloudinary.com/dnvwywqfc/image/upload/v1756659113/1_gmtrjp.png",
    subcats: ['TV"', 'DVD"', 'LCD"', 'IRF"', 'AAC"'],
  },
  {
    id: "pilas",
    nombre: "Pilas y baterias",
    banner: "https://res.cloudinary.com/dnvwywqfc/image/upload/v1756659114/2_lkamyi.png",
    subcats: ["Pilas", "Baterias", "Pilas recargables y cargadores"],
  },
  {
    id: "accesorios-remoto",
    nombre: "Accesorios Control remoto",
    banner: "https://res.cloudinary.com/dnvwywqfc/image/upload/v1756659113/3_otyzod.png",
    subcats: ["Fundas y proyectores", "Repuestos", "Publicidad"],
  },
];

// Productos (ejemplo)
const PRODUCTS = [
  {id:"P1001", nombre:'Generico', codigo:"TV-01", precio:4500, desc:"LG GOLDSTAR CONTINENTAL KENIA RANSER TELEFUNKEN SERIE DORADA HITACHI CEAGO DREAN GENERALELECTRIC NOBLEX ORIENT ", img:"https://res.cloudinary.com/dnvwywqfc/image/upload/v1756659624/SYX_2_uciink.png", cat:"remoto", sub:'TV"'},
  {id:"P1002", nombre:'Generico', codigo:"DVD-202", precio:4500, desc:"RANSER STROMBERG CARLSON WATSON WINS LYNX HYUNDAI HYPSON GRANDA TATUNG TALENT AKAI ASTRY ", img:"https://res.cloudinary.com/dnvwywqfc/image/upload/v1756659749/SYX_3_h546vs.png", cat:"remoto", sub:'DVD"'},
  {id:"P1001", nombre:'Generico', codigo:"LCD-132", precio:5700, desc:"HITESH", img:"https://images.unsplash.com/photo-1593359677879-28f1d7f78639?q=80&w=1200&auto=format&fit=crop", cat:"remoto", sub:'LCD"'},
  {id:"P1002", nombre:'TV 43" FHD MarcaY', codigo:"TV43FHDY", precio:319999, desc:"Android TV", img:"https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1200&auto=format&fit=crop", cat:"remoto", sub:'IRF"'},

  {id:"P2001", nombre:'Parlante 12" 500W', codigo:"PR12-500", precio:189999, desc:"Con batería", img:"https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop", cat:"audio", sub:"Parlantes"},
  {id:"P2002", nombre:"Soundbar 2.1", codigo:"SB21-300", precio:249999, desc:"Bluetooth + Sub", img:"https://images.unsplash.com/photo-1512445239393-f25164c3a3bf?q=80&w=1200&auto=format&fit=crop", cat:"audio", sub:"Soundbar"},
  {id:"P3001", nombre:'Soporte TV 32-55"', codigo:"SP3255", precio:24999, desc:"Inclinable", img:"https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=1200&auto=format&fit=crop", cat:"accesorios", sub:"Soportes TV"},
  {id:"P3002", nombre:"Cable HDMI 2m", codigo:"HDMI2M", precio:5999, desc:"4K 60Hz", img:"https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200&auto=format&fit=crop", cat:"accesorios", sub:"Cables HDMI"},
  {id:"P3003", nombre:"Control remoto universal", codigo:"CRUNI", precio:7999, desc:"Compatibilidad amplia", img:"https://images.unsplash.com/photo-1620750511550-780c79f08e53?q=80&w=1200&auto=format&fit=crop", cat:"accesorios", sub:"Controles"},
];
