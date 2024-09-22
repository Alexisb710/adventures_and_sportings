import { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";

export default function Register() {
  const navigate = useNavigate();
  const { userCredentials, setUserCredentials } = useContext(AppContext);

  // If the user is already logged in, redirect them to the home page
  if (userCredentials) {
    return <Navigate to="/" />;
  }

  // Handle the form submission for registration
  async function handleSubmit(event) {
    event.preventDefault();

    // Gather form data and convert it to a usable object
    let formData = new FormData(event.target);
    let user = Object.fromEntries(formData.entries());

    // Validate required fields
    if (!user.firstname || !user.lastname || !user.email || !user.password) {
      alert("Please fill all the required fields");
      return;
    }

    // Validate password confirmation
    if (user.password !== user.confirm_password) {
      alert("Password and Confirm Password do not match");
      return;
    }

    // Remove the confirm_password field since it's not needed in the registration payload
    delete user.confirm_password;

    try {
      // Send a POST request to register the user
      const response = await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("User registered successfully:", data);
        // Store user credentials in both context and localStorage
        setUserCredentials(data);
        localStorage.setItem("user", JSON.stringify(data));

        // Redirect the user to the home page
        navigate("/");
      } else {
        console.error("Server Error:", data);
        alert("Unable to register: " + (data.message || "An error occurred"));
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Unable to connect to the server. Please try again later");
    }
  }

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-lg-8 mx-auto rounded border p-4">
          <h2 className="text-center mb-5">Create new Account</h2>

          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">First Name *</label>
              <div className="col-sm-8">
                <input className="form-control" name="firstname" />
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Last Name *</label>
              <div className="col-sm-8">
                <input className="form-control" name="lastname" />
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Email *</label>
              <div className="col-sm-8">
                <input className="form-control" name="email" />
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Phone</label>
              <div className="col-sm-8">
                <input className="form-control" name="phone" />
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Address</label>
              <div className="col-sm-8">
                <input className="form-control" name="address" />
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Password *</label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  type="password"
                  name="password"
                />
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">
                Confirm Password *
              </label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  type="password"
                  name="confirm_password"
                />
              </div>
            </div>

            <div className="row">
              <div className="offset-sm-4 col-sm-4 d-grid">
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </div>
              <div className="col-sm-4 d-grid">
                <Link className="btn btn-outline-primary" to="/" role="button">
                  Cancel
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
