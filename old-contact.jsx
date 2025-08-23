import { useState, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../../assets/img/contact-img.svg";
import contact from '../../assets/img/contact.png';
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import './Contact.css'
import emailjs from '@emailjs/browser';

function Contact() {
  const formRef = useRef()
  const [thanks, setThanks] = useState(false)
  const [message, setMessage] = useState("")

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const msgConfirm = () => {
    alert("Message Sent!")
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setThanks(true)
    emailjs.sendForm(
      'service_5j2nazr',
      'template_2q6uc8b',
      formRef.current, { publicKey: 'SZctaaxt7KKpSXd4C' }
    )
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  }


  return (
    <section className="contact" id="connect">
      <Container className="connect">
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <TrackVisibility>
              <img src={contact} alt="Contact Us" />
            </TrackVisibility>
          </Col>
          <Col size={12} md={6}>
            <TrackVisibility>
              <div>
                <h2>Get In Touch</h2>
                <form ref={formRef} onSubmit={handleSubmit}>
                  <Row>
                    <Col size={12} sm={6} className="px-1">
                      <input type="text" placeholder='Full Name' name='user_name' />
                    </Col>
                    <Col size={12} sm={6} className="px-1">
                      <input type="email" placeholder='Email' name='user_email' />
                    </Col>
                    <Col size={12} className="px-1">
                      <textarea placeholder='Message' name='message' rows="5" onChange={handleChange} value={message}></textarea>
                      <button type="submit" onClick={() => msgConfirm()} ><span>Submit</span></button> {thanks && <span className="msg" style={{ position: 'relative', left: '45%' }}>Thanks for the message!</span>}
                    </Col>
                  </Row>
                </form>
              </div>
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Contact