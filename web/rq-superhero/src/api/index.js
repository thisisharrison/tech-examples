import { httpInstance } from "../utils/axios-utils";

// example of using axios interceptors 
export const fetchSuperHero = id => httpInstance({ url: '/superheroes' + `/${id}` });
