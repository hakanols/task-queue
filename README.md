# Why
Simple task queue that execute tasks consecutive but each add can be awaited to know when the added task is executed and get return data. A promise start to excecute when it is created that is why the promise itself is created by the queue.

# Example

    import TaskQueue from './../src/task-queue.js';
    let queue = TaskQueue();
    
    async function example() {
        queue.add((resolve) => resolve("Gris"))
            .then((res) => console.log(res));
    
        queue.add((resolve) => setTimeout(resolve, 200))
            .then(() => console.log("Slept for 200ms"));
    
        queue.add((resolve, reject) => reject("Failed"))
            .then(()=>console.log("Shall never happen") )
            .catch((e)=>console.log("Got error: ", e));
    
        let result = await queue.add((resolve) => resolve("Await last"));
        console.log(result);
    }
    example();
    
    // Printout
    // Gris
    // Slept for 200ms
    // Got error:  Failed
    // Await last
