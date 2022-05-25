const { assert } = require("chai");

describe("Game5", function () {
  it("should be a winner", async function () {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();
    await game.deployed();

    const threshold = 0x00ffffffffffffffffffffffffffffffffffffff;
    let wallet;

    while (!wallet) {
      const randomWallet = await ethers.Wallet.createRandom();
      if (randomWallet.address < threshold) {
        wallet = randomWallet;
      }
    }

    const [signer] = await ethers.getSigners();

    await signer.sendTransaction({
      to: wallet.address,
      value: ethers.utils.parseUnits("1", "ether"),
    });

    // good luck

    await game.connect(wallet.connect(ethers.provider)).win();

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
