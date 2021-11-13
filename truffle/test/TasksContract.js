const TasksContract = artifacts.require("TasksContract");

contract("TasksContract", () => {
    before(async () => {
        this.tasksContract = await TasksContract.deployed();
    })

    it("successfully deploy", async () => {
        // tasksContract.address().should.be.a("string");
        const address = this.tasksContract.address;
        assert.notEqual(address, 0x0);
        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
        assert.notEqual(address, "");
    })

    it("get a task", async () => {
        const taskCounter = await this.tasksContract.taskCounter();
        const lastTask = await this.tasksContract.tasks(taskCounter);

        assert.equal(lastTask.id.toNumber(), taskCounter);
    })

    it("create a task", async () => {
        const result = await this.tasksContract.createTask("test title", "test description");
        const taskEvent = result.logs[0].args;

        assert.equal(taskEvent.id.toNumber(), 1 );
        assert.equal(taskEvent.title, "test title");
        assert.equal(taskEvent.description, "test description");
        assert.equal(taskEvent.done, false);
    })

    it("toggleDone a task", async () => {
        const result = await this.tasksContract.toggleDone(1);
        const taskEvent = await result.logs[0].args;

        assert.equal(taskEvent.id.toNumber(), 1 );
        assert.equal(taskEvent.done, true);

        const task = await this.tasksContract.tasks(1);
        assert.equal(task.done, true);



    })
})