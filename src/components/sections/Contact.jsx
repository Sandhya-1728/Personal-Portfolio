import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  gap: 12px;
`;

const Title = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary || "#000"};
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary || "#555"};
  margin-bottom: 20px;
`;

const ContactForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgba(17, 25, 40, 0.83);
  border: 1px solid rgba(255, 255, 255, 0.125);
  padding: 32px;
  border-radius: 12px;
  box-shadow: rgba(23, 92, 230, 0.1) 0px 4px 24px;
  gap: 12px;
`;

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + "50" || "#ccc"};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary || "#000"};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary || "#007bff"};
  }
`;

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + "50" || "#ccc"};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary || "#000"};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary || "#007bff"};
  }
`;

const ContactButton = styled.button`
  width: 100%;
  background: hsla(271, 100%, 50%, 1);
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  &:disabled {
    background: gray;
    cursor: not-allowed;
  }
`;

const FeedbackMessage = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${({ success }) => (success ? "green" : "red")};
`;

const Contact = () => {
  const [formState, setFormState] = useState(""); // success or error
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);

    formData.append("access_key", "3acd02cd-40d4-4da2-b073-11678b4ca605"); 
    formData.append("subject", "⚠️A New Message from your Portfolio"); 

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      }).then((res) => res.json());

      if (res.success) {
        setFormState("success");
        e.target.reset(); // Reset the form on success
      } else {
        setFormState("error");
      }
    } catch (error) {
      setFormState("error");
    }

    setIsSubmitting(false);
  };

  return (
    <Container>
      <Wrapper>
        <Title>Contact</Title>
        <Desc>Looking forward to building success together—let’s connect!</Desc>
        <ContactForm onSubmit={onSubmit}>
          <ContactInput type="text" name="name" placeholder="Your Name" required />
          <ContactInput type="email" name="email" placeholder="Your Email" required />
          <ContactInputMessage name="message" placeholder="Message" rows="4" required />
          <ContactButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Hire me!"}
          </ContactButton>
        </ContactForm>
        {formState === "success" && <FeedbackMessage success={true}>Message sent successfully!</FeedbackMessage>}
        {formState === "error" && <FeedbackMessage success={false}>Failed to send message. Please try again.</FeedbackMessage>}
      </Wrapper>
    </Container>
  );
};

export default Contact;
