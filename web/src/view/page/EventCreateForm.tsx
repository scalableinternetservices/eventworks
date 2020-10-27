import React from "react";

export default function EventCreateForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [acceptedTerms, setAcceptedTerms] = React.useState(false);

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    console.log(`
      Email: ${email}
      Password: ${password}
      Accepted Terms: ${acceptedTerms}
    `);

    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Account</h1>

      <label>
        Email:
        <input
          name="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required />
      </label>

      <label>
        Password:
        <input
          name="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required />
      </label>

      <button>Submit</button>
    </form>
  );
}