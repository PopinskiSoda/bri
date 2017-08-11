(function(){
	var OPENED_POPUP_CLASS_NAME = 'select-region__popup--opened';
	var SELECTED_REGION_CLASS_NAME = 'select-region__popup-list-item--selected'

	var button = document.getElementById('select-region-button'),
		popup = document.getElementById('popup'),
		cross = document.getElementById('cross'),
		row = document.getElementById('select-region-row'),
		currentOption = document.getElementById('current-option');

	var items = row.getElementsByTagName('li');

	function openPopup() {
		popup.classList.add(OPENED_POPUP_CLASS_NAME);
	}

	function closePopup() {
		popup.classList.remove(OPENED_POPUP_CLASS_NAME);
	}

	function selectRegion(e) {
		currentOption.innerHTML = e.target.innerHTML;
		for (var i=0; i<items.length; i++) {
			items[i].classList.remove(SELECTED_REGION_CLASS_NAME);
		}
		e.target.classList.add(SELECTED_REGION_CLASS_NAME);
		closePopup();
	}

	button.addEventListener('click', openPopup);
	cross.addEventListener('click', closePopup);

	for (var i=0; i<items.length; i++) {
		items[i].addEventListener('click', selectRegion);
	}
}())