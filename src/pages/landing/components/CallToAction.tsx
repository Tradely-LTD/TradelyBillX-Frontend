import React, { useState } from "react";

const CallToAction = () => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    organization: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    // TODO: Replace with your Formspree endpoint URL.
    // How to get it:
    // 1. Go to https://formspree.io/ and create a new form.
    // 2. Name your form and set the recipient email to 'mujtabadamu@gmail.com'.
    // 3. Formspree will give you a unique URL endpoint, something like 'https://formspree.io/f/your_unique_id'.
    // 4. Replace the placeholder URL below with your actual Formspree endpoint.
    const formspreeUrl = "https://formspree.io/f/xnnvgqej";

    try {
      const response = await fetch(formspreeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage("Thank you for your request! We will get back to you soon.");
        setFormData({
          name: "",
          title: "",
          email: "",
          phone: "",
          organization: "",
          message: "",
        });
      } else {
        const data = await response.json();
        if (data.errors) {
          setSubmitMessage(
            data.errors.map((error: { message: string }) => error.message).join(", ")
          );
        } else {
          setSubmitMessage("There was an error submitting the form. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitMessage("There was an error submitting the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className="py-16 bg-gradient-to-r from-green-700 to-green-600 text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Transform Your Revenue Collection & Trade Monitoring
          </h2>
          <p className="text-xl mb-8">
            Join progressive governments leveraging digital solutions for enhanced governance
          </p>

          <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Request a Demo</h3>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="title" className="block text-gray-700 mb-2">
                    Job Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                    placeholder="Your Position"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                    placeholder="your.email@example.gov"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                    placeholder="Your Phone Number"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="organization" className="block text-gray-700 mb-2">
                  Government Organization
                </label>
                <input
                  type="text"
                  id="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                  placeholder="Your State/Ministry/Department"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2">
                  Additional Information
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                  placeholder="Tell us about your specific needs or questions"
                ></textarea>
              </div>

              {submitMessage && (
                <div
                  className={`text-center py-2 rounded-md ${
                    submitMessage.includes("error")
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {submitMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 disabled:bg-gray-400"
              >
                {isSubmitting ? "Submitting..." : "Request Your Demo"}
              </button>
            </form>

            <div className="mt-6 text-gray-600 text-center">
              <p>Prefer to talk to someone directly?</p>
              <p className="font-bold">Call us at: +234 (8) 888 888 8672</p>
              <p>
                Or email:{" "}
                <a href="mailto:info@tradely.com" className="text-green-600 hover:underline">
                  info@tradelyx.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
