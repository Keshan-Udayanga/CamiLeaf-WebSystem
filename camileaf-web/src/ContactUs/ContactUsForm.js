import React, { useState } from "react";

function ContactUsForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ submitting: false, ok: null, msg: "" });

  function handleChange(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  function validate() {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) return "Please enter a valid email.";
    if (!form.message.trim() || form.message.length < 10) return "Message must be at least 10 characters.";
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const err = validate();
    if (err) {
      setStatus({ submitting: false, ok: false, msg: err });
      return;
    }

    try {
      setStatus({ submitting: true, ok: null, msg: "" });

      // TODO: replace with your real endpoint
      // Example placeholder request (this won't work without a backend)
      // const res = await fetch("/api/contact", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(form),
      // });
      // if (!res.ok) throw new Error("Network response was not ok");

      // Simulate success (remove when using real backend)
      await new Promise((r) => setTimeout(r, 900));

      setStatus({ submitting: false, ok: true, msg: "Thanks — your message was sent." });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setStatus({ submitting: false, ok: false, msg: "Failed to send. Try again later." });
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="row">
        <label>
          Name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your full name"
            required
          />
        </label>

        <label>
          Email
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@domain.com"
            type="email"
            required
          />
        </label>
      </div>

      <label>
        Subject
        <input
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="Subject (optional)"
        />
      </label>

      <label>
        Message
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Write your message..."
          rows="6"
          required
        />
      </label>

      <div className="actions">
        <button type="submit" className="btn-primary" disabled={status.submitting}>
          {status.submitting ? "Sending..." : "Send message"}
        </button>

        <button
          type="button"
          className="btn-ghost"
          onClick={() => {
            setForm({ name: "", email: "", subject: "", message: "" });
            setStatus({ submitting: false, ok: null, msg: "" });
          }}
        >
          Reset
        </button>
      </div>

      {status.msg && (
        <p className={`form-status ${status.ok ? "ok" : "error"}`} role="status">
          {status.msg}
        </p>
      )}
    </form>
  );
}

export default ContactUsForm;
