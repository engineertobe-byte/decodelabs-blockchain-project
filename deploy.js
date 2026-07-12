const hre = require("hardhat");

async function main() {
  console.log("Deploying the Voting contract...");

  // Get the deployer (the account paying gas fees)
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  // Check balance
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "ETH");

  // Deploy the contract
  const Voting = await hre.ethers.getContractFactory("Voting");
  const votingContract = await Voting.deploy();

  await votingContract.waitForDeployment();
  
  const contractAddress = await votingContract.getAddress();
  console.log("Contract deployed to:", contractAddress);

  // Add test candidates
  console.log("Adding candidates...");
  
  const tx1 = await votingContract.addCandidate("Alice Johnson");
  await tx1.wait();
  console.log("Candidate 'Alice Johnson' added (ID: 1)");

  const tx2 = await votingContract.addCandidate("Bob Smith");
  await tx2.wait();
  console.log("Candidate 'Bob Smith' added (ID: 2)");

  const tx3 = await votingContract.addCandidate("Charlie Brown");
  await tx3.wait();
  console.log("Candidate 'Charlie Brown' added (ID: 3)");

  console.log("\n=== Deployment Summary ===");
  console.log("Network:", hre.network.name);
  console.log("Contract Address:", contractAddress);
  console.log("Total Candidates:", (await votingContract.candidatesCount()).toString());
  console.log("==========================");
  console.log("\nDeployment completed successfully!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
