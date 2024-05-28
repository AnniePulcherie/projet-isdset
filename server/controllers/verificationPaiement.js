const { Paiement, PaiementMobile, PaiementRecu, PaiementBancaire } = require("../models.js/models")

exports.verification = async (req, res) => {
    const { id } = req.params;
    try {
        let modification; // Déclaration de modification en dehors des blocs if
        const paiementAttente = await Paiement.findOne({
            where: {
                EtudiantId: id,
                etatPaiement: "En attente"
            }
        });
        if (paiementAttente) {
            const mobile = await PaiementMobile.findOne({
                where: {
                    PaiementId: paiementAttente.id,
                }
            });
            if (mobile) {
                const paiementRecu = await PaiementRecu.findOne({
                    where: {
                        operateur: mobile.operateur,
                        reference: mobile.reference,
                        montant: mobile.montant
                    }
                });
                if (paiementRecu) {
                    modification = await Paiement.update(
                        { etatPaiement: "Payé" },
                        {
                            where: {
                                id: paiementAttente.id
                            }
                        });
                }
            } else {
                const bancaire = await PaiementBancaire.findOne({
                    where: {
                        PaiementId: paiementAttente.id
                    }
                });
                if (bancaire) {
                    const paiementBancaire = await PaiementRecu.findOne({
                        where: {
                            agence: bancaire.agence,
                            bordereau: bancaire.bordereau,
                            montant: bancaire.montant
                        }
                    });
                    if (paiementBancaire) {
                        modification = await Paiement.update(
                            { etatPaiement: "Payé" },
                            {
                                where: {
                                    id: paiementAttente.id
                                }
                            });
                    }
                }
            }
            console.log("modification", modification); // Maintenant, modification est accessible ici
            res.json({ modification: "reussi" });
        }
    } catch (error) {
        console.log("erreur de recherche paiement", error);
    }
}
