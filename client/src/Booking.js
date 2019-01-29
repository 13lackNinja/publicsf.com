// Page content for Booking page.

import React from 'react'
import ContactForm from './ContactForm'

import './styles/Booking.css'

const Booking = () => (
  <div id="booking">
    <h1>Booking</h1>
    <ContactForm
      initialSelection='Booking'
      initialFormType='booking'
    />
  </div>
)

export default Booking
