# The stack and the heap

## What is it for ?

All programs have to manage the way they use a computer’s memory while running. Both the stack and the heap are parts of memory that is available to your code to use at runtime, but they are structured in different ways.

## Where are the stack and the heap ?

They are both stored in the computer’s RAM (Random Access Memory). 

## what are the difference between the stack and the heap ?

### The stack

- The stack stores values in the order it gets them and removes the values in the opposite order. This is referred to as **last in, first out. **
- A property of the stack is that all data on the stack **must** take up a known, fixed size.**
- When your code calls a function, the values passed into the function (including, potentially, pointers to data on the heap) and the function’s local variables get pushed onto the stack. When the function is over, those values get popped off the stack.
- The stack is fast because of the way it accesses the data: it never has to search for a place to put new data or a place to get data from because that place is always the "top".

### the heap 

- Data with a **size unknown at compile time or a size that might change** can be stored on the heap instead. 
- The heap is less organized: when you put data on the heap, you ask for some amount of space. The operating system finds an empty spot somewhere in the heap that is big enough, marks it as being in use, and returns a **pointer**,  which is the address of that location.
- This process is called **allocating on the heap**, sometimes abbreviated as just **allocating.**. Pushing values onto the stack is **not* considered allocating.
- Because the pointer is a known, fixed size, you can store the pointer on the stack, but when you want the actual data, you have to follow the pointer.

Accessing data in the heap is slower than accessing data on the stack because you have to follow a pointer to get there. Allocating a large amount of space on the heap can also take time.

## Who is creating and allocating blocks to the stack or the heap ?

The OS allocates the **stack** for each system-level thread when the thread is created. 
Typically the OS is called by the language runtime to allocate the **heap** for the application.

## which data are going to the stack or the heap ?

When a **function** is called, a block is reserved **on the top of the stack** for local variables and some bookkeeping data.

The **heap** is used for variables whose lifetime we don't really know up front but we expect them to last a while. In most languages it's critical that we know at compile time how large a variable is if we want to store it on the stack. Objects (which vary in size as we update them) go on the heap because we don't know at creation time how long they are going to last.

## data deallocation

Once a function call runs to completion, any data on the stack created specifically for that function call will automatically be deleted. 

Unlike the stack, there's no enforced pattern to the allocation and deallocation of blocks from the heap; you can allocate a block at any time and free it at any time. This makes it much more complex to keep track of which parts of the heap are allocated or free at any given time; there are many custom heap allocators available to tune heap performance for different usage patterns.

In many languages the heap is garbage collected to find objects (such as the cls1 object) that no longer have any references.

In languages like C and C++, data stored on the heap has to be deleted manually by the programmer using one of the built in keywords like free, delete, or delete. Other languages like Java and .NET use garbage collection to automatically delete memory from the heap, without the programmer having to do anything

## size

The size of the stack is set when a thread is created. The size of the heap is set on application startup, but can grow as space is needed (the allocator requests more memory from the operating system).

## how is it shared between threads ?

In a multi-threaded application, each thread will have its own **stack**. But, most of the time, all the different threads will **share the heap**. Because the different threads share the heap in a multi-threaded application, this also means that there has to be some coordination between the threads so that they don’t try to access and manipulate the same piece(s) of memory in the heap at the same time.

## What makes one faster?

The stack is much faster than the heap. This is because of the way that memory is allocated on the stack. Allocating memory on the stack is as simple as moving the stack pointer up. Also, each byte in the stack tends to be reused very frequently which means it tends to be mapped to the processor's cache, making it very fast.

The heap has much more complex bookkeeping involved in an allocation or deallocation. 

Another performance hit for the heap is that the heap, being mostly a global resource, typically has to be multi-threading safe, i.e. each allocation and deallocation needs to be - typically - synchronized with "all" other heap accesses in the program.

## What can go wrong with the stack and the heap?

If the stack runs out of memory, then this is called a stack overflow – and could cause the program to crash.

The heap could have the problem of fragmentation, which occurs when the available memory on the heap is being stored as noncontiguous (or disconnected) blocks – because used blocks of memory are in between the unused memory blocks. When excessive fragmentation occurs, allocating new memory may be impossible because of the fact that even though there is enough memory for the desired allocation, there may not be enough memory in one big block for the desired amount of memory.

## stack and heap cleaning

The **stack** is attached to a thread, so when the thread exits the stack is reclaimed. 

The **heap** is typically allocated at application startup by the runtime, and is reclaimed when the application (technically process) exits.

## Which one should I use – the stack or the heap?

For people new to programming, it’s probably a good idea to use the stack since it’s easier.

Because the stack is small, you would want to use it when you know exactly how much memory you will need for your data, or if you know the size of your data is very small.

It’s better to use the heap when you know that you will need a lot of memory for your data, or you just are not sure how much memory you will need (like with a dynamic array).

## sources

https://doc.rust-lang.org/book/second-edition/ch04-01-what-is-ownership.html
https://stackoverflow.com/questions/79923/what-and-where-are-the-stack-and-heap
http://www.programmerinterview.com/index.php/data-structures/difference-between-stack-and-heap/
