const rock = new Rock();

describe("Rock", function() {
    let rock;

    beforeEach(function() {
        rock = new Rock();
    });

    it("Devrait initialiser le compte de pépites d'or à 0", function() {
        expect(rock.goldNuggets).toBe(0);
    });

    it("Devrait incrémenter le compte de pépites d'or lors de l'appel à getNuggets", function() {
        rock.getNuggets();
        expect(rock.goldNuggets).toBe(1);
    });

    it("Devrait mettre à jour le compte de pépites d'or dans nuggetsCounter", function() {
        rock.updateNuggetsCount();
        expect(document.querySelector(".nuggetsCounter").toBe(1));
    });


});



