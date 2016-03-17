import React, { Component } from 'react';
import SelectField          from 'material-ui/lib/select-field';
import MenuItem             from 'material-ui/lib/menus/menu-item';
import TextField            from 'material-ui/lib/text-field';
import { ipcRenderer }      from 'electron';
import $                    from 'jquery';

export default class PlaylistSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists : []
    };
  }

  componentDidMount() {
    this.loadPlaylist()
  }

  /**
   * HELPER METHODS
   */

  /**
   * Send init signal to Main to get init data
   */
  loadPlaylist() {
    ipcRenderer.send('initial')
    ipcRenderer.on('main-initial', (event, response) => {
      this.setState({
        playlists : response.playlists,
        value     : response.selectedPlaylist.id
      })
    })
  }

  handleChange = (event, index, value) => {
    ipcRenderer.send('playlistChanged', value)
    this.setState({value})
  }

  render() {
    return (
      <div>
        <SelectField value={this.state.value}  fullWidth={true} onChange={this.handleChange}>
          {this.state.playlists.map(playlist => <MenuItem value={playlist.id} primaryText={playlist.name}/>)}
        </SelectField>
      </div>
    );
  }
}
