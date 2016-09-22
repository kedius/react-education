import React, { Component } from 'react';

class ContactForm extends Component {
  render() {
    return (
      <div>
        <div>
          <input type="text" placeholder="Name" />
        </div>
        <div>
          <imput type="text" placeholder="Phone Number" />
        </div>
        <div>
          <imput type="text" placeholder="Image Uri" />
        </div>
        <div>
          <button>ADD</button>
        </div>
      </div>
    );
  }
}

export default ContactForm;
