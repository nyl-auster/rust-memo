# the Stack and the Heap

## Where are the stack and the heap ?

They are both stored in the computer’s RAM (Random Access Memory). 

## who is creating the stack and the heap ?

The OS allocates the **stack** for each system-level thread when the thread is created. 
Typically the OS is called by the language runtime to allocate the **heap** for the application.

When a **function** is called, a block is reserved **on the top of the stack** for local variables and some bookkeeping data.

Unlike the stack, there's no enforced pattern to the allocation and deallocation of blocks from the heap; you can allocate a block at any time and free it at any time. This makes it much more complex to keep track of which parts of the heap are allocated or free at any given time; there are many custom heap allocators available to tune heap performance for different usage patterns.

## data deallocation

Once a function call runs to completion, any data on the stack created specifically for that function call will automatically be deleted. 

The stack is much faster than the heap. This is because of the way that memory is allocated on the stack. Allocating memory on the stack is as simple as moving the stack pointer up.

Data on the stack is automatically deallocated when variables go out of scope. However, in languages like C and C++, data stored on the heap has to be deleted manually by the programmer using one of the built in keywords like free, delete, or delete. Other languages like Java and .NET use garbage collection to automatically delete memory from the heap, without the programmer having to do anything

## size

The size of the stack is set when a thread is created. The size of the heap is set on application startup, but can grow as space is needed (the allocator requests more memory from the operating system).

## What makes one faster?

The stack is faster because the access pattern makes it trivial to allocate and deallocate memory from it (a pointer/integer is simply incremented or decremented), while the heap has much more complex bookkeeping involved in an allocation or deallocation. 

Also, each byte in the stack tends to be reused very frequently which means it tends to be mapped to the processor's cache, making it very fast.

Another performance hit for the heap is that the heap, being mostly a global resource, typically has to be multi-threading safe, i.e. each allocation and deallocation needs to be - typically - synchronized with "all" other heap accesses in the program.

## how is it shared between threads ?

In a multi-threaded application, each thread will have its own **stack**. But, most of the time, all the different threads will **share the heap**. Because the different threads share the heap in a multi-threaded application, this also means that there has to be some coordination between the threads so that they don’t try to access and manipulate the same piece(s) of memory in the heap at the same time.

## What can go wrong with the stack and the heap?

If the stack runs out of memory, then this is called a stack overflow – and could cause the program to crash.

The heap could have the problem of fragmentation, which occurs when the available memory on the heap is being stored as noncontiguous (or disconnected) blocks – because used blocks of memory are in between the unused memory blocks. When excessive fragmentation occurs, allocating new memory may be impossible because of the fact that even though there is enough memory for the desired allocation, there may not be enough memory in one big block for the desired amount of memory.

## stack and heap cleaning

The **stack** is attached to a thread, so when the thread exits the stack is reclaimed. The **heap** is typically allocated at application startup by the runtime, and is reclaimed when the application (technically process) exits.

The size of the **stack** is set when a thread is created. The size of the **heap** is set on application startup, but can grow as space is needed (the allocator requests more memory from the operating system).

## Which one should I use – the stack or the heap?

For people new to programming, it’s probably a good idea to use the stack since it’s easier.
Because the stack is small, you would want to use it when you know exactly how much memory you will need for your data, or if you know the size of your data is very small. It’s better to use the heap when you know that you will need a lot of memory for your data, or you just are not sure how much memory you will need (like with a dynamic array).

## sources

https://stackoverflow.com/questions/79923/what-and-where-are-the-stack-and-heap
http://www.programmerinterview.com/index.php/data-structures/difference-between-stack-and-heap/
