const hre = require("hardhat");

async function main() {
  const BiddingSystem = await hre.ethers.getContractFactory("BiddingSystem");
  const biddingSystem = await BiddingSystem.deploy();

  await biddingSystem.waitForDeployment();
  const contractAddress = await biddingSystem.getAddress();
  console.log(`BiddingSystem deployed to: ${contractAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
