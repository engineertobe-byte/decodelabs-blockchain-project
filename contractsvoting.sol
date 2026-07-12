// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title Voting
 * @dev Decentralized voting system smart contract
 * @notice Deployed as part of Blockchain Technology Project 2 - DecodeLabs
 */
contract Voting {
    // Structure representing a candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    // Storage for candidates
    mapping(uint => Candidate) public candidates;
    
    // Mapping to check if an address has already voted
    mapping(address => bool) public voters;
    
    // Candidates counter
    uint public candidatesCount;
    
    // Owner address (the deployer)
    address public owner;

    // Events for front-end tracking or logs
    event VotedEvent(uint indexed candidateId, address indexed voter);
    event CandidateAdded(uint indexed candidateId, string name);

    // Constructor: Initializes the contract
    constructor() {
        owner = msg.sender;
    }

    // Modifier to restrict access to the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    // Function to add a candidate (owner only)
    function addCandidate(string memory _name) public onlyOwner {
        require(bytes(_name).length > 0, "Candidate name cannot be empty");
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
        emit CandidateAdded(candidatesCount, _name);
    }

    // Function to cast a vote
    function vote(uint _candidateId) public {
        // Check that the candidate exists
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate");
        
        // Check that the voter has not already voted
        require(!voters[msg.sender], "You have already voted");

        // Record the vote
        voters[msg.sender] = true;
        
        // Increment the candidate's vote count
        candidates[_candidateId].voteCount++;
        
        emit VotedEvent(_candidateId, msg.sender);
    }

    // Function to retrieve candidate details
    function getCandidate(uint _candidateId) public view returns (uint, string memory, uint) {
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate");
        Candidate memory c = candidates[_candidateId];
        return (c.id, c.name, c.voteCount);
    }

    // Function to determine the winner
    function getWinner() public view returns (string memory, uint) {
        require(candidatesCount > 0, "No candidates registered");
        
        uint maxVotes = 0;
        uint winnerId = 0;
        
        for (uint i = 1; i <= candidatesCount; i++) {
            if (candidates[i].voteCount > maxVotes) {
                maxVotes = candidates[i].voteCount;
                winnerId = i;
            }
        }
        
        require(winnerId != 0, "No votes have been cast yet");
        return (candidates[winnerId].name, maxVotes);
    }

    // Function to check if an address has voted
    function hasVoted(address _voter) public view returns (bool) {
        return voters[_voter];
    }
}
