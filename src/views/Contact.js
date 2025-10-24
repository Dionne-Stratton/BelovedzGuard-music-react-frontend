import React, { useState } from "react";
import * as Yup from "yup";
import { useSendContactMessageMutation } from "../state/publicApi";
import { useToastContext } from "../contexts/ToastContext";
import { trackUIEvent } from "../utils/analytics";
import "./Contact.css";

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  subject: Yup.string()
    .min(3, "Subject must be at least 3 characters")
    .max(200, "Subject must be less than 200 characters")
    .required("Subject is required"),
  message: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters")
    .required("Message is required"),
});

export default function Contact() {
  const [sendContactMessage, { isLoading }] = useSendContactMessageMutation();
  const { error: showError, success: showSuccess } = useToastContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Spam prevention
  const [pageLoadTime] = useState(Date.now());
  const [website, setWebsite] = useState(""); // Honeypot field

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  // Check if form is valid for submit button
  const isFormValid = () => {
    return (
      name.trim().length >= 2 &&
      email.trim().length > 0 &&
      email.includes("@") &&
      subject.trim().length >= 3 &&
      message.trim().length >= 10
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Spam prevention checks
    // 1. Honeypot: reject if the hidden field is filled
    if (website) {
      trackUIEvent("Contact", "Spam blocked - honeypot");
      return; // Silently reject
    }

    // 2. Time-based: reject if submitted too quickly (< 3 seconds)
    const timeSinceLoad = Date.now() - pageLoadTime;
    if (timeSinceLoad < 3000) {
      trackUIEvent("Contact", "Spam blocked - too fast", { timeSinceLoad });
      showError("Please take a moment to review your message.");
      return;
    }

    // Validate all fields
    try {
      await contactSchema.validate(
        { name, email, subject, message },
        { abortEarly: false }
      );
      setErrors({});

      // Submit form
      try {
        const result = await sendContactMessage({
          name,
          email,
          subject,
          message,
        }).unwrap();

        showSuccess(result.message || "Message sent successfully!");
        trackUIEvent("Contact", "Form submitted successfully");

        // Clear form
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        setWebsite(""); // Reset honeypot
        setTouched({});
      } catch (error) {
        const errorMessage =
          error?.data?.error ||
          error?.message ||
          "Failed to send message. Please try again.";
        showError(errorMessage);
        trackUIEvent("Contact", "Form submission failed", {
          error: errorMessage,
        });
      }
    } catch (validationErrors) {
      const newErrors = {};
      validationErrors.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <div className="contact-page page-container">
      <div className="contact-container">
        <h1>Contact Me</h1>
        <p className="contact-intro">
          Want to get in touch? I'd love to hear from you!
        </p>
        <p className="required-note">* marks a required field</p>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-field">
            <label htmlFor="name">
              Name <span className="required-asterisk">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => handleBlur("name")}
              className={touched.name && errors.name ? "error" : ""}
              disabled={isLoading}
            />
            {touched.name && errors.name && (
              <div className="error-message">{errors.name}</div>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="email">
              Email <span className="required-asterisk">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur("email")}
              className={touched.email && errors.email ? "error" : ""}
              disabled={isLoading}
            />
            {touched.email && errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="subject">
              Subject <span className="required-asterisk">*</span>
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              onBlur={() => handleBlur("subject")}
              className={touched.subject && errors.subject ? "error" : ""}
              disabled={isLoading}
            />
            {touched.subject && errors.subject && (
              <div className="error-message">{errors.subject}</div>
            )}
          </div>

          {/* Honeypot field - hidden from users, visible to bots */}
          <input
            type="text"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            style={{
              position: "absolute",
              left: "-9999px",
              width: "1px",
              height: "1px",
              opacity: 0,
              pointerEvents: "none",
            }}
            tabIndex="-1"
            autoComplete="off"
            aria-hidden="true"
          />

          <div className="form-field">
            <label htmlFor="message">
              Message <span className="required-asterisk">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows="6"
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onBlur={() => handleBlur("message")}
              className={touched.message && errors.message ? "error" : ""}
              disabled={isLoading}
            />
            {touched.message && errors.message && (
              <div className="error-message">{errors.message}</div>
            )}
          </div>

          <button
            type="submit"
            className="contact-submit-btn"
            disabled={isLoading || !isFormValid()}
          >
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
