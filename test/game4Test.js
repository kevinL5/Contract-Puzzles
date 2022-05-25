const { assert } = require("chai");

describe("Game4", function () {
  it("should be a winner", async function () {
    const Game = await ethers.getContractFactory("Game4");
    const game = await Game.deploy();
    await game.deployed();

    // nested mappings are rough :}
    const [signer1, signer2] = await ethers.getSigners();

    await game.connect(signer2).write(signer1.address);
    await game.win(signer2.address);

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
