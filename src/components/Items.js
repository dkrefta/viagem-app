import React, { Component } from 'react';
import Item from './Item';
import Filter from './Filter';

class Items extends Component {
  state = {
    item: ''
  };

  updateSearchTerm = searchTerm => {};

  render() {
    const { title, items, onRemove, onToggle } = this.props;
    return (
      <section className="Items">
        <h2>
          {title} ({items.length})
        </h2>
        <Filter searchTerm={''} onChange={this.updateSearchTerm} />
        {items
          .filter(item =>
            // Hmm… this needs some work.
            item.value.toLowerCase().includes(''.toLowerCase())
          )
          .map(item => (
            <Item
              key={item.id}
              onToggle={onToggle}
              onRemove={() => onRemove(item)}
              item={item}
            />
          ))}
      </section>
    );
  }
}

export default Items;
