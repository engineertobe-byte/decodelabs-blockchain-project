const hre = require("hardhat");

async function main() {
  // Contract address (replace with the one obtained after deployment)
  const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || "0xYOUR_DEPLOYED_CONTRACT_ADDRESS";
  
  // Candidate ID to vote for (1 = Alice, 2 = Bob, 3 = Charlie)
  const CANDIDATE_ID = parseInt(process.argv[2]) || 1;

  if (CONTRACT_ADDRESS === "0xYOUR_DEPLOYED_CONTRACT_ADDRESS") {
    console.error("Error: Please set the CONTRACT_ADDRESS in your .env file or pass it as argument.");
    process.exit(1);
  }

  console.log(`\n=== Voting System Interaction ===`);
  console.log(`Contract Address: ${CONTRACT_ADDRESS}`);
  console.log(`Network: ${hre.network.name}`);

  // Get the signer
  const [signer] = await hre.ethers.getSigners();
  console.log(`Voter Address: ${signer.address}`);

  // Connect to the contract
  const Voting = await hre.ethers.getContractAt("Voting", CONTRACT_ADDRESS);

  // Check if the user has already voted
  const hasVoted = await Voting.hasVoted(signer.address);
  if (hasVoted) {
    console.log("\n❌ Error: This address has already voted!");
    return;
  }

  // Display candidate info before voting
  try {
    const candidate = await Voting.getCandidate(CANDIDATE_ID);
    console.log(`\nVoting for Candidate ID ${CANDIDATE_ID}: ${candidate[1]}`);
    console.log(`Current vote count: ${candidate[2]}`);
  } catch (error) {
    console.error(`\n❌ Error: Invalid candidate ID ${CANDIDATE_ID}`);
    return;
  }

  // Submit the vote
  console.log("\nSubmitting vote transaction...");
  const tx = await Voting.vote(CANDIDATE_ID);
  
  console.log("Transaction sent. Waiting for confirmation...");
  const receipt = await tx.wait();
  
  console.log(`✅ Vote recorded successfully!`);
  console.log(`Transaction Hash: ${receipt.hash}`);
  console.log(`Block Number: ${receipt.blockNumber}`);
  console.log(`Gas Used: ${receipt.gasUsed.toString()}`);

  // Verify the new vote count
  const updatedCandidate = await Voting.getCandidate(CANDIDATE_ID);
  console.log(`\nUpdated vote count for ${updatedCandidate[1]}: ${updatedCandidate[2]}`);

  // Check if there's a winner
  try {
    const winner = await Voting.getWinner();
    console.log(`\n🏆 Current leader: ${winner[0]} with ${winner[1]} vote(s)`);
  } catch (error) {
    console.log("\nNo votes have been cast yet.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
