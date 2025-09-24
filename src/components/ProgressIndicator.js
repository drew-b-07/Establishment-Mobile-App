import React from 'react';
import { View, Text } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const ProgressIndicator = ({ currentStep, totalSteps }) => {
  return (
    <View style={globalStyles.progressContainer}>
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;
        
        return (
          <React.Fragment key={stepNumber}>
            <View
              style={[
                globalStyles.progressStep,
                isActive && globalStyles.progressStepActive,
                isCompleted && globalStyles.progressStepCompleted,
              ]}
            >
              <Text
                style={[
                  globalStyles.progressStepText,
                  (isActive || isCompleted) && globalStyles.progressStepTextActive,
                ]}
              >
                {stepNumber}
              </Text>
            </View>
            {stepNumber < totalSteps && (
              <View
                style={[
                  globalStyles.progressLine,
                  isCompleted && globalStyles.progressLineActive,
                ]}
              />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
};

export default ProgressIndicator;
