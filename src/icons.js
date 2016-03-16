import { Component, PropTypes } from 'react';

class FaIcon extends Component {
  static propTypes = {
    icon: PropTypes.string.isRequired
  }

  render() {
    const className = `fa fa-lg ${this.props.icon}`
    return (
      <i
        className={className}
        style={this.props.style}
        align="right" />
    );
  }
}

export class SortIconBoth extends Component {
  render() {
    return (
      <FaIcon icon="fa-sort" style={this.props.style} />
    );
  }
}

export class SortIconAsc extends Component {
  render() {
    return (
      <FaIcon icon="fa-sort-asc" style={this.props.style} />
    );
  }
}

export class SortIconDesc extends Component {
  render() {
    return (
      <FaIcon icon="fa-sort-desc" style={this.props.style} />
    );
  }
}
