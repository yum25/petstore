import { ADD_PET } from "./types";


export const addPet = petsIndex => (
    {
        type: ADD_PET,
        payload: petsIndex
    }
);
