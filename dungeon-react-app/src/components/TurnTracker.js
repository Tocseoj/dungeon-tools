import React, { Component } from 'react';
import './layouts/TurnTracker.css';

class TurnTracker extends Component {
  state = {
    combatants: [
      {
        name: "Waorjh",
        type: "player",
        order: 0,
      },
      {
        name: "Bingo",
        type: "player",
        order: 1,
      },
      {
        name: "Michelle",
        type: "player",
        order: 2,
      },
      {
        name: "Be'urf",
        type: "player",
        order: 3,
      },
      {
        name: "Meridian",
        type: "player",
        order: 4,
      },
      {
        name: "Jeff",
        type: "player",
        order: 5,
      },
      {
        name: "Lucien",
        type: "player",
        order: 6,
      },
      {
        name: "Troglodyte(s)",
        type: "enemy",
        order: 7,
      },
    ],
  }

  componentDidMount() {
    var first = document.getElementById('combatant-0');
    first.classList.add('hidden');
  }

  onClickAnimate = () => {
    this.nextInOrder();
  }

  nextInOrder = () => {
    const len = this.state.combatants.length;
    this.setState({
      combatants: this.state.combatants.map((item, index) => ({
        name: item.name,
        type: item.type,
        order: (item.order === 0 ? len - 1 : item.order - 1),
      })),
    });
  }

  render() {
    const {combatants} = this.state;

    return (
      <div id="TurnTracker" onClick={this.onClickAnimate} className="TurnTracker">
        {combatants.map((item, index) => (
          <p  key={item.name} 
              id={"combatant-" + index}
              className={[item.type, "order-" + item.order, item.order > 2 ? "hidden" : ""].join(" ")}
              style={{order: item.order}}
          >
            {item.name}
          </p>
        ))}
      </div>
    );
  }
}

export default TurnTracker;
