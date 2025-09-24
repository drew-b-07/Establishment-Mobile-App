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
import ProgressIndicator from '../components/ProgressIndicator';
import { globalStyles, colors } from '../styles/globalStyles';

const SignUpStep2Screen = ({ navigation, route }) => {
  const { step1Data } = route.params;
  const [formData, setFormData] = useState({
    establishmentName: '',
    address: '',
    phoneNumber: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Establishment name validation
    if (!formData.establishmentName.trim()) {
      newErrors.establishmentName = 'Establishment name is required';
    } else if (formData.establishmentName.trim().length < 2) {
      newErrors.establishmentName = 'Establishment name must be at least 2 characters';
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    } else if (formData.address.trim().length < 10) {
      newErrors.address = 'Please enter a complete address';
    }

    // Phone number validation
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phoneNumber.replace(/\s/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleSignUp = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // Combine all form data
      const completeFormData = {
        ...step1Data,
        ...formData,
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Here you would typically make an API call to create the account
      console.log('Complete form data:', completeFormData);
      
      Alert.alert(
        'Success!',
        'Your account has been created successfully. Please check your email to verify your account.',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('SignIn');
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
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
          <View style={{ marginTop: 20 }}>
            <Text style={globalStyles.title}>Business Information</Text>
            <Text style={globalStyles.subtitle}>
              Step 2 of 2: Tell us about your establishment
            </Text>

            <ProgressIndicator currentStep={2} totalSteps={2} />

            <CustomInput
              label="Establishment Name"
              placeholder="Enter your business name"
              value={formData.establishmentName}
              onChangeText={(value) => handleInputChange('establishmentName', value)}
              autoCapitalize="words"
              error={errors.establishmentName}
            />

            <CustomInput
              label="Address"
              placeholder="Enter your business address"
              value={formData.address}
              onChangeText={(value) => handleInputChange('address', value)}
              multiline
              numberOfLines={3}
              error={errors.address}
            />

            <CustomInput
              label="Phone Number"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChangeText={(value) => handleInputChange('phoneNumber', value)}
              keyboardType="phone-pad"
              error={errors.phoneNumber}
            />

            <View style={{ flexDirection: 'row', marginTop: 20, gap: 10 }}>
              <CustomButton
                title="Back"
                variant="secondary"
                onPress={handleBack}
                style={{ flex: 1 }}
              />
              <CustomButton
                title="Create Account"
                onPress={handleSignUp}
                loading={loading}
                style={{ flex: 1 }}
              />
            </View>

            <Text style={[globalStyles.centerText, { fontSize: 14, marginTop: 20 }]}>
              By creating an account, you agree to our Terms of Service and Privacy Policy
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpStep2Screen;
