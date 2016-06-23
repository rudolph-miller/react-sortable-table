import { Component, PropTypes } from 'react';

class SortableTableRow extends Component {
  render() {
    var tds = this.props.columns.map(function (item, index) {
      var value = this.props.data[item.key];
      if ( item.render ) {
        value = item.render(value)
      }
      return (
        <td
          key={index}
          style={item.dataStyle}
          {...(item.dataProps || {})} >
          {value}
        </td>
      );
    }.bind(this));

    return (
      <tr>
        {tds}
      </tr>
    );
  }
}

export default class SortableTableBody extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    sortings: PropTypes.array.isRequired
  }

  render() {
    var bodies = this.props.data.map(((item, index) => {
      return (
        <SortableTableRow
          key={index}
          data={item}
          columns={this.props.columns} />
      );
    }).bind(this));

    return (
      <tbody>
        {bodies}
      </tbody>
    );
  }
}
