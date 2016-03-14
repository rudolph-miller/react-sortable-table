import { Component, PropTypes } from 'react';

import { SortIconBoth, SortIconDesc, SortIconAsc } from './icons';

class SortableTableHeaderItem extends Component {
  static propTypes = {
    sortable: PropTypes.bool,
    sorting: PropTypes.oneOf(['desc', 'asc', 'both'])
  }

  static defaultProps = {
    sortable: true
  }

  onClick(e) {
    if (this.props.sortable)
      this.props.onClick(this.props.index);
  }

  render() {
    let sortIcon;
    if (this.props.sortable) {
      sortIcon = <SortIconBoth style={this.props.iconStyle} />;
      if (this.props.sorting == "desc") {
        sortIcon = <SortIconDesc style={this.props.iconStyle} />;
      } else if (this.props.sorting == "asc") {
        sortIcon = <SortIconAsc style={this.props.iconStyle} />;
      }
    }

    return (
      <th
        style={this.props.style}
        onClick={this.onClick.bind(this)} >
        {this.props.header}
        {sortIcon}
      </th>
    );
  }
}

export default class SortableTableHeader extends Component {
  static propTypes = {
    columns: PropTypes.array.isRequired,
    sortings: PropTypes.array.isRequired,
    onStateChange: PropTypes.func,
    iconStyle: PropTypes.object
  }

  onClick(index) {
    this.props.onStateChange.bind(this)(index);
  }

  render() {
    const headers = this.props.columns.map(((column, index) => {
      const sorting = this.props.sortings[index];
      return (
        <SortableTableHeaderItem
          sortable={column.sortable}
          key={index}
          index={index}
          header={column.header}
          sorting={sorting}
          onClick={this.onClick.bind(this)}
          style={column.headerStyle}
          iconStyle={this.props.iconStyle} />
      );
    }).bind(this));

    return (
      <thead>
        <tr>
          {headers}
        </tr>
      </thead>
    );
  }
}
