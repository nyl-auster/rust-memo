# the Stack and the Heap

The OS allocates the **stack** for each system-level thread when the thread is created. 
Typically the OS is called by the language runtime to allocate the **heap** for the application.

The **stack** is attached to a thread, so when the thread exits the stack is reclaimed. The **heap** is typically allocated at application startup by the runtime, and is reclaimed when the application (technically process) exits.

The size of the **stack** is set when a thread is created. The size of the **heap* is set on application startup, but can grow as space is needed (the allocator requests more memory from the operating system).

## sources

https://stackoverflow.com/questions/79923/what-and-where-are-the-stack-and-heap
