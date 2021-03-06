---

layout: post
title: "Project 'Hiya' - Update #4"
date: 2020-03-13 16:00:30 +0930
author: Fabian Tauriello
categories: project-update

---

GUI!! That's right, this update brings a GUI to Hiya for the first time. By using the very old (and outdated) GUI widget toolkit (sigh); Swing, I have built visual components to give users a more visual/realistic interface for interacting with Hiya. 

<br>Once again, I don't stray too far away from the source tutorial. I only make some syntactic/stylistic changes, improve the way duplicate names are handled and notified to the user, and change what happens when the user selects "cancel" at the "screen names selection" modal.

<br>Here are the classes:

<br>**Server.java**

    public class Server {
        
        private static final int SERVER_PORT = 9090;
        
        // All client names, so we can check for duplicates upon registration.
        private static Set<String> names = new HashSet<>();

        // The set of all the print writers for all the clients, used for broadcast.
        private static Set<PrintWriter> writers = new HashSet<>();

        public static void main(String[] args) throws Exception {
            System.out.println("The chat server is running...");
            ExecutorService pool = Executors.newFixedThreadPool(500);
            try (ServerSocket listener = new ServerSocket(SERVER_PORT)) {
                while (true) {
                    pool.execute(new Handler(listener.accept()));
                }
            }
        }

        /**
        * The client handler task.
        */
        private static class Handler implements Runnable {
            private boolean nameRequired = true;
            private String name;
            private Socket socket;
            private Scanner in;
            private PrintWriter out;

            public Handler(Socket socket) {
                this.socket = socket;
            }

            public void run() {
                try {
                    in = new Scanner(socket.getInputStream());
                    out = new PrintWriter(socket.getOutputStream(), true);

                    // Keep requesting a name until we get a unique one.
                    out.println("SUBMITNAME");
                    while(nameRequired && in.hasNextLine()) {
                        name = in.nextLine();
                        synchronized (names) {
                            if(name.equals("QUITHIYA")) {
                                out.println("QUITHIYA");
                            } else if (names.contains(name)) {
                                out.println("DUPLICATEENTRY");
                            } else if (name.equals("")) {
                                out.println("SUBMITNAME");
                            } else {
                                names.add(name);
                                nameRequired = false;
                            }
                        }
                    }
                    
                    // We now have a unique name
                    
                    out.println("NAMEACCEPTED " + name);
                    for (PrintWriter writer : writers) {
                        writer.println("MESSAGE " + name + " has joined");
                    }
                    writers.add(out);

                    // Accept messages from this client and broadcast them.
                    while (true) {
                        String input = in.nextLine();
                        if (input.toLowerCase().startsWith("/quit")) {
                            return;
                        }
                        for (PrintWriter writer : writers) {
                            writer.println("MESSAGE " + name + ": " + input);
                        }
                    }
                } catch (Exception e) {
                    System.out.println(e);
                } finally {
                    if (out != null) {
                        writers.remove(out);
                    }
                    if (name != null) {
                        System.out.println(name + " is leaving");
                        names.remove(name);
                        for (PrintWriter writer : writers) {
                            writer.println("MESSAGE " + name + " has left");
                        }
                    }
                    try {
                        socket.close();
                    } catch (IOException e) {
                    }
                }
            }
        }
    }


<br>**Client.java**

    public class Client {

        private static final int SERVER_PORT = 9090;
        private static final String SERVER_HOST = "127.0.0.1";

        Scanner in;
        PrintWriter out;
        JFrame frame = new JFrame("Hiya");
        JTextField textField = new JTextField(50);
        JTextArea messageArea = new JTextArea(16, 50);

        public static void main(String[] args) throws Exception {
            Client client = new Client();
            client.frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            client.frame.setVisible(true);
            client.run();
        }
        
        public Client() {

            textField.setEditable(false);
            messageArea.setEditable(false);        
            frame.getContentPane().add(textField, BorderLayout.SOUTH);
            frame.getContentPane().add(new JScrollPane(messageArea), BorderLayout.WEST);
            frame.pack();

            // Send on enter then clear to prepare for next message
            textField.addActionListener(new ActionListener() {
                public void actionPerformed(ActionEvent e) {
                    out.println(textField.getText());
                    textField.setText("");
                }
            });
        }

        private void run() throws IOException {
            try {
                Socket socket = new Socket(SERVER_HOST, SERVER_PORT);
                in = new Scanner(socket.getInputStream());
                out = new PrintWriter(socket.getOutputStream(), true);

                while (in.hasNextLine()) {
                    String line = in.nextLine();
                    if (line.startsWith("SUBMITNAME")) {
                        out.println(getName());
                    } else if (line.startsWith("NAMEACCEPTED")) {
                        this.frame.setTitle("Hiya - " + line.substring(13));
                        textField.setEditable(true);
                    } else if (line.startsWith("MESSAGE")) {
                        if (line.startsWith("MESSAGE-JOIN")) {
                            messageArea.append(line.substring(13) + "\n");
                        } else if(line.startsWith("MESSAGE-LEAVE")) {
                            messageArea.append(line.substring(14) + "\n");
                        } else {
                            messageArea.append(line.substring(8) + "\n");
                        }
                    } else if (line.startsWith("DUPLICATEENTRY")) {
                        duplicateAlert();
                        out.println(getName());
                    } else if (line.startsWith("QUITHIYA")) {
                        System.exit(0);
                    }
                }
            } finally {
                frame.setVisible(false);
                frame.dispose();
            }
        }
        
        // will return null if cancel is pressed
        private String getName() {
            String result = JOptionPane.showInputDialog(frame, "Choose a screen name:", "Screen name selection",
                    JOptionPane.PLAIN_MESSAGE);
            if(result == null) {
                return "QUITHIYA";
            } else {
                return result;
            }
        }
        
        // I added this modal to notify the user why the name entered is not acceptable.
        private void duplicateAlert() {
            JOptionPane.showMessageDialog(frame, "Duplicate Entry. Try a different name", "Alert",
                    JOptionPane.ERROR_MESSAGE);
        }

    }

<br>
<hr>
<br>

Here's what the UI looks like:

<br>

**Screen name selection modal**
<br>![screen name selection modal](../../../../images/Hiya/update4-screen-name-selection-modal.png)

<br>

**Duplicate screen name modal**
<br>![duplicate screen name modal](../../../../images/Hiya/update4-duplicate-screen-name-modal.png)

<br>

**Execution of 1st client**
<br>![1st client](../../../../images/Hiya/update4-client1.png)

<br>

**Execution of 2nd client**
<br>![2nd client](../../../../images/Hiya/update4-client2.png)

<br>Java isn't typically used to create desktop applications so my next update will see drastic changes. In fact, the whole code base will be changed because I'll be moving Hiya to Android! Java is more at home on Android (the official language for Android development is Java) so it's time to change things up. It's likely that I will develop 2 versions of Hiya - one in Java and one in Kotlin (which is another increasingly popular language supported for Android development). Big changes ahead!