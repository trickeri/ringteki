describe('Embrace the Void', function() {
    integration(function() {
        describe('Embrace the Void/Karmic Twist interaction', function() {
            beforeEach(function() {
                this.setupTest({
                    phase: 'conflict',
                    player1: {
                        fate: 1,
                        inPlay: ['miya-mystic', 'seppun-guardsman'],
                        hand: ['embrace-the-void', 'karmic-twist']
                    }
                });
                this.miyaMystic = this.player1.findCardByName('miya-mystic');
                this.miyaMystic.fate = 2;
                this.embraceTheVoid = this.player1.playAttachment('embrace-the-void', this.miyaMystic);
                this.player2.pass();
                this.karmicTwist = this.player1.clickCard('karmic-twist');
                this.player1.clickCard(this.miyaMystic);
                this.seppunGuardsman = this.player1.clickCard('seppun-guardsman');
                this.player1.clickCard(this.embraceTheVoid);
            });

            it('should give the fate to the player, not transfer it', function() {
                expect(this.player1.fate).toBe(2);
                expect(this.miyaMystic.fate).toBe(0);
                expect(this.seppunGuardsman.fate).toBe(0);
                expect(this.karmicTwist.location).toBe('conflict discard pile');
            });
        });
    });
});
