import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native';

// ** Component
import Input from '../Input';

// ** Third Pary
import DateTimePickerModal from "react-native-modal-datetime-picker";

export const DatePicker = ({ selectedDateCallback , datePickerPlaceholder, datePickerlabel, mode}: any) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
      setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
      setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
      hideDatePicker();
      //send back to parent component
      selectedDateCallback(date);
  };

  return (
      <View>
          <TouchableOpacity onPress={showDatePicker}>
            <Input placeholder={datePickerPlaceholder} label={datePickerlabel} name='date' value={selectedDateCallback}/>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode={mode}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
      </View>
  );
};

