import {Score, TennisScore} from "./tennis-score";

describe('Tennis Score', () => {

    it("should work", () => expect(true).toBe(true));

    let tennisScore: TennisScore
    beforeEach(() => {
        tennisScore = new TennisScore();
    });

    it("should start with 0 - 0", () => {
        expect(tennisScore.getScore()).toBe("0 - 0");
    });

    it("should be 15 - 0 when player 1 scores", () => {
        tennisScore.player1Scores();
        expect(tennisScore.getScore()).toBe("15 - 0");
    });

    it("should be Adv - 40 after 7 points", () => {
        tennisScore.player1Scores().player2Scores().player1Scores().player2Scores().player2Scores().player1Scores().player1Scores();
        expect(tennisScore.getScore()).toBe(`${Score.Advantage} - ${Score.Forty}`);
    });
});
