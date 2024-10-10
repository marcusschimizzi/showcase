import { useState } from 'react';
import { useTheme } from 'styled-components';

interface FormData {
    name: string;
    email: string;
    message: string;
}

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: '',
    });
    const [isDone, setIsDone] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

    const { colors } = useTheme();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch('/__forms.html', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    'form-name': 'contact',
                    ...formData,
                }).toString(),
            });

            if (response.ok) {
                setIsDone(true);
                setSubmitStatus('success');
                setFormData({
                    name: '',
                    email: '',
                    message: '',
                });
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {!isDone ? (
                <form
                    name="contact"
                    method="POST"
                    data-netlify="true"
                    data-netlify-honeypot="field-for-bots"
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <input type="hidden" name="form-name" value="contact" />
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium" style={{ color: colors.text2 }}>
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="What should I call you?"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block p-2 text-lg w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            style={{ backgroundColor: colors.background2, color: colors.text1 }}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium" style={{ color: colors.text2 }}>
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Where should I send a reply?"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block p-2 text-lg w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            style={{ backgroundColor: colors.background2, color: colors.text1 }}
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium" style={{ color: colors.text2 }}>
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            placeholder="What would you like to chat about?"
                            required
                            value={formData.message}
                            onChange={handleChange}
                            rows={4}
                            className="mt-1 block p-2 text-lg w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            style={{ backgroundColor: colors.background2, color: colors.text2 }}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 text-lg text-white rounded-md focus:outline-none focus:shadow-outline transition-all duration-300 ease-in-out overflow-hidden transform hover-brightness-110 hover:shadow-lg hover:-translate-y-1"
                        style={{
                            background: `linear-gradient(135deg, ${colors.main1}, ${colors.main2})`,
                            backgroundSize: '200% 200%',
                            animation: 'gradientShift 5s ease infinite',
                        }}
                    >
                        {isSubmitting ? 'Sending...' : 'Send'}
                    </button>
                    {submitStatus === 'error' && (
                        <p className="text-red-600">
                            Uh-oh! There was a problem submitting the form. Please try again.
                        </p>
                    )}
                </form>
            ) : (
                <>
                    <h3>Thank you for reaching out!</h3>
                    <p>I&#39;ll follow up to the email you left.</p>
                </>
            )}
        </>
    );
};

export default ContactForm;
