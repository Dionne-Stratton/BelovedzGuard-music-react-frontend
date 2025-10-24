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

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-field">
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

          <div className="form-field">
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
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
