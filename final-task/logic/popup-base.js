export default class PopupBase {

  static setPopupBackground(popupBackground) {
    PopupBase._popupBackground = popupBackground;
  }

  open() {
    if (PopupBase._popupBackground) {
      PopupBase._popupBackground.show();
    }
  }

  close() {
    if (PopupBase._popupBackground) {
      PopupBase._popupBackground.hide();
    }
  }
}

PopupBase._popupBackground = null;