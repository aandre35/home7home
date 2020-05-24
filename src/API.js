
const url = 'http://localhost:8080/api';
const urlUtilisateurs= `${url}/utilisateurs`;
const urlLogements= `${url}/logements`;
const urlServices= `${url}/services`;
const urlEmplois= `${url}/emplois`;
const urlAnnonces= `${url}/annonces`;
const urlPhotos = `${url}/photos`;
const urlTypesEmplois= `${url}/types-emplois`;
const urlTypesLogements = `${url}/types-logements`;
const urlTypesServices = `${url}/types-services`;
const urlTypesAnnonces = `${url}/types-annonces`;
const urlAnnoncesSearch= `${urlAnnonces}/search`;

const urlPost = `/post`;
const urlGet = `/get`;
const urlUtilisateur = `/utilisateur`
const urlConnexion = `/connect`
const urlType =`/type`
const urlSearch= `/search`

module.exports = {
  url : url,

  urlUtilisateurs: urlUtilisateurs,
  urlLogements: urlLogements,
  urlServices: urlServices,
  urlEmplois: urlEmplois,
  urlAnnonces: urlAnnonces,
  urlPhotos: urlPhotos,

  urlTypesEmplois : urlTypesEmplois,
  urlTypesLogements : urlTypesLogements,
  urlTypesServices : urlTypesServices,
  urlTypesAnnonces : urlTypesAnnonces,
  
  urlAnnoncesSearch: urlAnnoncesSearch,

  urlPost: urlPost,
  urlGet: urlGet,
  urlUtilisateur: urlUtilisateur,
  urlConnexion: urlConnexion,
  urlType: urlType,
  urlSearch: urlSearch
};
