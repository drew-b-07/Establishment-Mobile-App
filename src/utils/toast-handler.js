import Toast from "react-native-toast-message"

export function showErrorToast(message, title = null, duration = 3000) {
  Toast.show({type: "error", text1: title, text2: message, visibilityTime: duration, position: "bottom"});
}

export function showInfoToast(message, title = null, duration = 3000) {
  Toast.show({type: "info", text1: title, text2: message, visibilityTime: duration, position: "bottom"});
}

export function showSuccessToast(message, title = null, duration = 3000) {
  Toast.show({type: "success", text1: title, text2: message, visibilityTime: duration, position: "bottom"});
}