---

layout: post
title: "Project 'Hiya' - Update #3"
date: 2020-01-29 16:00:30 +0930
author: Fabian Tauriello
categories: project-update

---

This update improves over the last version by reading data from multiple clients. To quote the source material;<br>

> "When a client connects, the server spawns a thread, dedicated to just that client, to read, uppercase, and reply. The server can listen for and serve other clients at the same time, so we have true concurrency." 

My code implementation does not dramatically deviate from the source material because remember, this project is about learning just as much as it is about innovating. Therefore, the foundation will be inspired by what exists, and my personal touches will come later as I refactor/expand the code. 

<br>Here are the classes:

<br>**Server.java**

    public class Server {
        private static final int PORT = 9090;
        public static void main(String[] args) {
            ServerSocket listener;
            try {
                listener = new ServerSocket(PORT);
                System.out.println("The capitalization server is running...");
                // Thread Pools are useful when you need to limit the number of threads running in your 
                // application to optimize performance. Here, I've set the pool size to accept 20 threads.
                ExecutorService pool = Executors.newFixedThreadPool(20);
                while (true) {
                    pool.execute(new Capitalizer(listener.accept()));
                    // System.out.println("Current pool size: " + pool.toString());
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

**Client.java**

    public class Client {
        private static final int SERVER_PORT = 9090;
        private static final String SERVER_HOST = "127.0.0.1";
        public static void main(String[] args) {
            try {
                Socket socket = new Socket(SERVER_HOST, SERVER_PORT);
                System.out.println("Enter lines of text then Ctrl+D or Ctrl+C to quit");
                Scanner scanner = new Scanner(System.in);
                Scanner in = new Scanner(socket.getInputStream());
                PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
                while (scanner.hasNextLine()) {
                    out.println(scanner.nextLine());
                    System.out.println(in.nextLine());
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

**Capitalizer.java**

    public class Capitalizer implements Runnable {
        private Socket socket;
        public Capitalizer(Socket socket) {
            this.socket = socket;
        }
        @Override
        public void run() {
            System.out.println("Connected: " + socket);
            try {
                var in = new Scanner(socket.getInputStream());
                var out = new PrintWriter(socket.getOutputStream(), true);
                while (in.hasNextLine()) {
                    out.println(in.nextLine().toUpperCase());
                }
            } catch (Exception e) {
                System.out.println("Error:" + socket);
            } finally {
                try { socket.close(); } catch (IOException e) {}
                System.out.println("Closed: " + socket);
            }
        }
    }

Here is some output from execution:

<br>**Execution of the Server class**
<br>![Server.java execution](../../../../images/Hiya/update3-server1.png)
<br>Here you can see that when the server is running, it waits for clients to connect. After running the Server class, I ran three instances of the Client class, before stopping one of them (port 54803), and finally starting another two.

<br>
<hr>
<br>

**Execution of 1st client**
<br>![1st client](../../../../images/Hiya/update3-client1.png)

**Execution of 2nd client**
<br>![2nd client](../../../../images/Hiya/update3-client2.png)

**Execution of 3rd client**
<br>![3rd client](../../../../images/Hiya/update3-client3.png)

**Execution of 4th client**
<br>![4th client](../../../../images/Hiya/update3-client4.png)

**Execution of 5th client**
<br>![5th client](../../../../images/Hiya/update3-client5.png)

<br>
<hr>
<br>

Here you can see that if I comment out the following line from the Server class, you can see how the thread pool is filled up as clients connect.

    // System.out.println("Current pool size: " + pool.toString());

![Server.java execution with toString()](../../../../images/Hiya/update3-server2.png)

<br>
<hr>
<br>

Other important notes:

* The things that are run on threads are called tasks; they implement the Runnable interface; they do their work in their run method.
* The run method has a loop which keeps reading lines from the socket, uppercasing them, then sending them out. Note the wrapping of the socket streams in a Scanner and a PrintWriter so that we can work with strings.