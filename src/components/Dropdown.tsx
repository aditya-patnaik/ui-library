import * as React from "react"
import * as _ from "lodash"

interface IDropdownOption {
    key: string;
    text: string;
    subText: string;
    value: string;
    image?: string;
    group?: string;
    groupIcon?: string;
}

interface DropdownProps {
    options: IDropdownOption[];
    value: string;
    enableGrouping?: boolean;
    onSelect: (value: string) => void;
}

interface DropdownState {
    isDropdownExpanded: boolean;
}

class Dropdown extends React.Component<DropdownProps, DropdownState> {
    constructor(props: DropdownProps) {
        super(props)
        this.state = {
            isDropdownExpanded: false
        }
    }

    toggleDropdown = () => {
        this.setState({
            isDropdownExpanded: !this.state.isDropdownExpanded
        })
    }

    hideDropdown = () => {
        this.setState({
            isDropdownExpanded: false
        })
    }

    onOptionSelect = (value: string) => {
        this.props.onSelect(value);
        this.hideDropdown();
    }

    getOptionGroups = () => {
        let groupedOptions = _.mapValues(_.groupBy(this.props.options, "group"))
        return groupedOptions
    }

    render() {
        let selectedOption = !!this.props.value ? this.props.options.filter(item => item.value === this.props.value)[0] : null;
        let optionGroups = !!this.props.enableGrouping ? this.getOptionGroups() : null;
        return (
            <div className={`dropdown ${this.state.isDropdownExpanded ? "dropdown--active" : ""}`}>
                <div className="dropdown__select-box" onMouseDown={this.toggleDropdown} tabIndex={0} onBlur={this.hideDropdown}>
                    <span className="dropdown__select-box-text-container">
                        { 
                            !!selectedOption && selectedOption.image ? 
                            <span className="dropdown__select-box-image-container"><img src={selectedOption.image} /></span> : null
                        }
                        <span>{ !!selectedOption ? selectedOption.text : "Select" }</span>
                    </span>
                    <span><img className="dropdown__dropdown-icon" src="/images/icons/drop-down-menu.svg" /></span>
                </div>
                {
                    !this.props.enableGrouping && 
                    <div className={`dropdown__options-container ${this.state.isDropdownExpanded ? "dropdown__options-container--active" : ""}`}
                         onMouseDown={(evt) => evt.preventDefault()}>
                    {
                        _.map(this.props.options, (option, index) => {
                            return <div className="dropdown__option"
                                    key={option.key}
                                    onClick={() => this.onOptionSelect(option.value)}>
                                        {
                                            !!option.image &&
                                            <span className="dropdown__option-image"><img src={option.image} /></span>
                                        }
                                        <div className="dropdown__option-text-container">
                                            <div className="dropdown__option-text">{option.text}</div>
                                            {
                                                !!option.subText &&
                                                <div className="dropdown__option-subtext">{option.subText}</div>
                                            }
                                        </div>
                                </div>
                        })
                    }
                    </div>
                }
                {
                    !!this.props.enableGrouping && 
                    <div className={`dropdown__options-container ${this.state.isDropdownExpanded ? "dropdown__options-container--active" : ""}`}
                         onMouseDown={(evt) => evt.preventDefault()}>
                        {
                            _.map(Object.keys(optionGroups), (region: string, index) => {
                                return <div key={region} className="dropdown__option-group-container">
                                    <div className="dropdown__option-group-header">
                                        {
                                            !!optionGroups[region][0].groupIcon &&
                                            <span><img className="dropdown__option-group-icon" src={optionGroups[region][0].groupIcon} /></span>
                                        }
                                        <span>{region}</span>
                                    </div>
                                    {
                                        _.map(optionGroups[region], (option: IDropdownOption, index) => {
                                            return <div className="dropdown__option"
                                                    key={option.key}
                                                    onClick={() => this.onOptionSelect(option.value)}>
                                                        {
                                                            !!option.image &&
                                                            <span className="dropdown__option-image"><img src={option.image} /></span>
                                                        }
                                                        <div className="dropdown__option-text-container">
                                                            <div className="dropdown__option-text">{option.text}</div>
                                                            {
                                                                !!option.subText &&
                                                                <div className="dropdown__option-subtext">{option.subText}</div>
                                                            }
                                                        </div>
                                                </div>
                                        })
                                    }
                                </div>
                            })
                        }
                    </div>
                }
            </div>
        )
    }
}

export default Dropdown;