// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract TasksContract {
    uint256 public taskCounter = 0;

    struct Task {
        uint256 id;
        string title;
        string description;
        bool done;
        uint256 createdAt;
    }

    event TaskCreated(
        uint256 id,
        string title,
        string description,
        bool done,
        uint256 createdAt
    );

    event TaskToggled(
        uint256 id,
        bool done
    );

    mapping(uint256 => Task) public tasks;

    function createTask(string memory _title, string memory _description)
        public
    {
        taskCounter++;

        tasks[taskCounter] = Task(
            taskCounter,
            _title,
            _description,
            false,
            block.timestamp
        );

        emit TaskCreated(
            taskCounter, _title, _description, false, block.timestamp
        );
        //para que guarda el id dentro de cada task?
    }

    function toggleDone(uint256 _id) public {
        tasks[_id].done = !tasks[_id].done;
        emit TaskToggled(_id, tasks[_id].done);
    }
}
