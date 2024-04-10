export default interface MediaPreview {
    titre: string;
    uuid: string;
    createur?: {
        nom: string;
        prenom: string;
        avatar: string;
    }
}