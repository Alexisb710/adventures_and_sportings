import { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";

export default function Login() {
  const navigate = useNavigate();
  const { userCredentials, setUserCredentials } = useContext(AppContext);

  // If the user is already logged in, redirect them to the home page
  if (userCredentials) {
    return <Navigate to="/" />;
  }

  // Handle form submission for login
  async function handleSubmit(event) {
    event.preventDefault();

    let email = event.target.email.value;
    let password = event.target.password.value;

    // Validate input fields
    if (!email || !password) {
      alert("Please fill in both email and password");
      return;
    }

    try {
      // Check for user with matching email from the /users endpoint
      const response = await fetch(
        `http://localhost:4000/users?email=${email}`
      );
      const users = await response.json();

      // If no user is found with that email, show an error
      if (users.length === 0) {
        alert("User not found");
        return;
      }

      const user = users[0];

      // Check if the password matches
      if (user.password === password) {
        console.log("Login successful:", user);
        setUserCredentials(user); // Store user credentials in the app context
        localStorage.setItem("user", JSON.stringify(user)); // Store user credentials in localStorage
        navigate("/"); // Redirect the user to the home page
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      alert("Unable to connect to the server");
    }
  }

  return (
    <div className="container my-4">
      <div className="mx-auto rounded border p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-5">Welcome, please login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input className="form-control" name="email" />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input className="form-control" type="password" name="password" />
          </div>

          <div className="row">
            <div className="col d-grid">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            <div className="col d-grid">
              <Link className="btn btn-outline-primary" to="/" role="button">
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
