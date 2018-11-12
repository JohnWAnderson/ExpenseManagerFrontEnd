
import React from 'react';
class CustomToolbar extends React.Component {
    render() {
        let navigate = {
        PREVIOUS: 'PREV',
        NEXT: 'NEXT',
        TODAY: 'TODAY',
        DATE: 'DATE',
        MONTH: 'DATE',
        DATE: 'DATE',
        }
        let { localizer: { messages }, label } = this.props
        return(
            <div className="rbc-toolbar">
                <span className="rbc-btn-group">
                    <button type="button" onClick={() => this.navigate('PREV')}>back</button>
                </span>
                <span className="rbc-toolbar-label">{label}</span>
                <span className="rbc-btn-group">
                    <button type="button" onClick={() => this.navigate('NEXT')}>next</button>
                </span>
            </div>
        )
    }
    navigate = action => {
        this.props.onNavigate(action)
    }
}

export default CustomToolbar;