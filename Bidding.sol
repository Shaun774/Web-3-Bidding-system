// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract BiddingSystem {

    struct Project {
        uint256 id;
        string title;
        string description;
        uint256 budget;
        string category;
        string deadline;
        string duration;
        string requirement;
        address creator;
    }

    uint256 public projectCounter;
    mapping(uint256 => Project) public projects;

    event ProjectCreated(
        uint256 id,
        string title,
        string description,
        uint256 budget,
        string category,
        string deadline,
        string duration,
        string requirement,
        address creator
    );

    function createProject(
        string memory _title,
        string memory _description,
        uint256 _budget,
        string memory _category,
        string memory _deadline,
        string memory _duration,
        string memory _requirement
    ) public {
        uint256 newProjectId = projectCounter;
        projects[newProjectId] = Project({
            id: newProjectId,
            title: _title,
            description: _description,
            budget: _budget,
            category: _category,
            deadline: _deadline,
            duration: _duration,
            requirement: _requirement,
            creator: msg.sender
        });
        emit ProjectCreated(
            newProjectId,
            _title,
            _description,
            _budget,
            _category,
            _deadline,
            _duration,
            _requirement,
            msg.sender
        );
        projectCounter++; // Moved this after storing project
    }

    function getAllProject() public view returns (Project[] memory) {
        Project[] memory all = new Project[](projectCounter);
        for (uint256 i = 0; i < projectCounter; i++) {
            all[i] = projects[i]; // Safer and cleaner: no -1 offset
        }
        return all;
    }
}
