const DrawCard = require('../../drawcard.js');

class KarmicTwist extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Move fate from a non-unique character',
            target: {
                activePromptTitle: 'Choose a donor character',
                cardType: 'character',
                cardCondition: (card, context) => !card.isUnique() && card.allowGameAction('removeFate', context),
                gameAction: ability.actions.placeFate(context => ({
                    amount: context.target.fate,
                    origin: context.target,
                    promptForSelect: {
                        activePromptTitle: 'Choose a recipient character',
                        cardType: 'character',
                        cardCondition: (card, context) => !card.isUnique() && card.fate === 0 && card.controller === context.target.controller,
                        message: '{0} moves ' + context.target.fate + ' fate to {2} with {1}'
                    }
                }))
            },
            effect: 'move fate from {0} to another non-unique character'
        });
    }
}

KarmicTwist.id = 'karmic-twist';

module.exports = KarmicTwist;
