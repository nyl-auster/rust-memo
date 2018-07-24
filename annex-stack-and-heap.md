# the Stack and the Heap

They are both stored in the computer’s RAM (Random Access Memory). 

The OS allocates the **stack** for each system-level thread when the thread is created. 
Typically the OS is called by the language runtime to allocate the **heap** for the application.

In a multi-threaded application, each thread will have its own **stack**. But, most of the time, all the different threads will **share the heap**. Because the different threads share the heap in a multi-threaded application, this also means that there has to be some coordination between the threads so that they don’t try to access and manipulate the same piece(s) of memory in the heap at the same time.

Once a function call runs to completion, any data on the stack created specifically for that function call will automatically be deleted. 

The stack is much faster than the heap. This is because of the way that memory is allocated on the stack. Allocating memory on the stack is as simple as moving the stack pointer up.

Data on the stack is automatically deallocated when variables go out of scope. However, in languages like C and C++, data stored on the heap has to be deleted manually by the programmer using one of the built in keywords like free, delete, or delete[ ]. Other languages like Java and .NET use garbage collection to automatically delete memory from the heap, without the programmer having to do anything

The **stack** is attached to a thread, so when the thread exits the stack is reclaimed. The **heap** is typically allocated at application startup by the runtime, and is reclaimed when the application (technically process) exits.

The size of the **stack** is set when a thread is created. The size of the **heap** is set on application startup, but can grow as space is needed (the allocator requests more memory from the operating system).

## sources

https://stackoverflow.com/questions/79923/what-and-where-are-the-stack-and-heap
http://www.programmerinterview.com/index.php/data-structures/difference-between-stack-and-heap/
