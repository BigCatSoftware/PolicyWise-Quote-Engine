import { useState, useEffect } from 'react'


function App() {
    // Create a state variable to hold the message from the backend
    // Start with a default "loading..." message.
    const [message, setMessage] = useState("Loading message from backend...");

    // Use the 'useEffect' hook to fetch data when the component loads.
    // The empty array [] at the end means it only runs ONCE.
    useEffect(() => {
        // Fetch data from our Soring Boot API endpoint.
        // the Vite proxy we configured will forward this request to http://localhost:8080/api/v1
        fetch('/api/v1/hello')
            .then(response => {
                // If the response is not OK, throw an error to be caught by .catch()
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                return response.json();
            })
            .then(data => {
                // Update state with the message received from the API
                setMessage(data.message);
            })
            .catch(error => {
                // If the fetch fails (backend is not running), update the message.
                console.error("Failed to fetch message:", error);
                setMessage("Could not connect to the backend. Is it running?");
            });
    }, []); // the empty array [] ensures this effect only runs one time after initial render

    return (
        // The styling might look different, but the connection test will work.
        <div className={"App"}>
            <h1>PolicyWise Quote Engine</h1>
            <div className={"card"}>
                {/* Display the message from our state. It will be updated once the API call finishes. */}
                <p>
                    <strong>Connection Status:</strong> {message}
                </p>
            </div>
            <p className={"read-the-docs"}>
                The full-stack application is connected.
            </p>
        </div>
    );
}

export default App
