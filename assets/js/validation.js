import "./theme.js";
import emailjs from "@emailjs/browser";

const form = document.querySelector("#contact-form");
const statusMessage = document.querySelector("#form-status");
const submitButton = form?.querySelector("button[type=submit]");

const emailjsConfig = {
	serviceId: import.meta.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
	templateId: import.meta.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
	publicKey: import.meta.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
};

function setStatus(message, type) {
	statusMessage.textContent = message;
	statusMessage.className = `form-status is-${type}`;
}

function setFieldError(field, message) {
	const wrapper = field.closest(".form-field");
	const error = document.querySelector(`#${field.id}-error`);
	wrapper.classList.toggle("is-invalid", Boolean(message));
	error.textContent = message;
}

function validateForm() {
	let isValid = true;

	form.querySelectorAll("[required]").forEach((field) => {
		const message = field.value.trim() ? "" : "This field is required.";
		setFieldError(field, message);
		isValid = isValid && !message;
	});

	const email = form.elements.email;
	if (email.value.trim() && !email.validity.valid) {
		setFieldError(email, "Enter a valid email address.");
		isValid = false;
	}

	return isValid;
}

async function sendContactMessage(event) {
	event.preventDefault();
	statusMessage.textContent = "";
	statusMessage.className = "form-status";

	if (!validateForm()) {
		setStatus("Please complete the highlighted fields.", "error");
		return;
	}

	if (!emailjsConfig.serviceId || !emailjsConfig.templateId || !emailjsConfig.publicKey) {
		setStatus("The contact form is not configured yet.", "error");
		return;
	}

	submitButton.disabled = true;
	submitButton.textContent = "Sending...";

	const formData = new FormData(form);
	const firstName = formData.get("first-name");
	const lastName = formData.get("last-name");
	const senderName = `${firstName} ${lastName}`.trim();
	const subject = formData.get("subject");
	const message = formData.get("message");
	const formattedMessage = [
		`Name: ${senderName}`,
		`Subject: ${subject}`,
		"",
		"Message:",
		message,
	].join("\n");

	try {
		await emailjs.send(
			emailjsConfig.serviceId,
			emailjsConfig.templateId,
			{
				from_name: senderName,
				from_email: formData.get("email"),
				reply_to: formData.get("email"),
				subject,
				message: formattedMessage,
			},
			{ publicKey: emailjsConfig.publicKey }
		);
		form.reset();
		form.querySelectorAll(".is-invalid").forEach((field) => field.classList.remove("is-invalid"));
		setStatus("Thanks for your message. I will get back to you soon.", "success");
		window.setTimeout(() => window.location.reload(), 5000);
	} catch (error) {
		console.error("Unable to send contact message.", error);
		setStatus("Your message could not be sent. Please try again.", "error");
	} finally {
		submitButton.disabled = false;
		submitButton.textContent = "Submit";
	}
}

form?.addEventListener("submit", sendContactMessage);
