import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';

import * as actions from '../actions/contacts';
import ContactItem from './contact-item';

import '../styles/contacts-list.less';

@connect(
  state => ({
    contacts: state.contacts
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)
class ContactsList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      contacts: Immutable.List()
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  componentWillMount() {
    if (this.props.contacts.get('list').size === 0) {
      this.props.actions.getContactsList();
    }

    this.setState({
      contacts: this.props.contacts.get('list')
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      contacts: nextProps.contacts.get('list')
    });
  }

  handleSearch(e) {
    const { value: search } = e.target;
    const contacts = this.props.contacts.get('list').filter(contact => {
      return contact.get('name').toLowerCase().indexOf(search.toLowerCase()) !== -1
        || contact.get('phoneNumber').toLowerCase().indexOf(search.toLowerCase()) !== -1 ;
    });

    this.setState({ contacts });
  }

  renderContacts() {
    if (this.props.contacts.get('isLoading')) {
      return <li>Loading...</li>;
    }

    return this.state.contacts.map(contact => {
      return <ContactItem contact={contact} key={contact.get('id')} />;
    });
  }

  render() {
    return (
      <ul className="contacts-list">
        <li className="search-place">
          <input className="search" type="text" onChange={this.handleSearch} />
        </li>
        { this.renderContacts() }
      </ul>
    );
  }
}

export default ContactsList;
