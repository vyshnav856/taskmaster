import React from "react"

// params: buttonType, classes, defaultText, loadingText
export default function LoadingButton(props) {
	const [buttonText, setButtonText] = React.useState(props.defaultText)
	const [isClicked, setIsClicked] = React.useState(false)

	function changeButtonText() {
		setButtonText(props.loadingText);
		setTimeout(() => setIsClicked(true), 50)
	}

	return (

		<button type={props.buttonType} disabled={isClicked} className={props.classes} onClick={changeButtonText}>{buttonText}</button>
	)
}