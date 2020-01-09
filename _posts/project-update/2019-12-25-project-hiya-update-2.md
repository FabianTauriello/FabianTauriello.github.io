---

layout: post
title: "Project 'Hiya' - Update #2"
date: 2020-01-09 16:00:30 +0930
author: Fabian Tauriello
categories: project-update

---

I discovered an article by the Loyola Maymount University that I think will be very helpful in building Hiya. The article can be found [here](https://cs.lmu.edu/~ray/notes/javanetexamples/) and illustrates the functionality of sockets with varying levels of complexity. My aim is to follow their examples so that I can build a solid foundation and gain a better understanding of the logic required. With that, let's get coding!

<br>In the first iteration of the application, I'll create two classes (Client.java and Server.java). The Server class will use a ServerSocket object to listen for clients to connect and when they do, send them the current date. The Client class can be run countless times because of an infinite loop in the Server class.

<br>Note, I will not include import statements in any of my blog posts because I don't think they're necessary.

<br>Server.java

    public class Server {
        // The port number here isn't important - as long as it's in range and not being used by another application.
        private static final int PORT = 9090;
        public static void main(String[] args) {
            // Declare ServerSocket
            ServerSocket listener;
            try {
                // Initialize ServerSocket
                listener = new ServerSocket(PORT);
                System.out.println("The date server is running...");
                // Keep the server open and listening for a client to connect
                while (true) {
                    // Listens for a connection to be made to this socket and accepts it. The method blocks until a connection is made.
                    Socket socket = listener.accept();
                    PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
                    // Output the current date to the connected client.
                    out.println(new Date().toString());
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

Client.java

    public class Client {
        private static final int SERVER_PORT = 9090;
        private static final String SERVER_HOST = "127.0.0.1";
        public static void main(String[] args) throws UnknownHostException, IOException {
            // Creates a socket and connects it to the specified port number (9090) on the named host (localhost).
            Socket socket = new Socket(SERVER_HOST, SERVER_PORT);
            Scanner in = new Scanner(socket.getInputStream());
            // Display the date sent from the server.
            System.out.println("Server response: " + in.nextLine());
            socket.close();
            in.close();
        }
    }

Execution of the Server class
<br>![Server.java in terminal](../../../../images/Hiya/update2-server-terminal.png)

<br>Execution of the Client class (run twice, with different times received from the server)
<br>![Client.java in terminal](../../../../images/Hiya/update2-client-terminal.png)

<br>These simple classes highlight the core idea behind sockets and client server applications. Each socket is an endpoint for a line of communication and at one end, a server will use its socket to "listen" for a client to connect. When a client does so, a communication bridge is established and messages can be passed between the client and the server.
