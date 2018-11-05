import React from 'react';

class CustomToolbar extends React.Component {
    render() {
        let navigate = {
        PREVIOUS: 'PREV',
        NEXT: 'NEXT',
        TODAY: 'TODAY',
        DATE: 'DATE',
        }
        let { localizer: { messages }, label } = this.props
        return(
            <div className="rbc-toolbar">
                <span className="rbc-btn-group">
                    <button type="button" onClick={this.navigate.bind(null, navigate.PREVIOUS)}>Prev</button>
                </span>
                <span className="rbc-toolbar-label">{label}</span>
                <span className="rbc-btn-group">
                    <button type="button" onClick={this.navigate.bind(null, navigate.NEXT)}>Next</button>
                </span>
            </div>
        )
    }
    navigate = action => {
        this.props.onNavigate(action)
    }
}

export default CustomToolbar;