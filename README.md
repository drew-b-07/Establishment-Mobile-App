# Establishment Mobile App

A React Native mobile application for establishment management with comprehensive authentication features.

## Features

### Authentication Pages
- **Sign In Page**: User login with email and password
- **Forgot Password Page**: Password reset functionality
- **Sign Up Flow**: Two-step registration process
  - **Step 1**: Personal information (Full Name, Email, Password, Confirm Password)
  - **Step 2**: Business information (Establishment Name, Address, Phone Number)

### Key Features
- ✅ Modern, responsive UI design
- ✅ Form validation with real-time error messages
- ✅ Password strength requirements
- ✅ Progress indicator for multi-step signup
- ✅ Loading states and user feedback
- ✅ Navigation between all screens
- ✅ Keyboard-aware scrolling
- ✅ Cross-platform compatibility (iOS & Android)

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── CustomInput.js   # Custom input component with validation
│   ├── CustomButton.js  # Custom button component
│   └── ProgressIndicator.js # Progress indicator for multi-step forms
├── screens/             # Screen components
│   ├── SignInScreen.js
│   ├── ForgotPasswordScreen.js
│   ├── SignUpStep1Screen.js
│   └── SignUpStep2Screen.js
├── navigation/          # Navigation configuration
│   └── AuthNavigator.js
├── styles/             # Global styles and theme
│   └── globalStyles.js
└── App.js              # Main app component
```

## Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)
- Java Development Kit (JDK)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Establishment-Mobile-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install iOS dependencies (macOS only)**
   ```bash
   cd ios && pod install && cd ..
   ```

## Running the App

### Android
```bash
# Start Metro bundler
npm start

# In a new terminal, run Android app
npm run android
```

### iOS (macOS only)
```bash
# Start Metro bundler
npm start

# In a new terminal, run iOS app
npm run ios
```

## Form Validation Rules

### Sign In
- Email: Valid email format required
- Password: Minimum 6 characters

### Sign Up Step 1 (Personal Info)
- Full Name: Minimum 2 characters
- Email: Valid email format
- Password: Minimum 8 characters with at least one uppercase, lowercase, and number
- Confirm Password: Must match password

### Sign Up Step 2 (Business Info)
- Establishment Name: Minimum 2 characters
- Address: Minimum 10 characters (complete address)
- Phone Number: Valid phone number format

### Forgot Password
- Email: Valid email format required

## Customization

### Colors and Styling
Edit `src/styles/globalStyles.js` to customize:
- Color scheme
- Typography
- Component styles
- Layout dimensions

### Form Fields
To add or modify form fields:
1. Update the respective screen component
2. Add validation rules in the `validateForm` function
3. Update the form state in `useState`

## API Integration

The app is currently set up with mock API calls. To integrate with a real backend:

1. Replace the mock API calls in each screen with actual HTTP requests
2. Add proper error handling
3. Implement token management for authentication
4. Add loading states and user feedback

### Example API Integration Points:
- `SignInScreen.js` - Line ~65: Sign in API call
- `ForgotPasswordScreen.js` - Line ~45: Password reset API call
- `SignUpStep2Screen.js` - Line ~85: Account creation API call

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on both platforms
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please create an issue in the repository.