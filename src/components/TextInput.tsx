import * as React from "react"

interface TextInputProps {
    onChangeHandler: (evt: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    cssClasses?: string
    isPassword?: boolean
    icon?:string
}

class TextInput extends React.Component<TextInputProps> {
    constructor(props: TextInputProps) {
        super(props)
    }
    render() {
        return (
            <div className="text-input-container">
                { this.props.icon &&
                    <div>
                        <img src={this.props.icon} />
                    </div>
                }
                <input type={this.props.isPassword ? "password" : "text"}
                       placeholder={this.props.placeholder || ""}
                       className={`text-input ${this.props.cssClasses || ""}`}
                       onChange={this.props.onChangeHandler} />
            </div>
        )
    }
}

export default TextInput