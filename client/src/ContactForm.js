import React, {Component} from 'react'

import './styles/ContactForm.css'

import downArrow from './images/down_arrow.svg'

const DropdownMenu = (props) => {
  if (!props.isExpanded) {
    return (
      <div id="dropdown" onClick={props.expand}>
        <button>{props.selected}</button>
        <img src={downArrow} alt="down_arrow.svg"/>
      </div>
    )
  } else {
    return (
      <div id="dropdown">
        <img
          className="reverse"
          src={downArrow}
          alt="down_arrow.svg"/>
        <button onClick={() => props.select('General', 'general')}>
          General
        </button>
        <button onClick={() => props.select('Private Events', 'privateevents')}>
          Private Events
        </button>
        <button onClick={() => props.select('Booking', 'booking')}>
          Booking
        </button>
        <button onClick={() => props.select('Roll Up Gallery', 'rollupgallery')}>
          Roll Up Gallery
        </button>
        <button onClick={() => props.select('Lost and Found', 'lostandfound')}>
          Lost and Found
        </button>
      </div>
    )
  }
}

const Fields = (props) => {
  if (props.show === 'general') {
    return (
      <React.Fragment>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name"/>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email"/>
        <label htmlFor="message">Message</label>
        <textarea name="message" id="message" cols="30" rows="10"></textarea>
      </React.Fragment>
    )
  } else if (props.show === 'privateevents') {
    return (
      <React.Fragment>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name"/>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email"/>
        <label htmlFor="date">What is the ideal date for your event?</label>
        <input type="text" id="date" name="date"/>
        <label htmlFor="hours">What are your event hours?</label>
        <input type="text" id="hours" name="hours"/>
        <label htmlFor="event-type">What kind of event (seated or standing?)</label>
        <input type="text" id="event-type" name="eventType"/>
        <label htmlFor="attendance">What is the approximate attendance?</label>
        <input type="text" id="attendance" name="attendance"/>
        <label htmlFor="beverages">Will you need beverages? Alcohol?</label>
        <input type="text" id="beverages" name="beverages"/>
        <label htmlFor="food">Do you have any catering needs?</label>
        <input type="text" id="food" name="food"/>
        <label htmlFor="audio-visual">Will you need A/V?</label>
        <input type="text" id="audio-visual" name="audioVisual"/>
      </React.Fragment>
    )
  } else if (props.show === 'booking') {
    return (
      <React.Fragment>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name"/>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email"/>
        <label htmlFor="date">What is the ideal date for your event?</label>
        <input type="text" id="date" name="date"/>
        <label htmlFor="hours">What are your event hours?</label>
        <input type="text" id="hours" name="hours"/>
        <label htmlFor="type">What type of event? Concert, dance, sit down, etc...</label>
        <input type="text" id="type" name="type"/>
        <label htmlFor="acts">Which musical acts are you planning to book?</label>
        <input type="text" id="acts" name="acts"/>
        <label htmlFor="previous-shows">Previous shows in the area?</label>
        <input type="text" id="previous-shows" name="previousShows"/>
      </React.Fragment>
    )
  } else if (props.show === 'rollupgallery') {
    return (
      <React.Fragment>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name"/>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email"/>
        <label htmlFor="date">What is the ideal date for your event?</label>
        <input type="text" id="date" name="date"/>
        <label htmlFor="hours">What are your event hours?</label>
        <input type="text" id="hours" name="hours"/>
        <label htmlFor="attendance">What is the approximate attendance?</label>
        <input type="text" id="attendance" name="attendance"/>
        <label htmlFor="message">How would you like to utilize the space?</label>
        <input type="text" id="message" name="message"/>
      </React.Fragment>
    )
  } else if (props.show === 'lostandfound') {
    return (
      <React.Fragment>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name"/>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email"/>
        <label htmlFor="date-lost">At what event was the item lost?</label>
        <input type="text" id="date-lost" name="dateLost"/>
        <label htmlFor="ticket-number">Claim ticket # if applicable</label>
        <input type="text" id="ticket-number" name="ticketNumber"/>
        <label htmlFor="description">Detailed description of the item</label>
        <input type="text" id="description" name="description"/>
        <label htmlFor="contact-info">Contact info (email / phone number)</label>
        <input type="text" id="contact-info" name="contactInfo"/>
      </React.Fragment>
    )
  }
}

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.expand = this.expand.bind(this);
    this.select = this.select.bind(this);
    this.submit = this.submit.bind(this);
    this.state = {
      selected: this.props.initialSelection,
      formType: this.props.initialFormType,
      isMenuOpen: false
    }
  }

  componentDidMount() {
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
    });
  }

  expand() {
    this.setState({ isMenuOpen: true });
  }

  select(selected, formType) {
    this.setState({
      selected: selected,
      formType: formType,
      isMenuOpen: false
    });
  }

  submit(selected) {
    const form = document.getElementById('contact-form');
    const dropdown = document.getElementById('dropdown');

    const formData = new FormData(form);
    formData.append('formSelected', selected);

    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        form.lastChild.style.display = 'none';
        dropdown.style.display = 'none';
        form.innerHTML = '<h2>Message Received!</h2>';
        console.log(this.responseText);
      }
    }

    xhttp.open('POST', '/contact');
    xhttp.send(formData);
  }

  render() {
    return (
      <div id='contact-form-section'>
        <div id="contact-form-container">
          <div id="contact-form-header">
            <h1>Contact</h1>
          </div>
          <div id='contact-form-body'>
            <DropdownMenu
              isExpanded={this.state.isMenuOpen}
              selected={this.state.selected}
              expand={this.expand}
              select={this.select}
            />
            <form id="contact-form" action="">
              <Fields show={this.state.formType}/>
              <button
                id="contact-form-submit-button"
                onClick={() => this.submit(this.state.selected)}
              >
                submit
              </button>
            </form>
          </div>

        </div>
      </div>
    )
  }
}

export default ContactForm
