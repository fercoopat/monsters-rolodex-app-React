import { Component } from 'react';
import './App.css';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: '',
    };
  }

  async componentDidMount() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();

    this.setState(() => {
      return { monsters: users };
    });
  }

  onSearchChange = (event) => {
    const searchField = event.target.value.toLowerCase().trim();

    this.setState(() => {
      return { searchField };
    });
  };

  render() {
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField)
    );

    return (
      <div className="App">
        <h1 className="app-title">Monsters Rolodex</h1>

        <SearchBox
          className="monsters-search-box"
          placeholder="Type to search"
          onChangeHandler={onSearchChange}
        />

        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
