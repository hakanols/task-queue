import test from './tap-esm.js';
import TaskQueue from '../src/task-queue.js';

function throwError(text){
	return (resolve, reject) => reject(text)
}

function returnValue(value){
	return resolve => resolve(value);
}

function sleep(milliseconds){
	return resolve => setTimeout(resolve, milliseconds)
}

async function someThingAsync(resolve){
    return new Promise(() => {
        setTimeout(resolve, 20);
        console.log("In someThingAsync()")
    });
}

function callAsync(){
    return (resolve) => someThingAsync(resolve)
}

test('await', async function (t) {
	let queue = TaskQueue();

	let res1  = await queue.add(returnValue("Gris"));
	t.equal(res1, "Gris", );

	await queue.add(sleep(2000));
	console.log("Sleep done");

    await queue.add(callAsync());

	try{
		await queue.add(throwError("Kris"));
		t.fail();
	}
	catch (e) {
		t.pass("Shall fail");
	}

	let value = await queue.add(returnValue("Polis"));
	t.equal(value,"Polis");

	t.end();
});

test('then', async function (t) {
	let queue = TaskQueue();

	queue.add(returnValue("Gris"))
		.then((res) => t.equal(res, "Gris", ));

	queue.add(sleep(2000))
		.then(() => console.log("Sleep done"));

    queue.add(throwError("Kris"))
		.then(() => t.fail() )
		.catch( () => t.pass("Shall fail"));

	await queue.add(sleep(1));

	t.end();
});
