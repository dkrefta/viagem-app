import React, { Component } from 'react';
import uniqueId from 'lodash/uniqueId';
import CountDown from './CountDown';
import NewItem from './NewItem';
import Items from './Items';

import './Application.css';

const defaultState = [
  { value: 'Pants', id: uniqueId(), packed: false },
  { value: 'Jacket', id: uniqueId(), packed: false },
  { value: 'iPhone Charger', id: uniqueId(), packed: false },
  { value: 'MacBook', id: uniqueId(), packed: false },
  { value: 'Sleeping Pills', id: uniqueId(), packed: true },
  { value: 'Underwear', id: uniqueId(), packed: false },
  { value: 'Hat', id: uniqueId(), packed: false },
  { value: 'T-Shirts', id: uniqueId(), packed: false },
  { value: 'Belt', id: uniqueId(), packed: false },
  { value: 'Passport', id: uniqueId(), packed: true },
  { value: 'Sandwich', id: uniqueId(), packed: true }
];

class Application extends Component {
  state = {
    items: defaultState
  };

  addItem = item => {
    this.setState({
      items: [item, ...this.state.items]
    });
  };

  removeItem = itemToRemove => {
    this.setState({
      items: this.state.items.filter(item => item.id !== itemToRemove.id)
    });
  };

  markAllAsUnpacked = () => {
    const items = this.state.items.map(item => ({ ...item, packed: false }));
    this.setState({ items });
  };

  markAsPacked = item => {
    const otherItems = this.state.items.filter(other => other.id !== item.id);
    const updatedItem = { ...item, packed: !item.packed };
    this.setState({ items: [updatedItem, ...otherItems] });
  };

  render() {
    const { items } = this.state;
    const unpackedItems = items.filter(item => !item.packed);
    const packedItems = items.filter(item => item.packed);

    return (
      <div className="Application">
        <NewItem onSubmit={this.addItem} />
        <CountDown />
        <Items
          title="Unpacked Items"
          items={unpackedItems}
          onRemove={this.removeItem}
          onToggle={this.toggleItem}
          onCheckOff={this.markAsPacked}
        />
        <Items
          title="Packed Items"
          items={packedItems}
          onRemove={this.removeItem}
          onToggle={this.toggleItem}
          onCheckOff={this.markAsPacked}
        />
        <button className="button full-width" onClick={this.markAllAsUnpacked}>
          Mark All As Unpacked
        </button>
      </div>
    );
  }
}

export default Application;
