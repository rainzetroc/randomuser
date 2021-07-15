import React from "react";

class Display extends React.Component {
  state = { results: [], isLoading: false };

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch("https://randomuser.me/api")
      .then((response) => response.json())
      .then(
        (data) => {
          this.setState({ results: data.results, isLoading: false });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  clickLoad() {
    window.location.reload();
  }

  render() {
    const { error, isLoading } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (isLoading) {
      return <p>Loading ...</p>;
    }
    const renderName = this.state.results[0] ? this.state.results[0].name : {};
    const renderAddress = this.state.results[0]
      ? this.state.results[0].location
      : {};
    const renderEmail = this.state.results[0]
      ? this.state.results[0].email
      : "";
    const renderStreet = this.state.results[0]
      ? this.state.results[0].location.street
      : {};

    return (
      <div>
        <div>
          <button onClick={this.clickLoad} className="ui primary button">
            Reload
          </button>
        </div>
        <h1 className="ui header">Random Users</h1>
        <div className="ui list">
          <div className="item">
            <div className="header">{`${renderName.first} ${renderName.last}`}</div>
            {`${renderStreet.number} ${renderStreet.name} street,  ${renderAddress.city} ${renderAddress.state} ${renderAddress.country}`}
            <div>{renderEmail}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Display;
