class ApiFetch {
  constructor() {
    this.apiUri = 'http://localhost:3000';

    this.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
  }

  get(endpoint, query = null) {
    return fetch(this.apiUri + endpoint + (query ? '?' + this.querySerializer(query) : ''), {
      method: 'GET'
    })
      .then(this.prepareResponse);
  }

  post(endpoint, body) {
    return fetch(this.apiUri + endpoint, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(body)
    })
      .then(this.prepareResponse);
  }

  put(endpoint, body) {
    return fetch(this.apiUri + endpoint, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(body)
    })
      .then(this.prepareResponse);
  }

  delete(endpoint) {
    return fetch(this.apiUri + endpoint, {
      method: 'DELETE'
    })
      .then(this.prepareResponse);
  }

  prepareResponse(response) {
    return new Promise((resolve, reject) => {
      response.json()
        .then(response.ok ? resolve : reject);
    });
  }

  querySerializer(object) {
    return Object.keys(object).reduce((query, key) => {
      if (object.hasOwnProperty(key)) {
        query.push(`${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`);
      }

      return query;
    }, []).join('&');
  }
}

export default ApiFetch;
