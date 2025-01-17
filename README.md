# Why
Simple task queue that execute tasks consecutive but each add can be awaited to know when the added task is executed and get return data. A promise start to excecute when it is created that is why the promise itself is created by the queue.

# Run example
### Node
    node .\test\example.js 

### Local web server
    node .\test\browser-quick-start.mjs \test\runJs.html?file=example.js 

### GitHub
https://hakanols.github.io/task-queue/test/runJs.html?file=example.js

### Expected printout
    // Gris
    // Slept for 200ms
    // Got error:  Failed
    // Await last

# Run test
### Node
    node .\test\test.js 

### Local web server
    node .\test\browser-quick-start.mjs \test\runJs.html?file=test.js

### GitHub
https://hakanols.github.io/task-queue/test/runJs.html?file=test.js