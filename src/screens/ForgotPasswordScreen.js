import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { globalStyles, colors } from '../styles/globalStyles';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const validateEmail = () => {
    if (!email.trim()) {
      setError('Email is required');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    setError('');
    return true;
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    if (error) {
      setError('');
    }
  };

  const handleResetPassword = async () => {
    if (!validateEmail()) {
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically make an API call to send reset password email
      setEmailSent(true);
      Alert.alert(
        'Email Sent',
        'Password reset instructions have been sent to your email address.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const navigateToSignIn = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <KeyboardAvoidingView
        style={globalStyles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={globalStyles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginTop: 50 }}>
            <Text style={globalStyles.title}>Forgot Password?</Text>
            <Text style={globalStyles.subtitle}>
              {emailSent
                ? 'We\'ve sent password reset instructions to your email address. Please check your inbox and follow the instructions.'
                : 'Enter your email address and we\'ll send you instructions to reset your password.'}
            </Text>

            {!emailSent && (
              <>
                <CustomInput
                  label="Email Address"
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={handleEmailChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={error}
                />

                <CustomButton
                  title="Send Reset Instructions"
                  onPress={handleResetPassword}
                  loading={loading}
                  style={{ marginTop: 10 }}
                />
              </>
            )}

            {emailSent && (
              <CustomButton
                title="Resend Email"
                onPress={handleResetPassword}
                loading={loading}
                variant="secondary"
                style={{ marginTop: 20 }}
              />
            )}

            <CustomButton
              title="Back to Sign In"
              variant="link"
              onPress={navigateToSignIn}
              style={{ marginTop: 20 }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
