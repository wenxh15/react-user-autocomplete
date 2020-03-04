import React, { Component } from "react";
import "./styles.css";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      value: "",
      dropdown: [],
      visible: []
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(res => res.data)
      .then(data =>
        data.forEach(item =>
          this.setState({
            list: [...this.state.list, item],
            dropdown: [...this.state.dropdown, item.name]
          })
        )
      );
  }

  handleClick(value) {
    console.log(value, "value");
    this.setState({
      value: value
    });
  }

  handleChange(e) {
    const { dropdown } = this.state;

    const updateVisible =
      e.target.value === ""
        ? []
        : dropdown.filter(
            item =>
              item.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
          );

    this.setState({
      value: e.target.value,
      visible: updateVisible
    });
  }

  get renderDropdown() {
    const { visible } = this.state;
    if (visible) {
      return visible.map((item, index) => (
        <div
          onClick={value => this.handleClick(value)} //没pass
          key={index}
          value={item}
        >
          {item}
        </div>
      ));
    }
  }

  render() {
    const { value, dropdown } = this.state;

    return (
      <div className="App">
        <input onChange={this.handleChange} value={value} />
        {dropdown ? this.renderDropdown : null}
      </div>
    );
  }
}

export default App;
