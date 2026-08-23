import React, { useState } from 'react';
import ReactCountryDropdown from "react-country-dropdown";
import { useSnapshot } from 'valtio';
import { state } from '../../covisart/store';
import { PostOrder } from '../../covisart/system/OrderRequest';

const initialForm = {
    fullname: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
};

const Result = ({ status }) => {
    if (status === "success") {
        return (
            <p className="success-message">Your message has been successfully sent. We will contact you soon.</p>
        )
    }
    return (
        <p className="error-message">Your message could not be sent. Please try again or write us at info@covisart.com.</p>
    )
}

function ContactForm({props , formStyle}) {
    const snap = useSnapshot(state);
    const [ form, setForm ] = useState(initialForm);
    const [ country, setCountry ] = useState(snap.country);
    const [ sending, setSending ] = useState(false);
    const [ result, setResult ] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (sending) {
            return;
        }
        setSending(true);
        setResult(null);

        try {
            await PostOrder({
                email: form.email,
                name: form.fullname,
                country: country,
                description: form.subject
                    ? `${form.subject}\n\n${form.message}`
                    : form.message,
                size: snap.size,
                phone: form.phone,
                accessory: snap.accessory,
                color: snap.color
            });
            setForm(initialForm);
            setResult("success");
        } catch (error) {
            console.log(error);
            setResult("error");
        } finally {
            setSending(false);
        }
    };

    return (
        <form className={`${formStyle}`} action="" onSubmit={sendMessage}>
            <div className="form-group">
                <input 
                type="text"
                name="fullname"
                placeholder="Your Name"
                value={form.fullname}
                onChange={handleChange}
                required
                />
            </div>

            <div className="form-group">
                <input 
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
                />
            </div>

            <div className="form-group">
                <input 
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
                />
            </div>


            <div className="form-group">
                <input 
                type="text"
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                required
                />
            </div>

            <div className="form-group">
                <textarea 
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                required
                >
                </textarea>
            </div>

            <div className="form-group contact-country">
                <label htmlFor="country">Select Your Country:</label>
                <ReactCountryDropdown
                    defaultCountry="TR"
                    onSelect={(selected) => setCountry(selected.name)}
                />
            </div>

            <div className="form-group">
                <button className="btn-default btn-large" type="submit" disabled={sending}>
                    {sending ? "Sending..." : "Submit Now"}
                </button>
            </div> 

            <div className="form-group">
                {result ? <Result status={result} /> : null}
            </div> 
        </form>
    )
}
export default ContactForm;
