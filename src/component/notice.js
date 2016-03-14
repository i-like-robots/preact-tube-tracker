import { h, Component } from 'preact'

export default class Notice extends Component {

  statusText (status) {
    let text

    switch (status) {
      case 'error':
        text = 'Sorry an error occurred, please try again.'
        break
      case 'loading':
        text = 'Loading predictions…'
        break
      case 'welcome':
        text = 'Please choose a station.'
        break
    }

    return text
  }

  render () {
    return (
      <div className={`notice notice--${this.props.type}`}>
        <p>{this.statusText(this.props.type)}</p>
      </div>
    )
  }

}
